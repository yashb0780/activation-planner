import { useEffect, useState, type ReactNode } from "react";
import type { Decision, Item, Note, Status } from "../types";
import { Avatar, SideTag, weekLabel } from "./Card";
import { StatusIcon } from "./icons";

const STATUSES: { value: Status; label: string }[] = [
  { value: "todo", label: "Todo" },
  { value: "progress", label: "In progress" },
  { value: "blocked", label: "Blocked" },
  { value: "done", label: "Done" },
];

const KIND_LABEL = { task: "Task", decision: "Decision", question: "Question" } as const;

interface PanelProps {
  item: Item;
  notes: Note[];
  answer?: string;
  decision?: Decision;
  customerView: boolean;
  onClose: () => void;
  onStatus: (s: Status) => void;
  onNote: (text: string, internal: boolean) => void;
  onAnswer: (text: string) => void;
  onDecide: (d: Decision) => void;
  onReopen: () => void;
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="border-t border-line px-5 py-4">
      <h3 className="mb-2 text-[12px] font-medium uppercase tracking-wide text-faint">{label}</h3>
      {children}
    </section>
  );
}

const field =
  "w-full rounded-md border border-line bg-bg px-2.5 py-2 text-[15px] outline-none focus:border-accent/60";
const primary = "rounded-md bg-accent px-3 py-1.5 text-[14px] font-medium text-bg disabled:opacity-40";
const quiet = "rounded-md px-2.5 py-1.5 text-[14px] text-muted hover:bg-hover";

