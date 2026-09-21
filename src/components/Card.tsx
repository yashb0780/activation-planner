import { useEffect, useRef, type ReactNode } from "react";
import type { Item } from "../types";
import { EyeOffIcon, LockIcon, StatusIcon } from "./icons";

export function initials(name: string): string {
  if (name === "Unassigned") return "?";
  const first = name.split(" and ")[0];
  const letters = first
    .replace(/\./g, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase())
    .join("")
    .slice(0, 2);
  return name.includes(" and ") ? `${letters}+` : letters;
}

export function SideTag({ side }: { side: Item["side"] }) {
  return (
    <span
      className={`shrink-0 rounded px-1.5 py-px text-[12px] leading-5 ${
        side === "us" ? "bg-raised text-ink" : "bg-raised text-muted"
      }`}
    >
      {side === "us" ? "Us" : "Customer"}
    </span>
  );
}

export function Avatar({ name }: { name: string }) {
  return (
    <span
      title={name}
      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-line bg-raised text-[11px] font-medium text-muted"
    >
      {initials(name)}
    </span>
  );
}

export const weekLabel = (w: Item["week"]) => (w === "after" ? "After day 30" : `Week ${w}`);

interface CardProps {
  item: Item;
  focused: boolean;
  onOpen: () => void;
  onFocus: () => void;
  showInternalMark: boolean;
  showWeek: boolean;
  /** Scroll into view when focused. Only for keyboard moves, so hovering never scrolls the page. */
  scrollOnFocus: boolean;
}

export function Card({ item, focused, onOpen, onFocus, showInternalMark, showWeek, scrollOnFocus }: CardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (focused && scrollOnFocus) ref.current?.scrollIntoView({ block: "nearest" });
  }, [focused, scrollOnFocus]);

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseEnter={onFocus}
      className={`flex w-full flex-col gap-2 rounded-lg border px-3.5 py-3 text-left transition-colors ${
        focused ? "border-accent/60 bg-hover" : "border-line bg-panel hover:bg-hover"
      }`}
    >
      <span className="flex w-full items-start gap-2.5">
        <span className="mt-1 shrink-0">
          <StatusIcon status={item.status} size={15} />
        </span>
        <span
          className={`line-clamp-3 min-w-0 flex-1 text-[16px] leading-snug ${
            item.status === "done" ? "text-muted line-through decoration-faint" : ""
          }`}
        >
          {item.title}
        </span>
      </span>
      <span className="flex w-full items-center gap-2 pl-[25px] text-[13px] text-muted">
        {item.status === "blocked" && (
          <span className="shrink-0">
            <LockIcon />
          </span>
        )}
        {showInternalMark && item.visibility === "internal" && (
          <span className="shrink-0 text-faint" title="Internal: hidden in customer view">
            <EyeOffIcon />
          </span>
        )}
        {showWeek && <span>{weekLabel(item.week)}</span>}
        <span className="ml-auto flex items-center gap-2">
          <SideTag side={item.side} />
          <Avatar name={item.owner} />
        </span>
      </span>
    </button>
  );
}

interface BucketProps {
  title: string;
  purpose: string;
  color: string;
  count: number;
  hiddenCount: number;
  expanded: boolean;
  onToggle: () => void;
  children: ReactNode;
  empty?: string;
}

/** A whiteboard-style column: coloured header, one-line purpose, count, up to 5 cards. */
export function Bucket({ title, purpose, color, count, hiddenCount, expanded, onToggle, children, empty }: BucketProps) {
  return (
    <section
      className="flex min-w-0 flex-col rounded-xl border border-line bg-bg"
      style={{ ["--c" as string]: `var(${color})` }}
    >
      <header
        className="rounded-t-xl border-b border-line px-4 pb-3 pt-3"
        style={{
          background: "color-mix(in srgb, var(--c) 12%, var(--panel))",
          borderTop: "3px solid var(--c)",
        }}
      >
        <div className="flex items-baseline gap-2">
          <h2 className="text-[20px] font-semibold leading-tight" style={{ color: "var(--c)" }}>
            {title}
          </h2>
          <span className="text-[15px] tabular-nums text-muted">{count}</span>
        </div>
        <p className="mt-1 text-[14px] leading-snug text-muted">{purpose}</p>
      </header>
      <div className="flex flex-col gap-2 p-3">
        {count === 0 && <p className="px-1 py-2 text-[14px] text-faint">{empty ?? "Nothing here."}</p>}
        {children}
        {(hiddenCount > 0 || expanded) && (
          <button
            type="button"
            onClick={onToggle}
            className="rounded-md px-2 py-1.5 text-left text-[14px] text-muted hover:bg-hover hover:text-ink"
          >
            {expanded ? "Show less" : `Show ${hiddenCount} more`}
          </button>
        )}
      </div>
    </section>
  );
}
