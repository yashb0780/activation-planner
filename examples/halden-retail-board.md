> **Illustrative example output.** Generated from `halden-retail-handoff.md`,
> which is fictional.

# Activation board — Halden Retail Group

**Status: Draft — 0 of 10 sections reviewed.** Tick each section's box as you
review it. Change this line to `Status: Reviewed` only when every box is ticked.

### Handoff incomplete

The board is still built. Fill these in the handoff, then regenerate it. The
required fields come from the **Required before planning** table in
`templates/handoff.md`.

| Field | What is missing | Who fills it |
|---|---|---|
| Core volume per month (whatever the product counts) | **Partly missing.** Store volume is `UNKNOWN`. Head office is ~1,400 a month, estimate. | SE — K. Varga |

## Read this first

- [ ] Reviewed

- **Handoff** dated 2026-09-16, filled by D. Osei (rep) and K. Varga (SE),
  received by M. Lindqvist (implementation lead).
- **Config read:** `config/itsm.md`. No private config present.
- **Contract start** 2026-10-01. **Target go-live** 2027-01-12.

**The job, in their words** (discovery call, 2026-08-27, recorded):

> "We are merging the store-support desk and the head-office IT desk into one
> queue before the new distribution centre opens in March. Right now a store
> manager emails whoever they last spoke to, and nobody can tell me how many
> open requests we have."

**Why now** (commercial call, 2026-09-04): Dana asked for the open-request
count at the July board meeting, and nobody could produce one for store
support.

**The calendar, before anything else.** Contract start to go-live is 15 weeks.
The handoff states a hard freeze from 1 December to 6 January — five of those
weeks. Working runway is **nine weeks (1 October to 30 November), plus six days
after the freeze lifts**. Every lead time below should be read against nine
weeks, not fifteen.

**Fixed or preferred:** `UNKNOWN`. Dana describes 2027-01-12 as fixed. Priya,
on a later call, described it as "what we are aiming for".

**Unsourced answers that decisions rest on.** `target_date`, `date_driver`, and
`process_shape` have no source in the handoff. All three shape the sequence
below. Confirm where each came from at kickoff.

### Open questions

Every `UNKNOWN`, and every request with no volume, grouped into six open
questions to ask at kickoff. Each keeps its original questions as a checklist,
so the answer can be ticked off line by line. Nothing is dropped, only
regrouped.

**1. "Walk me through your current setup and the systems involved."**
Blocks discovery, the longest pole. Date at risk: everything downstream of
discovery. Ask: Priya Raman.
- [ ] Any restrictions on installing software or outbound connections? *From: Restrictions on installing software or outbound connections*
- [ ] Who holds the credentials for each system? Priya holds only the wiki. *From: Who holds the credentials for each system above*
- [ ] What is actually on the store networks, and roughly how much of it? *From: What they want set up first — asset management with discovery, request 2*
- [ ] Any languages or frameworks we have to work with? (Not yet a finding.) *From: Languages or frameworks we have to work with*
- [ ] Where does documentation live, and how many of the ~200 wiki pages are current? *From: Where their documentation lives today · Existing knowledge articles*
- [ ] Any data residency or regional hosting requirements? *From: Data residency or regional hosting requirements*

*From: Restrictions on installing software or outbound connections · Who holds the credentials for each system above · What they want set up first — asset management with discovery, request 2 · Languages or frameworks we have to work with · Where their documentation lives today · Existing knowledge articles · Data residency or regional hosting requirements*

**2. "Who works on each system today, and who has admin access?"**
Blocks discovery and Foundation (SSO, admin). Date at risk: discovery start and
catalog go-live. Ask: *unassigned* — routed to Dana Whitfield, with Priya
Raman.
- [ ] Is a security review required, and who owns sign-off? *From: Security review required before deployment · Who owns security sign-off on their side*
- [ ] Who is the security contact? *From: Security contact*
- [ ] Who is the identity / IT contact? *From: Identity / IT contact*
- [ ] Who will be the day-to-day admin? Priya expects to name someone from the service desk. *From: Day-to-day admin, if different*
- [ ] Is automated user provisioning required, and does the licence tier include it? *From: Automated user provisioning (SCIM) required*

