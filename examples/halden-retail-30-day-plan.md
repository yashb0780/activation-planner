> **Illustrative example output.** Generated from `halden-retail-handoff.md`
> and `halden-retail-board.md`, both fictional.

# Draft 30-day plan — Halden Retail Group

**Day 1 is 2026-10-01**, the contract start date. Day 30 is 2026-10-30.

**What this document is.** Most of what Halden bought has a lead time longer
than this window — discovery runs 8 to 16 weeks, change management 8 to 12 and
longer where no process exists. A 30-day plan against those numbers is not a
list of things that will be finished. It answers three questions: what got
started, what proof exists that it is moving, and what is on track to land
after day 30. Nothing below is late because it is unfinished at day 30.

Every purchased module gets a first step inside the 30 days. For some, the
first step is groundwork, which is the honest first step when the config says
the module waits on something else.

This is a draft. It has not been agreed with the customer. Eighteen of its
inputs are open questions in the handoff, and five requests have no volume yet.

---

## Week 1 — 1 to 7 October

**Focus:** Open every gate that involves waiting, start every discovery task,
and capture the baseline before anyone configures anything.

**Starting**

- **The catalog scope decision** — a starter set of 8 to 12 request types, or
  a complete catalog. Unresolved in the handoff, planned as a starter set, and
  the largest single lever on the January date. Top of the list.
- **The security review.** `security_review` is `UNKNOWN`, but the config says
  to assume one exists, so the work starts now: find out from Dana Whitfield
  whether a review process exists and who owns sign-off, then open it. Status
  moves from "not started" to submitted as soon as there is someone to submit
  to.
- **Discovery credential requests** — same shape. Nobody to request from yet.
- **Cross-cutting prerequisites:** SSO (required), the provisioning question,
  the identity / IT contact, agent groups, business hours, the inbound mailbox
  cutover plan, and the **test instance**, which the handoff requires
  (`separate_envs: yes`).
- **Taxonomy work with both desks.**
- **Baseline capture.** Time to first response and store ticket volume, neither
  of which exists in the handoff. Both are the comparison point for workflow
  automation evidence, and neither can be recovered once configuration starts.
- **Five discovery tasks** — find the monthly volume for each section 6 request
  that has none:

  | Request | Owner |
  |---|---|
  | "Till and printer faults in the stores" | Tomas Berg |
  | "Get the store sheets off the back-room wall and onto a screen" | Tomas Berg |
  | "Find out what is actually on the store networks" | *Unassigned* — Dana Whitfield |
  | "Sign-off before anyone touches a store network during trading hours" | Priya Raman |
  | "The December freeze written down somewhere other than my head" | Priya Raman |

**Reaching evidence this week**

None, and none should. Every module here has a dependency list that is not yet
closed.

**Needed from the customer**

- Dana Whitfield: name a security owner, a security contact, and an identity /
  IT contact, and confirm data residency. One conversation, and the questions
  that gate the longest module on the board.
- Dana Whitfield and Priya Raman, together: is 2027-01-12 fixed or preferred.
  They have not said this to each other in front of us.
- Dana Whitfield: a day-to-day admin with hours budgeted. Priya has about 4
  hours a week.
- Priya Raman: whether automated provisioning is required; who holds each
  credential; whether anything in workflow automation must be live by day 30;
  what is out of scope for workflow automation and change management.
- Priya Raman: the asset list conversation. She expects it by day 30, and the
  config's lead time does not support that (board conflict 1).
- Tomas Berg, introduced by Priya: first contact. Store volume baseline, the
  two store-side discovery tasks, and the phone-first versus ticket-first
  question.

**Checkpoint:** End of week — are the discovery gate questions answered, is the
baseline captured, and does each discovery task have an answer or a date for
one.

**Risks live this week**

- Most of the gate questions route to someone who has been on one commercial
  call. If Dana is unavailable this week, discovery's 8-to-16-week clock does
  not start this week either.
- The asks on Priya's list above are more than 4 hours of work (inferred).
  Without a named admin, week one queues behind her day job.
- Configuring anything before the baseline is captured destroys the comparison
  permanently. This is the only irreversible risk in the whole 30 days.

## Week 2 — 8 to 14 October

**Focus:** Settle the taxonomy, because five other things are written against
it. Start the knowledge base habit.

**Starting**

- **Service catalog build, once taxonomy closes, in volume order:** password
  resets and account unlocks (~380 a month, measured) first, then new starter
  setup (~40 a month, estimate). Till and printer faults wait for their
  discovery task.
- **Knowledge base** — from week 2, continuously, per the config's sequencing.
  First content is the weekly repeat questions (~250 a month, estimate). Not a
  content migration: article owners per team, a review cadence, and a
  publishing decision.
- **Discovery credential collection**, if a security or infrastructure contact
  was named.
- **Change management groundwork:** write down the December freeze and any
  maintenance windows. This is the config's "maintenance windows and freeze
  periods documented" dependency, and it answers Priya's own request. It is
  not the module starting.

