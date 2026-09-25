> **Illustrative example.** Acme Corp is fictional, and so is every person,
> system, date, and number below. Nothing here describes a real customer. This
> handoff was filled by a handoff agent from CRM data and a call recording,
> then reviewed by a person before planning.

# Sales handoff: Acme Corp

| | |
|---|---|
| Filled by (rep) | Handoff agent, from CRM data and a call recording |
| Filled by (SE) | Handoff agent, from CRM data and a call recording |
| Date filled | 2026-09-22 |
| Received by (implementation lead) | Jordan Ellis, CSM. Reviewed the agent's output before planning. |

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
| Customer | customer_name | Acme Corp | CRM |
| Industry (optional) | industry | Healthcare | CRM |
| Products and tiers purchased | products | Service Desk, Asset Management. Tiers UNKNOWN. | CRM |
| Seats / contract size | contract_size | UNKNOWN | |
| Close date | close_date | 2026-09-15 | CRM |
| Contract start date | contract_start | UNKNOWN | |
| Rep | rep | UNKNOWN | |
| SE | se | UNKNOWN | |
| Assigned CSM | csm | UNKNOWN | |

---

## 1. Why they bought (rep)

*The job they are hiring the product to do, in their words. Not the category ("they bought service management"), the job ("consolidate three regional helpdesks into one queue before the new office opens in March").*

| Field | ID | Answer | Source |
|---|---|---|---|
| The job, in their words (quote) | use_case | Replacing a legacy ticketing tool | CRM |
| Problem that made them buy now | why_now | Tickets get lost in email. No visibility into assets. | call, 20 Aug |
| Whole scope, or phase one of something bigger | scope_phase | UNKNOWN | |
| Alternatives they considered | alternatives | UNKNOWN | |
| Tool being replaced, or greenfield | incumbent | A legacy ticketing tool. Name UNKNOWN. Data volume to migrate UNKNOWN. | CRM |
| Why they are leaving it, in their words | why_leaving | UNKNOWN | |

---

## 2. People (rep)

| Role | ID | Name | Title | Email | Have we met them? | Source |
|---|---|---|---|---|---|---|
| Technical owner (does the work) | technical_owner | Priya Shah | IT Director | UNKNOWN | UNKNOWN | agent's read: she is the champion in the CRM and the IT lead, not confirmed as owner |
| Exec sponsor (unblocks and pays) | exec_sponsor | UNKNOWN | | | | |
| Day-to-day admin, if different | admin | UNKNOWN | | | | |
| Security contact | security_contact | UNKNOWN | | | | |
| Identity / IT contact | identity_contact | UNKNOWN | | | | |

| Field | ID | Answer | Source |
|---|---|---|---|
| Hours per week the technical owner has for this | owner_capacity | UNKNOWN | |
| Has the exec sponsor ever been on a call with us? | sponsor_engaged | UNKNOWN | |

---

## 3. Target date and what is driving it (rep)

*If two people gave you different dates, record both with their sources. Do not pick one.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Target go-live date | target_date | UNKNOWN | |
| What is driving it (audit, contract expiry, office opening, fiscal year, board promise) | date_driver | Go-live before the Q1 compliance audit, which they must pass. Exact audit date UNKNOWN. | CRM; call, 20 Aug |
| Fixed or preferred | date_fixed | UNKNOWN | |
| What happens to them if it slips | slip_impact | UNKNOWN | |
| Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) | freeze_periods | UNKNOWN | |

---

## 4. Commitments made during the sales cycle (rep, SE checks)

*Include the soft ones. "Yeah, we can do that" in a demo is a commitment to the person who heard it. The SE fills the last column.*

| Commitment | Made by | Made to | Where it is recorded | Deliverable as stated? |
|---|---|---|---|---|
| SSO setup in week 1 | UNKNOWN | UNKNOWN | call, 20 Aug | UNKNOWN |
| Data migration help from our team | UNKNOWN | UNKNOWN | call, 20 Aug | UNKNOWN |

| Field | ID | Answer | Source |
|---|---|---|---|
| Anything promised on timing specifically | timing_promises | SSO setup in week 1 | call, 20 Aug |
| Anything promised we are not sure we can deliver | risky_promises | UNKNOWN | |

---

## 5. What "good" means to them (rep)

*Their definition, not ours. If nobody asked during the cycle, write `UNKNOWN` and it becomes the first question at kickoff.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Their stated outcome | success_outcome | Cut ticket response time in half. Pass the Q1 compliance audit. | call, 20 Aug |
| How they will know it worked | success_signal | UNKNOWN | |
| Who inside their company judges that | success_judge | UNKNOWN | |
| Number attached, and who reports it upward | success_number | Ticket response time cut in half. Who reports it upward UNKNOWN. | call, 20 Aug |
| What would make them call this a failed rollout | failure_definition | UNKNOWN | |

