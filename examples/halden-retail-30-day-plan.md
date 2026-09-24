> **Illustrative example output.** Generated from `halden-retail-handoff.md`
> and `halden-retail-board.md`, both fictional.

# Draft 30-day plan — Halden Retail Group

**Status: Draft — 0 of 8 sections reviewed.** Tick each section's box as you
review it. Change this line to `Status: Reviewed` only when every box is ticked.

### Handoff incomplete

The plan is still built. Fill these in the handoff, then regenerate it. The
required fields come from the **Required before planning** table in
`templates/handoff.md`.

| Field | What is missing | Who fills it |
|---|---|---|
| Core volume per month (whatever the product counts) | **Partly missing.** Store volume is `UNKNOWN`. Head office is ~1,400 a month, estimate. | SE — K. Varga |

### People

Tasks below name roles, not people. Each name is looked up here, so a change
to one name changes every task that uses the role. Default owners: us — CSM;
them — Technical owner. A task names other roles only where this plan does.

| Side | Role | Name |
|---|---|---|
| Us | CSM | M. Lindqvist |
| Us | Implementation lead | M. Lindqvist |
| Us | SE | K. Varga |
| Us | Rep | D. Osei |
| Them | Technical owner | Priya Raman |
| Them | Exec sponsor | Dana Whitfield |
| Them | Store support lead | Tomas Berg |
| Them | Day-to-day admin | *not named* (`UNKNOWN`) |
| Them | Security contact | *not named* (`UNKNOWN`) |
| Them | Identity / IT contact | *not named* (`UNKNOWN`) |

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

- [ ] Reviewed

**Focus:** Open every gate that involves waiting, start every discovery task,
and capture the baseline before anyone configures anything.

**Starting**

- **Kickoff setup**, first: quick base-level setup done at kickoff.
  - Roles and permissions for both desks.
    *Owners: us — CSM; them — Technical owner · From: Teams in scope at launch · product config*
    *Done when:* Agent, admin and requester roles exist for both desks · All 23 agents have the right role · One agent from each desk can log in and see their queue
  - Workspace setup, once one workspace or two is decided in week 2.
    *Owners: us — CSM; them — Technical owner, Store support lead · From: Number of teams / workspaces · product config*
    *Done when:* One-or-two workspace decision recorded · Workspace set up and both teams (Head-office IT, Store support) can log in · A test request reaches the right team in each workspace
  - **Draft the success plan, confirm it at kickoff, share it by end of week 1.**
    One page: their goal in their words, the proposed first value, success
    measures with their baselines, milestones with target dates, and the People
    list above. It counts toward the kickoff milestone.
    *Owners: us — CSM; them — Technical owner, Exec sponsor · From: Their stated outcome · How they will know it worked · Number attached, and who reports it upward*
    *Done when:* One-page success plan drafted · Confirmed with Dana and Priya at kickoff · Shared with both by end of week 1
- **The six open questions** from the board, asked at kickoff, each with its
  checklist to tick off as the answers come in.
  *Owners: us — CSM; them — Technical owner, Exec sponsor, Store support lead · From: every `UNKNOWN` in the handoff, listed per question on the board*
  *Done when:* Every checklist line ticked, or given an owner and a date · Each answer saved on its question
- **The catalog scope decision** — a starter set of 8 to 12 request types, or
  a complete catalog. Unresolved in the handoff, planned as a starter set, and
  the largest single lever on the January date. Top of the list.
  *Owners: us — CSM; them — Technical owner · From: Explicitly out of scope for now · product config*
  *Done when:* Starter set or complete catalog, recorded · If starter set: the 8 to 12 request types listed
- **The security review.** `security_review` is `UNKNOWN`, but the config says
  to assume one exists, so the work starts now: find out from Dana Whitfield
  whether a review process exists and who owns sign-off, then open it. Status
  moves from "not started" to submitted as soon as there is someone to submit
  to.
  *Owners: us — CSM; them — Exec sponsor · From: Security review required before deployment · Review status · Who owns security sign-off on their side · product config*
  *Done when:* Security owner named · Review opened, or confirmed not needed, in writing · Sign-off received
