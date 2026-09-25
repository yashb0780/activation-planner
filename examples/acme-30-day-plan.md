> **Illustrative example output.** Generated from `acme-handoff.md` and
> `acme-board.md`, both fictional. The handoff was filled by a handoff agent,
> then reviewed by a person.

# Draft 30-day plan: Acme Corp

**Status: Draft — 0 of 8 sections reviewed.** Tick each section's box as you
review it. Change this line to `Status: Reviewed` only when every box is ticked.

### Handoff incomplete

The plan is still built. Fill these in the handoff, then regenerate it. The
required fields come from the **Required before planning** table in
`templates/handoff.md`.

| Field | What is missing | Who fills it |
|---|---|---|
| Target go-live date | **Missing.** `UNKNOWN`. The driver is known (the Q1 compliance audit), but the audit date is `UNKNOWN` too. | Rep, not named |
| Core volume per month (whatever the product counts) | **Missing.** `UNKNOWN`. | SE, not named |
| Time the core job takes today | **Missing.** `UNKNOWN`. | SE, not named |
| Headcount doing the work | **Missing.** `UNKNOWN`. | SE, not named |

3 answers are the agent's interpretation: verify before kickoff.

### People

Tasks below name roles, not people. Each name is looked up here, so a change
to one name changes every task that uses the role. Default owners: us — CSM;
them — Technical owner. A task names other roles only where this plan does.

