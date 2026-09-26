/** kickoff: quick setup done at kickoff, first in week 1 (the config's Kickoff setup, plus the success plan).
 *  foundation: the config's Foundation tier. Starts in week 1, keeps its own lead time. */
export type Lane = "kickoff" | "foundation" | "start" | "quick" | "earned";
export type Week = 1 | 2 | 3 | 4 | "after";
/** Not started, In progress, On hold (needs a reason), Done (needs a proof note). */
export type Status = "todo" | "progress" | "hold" | "done";
export type Side = "us" | "customer";
export type Visibility = "internal" | "shared";
/** Kinds of customer sign-off a config item can wait for. */
export type Approval = "security" | "IT" | "procurement";

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
  /** Short title, 2 to 6 words, from the config, a rule, or a question topic (see src/titles.ts). */
  title: string;
  /** The full description, shown in the side panel. For a question, the question as asked. */
  description: string;
  /** Set when the title was written by hand because no config line or rule gives one. */
  handTitle?: boolean;
  /** A question only: a topic from the fixed list in src/titles.ts, used as its title when
   *  the first-field rule reads badly. */
  topic?: string;
  /** Items that must be done before this one can finish, by ID. From the config's "Depends on". */
  dependsOn?: string[];
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
  /** The customer sign-offs this item waits for, from the config's "Needs customer approval".
   *  Their approval time (Account.approvalWeeks) is added to its lead time. */
  approval?: Approval[];
  /** The week a sales promise said this would be done by, when the commitments table gives
   *  one as a number. Used to work out "Promise at risk". */
  promisedWeek?: number;
  /** 2 to 3 short checks anyone could verify by looking. */
  doneWhen: string[];
  /** The config's "Evidence it is real" lines for this module, quoted unedited. */
  evidence?: string[];
  /** The config's "Not evidence" line for this module. */
  notEvidence: string[];
  visibility: Visibility;
  /** Expected landing window, for items after day 30. */
  window?: string;
  /** A row of the handoff's commitments table this item carries: the promise and its
   *  stated timing, as recorded. Shown as "Promised in sales". */
  promised?: string;
  /** Set when the promised timing is shorter than the lead time. The timing is not moved;
   *  this says so. Shown as "Promise at risk". Worked out by src/rules.ts when promisedWeek
   *  is set; otherwise written in the demo data. */
  promiseRisk?: string;
  /** Set when the item rests on an answer sourced "agent's read": the agent's reason.
   *  Shown as "Verify". Never the only basis for a date, milestone or commitment. */
  verify?: string;
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
  /** Target go-live date. Absent when the handoff's target date is UNKNOWN. */
  goLive?: string;
  /** approval_lead_time from the handoff: how many weeks their security or IT approvals
   *  usually take. Absent when the handoff leaves it blank. */
  approvalWeeks?: { min: number; max: number };
}

export interface FirstValue {
  /** One line: what flows where. */
  headline: string;
  /** Exactly three short points, in the order Volume, Proof, Why first. */
  points: { label: string; text: string }[];
  /** The longer reasoning, shown behind the Why? toggle. */
  basis: string;
  /** No request qualifies yet. The headline and points say what would decide it. */
  notProposed?: boolean;
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
  /** The product config this demo was planned from, relative to the repo root. Its bold
   *  short titles are the only titles a task or decision may use without a rule. */
  configFile: string;
  /** The generated board, relative to the repo root. When it has an "Item index" section,
   *  `npm test` checks that the items here match it. Optional. */
  boardFile?: string;
  /** Place in the example switch, lowest first. The first is the default on load. Absent: last. */
  order?: number;
  /** Footer line, e.g. "Illustrative example. X is fictional." */
  note: string;
  /** Show the product as the header title, with the customer underneath. For a product demo. */
  productFirst?: boolean;
  /** Mark the customer as fictional in the header. */
  fictionalCustomer?: boolean;
  /** A quiet line under the header, e.g. an unofficial-demo disclaimer. */
  disclaimer?: string;
  /** A fixed demo date, YYYY-MM-DD. Drift, overdue and "this week" are checked against it
   *  instead of today, so the demo looks the same whenever it is opened. ?asof= still wins. */
  asOf?: string;
  account: Account;
  items: Item[];
  roles: Role[];
  gates: Gate[];
  firstValue: FirstValue;
  successPlan: SuccessPlan;
  people: Person[];
  gateGaps: GateGap[];
  /** How many handoff answers are sourced "agent's read". Adds one line to the
   *  Handoff incomplete panel. Absent or 0: the panel is unchanged. */
  agentReads?: number;
  driftRules: DriftRules;
  configFieldLabels: Record<string, string>;
}
