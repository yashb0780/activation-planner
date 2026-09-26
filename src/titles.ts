import type { Item } from "./types";

// Short titles. Every item's title is short, and comes from one of three places,
// never written freely:
//   1. The product config: the bold words at the start of a bullet or step.
//   2. This file: titles the planner makes by rule for any product (RULE, PREFIX).
//   3. This file: question topics, picked from the handoff fields a question covers, or
//      named on the question (`topic`) when that reads better. Either way, from TOPICS.
// A title written by hand is marked `handTitle` on the item, so it can be counted.
// The same rules are written out in SKILL.md. Change both together.

export const MAX_WORDS = 6;

/** Titles the planner makes by rule, whatever the product. */
export const RULE = {
  successPlan: "Draft the success plan",
  execSponsor: "Identify exec sponsor",
  baselines: "Capture baselines",
  day30: "Hold the day 30 review",
  /** A long-lead item is already drifting on day 1. */
  resetDate: "Decide new go-live or cut scope",
  /** The customer's approval timelines are not in the handoff. */
  askApprovals: "Ask about approval timelines",
} as const;

/** Rule-made titles with a colon. The part before the colon is fixed; after it
 *  comes another item's title, a module name, a question topic, or "request N". */
export const PREFIX = {
  /** A customer-side item has no named person: "Name owner: <its title>". */
  nameOwner: "Name owner",
  /** A conflict from the board: "Raise conflict: <what it is about>". */
  raise: "Raise conflict",
  /** A lead time the handoff does not resolve: "Decide scope: <module>". */
  scope: "Decide scope",
  /** A module reaching its evidence after day 30: "Reach evidence: <module>". */
  evidence: "Reach evidence",
} as const;

/** Question topics, each with the handoff fields that point to it. A question's topic is the
 *  topic of the first field it covers, so the planner lists a question's main field first. */
const TOPICS: [string, string[]][] = [
  ["People and sponsor", ["technical_owner", "exec_sponsor", "admin", "owner_capacity", "sponsor_engaged", "success_judge"]],
  ["Dates and deadlines", ["target_date", "date_driver", "date_fixed", "slip_impact", "freeze_periods"]],
  ["Why they bought", ["use_case", "why_now", "scope_phase", "alternatives", "incumbent", "why_leaving"]],
  [
    "Sales commitments",
    ["commitments", "timing_promises", "risky_promises", "products", "contract_size", "close_date", "contract_start", "rep", "se", "csm", "customer_name", "industry"],
  ],
  ["What a win looks like", ["success_outcome", "success_signal", "success_number", "failure_definition", "day30_required"]],
  ["What to set up first", ["out_of_scope", "section_6"]],
  [
    "Security review and data",
    ["security_review", "security_review_status", "security_signoff", "security_open_items", "certifications", "data_residency"],
  ],
  ["Access and identity", ["sso_required", "identity_provider", "identity_contact", "provisioning_required", "security_contact"]],
  [
    "Current setup and data",
    ["integrations", "frameworks", "docs_location", "current_process", "keep_existing", "credential_holders", "install_restrictions"],
  ],
  [
    "Teams and structure",
    ["teams_launch", "teams_later", "team_count", "end_users", "geographies", "process_shape", "separate_envs", "outside_agreement"],
  ],
  ["Baseline numbers", ["core_volume", "core_cycle_time", "team_headcount"]],
  ["Handoff notes", ["notes"]],
  // Topics no field points to. A question picks one with `topic` when the first-field
  // rule reads badly for it.
  ["Platform owner", []],
  ["Alert owners", []],
];

export const QUESTION_TOPICS = TOPICS.map(([t]) => t);
const SET_UP_FIRST = "What to set up first";
const BASELINES = "Baseline numbers";

/** The topic one field points to. Section 6 requests point to "What to set up first";
 *  the baseline rows a config adds point to "Baseline numbers". */
