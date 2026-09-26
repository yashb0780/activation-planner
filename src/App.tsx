import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import { readPref, useTracker, writePref } from "./state";
import type { Dataset, Item, Status } from "./types";
import { Panel } from "./components/Panel";
import { FirstValueLine, Milestones, NeedsAttention, ReviewBox } from "./components/Top";
import { People, PeopleList } from "./components/People";
import { SuccessPlan } from "./components/SuccessPlan";
import { HandoffGate } from "./components/HandoffGate";
import { CustomerWeek } from "./components/CustomerWeek";
import { PlanList, type MenuRequest, type RowActions, type RowInfo } from "./components/PlanList";
import { CommandMenu, type Command } from "./components/CommandMenu";
import { weekLabel } from "./components/ui";
import { currentWeek, dueLabel, formatDate, todayIso } from "./dates";
import { drift, type Drift } from "./drift";
import { fieldLabel } from "./fields";
import { buildGroups, LENS_LABEL, LENSES, type Lens } from "./grouping";
import { RolesContext, type RoleBook } from "./owners";
import { applyRules } from "./rules";
import { describeLead } from "./lead";

type Tab = "plan" | "success" | "people";

/** Sections a reviewer ticks. The Draft badge turns to Reviewed when all are ticked. */
const REVIEW_SECTIONS = [
  { id: "first-value", label: "First value" },
  { id: "milestones", label: "Milestones" },
  { id: "plan", label: "Activation plan" },
  { id: "success-plan", label: "Success plan" },
] as const;

/** The date drift and "this week" are checked against. ?asof=YYYY-MM-DD wins, for reviewing;
 *  then the dataset's fixed demo date, if it has one; then today. */
function readAsOf(pinned?: string): string {
  const v = new URLSearchParams(window.location.search).get("asof");
  return v && /^\d{4}-\d{2}-\d{2}$/.test(v) ? v : (pinned ?? todayIso());
}

const seg = (active: boolean) =>
  `whitespace-nowrap rounded-md px-2.5 py-1 transition-colors ${
    active ? "bg-raised font-medium text-ink" : "text-muted hover:text-ink"
  }`;
const ghost = "rounded-md border border-line px-2.5 py-1 text-muted transition-colors hover:border-line-strong hover:text-ink";