- **Discovery credential requests** — same shape. Nobody to request from yet.
  *Owners: us — CSM; them — Exec sponsor · From: Who holds the credentials for each system above · Restrictions on installing software or outbound connections*
  *Done when:* Credentials received for each platform in scope · Subnet list supplied · Scanner host agreed
- **Foundation** — every item from the config, each at its own lead time.
  Foundation starts in week 1; it does not make a long item finish in week 1.
  - SSO, and the provisioning question. Blocked on the identity / IT contact.
    *Owners: us — CSM; them — Identity / IT contact · From: Single sign-on required · Identity provider · Automated user provisioning (SCIM) required · product config*
    *Done when:* SSO switched on for both desks · One agent from each desk signs in through SSO
  - Agent groups and business hours.
    *Owners: us — CSM; them — Technical owner · From: One shared process, or several that genuinely differ · product config*
    *Done when:* An agent group exists for each desk · Business hours set for each group · A test ticket reaches the right group
  - The inbound mailbox cutover plan.
    *Owners: us — CSM; them — Technical owner · From: Tool being replaced, or greenfield · product config*
    *Done when:* Cutover date agreed · The plan says what happens to the old address · A test email to the old address lands in the new queue
  - The **test instance**, which the handoff requires (`separate_envs: yes`).
    *Owners: us — CSM; them — Technical owner · From: Separate test and production required · product config*
    *Done when:* Test instance exists · Priya can log in to it · A change can be tried there before production
  - A day-to-day admin named, with hours budgeted.
    *Owners: us — CSM; them — Exec sponsor · From: Day-to-day admin, if different · Hours per week the technical owner has for this · product config*
    *Done when:* An admin is named · Their weekly hours for this are written down · They have admin access to the product
- **Taxonomy work with both desks.**
  *Owners: us — CSM; them — Technical owner, Store support lead · From: One shared process, or several that genuinely differ · product config*
  *Done when:* Categories and form fields written down · Signed off by both desk leads, not just head office
- **Baseline capture.** Time to first response and store ticket volume, neither
  of which exists in the handoff. Both are the comparison point for workflow
  automation evidence, and neither can be recovered once configuration starts.
  *Owners: us — CSM; them — Technical owner, Store support lead · From: Average time to first response · Core volume per month (whatever the product counts)*
  *Done when:* Time to first response recorded, labelled measured or estimate · Store volume recorded the same way · Both captured before anything is configured
- **Five discovery tasks** — find the monthly volume for each section 6 request
  that has none. Each is a checklist line under open question 1, 4 or 5:

  | Request | Owners | From |
  |---|---|---|
  | "Till and printer faults in the stores" | us — CSM; them — Store support lead | What they want set up first — service catalog, request 3 |
  | "Get the store sheets off the back-room wall and onto a screen" | us — CSM; them — Store support lead | What they want set up first — knowledge base, request 2 |
  | "Find out what is actually on the store networks" | us — CSM; them — Exec sponsor, by default: no security or infrastructure contact is named | What they want set up first — asset management with discovery, request 2 |
  | "Sign-off before anyone touches a store network during trading hours" | us — CSM; them — Technical owner | What they want set up first — change management, request 1 |
  | "The December freeze written down somewhere other than my head" | us — CSM; them — Technical owner | What they want set up first — change management, request 2 |

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

- [ ] Reviewed

**Focus:** Settle the taxonomy, because five other things are written against
it. Start the knowledge base habit.

**Starting**

- **Service catalog build, once taxonomy closes, in volume order:** password
  resets and account unlocks (~380 a month, measured) first, then new starter
  setup (~40 a month, estimate). Till and printer faults wait for their
  discovery task.
  *Owners: us — CSM; them — Technical owner · From: What they want set up first — service catalog, request 1 · What they want set up first — service catalog, request 2*
  *Done when:* Both items published in the catalog · A real request raised through each · Each reaches the right team without being reassigned
- **Knowledge base** — from week 2, continuously, per the config's sequencing.
  First content is the weekly repeat questions (~250 a month, estimate). Not a
  content migration: article owners per team, a review cadence, and a
  publishing decision.
  *Owners: us — CSM; them — Technical owner · From: What they want set up first — knowledge base, request 1 · product config*
  *Done when:* Article owners named for each desk · Review cadence and publishing rule agreed · First article written by an agent during ticket work
