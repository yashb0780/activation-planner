> **Unofficial demo. Not affiliated with CoreWeave.** Veltmoor Labs is fictional, and so is every
> person, date and number below. Product: CoreWeave. Anything about the product
> itself comes from `config/coreweave.md`, where unconfirmed points are
> marked VERIFY.

# Sales handoff: Veltmoor Labs

| | |
|---|---|
| Filled by (rep) | L. Chandra |
| Filled by (SE) | J. Petrov |
| Date filled | 2026-09-18 |
| Received by (implementation lead) | A. Moreau |

**How to fill this in:** write `UNKNOWN` for anything you do not actually know. Do not guess and do not smooth over a gap. The planner turns every `UNKNOWN` into a week-one task with a name attached, which is useful. It treats a confident wrong answer as fact, which is not.

**Every answer gets a source:** `call, 12 Sep` / `email, 3 Sep` / `CRM` / `rep's read` / `SE's read`. If it came from a recording or transcript, paste the quote.

**Who owns what:** sections 1 to 5 belong to the rep, sections 6 to 10 to the SE. Fill it together on one call, each person speaking to their half.

The ID column is for the app. Don't edit it.

---

## Required before planning

*The planner checks these fields before it builds anything. This table is the only place the list is kept: add or remove a row here to change it. A field is **missing** if it is blank or `UNKNOWN`, and **partly missing** if its answer contains `UNKNOWN`. The planner still builds the plan, and opens it with a "Handoff incomplete" panel that names each gap and who fills it.*

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
| Customer | customer_name | Veltmoor Labs | |
| Products and tiers purchased | products | CoreWeave: reserved GPU capacity, CoreWeave Kubernetes Service (CKS), SUNK, object storage and distributed file storage, observability. Inference not purchased. | Order form |
| Seats / contract size | contract_size | 64 GPUs reserved for 12 months. GPU type as on the order form. | Order form |
| Close date | close_date | 2026-09-15 | CRM |
| Contract start date | contract_start | 2026-10-05 | Order form |
| Rep | rep | L. Chandra | CRM |
| SE | se | J. Petrov | CRM |
| Assigned CSM | csm | A. Moreau | CRM |

---

## 1. Why they bought (rep)

*The job they are hiring the product to do, in their words. Not the category ("they bought service management"), the job ("consolidate three regional helpdesks into one queue before the new office opens in March").*

| Field | ID | Answer | Source |
|---|---|---|---|
| The job, in their words (quote) | use_case | "We need one place where the v3 pre-training run can start on the first of December and not stop because we ran out of GPUs or someone's node died at 3am." | Discovery call, 2026-08-28, recorded |
| Problem that made them buy now | why_now | Their current cloud could not promise 64 GPUs in one region for the length of the v3 run. Two earlier runs were split across regions and restarted by hand. | Commercial call, 2026-09-09 |
| Whole scope, or phase one of something bigger | scope_phase | Phase one. Serving their models to customers is planned for 2027. Not scoped, not priced. | |
| Alternatives they considered | alternatives | UNKNOWN | |
| Tool being replaced, or greenfield | incumbent | Their current cloud: a Kubernetes cluster for services and a Slurm cluster for training sweeps. Data sits in that cloud's object storage. | Technical call, 2026-09-03 |
| Why they are leaving it, in their words | why_leaving | "We spend more time finding GPUs than using them." | Discovery call, 2026-08-28 |

---

## 2. People (rep)

| Role | ID | Name | Title | Email | Have we met them? |
|---|---|---|---|---|---|
| Technical owner (does the work) | technical_owner | Ravi Castellanos | Head of ML Infrastructure | r.castellanos@example.com | Yes, on every call |
| Exec sponsor (unblocks and pays) | exec_sponsor | Ines Okafor | CTO and co-founder | i.okafor@example.com | Twice: discovery and commercial calls |
| Day-to-day admin, if different | admin | UNKNOWN | | | Ravi plans to hire a platform engineer. Not yet hired. |
| Security contact | security_contact | Ines Okafor, acting | | | They have no security team |
| Identity / IT contact | identity_contact | UNKNOWN | | | |

| Field | ID | Answer | Source |
|---|---|---|---|
| Hours per week the technical owner has for this | owner_capacity | About 10 hours a week, Ravi's own estimate. He also trains models himself. | Technical call, 2026-09-03 |
| Has the exec sponsor ever been on a call with us? | sponsor_engaged | yes. Discovery and commercial calls. | CRM |

---

## 3. Target date and what is driving it (rep)

