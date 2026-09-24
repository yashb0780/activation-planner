// Illustrative example. Halden Retail Group is fictional.
// Built only from examples/halden-retail-board.md, examples/halden-retail-30-day-plan.md
// and examples/halden-retail-handoff.md. No facts beyond those files. Groupings,
// gates, quadrant placements and the proposed first value are judgment calls,
// labelled inferred in the UI.
// Owners are roles. Our side defaults to the CSM and their side to the technical
// owner; an item names other roles only where the plan does.

import type { Account, Dataset, DriftRules, FirstValue, GateGap, Gate, Item, Person, Role, SuccessPlan } from "../types";

export const account: Account = {
  customer: "Halden Retail Group",
  product: "ITSM (example config)",
  windowStart: "2026-10-01",
  windowEnd: "2026-10-30",
  goLive: "2027-01-12",
  // freeze_periods: "2026-12-01 to 2027-01-06. No IT changes. Retail peak trading."
  freezes: [{ start: "2026-12-01", end: "2027-01-06" }],
};

// ─── People list ──────────────────────────────────────────────────────────
// One list per plan. Every item points at roles here; names are looked up.
// Names from section 2 and Account basics of the handoff. Empty name: UNKNOWN.
export const roles: Role[] = [
  { id: "csm", side: "us", label: "CSM", name: "M. Lindqvist" },
  { id: "impl_lead", side: "us", label: "Implementation lead", name: "M. Lindqvist" },
  { id: "se", side: "us", label: "SE", name: "K. Varga" },
  { id: "rep", side: "us", label: "Rep", name: "D. Osei" },
  { id: "technical_owner", side: "customer", label: "Technical owner", name: "Priya Raman" },
  { id: "exec_sponsor", side: "customer", label: "Exec sponsor", name: "Dana Whitfield" },
  { id: "store_lead", side: "customer", label: "Store support lead", name: "Tomas Berg" },
  { id: "admin", side: "customer", label: "Day-to-day admin", name: "" },
  { id: "security_contact", side: "customer", label: "Security contact", name: "" },
  { id: "identity_contact", side: "customer", label: "Identity / IT contact", name: "" },
];

// ─── Drift rules ──────────────────────────────────────────────────────────
// Thresholds copied from the Drift rules section of config/itsm.md.
export const driftRules: DriftRules = {
  bufferWeeks: 0,
  freezePausesWork: true,
  amberUses: "max",
  redUses: "min",
};

// ─── Handoff gate ─────────────────────────────────────────────────────────
// Result of checking the "Required before planning" table in
// templates/handoff.md against examples/halden-retail-handoff.md.
export const gateGaps: GateGap[] = [
  {
    field: "Core volume per month",
    id: "core_volume",
    state: "partly",
    detail: "Store volume is UNKNOWN. Head office is ~1,400 a month, estimate.",
    filledBy: "se",
  },
];

// Section 10 rows the config adds, named as the handoff names them. Used for source tags.
export const configFieldLabels: Record<string, string> = {
  first_response_time: "Average time to first response",
  unstructured_share: "Share of requests arriving unstructured (email, chat, tap on the shoulder)",
  asset_count: "Known asset count",
  change_volume: "Changes per month, and share that are emergency",
  kb_articles: "Existing knowledge articles",
};


// Evidence and "Not evidence" lines, quoted from config/itsm.md.
const CATALOG_EV = [
  "More than half of new requests arrive through catalog items rather than free-text email or a tap on the shoulder, sustained across two consecutive weeks",
  "At least one approval requested, approved and fulfilled end to end in production, by the real approver rather than the admin testing it",
  "Low reassignment rate on catalog tickets: requests land on the right team first time",
  "Every live item has a named owner recorded on the item itself",
];
const CATALOG_NOT = ["Items built", "Portal branded", "A test request submitted by the admin"];

const KB_EV = [
  "Articles are linked from resolved tickets, and that rate is rising month over month",
  "Articles created by agents during ticket work in the last 30 days",
  "Self-service or deflected sessions tracked against the handoff baseline",
  "Only a small share of articles are past their review date",
];
const KB_NOT = ["N articles imported", "Search works", "The portal is live"];

const WF_EV = [
  "A measurable share of tickets routed, categorised or resolved with no human touch, compared against the pre-automation baseline in the handoff",
  "Execution logs showing rules firing in production on real tickets, not test records",
  "The rules are still enabled 30 days after launch, with no pile of manual workarounds running alongside them",
  "Time to first response has moved, not just time to assign",
];
const WF_NOT = ["Rules built", "A test ticket firing correctly", "A walkthrough of the builder"];

const DISC_EV = [
  "Scans running on schedule for at least two consecutive cycles without a manual restart",
  "Device count found reconciles against the customer's own expected count, with the gap explained rather than ignored",
  "Unidentified and duplicate records below an agreed threshold",
  "Relationships between devices, services and software populated, not just rows of hardware",
];
const ASSET_EV = [
  "Assets referenced on incidents and changes by agents doing normal work, without being told to",
  "A spot audit of 20 random records matches physical or cloud reality above an agreed rate",
  "Lifecycle events (assign, reclaim, retire) recorded in the product, and the parallel spreadsheet has actually been retired",
  "Stale record share (not seen by discovery in 30 days) is tracked and trending down",
];
const ASSET_NOT = ["A populated asset list", "A dashboard with a device count", "One successful scan"];

const CHANGE_EV = [
  "Changes are raised before the work happens. The ratio of retroactive and emergency changes to planned ones is the single best indicator, and it should be falling.",
  "The change board runs from the product's queue, not a spreadsheet or a slide",
  "Standard change templates used repeatedly by engineers without help from the admin",
  "Failed change and rollback rates being reported, which means somebody is actually looking",
  "Changes reference affected assets or services, which is only possible if the asset data holds up",
];
const CHANGE_NOT = ["The workflow is built", "A board meeting was scheduled", "The first change was filed by the admin"];

