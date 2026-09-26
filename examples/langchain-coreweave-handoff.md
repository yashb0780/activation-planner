> **Unofficial demo of a hypothetical engagement. Not affiliated with LangChain or CoreWeave.** Scenario, people, and timelines are fictional estimates. Every person named below is made up. Product facts come from `config/langchain.md`, where every lead time is an estimate.

# Sales handoff: CoreWeave

| | |
|---|---|
| Filled by (rep) | M. Osei |
| Filled by (SE) | K. Lindqvist |
| Date filled | 2026-09-09 |
| Received by (implementation lead) | S. Adeyemi, activation specialist |

**How to fill this in:** write `UNKNOWN` for anything you do not actually know. Do not guess and do not smooth over a gap. The planner turns every `UNKNOWN` into a week-one task with a name attached, which is useful. It treats a confident wrong answer as fact, which is not.

**Every answer gets a source:** `call, 12 Sep` / `email, 3 Sep` / `CRM` / `rep's read` / `SE's read` / `agent's read`. If it came from a recording or transcript, paste the quote. When an answer is someone's interpretation rather than something the customer said, put the answer in the answer column and give the reason in the source, after a colon: `rep's read: she runs every call` or `agent's read: SSO setup was promised for week 1`.

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
| Customer | customer_name | CoreWeave | CRM |
| Industry (optional) | industry | AI cloud infrastructure | CRM |
| Products and tiers purchased | products | LangSmith, Enterprise plan: Observability, Evaluation, Monitoring and alerts, and LangSmith Deployment. Deployment option (Hybrid or Self-hosted) not decided. | Order form |
| Seats / contract size | contract_size | 30 seats, 12 months | Order form |
| Close date | close_date | 2026-09-04 | CRM |
| Contract start date | contract_start | 2026-09-14 | Order form |
| Rep | rep | M. Osei | CRM |
| SE | se | K. Lindqvist | CRM |
| Assigned CSM | csm | S. Adeyemi | CRM |

---

## 1. Why they bought (rep)

*The job they are hiring the product to do, in their words. Not the category ("they bought service management"), the job ("consolidate three regional helpdesks into one queue before the new office opens in March").*

| Field | ID | Answer | Source |
|---|---|---|---|
| The job, in their words (quote) | use_case | "Every new support ticket gets read, tagged and routed to the right queue by our triage agent, and no ticket data ever leaves our environment." | Call recording, discovery call, 2026-08-26 |
| Problem that made them buy now | why_now | Ticket volume grew faster than the support engineering team. Engineers triage by hand on a weekly rotation, and misrouted tickets bounce between queues. | Call recording, discovery call, 2026-08-26 |
| Whole scope, or phase one of something bigger | scope_phase | Phase one: triage only. Drafting replies to customers is planned for 2027. Not scoped. | Call recording, commercial call, 2026-09-03 |
| Alternatives they considered | alternatives | Building their own logging for the agent with in-house tools. | |
| Tool being replaced, or greenfield | incumbent | Greenfield for tracing and evaluation. The triage agent is a LangGraph prototype running on one engineer's dev setup, with logs in their own logging stack. | Call recording, technical call, 2026-09-01 |
| Why they are leaving it, in their words | why_leaving | "When the agent sends a ticket to the wrong queue, nobody can tell us why." | Call recording, technical call, 2026-09-01 |

---

## 2. People (rep)

| Role | ID | Name | Title | Email | Have we met them? | Source |
|---|---|---|---|---|---|---|
| Technical owner (does the work) | technical_owner | Tomás Varga | Staff Engineer, Support Engineering | t.varga@example.com | Yes, on every call | CRM |
| Exec sponsor (unblocks and pays) | exec_sponsor | UNKNOWN | | | No | |
| Day-to-day admin, if different | admin | Tomás Varga | | | Yes | CRM |
| Security contact | security_contact | Lena Hartmann | Security Engineering Manager | l.hartmann@example.com | Once, commercial call | CRM |
| Identity / IT contact | identity_contact | Owen Achebe | IT Identity Lead | o.achebe@example.com | No. Named by Tomás, never on a call. | CSM |

| Field | ID | Answer | Source |
|---|---|---|---|
| Hours per week the technical owner has for this | owner_capacity | About 8 hours a week, his own estimate. He also runs the triage rotation. | Call recording, technical call, 2026-09-01 |
| Has the exec sponsor ever been on a call with us? | sponsor_engaged | UNKNOWN | |

---

## 3. Target date and what is driving it (rep)

