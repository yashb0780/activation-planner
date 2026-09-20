> **Illustrative example output.** Generated from `halden-retail-handoff.md`,
> which is fictional.

# Activation board — Halden Retail Group

## Read this first

- **Handoff** dated 2026-09-16, filled by D. Osei (AE), received by
  M. Lindqvist (CSM).
- **Config read:** `config/itsm.md`. No private config present.
- **Contract start** 2026-10-01. **Target go-live** 2027-01-12.

**The job, in their words:**

> "We are merging the store-support desk and the head-office IT desk into one
> queue before the new distribution centre opens in March. Right now a store
> manager emails whoever they last spoke to, and nobody can tell me how many
> open requests we have."

**The calendar, before anything else.** Contract start to go-live is 15 weeks.
The handoff states a hard freeze from 1 December to 6 January — five of those
weeks. Working runway is **nine weeks (1 October to 30 November), plus six days
after the freeze lifts**. Every lead time below should be read against nine
weeks, not fifteen.

### Open questions

Every `UNKNOWN` in the handoff, against the module it blocks and the date it
puts at risk.

| Question | Blocks | Date at risk | Ask |
|---|---|---|---|
| Is a security review required before deployment, and who owns sign-off? | Discovery (config names a passed review as its first dependency) | Everything downstream of discovery: asset management, change management | Dana Whitfield — handoff names no security contact |
| Who is the infrastructure / security contact? | Discovery — config notes this owner is almost never the ITSM project owner | Same | Dana Whitfield (*unassigned* in handoff) |
| Are there restrictions on agents, scanners, or outbound connections? | Discovery — scanner host and agent deployment | Same | Follows from the security contact |
| Who holds credentials for the store and DC networks, HR system, endpoint tooling? | Discovery, and any workflow automation reaching another system | Discovery start date, and automation coverage | Priya Raman, then whoever she names |
| Does the directory licence tier include automated user provisioning? | Cross-cutting prerequisites, then service catalog visibility rules | Catalog go-live | Priya Raman |
| Data residency or regional hosting requirements? | Deployment itself | All dates, if the answer is non-standard | Dana Whitfield |
| Average time to first response — no baseline captured | Workflow automation evidence, which is measured against a pre-automation baseline | Not a date. A measurement window: capture it before configuring, or the evidence has nothing to compare against. | Priya Raman, week one |
| Store ticket volume — no baseline captured | Same, plus catalog adoption share | Same | Tomas Berg, who has not been in a call |
| Changes per month and emergency share — no baseline, no process | Change management evidence, which is a ratio that must be falling | Phase two | Priya Raman |
| How many of the ~200 wiki pages are current? | Knowledge base seed set | KB timeline | Priya Raman |
| Who will be the day-to-day admin? | Cross-cutting prerequisites — config asks for budgeted time, not a volunteer | Week one, everything | Priya Raman |

Four of the five discovery dependencies in the config are `UNKNOWN` in this
handoff, and three of them route to a person who has been on one commercial
call. That is the headline finding on this account.

### Conflicts

1. **"Discovery will give you an accurate asset list in the first month" —
   recorded, said to the technical owner, and not deliverable.** The config
   puts discovery at 8 to 16 weeks and calls it the longest pole in most
   deployments. Here the clock has not started, because every credential and
   the security review are `UNKNOWN`. Raise this in week one, with the config's
   dependency list in hand. It is recorded on a call, so it will resurface.
2. **Fixed or preferred is unresolved between the two people who matter.** Dana
   calls 2027-01-12 fixed and has told the board. Priya calls the same date
   what they are aiming for. The handoff notes they have not said this to each
   other in front of us. Until that is settled, there is no agreed target date,
   only two.
3. **The success definition and the retained macro contradict each other.**
   Section 8 says success is Dana no longer receiving the weekly spreadsheet.
   Section 5 says Priya expects the spreadsheet macro to keep running. One of
   those has to give, and it is cheaper to decide it at kickoff than at the
   day-90 review.
4. **"One process" is stated, and the handoff then describes two.** Store
   support is phone-first and same-shift; head office is ticket-first and
   next-day. The config warns that taxonomy changes after catalog items are
   built mean rebuilding them, so this has to be settled before build, not
   during.
5. **The legacy store desk tool expires 2027-03-31 — a harder date than the
   go-live, recorded only in the handoff notes.** Nobody has treated it as a
   constraint. It is the real backstop, and it sits after the go-live date
   everyone is discussing.
6. **The asset baseline comes from a finance register, not an IT source.** It
   is labelled an estimate. The config's discovery evidence requires the found
   device count to reconcile against the customer's expected count — so this
   number will be the yardstick, and it was not built for that.

---

## Step 1 — Week one: cross-cutting prerequisites and opening the long gates

