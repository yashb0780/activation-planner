export type Lane = "start" | "quick" | "earned";
export type Week = 1 | 2 | 3 | 4 | "after";
export type Status = "todo" | "progress" | "blocked" | "done";
export type Side = "us" | "customer";
export type Visibility = "internal" | "shared";

/** task: work on the plan. question: an UNKNOWN in the handoff.
 *  volume: a section 6 request with no volume ("find out the volume").
 *  conflict: a conflict from the board, to raise with the customer. */
export type Kind = "task" | "question" | "volume" | "conflict";

/** A module or area from the product config, such as a module name. Kept as a
 *  plain string so the app stays product-agnostic. */
export type Module = string;

export interface Why {
  /** Handoff field ID(s), or the config rule, that put this item on the plan. */
  field: string;
  /** What the handoff says in that field. */
  answer: string;
  /** Source recorded in the handoff. Empty when the handoff gives none. */
  source: string;
}

export interface Item {
  id: string;
  title: string;
  kind: Kind;
  module: Module;
  lane: Lane;
  week: Week;
  status: Status;
  owner: string;
  side: Side;
  blockedBy?: string;
  why: Why;
  /** Evidence that it is real, quoted from the config or the plan's checkpoint. */
  doneWhen: string[];
  /** The config's "Not evidence" line for this module. */
  notEvidence: string[];
  visibility: Visibility;
  /** Expected landing window, for items after day 30. */
  window?: string;
}

export interface Note {
  text: string;
  at: string;
  internal: boolean;
}

export interface Account {
  customer: string;
  windowStart: string;
  windowEnd: string;
  goLive: string;
}