function topicOf(field: string, baselineFields: string[]): string | undefined {
  if (/^request_\d+/.test(field)) return SET_UP_FIRST;
  if (baselineFields.includes(field)) return BASELINES;
  return TOPICS.find(([, fields]) => fields.includes(field))?.[0];
}

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** A question's short title: the topic it picks from the fixed list, if it picks one;
 *  otherwise the topic of its first field (see questionTitle). */
export function questionTitleFor(item: Pick<Item, "from" | "topic">, baselineFields: string[] = []): string {
  return item.topic && QUESTION_TOPICS.includes(item.topic) ? item.topic : questionTitle(item.from, baselineFields);
}

/** A question's short title: the topic of the first field it covers that has one. When that
 *  field is a section 6 request and every request the question covers is in one module, the
 *  title names the module instead: "Evaluation requests". */
export function questionTitle(from: string[], baselineFields: string[] = []): string {
  const first = from.find((f) => topicOf(f, baselineFields));
  if (!first) return "Open question";
  const topic = topicOf(first, baselineFields)!;
  if (/^request_\d+/.test(first)) {
    const modules = new Set(from.map((f) => /^request_\d+@(.+)$/.exec(f)?.[1]).filter(Boolean));
    if (modules.size === 1) return `${capitalize([...modules][0]!)} requests`;
  }
  return topic;
}

/** First words a task title may start with. Add a verb here when a config needs one. */
export const VERBS = new Set([
  "Agree", "Ask", "Assign", "Automate", "Build", "Capture", "Check", "Choose", "Clean", "Collect", "Complete",
  "Confirm", "Connect", "Create", "Define", "Deploy", "Document", "Draft", "Find", "Gather", "Get", "Hold",
  "Identify", "Issue", "Mask", "Match", "Name", "Open", "Pick", "Plan", "Prepare", "Put", "Raise", "Reach",
  "Record", "Request", "Route", "Run", "Secure", "Set", "Settle", "Share", "Start", "Tell", "Trace", "Turn", "Write",
]);

const words = (s: string) => s.trim().split(/\s+/).filter(Boolean);

/** Everything wrong with an item's title, as plain sentences. Empty when it follows the rules. */
export function titleProblems(item: Pick<Item, "title" | "kind">): string[] {
  const out: string[] = [];
  const t = item.title;
  if (!t.trim()) return ["Title is empty"];
  if (/[.?!]$/.test(t)) out.push("Ends with a full stop or question mark");
  if (t.includes("\u2014")) out.push("Contains an em dash");
  const parts = t.split(": ");
  if (parts.length > 2) out.push("More than one colon");
  parts.forEach((part, n) => {
    const w = words(part);
    if (w.length > MAX_WORDS) out.push(`${n === 0 ? "Title" : "Part after the colon"} has ${w.length} words, more than ${MAX_WORDS}`);
    if (!/^[A-Z0-9]/.test(part)) out.push(`${n === 0 ? "Title" : "Part after the colon"} does not start with a capital`);
    // Sentence case: after the first word, only acronyms and numbers may start with a capital.
    w.slice(1).forEach((x) => {
      if (/^[A-Z][a-z]/.test(x)) out.push(`"${x}" should be lower case (sentence case)`);
    });
  });
  const first = words(parts[0]!)[0] ?? "";
  if (item.kind === "decision" && first !== "Decide") out.push('A decision starts with "Decide"');
  if (item.kind === "task" && !VERBS.has(first)) out.push(`A task starts with a verb; "${first}" is not in the verb list`);
  if (item.kind === "question" && VERBS.has(first)) out.push("A question title is a short topic, not an instruction");
  return out;
}

/** Short titles a product config defines: the bold words, ending in a full stop, at the
 *  start of a bullet or step. "**Set up SSO.** SAML SSO..." gives "Set up SSO". */
export function configTitles(configText: string): Set<string> {
  return new Set([...configText.matchAll(/\*\*([^*\n]+?)\.\*\*/g)].map((m) => m[1]!.trim()));
}