export function Panel(props: PanelProps) {
  const { item, notes, answer, decision, customerView, onClose, onStatus, onNote } = props;
  const [draft, setDraft] = useState("");
  const [internal, setInternal] = useState(true);
  const [confirmingDone, setConfirmingDone] = useState(false);
  const [doneNote, setDoneNote] = useState("");
  const [notEvidenceChecked, setNotEvidenceChecked] = useState(false);
  const [answerText, setAnswerText] = useState("");
  const [decided, setDecided] = useState("");
  const [by, setBy] = useState("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));

  useEffect(() => {
    setDraft("");
    setConfirmingDone(false);
    setDoneNote("");
    setNotEvidenceChecked(false);
    setAnswerText("");
    setDecided("");
    setBy("");
  }, [item.id]);

  const visibleNotes = customerView ? notes.filter((n) => !n.internal) : notes;
  const needsCheck = item.notEvidence.length > 0;
  const canConfirm = doneNote.trim().length > 0 && (!needsCheck || notEvidenceChecked);
  const resolved = item.kind !== "task" && item.status === "done";

  function pickStatus(s: Status) {
    if (s === "done" && item.status !== "done") {
      setConfirmingDone(true);
      return;
    }
    setConfirmingDone(false);
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
      className="fixed inset-y-0 right-0 z-30 flex w-full max-w-[480px] flex-col border-l border-line bg-panel"
    >
      <header className="flex items-start gap-2.5 px-5 pb-3 pt-5">
        <span className="mt-1">
          <StatusIcon status={item.status} size={16} />
        </span>
        <h2 className="flex-1 text-[20px] font-semibold leading-snug">{item.title}</h2>
        <button type="button" onClick={onClose} className={quiet} aria-label="Close (Esc)" title="Close (Esc)">
          ✕
        </button>
      </header>

      <div className="flex flex-wrap items-center gap-2 px-5 pb-4 text-[14px] text-muted">
        <span className="rounded border border-line px-1.5 text-[13px]">{KIND_LABEL[item.kind]}</span>
        <span>{item.module}</span>
        <SideTag side={item.side} />
        <span className="flex items-center gap-1.5">
          <Avatar name={item.owner} /> {item.owner}
        </span>
        <span>· {weekLabel(item.week)}</span>
        {item.visibility === "internal" && <span className="text-warn">· Internal</span>}
      </div>

      <div className="flex-1 overflow-y-auto">
        {item.kind === "task" && (
          <Section label="Status">
            <div className="flex flex-wrap gap-1.5">
              {STATUSES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => pickStatus(s.value)}
                  className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[14px] ${
                    item.status === s.value
                      ? "border-accent/60 bg-hover text-ink"
                      : "border-line text-muted hover:bg-hover"
                  }`}
                >
                  <StatusIcon status={s.value} size={13} /> {s.label}
                </button>
              ))}
            </div>
            {item.blockedBy && item.status === "blocked" && (
              <p className="mt-3 text-[14px] text-danger">Blocked by: {item.blockedBy}</p>
            )}
            {item.window && <p className="mt-3 text-[14px] text-muted">Expected window: {item.window}</p>}

            {confirmingDone && (
              <div className="mt-4 rounded-lg border border-line bg-raised p-4">
                <label className="mb-1.5 block text-[14px] text-muted" htmlFor="done-note">
                  What proves this is done? A note is required.
                </label>
                <textarea
                  id="done-note"
                  value={doneNote}
                  onChange={(e) => setDoneNote(e.target.value)}
                  rows={3}
                  className={field}
                  placeholder="What was built, and what shows it is being used"
                />
                {needsCheck && (
                  <div className="mt-3">
                    <p className="text-[14px] text-muted">Not evidence for this module:</p>
                    <ul className="my-1.5 list-disc pl-5 text-[14px] text-muted">
                      {item.notEvidence.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                    <label className="flex items-start gap-2 text-[14px]">
                      <input
                        type="checkbox"
                        checked={notEvidenceChecked}
                        onChange={(e) => setNotEvidenceChecked(e.target.checked)}
                        className="mt-1 accent-[var(--accent)]"
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

        {item.kind === "decision" && (
          <Section label={resolved ? "Decision recorded" : "Record the decision"}>
            {resolved && decision ? (
              <>
                <p>{decision.decided}</p>
                <p className="mt-1 text-[14px] text-muted">
                  Decided by {decision.by} on {decision.date}
                </p>
                <button type="button" onClick={props.onReopen} className={`${quiet} mt-2 -ml-2.5`}>
                  Reopen
                </button>
              </>
            ) : (
              <form
                className="flex flex-col gap-2.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (decided.trim() && by.trim() && date) props.onDecide({ decided: decided.trim(), by: by.trim(), date });
                }}
              >
                <textarea
                  value={decided}
                  onChange={(e) => setDecided(e.target.value)}
                  rows={2}
                  placeholder="What was decided"
                  className={field}
                />
                <div className="flex gap-2">
                  <input value={by} onChange={(e) => setBy(e.target.value)} placeholder="Who decided" className={field} />
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className={`${field} w-44`} />
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

        {item.kind === "question" && (
          <Section label={resolved ? "Answer" : "Answer the question"}>
            {resolved ? (
              <>
                <p>{answer ?? "Answered."}</p>
                <button type="button" onClick={props.onReopen} className={`${quiet} mt-2 -ml-2.5`}>
                  Reopen
                </button>
              </>
            ) : (
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (answerText.trim()) props.onAnswer(answerText.trim());
                }}
              >
                <input
                  value={answerText}
                  onChange={(e) => setAnswerText(e.target.value)}
                  placeholder={item.volume ? "Volume per month, measured or estimate" : "Answer"}
                  className={field}
                />
                <button type="submit" disabled={!answerText.trim()} className={primary}>
                  Save
                </button>
              </form>
            )}
          </Section>
        )}

        <Section label="Why it's here">
          <p className="font-mono text-[13px] text-muted">{item.why.field}</p>
          <p className="mt-1.5">{item.why.answer}</p>
          <p className="mt-1.5 text-[14px] text-faint">
            {item.why.source ? `Source: ${item.why.source}` : "No source in the handoff"}
          </p>
        </Section>

        <Section label="Done when">
          <ul className="list-disc space-y-1.5 pl-5">
            {item.doneWhen.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Section>

        {item.notEvidence.length > 0 && (
          <Section label="Not evidence">
            <ul className="list-disc space-y-1.5 pl-5 text-muted">
              {item.notEvidence.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Section>
        )}

        <Section label="Notes">
          {visibleNotes.length === 0 && <p className="text-[14px] text-faint">No notes yet.</p>}
          <ul className="space-y-2">
            {visibleNotes.map((n) => (
              <li key={n.at} className="rounded-md border border-line bg-raised px-3 py-2">
                <p className="whitespace-pre-wrap">{n.text}</p>
                <p className="mt-1 text-[12px] text-faint">
                  {new Date(n.at).toLocaleString()}
                  {n.internal && " · internal"}
                </p>
              </li>
            ))}
          </ul>
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            rows={3}
            placeholder="How was it built?"
            className={`${field} mt-3`}
          />
          <div className="mt-2 flex items-center justify-between">
            <label className="flex items-center gap-2 text-[14px] text-muted">
              <input
                type="checkbox"
                checked={internal}
                onChange={(e) => setInternal(e.target.checked)}
                className="accent-[var(--accent)]"
              />
              Internal
            </label>
            <button
              type="button"
              disabled={!draft.trim()}
              onClick={() => {
                onNote(draft.trim(), internal);
                setDraft("");
              }}
              className="rounded-md border border-line px-3 py-1.5 text-[14px] hover:bg-hover disabled:opacity-40"
            >
              Add note
            </button>
          </div>
        </Section>
      </div>
    </aside>
  );
}