const TECH_CALL = "Technical call, 2026-09-02";

export const items: Item[] = [
  // ─── Week 1 · start now ────────────────────────────────────────────────
  {
    id: "catalog-scope",
    title: "Decide: starter set or complete catalog",
    kind: "decision",
    module: "Service catalog",
    lane: "start",
    week: 1,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "Starter set: 8 to 12 request types, short lead time",
        "Complete catalog: long lead time, the most common reason go-live slips",
        "The handoff names 3 requests; Facilities and HR are out of scope",
        "Open question: nobody has asked which they want",
      ],
      source: TECH_CALL,
    },
    from: ["out_of_scope", "config"],
    doneWhen: [
      "Starter set or complete catalog, recorded",
      "If starter set: the 8 to 12 request types listed",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "security-review",
    title: "Find out if a security review exists, then open it",
    kind: "task",
    module: "Security review",
    lane: "start",
    week: 1,
    status: "hold",
    theirs: ["exec_sponsor"],
    side: "customer",
    team: "other",
    holdReason: "No security owner or security contact named. Routed to the exec sponsor by default.",
    why: {
      facts: [
        "Review required: UNKNOWN",
        "Status: not started",
        "Sign-off owner: UNKNOWN",
        "Config: assume a review exists even when nobody mentions it",
      ],
      source: TECH_CALL,
    },
    from: ["security_review", "security_review_status", "security_signoff"],
    doneWhen: [
      "Security owner named",
      "Review opened, or confirmed not needed, in writing",
      "Sign-off received",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "discovery-credentials",
    title: "Request discovery credentials, subnet list and scanner host",
    kind: "task",
    module: "Discovery",
    lane: "start",
    week: 1,
    status: "hold",
    theirs: ["exec_sponsor"],
    side: "customer",
    team: "other",
    holdReason: "Credential holders UNKNOWN. No security or infrastructure contact named.",
    why: {
      facts: [
        "Credential holders: UNKNOWN for every system except the wiki (Priya)",
        "Restrictions on installing software: UNKNOWN",
        "No security or infrastructure contact named",
      ],
      source: "",
    },
    from: ["credential_holders", "install_restrictions"],
    lead: { min: 8, max: 16 },
    doneWhen: [
      "Credentials received for each platform in scope",
      "Subnet list supplied",
      "Scanner host agreed",
    ],
    notEvidence: ASSET_NOT,
    visibility: "shared",
  },
  {
    id: "workspaces",
    title: "Set up the workspace, or two, for both desks",
    kind: "task",
    module: "Kickoff setup",
    lane: "kickoff",
    week: 1,
    status: "hold",
    side: "us",
    holdReason: "One workspace or two is decided in week 2, with the one-process-or-two question.",
    why: {
      facts: [
        "Team 1: Head-office IT",
        "Team 2: Store support",
        "Open question: one workspace or two, decided in week 2",
      ],
      source: "Technical call, 2026-09-02",
    },
    from: ["team_count", "config"],
    doneWhen: [
      "One-or-two workspace decision recorded",
      "Workspace set up and both teams (Head-office IT, Store support) can log in",
      "A test request reaches the right team in each workspace",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "roles",
    title: "Set up roles and permissions for both desks",
    kind: "task",
    module: "Kickoff setup",
    lane: "kickoff",
    week: 1,
    status: "todo",
    side: "us",
    why: {
      facts: [
        "Head-office IT desk: 9 agents",
        "Store support desk: 14 agents",
        "Roles needed: agent, admin, requester (config)",
      ],
      source: "",
    },
    from: ["teams_launch", "config"],
    doneWhen: [
      "Agent, admin and requester roles exist for both desks",
      "All 23 agents have the right role",
      "One agent from each desk can log in and see their queue",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "sso",
    title: "Set up single sign-on for both desks",
    kind: "task",
    module: "Foundation",
    lane: "foundation",
    week: 1,
    status: "hold",
    theirs: ["identity_contact"],
    side: "us",
    holdReason: "Identity / IT contact UNKNOWN.",
    why: {
      facts: [
        "SSO required from day one (Priya)",
        "Their identity provider has SSO available",
        "Identity / IT contact: UNKNOWN",
      ],
      source: TECH_CALL,
    },
    from: ["sso_required", "identity_provider"],
    doneWhen: [
      "SSO switched on for both desks",
      "One agent from each desk signs in through SSO",
    ],
    notEvidence: [],
    visibility: "shared",
    window:
      "Starts week 1. Short if the identity team is reached in week 1, long if it stays outside the buying team. Identity contact is UNKNOWN (inferred)",
  },
  {
    id: "test-instance",
    title: "Request the test instance",
    kind: "task",
    module: "Foundation",
    lane: "foundation",
    week: 1,
    status: "todo",
    side: "us",
    why: {
      facts: [
        "Separate test and production: required",
        "Reason: test before anything reaches stores",
        "Matters most near the December freeze",
      ],
      source: TECH_CALL,
    },
    from: ["separate_envs"],
    doneWhen: [
      "Test instance exists",
      "Priya can log in to it",
      "A change can be tried there before production",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "admin",
    title: "Get a day-to-day admin named, with hours budgeted",
    kind: "task",
    module: "Foundation",
    lane: "foundation",
    week: 1,
    status: "todo",
    theirs: ["exec_sponsor"],
    side: "customer",
    why: {
      facts: [
        "Day-to-day admin: UNKNOWN",
        "Priya expects to name someone from the service desk",
        "Priya has about 4 hours a week, no backfill",
      ],
      source: TECH_CALL,
    },
    from: ["admin", "owner_capacity"],
    doneWhen: [
      "An admin is named",
      "Their weekly hours for this are written down",
      "They have admin access to the product",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "agent-groups",
    title: "Define agent groups and business hours",
    kind: "task",
    module: "Foundation",
    lane: "foundation",
    week: 1,
    status: "hold",
    side: "us",
    holdReason: "One process or two is not settled.",
    why: {
      facts: [
        "Stated as one shared process (unsourced)",
        "The desks work differently: phone-first and ticket-first",
        "Routing needs groups and hours to route to (config)",
      ],
      source: "",
    },
    from: ["process_shape", "config"],
    doneWhen: [
      "An agent group exists for each desk",
      "Business hours set for each group",
      "A test ticket reaches the right group",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "mailbox-cutover",
    title: "Plan the shared mailbox cutover",
    kind: "task",
    module: "Foundation",
    lane: "foundation",
    week: 1,
    status: "todo",
    side: "us",
    why: {
      facts: [
        "Head office: a shared mailbox plus a spreadsheet tracker",
        "The shared mailbox is the current front door",
      ],
      source: "",
    },
    from: ["incumbent"],
    doneWhen: [
      "Cutover date agreed",
      "The plan says what happens to the old address",
      "A test email to the old address lands in the new queue",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "success-plan",
    title: "Draft success plan, confirm at kickoff, share by end of week 1",
    kind: "task",
    module: "Success plan",
    lane: "kickoff",
    week: 1,
    status: "todo",
    theirs: ["technical_owner", "exec_sponsor"],
    side: "us",
    why: {
      facts: [
        "Assigned CSM: M. Lindqvist",
        "Built from their goal, the first value, the baselines and the milestones",
        "Confirm at kickoff, share by end of week 1",
      ],
      source: "",
    },
    from: ["success_outcome", "success_signal", "success_number"],
    doneWhen: [
      "One-page success plan drafted",
      "Confirmed with Dana and Priya at kickoff",
      "Shared with both by end of week 1",
    ],
    notEvidence: [],
    visibility: "shared",
  },

  // ─── Open questions, grouped as a CSM would ask them on a call ────────
  {
    id: "q-setup",
    title: "Walk me through your current setup and the systems involved.",
    kind: "question",
    module: "Kickoff questions",
    lane: "start",
    week: 1,
    status: "todo",
    side: "customer",
    theirs: ["technical_owner"],
    why: {
      facts: [
        "6 unknowns about their systems",
        "Most of them block discovery",
        "Discovery is the longest pole on the board",
      ],
      source: "",
    },
    from: ["install_restrictions", "credential_holders", "request_2@asset management with discovery", "frameworks", "docs_location", "kb_articles", "data_residency"],
    checklist: [
      { text: "Any restrictions on installing software or outbound connections?", from: ["install_restrictions"] },
      { text: "Who holds the credentials for each system? Priya holds only the wiki.", from: ["credential_holders"] },
      { text: "What is actually on the store networks, and roughly how much of it?", from: ["request_2@asset management with discovery"] },
      { text: "Any languages or frameworks we have to work with?", from: ["frameworks"] },
      { text: "Where does documentation live, and how many of the ~200 wiki pages are current?", from: ["docs_location", "kb_articles"] },
      { text: "Any data residency or regional hosting requirements?", from: ["data_residency"] },
    ],
    doneWhen: [
      "Every checklist line ticked, or given an owner and a date",
      "Their answer saved on the question",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "q-access",
    title: "Who works on each system today, and who has admin access?",
    kind: "question",
    module: "Kickoff questions",
    lane: "start",
    week: 1,
    status: "todo",
    side: "customer",
    theirs: ["exec_sponsor", "technical_owner"],
    team: "other",
    why: {
      facts: [
        "Security, identity and admin roles: none named",
        "Routed to Dana (exec sponsor) by default, with Priya",
      ],
      source: "",
    },
    from: ["security_review", "security_signoff", "security_contact", "identity_contact", "admin", "provisioning_required"],
    checklist: [
      { text: "Is a security review required, and who owns sign-off?", from: ["security_review", "security_signoff"] },
      { text: "Who is the security contact?", from: ["security_contact"] },
      { text: "Who is the identity / IT contact?", from: ["identity_contact"] },
      { text: "Who will be the day-to-day admin? Priya expects to name someone from the service desk.", from: ["admin"] },
      { text: "Is automated user provisioning required, and does the licence tier include it?", from: ["provisioning_required"] },
    ],
    doneWhen: [
      "Every checklist line ticked, or given an owner and a date",
      "Their answer saved on the question",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "q-day30",
    title: "What has to be true on day 30 for this to feel like a win?",
    kind: "question",
    module: "Kickoff questions",
    lane: "start",
    week: 1,
    status: "todo",
    side: "customer",
    theirs: ["technical_owner", "store_lead"],
    why: {
      facts: [
        "Missing scope: automation by day 30, and what is out of scope",
        "Missing baselines: first response time, store volume",
        "Baselines cannot be recovered once configuration starts",
      ],
      source: "",
    },
    from: ["day30_required", "out_of_scope", "first_response_time", "core_volume"],
    checklist: [
      { text: "Must anything in workflow automation be live by day 30?", from: ["day30_required"] },
      { text: "What is out of scope for workflow automation and change management?", from: ["out_of_scope"] },
      { text: "What is average time to first response today? Capture it before configuring anything.", from: ["first_response_time"] },
      { text: "What is store ticket volume per month? Head office is ~1,400, estimate.", from: ["core_volume"] },
    ],
    doneWhen: [
      "Every checklist line ticked, or given an owner and a date",
      "Their answer saved on the question",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "q-volumes",
    title: "What comes in most often that we have not counted yet?",
    kind: "question",
    module: "Kickoff questions",
    lane: "start",
    week: 1,
    status: "todo",
    side: "customer",
    theirs: ["store_lead"],
    why: {
      facts: [
        "2 requests have no volume, so they are not ranked yet",
        "Both are store-side",
      ],
      source: "",
    },
    from: ["request_3@service catalog", "request_2@knowledge base"],
    checklist: [
      { text: "Till and printer faults in the stores: how many a month?", from: ["request_3@service catalog"] },
      { text: "Store sheets on the back-room wall: how many, and how often do they change?", from: ["request_2@knowledge base"] },
    ],
    doneWhen: [
      "Every checklist line ticked, or given an owner and a date",
      "Their answer saved on the question",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "q-changes",
    title: "How do changes happen today, and who signs them off?",
    kind: "question",
    module: "Kickoff questions",
    lane: "start",
    week: 1,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "No change process exists today",
        "Change management is groundwork only inside 30 days",
        "These answers are that groundwork",
      ],
      source: "",
    },
    from: ["change_volume", "request_1@change management", "request_2@change management", "freeze_periods"],
    checklist: [
      { text: "How many changes a month, and what share are emergency? No change process exists today.", from: ["change_volume"] },
      { text: "Sign-off before anyone touches a store network in trading hours: how often does that come up?", from: ["request_1@change management"] },
      { text: "The December freeze: can we write it down with you, with any maintenance windows?", from: ["request_2@change management", "freeze_periods"] },
    ],
    doneWhen: [
      "Every checklist line ticked, or given an owner and a date",
      "Their answer saved on the question",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "q-agreement",
    title: "Who else needs to agree to this, and what else did you look at?",
    kind: "question",
    module: "Kickoff questions",
    lane: "start",
    week: 1,
    status: "todo",
    side: "customer",
    theirs: ["store_lead"],
    ours: ["rep"],
    why: {
      facts: [
        "Store support has not been in the room",
        "Tomas Berg's desk has the larger volume",
        "Alternatives considered: UNKNOWN, not yet a finding",
      ],
      source: "",
    },
    from: ["outside_agreement", "alternatives"],
    checklist: [
      { text: "Has anyone outside the buying team agreed to this? Tomas Berg has not been on a call, and his desk has the larger volume.", from: ["outside_agreement"] },
      { text: "What alternatives did they consider?", from: ["alternatives"] },
    ],
    doneWhen: [
      "Every checklist line ticked, or given an owner and a date",
      "Their answer saved on the question",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "q-date-fixed",
    title: "Is 12 January 2027 fixed or preferred?",
    kind: "decision",
    module: "Timeline",
    lane: "start",
    week: 1,
    status: "todo",
    theirs: ["exec_sponsor", "technical_owner"],
    side: "customer",
    why: {
      facts: [
        "Dana: fixed, and has told the board",
        "Priya: \"what we are aiming for\"",
        "They have not said this to each other in front of us",
      ],
      source: "",
    },
    from: ["date_fixed"],
    doneWhen: [
      "Fixed or preferred, recorded",
      "Dana and Priya agree, in the same meeting",
    ],
    notEvidence: [],
    visibility: "internal",
  },


  // ─── Conflicts from the board ──────────────────────────────────────────
  {
    id: "c-asset-day30",
    title: "Raise: asset list expected by day 30, lead time says 8 to 16 weeks",
    kind: "task",
    conflict: true,
    module: "Asset management",
    lane: "start",
    week: 1,
    status: "todo",
    side: "us",
    why: {
      facts: [
        "They expect the asset list promised in the demo by day 30",
        "Demo promise: \"an accurate asset list in the first month\"",
        "Config: discovery takes 8 to 16 weeks",
        "Config: a populated asset list is not evidence",
      ],
      source: "Technical call, 2026-09-02; demo call 2026-08-27, recorded",
    },
    from: ["day30_required", "commitments"],
    doneWhen: [
      "Raised with Priya in week one",
      "Her answer recorded in the notes",
    ],
    notEvidence: [],
    visibility: "internal",
  },
  {
    id: "c-capacity",
    title: "Raise: technical owner has about 4 hours a week, no admin named",
    kind: "task",
    conflict: true,
    module: "Foundation",
    lane: "foundation",
    week: 1,
    status: "todo",
    theirs: ["exec_sponsor"],
    side: "us",
    why: {
      facts: [
        "Priya: about 4 hours a week, no backfill",
        "No day-to-day admin named",
        "Config: an admin with time budgeted, not a volunteer",
      ],
      source: TECH_CALL,
    },
    from: ["owner_capacity", "admin"],
    doneWhen: [
      "Raised with Dana in week one",
      "Her answer recorded in the notes",
    ],
    notEvidence: [],
    visibility: "internal",
  },
  {
    id: "c-macro",
    title: "Decide: retire the weekly spreadsheet, or keep the macro",
    kind: "decision",
    module: "Scope",
    lane: "start",
    week: 1,
    status: "todo",
    theirs: ["exec_sponsor", "technical_owner"],
    side: "customer",
    why: {
      facts: [
        "Success signal: Dana stops receiving the weekly spreadsheet",
        "Priya expects the spreadsheet macro to keep running",
        "Both cannot be true",
      ],
      source: "",
    },
    from: ["success_signal", "keep_existing"],
    doneWhen: [
      "Retire or keep, recorded",
      "Dana and Priya both agree",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "c-one-process",
    title: "Decide: one process or two, and one workspace or two",
    kind: "decision",
    module: "Service catalog",
    lane: "start",
    week: 2,
    status: "todo",
    theirs: ["technical_owner", "store_lead"],
    side: "customer",
    why: {
      facts: [
        "Stated as one shared process (unsourced)",
        "Store support: phone-first, same-shift",
        "Head office: ticket-first, next-day",
        "One workspace or two: undecided",
      ],
      source: TECH_CALL,
    },
    from: ["process_shape", "team_count"],
    doneWhen: [
      "One process or two, recorded",
      "One workspace or two, recorded",
      "Both desk leads agree",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "c-finance-register",
    title: "Raise: the asset count comes from a finance register, not IT",
    kind: "task",
    conflict: true,
    module: "Asset management",
    lane: "start",
    week: 1,
    status: "todo",
    side: "us",
    why: {
      facts: [
        "About 4,100 assets expected, estimate",
        "Source: the finance fixed-asset register, not IT",
        "Discovery evidence reconciles against this number",
      ],
      source: "Finance fixed-asset register, not an IT source, 2026-09-16",
    },
    from: ["asset_count"],
    doneWhen: [
      "Raised with Priya",
      "Her answer recorded in the notes",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "c-legacy-expiry",
    title: "Raise: legacy store desk tool expires 2027-03-31",
    kind: "task",
    conflict: true,
    module: "Timeline",
    lane: "start",
    week: 4,
    status: "todo",
    side: "us",
    why: {
      facts: [
        "Stores use a legacy service desk tool",
        "Its contract expires 2027-03-31",
        "Nobody has treated it as a constraint",
      ],
      source: "",
    },
    from: ["incumbent", "notes"],
    doneWhen: [
      "Raised at the day-30 review",
      "Their answer recorded in the notes",
    ],
    notEvidence: [],
    visibility: "shared",
  },

  // ─── Week 2 ────────────────────────────────────────────────────────────
  {
    id: "taxonomy",
    title: "Settle the taxonomy with both desk leads",
    kind: "task",
    module: "Service catalog",
    lane: "start",
    week: 2,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "Changing the taxonomy after items are built means rebuilding them",
        "It sits on the one-process-or-two question",
      ],
      source: "",
    },
    from: ["process_shape", "config"],
    doneWhen: [
      "Categories and form fields written down",
      "Signed off by both desk leads, not just head office",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "catalog-password",
    title: "Build catalog item: password resets and account unlocks",
    kind: "task",
    module: "Service catalog",
    lane: "quick",
    week: 2,
    status: "todo",
    side: "us",
    why: {
      facts: [
        "\"Password resets and account unlocks\"",
        "About 380 a month, head office, measured",
        "Highest volume, so built first",
      ],
      source: "Spreadsheet tracker export, 2026-09-10",
    },
    from: ["request_1"],
    doneWhen: [
      "Item published in the catalog",
      "A real request raised through it",
      "It reaches the right team without being reassigned",
    ],
    evidence: CATALOG_EV,
    notEvidence: CATALOG_NOT,
    visibility: "shared",
  },
  {
    id: "catalog-new-starter",
    title: "Build catalog item: new starter setup",
    kind: "task",
    module: "Service catalog",
    lane: "quick",
    week: 2,
    status: "todo",
    side: "us",
    why: {
      facts: [
        "\"New starter setup: laptop, accounts, the lot\"",
        "About 40 a month, estimate",
      ],
      source: "Priya, discovery call, 2026-08-27",
    },
    from: ["request_2"],
    doneWhen: [
      "Item published in the catalog",
      "Approver named on the item",
      "A real new-starter request raised through it",
    ],
    evidence: CATALOG_EV,
    notEvidence: CATALOG_NOT,
    visibility: "shared",
  },
  {
    id: "starter-set-rest",
    title: "Name the rest of the starter set",
    kind: "task",
    module: "Service catalog",
    lane: "quick",
    week: 2,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "The handoff names 3 requests",
        "A starter set is 8 to 12 request types",
      ],
      source: TECH_CALL,
    },
    from: ["section_6"],
    doneWhen: [
      "8 to 12 request types listed",
      "Priya agrees the list",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "approvers",
    title: "Name approvers per catalog item, with a leave cover rule",
    kind: "task",
    module: "Service catalog",
    lane: "quick",
    week: 2,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "Every item needs a named approver (config)",
        "Plus a rule for when an approver is on leave",
        "Not started",
      ],
      source: "",
    },
    from: ["config"],
    doneWhen: [
      "An approver named on every starter item",
      "A leave cover rule written down",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "kb-start",
    title: "Start the knowledge base: weekly repeat questions first",
    kind: "task",
    module: "Knowledge base",
    lane: "start",
    week: 2,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "\"Answers to the questions we get every week\"",
        "About 250 a month, estimate",
        "Not needed live by day 30",
      ],
      source: "Priya, technical call, 2026-09-02",
    },
    from: ["request_1"],
    lead: { min: 6, max: 10 },
    doneWhen: [
      "Article owners named for each desk",
      "Review cadence and publishing rule agreed",
      "First article written by an agent during ticket work",
    ],
    notEvidence: KB_NOT,
    visibility: "shared",
  },
  {
    id: "change-freeze",
    title: "Write down the December freeze and maintenance windows",
    kind: "task",
    module: "Change management",
    lane: "earned",
    week: 2,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "No IT changes 2026-12-01 to 2027-01-06",
        "Reason: retail peak trading",
        "Groundwork, not the module starting",
      ],
      source: "Priya, stated firmly",
    },
    from: ["freeze_periods"],
    doneWhen: [
      "Freeze dates written down in the product",
      "Maintenance windows written down",
      "Priya confirms both",
    ],
    notEvidence: CHANGE_NOT,
    visibility: "shared",
  },

  // ─── Week 3 ────────────────────────────────────────────────────────────
  {
    id: "routing-rule",
    title: "Routing rule: store tickets to the store desk, head office to us",
    kind: "task",
    module: "Workflow automation",
    lane: "quick",
    week: 3,
    status: "todo",
    side: "us",
    why: {
      facts: [
        "Store tickets to the store desk, head office to us",
        "About 1,400 a month, head office only, estimate",
        "Internal, so no outside credentials needed",
      ],
      source: "Priya, from the spreadsheet tracker, 2026-09-16",
    },
    from: ["request_1"],
    lead: { min: 8, max: 8 },
    doneWhen: [
      "Rule switched on in production",
      "A store ticket lands with the store desk",
      "A head-office ticket lands with head office",
    ],
    evidence: WF_EV,
    notEvidence: WF_NOT,
    visibility: "shared",
  },
  {
    id: "joiners-leavers",
    title: "Joiners and leavers from HR open their own tickets",
    kind: "task",
    module: "Workflow automation",
    lane: "earned",
    week: 3,
    status: "hold",
    side: "us",
    holdReason: "HR system credentials UNKNOWN.",
    why: {
      facts: [
        "70 a month, measured",
        "Crosses into the HR system",
        "HR system credentials: UNKNOWN",
      ],
      source: "HR system report shared by Priya, 2026-09-10",
    },
    from: ["request_2"],
    doneWhen: [
      "HR system credentials received",
      "A real joiner opens a ticket on its own",
      "A real leaver opens a ticket on its own",
    ],
    evidence: WF_EV,
    notEvidence: WF_NOT,
    visibility: "shared",
  },
  {
    id: "fulfilment-groups",
    title: "Confirm fulfilment group and capacity per catalog item",
    kind: "task",
    module: "Service catalog",
    lane: "quick",
    week: 3,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "23 agents, measured",
        "Head-office IT: 9",
        "Store support: 14",
      ],
      source: "Priya, 2026-09-16",
    },
    from: ["team_headcount", "teams_launch"],
    doneWhen: [
      "A fulfilment group on every starter item",
      "Each group lead confirms they have capacity",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "asset-model",
    title: "Agree the asset model",
    kind: "task",
    module: "Asset management",
    lane: "earned",
    week: 3,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "Out of scope: stock in the distribution centres",
        "The rest of the model: not started",
        "Groundwork only: behind the discovery gate",
      ],
      source: TECH_CALL,
    },
    from: ["out_of_scope"],
    doneWhen: [
      "What is tracked, written down",
      "At what depth, written down",
      "What is out of scope, written down",
    ],
    notEvidence: ASSET_NOT,
    visibility: "shared",
  },
  {
    id: "asset-owners",
    title: "Name asset process owners",
    kind: "task",
    module: "Asset management",
    lane: "earned",
    week: 3,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "Needed: owners for purchase, assignment, reclaim and disposal",
        "None named",
      ],
      source: "",
    },
    from: ["config"],
    doneWhen: [
      "An owner named for each of the four steps",
      "Each owner has agreed",
    ],
    notEvidence: ASSET_NOT,
    visibility: "shared",
  },
  {
    id: "change-board",
    title: "Name change-board members and collect real change examples",
    kind: "task",
    module: "Change management",
    lane: "earned",
    week: 3,
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "First real change type: store network work in trading hours",
        "Groundwork only: waits for trustworthy asset data",
      ],
      source: "Priya, technical call, 2026-09-02",
    },
    from: ["request_1"],
    doneWhen: [
      "Change-board members named",
      "A real example each of a standard, normal and emergency change",
    ],
    notEvidence: CHANGE_NOT,
    visibility: "shared",
  },

  // ─── Week 4 ────────────────────────────────────────────────────────────
  {
    id: "catalog-live",
    title: "Catalog items live to both desks",
    kind: "task",
    module: "Service catalog",
    lane: "quick",
    week: 4,
    status: "todo",
    side: "us",
    why: {
      facts: [
        "Needed live by day 30: yes",
        "Why: one queue before the distribution centre opens",
        "Live items meet the ask; they are not yet the evidence",
      ],
      source: "Discovery call, 2026-08-27",
    },
    from: ["day30_required"],
    doneWhen: [
      "Starter items visible to both desks",
      "Both desks have raised real requests through them",
    ],
    evidence: CATALOG_EV,
    notEvidence: CATALOG_NOT,
    visibility: "shared",
  },
  {
    id: "first-approval",
    title: "First real approval, end to end in production",
    kind: "task",
    module: "Service catalog",
    lane: "quick",
    week: 4,
    status: "todo",
    theirs: [],
    side: "customer",
    why: {
      facts: [
        "The one piece of evidence reachable inside 30 days",
        "Needs the real approver, not Priya testing it",
      ],
      source: "",
    },
    from: ["config"],
    doneWhen: [
      "A real request needing approval raised",
      "Approved by its named approver",
      "Fulfilled, all in production",
    ],
    evidence: [CATALOG_EV[1]!],
    notEvidence: CATALOG_NOT,
    visibility: "shared",
  },
  {
    id: "store-comms",
    title: "Tell the stores the front door has changed",
    kind: "task",
    module: "Service catalog",
    lane: "quick",
    week: 4,
    status: "todo",
    theirs: [],
    side: "customer",
    why: {
      facts: [
        "The failure they named: store managers still emailing individuals after go-live",
        "About 240 stores",
      ],
      source: "",
    },
    from: ["failure_definition"],
    doneWhen: [
      "Message sent to every store manager",
      "It names the new way to raise a request",
    ],
    notEvidence: [],
    visibility: "shared",
  },
  {
    id: "day30-review",
    title: "Day 30 review with Priya and Dana",
    kind: "task",
    module: "Timeline",
    lane: "start",
    week: 4,
    status: "todo",
    theirs: ["technical_owner", "exec_sponsor"],
    side: "us",
    why: {
      facts: [
        "Target: 2027-01-12, fixed or preferred UNKNOWN",
        "The meeting where the date is re-agreed against evidence",
      ],
      source: "",
    },
    from: ["target_date", "date_fixed"],
    doneWhen: [
      "Meeting held with Priya and Dana",
      "January date re-agreed and written down",
      "Asset list expectation settled",
    ],
    notEvidence: [],
    visibility: "shared",
  },

  // ─── After day 30 ──────────────────────────────────────────────────────
  {
    id: "catalog-adoption",
    title: "Catalog adoption sustained for two weeks",
    kind: "task",
    module: "Service catalog",
    lane: "earned",
    week: "after",
    status: "todo",
    side: "us",
    why: {
      facts: [
        "Adoption must hold for two consecutive weeks",
        "A behaviour change across 240 stores",
      ],
      source: "",
    },
    from: ["config"],
    doneWhen: [
      "Over half of new requests come through the catalog",
      "True for two weeks in a row",
    ],
    evidence: CATALOG_EV,
    notEvidence: CATALOG_NOT,
    visibility: "shared",
    window: "Earliest mid-November",
  },
  {
    id: "kb-write-path",
    title: "Knowledge base write path holds",
    kind: "task",
    module: "Knowledge base",
    lane: "earned",
    week: "after",
    status: "todo",
    side: "customer",
    why: {
      facts: [
        "6 to 10 weeks from week 2",
        "The tool is ready on day one",
        "The owners and the habit are the work",
      ],
      source: "",
    },
    from: ["config"],
    doneWhen: [
      "Agents wrote articles during ticket work this month",
      "Resolved tickets link to articles",
    ],
    evidence: KB_EV,
    notEvidence: KB_NOT,
    visibility: "shared",
    window: "Mid-November to mid-December; the freeze pushes the back half into January",
  },
  {
    id: "automation-coverage",
    title: "Automation coverage that moves the numbers",
    kind: "task",
    module: "Workflow automation",
    lane: "earned",
    week: "after",
    status: "todo",
    side: "us",
    why: {
      facts: [
        "8 weeks plus from a settled taxonomy",
      ],
      source: "",
    },
    from: ["config"],
    doneWhen: [
      "Share of tickets routed with no human touch, reported",
      "Compared with the handoff baseline",
      "Rules still switched on 30 days after launch",
    ],
    evidence: WF_EV,
    notEvidence: WF_NOT,
    visibility: "shared",
    window: "Early December at the earliest, inside the freeze, so January in practice",
  },
  {
    id: "discovery",
    title: "Discovery scans running on schedule",
    kind: "task",
    module: "Discovery",
    lane: "earned",
    week: "after",
    status: "hold",
    theirs: ["exec_sponsor"],
    side: "customer",
    team: "other",
    holdReason: "The gate: security review, credentials, network access, agent approval, infrastructure owner. All UNKNOWN.",
    why: {
      facts: [
        "8 to 16 weeks from the gate opening",
        "The gate has not opened",
        "The longest pole in most deployments",
      ],
      source: "",
    },
    from: ["config"],
    doneWhen: [
      "Scans run on schedule twice with no manual restart",
      "Device count compared with their expected count",
    ],
    evidence: DISC_EV,
    notEvidence: ASSET_NOT,
    visibility: "shared",
    window: "Early February to late March, if the gate opens by 30 October",
  },
  {
    id: "asset-management",
    title: "Asset management in daily use",
    kind: "task",
    module: "Asset management",
    lane: "earned",
    week: "after",
    status: "hold",
    side: "us",
    holdReason: "Discovery output. Behind the gate.",
    why: {
      facts: [
        "\"Laptop swaps and returns, and who has what\"",
        "About 90 a month, estimate",
        "Built once the discovery gate clears",
      ],
      source: "Priya, technical call, 2026-09-02",
    },
    from: ["request_1"],
    doneWhen: [
      "Agents link assets on real tickets",
      "A spot check of 20 records matches reality",
    ],
    evidence: ASSET_EV,
    notEvidence: ASSET_NOT,
    visibility: "shared",
    window: "Not before February; plausibly after the 2027-03-31 legacy tool expiry",
  },
  {
    id: "change-management",
    title: "Change management in use",
    kind: "task",
    module: "Change management",
    lane: "earned",
    week: "after",
    status: "hold",
    side: "us",
    holdReason: "Trustworthy asset data. Change management before it produces a process nobody believes.",
    why: {
      facts: [
        "Current change process: none formally",
        "8 to 12 weeks, and longer with no process",
        "Waits for trustworthy asset data",
      ],
      source: "",
    },
    from: ["current_process", "change_volume"],
    lead: { min: 8, max: 12 },
    doneWhen: [
      "Changes raised before the work starts",
      "The change board runs from the product's queue",
    ],
    evidence: CHANGE_EV,
    notEvidence: CHANGE_NOT,
    visibility: "shared",
    window: "Not before the go-live. Phase two, ahead of the 2027-03-31 legacy tool expiry",
  },
];

