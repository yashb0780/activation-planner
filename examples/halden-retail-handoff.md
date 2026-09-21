> **Illustrative example.** Halden Retail Group is fictional, and so is every
> person, system, date, and number below. Nothing here describes a real
> customer.

# Sales handoff: Halden Retail Group

| | |
|---|---|
| Filled by (rep) | D. Osei |
| Filled by (SE) | K. Varga |
| Date filled | 2026-09-16 |
| Received by (implementation lead) | M. Lindqvist |

**How to fill this in:** write `UNKNOWN` for anything you do not actually know. Do not guess and do not smooth over a gap. The planner turns every `UNKNOWN` into a week-one task with a name attached, which is useful. It treats a confident wrong answer as fact, which is not.

**Every answer gets a source:** `call, 12 Sep` / `email, 3 Sep` / `CRM` / `rep's read` / `SE's read`. If it came from a recording or transcript, paste the quote.

**Who owns what:** sections 1 to 5 belong to the rep, sections 6 to 10 to the SE. Fill it together on one call, each person speaking to their half.

The ID column is for the app. Don't edit it.

---

## Account basics (CRM)

| Field | ID | Answer | Source |
|---|---|---|---|
| Customer | customer_name | Halden Retail Group | |
| Products and tiers purchased | products | ITSM, enterprise tier — request portal and service catalog, knowledge base, workflow automation, asset management with discovery, change management | |
| Seats / contract size | contract_size | 45 agent seats | |
| Close date | close_date | 2026-09-11 | |
| Contract start date | contract_start | 2026-10-01 | |
| Rep | rep | D. Osei | |
| SE | se | K. Varga | CRM |
| Assigned CSM | csm | M. Lindqvist | |

---

## 1. Why they bought (rep)

*The job they are hiring the product to do, in their words. Not the category ("they bought service management"), the job ("consolidate three regional helpdesks into one queue before the new office opens in March").*

| Field | ID | Answer | Source |
|---|---|---|---|
| The job, in their words (quote) | use_case | "We are merging the store-support desk and the head-office IT desk into one queue before the new distribution centre opens in March. Right now a store manager emails whoever they last spoke to, and nobody can tell me how many open requests we have." | Discovery call, 2026-08-27, recorded |
| Problem that made them buy now | why_now | Dana asked for the open-request count at the July board meeting, and nobody could produce one for store support. | Commercial call, 2026-09-04 |
| Whole scope, or phase one of something bigger | scope_phase | Phase one. Facilities and HR have asked to come onto the same platform during 2027. Not scoped, not priced. | |
| Alternatives they considered | alternatives | UNKNOWN | |
| Tool being replaced, or greenfield | incumbent | Head office runs a shared mailbox plus a spreadsheet tracker. Stores use a separate legacy service desk tool whose contract expires 2027-03-31. | |
| Why they are leaving it, in their words | why_leaving | "Nobody can tell me how many open requests we have." | |

---

## 2. People (rep)

| Role | ID | Name | Title | Email | Have we met them? |
|---|---|---|---|---|---|
| Technical owner (does the work) | technical_owner | Priya Raman | IT Operations Manager | p.raman@example.com | Yes, on every call |
| Exec sponsor (unblocks and pays) | exec_sponsor | Dana Whitfield | COO | d.whitfield@example.com | Once, commercial call 2026-09-04 |
| Day-to-day admin, if different | admin | UNKNOWN | | | Priya expects to name someone from the service desk |
| Security contact | security_contact | UNKNOWN | | | Never came up on any call |
| Identity / IT contact | identity_contact | UNKNOWN | | | |

| Field | ID | Answer | Source |
|---|---|---|---|
| Hours per week the technical owner has for this | owner_capacity | About 4 hours a week, Priya's own estimate. She runs the head-office desk day to day and has no backfill. | Technical call, 2026-09-02 |
| Has the exec sponsor ever been on a call with us? | sponsor_engaged | yes. Once, 2026-09-04, commercial terms only. Not on any technical call. | |

---

## 3. Target date and what is driving it (rep)

*If two people gave you different dates, record both with their sources. Do not pick one.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Target go-live date | target_date | 2027-01-12 | |
| What is driving it (audit, contract expiry, office opening, fiscal year, board promise) | date_driver | The distribution centre opens in March 2027. Dana told the board in July that the merged desk would be running before it opens. | |
| Fixed or preferred | date_fixed | UNKNOWN. Dana describes it as fixed. Priya, on a later call, described the same date as "what we are aiming for". They have not said this to each other in front of us. | |
| What happens to them if it slips | slip_impact | The distribution centre opens onto two separate desks, and store managers keep emailing individuals. | |
| Known freeze periods (quarter end, holiday change freeze) | freeze_periods | No IT changes between 1 December and 6 January. Retail peak trading. | Priya, stated firmly |

---

## 4. Commitments made during the sales cycle (rep, SE checks)

*Include the soft ones. "Yeah, we can do that" in a demo is a commitment to the person who heard it. The SE fills the last column.*