*From: Security review required before deployment · Who owns security sign-off on their side · Security contact · Identity / IT contact · Day-to-day admin, if different · Automated user provisioning (SCIM) required*

**3. "What has to be true on day 30 for this to feel like a win?"**
Blocks workflow automation and change management scope, and the automation
evidence baseline. Date at risk: day 30; the baselines cannot be recovered once
configuration starts. Ask: Priya Raman and Tomas Berg.
- [ ] Must anything in workflow automation be live by day 30? *From: Must something here be live by day 30?*
- [ ] What is out of scope for workflow automation and change management? *From: Explicitly out of scope for now*
- [ ] What is average time to first response today? *From: Average time to first response*
- [ ] What is store ticket volume per month? Head office is ~1,400, estimate. *From: Core volume per month (whatever the product counts)*

*From: Must something here be live by day 30? · Explicitly out of scope for now · Average time to first response · Core volume per month (whatever the product counts)*

**4. "What comes in most often that we have not counted yet?"**
Two section 6 requests with no volume, so neither is ranked. Date at risk: the
catalog and knowledge base build order. Ask: Tomas Berg, introduced by Priya.
- [ ] Till and printer faults in the stores: how many a month? *From: What they want set up first — service catalog, request 3*
- [ ] Store sheets on the back-room wall: how many, and how often do they change? *From: What they want set up first — knowledge base, request 2*

*From: What they want set up first — service catalog, request 3 · What they want set up first — knowledge base, request 2*

**5. "How do changes happen today, and who signs them off?"**
Change management groundwork. Date at risk: phase two. Ask: Priya Raman.
- [ ] How many changes a month, and what share are emergency? No change process exists today. *From: Changes per month, and share that are emergency*
- [ ] Sign-off before anyone touches a store network in trading hours: how often? *From: What they want set up first — change management, request 1*
- [ ] The December freeze: can we write it down with you, with any maintenance windows? *From: Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · What they want set up first — change management, request 2*

*From: Changes per month, and share that are emergency · What they want set up first — change management, request 1 · What they want set up first — change management, request 2 · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze)*

**6. "Who else needs to agree to this, and what else did you look at?"**
Blocks the taxonomy, and so the catalog and automation. Date at risk: catalog
build, weeks 2 to 3. Ask: Tomas Berg; alternatives to D. Osei.
- [ ] Has anyone outside the buying team agreed to this? Tomas Berg has not been on a call. *From: Has anyone outside the buying team agreed to this*
- [ ] What alternatives did they consider? (Not yet a finding.) *From: Alternatives they considered*

*From: Has anyone outside the buying team agreed to this · Alternatives they considered*

The open questions route most of their weight to someone who has been on one
commercial call. That is still the headline finding on this account.

### Conflicts

1. **Asset management: day 30 "yes" against an 8-to-16-week gate.** Section 6
   says `day30_required: yes` for asset management with discovery — "Expects
   the asset list promised in the demo" (technical call, 2026-09-02). That
   promise is the recorded commitment "Discovery will give you an accurate
   asset list in the first month" (demo call 2026-08-27), with deliverability
   `UNKNOWN`. The config puts discovery at 8 to 16 weeks, calls it the longest
   pole in most deployments, and lists a populated asset list as *not*
   evidence. The clock has not started, because the security review and every
   credential are `UNKNOWN`. **The lead time does not support this
   expectation.** Raise it in week one with Priya, with the config's dependency
   list in hand. It is recorded twice, so it will resurface.
   *From: Must something here be live by day 30? · Commitments made during the sales cycle*
2. **Fixed or preferred is unresolved between the two people who matter.** Dana
   calls 2027-01-12 fixed and has told the board. Priya calls the same date
   what they are aiming for. The handoff notes they have not said this to each
   other in front of us. Until that is settled there is no agreed target date,
   only two. Raise it in week one, with both in the room.
   *From: Fixed or preferred*
3. **"One process" is stated, and the handoff then describes two.**
   `process_shape` is `shared` (unsourced), but store support is phone-first
   and same-shift, and head office is ticket-first and next-day. `team_count`
   leaves one workspace or two undecided. The config warns that taxonomy
   changes after catalog items are built mean rebuilding them, so this has to
   be settled in week 2, before build.
   *From: One shared process, or several that genuinely differ · Number of teams / workspaces · product config*
