import { useState } from "react";
import type { FirstValue, Gate, Item } from "../types";
import { Avatar } from "./Card";

export function FirstValueLine({
  value,
  edited,
  basis,
  onSave,
}: {
  value: string;
  edited: boolean;
  basis: FirstValue["basis"];
  onSave: (text: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(value);

  return (
    <section className="rounded-xl border border-line bg-panel px-5 py-4">
      <div className="flex flex-wrap items-center gap-2">
        <h2 className="text-[20px] font-semibold">First value</h2>
        <span className="rounded-full border border-warn/50 px-2 py-px text-[12px] text-warn">
          {edited ? "Edited, confirm at kickoff" : "Proposed, confirm at kickoff (inferred)"}
        </span>
        {!editing && (
          <button
            type="button"
            onClick={() => {
              setText(value);
              setEditing(true);
            }}
            className="ml-auto rounded-md px-2.5 py-1 text-[14px] text-muted hover:bg-hover hover:text-ink"
          >
            Edit
          </button>
        )}
      </div>
      {editing ? (
        <form
          className="mt-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (text.trim()) onSave(text.trim());
            setEditing(false);
          }}
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={2}
            className="w-full rounded-md border border-line bg-bg px-2.5 py-2 text-[16px] outline-none focus:border-accent/60"
          />
          <div className="mt-2 flex gap-2">
            <button type="submit" className="rounded-md bg-accent px-3 py-1.5 text-[14px] font-medium text-bg">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="rounded-md px-2.5 py-1.5 text-[14px] text-muted hover:bg-hover"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <p className="mt-1.5 text-[16px] leading-relaxed">{value}</p>
      )}
      <p className="mt-1.5 text-[13px] text-faint">{basis}</p>
    </section>
  );
}

export function Milestones({ gates, items }: { gates: Gate[]; items: Item[] }) {
  const byId = new Map(items.map((i) => [i.id, i]));
  return (
    <section>
      <div className="mb-2 flex items-baseline gap-2">
        <h2 className="text-[20px] font-semibold">Milestones</h2>
        <span className="text-[13px] text-faint">Gates and exit criteria inferred from the board</span>
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
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-semibold ${
                    passed ? "bg-ok text-bg" : "border border-line text-muted"
                  }`}
                >
                  {passed ? "✓" : n + 1}
                </span>
                <h3 className={`text-[16px] font-medium ${passed ? "text-ok" : ""}`}>{g.label}</h3>
              </div>
              <p className="mt-2 text-[14px] leading-snug text-muted">{g.exit}</p>
              <p className="mt-2 text-[13px] tabular-nums text-faint">
                {done} of {linked.length} linked items done
              </p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

export function NeedsAttention({ items, onOpen }: { items: Item[]; onOpen: (id: string) => void }) {
  if (!items.length) return null;
  return (
    <section className="rounded-xl border border-line bg-panel px-4 py-3">
      <h2 className="mb-1 text-[13px] font-medium uppercase tracking-wide text-faint">Needs attention</h2>
      <ul>
        {items.map((i) => (
          <li key={i.id}>
            <button
              type="button"
              onClick={() => onOpen(i.id)}
              className="flex w-full items-center gap-3 rounded-md px-1.5 py-1.5 text-left hover:bg-hover"
            >
              <span className={`w-16 shrink-0 text-[14px] ${i.conflict ? "text-warn" : "text-danger"}`}>
                {i.conflict ? "Conflict" : "Blocked"}
              </span>
              <span className="min-w-0 flex-1 truncate">{i.title}</span>
              <Avatar name={i.owner} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
