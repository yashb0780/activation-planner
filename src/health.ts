import { weekEnd } from "./dates.ts";
import { isUnassigned, type RoleBook } from "./owners.ts";
import type { Account, Item } from "./types";

// The three health counts, worked out from the board itself. The plan's health strip
// and the Accounts page both use this, so the numbers always agree.

export type HealthKey = "blockers" | "unowned" | "overdue";
export const HEALTH_KEYS: HealthKey[] = ["blockers", "unowned", "overdue"];
export const HEALTH_LABEL: Record<HealthKey, string> = {
  blockers: "Open blockers",
  unowned: "Customer tasks with no owner",
  overdue: "Overdue",
};

export type Health = Record<HealthKey, Item[]>;

/** Open blockers: items marked Blocked. Customer tasks with no owner: their side, nobody
 *  named, not done. Overdue: not done, and the last day of its plan week is before the as-of
 *  date (items for after day 30 are never overdue). */
export function health(items: Item[], book: RoleBook, asOf: string, account: Account): Health {
  const open = items.filter((i) => i.status !== "done");
  return {
    blockers: open.filter((i) => i.status === "hold"),
    unowned: open.filter((i) => isUnassigned(i, book)),
    overdue: open.filter((i) => i.week !== "after" && weekEnd(i.week, account) < asOf),
  };
}
