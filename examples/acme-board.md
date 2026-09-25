> **Illustrative example output.** Generated from `acme-handoff.md`, which is
> fictional and was filled by a handoff agent, then reviewed by a person.

# Activation board: Acme Corp

**Status: Draft — 0 of 7 sections reviewed.** Tick each section's box as you
review it. Change this line to `Status: Reviewed` only when every box is ticked.

### Handoff incomplete

The board is still built. Fill these in the handoff, then regenerate it. The
required fields come from the **Required before planning** table in
`templates/handoff.md`.

| Field | What is missing | Who fills it |
|---|---|---|
| Target go-live date | **Missing.** `UNKNOWN`. The driver is known (the Q1 compliance audit), but the audit date is `UNKNOWN` too. | Rep, not named |
| Core volume per month (whatever the product counts) | **Missing.** `UNKNOWN`. | SE, not named |
| Time the core job takes today | **Missing.** `UNKNOWN`. | SE, not named |
| Headcount doing the work | **Missing.** `UNKNOWN`. | SE, not named |

3 answers are the agent's interpretation: verify before kickoff.

## Read this first

- [ ] Reviewed

- **Handoff** dated 2026-09-22, filled by a handoff agent from CRM data and a
  call recording, received and reviewed by Jordan Ellis (CSM).
- **Config read:** `config/itsm.md`. The products field says "Service Desk,
  Asset Management", which matches this config and not the other one in
  `config/` (inferred). No private config present.
- **Industry:** Healthcare.
- **Close date** 2026-09-15. **Contract start** `UNKNOWN`, so day 1 is the date
  filled, 2026-09-22. **Target go-live** `UNKNOWN`.

**The job, in their words** (CRM): "Replacing a legacy ticketing tool". This is
the CRM's wording, not a quote from the customer.

**Why now** (call, 20 Aug): tickets get lost in email, and there is no
visibility into assets.

**The calendar.** There is no target date to plan against. What drives it is
known: go-live before the Q1 compliance audit, which they must pass (CRM; call,
20 Aug). The audit date, whether the date is fixed or preferred, what happens if
it slips, and every freeze period are all `UNKNOWN`. Until the audit date is
known, no runway can be counted and no drift flag can be set.

**Answers to verify.** Three answers are the handoff agent's interpretation,
not something the customer said. None of them sets a date, a milestone or a
commitment on this board.

- **Verify:** Priya Shah (IT Director) as technical owner. *Agent's read: she
  is the champion in the CRM and the IT lead, not confirmed as owner.* She is
  the only named person on their side, so most "Ask" lines below route to her.
  *From: Technical owner (does the work)*
- **Verify:** single sign-on required, `yes`. *Agent's read: SSO setup was
  promised for week 1.* The promise itself is recorded (call, 20 Aug); the
  requirement is inferred from it. *From: Single sign-on required*
- **Verify:** "Tight timeline: go-live must land before the Q1 audit with data
  migration in scope." *Agent's read.* *From: Handoff notes*

**Who else is named.** The CRM lists Priya Shah as the champion and Mark Lee
(CFO) as the economic buyer, and names no exec sponsor. Whether Mark Lee is also
the exec sponsor has not been asked. *From: Handoff notes · Exec sponsor
(unblocks and pays)*

**What was purchased, against the config.** Service Desk and Asset Management.
The config has no module called Service Desk; it is planned here as the
**Service catalog** (inferred, conflict 3). Asset Management is split into
**Discovery (the gate)** and **Asset management**, as the config requires.
Workflow automation, knowledge base and change management were not purchased,
so steps 3, 5 and 6 of the config's sequence have no rows.

### Open questions

Every `UNKNOWN`, and every request with no volume, grouped into seven open
questions to ask at kickoff. Each keeps its original questions as a checklist,
so the answer can be ticked off line by line. Nothing is dropped, only
regrouped.

**1. "Who is involved on your side, and who makes the final call?"**
Blocks every module: most tasks need an owner on their side. Date at risk:
kickoff. Ask: Priya Shah (**Verify**: not confirmed as technical owner).
- [ ] Are you the technical owner, doing the work day to day? (**Verify**) *From: Technical owner (does the work)*
- [ ] Who is the exec sponsor? The CRM names Mark Lee as economic buyer; ask whether he also sponsors the rollout, without assuming it. *From: Exec sponsor (unblocks and pays) · Handoff notes*
- [ ] Has the exec sponsor been on a call with us? *From: Has the exec sponsor ever been on a call with us?*
- [ ] Who will be the day-to-day admin? *From: Day-to-day admin, if different*
- [ ] How many hours a week does the technical owner have for this? *From: Hours per week the technical owner has for this*
- [ ] Who judges whether this worked? *From: Who inside their company judges that*
- [ ] Has anyone outside the buying team agreed to this? *From: Has anyone outside the buying team agreed to this*
- [ ] Priya Shah's email, and have we met her on a call? *From: Technical owner (does the work)*

