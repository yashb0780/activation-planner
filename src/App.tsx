import { useCallback, useEffect, useMemo, useState } from "react";
import { account, firstValue, gates, items as baseItems, ourTeam, people, successPlan } from "./data/halden";
import { readPref, useTracker, writePref } from "./state";
import type { Item, Week } from "./types";
import { Bucket, Card } from "./components/Card";
import { Panel } from "./components/Panel";
import { FirstValueLine, Milestones, NeedsAttention } from "./components/Top";
import { People } from "./components/People";
import { SuccessPlan } from "./components/SuccessPlan";
import { formatDate } from "./dates";

type Tab = "plan" | "success" | "people";
type Lens = "lead" | "owner" | "module";
type WeekFilter = "all" | 1 | 2 | 3 | 4;

const LENSES = ["lead", "owner", "module"] as const;
const LIMIT = 5;
const MODULE_COLORS = ["--b-start", "--b-quick", "--b-earned", "--b-other", "--b-decision", "--b-question", "--b-after"];

interface BucketDef {
  key: string;
  title: string;
  purpose: string;
  color: string;
  items: Item[];
}

const ownerGroup = (i: Item) => (i.team === "other" ? "other" : i.side);
const weekRank = (w: Week) => (w === "after" ? 5 : w);
const doneLast = (a: Item, b: Item) => Number(a.status === "done") - Number(b.status === "done");

function ownerBuckets(items: Item[], customerFirst: boolean): BucketDef[] {
  const defs: BucketDef[] = [
    { key: "o-us", title: "Us", purpose: "Our side of the work.", color: "--b-us", items: [] },
    { key: "o-customer", title: "Customer", purpose: "The customer's core team.", color: "--b-customer", items: [] },
    {
      key: "o-other",
      title: "Customer's other teams",
      purpose: "Identity, security and infrastructure. Not yet in the room.",
      color: "--b-other",
      items: [],
    },
  ];
  const byGroup = { us: defs[0], customer: defs[1], other: defs[2] };
  items.forEach((i) => byGroup[ownerGroup(i)].items.push(i));
  return customerFirst ? [defs[1], defs[2], defs[0]] : defs;
}

