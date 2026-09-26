# Sales handoff: {Customer}

| | |
|---|---|
| Filled by (rep) | |
| Filled by (SE) | |
| Date filled | |
| Received by (implementation lead) | |

**How to fill this in:** write `UNKNOWN` for anything you do not actually know. Do not guess and do not smooth over a gap. The planner turns every `UNKNOWN` into a week-one task with a name attached, which is useful. It treats a confident wrong answer as fact, which is not.

**Every answer gets a source:** `call, 12 Sep` / `email, 3 Sep` / `CRM` / `rep's read` / `SE's read` / `agent's read`. If it came from a recording or transcript, paste the quote. When an answer is someone's interpretation rather than something the customer said, put the answer in the answer column and give the reason in the source, after a colon: `rep's read: she runs every call` or `agent's read: SSO setup was promised for week 1`.

**Filled by a handoff agent?** It uses this same template, fills every field, and writes `UNKNOWN` where it has no data, and a person must review and edit it before the planner runs.

**Who owns what:** sections 1 to 5 belong to the rep, sections 6 to 10 to the SE. Fill it together on one call, each person speaking to their half.

The ID column is for the app. Don't edit it.

---

## Required before planning

*The planner checks these fields before it builds anything. This table is the only place the list is kept: add or remove a row here to change it. A field is **missing** if it is blank or `UNKNOWN` (`TBD` and `Not found` count as `UNKNOWN`), and **partly missing** if its answer contains `UNKNOWN`. The planner still builds the plan, and opens it with a "Handoff incomplete" panel that names each gap and who fills it.*

| Required field | ID | Filled by |
|---|---|---|
| Technical owner (does the work) | technical_owner | rep |
| Target go-live date | target_date | rep |
| The job, in their words (the production use case) | use_case | rep |
| Core volume per month | core_volume | SE |
| Time the core job takes today | core_cycle_time | SE |
| Headcount doing the work | team_headcount | SE |

---

## Account basics (CRM)

| Field | ID | Answer | Source |
|---|---|---|---|
| Customer | customer_name | | |
| Industry (optional) | industry | | |
| Products and tiers purchased | products | | |
| Seats / contract size | contract_size | | |
| Close date | close_date | | |
| Contract start date | contract_start | | |
| Rep | rep | | |
| SE | se | | |
| Assigned CSM | csm | | |

---

## 1. Why they bought (rep)

*The job they are hiring the product to do, in their words. Not the category ("they bought service management"), the job ("consolidate three regional helpdesks into one queue before the new office opens in March").*

| Field | ID | Answer | Source |
|---|---|---|---|
| The job, in their words (quote) | use_case | | |
| Problem that made them buy now | why_now | | |
| Whole scope, or phase one of something bigger | scope_phase | | |
| Alternatives they considered | alternatives | | |
| Tool being replaced, or greenfield | incumbent | | |
| Why they are leaving it, in their words | why_leaving | | |

---

## 2. People (rep)

| Role | ID | Name | Title | Email | Have we met them? | Source |
|---|---|---|---|---|---|---|
| Technical owner (does the work) | technical_owner | | | | | |
| Exec sponsor (unblocks and pays) | exec_sponsor | | | | | |
| Day-to-day admin, if different | admin | | | | | |
| Security contact | security_contact | | | | | |
| Identity / IT contact | identity_contact | | | | | |

| Field | ID | Answer | Source |
|---|---|---|---|
| Hours per week the technical owner has for this | owner_capacity | | |
| Has the exec sponsor ever been on a call with us? | sponsor_engaged | yes / no / UNKNOWN | |

---

## 3. Target date and what is driving it (rep)

*If two people gave you different dates, record both with their sources. Do not pick one.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Target go-live date | target_date | | |
| What is driving it (audit, contract expiry, office opening, fiscal year, board promise) | date_driver | | |
| Fixed or preferred | date_fixed | fixed / preferred / UNKNOWN | |
| What happens to them if it slips | slip_impact | | |
| Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) | freeze_periods | | |

---

## 4. Commitments made during the sales cycle (rep, SE checks)

*Include the soft ones. "Yeah, we can do that" in a demo is a commitment to the person who heard it. The SE fills the last column.*