---

## 6. What they want set up first (SE)

*One block per module purchased, including the ones they seem lukewarm on. Every purchased module gets a first step inside 30 days. Within a module, build order is ranked by volume, so a request with no volume becomes a discovery task.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Service Desk | CRM |
| Must something here be live by day 30? | day30_required | UNKNOWN | |
| Explicitly out of scope for now | out_of_scope | UNKNOWN | |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | UNKNOWN | request_1 | UNKNOWN | | |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Asset Management | CRM |
| Must something here be live by day 30? | day30_required | UNKNOWN | |
| Explicitly out of scope for now | out_of_scope | UNKNOWN | |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | UNKNOWN | request_1 | UNKNOWN | | |

---

## 7. Security and access (SE)

*The most common single cause of a blown activation date. Ask even when they say there are none.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Security review required before deployment | security_review | UNKNOWN | |
| Review status | security_review_status | UNKNOWN | |
| Who owns security sign-off on their side | security_signoff | UNKNOWN | |
| Open items at signature (questionnaire, pen test report, DPA, insurance) | security_open_items | UNKNOWN | |
| Certifications they need from us | certifications | UNKNOWN | |
| Data residency or regional hosting requirements | data_residency | UNKNOWN | |
| Restrictions on installing software or outbound connections | install_restrictions | UNKNOWN | |
| Single sign-on required | sso_required | yes | agent's read: SSO setup was promised for week 1 |
| Identity provider | identity_provider | UNKNOWN | |
| Automated user provisioning (SCIM) required | provisioning_required | UNKNOWN | |

---

## 8. Current stack and integrations (SE)

| Field | ID | Answer | Source |
|---|---|---|---|
| Systems we will need to integrate with | integrations | UNKNOWN | |
| Languages or frameworks we have to work with | frameworks | UNKNOWN | |
| Where their documentation lives today | docs_location | UNKNOWN | |
| Process or method they follow today | current_process | UNKNOWN | |
| Anything already built or automated they expect to keep | keep_existing | UNKNOWN | |
| Who holds the credentials for each system above | credential_holders | UNKNOWN | |

---

## 9. Teams and structure (SE)

*These answers decide how the account is organized: how many workspaces, and whether test and production are separate. Cheap to decide in week one, expensive to unwind in month three.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Teams in scope at launch | teams_launch | UNKNOWN | |
| Teams in scope later, and roughly when | teams_later | UNKNOWN | |
| Number of teams / workspaces | team_count | UNKNOWN | |
| End-user population served | end_users | UNKNOWN | |
| Geographies and time zones | geographies | UNKNOWN | |
| One shared process, or several that genuinely differ | process_shape | UNKNOWN | |
| Separate test and production required | separate_envs | UNKNOWN | |
| Has anyone outside the buying team agreed to this | outside_agreement | UNKNOWN | |

---

## 10. Baseline numbers before we configure anything (SE)

*Blank is fine. Invented is not. A baseline captured after we start configuring is not a baseline. If we cannot get real numbers, record their estimate and label it an estimate.*

| Metric | ID | Current value | Estimate or measured | Source | Date captured |
|---|---|---|---|---|---|
| Ticket or request volume per month | core_volume | UNKNOWN | | | |
| Average time to resolve | core_cycle_time | UNKNOWN | | | |
| Headcount doing the work | team_headcount | UNKNOWN | | | |
| Average time to first response | first_response_time | UNKNOWN | | | |
| Share of requests arriving unstructured (email, chat, tap on the shoulder) | unstructured_share | UNKNOWN | | | |
| Known asset count | asset_count | UNKNOWN | | | |
| Changes per month, and share that are emergency | change_volume | UNKNOWN | | | |
| Existing knowledge articles | kb_articles | UNKNOWN | | | |

---

## Handoff notes (both)

*Anything that does not fit a field: internal politics, a skeptic on their side, a champion new in seat, a competitor still in the building, a renewal date closer than it looks.*

The CRM lists Priya Shah (IT Director) as the champion and Mark Lee (CFO) as the economic buyer. It names no exec sponsor. Whether Mark Lee is also the exec sponsor, or someone else is, has not been asked. Source: CRM.

Tight timeline: go-live must land before the Q1 audit with data migration in scope. Source: agent's read.

---

## Open questions for kickoff

*The planner lists every `UNKNOWN` on the board as a week-one question. List anything else here.*

1. Who is the exec sponsor? The CRM names Mark Lee as economic buyer; ask whether he also sponsors the rollout, without assuming it.