4. **The technical owner has about 4 hours a week** (Priya's own estimate,
   technical call, 2026-09-02) and no backfill, and no day-to-day admin is
   named. The config asks for "a named admin on the customer side with time
   actually budgeted, not an interested volunteer." Nine working weeks at four
   hours is the whole customer-side budget unless an admin is named (inferred).
   Raise it in week one with Dana, as the exec sponsor.
   *From: Hours per week the technical owner has for this · Day-to-day admin, if different · product config*
5. **The success definition and the retained macro contradict each other.**
   Success is Dana no longer receiving the weekly spreadsheet. Priya expects
   the spreadsheet macro to keep running. One of those has to give, and it is
   cheaper to decide at kickoff than at the day-90 review.
   *From: How they will know it worked · Anything already built or automated they expect to keep*
6. **The legacy store desk tool expires 2027-03-31 — a harder date than the
   go-live, recorded only in the handoff notes.** Nobody has treated it as a
   constraint. It is the real backstop, and it sits after the go-live date
   everyone is discussing.
   *From: Tool being replaced, or greenfield · Handoff notes*
7. **The asset baseline comes from a finance register, not an IT source.** It
   is labelled an estimate. The config's discovery evidence requires the found
   device count to reconcile against the customer's expected count, so this
   number will be the yardstick, and it was not built for that.
   *From: Known asset count · product config*

### First value (proposed, confirm at kickoff) (inferred)

**Password resets and unlocks flow into one queue**

- **Volume:** about 380 a month, head office, measured
- **Proof:** Dana reads the open count without asking
- **Why first:** highest volume, needed live by day 30

*From: What they want set up first — service catalog, request 1 · Their stated outcome*

*Why?* Section 6: the highest-volume request in a module needed live by day
30. Tied to `success_outcome`: one queue for both desks, and one number Dana
can read without asking anyone for it.

### Milestones (inferred)

1. **Kickoff done**, by end of week 1
   - Target date fixed or preferred (item: is 12 January 2027 fixed or preferred?)
   - Starter set or full catalog (item: decide starter set or complete catalog)
   - Spreadsheet or macro decided (item: decide retire the spreadsheet or keep the macro)
   - Success plan confirmed and shared (item: draft success plan, confirm at kickoff)
2. **Prerequisites cleared**, by day 30 (the Foundation gate)
   - SSO live for both desks (item: set up single sign-on)
   - Test instance ready (item: request the test instance)
   - Admin named, hours budgeted (item: get a day-to-day admin named)
   - Business hours and agent groups set (item: define agent groups and business hours)
3. **First value live**, by day 30
   - Password resets live in catalog (item: build password resets catalog item)
   - Real requests from both desks (item: catalog items live to both desks)
4. **Day 30 review**, by day 30
   - January date re-agreed on evidence (item: day 30 review)
   - Asset list expectation settled (item: day 30 review)

---

## Step 1 — Week one: Kickoff setup, Foundation, and opening the long gates

- [ ] Reviewed

Per the config, these are mostly waiting rather than work, which is exactly why
they start first.

### Kickoff setup

Quick setup done at kickoff, first in week 1: the config's Kickoff setup items,
plus the success plan.

| Kickoff setup item | Where it stands | Status | From |
|---|---|---|---|
| Roles and permissions | Two desks at launch: head-office IT (9 agents) and store support (14 agents). Nothing set yet. | **Ready** | From: Teams in scope at launch · product config |
| Workspace setup | `team_count`: 2 teams at launch, one workspace or two not decided. Sits on the one-process-or-two conflict. | **Blocked** — decided in week 2 by Priya Raman and Tomas Berg | From: Number of teams / workspaces · One shared process, or several that genuinely differ · product config |
| Success plan: draft, confirm at kickoff, share by end of week 1 | Built from their stated outcome, the first value, the baselines and the milestones. | **Ready** | From: Their stated outcome · How they will know it worked · Number attached, and who reports it upward |

### Foundation

Every Foundation item from the config starts in week 1 and keeps its own lead
time. Foundation does not make a long item short.