**Reaching evidence this week**

None.

**Needed from the customer**

- Priya Raman and Tomas Berg, in the same room: one process or two, and one
  workspace or two. This is the decision the catalog and every automation rule
  sit on, and rebuilding after the fact means rebuilding the items.
- The rest of the starter set. The handoff names three requests; a starter set
  is 8 to 12.
- Named approvers per catalog item, plus what happens when an approver is on
  leave.

**Checkpoint:** Is the taxonomy signed off by both desk leads, not just the
head-office one.

**Risks live this week**

- The handoff says "one process" and then describes two. If that resolves into
  two, the catalog starter set roughly doubles and the January date needs
  revisiting immediately, not in November.
- Tomas Berg is being asked to agree to something in his second week of
  contact with us.

## Week 3 — 15 to 21 October

**Focus:** Build the starter catalog. Begin automation on the items that now
exist.

**Starting**

- **Workflow automation, in volume order:** routing store tickets and
  head-office tickets to the right desk (~1,400 a month, head office only,
  estimate) first. It is internal, so it needs no outside credentials. The
  joiners-and-leavers rule (70 a month, measured) is second and waits on HR
  system credentials, still `UNKNOWN`.
- **Asset management groundwork:** agree the asset model — what is tracked, at
  what depth, and what is out of scope. One boundary is already set: stock in
  the distribution centres.
- **Change management groundwork:** name the change-board members, and collect
  real examples of each change type. Store network work during trading hours
  is the first one on record.

**Reaching evidence this week**

None. The catalog's evidence is an adoption share sustained across two
consecutive weeks, which cannot begin until real requests are arriving.

**Needed from the customer**

- Priya Raman: fulfilment group per catalog item, and confirmation each group
  has the capacity. 23 agents across two desks.
- Whoever holds the HR system and endpoint management credentials, still
  unnamed.
- Named process owners for asset purchase, assignment, reclaim and disposal.

**Checkpoint:** Are 8 to 12 catalog items built, owned, and ready to accept
real traffic, and is the asset model written down.

**Risks live this week**

- If the catalog scope has quietly grown toward a complete catalog, it shows up
  here as a build that will not finish. The config names this as the most
  common reason a go-live date slips.

## Week 4 — 22 to 30 October

**Focus:** Get real requests flowing through live items. Leave room.

**Starting**

- Catalog items live to both desks, and the adoption measurement window opens.
  This is what `day30_required: yes` asked for on the catalog: something live.
  It is not yet the evidence.
- The first routing rule enabled in production.

**Reaching evidence this week**

Possible, one item only: *"At least one approval requested, approved and
fulfilled end to end in production, by the real approver rather than the admin
testing it."* This needs a real approver, not Priya testing it, which is the
whole point of how the config words it.

**Needed from the customer**

- A real approver to approve a real request.
- Store-side communication that the front door has changed. The failure mode
  Halden named — store managers still emailing individuals — starts being
  either avoided or confirmed this week.

**Checkpoint:** Day 30 review, 30 October, with Priya Raman and Dana Whitfield.
This is the meeting where the January date gets re-agreed against evidence
rather than intent, and where the asset list expectation is settled.

**Risks live this week**

- Week 4 is deliberately lighter than weeks 2 and 3. Slip from the taxonomy
  decision lands here.
- The December freeze is five weeks away. Everything not started by the end of
  November stops until 6 January.

---

## Where this stands at day 30

Not a pass/fail list. Three categories.

### Started and moving, with proof

| Module | Day-30 checkpoint — the observable signal |
|---|---|
| Cross-cutting prerequisites | SSO live and in use by both desks. A test instance in place. A named day-to-day admin with hours budgeted in writing, not a volunteer. Business hours and agent groups defined for both desks. |
| Service catalog | 8 to 12 items live in production, each with a named owner recorded on the item, receiving real requests from both desks. Password resets first. The two-week adoption window has opened. |
| Workflow automation | The routing rule enabled and visible in execution logs firing on real tickets, not test records. Coverage is the long part and has not started. |
| Knowledge base | Article owners named per team, a review cadence agreed, a publishing decision made, and the first agent-written article published during ticket work. |
| Baseline and discovery tasks | Time to first response and store volume captured before configuration, labelled as measured or estimated. Each of the five requests with no volume either has one, or has a named person and a date. |

### Started as waiting, with the gate as the signal

| Module | Day-30 checkpoint — the observable signal |
|---|---|
| Discovery | The gate, not the scans. Signals in order: a named security owner; confirmation of whether a review is required; the questionnaire returned if one exists; a named security contact; credentials received for *n* of the platforms in scope; subnet list supplied; scanner host agreed. Each is observable and each would be false if nothing had happened. |

### Groundwork only, and correctly so

