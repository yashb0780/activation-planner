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

This is a draft. It has not been agreed with the customer, and eleven of its
inputs are open questions in the handoff.

---

## Week 1 — 1 to 7 October

**Focus:** Open every gate that involves waiting, and capture the baseline
before anyone configures anything.

**Starting**

- Cross-cutting prerequisites: SSO, provisioning question, agent groups,
  business hours, inbound mailbox cutover plan.
- The security review — the week-one action is not submitting a review, it is
  finding out from Dana Whitfield whether one exists and who owns it.
- Discovery credential requests — same shape. Nobody to request from yet.
- Taxonomy work with both desks.
- **Baseline capture.** Time to first response and store ticket volume, neither
  of which exists in the handoff. Both are needed as the comparison point for
  workflow automation evidence, and neither can be recovered once configuration
  starts.

**Reaching evidence this week**

None, and none should. Every module here has a dependency list that is not yet
closed.

**Needed from the customer**

- Dana Whitfield: name a security owner, name an infrastructure contact,
  confirm data residency. Three answers, one conversation, and the three
  questions that gate the longest module on the board.
- Dana Whitfield and Priya Raman, together: is 2027-01-12 fixed or preferred.
  They have not said this to each other in front of us.
- Priya Raman: name the day-to-day admin, with hours actually budgeted.
- Tomas Berg: first contact. Store volume baseline, and the phone-first versus
  ticket-first question.

**Checkpoint:** End of week — are the three discovery gate questions answered,
and is the baseline captured.

**Risks live this week**

- Three of the four questions above route to someone who has been on one
  commercial call. If Dana is unavailable this week, discovery's 8-to-16-week
  clock does not start this week either.
- Configuring anything before the baseline is captured destroys the comparison
  permanently. This is the only irreversible risk in the whole 30 days.

## Week 2 — 8 to 14 October

**Focus:** Settle the taxonomy, because five other things are written against
it. Start the knowledge base habit.

**Starting**

- Service catalog build, once taxonomy closes.
- Knowledge base — from week 2, continuously, per the config's sequencing. Not
  a content migration: article owners per team, a review cadence, and a
  publishing decision.
- Discovery credential collection, if the infrastructure contact was named.

**Reaching evidence this week**

None.

**Needed from the customer**

- Priya Raman and Tomas Berg, in the same room: one process or two. This is the
  decision the catalog and every automation rule sit on, and rebuilding after
  the fact means rebuilding the items.
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

- Workflow automation — internal routing rules only, on catalog items that
  exist. Nothing crossing a system boundary, because those credentials are
  still `UNKNOWN`.

**Reaching evidence this week**

None. The catalog's evidence is an adoption share sustained across two
consecutive weeks, which cannot begin until real requests are arriving.

**Needed from the customer**

- Priya Raman: fulfilment group per item, and confirmation each group has the
  capacity. 23 agents across two desks.
- Whoever holds the endpoint and HR system credentials, still unnamed.

**Checkpoint:** Are 8 to 12 items built, owned, and ready to accept real
traffic.

**Risks live this week**

- If the catalog scope has quietly grown toward a complete catalog, it shows up
  here as a build that will not finish. The config names this as the most
  common reason a go-live date slips.

## Week 4 — 22 to 30 October

**Focus:** Get real requests flowing through live items. Leave room.

**Starting**

- Catalog items live to both desks, and the adoption measurement window opens.
- First automation rules enabled in production.

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
rather than intent.

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
| Cross-cutting prerequisites | SSO live and in use by both desks. A named day-to-day admin with hours budgeted in writing, not a volunteer. Business hours and agent groups defined for both desks. |
| Service catalog | 8 to 12 items live in production, each with a named owner recorded on the item, receiving real requests from both desks. The two-week adoption window has opened. |
| Workflow automation | First rules enabled and visible in execution logs firing on real tickets, not test records. Coverage is the long part and has not started. |
| Knowledge base | Article owners named per team, a review cadence agreed, a publishing decision made, and the first agent-written article published during ticket work. |
| Baseline | Time to first response and store volume captured pre-configuration, labelled as measured or estimated. |

### Started as waiting, with the gate as the signal

| Module | Day-30 checkpoint — the observable signal |
|---|---|
| Discovery | The gate, not the scans. Signals in order: a named security owner; confirmation of whether a review is required; the questionnaire returned if one exists; a named infrastructure contact; credentials received for *n* of the platforms in scope; subnet list supplied; scanner host agreed. Each is observable and each would be false if nothing had happened. |
| Asset management | Nothing, correctly. It is behind the gate. Its day-30 signal is the agreed asset model — what is tracked, at what depth, what is deliberately out of scope — which can be decided while waiting. |