- **Discovery credential collection**, if a security or infrastructure contact
  was named.
  *Owners: us — CSM; them — Security contact · From: Who holds the credentials for each system above*
  *Done when:* A security or infrastructure contact named · Credentials received for each platform in scope
- **Change management groundwork:** write down the December freeze and any
  maintenance windows. This is the config's "maintenance windows and freeze
  periods documented" dependency, and it answers Priya's own request. It is
  not the module starting.
  *Owners: us — CSM; them — Technical owner · From: Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · What they want set up first — change management, request 2*
  *Done when:* Freeze dates written down in the product · Maintenance windows written down · Priya confirms both

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

- [ ] Reviewed

**Focus:** Build the starter catalog. Begin automation on the items that now
exist.

**Starting**

- **Workflow automation, in volume order:** routing store tickets and
  head-office tickets to the right desk (~1,400 a month, head office only,
  estimate) first. It is internal, so it needs no outside credentials. The
  joiners-and-leavers rule (70 a month, measured) is second and waits on HR
  system credentials, still `UNKNOWN`.
  *Owners: us — CSM; them — Technical owner · From: What they want set up first — workflow automation, request 1 · What they want set up first — workflow automation, request 2*
  *Done when:* Routing rule switched on in production · A store ticket lands with the store desk · A head-office ticket lands with head office
- **Asset management groundwork:** agree the asset model — what is tracked, at
  what depth, and what is out of scope. One boundary is already set: stock in
  the distribution centres.
  *Owners: us — CSM; them — Technical owner · From: Explicitly out of scope for now · product config*
  *Done when:* What is tracked, written down · At what depth, written down · What is out of scope, written down
- **Change management groundwork:** name the change-board members, and collect
  real examples of each change type. Store network work during trading hours
  is the first one on record.
  *Owners: us — CSM; them — Technical owner · From: What they want set up first — change management, request 1 · product config*
  *Done when:* Change-board members named · A real example each of a standard, normal and emergency change

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

- [ ] Reviewed

**Focus:** Get real requests flowing through live items. Leave room.

**Starting**

- Catalog items live to both desks, and the adoption measurement window opens.
  This is what `day30_required: yes` asked for on the catalog: something live.
  It is not yet the evidence.
  *Owners: us — CSM; them — Technical owner · From: Must something here be live by day 30?*
  *Done when:* Starter items visible to both desks · Both desks have raised real requests through them
- The first routing rule enabled in production.
  *Owners: us — CSM; them — Technical owner · From: What they want set up first — workflow automation, request 1*
  *Done when:* Rule switched on in production · Its execution log shows it firing on a real ticket

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

- [ ] Reviewed

Not a pass/fail list. Three categories.

### Started and moving, with proof

| Module | Day-30 checkpoint — the observable signal | From |
|---|---|---|
| Foundation | SSO live and in use by both desks. A test instance in place. A named day-to-day admin with hours budgeted in writing, not a volunteer. Business hours and agent groups defined for both desks. | From: Single sign-on required · Separate test and production required · Day-to-day admin, if different · One shared process, or several that genuinely differ · product config |
| Service catalog | 8 to 12 items live in production, each with a named owner recorded on the item, receiving real requests from both desks. Password resets first. The two-week adoption window has opened. | From: Products and tiers purchased · Must something here be live by day 30? · product config · What they want set up first — service catalog, request 1 |
| Workflow automation | The routing rule enabled and visible in execution logs firing on real tickets, not test records. Coverage is the long part and has not started. | From: Products and tiers purchased · product config · What they want set up first — workflow automation, request 1 |
| Knowledge base | Article owners named per team, a review cadence agreed, a publishing decision made, and the first agent-written article published during ticket work. | From: Products and tiers purchased · product config · What they want set up first — knowledge base, request 1 |
| Baseline and discovery tasks | Time to first response and store volume captured before configuration, labelled as measured or estimated. Each of the five requests with no volume either has one, or has a named person and a date. | From: Average time to first response · Core volume per month (whatever the product counts) · What they want set up first |