| Module | First step taken, and why it stops there |
|---|---|
| Asset management | The asset model agreed in writing — tracked, at what depth, out of scope — and process owners named. It is behind the discovery gate, so groundwork is as far as it can honestly go. The asset list Priya expects by day 30 is not here, and the plan says so at the day-30 review. |
| Change management | Change-board members named, the December freeze and maintenance windows written down, and real examples of each change type collected. Config ordering rule: change management before trustworthy asset data produces a process nobody believes. Starting the module now would produce a process, not a working one. |

## On track to land after day 30

Windows are the config's lead times, anchored to the event that starts the
clock, with the 1 December to 6 January freeze counted. They are windows, not
dates.

| Module | Window | What has to stay true |
|---|---|---|
| Service catalog | Adoption evidence earliest mid-November, if items went live in week 4 and both desks route traffic to them | Starter set, not a complete catalog. Both desk leads bought into one taxonomy. |
| Knowledge base | 6 to 10 weeks from week 2, so mid-November to mid-December, with the freeze pushing the back half into January | The write path holds. Agents keep writing articles during ticket work after the novelty passes. |
| Workflow automation | Per-rule, days. Coverage that moves the numbers, 8 weeks plus from a settled taxonomy — if it settles in week 2, that is early December, inside the freeze, so January in practice (inferred: enabling rules is an IT change) | Taxonomy stays settled. HR system credentials arrive. |
| Discovery | 8 to 16 weeks **from the gate opening, which has not happened**. If the gate opens by 30 October and the freeze halts the work, early February to late March (inferred: agent deployment and firewall changes are IT changes). | The gate opens in October. Every week it stays shut moves this window one week. |
| Asset management | After discovery. Not before February on the most favourable reading, and plausibly after the 2027-03-31 legacy tool expiry. | Discovery output reconciles against an expected count — and the only count available comes from a finance register, labelled an estimate. |
| Change management | Not reachable before the 2027-01-12 go-live. 8 to 12 weeks, longer where no process exists, and no process exists here. Realistically a phase-two item ahead of the 2027-03-31 legacy tool expiry. | Exec backing becomes real. Config: change management fails on adoption, never on configuration. |

**What this means for the January date, said plainly.** A go-live on 2027-01-12
covering one queue, a starter catalog, routing automation and a working
knowledge base is a reasonable target on this evidence. A go-live covering
asset management and change management is not, and no rearrangement of the
nine working weeks makes it so. That is worth putting to Dana and Priya at the
day-30 review, alongside the two dates nobody has connected: the distribution
centre in March, and the legacy store desk tool expiring 2027-03-31.

## What would change this plan

1. **The discovery gate opening, or not.** Four of its five dependencies are
   `UNKNOWN` and most route to the exec sponsor. This single conversation moves
   a 16-week module's window by as much as it is delayed, and the asset list
   expectation with it.
2. **One process or two.** The handoff states one and describes two, and the
   workspace count is undecided. Two means a larger catalog, more automation,
   and a January date that needs re-agreeing in week 2 rather than at the
   review.
3. **Fixed or preferred.** Dana and Priya are describing the same date
   differently, and Dana has told the board. There is currently no agreed
   target date to plan against, only two — and the plan above assumes the
   earlier one.

## Downgrades applied in review

Step 7 of the skill, run against this draft. Each claim below was written, then
caught by a `Not evidence` line in `config/itsm.md`, then restated.

| Claim as drafted | Caught by | What it became |
|---|---|---|
| "Asset list delivered by day 30, as required" | *Not evidence: a populated asset list, a dashboard with a device count, one successful scan.* | "Asset model agreed in writing and process owners named; the discovery gate signals are the day-30 checkpoint." A list would not be evidence even if it existed, and the lead time says it cannot exist yet. |
| "Service catalog live at day 30, meeting the day-30 requirement" | *Not evidence: items built, portal branded, a test request submitted by the admin.* | "8 to 12 items live and receiving real requests; the two-week adoption window has opened." Live items meet what the customer asked for. The evidence is sustained adoption. |
| "Knowledge base seeded — ~200 wiki pages imported" | *Not evidence: N articles imported, search works, the portal is live.* | "Article owners named, review cadence agreed, first agent-written article published." The import is a read-path deliverable and would still be true if nobody touched it. |
| "Routing automation done for head-office tickets" | *Not evidence: rules built, a test ticket firing correctly, a walkthrough of the builder.* | "The routing rule visible in execution logs firing on real tickets." Coverage, and movement in time to first response, are the evidence, and both are weeks out. |
| "Discovery on track" | *Not evidence: a populated asset list, a dashboard with a device count, one successful scan.* | Replaced with named gate signals: security owner, credentials received for *n* platforms, subnet list, scanner host. "On track" asserted progress without making it observable. |
| "Change management started — freeze documented and change board scheduled" | *Not evidence: the workflow is built, a board meeting was scheduled, the first change was filed by the admin.* | Moved to "groundwork only, and correctly so." Writing down the freeze and naming board members is groundwork for its dependencies, and a scheduled board meeting is exactly what the config excludes. |

Every one of these passed the config's general test the wrong way: each would
still have been true if nobody at Halden had touched the product since go-live.