| Foundation item | Lead time | Where it stands | Expected to finish | Status | From |
|---|---|---|---|---|---|
| SSO and provisioning | **Unresolved — planned as Short.** Config: short when the identity team is in the room, long when it sits outside the buying team. | SSO required (`sso_required: yes`), and their identity provider has SSO available. Identity / IT contact — `UNKNOWN`. Provisioning — `provisioning_required` and the licence tier both `UNKNOWN`. | Week 1 to 2 if the identity team is reached in week 1; otherwise a long-lead item that finishes later | **Gated by UNKNOWN** — `identity_contact`, `provisioning_required` | From: Single sign-on required · Identity provider · Identity / IT contact · Automated user provisioning (SCIM) required · product config |
| Agent groups and business hours | Short | Not started; blocked on the one-process-or-two question. | Week 2 | **Blocked** — same decision | From: One shared process, or several that genuinely differ · product config |
| Inbound email cutover | Short | The shared mailbox is the current front door and needs a plan for what happens to it. | Week 1 to 2 | **Ready** | From: Tool being replaced, or greenfield · product config |
| Test instance | Short | **Required** (`separate_envs: yes`), and the December freeze is why the config asks for one. | Week 1 | **Ready** — request it in week one | From: Separate test and production required · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |
| Admin named, hours budgeted | Short to name; the time budget is what slips | `admin` — `UNKNOWN`; Priya expects to name someone from the service desk. Priya has about 4 hours a week and no backfill. | Week 1 to name; the budget is the risk | **Gated by UNKNOWN** — `admin` | From: Day-to-day admin, if different · Hours per week the technical owner has for this · product config |

### Opening the long gates

| Item | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Open the security review | Long — this is the gate, not a task | `security_review` — `UNKNOWN`. `security_review_status` — not started. `security_signoff` — `UNKNOWN`. `security_contact` — `UNKNOWN`. DPA signed at contract; nothing else raised. Priya asked what certifications we hold; nothing formally requested. | Config: *"A passed security review. Assume one exists even when nobody has mentioned it."* | **Blocked** — unblocked by Dana Whitfield, by default, because the handoff names nobody. Work starts in week one regardless: find out whether a review exists and who owns it, then open it. | From: Security review required before deployment · Review status · Who owns security sign-off on their side · Security contact · Open items at signature (questionnaire, pen test report, DPA, insurance) · Certifications they need from us · product config |
| Open the credential requests for discovery | Long | Service accounts per platform, subnet list, scanner host, agent deployment approval, infrastructure owner — all `UNKNOWN`. `credential_holders` is `UNKNOWN` for everything except the wiki. | Feeds discovery evidence below | **Blocked** — same owner | From: Who holds the credentials for each system above · Restrictions on installing software or outbound connections · product config |

## Step 2 — Weeks 1 to 4: taxonomy, then the service catalog starter set

- [ ] Reviewed

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Service catalog | **Unresolved — planned as Short.** The config makes this conditional: short for a starter set of 8 to 12 request types, long if they insist on launching with a complete catalog, "which is the most common reason a go-live date slips." Section 6 names three catalog requests and puts Facilities and HR request types out of scope, but nobody has asked starter set or complete. Planned here as a starter set; this is the top week-one decision and the largest single lever on the January date. | Settled taxonomy — **not settled**, and the one-process-or-two conflict sits directly on it. Named approvers plus a cover rule — not started. Requester visibility rules — need provisioning, which is `UNKNOWN`. Fulfilment group per item with confirmed capacity — 23 agents across two desks, one of whose leads has never been on a call. | *"More than half of new requests arrive through catalog items rather than free-text email or a tap on the shoulder, sustained across two consecutive weeks"*; *"At least one approval requested, approved and fulfilled end to end in production, by the real approver rather than the admin testing it"*; *"Low reassignment rate on catalog tickets: requests land on the right team first time"*; *"Every live item has a named owner recorded on the item itself"* | **Ready** — taxonomy can start on day one | From: Products and tiers purchased · Must something here be live by day 30? · Explicitly out of scope for now · product config |

**Build order, by volume** (`day30_required: yes` — "One queue before the
distribution centre opens"; the short lead time supports live items by day 30,
not the evidence above):

1. "Password resets and account unlocks" — ~380 a month, head office,
   measured (spreadsheet tracker export, 2026-09-10)
   *From: What they want set up first — service catalog, request 1*
2. "New starter setup: laptop, accounts, the lot" — ~40 a month, estimate
   *From: What they want set up first — service catalog, request 2*
