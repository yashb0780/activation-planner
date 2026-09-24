import { useEffect, useId, useMemo, useRef, useState } from "react";

// ⌘K / Ctrl+K: search every command and every item. Arrow keys move, Enter runs, Esc closes.

export interface Command {
  id: string;
  label: string;
  /** Right-hand hint: a shortcut or a group name. */
  hint?: string;
  /** Ask before running: the menu shows this message with a confirm and a cancel button. */
  confirm?: { message: string; action: string };
  run: () => void;
}

export function CommandMenu({ commands, onClose }: { commands: Command[]; onClose: () => void }) {
  const id = useId();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [pending, setPending] = useState<Command | null>(null);
  const cancel = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLUListElement>(null);

  const shown = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return commands
      .filter((c) => words.every((w) => `${c.label} ${c.hint ?? ""}`.toLowerCase().includes(w)))
      .slice(0, 50);
  }, [commands, query]);

  useEffect(() => input.current?.focus(), []);
  useEffect(() => setActive(0), [query]);
  useEffect(() => {
    list.current?.querySelector(`[data-n="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  useEffect(() => {
    if (pending) cancel.current?.focus();
    else input.current?.focus();
  }, [pending]);

  const run = (c?: Command) => {
    if (!c) return;
    if (c.confirm && pending !== c) {
      setPending(c);
      return;
    }
    onClose();
    c.run();
  };

  return (
    <div
      data-menu
      className="fixed inset-0 z-50 flex items-start justify-center bg-bg/60 px-4 pt-[14vh] backdrop-blur-[2px]"
      onMouseDown={onClose}
    >
      <div
        role="dialog"
        aria-label="Command menu"
        onMouseDown={(e) => e.stopPropagation()}
        className="w-full max-w-xl overflow-hidden rounded-lg border border-line bg-panel shadow-[var(--shadow-menu)]"
      >
        {pending?.confirm ? (
          <div
            className="flex flex-col gap-3 px-4 py-4"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation();
                setPending(null);
              }
            }}
          >
            <p className="text-sm font-semibold">{pending.label}</p>
            <p className="text-sm text-muted">{pending.confirm.message}</p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => run(pending)}
                className="rounded-md border border-line px-3 py-1.5 text-xs font-semibold text-flag-risk transition-colors hover:bg-hover"
              >
                {pending.confirm.action}
              </button>
              <button
                ref={cancel}
                type="button"
                onClick={() => setPending(null)}
                className="rounded-md bg-accent px-3 py-1.5 text-xs font-semibold text-on-accent"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <input
              ref={input}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Type a command or an item…"
              role="combobox"
              aria-expanded
              aria-controls={`${id}-list`}
              aria-activedescendant={shown.length ? `${id}-${active}` : undefined}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, shown.length - 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  run(shown[active]);
                } else if (e.key === "Escape") {
                  e.preventDefault();
                  e.stopPropagation();
                  onClose();
                }
              }}
              className="w-full border-b border-line bg-transparent px-4 py-3 text-base outline-none placeholder:text-faint"
            />
            <ul ref={list} id={`${id}-list`} role="listbox" className="max-h-[50vh] overflow-y-auto py-1">
              {shown.length === 0 && <li className="px-4 py-3 text-sm text-faint">No matches.</li>}
              {shown.map((c, n) => (
                <li
                  key={c.id}
                  id={`${id}-${n}`}
                  data-n={n}
                  role="option"
                  aria-selected={n === active}
                  onMouseMove={() => setActive(n)}
                  onClick={() => run(c)}
                  className={`flex cursor-pointer items-center gap-3 px-4 py-2 text-sm transition-colors ${
                    n === active ? "bg-raised shadow-[inset_2px_0_0_var(--accent)]" : ""
                  }`}
                >
                  <span className="min-w-0 flex-1 truncate">{c.label}</span>
                  {c.hint && <span className="shrink-0 text-xs text-faint">{c.hint}</span>}
                </li>
              ))}
            </ul>
          </>
        )}
        <p className="border-t border-line px-4 py-2 text-xs text-faint">
          {pending ? "Enter on a button · Esc to go back" : "↑ ↓ to move · Enter to run · Esc to close"}
        </p>
      </div>
    </div>
  );
}