| Commitment | Made by | Made to | Where it is recorded | Deliverable as stated? |
|---|---|---|---|---|
| | | | | yes / no / UNKNOWN |
| | | | | yes / no / UNKNOWN |

| Field | ID | Answer | Source |
|---|---|---|---|
| Anything promised on timing specifically | timing_promises | | |
| Anything promised we are not sure we can deliver | risky_promises | | |

---

## 5. What "good" means to them (rep)

*Their definition, not ours. If nobody asked during the cycle, write `UNKNOWN` and it becomes the first question at kickoff.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Their stated outcome | success_outcome | | |
| How they will know it worked | success_signal | | |
| Who inside their company judges that | success_judge | | |
| Number attached, and who reports it upward | success_number | | |
| What would make them call this a failed rollout | failure_definition | | |

---

## 6. What they want set up first (SE)

*One block per module purchased, including the ones they seem lukewarm on. Every purchased module gets a first step inside 30 days. Within a module, build order is ranked by volume, so a request with no volume becomes a discovery task.*

**Copy this block for each module.**

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | | |
| Must something here be live by day 30? | day30_required | yes / no / UNKNOWN | |
| Explicitly out of scope for now | out_of_scope | | |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | | request_1 | | | |
| 2 | | request_2 | | | |
| 3 | | request_3 | | | |

---

## 7. Security and access (SE)

*The most common single cause of a blown activation date. Ask even when they say there are none.*

*`approval_lead_time` is optional. Write it as weeks, like `3 to 4` or `2`, or leave it blank. The planner adds it to the lead time of every item the product config says needs their approval.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Security review required before deployment | security_review | yes / no / UNKNOWN | |
| Review status | security_review_status | not started / submitted / approved / UNKNOWN | |
| Who owns security sign-off on their side | security_signoff | | |
| Open items at signature (questionnaire, pen test report, DPA, insurance) | security_open_items | | |
| About how many weeks do their security or IT approvals take? (min to max) | approval_lead_time | | |
| Certifications they need from us | certifications | | |
| Data residency or regional hosting requirements | data_residency | | |
| Restrictions on installing software or outbound connections | install_restrictions | | |
| Single sign-on required | sso_required | yes / no / UNKNOWN | |
| Identity provider | identity_provider | | |
| Automated user provisioning (SCIM) required | provisioning_required | yes / no / UNKNOWN | |

---

## 8. Current stack and integrations (SE)

| Field | ID | Answer | Source |
|---|---|---|---|
| Systems we will need to integrate with | integrations | | |
| Languages or frameworks we have to work with | frameworks | | |
| Where their documentation lives today | docs_location | | |
| Process or method they follow today | current_process | | |
| Anything already built or automated they expect to keep | keep_existing | | |
| Who holds the credentials for each system above | credential_holders | | |

---

## 9. Teams and structure (SE)

*These answers decide how the account is organized: how many workspaces, and whether test and production are separate. Cheap to decide in week one, expensive to unwind in month three.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Teams in scope at launch | teams_launch | | |
| Teams in scope later, and roughly when | teams_later | | |
| Number of teams / workspaces | team_count | | |
| End-user population served | end_users | | |
| Geographies and time zones | geographies | | |
| One shared process, or several that genuinely differ | process_shape | shared / different / UNKNOWN | |
| Separate test and production required | separate_envs | yes / no / UNKNOWN | |
| Has anyone outside the buying team agreed to this | outside_agreement | yes / no / UNKNOWN | |

---

## 10. Baseline numbers before we configure anything (SE)

*Blank is fine. Invented is not. A baseline captured after we start configuring is not a baseline. If we cannot get real numbers, record their estimate and label it an estimate.*

| Metric | ID | Current value | Estimate or measured | Source | Date captured |
|---|---|---|---|---|---|
| Core volume per month (whatever the product counts) | core_volume | | | | |
| Time the core job takes today | core_cycle_time | | | | |
| Headcount doing the work | team_headcount | | | | |
| {product-specific rows from the config} | | | | | |

---

## Handoff notes (both)

*Anything that does not fit a field: internal politics, a skeptic on their side, a champion new in seat, a competitor still in the building, a renewal date closer than it looks.*

---

## Open questions for kickoff

*The planner lists every `UNKNOWN` on the board as a week-one question. List anything else here.*

1.
2.
