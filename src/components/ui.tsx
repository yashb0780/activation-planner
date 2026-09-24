import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import type { Item } from "../types";
import { ChevronIcon } from "./icons";

// Small shared pieces: avatar, side tag, week label, and an accessible dropdown.

export function initials(name: string): string {
  if (!name || name === "Unassigned" || name === "Not named") return "?";
  const first = name.split(" and ")[0]!;
  const letters = first
    .replace(/\./g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase())
    .join("")
    .slice(0, 2);
  return name.includes(" and ") ? `${letters}+` : letters;
}

export function Avatar({ name }: { name: string }) {
  return (
    <span
      title={name || "Not named"}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-line bg-raised text-xs font-medium text-muted"
    >
      {initials(name)}
    </span>
  );
}

export function SideTag({ side }: { side: Item["side"] }) {
  return (
    <span className="shrink-0 rounded-sm border border-line px-1.5 text-xs text-muted">{side === "us" ? "Us" : "Customer"}</span>
  );
}

export const weekLabel = (w: Item["week"]) => (w === "after" ? "After day 30" : `Week ${w}`);

/** A pill button that opens a small menu. Esc, clicking outside, or picking closes it.
 *  openSignal: bump it to open the menu from a keyboard shortcut. */
export function Dropdown({
  label,
  className,
  style,
  title,
  content,
  openSignal,
  children,
}: {
  label: string;
  className: string;
  style?: React.CSSProperties;
  title?: string;
  content: ReactNode;
  openSignal?: number;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (openSignal) setOpen(true);
  }, [openSignal]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const close = () => {
    setOpen(false);
    btn.current?.focus();
  };

  return (
    <span ref={wrap} className="relative inline-flex min-w-0 max-w-full">
      <button
        ref={btn}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={label}
        title={title}
        onClick={(e) => {
          e.stopPropagation();
          setOpen((o) => !o);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        style={style}
        className={`inline-flex h-[var(--pill-height)] min-w-0 max-w-full items-center gap-2 rounded-full px-3 text-xs font-medium transition-colors ${className}`}
      >
        {content}
        <span className="shrink-0 opacity-60">
          <ChevronIcon />
        </span>
      </button>
      {open && (
        <div
          data-menu
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              close();
            }
          }}
          className="absolute left-0 top-full z-40 mt-1 min-w-[15rem] rounded-lg border border-line bg-panel py-1 shadow-[var(--shadow-menu)]"
        >
          {children(close)}
        </div>
      )}
    </span>
  );
}

export interface Option<T extends string> {
  value: T;
  label: ReactNode;
}

/** The list inside a Dropdown. Arrow keys move, Enter or Space picks. */
export function ListBox<T extends string>({
  options,
  value,
  onPick,
}: {
  options: Option<T>[];
  value?: T;
  onPick: (v: T) => void;
}) {
  const id = useId();
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(() => Math.max(0, options.findIndex((o) => o.value === value)));

  useEffect(() => ref.current?.focus(), []);

  return (
    <ul
      ref={ref}
      role="listbox"
      tabIndex={-1}
      aria-activedescendant={`${id}-${active}`}
      onKeyDown={(e) => {
        if (e.key === "ArrowDown" || e.key === "j") {
          e.preventDefault();
          setActive((a) => Math.min(a + 1, options.length - 1));
        } else if (e.key === "ArrowUp" || e.key === "k") {
          e.preventDefault();
          setActive((a) => Math.max(a - 1, 0));
        } else if (e.key === "Home") {
          e.preventDefault();
          setActive(0);
        } else if (e.key === "End") {
          e.preventDefault();
          setActive(options.length - 1);
        } else if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          e.stopPropagation();
          onPick(options[active]!.value);
        }
      }}
      className="outline-none"
    >
      {options.map((o, n) => (
        <li
          key={o.value}
          id={`${id}-${n}`}
          role="option"
          aria-selected={o.value === value}
          onMouseEnter={() => setActive(n)}
          onClick={() => onPick(o.value)}
          className={`flex cursor-pointer items-center gap-2 px-3 py-1.5 text-sm transition-colors ${
            n === active ? "bg-hover" : ""
          }`}
        >
          {o.label}
          {o.value === value && <span className="ml-auto pl-3 text-accent">✓</span>}
        </li>
      ))}
    </ul>
  );
}
