import type { DriftFlag } from "../drift";
import { displayName, rolesFor, useRoles } from "../owners";
import type { Item, Role, Side, Status } from "../types";
import { Dropdown, ListBox } from "./ui";

// Status: Not started, In progress, On hold, Done. Each has its own colour from
// the theme. Drift is not a status: it is a separate small flag.

export const STATUS: Record<Status, { label: string; color: string }> = {
  todo: { label: "Not started", color: "var(--st-todo)" },
  progress: { label: "In progress", color: "var(--st-progress)" },
  hold: { label: "On hold", color: "var(--st-hold)" },
  done: { label: "Done", color: "var(--st-done)" },
};
const ORDER: Status[] = ["todo", "progress", "hold", "done"];

const tint = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, transparent)`;

/** Dot and label, read-only. */
export function StatusDot({ status }: { status: Status }) {
  const s = STATUS[status];
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: s.color }}>
      <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
      {s.label}
    </span>
  );
}

export const FLAG_LABEL: Record<DriftFlag, string> = { drifting: "Drifting", risk: "At risk" };

/** The drift flag: an outlined chip with a warning icon and a word. Never a filled pill,
 *  so it cannot be mistaken for a status. */
export function DriftFlagChip({ flag }: { flag: DriftFlag }) {
  const color = flag === "risk" ? "var(--flag-risk)" : "var(--flag-drift)";
  return (
    <span
      className="inline-flex shrink-0 items-center gap-1 rounded-sm border border-line-strong px-1.5 text-xs font-medium text-ink"
      title={flag === "risk" ? "At risk: can no longer finish before the target date" : "Drifting: past its latest safe start"}
    >
      <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden>
        <path d="M8 1.5 L15 14 H1 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 6 V9.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="11.8" r="0.9" fill={color} />
      </svg>
      {FLAG_LABEL[flag]}
    </span>
  );
}

/** The status pill with its menu. On hold and Done do not change the status here: they open
 *  the side panel, which asks for a reason or for proof first. */
export function StatusMenu({
  item,
  onStatus,
  onRequestHold,
  onRequestDone,
  openSignal,
}: {
  item: Item;
  onStatus: (s: Status) => void;
  onRequestHold: () => void;
  onRequestDone: () => void;
  openSignal?: number;
}) {
  const s = STATUS[item.status];
  return (
    <Dropdown
      label={`Status: ${s.label}. Change status`}
      title={item.status === "hold" && item.holdReason ? `On hold: ${item.holdReason}` : undefined}
      style={{ color: s.color, background: tint(s.color, 14) }}
      className="hover:brightness-110"
      openSignal={openSignal}
      content={
        <>
          <span aria-hidden className="h-2 w-2 shrink-0 rounded-full" style={{ background: s.color }} />
          <span className="truncate">{s.label}</span>
        </>
      }
    >
      {(close) => (
        <ListBox<Status>
          value={item.status}
          options={ORDER.map((v) => ({
            value: v,
            label: (
              <span className="inline-flex items-center gap-2">
                <span aria-hidden className="h-2 w-2 rounded-full" style={{ background: STATUS[v].color }} />
                {STATUS[v].label}
                {v === "hold" && <span className="text-xs text-faint">asks for a reason</span>}
                {v === "done" && <span className="text-xs text-faint">asks for proof</span>}
              </span>
            ),
          }))}
          onPick={(v) => {
            close();
            if (v === item.status && v !== "hold") return;
            if (v === "done") onRequestDone();
            else if (v === "hold") onRequestHold();
            else onStatus(v);
          }}
        />
      )}
    </Dropdown>
  );
}

/** Neutral owner pill for one side, listing that side of the People list. */
export function OwnerMenu({
  item,
  side,
  roles,
  onOwner,
  openSignal,
  prefix,
}: {
  item: Item;
  side: Side;
  roles: Role[];
  onOwner: (roleId: string) => void;
  openSignal?: number;
  prefix?: string;
}) {
  const book = useRoles();
  const ids = rolesFor(item, side);
  const primary = ids[0] ? displayName(book, ids[0]) : "Not named";
  const more = ids.length - 1;
  return (
    <Dropdown
      label={`${side === "us" ? "Our" : "Their"} owner: ${primary}. Change owner`}
      title={ids.length > 1 ? ids.map((r) => displayName(book, r)).join(", ") : undefined}
      className="max-w-full border border-line text-ink hover:border-line-strong hover:bg-hover"
      openSignal={openSignal}
      content={
        <span className="truncate">
          {prefix && <span className="font-normal text-faint">{prefix} </span>}
          {primary}
          {more > 0 && <span className="font-normal text-muted"> +{more}</span>}
        </span>
      }
    >
      {(close) => (
        <ListBox<string>
          value={ids[0]}
          options={roles
            .filter((r) => r.side === side)
            .map((r) => ({
              value: r.id,
              label: (
                <span className="flex min-w-0 flex-col">
                  <span className={r.name ? "" : "text-muted"}>{r.name || "Not named"}</span>
                  <span className="text-xs text-faint">{r.label}</span>
                </span>
              ),
            }))}
          onPick={(v) => {
            if (v !== ids[0]) onOwner(v);
            close();
          }}
        />
      )}
    </Dropdown>
  );
}
