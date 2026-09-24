Product config: CoreWeave
Unofficial demo. Not affiliated with CoreWeave. CoreWeave is named as plain text only: no logo, colours or visual identity. The customer in the example is fictional and timelines are estimates.
What this file is: the product half of an activation plan, in the same shape as config/itsm.md. The handoff says what the customer wants and by when. This file says what each module costs to stand up, what has to exist first, and what counts as proof it is live.
Sources: product names and one-line descriptions come from the public docs home page, docs.coreweave.com, read 2026-09-23. Deeper docs pages needed an access code and were not read. Everything marked VERIFY is a placeholder for you to confirm or replace. Nothing marked VERIFY is a fact about CoreWeave.
The product in one line
An AI cloud: bare-metal GPU and CPU compute with reserved, on-demand and spot plans, managed Kubernetes (CoreWeave Kubernetes Service, CKS), Slurm on Kubernetes (SUNK), storage, networking, inference, and observability.
How to read the fields
Lead time is calendar time from kickoff to the evidence below being true, assuming the customer shows up. It is not effort. A module can be two days of work and six weeks of waiting.

* Short: 1 to 3 weeks. VERIFY: placeholder range. Configuration we control.
* Long: 4 to 12 weeks. VERIFY: placeholder range. Gated by something on the customer's side: a security review, data transfer out of their current cloud, porting their jobs, or a behaviour change in their research team. Start these in week one.

Depends on is a hard prerequisite. Starting a module before its dependencies are in place produces rework, not progress.
Evidence is what proves the module is doing work, not that it was switched on. The test for any piece of evidence: could this still be true if nobody at the customer had run a real job since go-live? If yes, it is not evidence, it is configuration.
Kickoff setup
Quick base-level setup done at kickoff, first in week one. The planner adds the customer success plan to this list for every product.

* Organization and projects set up for the teams in scope. VERIFY: how an organization is created and who creates it.
* Roles and permissions: user management and IAM policies for each team (the docs list both under "Security & Admin").

Foundation
Nothing below starts cleanly without these. Every item starts in week one. Each keeps its own lead time, so a long one starts in week one and may finish later.

* A named admin on the customer side who has time budgeted. Lead time: short to name; the time budget is what slips.
* Single sign-on for every team. VERIFY: whether it is supported and how it is set up. Lead time: short when their identity owner is in the room; long when it sits outside the buying team.
* Capacity plan agreed: GPU type, count, region, and plan (reserved, on-demand or spot, as the docs name them). Lead time: VERIFY. The date capacity is available is the one date the customer cannot move, so it is week-one work.
* Network foundation: a VPC, and Direct Connect if they need a private link to their current cloud or data centre (both named in the docs). Lead time: VERIFY. Direct Connect usually depends on a provider on the customer's side: VERIFY.
* Billing set up, with budget alerts the customer's finance owner receives. Lead time: short. VERIFY: what billing alerts exist ("billing insights" is named in the docs).
* Support path named: who they contact, how, and the escalation route. Lead time: short. VERIFY: support channels and tiers.

Module: Compute capacity
Lead time: VERIFY. Short if capacity in the chosen region and GPU type is available now; long if it is not. Which one applies is decided by the capacity plan, not by us.
Lead time in weeks: 2 to 8 (VERIFY: placeholder)
Depends on

* A signed capacity plan: GPU type, count, region, plan, start date
* Organization, IAM and a VPC in place
* A quota or allocation matching the plan. VERIFY: how quota is requested and approved.

Evidence it is real

* GPUs in the plan running the customer's own jobs above an agreed utilization, sustained for two consecutive weeks. VERIFY: the utilization threshold to agree.
* Capacity use reviewed weekly by a named customer owner, from the product's own dashboards rather than a spreadsheet
* No job queued for lack of capacity that the plan says should exist

Not evidence: nodes provisioned, a test job run by us, capacity showing on the invoice.
Module: CoreWeave Kubernetes Service (CKS)
Lead time: Short for a first cluster. VERIFY. Long to move all their services, because their images, secrets and pipelines were built for another cloud.
Lead time in weeks: 1 to 4 (VERIFY: placeholder)
Depends on

* Compute capacity allocated
* IAM roles for their platform team
* Container images in a registry the cluster can pull from, without credentials tied to their old cloud
* A named platform engineer on the customer side. If their platform engineer is also a researcher, the platform work is the part that gives.

Evidence it is real

* Production workloads deployed by the customer's own team through their own pipeline, not by us
* Workloads survive a node being replaced without a person stepping in
* The customer's on-call gets paged by this cluster's alerts, and has responded to one

Not evidence: cluster created, kubectl works, a hello-world pod, a demo deployed by the SE.
Module: SUNK (Slurm on Kubernetes)
Lead time: Long. VERIFY. The cluster is quick; porting their training scripts, paths and habits is the work.
Lead time in weeks: 3 to 8 (VERIFY: placeholder)
Depends on

* CKS cluster running on the allocated capacity
* Shared file storage with their training data already in it
* Their job scripts ported: paths, modules, environment. Scripts that assume the old cluster's file paths fail quietly.
* HPC Interconnect configured for multi-node jobs (named in the docs). VERIFY: whether this needs setup per cluster.
* A named research lead who agrees which jobs move first

