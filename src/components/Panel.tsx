import { useEffect, useRef, useState, type ReactNode } from "react";
import { formatDate } from "../dates";
import type { Drift } from "../drift";
import { displayName, labelOf, rolesFor, useRoles } from "../owners";
import type { OwnerChange } from "../state";
import type { Decision, Item, Note, Role, Side, Status } from "../types";
import { EyeOffIcon } from "./icons";
import { DriftFlagChip, FLAG_LABEL, OwnerMenu, pillBg, STATUS, StatusDot } from "./Status";

const ORDER: Status[] = ["todo", "progress", "hold", "done"];
const KIND_LABEL = { task: "Task", decision: "Decision", question: "Question" } as const;
const SIDE_LABEL: Record<Side, string> = { us: "Our side", customer: "Their side" };

// The side panel for one item. It opens in both views.
// Customer view is read-only, and never shows: source tags (the handoff fields and the
// call or document an item came from), Promised in sales, Promise at risk, Verify and
// agent's read lines, drift detail, hold reasons, or internal notes.

/** An owner line for one side, read-only: "Owen Achebe · Identity / IT contact". */
function OwnerText({ item, side }: { item: Item; side: Side }) {
  const book = useRoles();
  const ids = rolesFor(item, side);
  if (ids.length === 0) return <span className="text-muted">Not named</span>;
  return (
    <span className="flex flex-col gap-0.5">
      {ids.map((id) => (
        <span key={id}>
          {displayName(book, id)}
          <span className="text-xs text-faint"> · {labelOf(book, id)}</span>
        </span>
      ))}
    </span>
  );
}

interface PanelProps {
  item: Item;
  notes: Note[];
  answer?: string;
  decision?: Decision;
  customerView: boolean;
  onClose: () => void;
  onStatus: (s: Status) => void;
  onHold: (reason: string) => void;
  onNote: (text: string, internal: boolean) => void;
  onAnswer: (text: string) => void;
  onDecide: (d: Decision) => void;
  onReopen: () => void;
  /** The handoff fields (or "product config") this item came from, one name each. */
  sources: string[];
  /** "20 Sept", or "After day 30". */
  due: string;
  /** Items this one depends on, as the current view shows them. */
  dependencies: Item[];
  /** Open another item's panel, from the dependency list. */
  onOpenItem: (id: string) => void;
  /** Field name for one checklist line's sources. */
  fieldName: (ids: string[]) => string;
  checks: number[];
  onToggleCheck: (line: number) => void;
  drift: Drift | null;
  asOf: string;
  roles: Role[];
  history: OwnerChange[];
  onOwner: (side: Side, roleId: string) => void;
  /** Goes up by one each time x is pressed, or Done is picked on a row: open the done form. */
  doneRequest?: number;
  /** Goes up by one each time On hold is picked on a row: open the reason box. */
  holdRequest?: number;
  /** Goes up by one each time In progress is picked on a row: focus the optional note box. */
  noteRequest?: number;
}

/** A small rounded heading inside a section. */
function PillHeading({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex rounded-full border border-line bg-raised px-2.5 py-0.5 text-xs font-semibold text-muted">
      {children}
    </span>
  );
}

function Section({ label, children, aside }: { label: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="border-t border-line px-5 py-4">
      <div className="mb-2 flex items-center gap-2">
        <h3 className="text-xs font-semibold text-muted">{label}</h3>
        {aside && <span className="ml-auto">{aside}</span>}
      </div>
      {children}
    </section>
  );
}

const field = "w-full rounded-md border border-line bg-bg px-2.5 py-1.5 text-sm outline-none transition-colors focus:border-accent";
const primary = "rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-on-accent transition-opacity disabled:opacity-40";
const quiet = "rounded-md px-2.5 py-1.5 text-xs text-muted transition-colors hover:bg-hover hover:text-ink";