Per the config, these are mostly waiting rather than work, which is exactly why
they start first.

| Item | Lead time | Depends on, and where each stands | Evidence it is real | Status |
|---|---|---|---|---|
| Cross-cutting prerequisites | Short | SSO — directory confirmed, available. Provisioning — licence tier `UNKNOWN`. Agent groups and business hours — not started; blocked on the one-process-or-two question. Inbound email cutover — the shared mailbox is the current front door and needs a plan for what happens to it. Named admin with budgeted time — `UNKNOWN`; Priya is doing this on top of a full-time job with no backfill. Sandbox — the December freeze makes this likely, unconfirmed. | Config does not set module evidence for these; each is either in place or it is not, and each blocks something below | **Gated by UNKNOWN** — provisioning tier, day-to-day admin |
| Open the security review | Long — this is the gate, not a task | No reviewer named, no process known to exist, no confirmation a review is required at all | Config: *"A passed security review. Assume one exists even when nobody has mentioned it."* | **Blocked** — unblocked by Dana Whitfield, by default, because the handoff names nobody |
| Open the credential requests for discovery | Long | Service accounts per platform, subnet list, scanner host, agent deployment approval, infrastructure owner — all `UNKNOWN` | Feeds discovery evidence below | **Blocked** — same owner |

## Step 2 — Weeks 1 to 4: taxonomy, then the service catalog starter set

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status |
|---|---|---|---|---|
| Service catalog | **Unresolved — planned as Short.** The config makes this conditional: short for a starter set of 8 to 12 request types, long if they insist on launching with a complete catalog, "which is the most common reason a go-live date slips." The handoff does not say which. Planned here as a starter set; this is the top week-one decision and the largest single lever on the January date. | Settled taxonomy — **not settled**, and the one-process-or-two conflict sits directly on it. Named approvers plus a cover rule — not started. Requester visibility rules — need provisioning, which is `UNKNOWN`. Fulfilment group per item with confirmed capacity — 23 agents across two desks, one of which has never been on a call. | *"More than half of new requests arrive through catalog items rather than free-text email or a tap on the shoulder, sustained across two consecutive weeks"*; *"At least one approval requested, approved and fulfilled end to end in production, by the real approver rather than the admin testing it"*; *"Low reassignment rate on catalog tickets: requests land on the right team first time"*; *"Every live item has a named owner recorded on the item itself"* | **Ready** — taxonomy can start on day one |

Note the shape of that evidence: it is an adoption measurement sustained over
two consecutive weeks. The earliest it can be true is two weeks after real
requests start arriving through live items, and it is a behaviour change in
240 stores, not a configuration step.

## Step 3 — Weeks 2 to 6: workflow automation

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status |
|---|---|---|---|---|
| Workflow automation | Short per workflow, often days. **Long to reach coverage that changes the team's numbers, 8 weeks plus.** Config: plan it as a sequence of small deliveries, never as one project. | Catalog and taxonomy settled — not yet; the config warns automation written against moving fields gets rewritten. Agent groups, business hours, SLA targets — not defined. Credentials and scopes for the HR system and endpoint tooling — `UNKNOWN`. A named owner for the rules — not named. | *"A measurable share of tickets routed, categorised or resolved with no human touch, compared against the pre-automation baseline in the handoff"*; *"Execution logs showing rules firing in production on real tickets, not test records"*; *"The rules are still enabled 30 days after launch, with no pile of manual workarounds running alongside them"*; *"Time to first response has moved, not just time to assign"* | **Gated by UNKNOWN** for anything crossing a system boundary; internal routing is Ready once taxonomy settles |

**The baseline problem, stated once here because it affects two modules.** Two
of these evidence statements measure against a pre-automation baseline. Average
time to first response is `UNKNOWN` in the handoff and store volume is
`UNKNOWN`. Capture both in week one, before configuring anything. The config is
explicit that a baseline captured after configuration starts is not a baseline,
and there is no way to recover it later.

## Step 4 — Weeks 1 to 12, in parallel: discovery, then asset management