Evidence it is real

* Researchers submitting real training jobs without help from us or the platform engineer
* A multi-node job resumes from checkpoint after a node failure, without manual repair
* Queue wait time and job failure rate reported against the handoff baseline

Not evidence: Slurm installed, sinfo shows nodes, a test job submitted by the admin.
Module: Storage and data migration
Lead time: Long, and the longest pole when their datasets are large. Moving data out of their current cloud is a separate and earlier project from using storage day to day. Split them in the plan or the dates will lie.
Lead time in weeks: 3 to 10 (VERIFY: placeholder; data migration; storage in use follows inside the same range)
Data migration (the gate)
Depends on

* Approval to move data out of their current cloud, and who pays for egress
* Dataset size and priority order: what moves first
* Transfer path and bandwidth: over the internet or a private link. VERIFY: supported transfer options.
* An owner on their data side, who is often not the platform engineer

Evidence it is real

* The priority datasets are copied and checksummed, with the gap against their own inventory explained
* Training reads from CoreWeave storage, not across clouds

Storage in use
Depends on

* Data migration, or a clean start for new data
* Storage type chosen per use: S3-compatible object storage, distributed file storage, or local storage (all named in the docs). VERIFY: which types fit their jobs.
* Access policies per team

Evidence it is real

* Checkpoints written to CoreWeave storage by real training runs
* The copy in their old cloud is no longer the source of truth, and they have said so in writing
* Storage cost and growth reviewed by a named owner

Not evidence: buckets created, a sample dataset uploaded, a transfer started.
Module: Observability
Lead time: Short. VERIFY. The dashboards exist on day one; the habit of looking at them is the work.
Lead time in weeks: 1 to 3 (VERIFY: placeholder)
Depends on

* Workloads running, so there is something to observe
* Named owners for alerts, and where alerts go

Evidence it is real

* Their on-call receives alerts from the product's alerting (the docs name Grafana dashboards, logs, metrics and alerts) and has acted on one
* GPU utilization reviewed in a standing weekly meeting from the product's dashboards

Not evidence: dashboards exist, a screenshot in a slide.
Module: Inference
Lead time: VERIFY. The docs name serverless and dedicated inference options.
Lead time in weeks: VERIFY
Depends on

* A model they have trained or chosen, packaged for serving. VERIFY: supported formats.
* Traffic expectations: requests per second, latency target
* Networking for how their users reach it (the docs name an Ingress Service)

Evidence it is real

* Real user traffic served, with latency reported against their target

Not evidence: an endpoint deployed, a test request answered.
Baseline metrics
Section 10 of the handoff asks for three core numbers on every product. For this product they mean:

* core_volume: GPU hours used per month on their current cloud
* core_cycle_time: time to train their reference model end to end today
* team_headcount: researchers and engineers who submit jobs

Add these rows to section 10 as well:

* gpu_utilization: average GPU utilization today
* job_failure_rate: share of training jobs that fail or are restarted by hand
* queue_wait: average time a job waits before it starts
* dataset_size: total training data to move, in TB

Drift rules
Used to flag long-lead items that are starting too late. The planner applies these as fixed rules, with no judgement. Change the numbers here, never in the skill.

* Applies to: modules whose lead time is Long and has a "Lead time in weeks" line.
* Safety buffer: 0 weeks. VERIFY: demo default.
* Freeze periods pause work: yes. VERIFY: demo default.
* Drifting (amber) uses: the long end of the lead time.
* At risk (red) uses: the short end of the lead time.
* When a module gives one number, it is both ends.

Sequencing
Default order, driven by dependencies rather than by customer enthusiasm:

1. Week 1: foundation, plus open their security review, the capacity plan, and the data egress approval on their current cloud. These are mostly waiting, which is why they start first.
2. Weeks 1 to 3: CKS on the allocated capacity, with one real workload. First visible win.
3. Weeks 1 to 6, in parallel: data migration, then storage in use.
4. Weeks 2 to 6: SUNK, once shared storage holds their training data and the first job scripts are ported.
5. From week 2, continuously: observability.
6. After training runs are stable: inference, if purchased.

Two ordering rules worth saying out loud in the plan:

* A long training run before checkpoints write to CoreWeave storage risks losing days of work to one failure.
* SUNK before the training data has moved produces jobs that sit idle or read across clouds.

Where these plans usually slip

* Capacity in the chosen region or GPU type is confirmed late. VERIFY: whether this is a real pattern.
* Moving data out of the old cloud is slower or costlier than planned, and nobody owns the egress bill
* Their platform engineer is also a researcher, and the platform work is what gives
* Container images and secrets depend on their old cloud's registry and identity
* Job scripts assume the old cluster's paths and environment
* Their security review of us surfaces in week five instead of week one

When the handoff is thin
Modules still have dependencies when the handoff is silent about them. If the customer bought storage and the handoff has no dataset size or data owner, that is a week-one risk to name in the plan. Flag the gap against the module it blocks, and say which date it puts at risk.