### Started as waiting, with the gate as the signal

| Module | Day-30 checkpoint — the observable signal | From |
|---|---|---|
| Discovery | The gate, not the scans. Signals in order: a named security owner; confirmation of whether a review is required; the questionnaire returned if one exists; a named security contact; credentials received for *n* of the platforms in scope; subnet list supplied; scanner host agreed. Each is observable and each would be false if nothing had happened. | From: Products and tiers purchased · Security review required before deployment · Who holds the credentials for each system above · product config |

### Groundwork only, and correctly so

| Module | First step taken, and why it stops there | From |
|---|---|---|
| Asset management | The asset model agreed in writing — tracked, at what depth, out of scope — and process owners named. It is behind the discovery gate, so groundwork is as far as it can honestly go. The asset list Priya expects by day 30 is not here, and the plan says so at the day-30 review. | From: Products and tiers purchased · Explicitly out of scope for now · product config |
| Change management | Change-board members named, the December freeze and maintenance windows written down, and real examples of each change type collected. Config ordering rule: change management before trustworthy asset data produces a process nobody believes. Starting the module now would produce a process, not a working one. | From: Products and tiers purchased · Process or method they follow today · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |

## On track to land after day 30

- [ ] Reviewed

Windows are the config's lead times, anchored to the event that starts the
clock, with the 1 December to 6 January freeze counted. They are windows, not
dates. Drift flags come from the board's drift check, as of day 1, using the
config's Drift rules.

| Module | Window | What has to stay true | Drift flag (as of day 1) | From |
|---|---|---|---|---|
| Service catalog | Adoption evidence earliest mid-November, if items went live in week 4 and both desks route traffic to them | Starter set, not a complete catalog. Both desk leads bought into one taxonomy. | Not checked: planned as a starter set, which is short | From: Products and tiers purchased · Must something here be live by day 30? · product config |
| Knowledge base | 6 to 10 weeks from week 2, so mid-November to mid-December, with the freeze pushing the back half into January | The write path holds. Agents keep writing articles during ticket work after the novelty passes. | **Drifting (amber)**. Turns red 2026-10-26 if not started | From: Products and tiers purchased · Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |
| Workflow automation | Per-rule, days. Coverage that moves the numbers, 8 weeks plus from a settled taxonomy — if it settles in week 2, that is early December, inside the freeze, so January in practice (inferred: enabling rules is an IT change) | Taxonomy stays settled. HR system credentials arrive. | On time on day 1. Turns red 2026-10-12, before the first rule is planned | From: Products and tiers purchased · Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |
| Discovery | 8 to 16 weeks **from the gate opening, which has not happened**. If the gate opens by 30 October and the freeze halts the work, early February to late March (inferred: agent deployment and firewall changes are IT changes). | The gate opens in October. Every week it stays shut moves this window one week. | **Drifting (amber)**. Turns red 2026-10-12 if not started | From: Products and tiers purchased · Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |
| Asset management | After discovery. Not before February on the most favourable reading, and plausibly after the 2027-03-31 legacy tool expiry. | Discovery output reconciles against an expected count — and the only count available comes from a finance register, labelled an estimate. | Counted inside discovery | From: Products and tiers purchased · Known asset count · product config |
| Change management | Not reachable before the 2027-01-12 go-live. 8 to 12 weeks, longer where no process exists, and no process exists here. Realistically a phase-two item ahead of the 2027-03-31 legacy tool expiry. | Exec backing becomes real. Config: change management fails on adoption, never on configuration. | **Drifting (amber)**. Turns red 2026-10-12 if not started | From: Products and tiers purchased · Target go-live date · Process or method they follow today · product config |

**What this means for the January date, said plainly.** A go-live on 2027-01-12
covering one queue, a starter catalog, routing automation and a working
knowledge base is a reasonable target on this evidence. A go-live covering
asset management and change management is not, and no rearrangement of the
nine working weeks makes it so. That is worth putting to Dana and Priya at the
day-30 review, alongside the two dates nobody has connected: the distribution
centre in March, and the legacy store desk tool expiring 2027-03-31.

## What would change this plan

- [ ] Reviewed

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

- [ ] Reviewed

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