The config splits these and says to split them in the plan or the dates will
lie. Two rows, two dependency lists, two sets of evidence.

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status |
|---|---|---|---|---|
| **Discovery (the gate)** | Long, 8 to 16 weeks, and the longest pole in most deployments. The range does not start until the gate opens. | A passed security review — `UNKNOWN`. Service accounts and credentials per platform — `UNKNOWN`. Network access, firewall rules, subnet list, scanner host — `UNKNOWN`. Approval to deploy agents plus access to their deployment tooling — `UNKNOWN`. An infrastructure owner, who the config notes is almost never the ITSM project owner — `UNKNOWN`, and here the ITSM project owner is the only technical name on the account. | *"Scans running on schedule for at least two consecutive cycles without a manual restart"*; *"Device count found reconciles against the customer's own expected count, with the gap explained rather than ignored"*; *"Unidentified and duplicate records below an agreed threshold"*; *"Relationships between devices, services and software populated, not just rows of hardware"* | **Blocked** — five dependencies, five `UNKNOWN`. Owner: Dana Whitfield, by default |
| **Asset management** | Long. Cannot start before the gate clears. | Discovery output, or a clean import — neither exists. Agreed asset model — not started. Assignment rules needing directory or HR data — HR integration credentials `UNKNOWN`. Named process owners for purchase, assignment, reclaim, disposal — not named. | *"Assets referenced on incidents and changes by agents doing normal work, without being told to"*; *"A spot audit of 20 random records matches physical or cloud reality above an agreed rate"*; *"Lifecycle events (assign, reclaim, retire) recorded in the product, and the parallel spreadsheet has actually been retired"*; *"Stale record share (not seen by discovery in 30 days) is tracked and trending down"* | **Blocked** — behind the gate |

## Step 5 — After asset data is trustworthy: change management

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status |
|---|---|---|---|---|
| Change management | Long, 8 to 12 weeks, **and longer where no change process exists today**. The handoff says none exists — no framework, and no baseline for changes per month because there is nothing to count. Config: you are implementing a process, not a module. | Asset and CMDB data of usable quality — blocked behind a blocked gate. Change types with real examples — none. Approval chains, board membership, a standing meeting on calendars — none. Maintenance windows and freeze periods — the December freeze is documented, nothing else. Integration with where work happens — `UNKNOWN`. Executive backing — Dana has been on one commercial call and no technical call. Config: change management fails on adoption, never on configuration. | *"Changes are raised before the work happens. The ratio of retroactive and emergency changes to planned ones is the single best indicator, and it should be falling."*; *"The change board runs from the product's queue, not a spreadsheet or a slide"*; *"Standard change templates used repeatedly by engineers without help from the admin"*; *"Failed change and rollback rates being reported, which means somebody is actually looking"*; *"Changes reference affected assets or services, which is only possible if the asset data holds up"* | **Blocked** — correctly last, and not reachable by the target go-live |

## Step 6 — From week 2, continuously: knowledge base

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status |
|---|---|---|---|---|
| Knowledge base | Long, 6 to 10 weeks. Config: the tool is ready on day one; the content, the owners, and the habit of writing articles are the actual work. It is content-limited, so it never finishes if it waits for a slot. | Same taxonomy as the catalog — not settled. A seed set — ~200 wiki pages exist, currency `UNKNOWN`, and stores keep printed sheets that are not in the wiki at all. Named article owners per team and a review cadence — none. A publishing decision — not made. End-user portal access — needs the same visibility rules as the catalog, which need provisioning. | *"Articles are linked from resolved tickets, and that rate is rising month over month"*; *"Articles created by agents during ticket work in the last 30 days"*; *"Self-service or deflected sessions tracked against the handoff baseline"*; *"Only a small share of articles are past their review date"* | **Ready** — starts week 2 and runs continuously |

The config singles out one of those: articles created by agents during ticket
work is "the one that matters: the read path is easy, the write path is where
knowledge bases die." Note that the commitment recorded in the handoff — "we
can import your wiki" — is a read-path promise. It is deliverable and it is not
the same thing as this module working.

---

## Ordering rules, stated plainly

The config gives two. Both apply here:

- **Change management before trustworthy asset data produces a process nobody
  believes.** Asset data here is behind a gate that has not opened. Change
  management is therefore out of the go-live scope, and saying so early is
  cheaper than discovering it in January.
- **Automation before a settled taxonomy produces rework.** The taxonomy is
  unsettled and has a live disagreement under it — one process or two. Nothing
  gets built against it until that is closed.

## Where these plans usually slip, checked against this handoff

| Known failure mode | Here |
|---|---|
| The security review surfaces in week six instead of week one | **Already happening.** It is `UNKNOWN` at handoff, with no named owner. This is the one to fix first. |
| The named technical owner also has a day job, and the project is the part that gives | **Already happening.** Stated outright in section 2: no backfill, running the desk day to day, five months in seat. |
| The customer holds out for a complete catalog at launch instead of a starter set | **Not yet visible.** Nobody has asked. Ask in week one, before they form a view. |
| The knowledge base is treated as a content migration rather than a habit to build | **Already happening.** The only KB conversation on record is "we can import your wiki." |
| Discovery credentials are owned by a team that was never in the kickoff | **Already happening.** No infrastructure contact exists in the handoff at all. |
| Change management was sold to the exec sponsor and never explained to the engineers expected to file changes | **Not yet visible, and set up to happen.** Dana bought it on one commercial call. No engineer has been in a conversation about it. |

Five of six are live or set up to happen. That is not unusual and it is not a
reason to panic — it is the week-one agenda.
