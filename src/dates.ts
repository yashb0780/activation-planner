import type { Account, Week } from "./types";

export function formatDate(iso: string, withYear = false) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    ...(withYear ? { year: "numeric" } : {}),
  });
}

/** Last day of a plan week, as YYYY-MM-DD. Week 4 ends on the window's last day. */
export function weekEnd(week: Exclude<Week, "after">, account: Account): string {
  const d = new Date(`${account.windowStart}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + week * 7 - 1);
  const iso = d.toISOString().slice(0, 10);
  return week === 4 || iso > account.windowEnd ? account.windowEnd : iso;
}

/** The plan week an as-of date falls in. Before day 1 counts as week 1, after day 30 as week 4. */
export function currentWeek(asOf: string, account: Account): 1 | 2 | 3 | 4 {
  if (asOf <= account.windowStart) return 1;
  const days = (Date.parse(`${asOf}T00:00:00Z`) - Date.parse(`${account.windowStart}T00:00:00Z`)) / 86_400_000;
  return Math.min(4, Math.floor(days / 7) + 1) as 1 | 2 | 3 | 4;
}

/** First day of a plan week, as YYYY-MM-DD. */
export function weekStart(week: Exclude<Week, "after">, account: Account): string {
  const d = new Date(`${account.windowStart}T00:00:00Z`);
  d.setUTCDate(d.getUTCDate() + (week - 1) * 7);
  return d.toISOString().slice(0, 10);
}

/** Today in local time, as YYYY-MM-DD. */
export function todayIso(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** When an item is due: the last day of its plan week, or "After day 30". */
export function dueLabel(week: Week, account: Account): string {
  return week === "after" ? "After day 30" : formatDate(weekEnd(week, account));
}
