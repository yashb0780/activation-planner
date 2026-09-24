// Field names from templates/handoff.md, keyed by field ID. Used for source tags
// ("From: ..."). If you rename or add a field in the template, update it here in
// the same change. Product-specific rows (from a config) are passed in separately.

export const HANDOFF_FIELDS: Record<string, string> = {
  customer_name: "Customer",
  products: "Products and tiers purchased",
  contract_size: "Seats / contract size",
  close_date: "Close date",
  contract_start: "Contract start date",
  rep: "Rep",
  se: "SE",
  csm: "Assigned CSM",
  use_case: "The job, in their words (quote)",
  why_now: "Problem that made them buy now",
  scope_phase: "Whole scope, or phase one of something bigger",
  alternatives: "Alternatives they considered",
  incumbent: "Tool being replaced, or greenfield",
  why_leaving: "Why they are leaving it, in their words",
  technical_owner: "Technical owner (does the work)",
  exec_sponsor: "Exec sponsor (unblocks and pays)",
  admin: "Day-to-day admin, if different",
  security_contact: "Security contact",
  identity_contact: "Identity / IT contact",
  owner_capacity: "Hours per week the technical owner has for this",
  sponsor_engaged: "Has the exec sponsor ever been on a call with us?",
  target_date: "Target go-live date",
  date_driver: "What is driving it (audit, contract expiry, office opening, fiscal year, board promise)",
  date_fixed: "Fixed or preferred",
  slip_impact: "What happens to them if it slips",
  freeze_periods: "Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze)",
  timing_promises: "Anything promised on timing specifically",
  risky_promises: "Anything promised we are not sure we can deliver",
  success_outcome: "Their stated outcome",
  success_signal: "How they will know it worked",
  success_judge: "Who inside their company judges that",
  success_number: "Number attached, and who reports it upward",
  failure_definition: "What would make them call this a failed rollout",
  day30_required: "Must something here be live by day 30?",
  out_of_scope: "Explicitly out of scope for now",
  security_review: "Security review required before deployment",
  security_review_status: "Review status",
  security_signoff: "Who owns security sign-off on their side",
  security_open_items: "Open items at signature (questionnaire, pen test report, DPA, insurance)",
  certifications: "Certifications they need from us",
  data_residency: "Data residency or regional hosting requirements",
  install_restrictions: "Restrictions on installing software or outbound connections",
  sso_required: "Single sign-on required",
  identity_provider: "Identity provider",
  provisioning_required: "Automated user provisioning (SCIM) required",
  integrations: "Systems we will need to integrate with",
  frameworks: "Languages or frameworks we have to work with",
  docs_location: "Where their documentation lives today",
  current_process: "Process or method they follow today",
  keep_existing: "Anything already built or automated they expect to keep",
  credential_holders: "Who holds the credentials for each system above",
  teams_launch: "Teams in scope at launch",
  teams_later: "Teams in scope later, and roughly when",
  team_count: "Number of teams / workspaces",
  end_users: "End-user population served",
  geographies: "Geographies and time zones",
  process_shape: "One shared process, or several that genuinely differ",
  separate_envs: "Separate test and production required",
  outside_agreement: "Has anyone outside the buying team agreed to this",
  core_volume: "Core volume per month (whatever the product counts)",
  core_cycle_time: "Time the core job takes today",
  team_headcount: "Headcount doing the work",
};

/** Source IDs that are not a single field row. */
const SPECIAL: Record<string, string> = {
  config: "product config",
  commitments: "Commitments made during the sales cycle",
  notes: "Handoff notes",
  section_6: "What they want set up first",
};

/** One source ID as its handoff field name. */
export function fieldLabel(id: string, module: string, extra: Record<string, string> = {}): string {
  // "request_2" is a section 6 request in this item's module; "request_2@knowledge base"
  // names the module, for a grouped question that spans several.
  const req = /^request_(\d+)(?:@(.+))?$/.exec(id);
  if (req) return `What they want set up first — ${req[2] ?? module.toLowerCase()}, request ${req[1]}`;
  return extra[id] ?? HANDOFF_FIELDS[id] ?? SPECIAL[id] ?? id;
}

/** "From: ..." text for an item. Handoff fields first, "product config" last. */
export function sourceTag(from: string[], module: string, extra: Record<string, string> = {}): string {
  const label = (id: string) => fieldLabel(id, module, extra);
  const ordered = [...from.filter((f) => f !== "config"), ...from.filter((f) => f === "config")];
  return `From: ${ordered.map(label).join(" · ")}`;
}