*From: Technical owner (does the work) · Exec sponsor (unblocks and pays) · Has the exec sponsor ever been on a call with us? · Day-to-day admin, if different · Hours per week the technical owner has for this · Who inside their company judges that · Has anyone outside the buying team agreed to this · Handoff notes*

**2. "When is the audit, and what has to be true before it?"**
Blocks the target date, and with it the drift check for discovery. Date at
risk: go-live. Ask: Priya Shah, then the exec sponsor once named.
- [ ] What is the target go-live date? *From: Target go-live date*
- [ ] When is the Q1 compliance audit? *From: What is driving it (audit, contract expiry, office opening, fiscal year, board promise)*
- [ ] Is the date fixed or preferred? *From: Fixed or preferred*
- [ ] What happens if it slips? *From: What happens to them if it slips*
- [ ] Any freeze periods, as dates? *From: Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze)*
- [ ] Is this the whole scope, or phase one? *From: Whole scope, or phase one of something bigger*
- [ ] How will they know it worked, and what would make it a failure? *From: How they will know it worked · What would make them call this a failed rollout*
- [ ] Who reports the response time number upward? *From: Number attached, and who reports it upward*

*From: Target go-live date · What is driving it (audit, contract expiry, office opening, fiscal year, board promise) · Fixed or preferred · What happens to them if it slips · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · Whole scope, or phase one of something bigger · How they will know it worked · What would make them call this a failed rollout · Number attached, and who reports it upward*

**3. "Walk me through your current setup and the systems involved."**
Blocks the data migration commitment and discovery. Date at risk: discovery
start, and any migration work. Ask: Priya Shah.
- [ ] What is the legacy ticketing tool, and how much data would move? *From: Tool being replaced, or greenfield*
- [ ] Why are you leaving it, in your words? *From: Why they are leaving it, in their words*
- [ ] What else did you consider? (Not yet a finding.) *From: Alternatives they considered*
- [ ] Which systems do we need to integrate with? *From: Systems we will need to integrate with*
- [ ] Any languages or frameworks we have to work with? (Not yet a finding.) *From: Languages or frameworks we have to work with*
- [ ] Where does documentation live today? *From: Where their documentation lives today*
- [ ] How does the process work today? *From: Process or method they follow today*
- [ ] Anything already built or automated you expect to keep? *From: Anything already built or automated they expect to keep*
- [ ] Who holds the credentials for each system? *From: Who holds the credentials for each system above*
- [ ] Any restrictions on installing software or outbound connections? *From: Restrictions on installing software or outbound connections*

*From: Tool being replaced, or greenfield · Why they are leaving it, in their words · Alternatives they considered · Systems we will need to integrate with · Languages or frameworks we have to work with · Where their documentation lives today · Process or method they follow today · Anything already built or automated they expect to keep · Who holds the credentials for each system above · Restrictions on installing software or outbound connections*

