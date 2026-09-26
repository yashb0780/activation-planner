import type { Account, Item } from "./types";

// Lead times. An item's lead time is the product's (from the config), plus the customer's
// approval time (approval_lead_time in the handoff) when the config says the item waits
// for their approval. With no approval time in the handoff, it is the product's alone.

export interface Lead {
  min: number;
  max: number;
  /** The product's part, from the config. */
  product: { min: number; max: number };
  /** Their approval part, when it applies. */
  approval?: { min: number; max: number };
}

export function effectiveLead(item: Item, account: Account): Lead | null {
  if (!item.lead) return null;
  const approval = item.approval?.length && account.approvalWeeks ? account.approvalWeeks : undefined;
  return {
    min: item.lead.min + (approval?.min ?? 0),
    max: item.lead.max + (approval?.max ?? 0),
    product: item.lead,
    approval,
  };
}

const range = (r: { min: number; max: number }) => (r.min === r.max ? `${r.min}` : `${r.min} to ${r.max}`);

/** "4 to 8 weeks: 1 to 4 from the product config, plus 3 to 4 for their IT approval". */
export function describeLead(item: Item, account: Account): string | null {
  const l = effectiveLead(item, account);
  if (!l) return null;
  if (!l.approval) return `${range(l)} weeks, from the product config`;
  return `${range(l)} weeks: ${range(l.product)} from the product config, plus ${range(l.approval)} for their ${approvalKinds(item)} approval`;
}

/** "IT", "security and IT". */
export function approvalKinds(item: Item): string {
  const k = item.approval ?? [];
  return k.length <= 1 ? (k[0] ?? "") : `${k.slice(0, -1).join(", ")} and ${k[k.length - 1]}`;
}

/** One line on why a promise cannot be kept, or null when it still can. The promise is at
 *  risk when even the short end of the lead time is longer than the weeks promised. */
export function promiseRiskReason(item: Item, account: Account): string | null {
  const l = effectiveLead(item, account);
  if (item.promisedWeek === undefined || !l || l.min <= item.promisedWeek) return null;
  const why = l.approval
    ? `${range(l.product)} from the product config, plus ${range(l.approval)} for their ${approvalKinds(item)} approval`
    : `${range(l.product)} from the product config`;
  return `Promised by week ${item.promisedWeek}, but it needs at least ${l.min} weeks: ${why}.`;
}