3. "Till and printer faults in the stores" — volume `UNKNOWN`. **Discovery
   task**, Tomas Berg. Not ranked until the volume is known.
   *From: What they want set up first — service catalog, request 3*

The handoff names three requests. The rest of the 8-to-12 starter set is not
named, and is a week-one ask. Facilities and HR request types stay off the plan
(`out_of_scope`).

The shape of that evidence: an adoption measurement sustained over two
consecutive weeks. The earliest it can be true is two weeks after real requests
start arriving through live items, and it is a behaviour change in 240 stores,
not a configuration step.

## Step 3 — Weeks 2 to 6: workflow automation

- [ ] Reviewed

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Workflow automation | Short per workflow, often days. **Long to reach coverage that changes the team's numbers, 8 weeks plus.** Config: plan it as a sequence of small deliveries, never as one project. | Catalog and taxonomy settled — not yet; the config warns automation written against moving fields gets rewritten. Agent groups, business hours, SLA targets — not defined. Credentials and scopes for the HR system and endpoint management tool — `UNKNOWN`. A named owner for the rules — not named. | *"A measurable share of tickets routed, categorised or resolved with no human touch, compared against the pre-automation baseline in the handoff"*; *"Execution logs showing rules firing in production on real tickets, not test records"*; *"The rules are still enabled 30 days after launch, with no pile of manual workarounds running alongside them"*; *"Time to first response has moved, not just time to assign"* | **Gated by UNKNOWN** for anything crossing a system boundary (`credential_holders`); internal routing is Ready once taxonomy settles | From: Products and tiers purchased · Must something here be live by day 30? · Explicitly out of scope for now · Who holds the credentials for each system above · product config |

**Build order, by volume** (`day30_required: UNKNOWN`; `out_of_scope: UNKNOWN`):

1. "Store tickets go to the store desk and ours come to us, without anyone
   sorting them" — ~1,400 a month, head office only, estimate. Internal
   routing, so it needs no outside credentials.
   *From: What they want set up first — workflow automation, request 1*
2. "Joiners and leavers from HR open their own tickets" — 70 a month,
   measured (HR system report shared by Priya, 2026-09-10). Crosses into the
   HR system, so it waits on `credential_holders`.
   *From: What they want set up first — workflow automation, request 2*

**The baseline problem, stated once here because it affects two modules.** Two
of these evidence statements measure against a pre-automation baseline. Average
time to first response is `UNKNOWN` and store volume is `UNKNOWN`. Capture both
in week one, before configuring anything. The config is explicit that a
baseline captured after configuration starts is not a baseline, and there is no
way to recover it later.

## Step 4 — Weeks 1 to 12, in parallel: discovery, then asset management

- [ ] Reviewed

The config splits these and says to split them in the plan or the dates will
lie. Two rows, two dependency lists, two sets of evidence. The handoff has one
section 6 block for "asset management with discovery", so its two requests are
split here by what each needs (inferred).

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| **Discovery (the gate)** | Long, 8 to 16 weeks, and the longest pole in most deployments. The range does not start until the gate opens. | A passed security review — `UNKNOWN`, status not started. Service accounts and credentials per platform — `UNKNOWN`. Network access, firewall rules, subnet list, scanner host — `UNKNOWN`. Approval to deploy agents plus access to their deployment tooling — `UNKNOWN` (`install_restrictions`). An infrastructure owner, who the config notes is almost never the ITSM project owner — `UNKNOWN`, and here the ITSM project owner is the only technical name on the account. | *"Scans running on schedule for at least two consecutive cycles without a manual restart"*; *"Device count found reconciles against the customer's own expected count, with the gap explained rather than ignored"*; *"Unidentified and duplicate records below an agreed threshold"*; *"Relationships between devices, services and software populated, not just rows of hardware"* | **Blocked** — five dependencies, five `UNKNOWN`. Owner: Dana Whitfield, by default | From: Products and tiers purchased · Security review required before deployment · Who holds the credentials for each system above · Restrictions on installing software or outbound connections · product config |
| **Asset management** | Long. Cannot start before the gate clears. | Discovery output, or a clean import — neither exists. Agreed asset model — not started, though one boundary is already set: stock in the distribution centres is out of scope. Assignment rules needing directory or HR data — HR credentials `UNKNOWN`. Named process owners for purchase, assignment, reclaim, disposal — not named. | *"Assets referenced on incidents and changes by agents doing normal work, without being told to"*; *"A spot audit of 20 random records matches physical or cloud reality above an agreed rate"*; *"Lifecycle events (assign, reclaim, retire) recorded in the product, and the parallel spreadsheet has actually been retired"*; *"Stale record share (not seen by discovery in 30 days) is tracked and trending down"* | **Blocked** — behind the gate. First step inside 30 days is groundwork: agree the asset model. | From: Products and tiers purchased · Explicitly out of scope for now · product config |

