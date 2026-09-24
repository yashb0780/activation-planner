> **Unofficial demo. Not affiliated with CoreWeave.** Generated from
> `coreweave-handoff.md`, which is fictional. Product: CoreWeave.
> Product facts come from `config/coreweave.md`; every lead time there
> is a VERIFY placeholder, so every date below that rests on one is too.

# Activation board — Veltmoor Labs

**Status: Draft — 0 of 9 sections reviewed.** Tick each section's box as you
review it. Change this line to `Status: Reviewed` only when every box is ticked.

### Handoff incomplete

The board is still built. Fill these in the handoff, then regenerate it. The
required fields come from the **Required before planning** table in
`templates/handoff.md`.

| Field | What is missing | Who fills it |
|---|---|---|
| Time the core job takes today | **Missing.** `UNKNOWN`: nobody has timed a full training run on the current setup. | SE — J. Petrov |

## Read this first

- [ ] Reviewed

- **Handoff** dated 2026-09-18, filled by L. Chandra (rep) and J. Petrov (SE),
  received by A. Moreau (implementation lead and CSM).
- **Config read:** `config/coreweave.md`. Product: CoreWeave.
- **Contract start** 2026-10-05. **Target date** 2026-12-01, fixed (Ines,
  commercial call, 2026-09-09): the v3 pre-training run starts that day.

**The job, in their words** (discovery call, 2026-08-28, recorded):

> "We need one place where the v3 pre-training run can start on the first of
> December and not stop because we ran out of GPUs or someone's node died at
> 3am."

**The calendar, before anything else.** Contract start to the target date is
eight weeks. The handoff states a freeze from 16 to 20 November (team offsite,
no infrastructure changes). Working runway is **seven weeks**, and the last
full week before the run is the offsite.

### Open questions

Every `UNKNOWN`, and every request with no volume, grouped into five open
questions to ask at kickoff. Each keeps its original questions as a checklist.

**1. "Walk me through your current setup and where your data lives."**
Blocks data migration, the gate for storage and SUNK. Date at risk: the v3
start. Ask: Ravi Castellanos.
- [ ] Who owns the data buckets on your current cloud? *From: Who holds the credentials for each system above*
- [ ] How should the data move: over the internet or a private link? (VERIFY supported options) *From: Systems we will need to integrate with*

**2. "Who works on each system today, and who has admin access?"**
Blocks Foundation. Date at risk: access for 17 people before the first job.
Ask: *unassigned* — routed to Ines Okafor, with Ravi Castellanos.
- [ ] Who will be the day-to-day admin? *From: Day-to-day admin, if different*
- [ ] Who is the identity / IT contact? *From: Identity / IT contact*
- [ ] Is automated user provisioning required? *From: Automated user provisioning (SCIM) required*

**3. "What has to be true on day 30 for this to feel like a win?"**
Scope for SUNK and observability, and the one baseline the success number
needs. Ask: Ravi Castellanos and Mira Stenholm.
- [ ] What is out of scope for SUNK and observability? *From: Explicitly out of scope for now*
- [ ] How long does a full training run take today? *From: Time the core job takes today*

**4. "What else runs on the cluster that we have not counted yet?"**
Two requests with no volume, so neither is ranked. Ask: Mira Stenholm.
- [ ] Multi-node fine-tunes: how many a month? *From: What they want set up first — sunk, request 2*
- [ ] GPU nodes going bad: how often does a researcher notice first? *From: What they want set up first — observability, request 1*

**5. "Who else was part of the decision, and what else did you consider?"**
Blocks no module. Ask: L. Chandra.
- [ ] What alternatives did they consider? (Not yet a finding.) *From: Alternatives they considered*

### Conflicts

1. **"Running jobs within two weeks" against a capacity date nobody has
   confirmed.** J. Petrov said it on the demo call (2026-09-01, recorded);
   deliverability `UNKNOWN`. The config makes compute capacity conditional:
   short if capacity in their region and GPU type is available now, long if
   not, and says which applies is decided by the capacity plan, not by us.
   There is no signed capacity plan in the handoff. Confirm the capacity date
   in week one, before the promise is repeated.
   *From: Commitments made during the sales cycle · product config*
2. **"We'll help you move your datasets" is undefined, and it sits on the
   longest pole.** 180 TB, measured. The bucket owner is `UNKNOWN`, and so is
   who pays to move the data out. The config puts data migration at 3 to 10
   weeks (VERIFY) and treats it as the gate for storage and SUNK. Define "help"
   with Ines in week one.
   *From: Commitments made during the sales cycle · Who holds the credentials for each system above · product config*
