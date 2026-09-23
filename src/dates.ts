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
