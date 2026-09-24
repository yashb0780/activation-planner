> **Unofficial demo. Not affiliated with CoreWeave.** Generated from
> `coreweave-handoff.md` and `coreweave-board.md`, both
> fictional. Product: CoreWeave. Lead times are VERIFY placeholders from
> `config/coreweave.md`.

# Draft 30-day plan — Veltmoor Labs

**Status: Draft — 0 of 8 sections reviewed.** Tick each section's box as you
review it. Change this line to `Status: Reviewed` only when every box is ticked.

### Handoff incomplete

The plan is still built. Fill these in the handoff, then regenerate it.

| Field | What is missing | Who fills it |
|---|---|---|
| Time the core job takes today | **Missing.** `UNKNOWN`: nobody has timed a full training run on the current setup. | SE — J. Petrov |

### People

Tasks below name roles, not people. Default owners: us — CSM; them —
Technical owner. A task names other roles only where this plan does.

| Side | Role | Name |
|---|---|---|
| Us | CSM | A. Moreau |
| Us | Implementation lead | A. Moreau |
| Us | SE | J. Petrov |
| Us | Rep | L. Chandra |
| Them | Technical owner | Ravi Castellanos |
| Them | Exec sponsor | Ines Okafor |
| Them | Research lead | Mira Stenholm |
| Them | Security contact | Ines Okafor (acting) |
| Them | Day-to-day admin | *not named* (`UNKNOWN`) |
| Them | Identity / IT contact | *not named* (`UNKNOWN`) |
| Them | Data owner | *not named* (`UNKNOWN`) |

**Day 1 is 2026-10-05**, the contract start date. Day 30 is 2026-11-03.

**What this document is.** The v3 run starts on 1 December, four weeks after
this window closes. This plan answers three questions: what got started, what
proof exists that it is moving, and what is on track to land before the run.
Every lead time it rests on is a placeholder to verify.

---

## Week 1 — 5 to 11 October

- [ ] Reviewed

**Focus:** Get the capacity date, open the data move, and capture the baseline
before anything moves.

**Starting**

- **The capacity plan** — GPU type, count, region (US only), plan and start
  date, signed. It decides whether compute is short or long.
  *Owners: us — CSM; them — Exec sponsor · From: Seats / contract size · Data residency or regional hosting requirements · product config*
- **Define "help moving your datasets"** — what we do, what they do, who pays
  to move 180 TB out, and the priority order.
  *Owners: us — Rep, CSM; them — Exec sponsor · From: Commitments made during the sales cycle · Total training data to move*
- **Egress approval and the data owner** — who owns the buckets, and approval
  to start moving.
  *Owners: us — CSM; them — Data owner · From: Who holds the credentials for each system above*
- **Their security review** — ask for the questionnaire this week.
  *Owners: us — SE; them — Security contact · From: Security review required before deployment · Open items at signature (questionnaire, pen test report, DPA, insurance)*
- **Foundation** — every item from the config, each at its own lead time.
  - Organization set up, and a day-to-day admin named with hours budgeted.
    *Owners: us — CSM; them — Exec sponsor · From: Day-to-day admin, if different · Hours per week the technical owner has for this · product config*
  - Sign-in and access for both teams. Blocked on the identity / IT contact.
    *Owners: us — CSM; them — Identity / IT contact · From: Single sign-on required · Identity provider · Teams in scope at launch · product config*
  - Network foundation: VPC, and a decision on a private link for the move.
    *Owners: us — SE; them — Technical owner · From: Systems we will need to integrate with · product config*
  - Billing set up, with budget alerts to a named owner.
    *Owners: us — CSM; them — Exec sponsor · From: product config*
  - Support path named.
    *Owners: us — CSM; them — Technical owner · From: product config*
- **Decide: one cluster or two**, for research and infrastructure.
  *Owners: us — SE; them — Technical owner, Research lead · From: Number of teams / workspaces · One shared process, or several that genuinely differ*
- **Draft the success plan, confirm it at kickoff, share it by end of week 1.**
  *Owners: us — CSM; them — Technical owner, Exec sponsor · From: Their stated outcome · How they will know it worked · Number attached, and who reports it upward*
- **Baseline capture** — time a full reference training run on the current
  setup. Without it, GPU hours to a finished checkpoint has nothing to compare
  against.
  *Owners: us — SE; them — Technical owner · From: Time the core job takes today*
- **Two discovery tasks** — find the volume:

  | Request | Owners | From |
  |---|---|---|
  | "Multi-node fine-tunes" | us — CSM; them — Research lead | What they want set up first — sunk, request 2 |
  | "Tell us when a GPU node goes bad before a researcher does" | us — CSM; them — Technical owner | What they want set up first — observability, request 1 |

**Needed from the customer**

- Ines Okafor: the capacity plan signed; who pays for moving data out; the
  questionnaire; an identity owner.
- Ravi Castellanos: the bucket owner; a timed reference run; whether a
  platform engineer can be hired before November.

**Checkpoint:** Is there a capacity date in writing, and a named data owner.

**Risks live this week**

- Data migration and SUNK are already amber on day 1 (board drift check).
- Promising "jobs in two weeks" again before the capacity date is known.

