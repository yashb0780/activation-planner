import { useEffect, useRef } from "react";
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

export function ModulePill({ module }: { module: string }) {
  return (
    <span className="min-w-0 truncate rounded border border-line px-1.5 py-px text-[11px] leading-4 text-muted">
      {module}
    </span>
  );
}

export function SideTag({ side }: { side: Item["side"] }) {
  return (
    <span
      className={`shrink-0 rounded px-1.5 py-px text-[11px] leading-4 ${
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
      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-line bg-raised text-[10px] font-medium text-muted"
    >
      {initials(name)}
    </span>
  );
}

interface CardProps {
  item: Item;
  focused: boolean;
  onOpen: () => void;
  onFocus: () => void;
  showInternalMark: boolean;
  /** Stacked puts the title on its own line, for narrow board columns. */
  stacked?: boolean;
}

export function Card({ item, focused, onOpen, onFocus, showInternalMark, stacked = false }: CardProps) {
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (focused) ref.current?.scrollIntoView({ block: "nearest" });
  }, [focused]);

  const title = (
    <span
      className={`min-w-0 flex-1 ${stacked ? "line-clamp-2" : "truncate"} ${
        item.status === "done" ? "text-muted line-through decoration-faint" : ""
      }`}
    >
      {item.title}
    </span>
  );
  const marks = (
    <>
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
    </>
  );

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onMouseEnter={onFocus}
      className={`flex w-full rounded-md border px-2.5 py-2 text-left transition-colors ${
        stacked ? "flex-col gap-1.5" : "items-center gap-2"
      } ${focused ? "border-accent/60 bg-hover" : "border-line bg-panel hover:bg-hover"}`}
    >
      {stacked ? (
        <>
          <span className="flex w-full items-start gap-2">
            <span className="mt-0.5 shrink-0">
              <StatusIcon status={item.status} />
            </span>
            {title}
          </span>
          <span className="flex w-full items-center gap-1.5 pl-[22px]">
            <ModulePill module={item.module} />
            {marks}
            <span className="ml-auto flex items-center gap-1.5">
              <SideTag side={item.side} />
              <Avatar name={item.owner} />
            </span>
          </span>
        </>
      ) : (
        <>
          <span className="shrink-0">
            <StatusIcon status={item.status} />
          </span>
          {title}
          {marks}
          <span className="hidden sm:inline-flex">
            <ModulePill module={item.module} />
          </span>
          <SideTag side={item.side} />
          <Avatar name={item.owner} />
        </>
      )}
    </button>
  );
}