3. **Slurm sweeps by day 30, against SUNK's dependencies.** Mira wants the
   nightly ablation sweeps on Slurm by day 30. The config says SUNK needs the
   training data already moved and the job scripts ported. Neither has
   started, and the drift check below already flags SUNK amber on day 1.
   *From: Must something here be live by day 30? · product config*
4. **The technical owner has about 10 hours a week and also trains models.**
   No day-to-day admin is named. The config lists this exact pattern as a
   common slip. Raise it with Ines in week one.
   *From: Hours per week the technical owner has for this · Day-to-day admin, if different · product config*
5. **The offsite freeze sits in the last full week before the run.** Anything
   not ready by 13 November stops until 23 November, a week before the fixed
   start date.
   *From: Known freeze periods · Target go-live date*
6. **Their current cloud renews on 2027-01-31, recorded only in the handoff
   notes.** Nobody has said whether they keep capacity there. It decides
   whether the old copy of the data can be retired.
   *From: Handoff notes*

### First value (proposed, confirm at kickoff) (inferred)

**Eval and data-prep jobs run on the new cluster**

- **Volume:** about 1,200 jobs a month, measured
- **Proof:** jobs run without anyone restarting them by hand
- **Why first:** highest volume, needed live by day 30

*From: What they want set up first — compute capacity and cks, request 1 · How they will know it worked*

*Why?* Section 6: the highest-volume request in a module needed live by day
30. It needs no data migration, so it can prove the cluster before the long
work lands. Tied to `success_signal`: a week where no researcher asks Ravi to
restart a job.

### Milestones (inferred)

1. **Kickoff done**, by end of week 1
   - Capacity plan signed (item: sign the capacity plan)
   - Dataset move scope defined (item: define "help moving your datasets")
   - One cluster or two decided (item: decide one cluster or two)
   - Success plan confirmed and shared (item: draft success plan)
2. **Foundation cleared**, by day 30
   - SSO live for both teams (item: set up single sign-on)
   - Admin named, hours budgeted (item: get an admin named)
   - VPC and network ready (item: set up the network foundation)
   - Security questionnaire returned (item: security review)
3. **First value live**, by day 30
   - Eval jobs running on CKS (item: move eval and data-prep jobs)
   - Deployed by their own pipeline (item: move eval and data-prep jobs)
4. **Day 30 review**, by day 30
   - v3 start re-checked on evidence (item: day 30 review)
   - Data move window agreed (item: day 30 review)

## Step 1 — Week one: Foundation, and opening the long gates

- [ ] Reviewed

### Foundation

| Foundation item | Lead time | Where it stands | Expected to finish | Status | From |
|---|---|---|---|---|---|
| Organization set up, admin named | Short (VERIFY) | `admin` — `UNKNOWN`. Ravi plans to hire a platform engineer, not yet hired. | Week 1 to name someone; the time budget is the risk | **Gated by UNKNOWN** — `admin` | From: Day-to-day admin, if different · Hours per week the technical owner has for this · product config |
| Sign-in and access (SSO, IAM per team) | **Unresolved — planned as Short.** Short when their identity owner is in the room. SSO support: VERIFY. | SSO required. Their identity provider has SSO available. Identity / IT contact — `UNKNOWN`. Provisioning — `UNKNOWN`. Two teams need different access. | Week 1 to 2 if the identity owner is reached in week 1 | **Gated by UNKNOWN** — `identity_contact`, `provisioning_required` | From: Single sign-on required · Identity provider · Identity / IT contact · Automated user provisioning (SCIM) required · Teams in scope at launch · product config |
| Capacity plan agreed | VERIFY | 64 GPUs reserved for 12 months, GPU type as on the order form. Region: training data must stay in the US. Start date of the capacity: not in the handoff. | Week 1 | **Blocked** — the capacity date. Owner: A. Moreau, with the account team | From: Seats / contract size · Data residency or regional hosting requirements · product config |
| Network foundation (VPC, private link if needed) | VERIFY | Whether they need a private link to their current cloud for the data move is not in the handoff. | Week 1 to 2 for the VPC; a private link, if needed, is longer (VERIFY) | **Gated by UNKNOWN** — transfer path | From: Systems we will need to integrate with · product config |
| Billing and budget alerts | Short (VERIFY) | Not discussed. | Week 1 | **Ready** | From: product config |
| Support path named | Short (VERIFY) | Not discussed. | Week 1 | **Ready** | From: product config |

### Opening the long gates