**Requests, by volume** (`day30_required: yes` — see conflict 1):

1. Asset management: "Laptop swaps and returns, and who has what" — ~90 a
   month, estimate. Built once the gate clears.
   *From: What they want set up first — asset management with discovery, request 1*
2. Discovery: "Find out what is actually on the store networks" — volume
   `UNKNOWN`. **Discovery task**, unassigned, routed to Dana Whitfield.
   *From: What they want set up first — asset management with discovery, request 2*

## Step 5 — After asset data is trustworthy: change management

- [ ] Reviewed

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Change management | Long, 8 to 12 weeks, **and longer where no change process exists today**. Resolved by the handoff: `current_process` is "None formally", and `change_volume` records that no change process exists. Config: you are implementing a process, not a module. | Asset and CMDB data of usable quality — blocked behind a blocked gate. Change types with real examples — none agreed, though section 6 gives one real case: store network work during trading hours. Approval chains, board membership, a standing meeting on calendars — none. Maintenance windows and freeze periods — the December freeze is documented in the handoff, nothing else. Integration with where work happens — `UNKNOWN`. Executive backing — Dana has been on one commercial call and no technical call. Config: change management fails on adoption, never on configuration. | *"Changes are raised before the work happens. The ratio of retroactive and emergency changes to planned ones is the single best indicator, and it should be falling."*; *"The change board runs from the product's queue, not a spreadsheet or a slide"*; *"Standard change templates used repeatedly by engineers without help from the admin"*; *"Failed change and rollback rates being reported, which means somebody is actually looking"*; *"Changes reference affected assets or services, which is only possible if the asset data holds up"* | **Blocked** — correctly last, and not reachable by the target go-live. First step inside 30 days is groundwork for its own dependencies: name the change-board members, and write down the freeze and maintenance windows. | From: Products and tiers purchased · Process or method they follow today · Changes per month, and share that are emergency · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |

**Requests** (`day30_required: no`; `out_of_scope: UNKNOWN`): both have volume
`UNKNOWN`, so both are **discovery tasks** for Priya Raman, and neither is
ranked yet.

- "Sign-off before anyone touches a store network during trading hours"
  *From: What they want set up first — change management, request 1*
- "The December freeze written down somewhere other than my head"
  *From: What they want set up first — change management, request 2*

## Step 6 — From week 2, continuously: knowledge base

- [ ] Reviewed

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Knowledge base | Long, 6 to 10 weeks. Config: the tool is ready on day one; the content, the owners, and the habit of writing articles are the actual work. It is content-limited, so it never finishes if it waits for a slot. | Same taxonomy as the catalog — not settled. A seed set — ~200 wiki pages exist, currency `UNKNOWN`, and stores keep printed sheets that are not in the wiki at all. Named article owners per team and a review cadence — none. A publishing decision — not made. End-user portal access — needs the same visibility rules as the catalog, which need provisioning. `out_of_scope` says "Anything customer-facing"; whether that covers the staff portal is not said. | *"Articles are linked from resolved tickets, and that rate is rising month over month"*; *"Articles created by agents during ticket work in the last 30 days"*; *"Self-service or deflected sessions tracked against the handoff baseline"*; *"Only a small share of articles are past their review date"* | **Ready** — starts week 2 and runs continuously | From: Products and tiers purchased · Existing knowledge articles · Where their documentation lives today · Explicitly out of scope for now · product config |

**Build order, by volume** (`day30_required: no`):

1. "Answers to the questions we get every week, so the desk stops retyping
   them" — ~250 a month, estimate
   *From: What they want set up first — knowledge base, request 1*