// ─── First value (inferred) ───────────────────────────────────────────────
// The highest-volume request in a module the handoff marks day30_required: yes,
// tied to the stated outcome. A proposal, to confirm at kickoff.
export const firstValue: FirstValue = {
  headline: "Password resets and unlocks flow into one queue",
  points: [
    { label: "Volume", text: "About 380 a month, head office, measured" },
    { label: "Proof", text: "Dana reads the open count without asking" },
    { label: "Why first", text: "Highest volume, needed live by day 30" },
  ],
  basis:
    "Section 6: the highest-volume request in a module needed live by day 30. Tied to success_outcome: one queue for both desks, and one number Dana can read without asking anyone for it.",
};

// ─── Milestone gates (inferred) ───────────────────────────────────────────
// Criteria come from the board and plan. Each ticks when its item is done. A
// gate turns green only when every linked item is done. Target weeks come from
// the plan: the kickoff decisions are week 1; the rest are day-30 checkpoints.
export const gates: Gate[] = [
  {
    id: "kickoff",
    label: "Kickoff done",
    criteria: [
      { text: "Target date fixed or preferred", item: "q-date-fixed" },
      { text: "Starter set or full catalog", item: "catalog-scope" },
      { text: "Spreadsheet or macro decided", item: "c-macro" },
      { text: "Success plan confirmed and shared", item: "success-plan" },
    ],
    linked: ["q-date-fixed", "catalog-scope", "c-macro", "success-plan"],
    by: 1,
  },
  {
    id: "prereqs",
    label: "Prerequisites cleared",
    criteria: [
      { text: "SSO live for both desks", item: "sso" },
      { text: "Test instance ready", item: "test-instance" },
      { text: "Admin named, hours budgeted", item: "admin" },
      { text: "Business hours and agent groups set", item: "agent-groups" },
    ],
    linked: ["sso", "test-instance", "admin", "agent-groups"],
    by: 4,
    lane: "foundation",
  },
  {
    id: "first-value",
    label: "First value live",
    criteria: [
      { text: "Password resets live in catalog", item: "catalog-password" },
      { text: "Real requests from both desks", item: "catalog-live" },
    ],
    linked: ["catalog-password", "catalog-live"],
    by: 4,
  },
  {
    id: "day30",
    label: "Day 30 review",
    criteria: [
      { text: "January date re-agreed on evidence", item: "day30-review" },
      { text: "Asset list expectation settled", item: "day30-review" },
    ],
    linked: ["day30-review"],
    by: 4,
  },
];