*If two people gave you different dates, record both with their sources. Do not pick one.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Target go-live date | target_date | 2026-12-01 | Ines, commercial call, 2026-09-09 |
| What is driving it (audit, contract expiry, office opening, fiscal year, board promise) | date_driver | The v3 pre-training run starts on 1 December so results are in the Q1 investor update. | Ines, commercial call, 2026-09-09 |
| Fixed or preferred | date_fixed | fixed | Ines, commercial call, 2026-09-09 |
| What happens to them if it slips | slip_impact | The v3 results miss the Q1 investor update. | |
| Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) | freeze_periods | 2026-11-16 to 2026-11-20. Team offsite, no infrastructure changes. | Ravi, technical call, 2026-09-03 |

---

## 4. Commitments made during the sales cycle (rep, SE checks)

*Include the soft ones. "Yeah, we can do that" in a demo is a commitment to the person who heard it. The SE fills the last column.*

| Commitment | Made by | Made to | Where it is recorded | Deliverable as stated? |
|---|---|---|---|---|
| "You'll be running jobs on the new cluster within two weeks" | J. Petrov | Ravi Castellanos | Demo call 2026-09-01, recorded | UNKNOWN. Depends on capacity and on their images. |
| "We'll help you move your datasets" | L. Chandra | Ines Okafor | Commercial call 2026-09-09 | UNKNOWN. What "help" covers was not defined. |

| Field | ID | Answer | Source |
|---|---|---|---|
| Anything promised on timing specifically | timing_promises | Running jobs within two weeks (above). | |
| Anything promised we are not sure we can deliver | risky_promises | The dataset move, because nobody has sized the transfer. | SE's read |

---

## 5. What "good" means to them (rep)

*Their definition, not ours. If nobody asked during the cycle, write `UNKNOWN` and it becomes the first question at kickoff.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Their stated outcome | success_outcome | The v3 run starts on time and finishes without anyone babysitting the cluster. | Ines, commercial call, 2026-09-09 |
| How they will know it worked | success_signal | A full week where no researcher asks Ravi to restart a job. | Ravi, technical call, 2026-09-03 |
| Who inside their company judges that | success_judge | Ines Okafor | |
| Number attached, and who reports it upward | success_number | GPU hours to a finished checkpoint, reported to the board each quarter by Ines. | |
| What would make them call this a failed rollout | failure_definition | The v3 run starts late, or half their jobs are still on the old cloud in January. | |

---

## 6. What they want set up first (SE)

*One block per module purchased, including the ones they seem lukewarm on. Every purchased module gets a first step inside 30 days. Within a module, build order is ranked by volume, so a request with no volume becomes a discovery task.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Compute capacity and CKS | |
| Must something here be live by day 30? | day30_required | yes. Their services running on the new cluster. | Technical call, 2026-09-03 |
| Explicitly out of scope for now | out_of_scope | Serving models to their customers (2027) | Technical call, 2026-09-03 |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Our eval and data-prep jobs on the new cluster" | request_1 | ~1,200 jobs | Measured | Ravi, job scheduler export, 2026-09-12 |
| 2 | "Notebook servers for the researchers" | request_2 | ~30 users | Estimate | Ravi, technical call, 2026-09-03 |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | SUNK | |
| Must something here be live by day 30? | day30_required | yes. The nightly ablation sweeps on Slurm. | Mira Stenholm, technical call, 2026-09-03 |
| Explicitly out of scope for now | out_of_scope | UNKNOWN | |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "The nightly ablation sweeps" | request_1 | ~400 jobs | Measured | Ravi, job scheduler export, 2026-09-12 |
| 2 | "Multi-node fine-tunes" | request_2 | UNKNOWN | | Mira, technical call, 2026-09-03 |
| 3 | "The v3 pre-training run itself" | request_3 | One run, 64 GPUs, about 6 weeks | Estimate | Mira, technical call, 2026-09-03 |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Storage and data migration | |
| Must something here be live by day 30? | day30_required | yes. The training corpus readable from the new cluster. | Technical call, 2026-09-03 |
| Explicitly out of scope for now | out_of_scope | Archive of experiments older than a year | Technical call, 2026-09-03 |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Move the curated speech corpus" | request_1 | ~180 TB, one-time | Measured | Ravi, storage report, 2026-09-12 |
| 2 | "Checkpoints written somewhere we trust" | request_2 | ~6 TB | Estimate | Ravi, technical call, 2026-09-03 |

| Field | ID | Answer | Source |
|---|---|---|---|
| Module | module | Observability | |
| Must something here be live by day 30? | day30_required | no | Technical call, 2026-09-03 |
| Explicitly out of scope for now | out_of_scope | UNKNOWN | |

| Rank | Request, in their words | ID | Volume per month | Estimate or measured | Source |
|---|---|---|---|---|---|
| 1 | "Tell us when a GPU node goes bad before a researcher does" | request_1 | UNKNOWN | | Ravi, technical call, 2026-09-03 |

---

## 7. Security and access (SE)

