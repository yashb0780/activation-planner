import { useState, type ReactNode } from "react";
import { primaryName, useRoles } from "../owners";
import type { FirstValueEdit } from "../state";
import type { FirstValue, Gate, Item } from "../types";
import { Avatar } from "./ui";

/** One section's "Reviewed" tick. The Draft badge turns to Reviewed when every section is ticked. */
export function ReviewBox({ checked, onChange }: { checked: boolean; onChange: (on: boolean) => void }) {
  return (
    <label
      className={`flex shrink-0 items-center gap-1.5 rounded-md border px-2 py-0.5 text-xs ${
        checked ? "border-ok/60 text-ok" : "border-line text-muted"
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="accent-[var(--ok)]"
      />
      Reviewed
    </label>
  );
}

export function FirstValueLine({
  value,
  edited,
  basis,
  onSave,
  review,
}: {
  review?: ReactNode;
  value: FirstValueEdit;
  edited: boolean;
  basis: FirstValue["basis"];
  onSave: (fv: FirstValueEdit) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value);
  const [whyOpen, setWhyOpen] = useState(false);
  const input =
    "w-full rounded-md border border-line bg-bg px-2.5 py-1.5 text-sm outline-none focus:border-accent/60";

  return (
    <section className="rounded-xl border border-line bg-panel px-4 py-3">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-base font-semibold">First value</h2>
        <span className="rounded-sm border border-line px-1.5 text-xs text-muted">
          {edited ? "Edited, confirm at kickoff" : "Proposed, confirm at kickoff (inferred)"}
        </span>
        <span className="ml-auto" />
        {review}
        {!editing && (
          <button
            type="button"
            onClick={() => {
              setDraft(value);
              setEditing(true);
            }}
            className="rounded-md px-2.5 py-1 text-sm text-muted hover:bg-hover hover:text-ink"
          >
            Edit
          </button>
        )}
      </div>
      {editing ? (
        <form
          className="mt-2 flex flex-col gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (draft.headline.trim()) {
              onSave({
                headline: draft.headline.trim(),
                points: draft.points.map((p) => ({ ...p, text: p.text.trim() })),
              });
            }
            setEditing(false);
          }}
        >
          <label className="flex flex-col gap-1 text-xs text-muted">
            Headline
            <input value={draft.headline} onChange={(e) => setDraft({ ...draft, headline: e.target.value })} className={input} />
          </label>
          {draft.points.map((p, n) => (
            <label key={p.label} className="flex flex-col gap-1 text-xs text-muted">
              {p.label}
              <input
                value={p.text}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    points: draft.points.map((q, m) => (m === n ? { ...q, text: e.target.value } : q)),
                  })
                }
                className={input}
              />
            </label>
          ))}
          <div className="flex gap-2">
            <button type="submit" className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-bg">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-md px-2.5 py-1.5 text-sm text-muted hover:bg-hover"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="mt-1.5 text-base font-semibold leading-snug">{value.headline}</p>
          <dl className="mt-2 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
            {value.points.map((p) => (
              <div key={p.label}>
                <dt className="text-xs text-faint">{p.label}</dt>
                <dd>{p.text}</dd>
              </div>
            ))}
          </dl>
        </>
      )}
      <button
        type="button"
        onClick={() => setWhyOpen((o) => !o)}
        aria-expanded={whyOpen}
        className="mt-2 text-xs text-muted hover:text-ink"
      >
        {whyOpen ? "▾" : "▸"} Why?
      </button>
      {whyOpen && <p className="mt-1 text-xs leading-relaxed text-faint">{basis}</p>}
    </section>
  );
}

export function Milestones({ gates, items, review }: { gates: Gate[]; items: Item[]; review?: ReactNode }) {
  const byId = new Map(items.map((i) => [i.id, i]));
  const isDone = (id: string) => byId.get(id)?.status === "done";
  return (
    <section>
      <div className="mb-2 flex flex-wrap items-baseline gap-x-2 gap-y-1">
        <h2 className="text-base font-semibold">Milestones</h2>
        <span className="text-xs text-faint">Gates and exit criteria inferred from the board</span>
        {review && <span className="ml-auto self-center">{review}</span>}
      </div>
      <ol className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {gates.map((g, n) => {
          const linked = g.linked.map((id) => byId.get(id)).filter((i): i is Item => Boolean(i));
          const done = linked.filter((i) => i.status === "done").length;
          const passed = linked.length > 0 && done === linked.length;
          return (
            <li
              key={g.id}
              className={`rounded-xl border px-4 py-3 ${passed ? "border-ok/60 bg-ok/10" : "border-line bg-panel"}`}
            >
              <div className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                    passed ? "bg-ok text-bg" : "border border-line text-muted"
                  }`}
                >
                  {passed ? "✓" : n + 1}
                </span>
                <h3 className={`text-sm font-medium ${passed ? "text-ok" : ""}`}>{g.label}</h3>
              </div>
              <ul className="mt-2 flex flex-col gap-0.5 text-sm leading-snug">
                {g.criteria.map((c) => {
                  const ok = isDone(c.item);
                  return (
                    <li key={c.text} className={`flex gap-2 ${ok ? "text-ink" : "text-muted"}`}>
                      <span aria-hidden className={`w-3.5 shrink-0 text-center ${ok ? "text-ok" : "text-faint"}`}>
                        {ok ? "✓" : "○"}
                      </span>
                      <span>
                        {c.text}
                        <span className="sr-only">{ok ? " (done)" : " (not done)"}</span>
                      </span>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-2 text-xs tabular-nums text-faint">
                {done} of {linked.length} linked items done
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function NeedsAttention({
  items,
  atRisk,
  onOpen,
}: {
  items: Item[];
  atRisk: Set<string>;
  onOpen: (id: string) => void;
}) {
  const book = useRoles();
  if (!items.length) return null;
  const label = (i: Item) => (atRisk.has(i.id) ? "At risk" : i.conflict ? "Conflict" : "On hold");
  const color = (i: Item) =>
    atRisk.has(i.id) ? "var(--flag-risk)" : i.conflict ? "var(--muted)" : "var(--st-hold-ink)";
  return (
    <section className="rounded-xl border border-line bg-panel px-4 py-3">
      <h2 className="mb-1 text-xs font-medium text-faint">Needs attention</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <button
              type="button"
              onClick={() => onOpen(i.id)}
              className="flex w-full items-center gap-3 rounded-md px-1.5 py-1.5 text-left hover:bg-hover"
            >
              <span className="w-20 shrink-0 text-xs font-semibold" style={{ color: color(i) }}>
                {label(i)}
              </span>
              <span className="min-w-0 flex-1 truncate">{i.title}</span>
              <Avatar name={primaryName(book, i)} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