// ─── Success plan ─────────────────────────────────────────────────────────
// Only handoff facts: section 5 for the goal and measures, section 10 for the
// baselines. Estimates stay labelled as estimates.
export const successPlan: SuccessPlan = {
  goal: "One queue for both desks, and one number Dana can read without asking anyone for it.",
  goalSource: "success_outcome",
  judge: "exec_sponsor",
  measures: [
    {
      measure: "Open request count, reported monthly to the board",
      baseline: "About 1,400 requests a month, head office. Stores UNKNOWN.",
      basis: "Estimate. Priya, from the spreadsheet tracker, 2026-09-16",
    },
    {
      measure: "Average age of open requests",
      baseline: "No age baseline. Nearest: about 3.5 days to resolve, head office only",
      basis: "Estimate. Priya, 2026-09-16",
    },
    {
      measure: "Dana stops receiving the weekly spreadsheet by email",
      baseline: "Sent weekly today, by a spreadsheet macro",
      basis: "Handoff, keep_existing",
    },
    {
      measure: "Share of requests arriving unstructured (inferred)",
      baseline: "\"Nearly all of it\" arrives unstructured today",
      basis: "Estimate. Priya, discovery call, 2026-08-27",
    },
  ],
};


// ─── People (stakeholder map) ─────────────────────────────────────────────
// Customer-side people and roles from the handoff. Quadrants are inferred.
// Sentiment is unknown unless the handoff states it; it does not for anyone.
export const people: Person[] = [
  {
    id: "dana",
    roleId: "exec_sponsor",
    role: "COO, exec sponsor (unblocks and pays)",
    wiifm: "One queue for both desks, and one number Dana can read without asking anyone for it.",
    engagement: "Once: commercial call, 2026-09-04. No technical call.",
    sentiment: "unknown",
    quadrant: "satisfied",
  },
  {
    id: "priya",
    roleId: "technical_owner",
    role: "IT Operations Manager, technical owner",
    wiifm: "Has read ITIL and wants \"the useful parts\".",
    engagement: "On every call. About 4 hours a week for this.",
    sentiment: "unknown",
    quadrant: "closely",
  },
  {
    id: "tomas",
    roleId: "store_lead",
    role: "Leads store support",
    wiifm: "",
    engagement: "Not on any call yet.",
    sentiment: "unknown",
    quadrant: "satisfied",
  },
  {
    id: "security-contact",
    roleId: "security_contact",
    role: "UNKNOWN in the handoff. Never came up on any call.",
    wiifm: "",
    engagement: "",
    sentiment: "unknown",
    quadrant: "satisfied",
  },
  {
    id: "identity-contact",
    roleId: "identity_contact",
    role: "UNKNOWN in the handoff.",
    wiifm: "",
    engagement: "",
    sentiment: "unknown",
    quadrant: "informed",
  },
  {
    id: "admin",
    roleId: "admin",
    role: "UNKNOWN. Priya expects to name someone from the service desk.",
    wiifm: "",
    engagement: "",
    sentiment: "unknown",
    quadrant: "informed",
  },
];

export const dataset: Dataset = {
  id: "halden",
  label: "Halden Retail Group",
  note: "Illustrative example. Halden Retail Group is fictional.",
  account,
  items,
  roles,
  gates,
  firstValue,
  successPlan,
  people,
  gateGaps,
  driftRules,
  configFieldLabels,
};