export default function App() {
  const tracker = useTracker(baseItems);
  const { items, saved } = tracker;
  const [tab, setTab] = useState<Tab>("plan");
  const [lens, setLensState] = useState<Lens>(() => readPref("activation-tracker:group-by", "lead", LENSES));
  const [weekFilter, setWeekFilter] = useState<WeekFilter>("all");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [resolvedOpen, setResolvedOpen] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [customerView, setCustomerView] = useState(false);
  const [theme, setTheme] = useState(() => readPref("activation-tracker:theme", "dark", ["dark", "light"] as const));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writePref("activation-tracker:theme", theme);
  }, [theme]);

  const setLens = (l: Lens) => {
    setLensState(l);
    writePref("activation-tracker:group-by", l);
  };

  useEffect(() => {
    if (customerView) setTab((t) => (t === "people" ? "plan" : t));
  }, [customerView]);

  const visible = useMemo(
    () => (customerView ? items.filter((i) => i.visibility !== "internal" && !i.conflict) : items),
    [items, customerView],
  );
  const inWeek = useMemo(
    () => (weekFilter === "all" ? visible : visible.filter((i) => i.week === weekFilter)),
    [visible, weekFilter],
  );

  const { pinned, buckets, resolved } = useMemo(() => {
    if (customerView) {
      const sorted = [...inWeek].sort((a, b) => weekRank(a.week) - weekRank(b.week) || doneLast(a, b));
      return { pinned: [] as BucketDef[], buckets: ownerBuckets(sorted, true), resolved: [] as Item[] };
    }
    const open = inWeek.filter((i) => !(i.kind !== "task" && i.status === "done"));
    const allTasks = open.filter((i) => i.kind === "task").sort(doneLast);
    // The Foundation tier gets its own bucket in every grouping, ahead of the others.
    const tasks = allTasks.filter((i) => i.lane !== "foundation");
    const foundationGate = gates.find((g) => g.lane === "foundation");
    const gateDone = foundationGate
      ? foundationGate.linked.filter((id) => items.find((i) => i.id === id)?.status === "done").length
      : 0;
    const foundation: BucketDef = {
      key: "foundation",
      title: "Foundation",
      purpose:
        "Setup every module needs. Starts in week 1, each at its own lead time." +
        (foundationGate
          ? ` Clears “${foundationGate.label}”: ${gateDone} of ${foundationGate.linked.length} done.`
          : ""),
      color: "--b-foundation",
      items: allTasks.filter((i) => i.lane === "foundation"),
    };
    const pinned: BucketDef[] = [
      {
        key: "decisions",
        title: "Decisions",
        purpose: "Someone has to choose. Record what, who and when.",
        color: "--b-decision",
        items: open.filter((i) => i.kind === "decision"),
      },
      {
        key: "questions",
        title: "Questions",
        purpose: "Unknowns in the handoff, and volumes to find out.",
        color: "--b-question",
        items: open.filter((i) => i.kind === "question"),
      },
    ];
    let buckets: BucketDef[];
    if (lens === "lead") {
      const now = tasks.filter((i) => i.week !== "after");
      buckets = [
        { key: "l-start", title: "Start now", purpose: "Long lead, mostly waiting. Start these first.", color: "--b-start", items: now.filter((i) => i.lane === "start") },
        { key: "l-quick", title: "Quick wins", purpose: "Finish early, buy credibility.", color: "--b-quick", items: now.filter((i) => i.lane === "quick") },
        { key: "l-earned", title: "Earned", purpose: "Needs evidence from the first two.", color: "--b-earned", items: now.filter((i) => i.lane === "earned") },
        { key: "l-after", title: "After day 30", purpose: "Started inside the window, lands after it.", color: "--b-after", items: tasks.filter((i) => i.week === "after") },
      ];
    } else if (lens === "owner") {
      buckets = ownerBuckets(tasks, false);
    } else {
      const modules = [...new Set(baseItems.filter((i) => i.kind === "task").map((i) => i.module))];
      buckets = modules.map((m, n) => ({
        key: `m-${m}`,
        title: m,
        purpose: `Tasks for ${m.toLowerCase()}.`,
        color: MODULE_COLORS[n % MODULE_COLORS.length],
        items: tasks.filter((i) => i.module === m),
      }));
    }
    const resolved = inWeek.filter((i) => i.kind !== "task" && i.status === "done");
    return { pinned, buckets: [foundation, ...buckets].filter((b) => b.items.length > 0), resolved };
  }, [inWeek, lens, customerView, items]);

  const shown = (b: BucketDef) => (expanded[b.key] ? b.items : b.items.slice(0, LIMIT));

  // Cards on screen, in the order J/K moves through them.
  const ordered = useMemo(
    () => (tab === "plan" ? [...pinned, ...buckets].flatMap(shown).concat(resolvedOpen ? resolved : []) : []),
    [tab, pinned, buckets, resolved, resolvedOpen, expanded],
  );

  useEffect(() => setFocusIdx(0), [tab, lens, weekFilter, customerView]);

  const openItem = visible.find((i) => i.id === openId);
  const focusedId = ordered[Math.min(focusIdx, ordered.length - 1)]?.id;

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      const t = e.target instanceof HTMLElement ? e.target : document.body;
      if (t.closest("input, textarea, select, [contenteditable]")) {
        if (e.key === "Escape") t.blur();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") setOpenId(null);
      else if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        setKeyboardNav(true);
        setFocusIdx((i) => Math.min(i + 1, ordered.length - 1));
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        setKeyboardNav(true);
        setFocusIdx((i) => Math.max(i - 1, 0));
      } else if (e.key === "Enter" && focusedId && t.tagName !== "BUTTON") {
        e.preventDefault();
        setOpenId(focusedId);
      }
    },
    [ordered.length, focusedId],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const attention = [
    ...visible.filter((i) => i.conflict && i.status !== "done"),
    ...visible.filter((i) => !i.conflict && i.status === "blocked"),
  ].slice(0, 3);

  const open = (id: string) => {
    setOpenId(id);
    const idx = ordered.findIndex((i) => i.id === id);
    if (idx >= 0) setFocusIdx(idx);
  };

  const card = (i: Item) => (
    <Card
      key={i.id}
      item={i}
      focused={i.id === focusedId}
      onOpen={() => open(i.id)}
      onFocus={() => {
        setKeyboardNav(false);
        setFocusIdx(ordered.findIndex((o) => o.id === i.id));
      }}
      scrollOnFocus={keyboardNav}
      showInternalMark={!customerView}
      showWeek={customerView || weekFilter === "all"}
    />
  );

  const bucket = (b: BucketDef, empty?: string) => (
    <Bucket
      key={b.key}
      title={b.title}
      purpose={b.purpose}
      color={b.color}
      count={b.items.length}
      hiddenCount={Math.max(b.items.length - LIMIT, 0)}
      expanded={Boolean(expanded[b.key])}
      onToggle={() => setExpanded((e) => ({ ...e, [b.key]: !e[b.key] }))}
      empty={empty}
    >
      {shown(b).map(card)}
    </Bucket>
  );

  const seg = (active: boolean) =>
    `whitespace-nowrap rounded-md px-2 py-1 sm:px-3 ${active ? "bg-raised text-ink" : "text-muted hover:text-ink"}`;
  const ctrl = "rounded-md border border-line px-2.5 py-1 text-muted hover:text-ink";

  return (
    <div className={`min-h-screen ${openItem ? "xl:pr-[480px]" : ""}`}>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-5 py-3">
          <div className="flex min-w-0 items-baseline gap-2.5">
            <h1 className="truncate text-[18px] font-semibold">{account.customer}</h1>
            <span className="text-[14px] text-muted">
              {formatDate(account.windowStart)} – {formatDate(account.windowEnd, true)}
            </span>
          </div>
          <nav className="flex gap-0.5 rounded-lg border border-line p-0.5 text-[14px]">
            <button type="button" onClick={() => setTab("plan")} className={seg(tab === "plan")}>
              Plan
            </button>
            <button type="button" onClick={() => setTab("success")} className={seg(tab === "success")}>
              Success plan
            </button>
            {!customerView && (
              <button type="button" onClick={() => setTab("people")} className={seg(tab === "people")}>
                People
              </button>
            )}
            <a href="/report.html" className={seg(false)}>
              Full report ↗
            </a>
          </nav>
          <div className="ml-auto flex flex-wrap items-center gap-1.5 text-[14px]">
            <button
              type="button"
              onClick={() => setCustomerView((c) => !c)}
              aria-pressed={customerView}
              className={`rounded-md border px-2.5 py-1 ${
                customerView ? "border-accent/60 text-accent" : "border-line text-muted hover:text-ink"
              }`}
              title="Show only what the customer should see, for screen-sharing"
            >
              Customer view{customerView ? ": on" : ""}
            </button>
            <button type="button" onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} className={ctrl}>
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            {!customerView && (
              <>
                <button type="button" onClick={() => tracker.exportJson(account.customer)} className={ctrl}>
                  Export
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Reset everything saved in this browser for this tracker?")) tracker.reset();
                  }}
                  className={`${ctrl} hover:text-danger`}
                >
                  Reset
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-7xl flex-col gap-6 px-5 pb-20 pt-6">
        {tab === "plan" && (
          <>
            <FirstValueLine
              key={JSON.stringify(saved.firstValue)}
              value={saved.firstValue ?? firstValue}
              edited={saved.firstValue !== null}
              basis={firstValue.basis}
              onSave={tracker.setFirstValue}
            />
            <Milestones gates={gates} items={items} />
            {!customerView && <NeedsAttention items={attention} onOpen={open} />}
          </>
        )}

        {tab === "plan" && (
          <section className="flex flex-col gap-5">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              <h2 className="text-[24px] font-semibold">Plan</h2>
              {customerView ? (
                <span className="text-[14px] text-muted">Grouped by owner, customer first</span>
              ) : (
                <label className="flex items-center gap-2 text-[14px] text-muted">
                  Group by
                  <span className="flex gap-0.5 rounded-lg border border-line p-0.5">
                    {(
                      [
                        ["lead", "Lead time"],
                        ["owner", "Owner"],
                        ["module", "Module"],
                      ] as const
                    ).map(([v, l]) => (
                      <button key={v} type="button" onClick={() => setLens(v)} className={seg(lens === v)}>
                        {l}
                      </button>
                    ))}
                  </span>
                </label>
              )}
              <label className="flex items-center gap-2 text-[14px] text-muted">
                Week
                <span className="flex gap-0.5 rounded-lg border border-line p-0.5">
                  {(["all", 1, 2, 3, 4] as const).map((w) => (
                    <button key={String(w)} type="button" onClick={() => setWeekFilter(w)} className={seg(weekFilter === w)}>
                      {w === "all" ? "All" : w}
                    </button>
                  ))}
                </span>
              </label>
            </div>

            {pinned.length > 0 && (
              <div className="grid items-start gap-4 md:grid-cols-2">
                {bucket(pinned[0], "No open decisions.")}
                {bucket(pinned[1], "No open questions.")}
              </div>
            )}

            <div className="grid items-start gap-4 [grid-template-columns:repeat(auto-fill,minmax(290px,1fr))]">
              {buckets.map((b) => bucket(b))}
            </div>
            {buckets.length === 0 && <p className="text-muted">Nothing scheduled for this week.</p>}

            {resolved.length > 0 && (
              <section className="rounded-xl border border-line">
                <button
                  type="button"
                  onClick={() => setResolvedOpen((o) => !o)}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left"
                  aria-expanded={resolvedOpen}
                >
                  <span className="text-muted">{resolvedOpen ? "▾" : "▸"}</span>
                  <h2 className="text-[20px] font-semibold">Resolved</h2>
                  <span className="text-[15px] text-muted">{resolved.length}</span>
                  <span className="text-[14px] text-faint">Decisions recorded and questions answered</span>
                </button>
                {resolvedOpen && <div className="flex flex-col gap-2 px-3 pb-3">{resolved.map(card)}</div>}
              </section>
            )}
          </section>
        )}

        {tab === "success" && (
          <SuccessPlan
            account={account}
            plan={successPlan}
            firstValue={saved.firstValue ?? firstValue}
            firstValueEdited={saved.firstValue !== null}
            gates={gates}
            items={items}
            people={people}
            ourTeam={ourTeam}
          />
        )}

        {tab === "people" && !customerView && (
          <People
            people={people}
            quadrants={saved.quadrants}
            sentiments={saved.sentiments}
            onMove={tracker.setQuadrant}
            onSentiment={tracker.setSentiment}
          />
        )}

        <footer className="mt-6 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-faint">
          <span>J / K to move · Enter to open · Esc to close</span>
          <span>Saved in this browser only</span>
          <span>Illustrative example. Halden Retail Group is fictional.</span>
        </footer>
      </main>

      {openItem && (
        <Panel
          item={openItem}
          notes={saved.notes[openItem.id] ?? []}
          answer={saved.answers[openItem.id]}
          decision={saved.decisions[openItem.id]}
          customerView={customerView}
          onClose={() => setOpenId(null)}
          onStatus={(s) => tracker.setStatus(openItem.id, s)}
          onNote={(text, internal) => tracker.addNote(openItem.id, text, internal)}
          onAnswer={(text) => tracker.answer(openItem.id, text)}
          onDecide={(d) => tracker.decide(openItem.id, d)}
          onReopen={() => tracker.reopen(openItem.id)}
        />
      )}
    </div>
  );
}
