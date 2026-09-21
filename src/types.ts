export type Lane = "start" | "quick" | "earned";
export type Week = 1 | 2 | 3 | 4 | "after";
export type Status = "todo" | "progress" | "blocked" | "done";
export type Side = "us" | "customer";
export type Visibility = "internal" | "shared";

/** task: work on the plan. decision: a choice someone has to make and record.
 *  question: an UNKNOWN in the handoff, including "find out the volume". */
export type Kind = "task" | "decision" | "question";

/** A module or area from the product config. Kept as a plain string so the app
 *  stays product-agnostic. */
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
  /** "other": owned by the customer's other teams (identity, security, infrastructure). */
  team?: "other";
  /** A conflict from the board. Hidden in customer view. */
  conflict?: boolean;
  /** A question whose answer is a monthly volume. */
  volume?: boolean;
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

export interface Decision {
  decided: string;
  by: string;
  date: string;
}

export interface Account {
  customer: string;
  windowStart: string;
  windowEnd: string;
  goLive: string;
}

export interface FirstValue {
  text: string;
  basis: string;
}

export interface Gate {
  id: string;
  label: string;
  exit: string;
  linked: string[];
}

export type Quadrant = "closely" | "satisfied" | "informed" | "monitor";
export type Sentiment = "supporter" | "neutral" | "skeptic" | "unknown";

export interface Person {
  id: string;
  name: string;
  role: string;
  /** What's in it for them. Only when the handoff states it. */
  wiifm: string;
  engagement: string;
  sentiment: Sentiment;
  quadrant: Quadrant;
  /** A role the handoff lists as UNKNOWN. Drawn as an empty dashed card. */
  placeholder?: boolean;
}