| Commitment | Made by | Made to | Where it is recorded | Deliverable as stated? |
|---|---|---|---|---|
| "Discovery will give you an accurate asset list in the first month" | D. Osei | Priya Raman | Demo call 2026-08-27, recorded | UNKNOWN |
| "You will be live before the distribution centre opens" | D. Osei | Dana Whitfield | Commercial call 2026-09-04 | UNKNOWN. Depends on the December freeze. |
| "We can import your wiki" | Solution engineer | Priya Raman | Demo call 2026-08-27 | yes, mechanically |

| Field | ID | Answer | Source |
|---|---|---|---|
| Anything promised on timing specifically | timing_promises | Go-live before the distribution centre opens, said to the exec sponsor. | |
| Anything promised we are not sure we can deliver | risky_promises | The first-month asset list. It was said in a demo and nobody corrected it. | |

---

## 5. What "good" means to them (rep)

*Their definition, not ours. If nobody asked during the cycle, write `UNKNOWN` and it becomes the first question at kickoff.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Their stated outcome | success_outcome | One queue for both desks, and one number Dana can read without asking anyone for it. | |
| How they will know it worked | success_signal | Dana stops receiving the weekly spreadsheet by email. | |
| Who inside their company judges that | success_judge | Dana Whitfield | |
| Number attached, and who reports it upward | success_number | Open request count and average age, reported monthly to the board by Dana. | |
| What would make them call this a failed rollout | failure_definition | Store managers still emailing individuals after go-live. | |

---

## 6. What they want set up first (SE)

*One block per module purchased, including the ones they seem lukewarm on. Every purchased module gets a first step inside 30 days. Within a module, build order is ranked by volume, so a request with no volume becomes a discovery task.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Request portal and service catalog | |
| Must something here be live by day 30? | day30_required | yes. One queue before the distribution centre opens. | Discovery call, 2026-08-27 |
| Explicitly out of scope for now | out_of_scope | Facilities and HR request types (2027) | Discovery call, 2026-08-27 |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Password resets and account unlocks" | request_1 | ~380, head office | Measured | Spreadsheet tracker export, 2026-09-10 |
| 2 | "New starter setup: laptop, accounts, the lot" | request_2 | ~40 | Estimate | Priya, discovery call, 2026-08-27 |
| 3 | "Till and printer faults in the stores" | request_3 | UNKNOWN |  | Priya, technical call, 2026-09-02 |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Knowledge base | |
| Must something here be live by day 30? | day30_required | no | Technical call, 2026-09-02 |
| Explicitly out of scope for now | out_of_scope | Anything customer-facing | Technical call, 2026-09-02 |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Answers to the questions we get every week, so the desk stops retyping them" | request_1 | ~250 | Estimate | Priya, technical call, 2026-09-02 |
| 2 | "Get the store sheets off the back-room wall and onto a screen" | request_2 | UNKNOWN |  | Priya, technical call, 2026-09-02 |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Workflow automation | |
| Must something here be live by day 30? | day30_required | UNKNOWN |  |
| Explicitly out of scope for now | out_of_scope | UNKNOWN |  |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Store tickets go to the store desk and ours come to us, without anyone sorting them" | request_1 | ~1,400, head office | Estimate | Priya, from the spreadsheet tracker, 2026-09-16 |
| 2 | "Joiners and leavers from HR open their own tickets" | request_2 | 70 | Measured | HR system report shared by Priya, 2026-09-10 |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Asset management with discovery | |
| Must something here be live by day 30? | day30_required | yes. Expects the asset list promised in the demo. | Technical call, 2026-09-02 |
| Explicitly out of scope for now | out_of_scope | Stock in the distribution centres | Technical call, 2026-09-02 |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Laptop swaps and returns, and who has what" | request_1 | ~90 | Estimate | Priya, technical call, 2026-09-02 |
| 2 | "Find out what is actually on the store networks" | request_2 | UNKNOWN |  | Priya, technical call, 2026-09-02 |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Change management | |
| Must something here be live by day 30? | day30_required | no | Technical call, 2026-09-02 |
| Explicitly out of scope for now | out_of_scope | UNKNOWN |  |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Sign-off before anyone touches a store network during trading hours" | request_1 | UNKNOWN |  | Priya, technical call, 2026-09-02 |
| 2 | "The December freeze written down somewhere other than my head" | request_2 | UNKNOWN |  | Priya, technical call, 2026-09-02 |

---

## 7. Security and access (SE)

*The most common single cause of a blown activation date. Ask even when they say there are none.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Security review required before deployment | security_review | UNKNOWN | |
| Review status | security_review_status | not started | Technical call, 2026-09-02 |
| Who owns security sign-off on their side | security_signoff | UNKNOWN | |
| Open items at signature (questionnaire, pen test report, DPA, insurance) | security_open_items | DPA signed at contract. Nothing else was raised. | |
| Certifications they need from us | certifications | Priya asked what we hold on the technical call. Nothing has been formally requested. | |
| Data residency or regional hosting requirements | data_residency | UNKNOWN | |
| Restrictions on installing software or outbound connections | install_restrictions | UNKNOWN | |
| Single sign-on required | sso_required | yes. Priya wants every agent signing in through their identity provider from day one. | Technical call, 2026-09-02 |
| Identity provider | identity_provider | A cloud directory with SSO available. | |
| Automated user provisioning (SCIM) required | provisioning_required | UNKNOWN. Whether their licence tier includes automated user provisioning is also UNKNOWN. | |

