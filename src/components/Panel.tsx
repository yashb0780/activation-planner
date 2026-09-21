import { useEffect, useState, type ReactNode } from "react";
import type { Item, Note, Status } from "../types";
import { Avatar, ModulePill, SideTag } from "./Card";
import { StatusIcon } from "./icons";

const STATUSES: { value: Status; label: string }[] = [
  { value: "todo", label: "Todo" },
  { value: "progress", label: "In progress" },
  { value: "blocked", label: "Blocked" },
  { value: "done", label: "Done" },
];

const LANE_LABEL = { start: "Start now", quick: "Quick win", earned: "Earned" } as const;

interface PanelProps {
  item: Item;
  notes: Note[];
  answer?: string;
  customerView: boolean;
  onClose: () => void;
  onStatus: (s: Status) => void;
  onNote: (text: string, internal: boolean) => void;
}

function Section({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section className="border-t border-line px-4 py-3">
      <h3 className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-faint">{label}</h3>
      {children}
    </section>
  );
}

export function Panel({ item, notes, answer, customerView, onClose, onStatus, onNote }: PanelProps) {
  const [draft, setDraft] = useState("");
  const [internal, setInternal] = useState(true);
  const [confirmingDone, setConfirmingDone] = useState(false);
  const [doneNote, setDoneNote] = useState("");
  const [notEvidenceChecked, setNotEvidenceChecked] = useState(false);

  useEffect(() => {
    setDraft("");
    setConfirmingDone(false);
    setDoneNote("");
    setNotEvidenceChecked(false);
  }, [item.id]);

  const visibleNotes = customerView ? notes.filter((n) => !n.internal) : notes;
  const needsCheck = item.notEvidence.length > 0;
  const canConfirm = doneNote.trim().length > 0 && (!needsCheck || notEvidenceChecked);
  const week = item.week === "after" ? "After day 30" : `Week ${item.week}`;

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
    setDoneNote("");
    setNotEvidenceChecked(false);
  }

  return (
    <aside
      role="dialog"
      aria-label={item.title}
      className="fixed inset-y-0 right-0 z-30 flex w-full max-w-[440px] flex-col border-l border-line bg-panel shadow-[0_0_0_1px_rgba(0,0,0,0.02)]"
    >
      <header className="flex items-start gap-2 px-4 pb-3 pt-4">
        <span className="mt-0.5">
          <StatusIcon status={item.status} />
        </span>
        <h2 className="flex-1 text-[14px] font-medium leading-snug">{item.title}</h2>
        <button
          type="button"
          onClick={onClose}
          className="rounded px-1.5 text-muted hover:bg-hover hover:text-ink"
          aria-label="Close (Esc)"
          title="Close (Esc)"
        >
          ✕
        </button>
      </header>

      <div className="flex flex-wrap items-center gap-1.5 px-4 pb-3 text-[12px] text-muted">
        <ModulePill module={item.module} />
        <SideTag side={item.side} />
        <span className="flex items-center gap-1">
          <Avatar name={item.owner} /> {item.owner}
        </span>
        <span>· {week}</span>
        <span>· {LANE_LABEL[item.lane]}</span>
        {item.visibility === "internal" && <span className="text-warn">· Internal</span>}
      </div>

      <div className="flex-1 overflow-y-auto">
        <Section label="Status">
          <div className="flex flex-wrap gap-1">
            {STATUSES.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => pickStatus(s.value)}
                className={`flex items-center gap-1.5 rounded border px-2 py-1 text-[12px] ${
                  item.status === s.value ? "border-accent/60 bg-hover text-ink" : "border-line text-muted hover:bg-hover"
                }`}
              >
                <StatusIcon status={s.value} size={12} /> {s.label}
              </button>
            ))}
          </div>
          {item.blockedBy && item.status === "blocked" && (
            <p className="mt-2 text-[12px] text-danger">Blocked by: {item.blockedBy}</p>
          )}
          {item.window && <p className="mt-2 text-[12px] text-muted">Expected window: {item.window}</p>}

          {confirmingDone && (
            <div className="mt-3 rounded-md border border-line bg-raised p-3">
              <label className="mb-1 block text-[12px] text-muted" htmlFor="done-note">
                What proves this is done? A note is required.
              </label>
              <textarea
                id="done-note"
                value={doneNote}
                onChange={(e) => setDoneNote(e.target.value)}
                rows={3}
                className="w-full resize-y rounded border border-line bg-panel px-2 py-1.5 text-[13px] outline-none focus:border-accent/60"
                placeholder="What was built, and what shows it is being used"
              />
              {needsCheck && (
                <div className="mt-2">
                  <p className="text-[12px] text-muted">Not evidence for this module:</p>
                  <ul className="my-1 list-disc pl-5 text-[12px] text-muted">
                    {item.notEvidence.map((n) => (
                      <li key={n}>{n}</li>
                    ))}
                  </ul>
                  <label className="flex items-start gap-2 text-[12px]">
                    <input
                      type="checkbox"
                      checked={notEvidenceChecked}
                      onChange={(e) => setNotEvidenceChecked(e.target.checked)}
                      className="mt-0.5 accent-[var(--accent)]"
                    />
                    The proof is none of these.
                  </label>
                </div>
              )}
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  disabled={!canConfirm}
                  onClick={confirmDone}
                  className="rounded bg-accent px-2.5 py-1 text-[12px] font-medium text-bg disabled:opacity-40"
                >
                  Mark done
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmingDone(false)}
                  className="rounded px-2 py-1 text-[12px] text-muted hover:bg-hover"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </Section>

        {answer && (
          <Section label="Answer">
            <p>{answer}</p>
          </Section>
        )}

        <Section label="Why it's here">
          <p className="font-mono text-[11.5px] text-muted">{item.why.field}</p>
          <p className="mt-1">{item.why.answer}</p>
          <p className="mt-1 text-[12px] text-faint">
            {item.why.source ? `Source: ${item.why.source}` : "No source in the handoff"}
          </p>
        </Section>

        <Section label="Done when">
          <ul className="list-disc space-y-1 pl-4">
            {item.doneWhen.map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </Section>

        {item.notEvidence.length > 0 && (
          <Section label="Not evidence">
            <ul className="list-disc space-y-1 pl-4 text-muted">
              {item.notEvidence.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </Section>
        )}

        <Section label="Notes">
          {visibleNotes.length === 0 && <p className="text-[12px] text-faint">No notes yet.</p>}
          <ul className="space-y-2">
            {visibleNotes.map((n) => (
              <li key={n.at} className="rounded border border-line bg-raised px-2 py-1.5">
                <p className="whitespace-pre-wrap">{n.text}</p>
                <p className="mt-0.5 text-[11px] text-faint">
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
            className="mt-2 w-full resize-y rounded border border-line bg-bg px-2 py-1.5 text-[13px] outline-none focus:border-accent/60"
          />
          <div className="mt-1.5 flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-[12px] text-muted">
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
              className="rounded border border-line px-2.5 py-1 text-[12px] hover:bg-hover disabled:opacity-40"
            >
              Add note
            </button>
          </div>
        </Section>
      </div>
    </aside>
  );
}