| Side | Role | Name |
|---|---|---|
| Us | CSM | *not named* (`UNKNOWN`) |
| Us | Implementation lead | Jordan Ellis (a CSM; received and reviewed the handoff) |
| Us | SE | *not named* (`UNKNOWN`) |
| Us | Rep | *not named* (`UNKNOWN`) |
| Them | Technical owner | Priya Shah, IT Director (**Verify**: agent's read, not confirmed as owner) |
| Them | Exec sponsor | *not named* (`UNKNOWN`) |
| Them | Champion | Priya Shah |
| Them | Economic buyer | Mark Lee, CFO |
| Them | Day-to-day admin | *not named* (`UNKNOWN`) |
| Them | Security contact | *not named* (`UNKNOWN`) |
| Them | Identity / IT contact | *not named* (`UNKNOWN`) |

**Day 1 is 2026-09-22**, the date the handoff was filled; the contract start
date is `UNKNOWN`. Day 30 is 2026-10-21.

**What this document is.** Acme bought a service desk and asset management.
Discovery, the gate in front of asset management, runs 8 to 16 weeks. A 30-day
plan against that is not a list of things that will be finished. It answers
three questions: what got started, what proof exists that it is moving, and
what is on track to land after day 30. Nothing below is late because it is
unfinished at day 30.

Every purchased module gets a first step inside the 30 days. For some, the
first step is groundwork, which is the honest first step when the config says
the module waits on something else.

This is a draft. It has not been agreed with the customer. The handoff was
filled by an agent: three of its answers are the agent's interpretation and are
marked **Verify**, and most of its fields are `UNKNOWN`. There is no target
date, and both section 6 requests have no volume.

---

## Week 1: 22 to 28 September

- [ ] Reviewed

**Focus:** Find out who is who and when the audit is, open every gate that
involves waiting, and capture the baseline before anyone configures anything.

**Starting**

- **Kickoff setup**, first: quick base-level setup done at kickoff.
  - Roles and permissions, once the teams in scope are known.
    *Owners: us — CSM; them — Technical owner · From: Teams in scope at launch · product config*
    *Done when:* Teams in scope listed · Agent, admin and requester roles set for each team · One agent per team can log in and see their queue
  - Workspace setup, once one workspace or several is decided.
    *Owners: us — CSM; them — Technical owner · From: Number of teams / workspaces · One shared process, or several that genuinely differ · product config*
    *Done when:* Workspace decision recorded · Each team in scope can log in · A test request reaches the right team
  - **Draft the success plan, confirm it at kickoff, share it by end of week 1.**
    One page: their goal in their words ("Cut ticket response time in half.
    Pass the Q1 compliance audit."), success measures with their baselines
    (response time: `UNKNOWN`, to be captured this week), first value (not
    proposed yet), milestones with target weeks, and the People list above.
    It counts toward the kickoff milestone. Owner on our side: *unassigned*,
    because the handoff names no assigned CSM.
    *Owners: us — CSM; them — Technical owner · From: Their stated outcome · Number attached, and who reports it upward*
    *Done when:* One-page success plan drafted · Confirmed with Priya Shah at kickoff · Shared with her and the exec sponsor by end of week 1
- **The seven open questions** from the board, asked at kickoff, each with its
  checklist to tick off as the answers come in. Question 7 is internal and is
  asked of our own sales team before kickoff.
  *Owners: us — CSM; them — Technical owner · From: every `UNKNOWN` in the handoff, listed per question on the board*
  *Done when:* Every checklist line ticked, or given an owner and a date · Each answer saved on its question
- **Confirm the technical owner.** **Verify:** Priya Shah is recorded as
  technical owner on the agent's read that she is the champion and IT lead.
  Nothing in this plan treats that as settled.
  *Owners: us — CSM; them — Technical owner · From: Technical owner (does the work)*
  *Done when:* Priya Shah confirms she is the technical owner, or names who is · Her hours per week for this written down
- **Identify the exec sponsor.** The CRM names Mark Lee (CFO) as economic
  buyer. Ask whether he also sponsors the rollout; do not assume it.
  *Owners: us — CSM; them — Technical owner · From: Exec sponsor (unblocks and pays) · Handoff notes*
  *Done when:* Exec sponsor named · Has been on a call with us, or one is booked
- **Find the audit date.** Go-live must come before the Q1 compliance audit;
  the date is `UNKNOWN`, so there is no target date yet.
  *Owners: us — CSM; them — Technical owner · From: Target go-live date · What is driving it (audit, contract expiry, office opening, fiscal year, board promise)*
  *Done when:* Audit date recorded, with its source · Target go-live date agreed · Fixed or preferred recorded
- **Promised in sales: scope the data migration help.** Recorded on the call
  of 20 Aug, no timing stated, "Deliverable as stated?" `UNKNOWN`. The config
  has no migration work, so nothing is planned until it is scoped (board
  conflict 2).
  *Owners: us — CSM, SE; them — Technical owner · From: Commitments made during the sales cycle · Tool being replaced, or greenfield*
  *Done when:* Legacy tool named · Data volume to move recorded · What "help" covers written down and agreed with the SE
- **The security review.** Every security field is `UNKNOWN`, but the config
  says to assume a review exists, so the work starts now: find out whether a
  review process exists and who owns sign-off, then open it.
  *Owners: us — CSM; them — Exec sponsor · From: Security review required before deployment · Review status · Who owns security sign-off on their side · product config*
  *Done when:* Security owner named · Review opened, or confirmed not needed, in writing
- **Discovery credential requests.** Same shape. Nobody to request from yet.
  *Owners: us — CSM; them — Exec sponsor · From: Who holds the credentials for each system above · Restrictions on installing software or outbound connections*
  *Done when:* An infrastructure owner named · Credential requests sent for each platform in scope
- **Foundation**: every item from the config, each at its own lead time.
  Foundation starts in week 1; it does not make a long item finish in week 1.
  - **Promised in sales: SSO in week 1.** Promised week 1, lead time 2 to 4
    weeks: reset expectations at kickoff (board conflict 1). The requirement
    itself is **Verify** (agent's read, from the promise). The work starts this
    week: find the identity contact and the identity provider.
    *Owners: us — CSM; them — Identity / IT contact · From: Commitments made during the sales cycle · Single sign-on required · Identity provider · Identity / IT contact · Automated user provisioning (SCIM) required · product config*
    *Done when:* SSO requirement confirmed · Identity contact and provider named · New SSO timing agreed with Priya Shah
  - Agent groups and business hours, once teams are known.
    *Owners: us — CSM; them — Technical owner · From: Teams in scope at launch · Number of teams / workspaces · product config*
    *Done when:* An agent group exists for each team · Business hours set for each group
  - The inbound email cutover plan. Tickets get lost in email today.
    *Owners: us — CSM; them — Technical owner · From: Problem that made them buy now · Tool being replaced, or greenfield · product config*
    *Done when:* Every inbound address listed · The plan says what happens to each old address
  - The **test instance**. The config asks for one when there is an audit
    requirement, and there is one.
    *Owners: us — CSM; them — Technical owner · From: What is driving it (audit, contract expiry, office opening, fiscal year, board promise) · Separate test and production required · product config*
    *Done when:* Test instance requested · Priya Shah can log in to it
  - A day-to-day admin named, with hours budgeted.
    *Owners: us — CSM; them — Exec sponsor · From: Day-to-day admin, if different · Hours per week the technical owner has for this · product config*
    *Done when:* An admin is named · Their weekly hours for this are written down
- **Baseline capture.** Every section 10 number is `UNKNOWN`, including the
  current ticket response time their goal is measured against (read here as
  average time to first response, inferred). None of these can be recovered
  once module configuration starts.
  *Owners: us — CSM; them — Technical owner · From: Average time to first response · Core volume per month (whatever the product counts) · Time the core job takes today · Headcount doing the work · Share of requests arriving unstructured (email, chat, tap on the shoulder) · Known asset count*
  *Done when:* Response time recorded, labelled measured or estimate · Ticket volume, time to resolve and headcount recorded the same way · All captured before any module is configured
- **Two discovery tasks**: find the requests and monthly volume for each
  section 6 block. Each is a checklist line under open question 6:

  | Request | Owners | From |
  |---|---|---|
  | Service desk: request `UNKNOWN` | us — CSM; them — Technical owner | What they want set up first — service desk, request 1 |
  | Asset management: request `UNKNOWN` | us — CSM; them — Technical owner | What they want set up first — asset management, request 1 |

**Reaching evidence this week**

None, and none should. Every module here has a dependency list that is not yet
closed.

**Needed from the customer**

- Priya Shah: is she the technical owner, and who is the exec sponsor. Ask
  about Mark Lee without assuming.
- Priya Shah: the audit date, and whether it is fixed.
- Priya Shah: the teams in scope, the current response time and ticket volume,
  and what they want set up first in each module.
- Whoever owns identity: SSO requirement, identity provider, provisioning.
- Whoever owns security: whether a review is needed, and who signs off.

**Checkpoint:** End of week: technical owner confirmed or replaced, exec
sponsor named, audit date recorded, baseline captured, and the SSO timing
reset.

**Risks live this week**

- Every "Ask" routes to one person whose role is not confirmed. If Priya Shah
  is not the technical owner, week 1 starts again with someone new.
- The SSO promise is already shorter than the config's lead time. The longer it
  goes unsaid, the more it costs.
- Configuring anything before the baseline is captured destroys the comparison
  for "cut ticket response time in half". This is the only irreversible risk in
  the 30 days.

## Week 2: 29 September to 5 October

- [ ] Reviewed

**Focus:** Turn the kickoff answers into a scope. Settle the taxonomy.

**Starting**

- **Taxonomy for the service catalog starter set**, from the requests found in
  week 1. Service Desk is planned as the service catalog (inferred, board
  conflict 3); confirm that before building.
  *Owners: us — CSM; them — Technical owner · From: Products and tiers purchased · What they want set up first — service desk, request 1 · product config*
  *Done when:* Starter set or complete catalog, recorded · Categories and form fields written down · Signed off by the technical owner
- **SSO setup**, if the identity contact was named in week 1.
  *Owners: us — CSM; them — Identity / IT contact · From: Single sign-on required · Identity / IT contact · product config*
  *Done when:* SSO configured in the test instance · One agent signs in through SSO
- **Security review opened**, if a security owner was named.
  *Owners: us — CSM; them — Security contact · From: Security review required before deployment · Who owns security sign-off on their side*
  *Done when:* Questionnaire or equivalent received from them · Our answers returned

**Reaching evidence this week**

None.

**Needed from the customer**

- The rest of the starter set: 8 to 12 request types, with volumes.
- Named approvers per catalog item, plus what happens when an approver is on
  leave.
- A security owner and an infrastructure owner, if still missing.

**Checkpoint:** Is the taxonomy signed off, and is there a named owner for
security and for identity.

**Risks live this week**

- If "Service Desk" means more than the service catalog to them, the scope
  changes here.
- If no identity contact is named yet, SSO moves toward the long end of its
  lead time.

## Week 3: 6 to 12 October

- [ ] Reviewed

**Focus:** Build the starter catalog. Start asset management groundwork.

**Starting**

- **Service catalog build, once the taxonomy closes, in volume order** from
  the week 1 discovery task.
  *Owners: us — CSM; them — Technical owner · From: What they want set up first — service desk, request 1*
  *Done when:* Starter items published in the catalog · Each has a named owner recorded on the item
- **Asset management groundwork:** agree the asset model: what is tracked, at
  what depth, and what is out of scope.
  *Owners: us — CSM; them — Technical owner · From: Explicitly out of scope for now · product config*
  *Done when:* What is tracked, written down · At what depth, written down · What is out of scope, written down
- **Discovery credential collection**, if an infrastructure owner was named.
  *Owners: us — CSM; them — Security contact · From: Who holds the credentials for each system above*
  *Done when:* Credentials received for each platform in scope · Subnet list supplied · Scanner host agreed

**Reaching evidence this week**

None. The catalog's evidence is an adoption share sustained across two
consecutive weeks, which cannot begin until real requests are arriving.

**Needed from the customer**

- The fulfilment group for each catalog item, and confirmation it has capacity.
- Named process owners for asset purchase, assignment, reclaim and disposal.

**Checkpoint:** Are the starter items built and owned, and is the asset model
written down.

**Risks live this week**

- If the catalog scope has grown toward a complete catalog, it shows up here as
  a build that will not finish. The config names this as the most common reason
  a go-live date slips.

## Week 4: 13 to 21 October

- [ ] Reviewed

**Focus:** Get real requests flowing through live items, if something must be
live by day 30. Leave room.

**Starting**

- Catalog items live to the teams in scope, and the adoption measurement window
  opens. Only if `day30_required` comes back `yes`; it is `UNKNOWN` today.
  *Owners: us — CSM; them — Technical owner · From: Must something here be live by day 30?*
  *Done when:* Starter items visible to the teams in scope · Real requests raised through them
- **Day 30 review.**
  *Owners: us — CSM; them — Technical owner, Exec sponsor · From: Target go-live date · What is driving it (audit, contract expiry, office opening, fiscal year, board promise)*
  *Done when:* Held with the technical owner and exec sponsor · Go-live date agreed against the audit date · Discovery window written down from the gate's real state

**Reaching evidence this week**

Possible, one item only, and only if items went live: *"At least one approval
requested, approved and fulfilled end to end in production, by the real
approver rather than the admin testing it."*

**Needed from the customer**

- A real approver to approve a real request.
- Word to their teams that email is no longer the front door.

**Checkpoint:** Day 30 review, 21 October. This is where the go-live date gets
agreed against the audit date and the discovery gate, rather than intent.

**Risks live this week**

- Week 4 is deliberately light. Slip from the people and date questions in
  week 1 lands here.

---

## Where this stands at day 30

- [ ] Reviewed

Not a pass/fail list. Three categories.

### Started and moving, with proof

| Module | Day-30 checkpoint: the observable signal | From |
|---|---|---|
| Foundation | SSO requirement confirmed and its new timing agreed; SSO working in the test instance if the identity contact was named by week 2. A named day-to-day admin with hours budgeted in writing. Agent groups and business hours defined for each team in scope. | From: Single sign-on required · Commitments made during the sales cycle · Day-to-day admin, if different · Teams in scope at launch · product config |
| Service catalog | A starter set of items built, each with a named owner recorded on the item. Live and receiving real requests only if something had to be live by day 30. | From: Products and tiers purchased · Must something here be live by day 30? · What they want set up first — service desk, request 1 · product config |
| Baseline and discovery tasks | Response time, ticket volume, time to resolve and headcount captured before configuration, labelled measured or estimate. Both section 6 blocks have requests and volumes, or a named person and a date. | From: Average time to first response · Core volume per month (whatever the product counts) · What they want set up first |

### Started as waiting, with the gate as the signal

| Module | Day-30 checkpoint: the observable signal | From |
|---|---|---|
| Discovery | The gate, not the scans. Signals in order: a named security owner; confirmation of whether a review is required; a named infrastructure owner; credentials received for *n* of the platforms in scope; subnet list supplied; scanner host agreed. Each would be false if nothing had happened. | From: Products and tiers purchased · Security review required before deployment · Who holds the credentials for each system above · product config |

### Groundwork only, and correctly so

| Module | First step taken, and why it stops there | From |
|---|---|---|
| Asset management | The asset model agreed in writing, and process owners named. It is behind the discovery gate, so groundwork is as far as it can honestly go. "No visibility into assets" is why they bought it, and the day-30 review should say plainly when that changes. | From: Products and tiers purchased · Problem that made them buy now · product config |

## On track to land after day 30

- [ ] Reviewed

Windows are the config's lead times, anchored to the event that starts the
clock. They are windows, not dates. Freeze periods are `UNKNOWN`, so none are
counted. There is no target date, so no drift flag is set.

| Module | Window | What has to stay true | Drift flag (as of day 1) | From |
|---|---|---|---|---|
| SSO | 2 to 4 weeks from reaching the identity team, longer if it sits outside the buying team. **Promised in sales:** week 1. | The identity contact is named in week 1. | Not checked: Foundation item | From: Commitments made during the sales cycle · Identity / IT contact · product config |
| Service catalog | Adoption evidence earliest two weeks after items go live with real traffic | Starter set, not a complete catalog. | Not checked: planned as a starter set, which is short | From: Products and tiers purchased · product config |
| Discovery | 8 to 16 weeks **from the gate opening, which has not happened**. Started on day 1, the earliest finish would be 2026-11-17. | The gate opens in the first weeks. Every week it stays shut moves this window one week. | None: no target date | From: Products and tiers purchased · Target go-live date · product config |
| Asset management | After discovery, inside the same 8 to 16 weeks. | Discovery output reconciles against an expected asset count, which is `UNKNOWN` today. | Counted inside discovery | From: Products and tiers purchased · Known asset count · product config |

**What this means for the audit, said plainly.** Until the audit date is known,
nobody can say whether asset management lands before it. If the audit is
before mid-November, discovery cannot finish before it even at the short end of
its lead time. That is worth knowing in week 1, not at the day-30 review.

## What would change this plan

- [ ] Reviewed

1. **The audit date.** It is the only date driver, and it is `UNKNOWN`. It
   decides whether the discovery gate is already late and how much of asset
   management is in scope for go-live.
2. **Who is who on their side.** The technical owner is the agent's read, and
   there is no exec sponsor. Every Blocked item routes to the exec sponsor by
   default, so naming one unblocks the security review and discovery.
3. **What they think they bought, and what "migration help" means.** Service
   Desk is planned as the service catalog, and migration is not in the config.
   Either answer can add scope the lead times above do not include.

## Downgrades applied in review

- [ ] Reviewed

Step 7 of the skill, run against this draft. Each claim below was written, then
caught by a `Not evidence` line in `config/itsm.md`, then restated.

| Claim as drafted | Caught by | What it became |
|---|---|---|
| "Asset visibility in place by day 30" | *Not evidence: a populated asset list, a dashboard with a device count, one successful scan.* | "Asset model agreed in writing and process owners named; the discovery gate signals are the day-30 checkpoint." |
| "Service catalog live at day 30" | *Not evidence: items built, portal branded, a test request submitted by the admin.* | "Starter items built and owned; live with real requests only if day 30 requires it." The evidence is sustained adoption. |
| "Discovery on track" | *Not evidence: a populated asset list, a dashboard with a device count, one successful scan.* | Replaced with named gate signals: security owner, infrastructure owner, credentials received for *n* platforms, subnet list, scanner host. |

Each of these would still have been true if nobody at Acme had touched the
product since go-live.