## Week 2 — 12 to 18 October

- [ ] Reviewed

**Starting**

- **CKS cluster on the allocated capacity**, if the capacity date allows.
  *Owners: us — Implementation lead; them — Technical owner · From: Must something here be live by day 30? · product config*
- **Move eval and data-prep jobs**, highest volume first (~1,200 a month,
  measured), through their own pipeline.
  *Owners: us — Implementation lead; them — Technical owner · From: What they want set up first — compute capacity and cks, request 1*
- **Container images into a registry the cluster can pull from.**
  *Owners: us — SE; them — Technical owner · From: Systems we will need to integrate with · product config*
- **Data migration starts** with the priority datasets, if approved.
  *Owners: us — SE; them — Data owner · From: What they want set up first — storage and data migration, request 1*
- **Observability** — from week 2, continuously. Alerts routed to Ravi.
  *Owners: us — CSM; them — Technical owner · From: product config*

**Checkpoint:** First real job from their own pipeline, or a dated reason why
not.

## Week 3 — 19 to 25 October

- [ ] Reviewed

**Starting**

- **Port the ablation sweep scripts** to the new paths and environment.
  *Owners: us — SE; them — Research lead · From: What they want set up first — sunk, request 1 · Where their documentation lives today*
- **Notebook servers for researchers** (~30 users, estimate).
  *Owners: us — Implementation lead; them — Technical owner · From: What they want set up first — compute capacity and cks, request 2*
- **Checkpoint storage chosen and access policies set.**
  *Owners: us — SE; them — Technical owner · From: What they want set up first — storage and data migration, request 2 · product config*

**Checkpoint:** What share of the 180 TB is copied and checksummed.

## Week 4 — 26 October to 3 November

- [ ] Reviewed

**Starting**

- **SUNK** with the first ported sweeps, only if the training data is readable
  from the new cluster.
  *Owners: us — Implementation lead; them — Research lead · From: Must something here be live by day 30? · product config*
- **Day 30 review** with Ines and Ravi: re-check the 1 December start against
  evidence, and agree the rest of the data move.
  *Owners: us — CSM; them — Exec sponsor, Technical owner · From: Target go-live date · Fixed or preferred*

**Risks live this week**

- SUNK and data migration turn red on 6 November if not started.
- The offsite freeze (16 to 20 November) leaves one working week after it
  before the run.

---

## Where this stands at day 30

- [ ] Reviewed

| Module | Day-30 checkpoint — the observable signal | From |
|---|---|---|
| Foundation | Admin named, SSO live for both teams, VPC ready, questionnaire returned. | From: Day-to-day admin, if different · Single sign-on required · product config |
| Compute and CKS | Eval and data-prep jobs running from their own pipeline, surviving a node replacement. | From: What they want set up first — compute capacity and cks, request 1 · product config |
| Data migration | Priority datasets copied and checksummed, with the gap explained. The gate is open or has a dated reason. | From: What they want set up first — storage and data migration, request 1 · product config |
| SUNK | First sweeps running, or scripts ported and waiting on data. Groundwork is an honest answer here. | From: What they want set up first — sunk, request 1 · product config |
| Baseline | A timed reference run on the current setup. | From: Time the core job takes today |

## On track to land before the run

- [ ] Reviewed

| Module | Window | What has to stay true | Drift flag (as of day 1) | From |
|---|---|---|---|---|
| Data migration | 3 to 10 weeks (VERIFY) from approval. If approved in week 1, late October to mid-December | A named data owner and an agreed egress payer, in week 1 | **Drifting (amber)**. Turns red 2026-11-06 if not started | From: Total training data to move · Target go-live date · product config |
| SUNK | 3 to 8 weeks (VERIFY), after the data is readable | Scripts ported before the offsite | **Drifting (amber)**. Turns red 2026-11-06 if not started | From: Must something here be live by day 30? · Target go-live date · product config |
| Compute capacity | VERIFY: set by the capacity plan | A capacity date in writing | Not checked: lead time unresolved, planned as short | From: Seats / contract size · product config |

## What would change this plan

- [ ] Reviewed

1. **The capacity date.** If capacity is not available now, compute becomes
   long and the whole sequence moves.
2. **Who owns and pays for the data move.** 180 TB with no owner is the
   longest pole.
3. **A platform engineer, or not.** Ravi at 10 hours a week, also training
   models, is the whole customer-side budget.

## Downgrades applied in review

- [ ] Reviewed

Step 7 of the skill, run against this draft.

| Claim as drafted | Caught by | What it became |
|---|---|---|
| "CKS live by day 30" | *Not evidence: cluster created, kubectl works, a hello-world pod, a demo deployed by the SE.* | "Eval and data-prep jobs running from their own pipeline." |
| "Data migrated" | *Not evidence: buckets created, a sample dataset uploaded, a transfer started.* | "Priority datasets copied and checksummed, with the gap explained." |
| "SUNK ready for the sweeps" | *Not evidence: Slurm installed, sinfo shows nodes, a test job submitted by the admin.* | "First sweeps running, or scripts ported and waiting on data." |