| Item | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Their security review of us | Long | `security_review: yes`, status not started. Sign-off: Ines Okafor. Their questionnaire has not been sent. Which security reports they want was not said. | Their sign-off, in writing | **Blocked** — waiting on their questionnaire. Owner: Ines Okafor. | From: Security review required before deployment · Review status · Who owns security sign-off on their side · Open items at signature (questionnaire, pen test report, DPA, insurance) · Certifications they need from us |
| Compute capacity | **Unresolved — planned as Short.** Config: short if capacity is available now, long if not; decided by the capacity plan. | Signed capacity plan — not in the handoff. Organization, IAM, VPC — not started. Quota matching the plan — VERIFY how it is requested. | *"GPUs in the plan running the customer's own jobs above an agreed utilization, sustained for two consecutive weeks"*; *"Capacity use reviewed weekly by a named customer owner, from the product's own dashboards rather than a spreadsheet"*; *"No job queued for lack of capacity that the plan says should exist"* | **Blocked** — the capacity date | From: Products and tiers purchased · Seats / contract size · product config |
| Egress approval on their current cloud | Long | Bucket owner `UNKNOWN`. Who pays for moving 180 TB out: not discussed. | Feeds data migration below | **Gated by UNKNOWN** — `credential_holders` | From: Who holds the credentials for each system above · Total training data to move · product config |

## Step 2 — Weeks 1 to 3: CKS, with one real workload

- [ ] Reviewed

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| CoreWeave Kubernetes Service (CKS) | Short for a first cluster, 1 to 4 weeks (VERIFY). Long to move all their services. | Compute capacity — date not confirmed. IAM roles for their platform team — not started. Images in a registry the cluster can pull from — their registry is on their current cloud. A named platform engineer — Ravi, at about 10 hours a week. `team_count`: one cluster or two not decided. | *"Production workloads deployed by the customer's own team through their own pipeline, not by us"*; *"Workloads survive a node being replaced without a person stepping in"*; *"The customer's on-call gets paged by this cluster's alerts, and has responded to one"* | **Ready** once capacity is confirmed | From: Products and tiers purchased · Must something here be live by day 30? · Number of teams / workspaces · product config |