*If two people gave you different dates, record both with their sources. Do not pick one.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Target go-live date | target_date | 2026-11-16 | Tomás, call recording, commercial call, 2026-09-03 |
| What is driving it (audit, contract expiry, office opening, fiscal year, board promise) | date_driver | Their support team takes on a new customer tier on 2026-12-01 and wants triage automated before the extra volume arrives. | Tomás, call recording, commercial call, 2026-09-03 |
| Fixed or preferred | date_fixed | preferred | |
| What happens to them if it slips | slip_impact | The rotation engineers keep triaging by hand through the new tier's first month. | rep's read: Tomás described the rotation as already stretched |
| Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) | freeze_periods | 2026-10-26 to 2026-10-30. Platform change freeze, no production changes. | Call recording, technical call, 2026-09-01 |

---

## 4. Commitments made during the sales cycle (rep, SE checks)

*Include the soft ones. "Yeah, we can do that" in a demo is a commitment to the person who heard it. The SE fills the last column.*

| Commitment | Made by | Made to | Where it is recorded | Deliverable as stated? |
|---|---|---|---|---|
| "SSO will be live in week 1" | M. Osei | Tomás Varga | Call recording, commercial call, 2026-09-03 | UNKNOWN. Depends on their identity team, who were not on any call. |
| "We'll help you choose between Hybrid and Self-hosted" | K. Lindqvist | Lena Hartmann | Call recording, commercial call, 2026-09-03 | yes |

| Field | ID | Answer | Source |
|---|---|---|---|
| Anything promised on timing specifically | timing_promises | SSO in week 1 (above). | Call recording, commercial call, 2026-09-03 |
| Anything promised we are not sure we can deliver | risky_promises | SSO in week 1, because nobody has asked their identity team how long adding an app takes. | SE's read |

---

## 5. What "good" means to them (rep)

*Their definition, not ours. If nobody asked during the cycle, write `UNKNOWN` and it becomes the first question at kickoff.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Their stated outcome | success_outcome | Every new ticket is triaged by the agent within 5 minutes, and fewer tickets are misrouted than today. | Tomás, call recording, commercial call, 2026-09-03 |
| How they will know it worked | success_signal | The share of tickets moved to a second queue falls below today's. | Tomás, call recording, technical call, 2026-09-01 |
| Who inside their company judges that | success_judge | UNKNOWN. Tomás thinks it is the head of support, who has not been on a call. | |
| Number attached, and who reports it upward | success_number | Misrouted ticket share, reported monthly. Who reports it: UNKNOWN. | |
| What would make them call this a failed rollout | failure_definition | Ticket data found outside their environment, or support engineers stop trusting the agent's tags. | Lena, call recording, commercial call, 2026-09-03 |

---

## 6. What they want set up first (SE)

*One block per module purchased, including the ones they seem lukewarm on. Every purchased module gets a first step inside 30 days. Within a module, build order is ranked by volume, so a request with no volume becomes a discovery task.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Workspace and access | |
| Must something here be live by day 30? | day30_required | yes. SSO for the support engineering team. | Call recording, commercial call, 2026-09-03 |
| Explicitly out of scope for now | out_of_scope | Access for teams outside support engineering | |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Everyone signs in with our SSO" | request_1 | ~25 users | Estimate | Tomás, call recording, technical call, 2026-09-01 |
| 2 | "Keep dev and production apart" | request_2 | | | Tomás, call recording, technical call, 2026-09-01 |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Observability | |
| Must something here be live by day 30? | day30_required | yes. Traces of the agent on test tickets. | Call recording, technical call, 2026-09-01 |
| Explicitly out of scope for now | out_of_scope | Tracing their other internal agents | |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "See every step the agent took on a ticket" | request_1 | ~18,000 tickets | Measured | Ticketing system export, shared by Tomás |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Deployment | |
| Must something here be live by day 30? | day30_required | UNKNOWN. Tomás wants it; Lena says not before her review. | Call recording, commercial call, 2026-09-03 |
| Explicitly out of scope for now | out_of_scope | Cloud deployment. The agent must run in their environment. | Lena, call recording, commercial call, 2026-09-03 |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Run the triage agent on our own cluster" | request_1 | ~18,000 tickets | Measured | Ticketing system export, shared by Tomás |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Evaluation | |
| Must something here be live by day 30? | day30_required | no | Call recording, technical call, 2026-09-01 |
| Explicitly out of scope for now | out_of_scope | UNKNOWN | |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Know before we ship if a prompt change makes routing worse" | request_1 | UNKNOWN | | Tomás, call recording, technical call, 2026-09-01 |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Monitoring and alerts | |
| Must something here be live by day 30? | day30_required | no | |
| Explicitly out of scope for now | out_of_scope | UNKNOWN | |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Page us if the agent stops triaging" | request_1 | UNKNOWN | | Tomás, call recording, technical call, 2026-09-01 |

---

## 7. Security and access (SE)

