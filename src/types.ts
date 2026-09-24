/** kickoff: quick setup done at kickoff, first in week 1 (the config's Kickoff setup, plus the success plan).
 *  foundation: the config's Foundation tier. Starts in week 1, keeps its own lead time. */
export type Lane = "kickoff" | "foundation" | "start" | "quick" | "earned";
export type Week = 1 | 2 | 3 | 4 | "after";
/** Not started, In progress, On hold (needs a reason), Done (needs a proof note). */
export type Status = "todo" | "progress" | "hold" | "done";
export type Side = "us" | "customer";
export type Visibility = "internal" | "shared";

/** task: work on the plan. decision: a choice someone has to make and record.
 *  question: an UNKNOWN in the handoff, including "find out the volume". */
export type Kind = "task" | "decision" | "question";

/** A module or area from the product config. Kept as a plain string so the app
 *  stays product-agnostic. */
export type Module = string;

export interface Why {
  /** What we know, as short bullet points drawn from the handoff and the config. */
  facts: string[];
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
  /** The side doing the work. Its first owner is the item's primary owner. */
  side: Side;
  /** Owner roles on our side, primary first. Absent: the CSM. */
  ours?: string[];
  /** Owner roles on their side, primary first. Absent: the technical owner. Empty: not named. */
  theirs?: string[];
  /** "other": owned by the customer's other teams (identity, security, infrastructure). */
  team?: "other";
  /** A conflict from the board. Hidden in customer view. */
  conflict?: boolean;
  /** Why it is on hold. From the handoff when the plan starts it on hold. */
  holdReason?: string;
  /** For a grouped question: the detail it covers, one line per original question.
   *  Ticked off as the answer comes in. Each line names the handoff fields it came from. */
  checklist?: { text: string; from: string[] }[];
  why: Why;
  /** Handoff field IDs this item came from, shown as "From: ...". "config" means a product
   *  config default. Section 6 requests use request_1, request_2 and so on. */
  from: string[];
  /** Lead time in weeks, from the config, for long-lead items the drift check watches. */
  lead?: { min: number; max: number };
  /** 2 to 3 short checks anyone could verify by looking. */
  doneWhen: string[];
  /** The config's "Evidence it is real" lines for this module, quoted unedited. */
  evidence?: string[];
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
  /** The product being activated, shown as plain text. */
  product: string;
  /** The product's website, shown as a small plain link under its name. Optional. */
  productUrl?: string;
  /** Freeze periods from the handoff, inclusive dates. */
  freezes: { start: string; end: string }[];
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
  /** Role of success_judge. */
  judge: string;
  measures: Measure[];
}

export type Quadrant = "closely" | "satisfied" | "informed" | "monitor";
export type Sentiment = "supporter" | "neutral" | "skeptic" | "unknown";

export interface Person {
  id: string;
  /** The People-list role this card stands for. The name comes from the role. */
  roleId: string;
  /** A fuller description of the role, from the handoff. */
  role: string;
  /** What's in it for them. Only when the handoff states it. */
  wiifm: string;
  engagement: string;
  sentiment: Sentiment;
  quadrant: Quadrant;
}

/** One role on the People list. The name is looked up from here by every item that uses the role. */
export interface Role {
  id: string;
  side: Side;
  label: string;
  /** Empty when the handoff does not name anyone. */
  name: string;
}

/** Thresholds from the config's Drift rules. The rules themselves live in src/drift.ts. */
export interface DriftRules {
  bufferWeeks: number;
  freezePausesWork: boolean;
  amberUses: "min" | "max";
  redUses: "min" | "max";
}

/** A required field the handoff gate found missing or partly missing. */
export interface GateGap {
  field: string;
  id: string;
  state: "missing" | "partly";
  detail: string;
  /** Role that fills it: the rep or the SE. */
  filledBy: string;
}

/** Everything the tracker shows for one customer. The public example and any
 *  private demo (src/data/private-*.ts, git-ignored) each export one. */
export interface Dataset {
  id: string;
  /** Short name for the example switch. */
  label: string;
  /** Footer line, e.g. "Illustrative example. X is fictional." */
  note: string;
  account: Account;
  items: Item[];
  roles: Role[];
  gates: Gate[];
  firstValue: FirstValue;
  successPlan: SuccessPlan;
  people: Person[];
  gateGaps: GateGap[];
  driftRules: DriftRules;
  configFieldLabels: Record<string, string>;
}