*The most common single cause of a blown activation date. Ask even when they say there are none.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Security review required before deployment | security_review | yes | Ines, commercial call, 2026-09-09 |
| Review status | security_review_status | not started | |
| Who owns security sign-off on their side | security_signoff | Ines Okafor | |
| Open items at signature (questionnaire, pen test report, DPA, insurance) | security_open_items | Their vendor questionnaire, not yet sent to us. DPA signed. | |
| Certifications they need from us | certifications | Ines asked for our security reports. Which ones was not said. | |
| Data residency or regional hosting requirements | data_residency | Training data stays in the US. | Ines, commercial call, 2026-09-09 |
| Restrictions on installing software or outbound connections | install_restrictions | None known | |
| Single sign-on required | sso_required | yes | Ravi, technical call, 2026-09-03 |
| Identity provider | identity_provider | A cloud directory with SSO available | |
| Automated user provisioning (SCIM) required | provisioning_required | UNKNOWN | |

---

## 8. Current stack and integrations (SE)

| Field | ID | Answer | Source |
|---|---|---|---|
| Systems we will need to integrate with | integrations | Their current cloud's object storage (the data source), their CI/CD pipeline, their container registry on the current cloud, and their experiment tracking tool. | |
| Languages or frameworks we have to work with | frameworks | Python training code; jobs packaged as containers. | Technical call, 2026-09-03 |
| Where their documentation lives today | docs_location | A team wiki. Runbooks for the Slurm cluster are "mostly in Ravi's head". | |
| Process or method they follow today | current_process | Slurm for training sweeps, ad-hoc Kubernetes jobs for services. | |
| Anything already built or automated they expect to keep | keep_existing | Their experiment tracking tool and their CI/CD pipeline. | |
| Who holds the credentials for each system above | credential_holders | Ravi for the cluster and registry. The data buckets: UNKNOWN. | |

---

## 9. Teams and structure (SE)

*These answers decide how the account is organized: how many workspaces, and whether test and production are separate. Cheap to decide in week one, expensive to unwind in month three.*

| Field | ID | Answer | Source |
|---|---|---|---|
| Teams in scope at launch | teams_launch | Research (14 people), ML infrastructure (3 people) | |
| Teams in scope later, and roughly when | teams_later | A product team serving models, 2027. Not scoped. | |
| Number of teams / workspaces | team_count | 2 teams at launch. One cluster or two is not decided. | Technical call, 2026-09-03 |
| End-user population served | end_users | 17 people submitting jobs | |
| Geographies and time zones | geographies | Two time zones, about eight hours apart. | |
| One shared process, or several that genuinely differ | process_shape | different. Research runs batch jobs on Slurm; infrastructure runs services on Kubernetes. | Technical call, 2026-09-03 |
| Separate test and production required | separate_envs | no. A staging namespace is enough, Ravi says. | Technical call, 2026-09-03 |
| Has anyone outside the buying team agreed to this | outside_agreement | yes. Mira Stenholm, head of research, joined the technical call and agreed. | Technical call, 2026-09-03 |

---

## 10. Baseline numbers before we configure anything (SE)

*Blank is fine. Invented is not. A baseline captured after we start configuring is not a baseline. If we cannot get real numbers, record their estimate and label it an estimate.*

| Metric | ID | Current value | Estimate or measured | Source | Date captured |
|---|---|---|---|---|---|
| GPU hours used per month on their current cloud | core_volume | ~28,000 | Measured | Their cloud invoice, shared by Ravi | 2026-09-12 |
| Time to train their reference model end to end today | core_cycle_time | UNKNOWN. Nobody has timed a full run on the current setup. | | | |
| Researchers and engineers who submit jobs | team_headcount | 17 | Measured | Ravi | 2026-09-12 |
| Average GPU utilization today | gpu_utilization | ~45% | Estimate | Ravi | 2026-09-12 |
| Share of training jobs that fail or are restarted by hand | job_failure_rate | ~12% | Estimate | Ravi | 2026-09-12 |
| Average time a job waits before it starts | queue_wait | ~6 hours in busy weeks | Estimate | Mira | 2026-09-12 |
| Total training data to move | dataset_size | ~180 TB | Measured | Storage report | 2026-09-12 |

---

## Handoff notes (both)

*Anything that does not fit a field: internal politics, a skeptic on their side, a champion new in seat, a competitor still in the building, a renewal date closer than it looks.*

Ravi is the only infrastructure person who knows the old Slurm cluster, and he also trains models. The platform engineer he wants to hire is not hired yet.

Mira Stenholm leads research and is the person whose team feels every failed job. She was on the technical call and is supportive, but has said "I'll believe it when the sweeps run".

Their contract with their current cloud renews on 2027-01-31. Nobody has said whether they will keep any capacity there.

---

## Open questions for kickoff

*The planner lists every `UNKNOWN` on the board as a week-one question. List anything else here.*

1. Who owns the data buckets on the current cloud, and who pays for moving 180 TB out?
2. What exactly did "we'll help you move your datasets" promise?
3. One cluster or two, for research and infrastructure?