export function Panel(props: PanelProps) {
  const { item, notes, answer, decision, customerView, onClose, onStatus, onNote } = props;
  const [draft, setDraft] = useState("");
  const [internal, setInternal] = useState(true);
  const [confirmingDone, setConfirmingDone] = useState(false);
  const [holding, setHolding] = useState(false);
  const [holdText, setHoldText] = useState("");
  const [doneNote, setDoneNote] = useState("");
  const [notEvidenceChecked, setNotEvidenceChecked] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [decided, setDecided] = useState("");
  const [by, setBy] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const noteBox = useRef<HTMLTextAreaElement>(null);
  const [noteHint, setNoteHint] = useState(false);

  useEffect(() => {
    setDraft("");
    setConfirmingDone(false);
    setHolding(false);
    setHoldText("");
    setDoneNote("");
    setNotEvidenceChecked(false);
    setAnswerText("");
    setDecided("");
    setBy("");
    setNoteHint(false);
  }, [item.id]);

  // x on a row, or Done picked from a row's menu: open the done form. The proof note is still required.
  useEffect(() => {
    if (props.doneRequest && item.kind === "task" && item.status !== "done") setConfirmingDone(true);
    // Only when a request comes in, not when the item changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.doneRequest]);

  // On hold picked on a row: open the reason box. Nothing changes until a reason is saved.
  useEffect(() => {
    if (!props.holdRequest) return;
    setConfirmingDone(false);
    setHoldText(item.holdReason ?? "");
    setHolding(true);
    // Only when a request comes in.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.holdRequest]);

  // In progress picked on a row: the status has already changed; offer an optional note.
  useEffect(() => {
    if (!props.noteRequest) return;
    setNoteHint(true);
    noteBox.current?.scrollIntoView({ block: "center" });
    noteBox.current?.focus();
  }, [props.noteRequest]);

  const visibleNotes = customerView ? notes.filter((n) => !n.internal) : notes;
  const needsCheck = item.notEvidence.length > 0;
  const canConfirm = doneNote.trim().length > 0 && (!needsCheck || notEvidenceChecked);
  const resolved = item.kind !== "task" && item.status === "done";

  function pickStatus(s: Status) {
    setConfirmingDone(false);
    setHolding(false);
    if (s === "hold") {
      setHoldText(item.holdReason ?? "");
      setHolding(true);
      return;
    }
    if (s === item.status) return;
    if (s === "done") {
      if (item.kind === "task") setConfirmingDone(true);
      return; // Decisions and questions are done by recording them below.
    }
    onStatus(s);
  }

  function confirmDone() {
    if (!canConfirm) return;
    onNote(doneNote.trim(), internal);
    onStatus("done");
    setConfirmingDone(false);
  }

  return (
    <aside
      role="dialog"
      aria-label={item.title}
      className="fixed inset-y-0 right-0 z-30 flex w-full max-w-[var(--panel-width)] flex-col overflow-hidden rounded-l-2xl border-l border-line bg-panel shadow-[var(--shadow-menu)]"
    >
      <header className="flex items-start gap-3 px-5 pb-2 pt-5">
        <h2 className="flex-1 text-lg font-semibold">{item.title}</h2>
        <button type="button" onClick={onClose} className={quiet} aria-label="Close (Esc)" title="Close (Esc)">
          ✕
        </button>
      </header>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 px-5 pb-3 text-xs text-muted">
        <span className="rounded-sm border border-line px-1.5">{KIND_LABEL[item.kind]}</span>
        <span>{item.module}</span>
        <span className="tabular">Due {props.due}</span>
        {!customerView && item.visibility === "internal" && (
          <span className="inline-flex items-center gap-1 text-warn" title="Hidden in customer view">
            <EyeOffIcon /> Internal only
          </span>
        )}
        {!customerView && props.drift?.flag && <DriftFlagChip flag={props.drift.flag} />}
      </div>
      <p className="px-5 pb-4 text-sm leading-relaxed">{item.description}</p>

      <div className="flex-1 overflow-y-auto">
        {customerView ? (
          <Section label="Status">
            <StatusDot status={item.status} />
            {item.window && <p className="mt-3 text-sm text-muted">Expected window: {item.window}</p>}
          </Section>
        ) : (
        <Section label="Status">
          <div role="radiogroup" aria-label="Status" className="flex flex-wrap gap-1.5">
            {ORDER.map((s) => {
              const on = item.status === s;
              return (
                <button
                  key={s}
                  type="button"
                  role="radio"
                  aria-checked={on}
                  onClick={() => pickStatus(s)}
                  className={`inline-flex h-[var(--pill-height)] items-center gap-2 rounded-full border px-3 text-xs font-medium transition-colors ${
                    on ? "border-transparent" : "border-line text-muted hover:bg-hover"
                  }`}
                  style={on ? { color: STATUS[s].ink, background: pillBg(s) } : undefined}
                >
                  <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: STATUS[s].color }} />
                  {STATUS[s].label}
                </button>
              );
            })}
          </div>
          {item.status === "hold" && item.holdReason && !holding && (
            <p className="mt-3 text-sm">
              <span className="font-medium" style={{ color: STATUS.hold.ink }}>
                On hold:
              </span>{" "}
              {item.holdReason}{" "}
              <button type="button" onClick={() => pickStatus("hold")} className="text-xs text-muted underline-offset-4 hover:underline">
                Change
              </button>
            </p>
          )}
          {item.window && <p className="mt-3 text-sm text-muted">Expected window: {item.window}</p>}

          {holding && (
            <form
              className="mt-3 flex flex-col gap-2 rounded-lg border border-line bg-raised p-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (!holdText.trim()) return;
                props.onHold(holdText.trim());
                setHolding(false);
              }}
            >
              <label htmlFor="hold-reason" className="text-xs text-muted">
                Why is it on hold? A reason is required.
              </label>
              <input id="hold-reason" autoFocus value={holdText} onChange={(e) => setHoldText(e.target.value)} className={field} />
              <div className="flex gap-2">
                <button type="submit" disabled={!holdText.trim()} className={primary}>
                  Put on hold
                </button>
                <button type="button" onClick={() => setHolding(false)} className={quiet}>
                  Cancel
                </button>
              </div>
            </form>
          )}

          {confirmingDone && (
            <div className="mt-3 rounded-lg border border-line bg-raised p-3">
              <label className="mb-1.5 block text-xs text-muted" htmlFor="done-note">
                What proves this is done? A note is required.
              </label>
              <textarea
                id="done-note"
                autoFocus
                value={doneNote}
                onChange={(e) => setDoneNote(e.target.value)}
                rows={3}
                className={field}
                placeholder="What was built, and what shows it is being used"
              />
              {needsCheck && (
                <div className="mt-3">
                  <p className="text-xs text-muted">Not evidence for this module:</p>
                  <ul className="my-1.5 list-disc pl-5 text-sm text-muted">
                    {item.notEvidence.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                  <label className="flex items-start gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={notEvidenceChecked}
                      onChange={(e) => setNotEvidenceChecked(e.target.checked)}
                      className="mt-1.5 accent-[var(--accent)]"
                    />
                    The proof is none of these.
                  </label>
                </div>
              )}
              <div className="mt-3 flex gap-2">
                <button type="button" disabled={!canConfirm} onClick={confirmDone} className={primary}>
                  Mark done
                </button>
                <button type="button" onClick={() => setConfirmingDone(false)} className={quiet}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Section>
        )}

        {customerView ? (
          <Section label="Owners">
            <div className="flex flex-col gap-2">
              {(["us", "customer"] as const).map((side) => (
                <div key={side} className="flex items-start gap-3 text-sm">
                  <span className="w-24 shrink-0 pt-0.5 text-xs text-muted">{SIDE_LABEL[side]}</span>
                  <OwnerText item={item} side={side} />
                </div>
              ))}
            </div>
          </Section>
        ) : (
          <Section label="Owners">
            <div className="flex flex-col gap-2">
              {(["us", "customer"] as const).map((side) => (
                <div key={side} className="flex items-center gap-3 text-sm">
                  <span className="w-24 shrink-0 text-xs text-muted">{SIDE_LABEL[side]}</span>
                  <span className="min-w-0">
                    <OwnerMenu item={item} side={side} roles={props.roles} onOwner={(r) => props.onOwner(side, r)} />
                  </span>
                </div>
              ))}
            </div>
            {props.history.length > 0 && (
              <ul className="mt-3 space-y-0.5 text-xs text-faint">
                {props.history.map((h) => (
                  <li key={`${h.at}-${h.side}`}>
                    Previously: {h.previous} ({SIDE_LABEL[h.side].toLowerCase()}), changed {formatDate(h.at.slice(0, 10), true)}
                  </li>
                ))}
              </ul>
            )}
          </Section>
        )}

        <Section label="Timing" aside={!customerView && props.drift?.flag ? <DriftFlagChip flag={props.drift.flag} /> : undefined}>
          <dl className="grid grid-cols-[6rem_minmax(0,1fr)] gap-x-3 gap-y-1.5 text-sm">
            <dt className="text-xs leading-5 text-muted">Due</dt>
            <dd className="tabular">{props.due}</dd>
            <dt className="text-xs leading-5 text-muted">Lead time</dt>
            <dd>
              {item.lead
                ? `${item.lead.min === item.lead.max ? item.lead.min : `${item.lead.min} to ${item.lead.max}`} weeks, from the product config`
                : "None set in the product config"}
            </dd>
            <dt className="text-xs leading-5 text-muted">Module</dt>
            <dd>{item.module}</dd>
          </dl>
          {!customerView && props.drift && item.lead && (
            <ul className="mt-3 space-y-0.5 text-sm text-muted">
              <li>
                Latest safe start:{" "}
                {props.drift.latestSafeStart ? formatDate(props.drift.latestSafeStart, true) : "needs target date"}
                {!props.drift.flag && props.drift.latestSafeStart ? ". On time." : ""}
              </li>
              <li>
                If it starts {formatDate(props.asOf, true)}, earliest finish: {formatDate(props.drift.earliestFinish, true)}
              </li>
              <li>
                {props.drift.flag === "risk"
                  ? `${FLAG_LABEL.risk}: it can no longer finish before the target date.`
                  : props.drift.redFrom
                    ? `Turns red from ${formatDate(props.drift.redFrom, true)} if not started.`
                    : "Turns red: needs target date."}
              </li>
            </ul>
          )}
        </Section>

        <Section label="Depends on">
          {props.dependencies.length === 0 ? (
            <p className="text-sm text-faint">Nothing recorded.</p>
          ) : (
            <ul className="flex flex-col gap-1.5">
              {props.dependencies.map((d) => (
                <li key={d.id} className="flex items-center gap-3 text-sm">
                  <button
                    type="button"
                    onClick={() => props.onOpenItem(d.id)}
                    className="min-w-0 flex-1 truncate text-left underline-offset-4 hover:underline"
                  >
                    {d.title}
                  </button>
                  <StatusDot status={d.status} />
                </li>
              ))}
            </ul>
          )}
        </Section>

        {item.checklist && (
          <Section
            label="What the answer should cover"
            aside={
              <span className="tabular text-xs text-faint">
                {props.checks.length} of {item.checklist.length}
              </span>
            }
          >
            <ul className="flex flex-col gap-2">
              {item.checklist.map((c, n) => {
                const on = props.checks.includes(n);
                return (
                  <li key={c.text}>
                    <label className="flex items-start gap-2.5 text-sm">
                      <input
                        type="checkbox"
                        checked={on}
                        disabled={customerView}
                        onChange={() => props.onToggleCheck(n)}
                        className="mt-1.5 accent-[var(--accent)]"
                      />
                      <span className="min-w-0">
                        <span className={on ? "text-muted line-through decoration-faint" : ""}>{c.text}</span>
                        {!customerView && <span className="block text-xs text-faint">From: {props.fieldName(c.from)}</span>}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </Section>
        )}

        {item.kind === "decision" && (!customerView || (resolved && decision)) && (
          <Section label={resolved ? "Decision recorded" : "Record the decision"}>
            {resolved && decision ? (
              <>
                <p>{decision.decided}</p>
                <p className="mt-1 text-xs text-muted">
                  Decided by {decision.by} on {decision.date}
                </p>
                {!customerView && (
                  <button type="button" onClick={props.onReopen} className={`${quiet} -ml-2.5 mt-2`}>
                    Reopen
                  </button>
                )}
              </>
            ) : (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (decided.trim() && by.trim() && date) props.onDecide({ decided: decided.trim(), by: by.trim(), date });
                }}
              >
                <textarea value={decided} onChange={(e) => setDecided(e.target.value)} rows={2} placeholder="What was decided" className={field} />
                <div className="flex gap-2">
                  <input value={by} onChange={(e) => setBy(e.target.value)} placeholder="Who decided" className={field} />
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${field} w-48`} />
                </div>
                <div>
                  <button type="submit" disabled={!decided.trim() || !by.trim() || !date} className={primary}>
                    Record decision
                  </button>
                </div>
              </form>
            )}
          </Section>
        )}

        {item.kind === "question" && (!customerView || (resolved && answer)) && (
          <Section label={resolved ? "Answer" : "Answer the question"}>
            {resolved ? (
              <>
                <p className="whitespace-pre-wrap">{answer ?? "Answered."}</p>
                {!customerView && (
                  <button type="button" onClick={props.onReopen} className={`${quiet} -ml-2.5 mt-2`}>
                    Reopen
                  </button>
                )}
              </>
            ) : (
              <form
                className="flex flex-col gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (answerText.trim()) props.onAnswer(answerText.trim());
                }}
              >
                <textarea
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  rows={3}
                  placeholder="What they said. Tick the lines above it covered."
                  className={field}
                />
                <div>
                  <button type="submit" disabled={!answerText.trim()} className={primary}>
                    Save answer
                  </button>
                </div>
              </form>
            )}
          </Section>
        )}

        {!customerView && (item.promised || item.verify) && (
          <Section label="Promises and checks">
            <ul className="flex flex-col gap-1.5 text-sm">
              {item.promised && (
                <li>
                  <span className="text-faint">Promised in sales:</span> {item.promised}
                </li>
              )}
              {item.promiseRisk && (
                <li>
                  <span className="text-faint">Promise at risk:</span> {item.promiseRisk}
                </li>
              )}
              {item.verify && (
                <li>
                  <span className="text-faint">Verify, agent's read:</span> {item.verify}
                </li>
              )}
            </ul>
          </Section>
        )}

        <Section label="Why this exists">
          {!customerView && (
            <div className="mb-4">
              <PillHeading>From the handoff</PillHeading>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {props.sources.map((src) => (
                  <span key={src} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-ink">
                    {src}
                  </span>
                ))}
              </div>
            </div>
          )}
          <PillHeading>What we know</PillHeading>
          <ul className="mt-2 list-disc space-y-1 pl-5 marker:text-faint">
            {item.why.facts.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          {!customerView && (
            <p className="mt-3 text-xs text-faint">
              {item.why.source ? `Source: ${item.why.source}` : "No call or document recorded in the handoff"}
            </p>
          )}
        </Section>

        <Section label="Done when">
          <ul className="flex flex-col gap-1.5">
            {item.doneWhen.map((d) => (
              <li key={d} className="flex items-start gap-2.5">
                <span aria-hidden className="mt-1 h-3.5 w-3.5 shrink-0 rounded-sm border border-line-strong" />
                {d}
              </li>
            ))}
          </ul>
        </Section>

        {item.evidence && item.evidence.length > 0 && (
          <Section label="Evidence it is real (from the config)">
            <ul className="list-disc space-y-1 pl-5 text-muted marker:text-faint">
              {item.evidence.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Section>
        )}

        {item.notEvidence.length > 0 && (
          <Section label="Not evidence">
            <ul className="list-disc space-y-1 pl-5 text-muted">
              {item.notEvidence.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Section>
        )}

        {(!customerView || visibleNotes.length > 0) && (
        <Section label="Notes">
          {visibleNotes.length === 0 && <p className="text-sm text-faint">No notes yet.</p>}
          <ul className="space-y-2">
            {visibleNotes.map((n) => (
              <li key={n.at} className="rounded-md border border-line bg-raised px-3 py-2">
                <p className="whitespace-pre-wrap">{n.text}</p>
                <p className="mt-1 text-xs text-faint">
                  {new Date(n.at).toLocaleString()}
                  {!customerView && n.internal && " · internal"}
                </p>
              </li>
            ))}
          </ul>
          {!customerView && (
          <>
          <textarea
            ref={noteBox}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder={noteHint ? "Optional: what started, and who is on it" : "Add a note"}
            className={`${field} mt-3`}
          />
          <div className="mt-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-xs text-muted">
              <input type="checkbox" checked={internal} onChange={(e) => setInternal(e.target.checked)} className="accent-[var(--accent)]" />
              Internal
            </label>
            <button
              type="button"
              disabled={!draft.trim()}
              onClick={() => {
                onNote(draft.trim(), internal);
                setDraft("");
              }}
              className="rounded-md border border-line px-3 py-1.5 text-xs transition-colors hover:bg-hover disabled:opacity-40"
            >
              Add note
            </button>
          </div>
          </>
          )}
        </Section>
        )}
      </div>
    </aside>
  );
}
