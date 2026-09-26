// The product half of the LangChain demo, shared by every account on it.
// Unofficial demo of a hypothetical engagement. Not affiliated with LangChain.
// LangChain is named as plain text only (no logo, colours or visual identity).
// Built only from config/langchain.md. Every lead time there is an estimate, so
// every drift flag built on it rests on an estimate.

import type { DriftRules } from "../types";

export const product = {
  name: "LangChain",
  url: "https://docs.langchain.com",
};

/** The banner shown under the header wherever the demo is shown. */
export const disclaimer =
  "Unofficial demo of a hypothetical engagement. Not affiliated with LangChain or CoreWeave. Scenario, people, and timelines are fictional estimates.";

/** Module names, as the config names them. */
export const MODULE = {
  access: "Workspace and access",
  observability: "Observability",
  evaluation: "Evaluation",
  deployment: "Deployment",
  monitoring: "Monitoring and alerts",
} as const;

/** "Lead time in weeks" lines from the config (all estimates). */
export const LEAD = {
  access: { min: 1, max: 4 },
  observability: { min: 1, max: 3 },
  evaluation: { min: 2, max: 4 },
  deployment: { min: 4, max: 10 },
  monitoring: { min: 1, max: 2 },
} as const;

// Drift rules, copied from the config (demo defaults, marked estimate there).
export const driftRules: DriftRules = { bufferWeeks: 0, freezePausesWork: true, amberUses: "max", redUses: "min" };

// Section 10 rows the config adds. Used for source tags.
export const configFieldLabels: Record<string, string> = {
  first_time_right: "Share of items handled correctly the first time today",
  labeled_examples: "Past items with a known correct outcome",
  expected_runs: "Agent runs per month expected in production",
};

// Evidence and "Not evidence" lines, quoted from config/langchain.md, unedited.
export const EVIDENCE = {
  access: [
    "Their people sign in through their own identity provider, and nobody shares a login",
    "Workspace roles match the people list, reviewed once by their admin",
    "Someone who leaves loses access through their identity provider, without a ticket to us",
  ],
  observability: [
    "Their engineers open a trace to debug a real failure, without us on the call",
    "Traces from the production agent arrive from their own pipeline, in the project and location the storage decision names",
    "No customer data appears anywhere the storage decision rules out, checked by their security contact",
  ],
  evaluation: [
    "An experiment compared two versions of their agent, and the result changed a decision (a version shipped, or did not)",
    "The dataset holds examples from real tickets, reviewed by a person on their side",
    "Evaluation runs as a step before they release a new version, run by them",
  ],
  deployment: [
    "The agent handles real tickets from their infrastructure, deployed by their team through their own pipeline",
    "They ship a new version of the agent without us",
    "Security sign-off is recorded in writing by their security contact",
  ],
  monitoring: [
    "Their on-call received an alert from the production project and acted on it",
    "Thresholds were set from real traffic and reviewed once since",
    "The dashboard is reviewed in a standing meeting by a named owner",
  ],
};

export const NOT_EVIDENCE = {
  access: ["SSO configured but not tested with a real user", "Invites sent", "An organization created"],
  observability: ["An API key created", "One test trace sent from a notebook", "A screenshot of the trace view"],
  evaluation: ["A dataset created", "An evaluator configured", "One experiment run by us"],
  deployment: ["A deployment created in a sandbox", "An Agent Server running on a laptop", "A demo deployed by the SE"],
  monitoring: ["A dashboard created", "An alert rule saved", "A test notification sent"],
};