export default function App({ data, switcher }: { data: Dataset; switcher?: ReactNode }) {
  const { account, configFieldLabels, driftRules, firstValue, gateGaps, gates, people, successPlan } = data;
  const derive = useCallback((items: Item[], book: RoleBook) => applyRules(items, book, data.account), [data.account]);
  const tracker = useTracker(`activation-tracker:${data.id}:v2`, data.items, data.roles, derive);
  const { items, saved, roles, book } = tracker;
  const [asOf] = useState(() => readAsOf(data.asOf));
  const [tab, setTab] = useState<Tab>("plan");
  const [lens, setLensState] = useState<Lens>(() => readPref("activation-tracker:group-by:v2", "week", LENSES));
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const [openId, setOpenId] = useState<string | null>(null);
  const [keyboardNav, setKeyboardNav] = useState(false);
  // A request to open the panel on its done form or its On hold reason box, for one item.
  const [panelRequest, setPanelRequest] = useState<{ id: string; kind: "done" | "hold" | "note"; n: number } | undefined>();
  const [menuRequest, setMenuRequest] = useState<MenuRequest | undefined>();
  const [commandsOpen, setCommandsOpen] = useState(false);
  const [customerView, setCustomerView] = useState(false);
  const [theme, setTheme] = useState(() => readPref("activation-tracker:theme", "dark", ["dark", "light"] as const));

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    writePref("activation-tracker:theme", theme);
  }, [theme]);

  // Switching view closes the panel, and Customer view has no People tab.
  useEffect(() => {
    setOpenId(null);
    if (customerView) setTab((t) => (t === "people" ? "plan" : t));
  }, [customerView]);

  const setLens = (l: Lens) => {
    setLensState(l);
    writePref("activation-tracker:group-by:v2", l);
  };

  const visible = useMemo(
    () => (customerView ? items.filter((i) => i.visibility !== "internal" && !i.conflict) : items),
    [items, customerView],
  );
  const drifts = useMemo(() => {
    const m = new Map<string, Drift>();
    items.forEach((i) => {
      const d = drift(i, asOf, account, driftRules);
      if (d) m.set(i.id, d);
    });
    return m;
  }, [items, asOf, account, driftRules]);
  const atRisk = useMemo(
    () => new Set([...drifts].filter(([, d]) => d.flag === "risk").map(([id]) => id)),
    [drifts],
  );

  const reviewedCount = REVIEW_SECTIONS.filter((r) => saved.reviewed[r.id]).length;
  const allReviewed = reviewedCount === REVIEW_SECTIONS.length;
  const review = (id: string) =>
    customerView ? undefined : (
      <ReviewBox checked={Boolean(saved.reviewed[id])} onChange={(on) => tracker.setReviewed(id, on)} />
    );
  const thisWeek = currentWeek(asOf, account);

  const groups = useMemo(
    () => (customerView ? [] : buildGroups(visible, items, lens, account, gates)),
    [customerView, visible, items, lens, account, gates],
  );

  // Rows on screen, in the order j/k moves through them.
  const ordered = useMemo(
    () =>
      tab === "plan" ? groups.filter((g) => !collapsed[g.key]).flatMap((g) => g.sections.flatMap((s) => s.items)) : [],
    [tab, groups, collapsed],
  );

  const info = useCallback(
    (i: Item): RowInfo => ({
      flag: customerView ? null : drifts.get(i.id)?.flag,
      module: i.module,
      due: dueLabel(i.week, account),
    }),
    [customerView, drifts, account],
  );

  /** Open an item's panel on its done form (tasks) or its record/answer form (decisions, questions). */
  const requestPanel = useCallback((id: string, kind: "done" | "hold" | "note") => {
    setSelectedId(id);
    setOpenId(id);
    setPanelRequest((r) => ({ id, kind, n: (r?.n ?? 0) + 1 }));
  }, []);
  const requestDone = useCallback((id: string) => requestPanel(id, "done"), [requestPanel]);

  /** Open an item's panel with nothing pre-opened. */
  const openPanel = useCallback((id: string) => {
    setPanelRequest(undefined);
    setOpenId(id);
  }, []);
  const closePanel = useCallback(() => {
    setPanelRequest(undefined);
    setOpenId(null);
  }, []);

  const actions: RowActions = useMemo(
    () => ({
      // In progress changes at once, and opens the panel on an optional note.
      onStatus: (id: string, st: Status) => {
        tracker.setStatus(id, st);
        if (st === "progress") requestPanel(id, "note");
      },
      // On hold asks for a reason in the side panel first. Closing the panel changes nothing.
      onRequestHold: (id: string) => requestPanel(id, "hold"),
      onRequestDone: requestDone,
      onOwner: tracker.setOwner,
    }),
    [tracker.setStatus, requestPanel, requestDone, tracker.setOwner],
  );

  const openItem = visible.find((i) => i.id === openId);

  const move = useCallback(
    (step: 1 | -1) => {
      if (ordered.length === 0) return;
      const at = ordered.findIndex((i) => i.id === selectedId);
      const next = at < 0 ? 0 : Math.min(Math.max(at + step, 0), ordered.length - 1);
      setKeyboardNav(true);
      setSelectedId(ordered[next]!.id);
    },
    [ordered, selectedId],
  );

  const onKey = useCallback(
    (e: KeyboardEvent) => {
      const t = e.target instanceof HTMLElement ? e.target : document.body;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandsOpen((o) => !o);
        return;
      }
      // Open menus handle their own keys.
      if (t.closest("[data-menu]")) return;
      if (t.closest("input, textarea, select, [contenteditable]")) {
        if (e.key === "Escape") t.blur();
        return;
      }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const k = e.key.toLowerCase();
      if (e.key === "Escape") closePanel();
      else if (k === "v") {
        e.preventDefault();
        setCustomerView((c) => !c);
      } else if (customerView || tab !== "plan") return;
      else if (k === "j") {
        e.preventDefault();
        move(1);
      } else if (k === "k") {
        e.preventDefault();
        move(-1);
      } else if (e.key === "Enter" && selectedId && t.tagName !== "BUTTON") {
        e.preventDefault();
        openPanel(selectedId);
      } else if (k === "x" && selectedId) {
        // Opens the done form. The proof note is still required.
        e.preventDefault();
        requestDone(selectedId);
      } else if ((k === "s" || k === "o") && selectedId) {
        e.preventDefault();
        setMenuRequest((m) => ({ id: selectedId, kind: k === "s" ? "status" : "owner", n: (m?.n ?? 0) + 1 }));
      }
    },
    [customerView, tab, move, selectedId, requestDone, openPanel, closePanel],
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  const attention = [
    ...visible.filter((i) => atRisk.has(i.id)),
    ...visible.filter((i) => i.conflict && i.status !== "done"),
    ...visible.filter((i) => !i.conflict && !atRisk.has(i.id) && i.status === "hold"),
  ].slice(0, 3);

  const open = (id: string) => {
    setSelectedId(id);
    setKeyboardNav(false);
    openPanel(id);
  };

  const commands: Command[] = useMemo(() => {
    const cmds: Command[] = [
      { id: "tab-plan", label: customerView ? "Go to This week" : "Go to Activation plan", hint: "Tab", run: () => setTab("plan") },
      { id: "tab-success", label: "Go to Success plan", hint: "Tab", run: () => setTab("success") },
      {
        id: "view",
        label: customerView ? "Switch to Internal view" : "Switch to Customer view",
        hint: "v",
        run: () => setCustomerView((c) => !c),
      },
      { id: "theme", label: theme === "dark" ? "Use light theme" : "Use dark theme", run: () => setTheme((t) => (t === "dark" ? "light" : "dark")) },
    ];
    if (!customerView) {
      cmds.push(
        { id: "tab-people", label: "Go to People", hint: "Tab", run: () => setTab("people") },
        ...LENSES.map((l) => ({ id: `lens-${l}`, label: `Group by ${LENS_LABEL[l].toLowerCase()}`, hint: "Plan", run: () => { setTab("plan"); setLens(l); } })),
        { id: "collapse", label: "Collapse all groups", hint: "Plan", run: () => setCollapsed(Object.fromEntries(groups.map((g) => [g.key, true]))) },
        { id: "expand", label: "Expand all groups", hint: "Plan", run: () => setCollapsed({}) },
        { id: "export", label: "Export progress as JSON", run: () => tracker.exportJson(account.customer) },
        {
          id: "reset",
          label: "Reset everything saved in this browser…",
          hint: "Asks first",
          confirm: {
            message: "Reset everything saved in this browser for this tracker? Statuses, notes, answers, owner changes and review ticks are cleared. This cannot be undone.",
            action: "Reset",
          },
          run: () => tracker.reset(),
        },
        ...visible.map((i) => ({
          id: `item-${i.id}`,
          label: i.title,
          hint: `${weekLabel(i.week)} · ${i.module}`,
          run: () => {
            setTab("plan");
            setCollapsed({});
            setKeyboardNav(true);
            open(i.id);
          },
        })),
      );
    }
    return cmds;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customerView, theme, groups, visible, account.customer]);

  return (
    <RolesContext.Provider value={book}>
      <div className={`min-h-screen transition-[padding] ${openItem ? "xl:pr-[var(--panel-width)]" : ""}`}>
        <header className="sticky top-0 z-20 border-b border-line bg-bg/90 backdrop-blur">
          <div className="mx-auto flex max-w-[var(--page-max)] flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2">
            {(() => {
              const dates = (
                <span className="tabular">
                  {formatDate(account.windowStart)} – {formatDate(account.windowEnd, true)}
                </span>
              );
              const draft = (
                <span
                  className="inline-flex items-center gap-1 whitespace-nowrap text-muted"
                  title={allReviewed ? "Every section has been reviewed" : "Tick Reviewed on every section to clear the draft"}
                >
                  <span aria-hidden className={`h-1.5 w-1.5 rounded-full ${allReviewed ? "bg-st-done" : "bg-flag-drift"}`} />
                  {allReviewed ? "Reviewed" : customerView ? "Draft" : `Draft ${reviewedCount}/${REVIEW_SECTIONS.length}`}
                </span>
              );
              const link = account.productUrl && (
                <a
                  href={account.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-muted underline-offset-2 hover:text-ink hover:underline"
                >
                  {account.productUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                </a>
              );
              const customer = `${account.customer}${data.fictionalCustomer ? " (fictional)" : ""}`;
              return data.productFirst ? (
                <>
                  <div className="flex min-w-0 shrink-0 flex-col leading-tight">
                    <h1 className="truncate text-lg font-semibold">{account.product}</h1>
                    {link}
                  </div>
                  <div className="flex min-w-0 shrink-0 flex-col leading-tight text-xs text-faint">
                    <span className="truncate text-muted">Customer: {customer}</span>
                    <span className="flex items-center gap-2">
                      {dates}
                      {draft}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex min-w-0 shrink-0 flex-col leading-tight">
                    <h1 className="truncate text-base font-semibold">{customer}</h1>
                    <span className="flex items-center gap-2 text-xs text-faint">
                      {dates}
                      {draft}
                    </span>
                  </div>
                  <div className="flex min-w-0 shrink-0 flex-col leading-tight">
                    <span className="text-xs text-faint">Product</span>
                    <span className="truncate text-sm font-semibold">{account.product}</span>
                    {link}
                  </div>
                </>
              );
            })()}
            {switcher}
            <nav className="flex shrink-0 flex-wrap gap-0.5 text-sm">
              <button type="button" onClick={() => setTab("plan")} className={seg(tab === "plan")}>
                {customerView ? "This week" : "Activation plan"}
              </button>
              <button type="button" onClick={() => setTab("success")} className={seg(tab === "success")}>
                Success plan
              </button>
              {!customerView && (
                <button type="button" onClick={() => setTab("people")} className={seg(tab === "people")}>
                  People
                </button>
              )}
            </nav>
            <div className="ml-auto flex shrink-0 items-center gap-2 text-sm">
              <span
                role="group"
                aria-label="View"
                className="flex gap-0.5 rounded-md border border-line p-0.5"
                title="v switches view. Customer view shows only what the customer should see."
              >
                <button type="button" onClick={() => setCustomerView(false)} aria-pressed={!customerView} className={seg(!customerView)}>
                  Internal
                </button>
                <button type="button" onClick={() => setCustomerView(true)} aria-pressed={customerView} className={seg(customerView)}>
                  Customer
                </button>
              </span>
              <a href="/report.html" className={`${ghost} inline-flex items-center gap-1.5`} title="Full report: an older version, being updated">
                Report ↗<span className="rounded-full border border-line px-1.5 text-xs text-faint">older</span>
              </a>
              <button
                type="button"
                onClick={() => setCommandsOpen(true)}
                className={ghost}
                title="Command menu: jump anywhere, export, reset (⌘K or Ctrl+K)"
              >
                ⌘K
              </button>
              <button
                type="button"
                onClick={() => setTheme((t) => (t === "dark" ? "light" : "dark"))}
                className={ghost}
                aria-label={theme === "dark" ? "Use light theme" : "Use dark theme"}
                title={theme === "dark" ? "Use light theme" : "Use dark theme"}
              >
                {theme === "dark" ? "☀" : "☾"}
              </button>
            </div>
          </div>
          {data.disclaimer && (
            <p className="mx-auto max-w-[var(--page-max)] border-t border-line px-4 py-1 text-xs text-faint">{data.disclaimer}</p>
          )}
        </header>

        <main className="mx-auto flex max-w-[var(--page-max)] flex-col gap-4 px-4 pb-16 pt-4">
          {tab === "plan" && customerView && (
            <CustomerWeek
              items={visible.filter((i) => i.week === thisWeek)}
              week={thisWeek}
              account={account}
              openId={openId}
              onOpen={open}
            />
          )}

          {tab === "plan" && !customerView && (
            <>
              <HandoffGate gaps={gateGaps} agentReads={data.agentReads} />
              <FirstValueLine
                key={JSON.stringify(saved.firstValue)}
                value={saved.firstValue ?? firstValue}
                edited={saved.firstValue !== null}
                basis={firstValue.basis}
                notProposed={firstValue.notProposed}
                onSave={tracker.setFirstValue}
                review={review("first-value")}
              />
              <Milestones gates={gates} items={items} review={review("milestones")} />
              <NeedsAttention items={attention} atRisk={atRisk} onOpen={open} />

              <section className="flex flex-col gap-3">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <h2 className="text-lg font-semibold">Activation plan</h2>
                  {review("plan")}
                  <label className="ml-auto flex items-center gap-2 text-xs text-muted">
                    Group by
                    <span className="flex gap-0.5 rounded-md border border-line p-0.5 text-sm">
                      {LENSES.map((l) => (
                        <button key={l} type="button" onClick={() => setLens(l)} className={seg(lens === l)}>
                          {LENS_LABEL[l]}
                        </button>
                      ))}
                    </span>
                  </label>
                </div>
                <PlanList
                  groups={groups}
                  collapsed={collapsed}
                  onToggle={(k) => setCollapsed((c) => ({ ...c, [k]: !c[k] }))}
                  selectedId={selectedId}
                  scrollToSelected={keyboardNav}
                  onSelect={(id) => {
                    setKeyboardNav(false);
                    setSelectedId(id);
                  }}
                  onOpen={openPanel}
                  info={info}
                  roles={roles}
                  actions={actions}
                  menuRequest={menuRequest}
                />
              </section>
            </>
          )}

          {tab === "success" && (
            <SuccessPlan
              account={account}
              plan={successPlan}
              firstValue={saved.firstValue ?? firstValue}
              firstValueEdited={saved.firstValue !== null}
              firstValueNotProposed={firstValue.notProposed}
              gates={gates}
              items={items}
              roles={roles}
              review={review("success-plan")}
            />
          )}

          {tab === "people" && !customerView && <PeopleList roles={roles} onRename={tracker.renameRole} />}

          {tab === "people" && !customerView && (
            <People
              people={people}
              quadrants={saved.quadrants}
              sentiments={saved.sentiments}
              onMove={tracker.setQuadrant}
              onSentiment={tracker.setSentiment}
            />
          )}

          <footer className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-xs text-faint">
            {!customerView && <span>j / k move · Enter open · s status · o owner · x done · v view · ⌘K commands</span>}
            {customerView && <span>v switches back to Internal</span>}
            <span>Saved in this browser only</span>
            <span>
              As of {formatDate(asOf, true)}
              {data.asOf && asOf === data.asOf ? " (demo date)" : ""}
            </span>
            <span>{data.note}</span>
          </footer>
        </main>

        {openItem && (
          <Panel
            item={openItem}
            notes={saved.notes[openItem.id] ?? []}
            answer={saved.answers[openItem.id]}
            decision={saved.decisions[openItem.id]}
            customerView={customerView}
            onClose={closePanel}
            onStatus={(s) => tracker.setStatus(openItem.id, s)}
            onHold={(r) => tracker.setHold(openItem.id, r)}
            fieldName={(ids) => ids.map((f) => fieldLabel(f, openItem.module, configFieldLabels)).join(" · ")}
            checks={saved.checks[openItem.id] ?? []}
            onToggleCheck={(n) => tracker.toggleCheck(openItem.id, n)}
            onNote={(text, internal) => tracker.addNote(openItem.id, text, internal)}
            onAnswer={(text) => tracker.answer(openItem.id, text)}
            onDecide={(d) => tracker.decide(openItem.id, d)}
            onReopen={() => tracker.reopen(openItem.id)}
            sources={[
              ...openItem.from.filter((f) => f !== "config"),
              ...openItem.from.filter((f) => f === "config"),
            ].map((f) => fieldLabel(f, openItem.module, configFieldLabels))}
            due={dueLabel(openItem.week, account)}
            lead={describeLead(openItem, account)}
            dependencies={(openItem.dependsOn ?? []).flatMap((id) => visible.filter((i) => i.id === id))}
            onOpenItem={open}
            drift={drifts.get(openItem.id) ?? null}
            asOf={asOf}
            roles={roles}
            history={saved.ownerHistory[openItem.id] ?? []}
            onOwner={(side, roleId) => tracker.setOwner(openItem.id, side, roleId)}
            doneRequest={panelRequest?.id === openItem.id && panelRequest.kind === "done" ? panelRequest.n : undefined}
            holdRequest={panelRequest?.id === openItem.id && panelRequest.kind === "hold" ? panelRequest.n : undefined}
            noteRequest={panelRequest?.id === openItem.id && panelRequest.kind === "note" ? panelRequest.n : undefined}
          />
        )}

        {commandsOpen && <CommandMenu commands={commands} onClose={() => setCommandsOpen(false)} />}
      </div>
    </RolesContext.Provider>
  );
}