*The most common single cause of a blown activation date. Ask even when they say there are none.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Security review required before deployment | security_review | yes | Lena, call recording, commercial call, 2026-09-03 |
| Review status | security_review_status | not started | CSM |
| Who owns security sign-off on their side | security_signoff | Lena Hartmann | Call recording, commercial call, 2026-09-03 |
| Open items at signature (questionnaire, pen test report, DPA, insurance) | security_open_items | Their vendor questionnaire, not yet sent to us. DPA with their legal team. | CSM |
| Certifications they need from us | certifications | Lena asked for our security reports. Which ones was not said. | |
| Data residency or regional hosting requirements | data_residency | Customer ticket data must stay inside their environment. | Lena, call recording, commercial call, 2026-09-03 |
| Restrictions on installing software or outbound connections | install_restrictions | Outbound connections from their production cluster need a firewall change request approved by IT. | Call recording, technical call, 2026-09-01 |
| Single sign-on required | sso_required | yes | Call recording, commercial call, 2026-09-03 |
| Identity provider | identity_provider | A cloud identity provider with SAML. Which one was not said. | |
| Automated user provisioning (SCIM) required | provisioning_required | UNKNOWN | |

---

## 8. Current stack and integrations (SE)

| Field | ID | Answer | Source |
|---|---|---|---|
| Systems we will need to integrate with | integrations | Their ticketing system (the agent reads tickets and writes tags), their Kubernetes cluster, their CI/CD pipeline, and their on-call paging tool. | Call recording, technical call, 2026-09-01 |
| Languages or frameworks we have to work with | frameworks | Python. The agent is built with LangGraph. | Call recording, technical call, 2026-09-01 |
| Where their documentation lives today | docs_location | A team wiki. The triage rules are a wiki page the rotation keeps up to date. | |
| Process or method they follow today | current_process | One engineer per week is on triage rotation and routes every new ticket by hand. | Call recording, discovery call, 2026-08-26 |
| Anything already built or automated they expect to keep | keep_existing | Their ticketing system's queues, and their on-call paging tool. | |
| Who holds the credentials for each system above | credential_holders | Tomás for the ticketing system API. The Kubernetes cluster belongs to their platform team: nobody named. | Call recording, technical call, 2026-09-01 |

---

## 9. Teams and structure (SE)

*These answers decide how the account is organized: how many workspaces, and whether test and production are separate. Cheap to decide in week one, expensive to unwind in month three.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Teams in scope at launch | teams_launch | Support engineering (about 25 people) | CRM |
| Teams in scope later, and roughly when | teams_later | Tier 1 customer support, 2027. Not scoped. | |
| Number of teams / workspaces | team_count | 1 team at launch | |
| End-user population served | end_users | About 25 support engineers. Their customers never see the agent directly. | |
| Geographies and time zones | geographies | Two time zones, about six hours apart. | |
| One shared process, or several that genuinely differ | process_shape | shared | |
| Separate test and production required | separate_envs | yes | Tomás, call recording, technical call, 2026-09-01 |
| Has anyone outside the buying team agreed to this | outside_agreement | no. The platform team that runs the cluster has not been on a call. | SE's read: Tomás said "platform will sort the cluster" |

---

## 10. Baseline numbers before we configure anything (SE)

*Blank is fine. Invented is not. A baseline captured after we start configuring is not a baseline. If we cannot get real numbers, record their estimate and label it an estimate.*

| Metric | ID | Current value | Estimate or measured | Source | Date captured |
|---|---|---|---|---|---|
| Tickets the agent will handle per month, counted today | core_volume | ~18,000 | Measured | Ticketing system export | 2026-09-05 |
| Time a person takes to triage one ticket today | core_cycle_time | ~6 minutes | Estimate | Tomás | 2026-09-05 |
| People doing that work today | team_headcount | 25 engineers, 1 on triage rotation each week | Measured | CRM | 2026-09-05 |
| Share of tickets routed to the right queue the first time | first_time_right | ~80% | Estimate | Tomás | 2026-09-05 |
| Past tickets with a known correct queue | labeled_examples | ~2,000 | Estimate | Tomás | 2026-09-05 |
| Agent runs per month expected in production | expected_runs | UNKNOWN | | | |

---

## Handoff notes (both)

*Anything that does not fit a field: internal politics, a skeptic on their side, a champion new in seat, a competitor still in the building, a renewal date closer than it looks.*

Nobody above Tomás has been on a call. The order form came back through procurement. We do not know who unblocks this if the security review stalls.

"SSO in week 1" was said on the commercial call before anyone asked about their identity team. Owen Achebe owns their identity provider, and he has not heard about this project from us.

The Kubernetes cluster belongs to a platform team nobody has met. Tomás expects them to "sort the cluster", but no one there has agreed to anything.

Lena is supportive but firm: nothing that touches real tickets runs until her review is done.

---

## Open questions for kickoff

*The planner lists every `UNKNOWN` on the board as a week-one question. List anything else here.*

1. Hybrid or Self-hosted, and where do the traces live?
2. Who on the platform team owns the cluster the agent will run on?
3. Who is the exec sponsor?