---

## 8. Current stack and integrations (SE)

| Field | ID | Answer | Source |
|---|---|---|---|
| Systems we will need to integrate with | integrations | The HR system for joiners and leavers, their endpoint management tool, and the legacy store desk tool during any parallel running. | |
| Languages or frameworks we have to work with | frameworks | UNKNOWN | |
| Where their documentation lives today | docs_location | A head-office wiki, roughly 200 pages. Stores keep printed sheets behind the counter. Last review date of the wiki is UNKNOWN. | |
| Process or method they follow today | current_process | None formally. Priya has read ITIL and wants "the useful parts". | |
| Anything already built or automated they expect to keep | keep_existing | A spreadsheet macro that produces the weekly open-request count Dana receives by email. Priya expects it to keep running. | |
| Who holds the credentials for each system above | credential_holders | UNKNOWN for all of them except the wiki, which Priya administers. | |

---

## 9. Teams and structure (SE)

*These answers decide how the account is organized: how many workspaces, and whether test and production are separate. Cheap to decide in week one, expensive to unwind in month three.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Teams in scope at launch | teams_launch | Head-office IT desk (9 agents), store support desk (14 agents) | |
| Teams in scope later, and roughly when | teams_later | Facilities and HR, during 2027. Not scoped. | |
| Number of teams / workspaces | team_count | 2 teams at launch (head-office IT, store support). One workspace or two is not decided. | Technical call, 2026-09-02 |
| End-user population served | end_users | Roughly 3,200 staff across head office, 240 stores, and 2 distribution centres | |
| Geographies and time zones | geographies | Single country, one time zone. Stores trade seven days a week. | |
| One shared process, or several that genuinely differ | process_shape | shared. Stated as one. Worth noting the two desks describe their work differently on every call — store support is phone-first and same-shift, head office is ticket-first and next-day. | |
| Separate test and production required | separate_envs | yes. Priya wants to test anything before it reaches stores, especially near the December freeze. | Technical call, 2026-09-02 |
| Has anyone outside the buying team agreed to this | outside_agreement | UNKNOWN. Tomas Berg leads store support and has not been on a call. His desk carries the larger volume. | |

---

## 10. Baseline numbers before we configure anything (SE)

*Blank is fine. Invented is not. A baseline captured after we start configuring is not a baseline. If we cannot get real numbers, record their estimate and label it an estimate.*

| Metric | ID | Current value | Estimate or measured | Source | Date captured |
|---|---|---|---|---|---|
| Ticket or request volume per month | core_volume | ~1,400 head office. Stores UNKNOWN. | Estimate | Priya, from the spreadsheet tracker | 2026-09-16 |
| Average time to resolve | core_cycle_time | ~3.5 days, head office only | Estimate | Priya | 2026-09-16 |
| Headcount doing the work | team_headcount | 23 agents across both desks | Measured | Priya | 2026-09-16 |
| Average time to first response | first_response_time | UNKNOWN | | | |
| Share of requests arriving unstructured (email, chat, tap on the shoulder) | unstructured_share | "Nearly all of it" | Estimate | Priya, discovery call | 2026-08-27 |
| Known asset count | asset_count | ~4,100 expected | Estimate | Finance fixed-asset register, not an IT source | 2026-09-16 |
| Changes per month, and share that are emergency | change_volume | UNKNOWN. No change process exists today. | | | |
| Existing knowledge articles | kb_articles | ~200 wiki pages. How many are current is UNKNOWN. | Measured (page count only) | Wiki export | 2026-09-16 |

---

## Handoff notes (both)

*Anything that does not fit a field: internal politics, a skeptic on their side, a champion new in seat, a competitor still in the building, a renewal date closer than it looks.*

Priya is five months into the role and inherited the spreadsheet tracker from someone who left. She is credible and engaged, and she is also the only person on their side who has done anything on this so far.

Dana is the only person who has said the go-live date out loud to anyone outside IT, and said it to the board.

Tomas Berg has not been in a single call. His desk has the larger volume and the more different way of working, and store support is where the "still emailing individuals" failure would show up first.

The legacy store desk tool expires 2027-03-31. That is a harder date than the stated go-live and nobody has treated it as one.

---

## Open questions for kickoff

*The planner lists every `UNKNOWN` on the board as a week-one question. List anything else here.*

1. Who owns security sign-off, and does a review process exist at all?
2. Who can provide discovery credentials for the store and distribution centre networks?
3. Is 2027-01-12 fixed or preferred, and which of Dana and Priya decides?