**Build order, by volume** (`day30_required: yes` — "Their services running on
the new cluster"):

1. "Our eval and data-prep jobs on the new cluster" — ~1,200 jobs a month,
   measured (job scheduler export, 2026-09-12)
   *From: What they want set up first — compute capacity and cks, request 1*
2. "Notebook servers for the researchers" — ~30 users, estimate
   *From: What they want set up first — compute capacity and cks, request 2*

Serving models to their customers stays off the plan (`out_of_scope`, 2027).

## Step 3 — Weeks 1 to 6, in parallel: data migration, then storage in use

- [ ] Reviewed

The config splits these and says to split them in the plan or the dates will
lie.

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| **Data migration (the gate)** | Long, 3 to 10 weeks (VERIFY) | Approval to move data out, and who pays — not discussed. Dataset size and priority — 180 TB measured; priority order not set. Transfer path and bandwidth — not discussed (VERIFY supported options). An owner on their data side — `UNKNOWN`. | *"The priority datasets are copied and checksummed, with the gap against their own inventory explained"*; *"Training reads from CoreWeave storage, not across clouds"* | **Gated by UNKNOWN** — `credential_holders` | From: Products and tiers purchased · Who holds the credentials for each system above · Total training data to move · product config |
| **Storage in use** | Inside the same range | Data migration — not started. Storage type per use — VERIFY which fits. Access policies per team — not started. | *"Checkpoints written to CoreWeave storage by real training runs"*; *"The copy in their old cloud is no longer the source of truth, and they have said so in writing"*; *"Storage cost and growth reviewed by a named owner"* | **Blocked** — behind the gate | From: Products and tiers purchased · Explicitly out of scope for now · product config |

**Requests, by volume** (`day30_required: yes` — "The training corpus readable
from the new cluster"):

1. "Move the curated speech corpus" — ~180 TB, one-time, measured
   *From: What they want set up first — storage and data migration, request 1*
2. "Checkpoints written somewhere we trust" — ~6 TB a month, estimate
   *From: What they want set up first — storage and data migration, request 2*

Experiments older than a year stay off the plan (`out_of_scope`).

## Step 4 — Weeks 2 to 6: SUNK

- [ ] Reviewed

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| SUNK (Slurm on Kubernetes) | Long, 3 to 8 weeks (VERIFY) | CKS on the allocated capacity — not yet. Shared file storage with training data in it — behind data migration. Job scripts ported — not started; runbooks are "mostly in Ravi's head". HPC Interconnect for multi-node jobs — VERIFY. A named research lead — Mira Stenholm. | *"Researchers submitting real training jobs without help from us or the platform engineer"*; *"A multi-node job resumes from checkpoint after a node failure, without manual repair"*; *"Queue wait time and job failure rate reported against the handoff baseline"* | **Blocked** — behind data migration | From: Products and tiers purchased · Must something here be live by day 30? · Where their documentation lives today · product config |

**Build order, by volume** (`day30_required: yes` — "The nightly ablation
sweeps on Slurm"; `out_of_scope: UNKNOWN`):

1. "The nightly ablation sweeps" — ~400 jobs a month, measured
   *From: What they want set up first — sunk, request 1*
2. "Multi-node fine-tunes" — volume `UNKNOWN`. **Discovery task**, Mira
   Stenholm.
   *From: What they want set up first — sunk, request 2*
3. "The v3 pre-training run itself" — one run, 64 GPUs, about six weeks,
   estimate. Not a monthly volume; it is the event the target date is for.
   *From: What they want set up first — sunk, request 3*

## Step 5 — From week 2, continuously: observability

- [ ] Reviewed

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Observability | Short, 1 to 3 weeks (VERIFY) | Workloads running — from week 2. Named owners for alerts — Ravi, by default. | *"Their on-call receives alerts from the product's alerting (the docs name Grafana dashboards, logs, metrics and alerts) and has acted on one"*; *"GPU utilization reviewed in a standing weekly meeting from the product's dashboards"* | **Ready** from week 2 | From: Products and tiers purchased · product config |

**Requests** (`day30_required: no`): "Tell us when a GPU node goes bad before a
researcher does" — volume `UNKNOWN`. **Discovery task**, Ravi Castellanos.
*From: What they want set up first — observability, request 1*

Inference was not purchased, so it is not on this board.

## Drift check

- [ ] Reviewed

Checked as of **2026-10-05** (day 1), against the target date 2026-12-01.
Every threshold comes from the config's **Drift rules**: a buffer of 0 weeks,
freeze periods pause work, amber uses the long end of the lead time and red the
short end. All of those are demo defaults marked VERIFY, and so is every lead
time below. The handoff's freeze runs 2026-11-16 to 2026-11-20.

| Module | Lead time in weeks | Latest safe start | Earliest finish if started 2026-10-05 | Flag | Turns red from, if not started | From |
|---|---|---|---|---|---|---|
| Data migration (the gate) | 3 to 10 (VERIFY) | 2026-09-17 | 2026-10-26 | **Drifting (amber)** | 2026-11-06 | From: Target go-live date · Known freeze periods · product config |
| SUNK | 3 to 8 (VERIFY) | 2026-10-01 | 2026-10-26 | **Drifting (amber)** | 2026-11-06 | From: Target go-live date · Known freeze periods · product config |

Compute capacity is not checked: its lead time is unresolved and planned as
short. If the capacity plan shows it is long, it would also be amber on day 1
(latest safe start 2026-10-01). CKS and observability are short. Storage in
use counts inside data migration's range.

What the flags say, and nothing more: at the long end of their lead times,
both modules can no longer finish before 1 December. Neither is at risk yet:
at the short end, each could still finish before the offsite.

## Ordering rules, stated plainly

- [ ] Reviewed

The config gives two. Both apply here. *From: product config*

- **A long training run before checkpoints write to CoreWeave storage risks
  losing days of work to one failure.** The v3 run is six weeks on 64 GPUs.
  Checkpoints depend on storage in use, which is behind data migration.
- **SUNK before the training data has moved produces jobs that sit idle or read
  across clouds.** Mira's sweeps by day 30 depend on the corpus moving first.

## Where these plans usually slip, checked against this handoff

- [ ] Reviewed

| Known failure mode | Here | From |
|---|---|---|
| Capacity in the chosen region or GPU type is confirmed late | **Not yet visible, and not yet checked.** No capacity date in the handoff. | From: Seats / contract size · product config |
| Moving data out of the old cloud is slower or costlier than planned, and nobody owns the egress bill | **Already happening.** 180 TB, bucket owner `UNKNOWN`, egress payer not discussed. | From: Who holds the credentials for each system above · Total training data to move · product config |
| Their platform engineer is also a researcher, and the platform work is what gives | **Already happening.** Ravi, about 10 hours a week, also trains models. | From: Hours per week the technical owner has for this · product config |
| Container images and secrets depend on their old cloud's registry and identity | **Already happening.** Their registry is on their current cloud. | From: Systems we will need to integrate with · product config |
| Job scripts assume the old cluster's paths and environment | **Set up to happen.** Runbooks are "mostly in Ravi's head". | From: Where their documentation lives today · product config |
| Their security review of us surfaces in week five instead of week one | **Avoidable.** Review required and owner named; the questionnaire has not been sent. Ask for it in week one. | From: Security review required before deployment · product config |