**4. "Who owns security and identity, and what has to pass before we deploy?"**
Blocks Foundation (SSO) and the discovery gate. Date at risk: the SSO promise
(week 1) and discovery start. Ask: *unassigned*, routed to the exec sponsor
once named; until then, Priya Shah.
- [ ] Is single sign-on required? (**Verify**: agent's read, from the week 1 promise) *From: Single sign-on required*
- [ ] Which identity provider? *From: Identity provider*
- [ ] Who is the identity / IT contact? *From: Identity / IT contact*
- [ ] Is automated user provisioning required? *From: Automated user provisioning (SCIM) required*
- [ ] Is a security review required, where does it stand, and who signs off? *From: Security review required before deployment · Review status · Who owns security sign-off on their side*
- [ ] Who is the security contact? *From: Security contact*
- [ ] Any open items from signature, and certifications they need from us? *From: Open items at signature (questionnaire, pen test report, DPA, insurance) · Certifications they need from us*
- [ ] Any data residency or regional hosting requirements? *From: Data residency or regional hosting requirements*

*From: Single sign-on required · Identity provider · Identity / IT contact · Automated user provisioning (SCIM) required · Security review required before deployment · Review status · Who owns security sign-off on their side · Security contact · Open items at signature (questionnaire, pen test report, DPA, insurance) · Certifications they need from us · Data residency or regional hosting requirements*

**5. "How are your teams organized, and who will use this?"**
Blocks Kickoff setup (roles, workspaces) and agent groups. Date at risk: week 1
setup. Ask: Priya Shah.
- [ ] Which teams are in scope at launch, and which later? *From: Teams in scope at launch · Teams in scope later, and roughly when*
- [ ] How many teams or workspaces? *From: Number of teams / workspaces*
- [ ] How many end users, and where? *From: End-user population served · Geographies and time zones*
- [ ] One shared process, or several? *From: One shared process, or several that genuinely differ*
- [ ] Separate test and production required? *From: Separate test and production required*

*From: Teams in scope at launch · Teams in scope later, and roughly when · Number of teams / workspaces · End-user population served · Geographies and time zones · One shared process, or several that genuinely differ · Separate test and production required*

**6. "What has to be true on day 30 for this to feel like a win?"**
Blocks the catalog build order, first value, and every success measure. Date at
risk: day 30; baselines cannot be recovered once configuration starts. Ask:
Priya Shah.
- [ ] Must anything in the service desk be live by day 30, and what is out of scope? *From: Must something here be live by day 30? · Explicitly out of scope for now*
- [ ] Must anything in asset management be live by day 30, and what is out of scope? *From: Must something here be live by day 30? · Explicitly out of scope for now*
- [ ] Service desk: what are the most common requests, and how many a month? **Discovery task.** *From: What they want set up first — service desk, request 1*
- [ ] Asset management: what do they want tracked first, and how many a month? **Discovery task.** *From: What they want set up first — asset management, request 1*
- [ ] Current ticket response time. They want it cut in half; read here as average time to first response (inferred). *From: Average time to first response*
- [ ] Tickets per month, time to resolve, and headcount doing the work. *From: Core volume per month (whatever the product counts) · Time the core job takes today · Headcount doing the work*
- [ ] Share of requests arriving unstructured, and known asset count. *From: Share of requests arriving unstructured (email, chat, tap on the shoulder) · Known asset count*
- [ ] Changes per month, and existing knowledge articles. (Not yet a finding: change management and knowledge base were not purchased.) *From: Changes per month, and share that are emergency · Existing knowledge articles*

*From: Must something here be live by day 30? · Explicitly out of scope for now · What they want set up first — service desk, request 1 · What they want set up first — asset management, request 1 · Average time to first response · Core volume per month (whatever the product counts) · Time the core job takes today · Headcount doing the work · Share of requests arriving unstructured (email, chat, tap on the shoulder) · Known asset count · Changes per month, and share that are emergency · Existing knowledge articles*

**7. Internal, before kickoff: "Who on our side sold this, and what exactly was promised?"**
Blocks both commitments and the People list. Date at risk: kickoff. Ask: our
sales team; *unassigned* until the rep is named.
- [ ] Who were the rep, the SE and the assigned CSM? *From: Rep · SE · Assigned CSM*
- [ ] Seats, contract size, tiers, and the contract start date. *From: Seats / contract size · Products and tiers purchased · Contract start date*
- [ ] For each commitment: who made it, to whom, and can we deliver it as stated? *From: Commitments made during the sales cycle*
- [ ] Anything else promised that we are not sure we can deliver? *From: Anything promised we are not sure we can deliver*

*From: Rep · SE · Assigned CSM · Seats / contract size · Products and tiers purchased · Contract start date · Commitments made during the sales cycle · Anything promised we are not sure we can deliver*

The only named person on their side is an agent's-read technical owner. That
is the headline finding on this account: confirm her role at kickoff, then find
the exec sponsor.

### Conflicts

1. **Promised in sales: SSO setup in week 1** (call, 20 Aug; "Deliverable as
   stated?" `UNKNOWN`). The config's Foundation item for authentication is
   short when the identity team is in the room and long when it sits outside
   the buying team. No identity contact is named, so the lead time is
   unresolved and planned as short, 2 to 4 weeks. **Promised week 1, lead time
   2 to 4 weeks: reset expectations at kickoff.** The timing stays as promised
   on the board; it is not moved.
   *From: Commitments made during the sales cycle · Anything promised on timing specifically · Identity / IT contact · product config*
2. **Promised in sales: data migration help from our team** (call, 20 Aug; no
   timing stated; "Deliverable as stated?" `UNKNOWN`). The config defines no
   data migration work and no lead time for it, and the tool, the data volume
   and what "help" means are all `UNKNOWN`. Scope it at kickoff with the SE,
   before anyone repeats the promise.
   *From: Commitments made during the sales cycle · Tool being replaced, or greenfield · product config*
3. **"Service Desk" is not a module in the config.** The products field names
   Service Desk and Asset Management. Service Desk is planned as the Service
   catalog (inferred), because that is the config's request portal. Confirm at
   kickoff what they think they bought before anything is built.
   *From: Products and tiers purchased · product config*
4. **The date driver has no date.** Go-live must come before the Q1 compliance
   audit, and they must pass it. The audit date is `UNKNOWN`, so the lead times
   below cannot be checked against it. The agent's read of a tight timeline is
   plausible and still **Verify**: it does not set a date here.
   *From: Target go-live date · What is driving it (audit, contract expiry, office opening, fiscal year, board promise) · Handoff notes*
5. **Their success number has no baseline.** "Cut ticket response time in half"
   (call, 20 Aug) needs today's response time, which is `UNKNOWN`. It has to be
   captured before configuration starts, or the goal can never be measured.
   *From: Their stated outcome · Number attached, and who reports it upward · Average time to first response*

### First value (proposed, confirm at kickoff) (inferred)

**First value: not proposed yet.** No module has `day30_required: yes`, and
neither section 6 request has a volume. These decide it, and are already under
open question 6: *Must something here be live by day 30?* for each module, and
*What they want set up first* request 1 for each module.

### Milestones (inferred)

1. **Kickoff done**, by end of week 1
   - Technical owner confirmed (item: confirm the technical owner)
   - Exec sponsor named (item: identify the exec sponsor)
   - Audit date recorded (item: find the audit date)
   - Success plan confirmed and shared (item: draft success plan, confirm at kickoff)
2. **Baselines captured**, by end of week 2
   - Response time baseline recorded (item: baseline capture)
   - Ticket volume recorded (item: baseline capture)
3. **Prerequisites cleared**, by day 30 (the Foundation gate)
   - SSO live (item: set up single sign-on)
   - Admin named, hours budgeted (item: get a day-to-day admin named)
   - Test instance ready (item: request the test instance)
   - Agent groups and hours set (item: define agent groups and business hours)

---

## Step 1, week one: Kickoff setup, Foundation, and opening the long gates

- [ ] Reviewed

Per the config, these are mostly waiting rather than work, which is exactly why
they start first.

### Kickoff setup

| Kickoff setup item | Where it stands | Status | From |
|---|---|---|---|
| Roles and permissions | Teams in scope `UNKNOWN`. Nothing set yet. | **Gated by UNKNOWN:** `teams_launch` | From: Teams in scope at launch · product config |
| Workspace setup | Number of teams or workspaces `UNKNOWN`. | **Gated by UNKNOWN:** `team_count`, `process_shape` | From: Number of teams / workspaces · One shared process, or several that genuinely differ · product config |
| Success plan: draft, confirm at kickoff, share by end of week 1 | Built from their stated outcome. Both success measures lack a baseline, and first value is not proposed yet. | **Ready** | From: Their stated outcome · Number attached, and who reports it upward |

### Foundation

| Foundation item | Lead time | Where it stands | Expected to finish | Status | From |
|---|---|---|---|---|---|
| SSO and provisioning. **Promised in sales:** week 1 | **Unresolved, planned as short (2 to 4 weeks).** Config: short when the identity team is in the room, long when it sits outside the buying team. | SSO required: `yes` (**Verify**: agent's read, from the week 1 promise). Identity provider, identity contact and provisioning all `UNKNOWN`. Promised week 1, lead time 2 to 4 weeks: reset expectations at kickoff (conflict 1). | Weeks 2 to 4 at the earliest, if the identity team is reached in week 1; later if it sits outside the buying team | **Gated by UNKNOWN:** `identity_contact`, `identity_provider`, `provisioning_required` | From: Single sign-on required · Identity provider · Identity / IT contact · Automated user provisioning (SCIM) required · Commitments made during the sales cycle · product config |
| Agent groups and business hours | Short | Teams `UNKNOWN`, so there is nothing to group yet. | Week 2, once teams are known | **Gated by UNKNOWN:** `teams_launch`, `team_count` | From: Teams in scope at launch · Number of teams / workspaces · product config |
| Inbound email cutover plan | Short | Tickets get lost in email today, so email is a live front door. What happens to the old address depends on the legacy tool, which is `UNKNOWN`. | Week 1 to 2 | **Ready** to start the plan | From: Problem that made them buy now · Tool being replaced, or greenfield · product config |
| Test instance | Short | The config asks for one when there is an audit requirement, and there is one: the Q1 compliance audit. `separate_envs` is `UNKNOWN`. | Week 1 | **Ready:** request it in week one | From: What is driving it (audit, contract expiry, office opening, fiscal year, board promise) · Separate test and production required · product config |
| Admin named, hours budgeted | Short to name; the time budget is what slips | Admin `UNKNOWN`. Technical owner's hours `UNKNOWN`, and the technical owner is **Verify**. | Week 1 to name | **Gated by UNKNOWN:** `admin`, `owner_capacity` | From: Day-to-day admin, if different · Hours per week the technical owner has for this · product config |

### Opening the long gates

| Item | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Open the security review | Long: this is the gate, not a task | Security review, status, sign-off owner, security contact: all `UNKNOWN`. Open items at signature and certifications: `UNKNOWN`. | Config: *"A passed security review. Assume one exists even when nobody has mentioned it."* | **Blocked:** unblocked by the exec sponsor, by default, because the handoff names nobody; the exec sponsor is not named yet either. Work starts in week one: find out whether a review exists and who owns it. | From: Security review required before deployment · Review status · Who owns security sign-off on their side · Security contact · Open items at signature (questionnaire, pen test report, DPA, insurance) · Certifications they need from us · product config |
| Open the credential requests for discovery | Long | Service accounts per platform, subnet list, scanner host, agent deployment approval, infrastructure owner: all `UNKNOWN`. Credential holders `UNKNOWN`. | Feeds discovery evidence below | **Blocked:** same owner | From: Who holds the credentials for each system above · Restrictions on installing software or outbound connections · product config |

## Step 2, weeks 1 to 4: taxonomy, then the service catalog starter set

- [ ] Reviewed

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Service catalog (from "Service Desk", inferred; conflict 3) | **Unresolved, planned as short.** The config: short for a starter set of 8 to 12 request types, long if they insist on launching with a complete catalog, "which is the most common reason a go-live date slips." Nobody has asked which. | Settled taxonomy: not started, and no requests are known yet. Named approvers plus a cover rule: not started. Requester visibility rules: need directory sync, and provisioning is `UNKNOWN`. Fulfilment group per item with confirmed capacity: teams and headcount `UNKNOWN`. | *"More than half of new requests arrive through catalog items rather than free-text email or a tap on the shoulder, sustained across two consecutive weeks"*; *"At least one approval requested, approved and fulfilled end to end in production, by the real approver rather than the admin testing it"*; *"Low reassignment rate on catalog tickets: requests land on the right team first time"*; *"Every live item has a named owner recorded on the item itself"* | **Gated by UNKNOWN:** `request_1`, `day30_required`, `teams_launch` | From: Products and tiers purchased · Must something here be live by day 30? · Explicitly out of scope for now · product config |

**Build order, by volume** (`day30_required: UNKNOWN`; `out_of_scope: UNKNOWN`):

1. Request `UNKNOWN`, volume `UNKNOWN`. **Discovery task**, Priya Shah
   (**Verify**). Nothing is ranked until the requests and their volumes are
   known.
   *From: What they want set up first — service desk, request 1*

The first evidence line is the one "Tickets get lost in email" points at:
requests arriving through catalog items instead of email.

## Step 4, weeks 1 to 12, in parallel: discovery, then asset management

- [ ] Reviewed

The config splits these and says to split them in the plan or the dates will
lie. Two rows, two dependency lists, two sets of evidence. "No visibility into
assets" (call, 20 Aug) is why this module was bought.

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| **Discovery (the gate)** | Long, 8 to 16 weeks, and the longest pole in most deployments. The range does not start until the gate opens. | A passed security review: `UNKNOWN`. Service accounts and credentials per platform: `UNKNOWN`. Network access, firewall rules, subnet list, scanner host: `UNKNOWN`. Approval to deploy agents plus access to their deployment tooling: `UNKNOWN`. An infrastructure owner: `UNKNOWN`. | *"Scans running on schedule for at least two consecutive cycles without a manual restart"*; *"Device count found reconciles against the customer's own expected count, with the gap explained rather than ignored"*; *"Unidentified and duplicate records below an agreed threshold"*; *"Relationships between devices, services and software populated, not just rows of hardware"* | **Blocked:** five dependencies, five `UNKNOWN`. Owner: the exec sponsor, by default (not named yet) | From: Products and tiers purchased · Security review required before deployment · Who holds the credentials for each system above · Restrictions on installing software or outbound connections · product config |
| **Asset management** | Long. Cannot start before the gate clears. | Discovery output, or a clean import: neither exists. Agreed asset model: not started. Assignment rules needing directory or HR data: `UNKNOWN`. Named process owners for purchase, assignment, reclaim, disposal: not named. | *"Assets referenced on incidents and changes by agents doing normal work, without being told to"*; *"A spot audit of 20 random records matches physical or cloud reality above an agreed rate"*; *"Lifecycle events (assign, reclaim, retire) recorded in the product, and the parallel spreadsheet has actually been retired"*; *"Stale record share (not seen by discovery in 30 days) is tracked and trending down"* | **Blocked:** behind the gate. First step inside 30 days is groundwork: agree the asset model. | From: Products and tiers purchased · Problem that made them buy now · product config |

**Requests, by volume** (`day30_required: UNKNOWN`; `out_of_scope: UNKNOWN`):

1. Request `UNKNOWN`, volume `UNKNOWN`. **Discovery task**, Priya Shah
   (**Verify**).
   *From: What they want set up first — asset management, request 1*

---

## Drift check

- [ ] Reviewed

Checked as of **2026-09-22** (day 1). The target date is `UNKNOWN`, so the
latest safe start cannot be counted and no flag is set. Every threshold comes
from the config's **Drift rules**: a buffer of 0 weeks, freeze periods pause
work, amber uses the long end of the lead time and red the short end. Freeze
periods are `UNKNOWN`, so none are skipped below; any freeze moves these dates
later.

| Module | Lead time in weeks | Latest safe start | Earliest finish if started 2026-09-22 | Flag | From |
|---|---|---|---|---|---|
| Discovery (the gate) | 8 to 16 | needs target date | 2026-11-17 | None: no target date | From: Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |

Asset management has no row of its own: the config counts it inside
discovery's 8 to 16 weeks. The service catalog is planned as a starter set,
which is short, so it is not checked.

Once the audit date is known, rerun this check. If the audit falls before
2026-11-17, discovery cannot finish before it even at the short end of its lead
time.

## Ordering rules, stated plainly

- [ ] Reviewed

The config gives two. *From: product config*

- **Change management before trustworthy asset data produces a process nobody
  believes.** Does not apply: change management was not purchased.
- **Automation before a settled taxonomy produces rework.** Does not apply:
  workflow automation was not purchased. The taxonomy still comes before any
  catalog item is built.

## Where these plans usually slip, checked against this handoff

- [ ] Reviewed

| Known failure mode | Here | From |
|---|---|---|
| The security review surfaces in week six instead of week one | **Already happening.** Every security field is `UNKNOWN` at handoff, with no named owner, and a compliance audit is driving the date. | From: Security review required before deployment · Review status · What is driving it (audit, contract expiry, office opening, fiscal year, board promise) · product config |
| The named technical owner also has a day job, and the project is the part that gives | **Not yet visible.** Hours per week are `UNKNOWN`, and the technical owner herself is **Verify**. | From: Hours per week the technical owner has for this · Technical owner (does the work) · product config |
| The customer holds out for a complete catalog at launch instead of a starter set | **Not yet visible.** No requests are recorded. Ask in week one, before they form a view. | From: What they want set up first — service desk, request 1 · product config |
| The knowledge base is treated as a content migration rather than a habit to build | **Does not apply:** knowledge base not purchased. | From: Products and tiers purchased · product config |
| Discovery credentials are owned by a team that was never in the kickoff | **Already happening.** No security, infrastructure or identity contact exists in the handoff. | From: Security contact · Identity / IT contact · Who holds the credentials for each system above · product config |
| Change management was sold to the exec sponsor and never explained to the engineers expected to file changes | **Does not apply:** change management not purchased. | From: Products and tiers purchased · product config |

Two of six are live, two not yet visible, two do not apply. The week-one
agenda is people and dates, before any configuration.
