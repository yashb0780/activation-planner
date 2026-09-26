import type { DriftFlag } from "../drift";
import { displayName, labelOf, nameOf, rolesFor, useRoles } from "../owners";
import type { Item, Role, Side, Status } from "../types";
import { Dropdown, ListBox } from "./ui";

// Status: Not started, In progress, On hold, Done. Each has its own colour from
// the theme. Drift is not a status: it is a separate small flag.

/** color: the dot and the pill tint. ink: the pill's text. */
export const STATUS: Record<Status, { label: string; color: string; ink: string }> = {
  todo: { label: "Not started", color: "var(--st-todo)", ink: "var(--st-todo-ink)" },
  progress: { label: "In progress", color: "var(--st-progress)", ink: "var(--st-progress-ink)" },
  hold: { label: "On hold", color: "var(--st-hold)", ink: "var(--st-hold-ink)" },
  done: { label: "Done", color: "var(--st-done)", ink: "var(--st-done-ink)" },
};
/** Background of a status pill. */
export const pillBg = (s: Status) => `color-mix(in srgb, ${STATUS[s].color} 20%, transparent)`;
const ORDER: Status[] = ["todo", "progress", "hold", "done"];

/** Dot and label, read-only. */
export function StatusDot({ status }: { status: Status }) {
  const s = STATUS[status];
  return (
    <span className="inline-flex items-center gap-2 text-xs font-medium" style={{ color: s.ink }}>
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

/** Labels from the handoff: "Promised in sales", "Promise at risk" and "Verify". Outlined
 *  like the drift chip, so none can be mistaken for a status. Each appears only when the
 *  item sets its field, so items without them look exactly as before. */
export function HandoffChips({ item }: { item: Item }) {
  const chip = "inline-flex shrink-0 items-center gap-1 rounded-sm border border-line-strong px-1.5 text-xs font-medium text-ink";
  return (
    <>
      {item.promiseRisk ? (
        <span className={chip} title={item.promiseRisk}>
          <svg width="13" height="13" viewBox="0 0 16 16" aria-hidden>
            <path d="M8 1.5 L15 14 H1 Z" fill="none" stroke="var(--flag-risk)" strokeWidth="1.6" strokeLinejoin="round" />
            <path d="M8 6 V9.5" stroke="var(--flag-risk)" strokeWidth="1.6" strokeLinecap="round" />
            <circle cx="8" cy="11.8" r="0.9" fill="var(--flag-risk)" />
          </svg>
          Promise at risk
        </span>
      ) : (
        item.promised && (
          <span className={chip} title={item.promised}>
            Promised in sales
          </span>
        )
      )}
      {item.verify && (
        <span className={chip} title={`Agent's read: ${item.verify}`}>
          Verify
        </span>
      )}
    </>
  );
}

/** One small warning icon on a plan row, only when something needs a look: at risk,
 *  drifting, promise at risk, or an answer to verify. Hover or focus says which; the side
 *  panel has the detail. Red for at risk and promise at risk, amber otherwise. */
export function RowFlag({ item, drift }: { item: Item; drift?: DriftFlag | null }) {
  const labels = [
    drift ? FLAG_LABEL[drift] : null,
    item.promiseRisk ? "Promise at risk" : null,
    item.verify ? "Verify: agent's read" : null,
  ].filter(Boolean) as string[];
  if (labels.length === 0) return null;
  const red = drift === "risk" || Boolean(item.promiseRisk);
  const color = red ? "var(--flag-risk)" : "var(--flag-drift)";
  const text = labels.join(" · ");
  return (
    <span className="inline-flex shrink-0" title={text} role="img" aria-label={text}>
      <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden>
        <path d="M8 1.5 L15 14 H1 Z" fill="none" stroke={color} strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M8 6 V9.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="8" cy="11.8" r="0.9" fill={color} />
      </svg>
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
      style={{ color: s.ink, background: pillBg(item.status) }}
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
  // Their side with nobody named reads "Unassigned", in amber, never "Them".
  const unassigned = side === "customer" && (!ids[0] || !nameOf(book, ids[0]));
  const primary = unassigned ? "Unassigned" : ids[0] ? displayName(book, ids[0]) : "Not named";
  const more = ids.length - 1;
  const tip = unassigned
    ? `Unassigned: ${ids[0] ? labelOf(book, ids[0]) : "their owner"} has nobody named`
    : ids.length > 1
      ? ids.map((r) => displayName(book, r)).join(", ")
      : undefined;
  return (
    <Dropdown
      label={`${side === "us" ? "Our" : "Their"} owner: ${primary}. Change owner`}
      title={tip}
      className={`max-w-full border hover:bg-hover ${
        unassigned ? "border-warn/50 text-warn hover:border-warn" : "border-line text-ink hover:border-line-strong"
      }`}
      openSignal={openSignal}
      content={
        <span className="truncate">
          {prefix && !unassigned && <span className="font-normal text-faint">{prefix} </span>}
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
