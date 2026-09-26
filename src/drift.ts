import { effectiveLead } from "./lead.ts";
import type { Account, DriftRules, Item } from "./types";

// Drift flags: fixed rules, no judgement. Every threshold comes from the
// config's Drift rules (see DriftRules). Only long-lead items with a lead time
// in weeks are checked, and only while they have not started. The lead time
// includes the customer's approval time when the item waits for it (src/lead.ts).
//
//   Latest safe start = the target date, counted back by the lead time
//   (skipping freeze days if freezes pause work), minus the buffer.
//   Drifting (amber): not started, and the as-of date is after the latest safe
//   start for the end of the lead time the config names for amber.
//   At risk (red): the same test with the end the config names for red. Red wins.

export type DriftFlag = "drifting" | "risk";

export interface Drift {
  flag: DriftFlag | null;
  /** Latest safe start, for the amber end of the lead time. Null with no target date. */
  latestSafeStart: string | null;
  /** First date the item turns red if it still has not started. Null with no target date. */
  redFrom: string | null;
  /** Earliest finish if work started on the as-of date, for the red end. */
  earliestFinish: string;
}

const DAY = 86_400_000;
const toDate = (iso: string) => new Date(`${iso}T00:00:00Z`);
const toIso = (d: Date) => d.toISOString().slice(0, 10);

function frozen(iso: string, account: Account, rules: DriftRules) {
  return rules.freezePausesWork && account.freezes.some((f) => iso >= f.start && iso <= f.end);
}

/** The latest start date that still leaves `weeks` of working days before the target. */
function latestStart(weeks: number, goLive: string, account: Account, rules: DriftRules): string {
  let left = (weeks + rules.bufferWeeks) * 7;
  let d = toDate(goLive);
  while (left > 0) {
    d = new Date(d.getTime() - DAY);
    if (!frozen(toIso(d), account, rules)) left--;
  }
  return toIso(d);
}

/** The day after `weeks` of working days, counted from `from`. */
function finishFrom(from: string, weeks: number, account: Account, rules: DriftRules): string {
  let left = weeks * 7;
  let d = toDate(from);
  while (left > 0) {
    if (!frozen(toIso(d), account, rules)) left--;
    d = new Date(d.getTime() + DAY);
  }
  return toIso(d);
}

export function drift(item: Item, asOf: string, account: Account, rules: DriftRules): Drift | null {
  const lead = effectiveLead(item, account);
  if (!lead) return null;
  const earliestFinish = finishFrom(asOf, lead[rules.redUses], account, rules);
  // No target date: nothing to count back from, so no latest safe start and no flag.
  if (!account.goLive) return { flag: null, latestSafeStart: null, redFrom: null, earliestFinish };
  const amberStart = latestStart(lead[rules.amberUses], account.goLive, account, rules);
  const redStart = latestStart(lead[rules.redUses], account.goLive, account, rules);
  const started = item.status === "progress" || item.status === "done";
  const flag = started ? null : asOf > redStart ? "risk" : asOf > amberStart ? "drifting" : null;
  return {
    flag,
    latestSafeStart: amberStart,
    redFrom: toIso(new Date(toDate(redStart).getTime() + DAY)),
    earliestFinish,
  };
}