2. "Get the store sheets off the back-room wall and onto a screen" — volume
   `UNKNOWN`. **Discovery task**, Tomas Berg.
   *From: What they want set up first — knowledge base, request 2*

The config singles out one evidence line: articles created by agents during
ticket work is "the one that matters: the read path is easy, the write path is
where knowledge bases die." The commitment recorded in the handoff — "we can
import your wiki" — is a read-path promise. It is deliverable and it is not the
same thing as this module working. The top-ranked request is closer to the
write path.

---

## Drift check

- [ ] Reviewed

Checked as of **2026-10-01** (day 1), against the target date 2027-01-12. Every
threshold comes from the config's **Drift rules**: a buffer of 0 weeks, freeze
periods pause work, amber uses the long end of the lead time and red the short
end. The handoff's freeze runs 2026-12-01 to 2027-01-06.

| Module | Lead time in weeks | Latest safe start | Earliest finish if started 2026-10-01 | Flag | Turns red from, if not started | From |
|---|---|---|---|---|---|---|
| Discovery (the gate) | 8 to 16 | 2026-08-16 | 2026-11-26 | **Drifting (amber)** | 2026-10-12 | From: Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |
| Change management | 8 to 12 | 2026-09-13 | 2026-11-26 | **Drifting (amber)** | 2026-10-12 | From: Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · Process or method they follow today · product config |
| Knowledge base | 6 to 10 | 2026-09-27 | 2026-11-12 | **Drifting (amber)** | 2026-10-26 | From: Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |
| Workflow automation (coverage) | 8 | 2026-10-11 | 2026-11-26 | On time | 2026-10-12 | From: Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |

Asset management has no row of its own: the config counts it inside
discovery's 8 to 16 weeks. The service catalog is planned as a starter set,
which is short, so it is not checked.

What the flags say, and nothing more: at the long end of their lead times,
three modules can no longer finish before 12 January once the freeze is
counted. None is at risk yet: at the short end, each could still finish before
the freeze. The plan starts automation's first rule in week 3 (15 October),
which is after the date automation coverage turns red.

## Ordering rules, stated plainly

- [ ] Reviewed

The config gives two. Both apply here. *From: product config*

- **Change management before trustworthy asset data produces a process nobody
  believes.** Asset data here is behind a gate that has not opened. Change
  management is therefore out of the go-live scope, and its first step is
  groundwork only. Saying so early is cheaper than discovering it in January.
- **Automation before a settled taxonomy produces rework.** The taxonomy is
  unsettled and has a live disagreement under it — one process or two. Nothing
  gets built against it until that is closed.

## Where these plans usually slip, checked against this handoff

- [ ] Reviewed

| Known failure mode | Here | From |
|---|---|---|
| The security review surfaces in week six instead of week one | **Already happening.** `security_review` is `UNKNOWN` at handoff, status not started, no named owner. This is the one to fix first. | From: Security review required before deployment · Review status · product config |
| The named technical owner also has a day job, and the project is the part that gives | **Already happening.** About 4 hours a week, Priya's own estimate, with no backfill, running the desk day to day, five months in seat. | From: Hours per week the technical owner has for this · product config |
| The customer holds out for a complete catalog at launch instead of a starter set | **Not yet visible.** Section 6 names three requests and defers Facilities and HR, which reads like a starter set (inferred). Nobody has asked. Ask in week one, before they form a view. | From: Explicitly out of scope for now · product config |
| The knowledge base is treated as a content migration rather than a habit to build | **Already happening, with a way out.** The only KB commitment on record is "we can import your wiki." The top-ranked KB request, weekly repeat questions, points at the write path instead. | From: Commitments made during the sales cycle · What they want set up first — knowledge base, request 1 · product config |
| Discovery credentials are owned by a team that was never in the kickoff | **Already happening.** No security, infrastructure, or identity contact exists in the handoff. | From: Security contact · Identity / IT contact · Who holds the credentials for each system above · product config |
| Change management was sold to the exec sponsor and never explained to the engineers expected to file changes | **Not yet visible, and set up to happen.** Priya raised two change requests on the technical call, but no engineer has been in a conversation about it. | From: Has the exec sponsor ever been on a call with us? · product config |

Four of six are live, one is set up to happen. That is not unusual and it is
not a reason to panic — it is the week-one agenda.