### Not started, and correctly so

| Module | Why |
|---|---|
| Change management | Config ordering rule: change management before trustworthy asset data produces a process nobody believes. Asset data is behind a gate that has not opened. Starting this now would produce a process, not a working one. |

## On track to land after day 30

Windows are the config's lead times, anchored to the event that starts the
clock, with the 1 December to 6 January freeze subtracted. They are windows,
not dates.

| Module | Window | What has to stay true |
|---|---|---|
| Service catalog | Adoption evidence earliest mid-November, if items went live in week 4 and both desks route traffic to them | Starter set, not a complete catalog. Both desk leads bought into one taxonomy. |
| Knowledge base | 6 to 10 weeks from week 2, so mid-November to mid-January, with the freeze pushing the back half into January | The write path holds. Agents keep writing articles during ticket work after the novelty passes. |
| Workflow automation | Per-rule, days. Coverage that moves the numbers, 8 weeks plus from a settled taxonomy — so late November at the earliest, and into January for anything crossing a system boundary | Taxonomy stays settled. Cross-system credentials arrive. |
| Discovery | 8 to 16 weeks **from the gate opening, which has not happened**. If the gate opens in October, the window is December to February; the freeze pushes the early end to January. | The gate opens in October. Every week it stays shut moves this window one week. |
| Asset management | After discovery. Not before February on the most favourable reading. | Discovery output reconciles against an expected count — and the only count available comes from a finance register, labelled an estimate. |
| Change management | Not reachable before the 2027-01-12 go-live. 8 to 12 weeks, longer where no process exists, and no process exists here. Realistically a phase-two item ahead of the 2027-03-31 legacy tool expiry. | Exec backing becomes real. Config: change management fails on adoption, never on configuration. |

**What this means for the January date, said plainly.** A go-live on 2027-01-12
covering one queue, a starter catalog, routing automation and a working
knowledge base is a reasonable target on this evidence. A go-live covering
asset management and change management is not, and no rearrangement of the nine
working weeks makes it so. That is worth putting to Dana and Priya at the day-30
review, alongside the two dates nobody has connected: the distribution centre
in March, and the legacy store desk tool expiring 2027-03-31.

## What would change this plan

1. **The discovery gate opening, or not.** Four of its five dependencies are
   `UNKNOWN` and three route to the exec sponsor. This single conversation
   moves a 16-week module's window by as much as it is delayed, and everything
   downstream with it.
2. **One process or two.** The handoff states one and describes two. Two means
   a larger catalog, more automation, and a January date that needs re-agreeing
   in week 2 rather than at the review.
3. **Fixed or preferred.** Dana and Priya are describing the same date
   differently, and Dana has told the board. There is currently no agreed target
   date to plan against, only two — and the plan above assumes the earlier one.

## Downgrades applied in review

Step 7 of the skill, run against this draft. Each claim below was written, then
caught by a `Not evidence` line in `config/itsm.md`, then restated.

| Claim as drafted | Caught by | What it became |
|---|---|---|
| "Service catalog live at day 30" | *Not evidence: items built, portal branded, a test request submitted by the admin.* | "8 to 12 items live and receiving real requests; the two-week adoption window has opened." Live items are configuration. The evidence is sustained adoption. |
| "Knowledge base seeded — ~200 wiki pages imported" | *Not evidence: N articles imported, search works, the portal is live.* | "Article owners named, review cadence agreed, first agent-written article published." The import is a read-path deliverable and would still be true if nobody touched it. |
| "Workflow automation complete for the starter catalog" | *Not evidence: rules built, a test ticket firing correctly, a walkthrough of the builder.* | "First rules visible in execution logs firing on real tickets." Coverage, and movement in time to first response, are the evidence, and both are weeks out. |
| "Discovery on track" | *Not evidence: a populated asset list, a dashboard with a device count, one successful scan.* | Replaced with named gate signals: security owner, credentials received for *n* platforms, subnet list, scanner host. "On track" asserted progress without making it observable. |
| "Change management kicked off" | *Not evidence: the workflow is built, a board meeting was scheduled, the first change was filed by the admin.* | Moved to "not started, and correctly so," with the config's ordering rule as the reason. A kickoff meeting would have been a scheduled meeting, which is exactly what the config excludes. |

Every one of these passed the config's general test the wrong way: each would
still have been true if nobody at Halden had touched the product since go-live.
