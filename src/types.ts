/** foundation: the config's Foundation tier. Starts in week 1, keeps its own lead time. */
export type Lane = "foundation" | "start" | "quick" | "earned";
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
  /** One line: what flows where. */
  headline: string;
  /** Exactly three short points, in the order Volume, Proof, Why first. */
  points: { label: string; text: string }[];
  /** The longer reasoning, shown behind the Why? toggle. */
  basis: string;
}

export interface Criterion {
  /** Under 7 words. */
  text: string;
  /** The item whose completion ticks this criterion. */
  item: string;
}

export interface Gate {
  id: string;
  label: string;
  /** 2 to 4 short criteria. */
  criteria: Criterion[];
  /** Every item counted in "X of Y linked items done". */
  linked: string[];
  /** Target week (inferred). The date is the last day of that week. */
  by: Week;
  /** The tier this gate clears, if any. Its bucket links back to the gate. */
  lane?: Lane;
}

export interface Measure {
  /** What they will look at, in their words. */
  measure: string;
  /** The baseline from the handoff, or UNKNOWN. */
  baseline: string;
  /** Estimate or measured, plus source, as the handoff records it. */
  basis: string;
}

export interface SuccessPlan {
  /** success_outcome, quoted. */
  goal: string;
  goalSource: string;
  judge: string;
  measures: Measure[];
}

/** Our side of the account, from section 2 of the handoff. */
export interface TeamMember {
  name: string;
  role: string;
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
