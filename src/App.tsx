import { useCallback, useEffect, useMemo, useState } from "react";
import { account, items as baseItems } from "./data/halden";
import { readPref, useTracker, writePref } from "./state";
import type { Item, Lane, Status, Week } from "./types";
import { Avatar, Card, ModulePill } from "./components/Card";
import { Panel } from "./components/Panel";
import { StatusIcon } from "./components/icons";

type View = "week" | "board" | "questions";

const WEEKS: Week[] = [1, 2, 3, 4, "after"];
const LANES: { value: Lane; label: string; hint: string }[] = [
  { value: "start", label: "Start now", hint: "Long lead time. Waiting is the part you can't get back." },
  { value: "quick", label: "Quick wins", hint: "Short lead time. Finish early." },
  { value: "earned", label: "Earned", hint: "Only counts once earlier work holds up." },
];
const COLUMNS: { value: Status; label: string }[] = [
  { value: "todo", label: "Todo" },
  { value: "progress", label: "In progress" },
  { value: "blocked", label: "Blocked" },
  { value: "done", label: "Done" },
];

const isQuestion = (i: Item) => i.kind === "question" || i.kind === "volume";

function formatDate(iso: string, withYear = false) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
  });
}

export default function App() {
  const { items, saved, setStatus, addNote, answer, reset, exportJson } = useTracker(baseItems);
  const [view, setView] = useState<View>("week");
  const [week, setWeek] = useState<Week>(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const [focusIdx, setFocusIdx] = useState(0);
  const [customerView, setCustomerView] = useState(false);
  const [theme, setTheme] = useState(() => readPref("activation-tracker:theme", "dark"));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writePref("activation-tracker:theme", theme);
  }, [theme]);

  const visible = useMemo(
    () => (customerView ? items.filter((i) => i.visibility !== "internal") : items),
    [items, customerView],
  );

  // The cards on screen, in the order J/K moves through them.
  const ordered = useMemo(() => {
    if (view === "week") {
      const inWeek = visible.filter((i) => i.week === week && i.kind !== "question");
      return LANES.flatMap((l) => inWeek.filter((i) => i.lane === l.value));
    }
    if (view === "board") {
      const cards = visible.filter((i) => i.kind !== "question");
      return COLUMNS.flatMap((c) => cards.filter((i) => i.status === c.value));
    }
    return visible.filter((i) => isQuestion(i) && i.status !== "done");
  }, [visible, view, week]);

  useEffect(() => setFocusIdx(0), [view, week, customerView]);

  const openItem = items.find((i) => i.id === openId && (!customerView || i.visibility !== "internal"));
  const focusedId = ordered[Math.min(focusIdx, ordered.length - 1)]?.id;

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      const t = e.target instanceof HTMLElement ? e.target : document.body;
      if (t.closest("input, textarea, select, [contenteditable]")) {
        if (e.key === "Escape") t.blur();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (e.key === "Escape") {
        setOpenId(null);
      } else if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        setFocusIdx((i) => Math.min(i + 1, ordered.length - 1));
      } else if (e.key === "k" || e.key === "K") {
        e.preventDefault();
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

  const done = visible.filter((i) => i.status === "done").length;
  const tasks = visible.filter((i) => i.kind === "task");
  const started = tasks.filter((i) => i.status === "progress" || i.status === "done").length;
  const withProof = tasks.filter((i) => i.status === "done").length;
  const landingAfter = tasks.filter((i) => i.week === "after").length;
  const openQuestions = visible.filter((i) => isQuestion(i) && i.status !== "done");

  const attention = [
    ...visible.filter((i) => i.kind === "conflict" && i.status !== "done"),
    ...visible.filter((i) => i.kind !== "conflict" && i.status === "blocked"),
  ].slice(0, 3);

  const open = (id: string) => {
    setOpenId(id);
    const idx = ordered.findIndex((i) => i.id === id);
    if (idx >= 0) setFocusIdx(idx);
  };

  const card = (i: Item, stacked = false) => (
    <Card
      stacked={stacked}
      key={i.id}
      item={i}
      focused={i.id === focusedId}
      onOpen={() => open(i.id)}
      onFocus={() => setFocusIdx(ordered.findIndex((o) => o.id === i.id))}
      showInternalMark={!customerView}
    />
  );

  return (
    <div className={`min-h-screen ${openItem ? "lg:pr-[440px]" : ""}`}>
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5">
          <div className="flex min-w-0 items-baseline gap-2">
            <h1 className="truncate text-[14px] font-semibold">{account.customer}</h1>
            <span className="text-[12px] text-muted">
              {formatDate(account.windowStart)} – {formatDate(account.windowEnd, true)}
            </span>
          </div>
          <nav className="flex gap-0.5 rounded-md border border-line p-0.5 text-[12px]">
            {(
              [
                ["week", "This week"],
                ["board", "Board"],
                ["questions", `Open questions${openQuestions.length ? ` ${openQuestions.length}` : ""}`],
              ] as const
            ).map(([v, label]) => (
              <button
                key={v}
                type="button"
                onClick={() => setView(v)}
                className={`rounded px-2 py-0.5 ${view === v ? "bg-raised text-ink" : "text-muted hover:text-ink"}`}
              >
                {label}
              </button>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-1 text-[12px]">
            <button
              type="button"
              onClick={() => setCustomerView((c) => !c)}
              aria-pressed={customerView}
              className={`rounded border px-2 py-0.5 ${
                customerView ? "border-accent/60 text-accent" : "border-line text-muted hover:text-ink"
              }`}
              title="Hide internal items and notes, for screen-sharing"
            >
              Customer view{customerView ? ": on" : ""}
            </button>
            <button
              type="button"
              onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
              className="rounded border border-line px-2 py-0.5 text-muted hover:text-ink"
            >
              {theme === "dark" ? "Light" : "Dark"}
            </button>
            <button
              type="button"
              onClick={() => exportJson(account.customer)}
              className="rounded border border-line px-2 py-0.5 text-muted hover:text-ink"
            >
              Export
            </button>
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Reset all statuses, notes and answers saved in this browser?")) reset();
              }}
              className="rounded border border-line px-2 py-0.5 text-muted hover:text-danger"
            >
              Reset
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-4">
        <section className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <div className="flex min-w-[200px] flex-1 items-center gap-2">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-raised">
              <div
                className="h-full rounded-full bg-accent transition-[width]"
                style={{ width: `${visible.length ? (done / visible.length) * 100 : 0}%` }}
              />
            </div>
            <span className="text-[12px] tabular-nums text-muted">
              {done}/{visible.length} done
            </span>
          </div>
          <dl className="flex gap-5 text-[12px]">
            {(
              [
                ["Started", started],
                ["With proof", withProof],
                ["Landing after day 30", landingAfter],
              ] as const
            ).map(([label, n]) => (
              <div key={label} className="flex items-baseline gap-1.5">
                <dd className="text-[14px] font-semibold tabular-nums">{n}</dd>
                <dt className="text-muted">{label}</dt>
              </div>
            ))}
          </dl>
        </section>

        {attention.length > 0 && (
          <section className="mt-3 rounded-md border border-line bg-panel px-3 py-2">
            <h2 className="mb-1 text-[11px] font-medium uppercase tracking-wide text-faint">Needs attention</h2>
            <ul className="flex flex-col gap-0.5">
              {attention.map((i) => (
                <li key={i.id}>
                  <button
                    type="button"
                    onClick={() => open(i.id)}
                    className="flex w-full items-center gap-2 rounded px-1 py-0.5 text-left hover:bg-hover"
                  >
                    <span className={i.kind === "conflict" ? "text-warn" : "text-danger"}>
                      {i.kind === "conflict" ? "Conflict" : "Blocked"}
                    </span>
                    <span className="min-w-0 flex-1 truncate">{i.title}</span>
                    <Avatar name={i.owner} />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {view === "week" && (
          <section className="mt-5">
            <div className="flex gap-0.5 border-b border-line text-[12px]">
              {WEEKS.map((w) => (
                <button
                  key={String(w)}
                  type="button"
                  onClick={() => setWeek(w)}
                  className={`-mb-px border-b px-3 py-1.5 ${
                    week === w ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {w === "after" ? "After day 30" : `Week ${w}`}
                </button>
              ))}
            </div>

            {week === 1 && openQuestions.length > 0 && (
              <button
                type="button"
                onClick={() => setView("questions")}
                className="mt-3 flex w-full items-center gap-2 rounded-md border border-dashed border-line px-2.5 py-2 text-left text-muted hover:bg-hover"
              >
                <StatusIcon status="todo" />
                <span className="flex-1">
                  {openQuestions.filter((i) => i.kind === "question").length} open questions to ask this week
                </span>
                <span className="text-[12px]">Answer them →</span>
              </button>
            )}

            {LANES.map((lane) => {
              const laneItems = ordered.filter((i) => i.lane === lane.value);
              if (!laneItems.length) return null;
              return (
                <div key={lane.value} className="mt-5">
                  <div className="mb-1.5 flex items-baseline gap-2">
                    <h2 className="text-[12px] font-medium">{lane.label}</h2>
                    <span className="text-[12px] text-faint">{laneItems.length}</span>
                    <span className="hidden text-[12px] text-faint sm:inline">· {lane.hint}</span>
                  </div>
                  <div className="flex flex-col gap-1">{laneItems.map((i) => card(i))}</div>
                </div>
              );
            })}
            {ordered.length === 0 && <p className="mt-6 text-muted">Nothing scheduled here.</p>}
          </section>
        )}

        {view === "board" && (
          <section className="mt-5 grid gap-3 md:grid-cols-4">
            {COLUMNS.map((col) => {
              const colItems = ordered.filter((i) => i.status === col.value);
              return (
                <div key={col.value} className="min-w-0">
                  <div className="mb-1.5 flex items-center gap-1.5 px-0.5">
                    <StatusIcon status={col.value} size={12} />
                    <h2 className="text-[12px] font-medium">{col.label}</h2>
                    <span className="text-[12px] text-faint">{colItems.length}</span>
                  </div>
                  <div className="flex flex-col gap-1">{colItems.map((i) => card(i, true))}</div>
                </div>
              );
            })}
          </section>
        )}

        {view === "questions" && (
          <QuestionList
            items={ordered}
            focusedId={focusedId}
            onOpen={open}
            onAnswer={answer}
            answeredCount={visible.filter((i) => isQuestion(i) && i.status === "done").length}
          />
        )}

        <footer className="mt-12 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-faint">
          <span>J / K to move · Enter to open · Esc to close</span>
          <span>Saved in this browser only</span>
          <a href="/report.html" className="underline decoration-line underline-offset-2 hover:text-muted">
            Full report
          </a>
          <span>Illustrative example. Halden Retail Group is fictional.</span>
        </footer>
      </main>

      {openItem && (
        <Panel
          item={openItem}
          notes={saved.notes[openItem.id] ?? []}
          answer={saved.answers[openItem.id]}
          customerView={customerView}
          onClose={() => setOpenId(null)}
          onStatus={(s) => setStatus(openItem.id, s)}
          onNote={(text, internal) => addNote(openItem.id, text, internal)}
        />
      )}
    </div>
  );
}

function QuestionList({
  items,
  focusedId,
  onOpen,
  onAnswer,
  answeredCount,
}: {
  items: Item[];
  focusedId?: string;
  onOpen: (id: string) => void;
  onAnswer: (id: string, text: string) => void;
  answeredCount: number;
}) {
  const groups = [
    { label: "Unknowns in the handoff", items: items.filter((i) => i.kind === "question") },
    { label: "Find out the volume", items: items.filter((i) => i.kind === "volume") },
  ];
  return (
    <section className="mt-5">
      {groups.map((g) =>
        g.items.length ? (
          <div key={g.label} className="mb-6">
            <div className="mb-1.5 flex items-baseline gap-2">
              <h2 className="text-[12px] font-medium">{g.label}</h2>
              <span className="text-[12px] text-faint">{g.items.length}</span>
            </div>
            <ul className="flex flex-col gap-1">
              {g.items.map((i) => (
                <QuestionRow key={i.id} item={i} focused={i.id === focusedId} onOpen={onOpen} onAnswer={onAnswer} />
              ))}
            </ul>
          </div>
        ) : null,
      )}
      {items.length === 0 && <p className="text-muted">Every question is answered.</p>}
      {answeredCount > 0 && <p className="text-[12px] text-faint">{answeredCount} answered. Answers are on each item's panel.</p>}
    </section>
  );
}

function QuestionRow({
  item,
  focused,
  onOpen,
  onAnswer,
}: {
  item: Item;
  focused: boolean;
  onOpen: (id: string) => void;
  onAnswer: (id: string, text: string) => void;
}) {
  const [text, setText] = useState("");
  const submit = () => {
    if (text.trim()) onAnswer(item.id, text.trim());
  };
  return (
    <li
      className={`flex flex-wrap items-center gap-2 rounded-md border px-2.5 py-1.5 ${
        focused ? "border-accent/60 bg-hover" : "border-line bg-panel"
      }`}
      ref={(el) => {
        if (focused) el?.scrollIntoView({ block: "nearest" });
      }}
    >
      <button type="button" onClick={() => onOpen(item.id)} className="flex min-w-0 flex-1 items-center gap-2 text-left">
        <StatusIcon status={item.status} />
        <span className="truncate">{item.title}</span>
      </button>
      <span className="hidden md:inline-flex">
        <ModulePill module={item.module} />
      </span>
      <Avatar name={item.owner} />
      <form
        className="flex w-full gap-1 sm:w-64"
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={item.kind === "volume" ? "Volume per month…" : "Answer…"}
          className="min-w-0 flex-1 rounded border border-line bg-bg px-2 py-0.5 text-[12px] outline-none focus:border-accent/60"
        />
        <button
          type="submit"
          disabled={!text.trim()}
          className="rounded border border-line px-2 py-0.5 text-[12px] text-muted hover:bg-hover hover:text-ink disabled:opacity-40"
        >
          Answer
        </button>
      </form>
    </li>
  );
}
