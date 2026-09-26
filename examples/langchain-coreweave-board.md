> **Unofficial demo of a hypothetical engagement. Not affiliated with LangChain or CoreWeave.** Scenario, people, and timelines are fictional estimates. Generated from `langchain-coreweave-handoff.md` and `config/langchain.md`, where every lead time is an estimate.

# Activation board: CoreWeave

**Status: Draft, 0 of 9 sections reviewed.** Tick each section's box as you
review it. Change this line to `Status: Reviewed` only when every box is ticked.

Handoff gate: all required fields filled. One of them, time to triage a ticket
today, is an estimate.

## Read this first

- [ ] Reviewed

- **Handoff** dated 2026-09-09, filled by M. Osei (rep) and K. Lindqvist (SE),
  received by S. Adeyemi (activation specialist).
- **Config read:** `config/langchain.md`. The products field names LangSmith,
  which matches it. No private config present.
- **Industry:** AI cloud infrastructure.
- **Close date** 2026-09-04. **Contract start** 2026-09-14, which is day 1.
  **Target go-live** 2026-11-16, preferred, not fixed.

**The job, in their words** (call recording, discovery call, 2026-08-26):
"Every new support ticket gets read, tagged and routed to the right queue by our
triage agent, and no ticket data ever leaves our environment."

**Why now** (call recording, discovery call, 2026-08-26): ticket volume grew
faster than the support engineering team. Engineers triage by hand on a weekly
rotation, and misrouted tickets bounce between queues.

**The calendar.** Go-live 2026-11-16, because their support team takes on a new
customer tier on 2026-12-01 and wants triage automated before the extra volume
arrives (Tomás, commercial call, 2026-09-03). If it slips, the rotation keeps
triaging by hand through the new tier's first month (rep's read). One freeze:
**2026-10-26 to 2026-10-30**, a platform change freeze with no production
changes. The config says freezes pause work, so those five days do not count
toward any lead time below.

**What was purchased, against the config.** Observability, Evaluation,
Monitoring and alerts, and LangSmith Deployment, on the Enterprise plan. The
deployment option, Hybrid or Self-hosted, is not decided. Workspace and access
is not named in the products field, but section 6 has a block for it and SSO is
required, so it is planned here (inferred). Cloud deployment is out of scope:
"The agent must run in their environment" (Lena, commercial call, 2026-09-03).

**The one rule that shapes everything.** Customer ticket data must stay inside
their environment (Lena, commercial call, 2026-09-03). The config says no
customer data is traced until **Decide where traces live** is recorded. Until
then, tracing runs on test tickets only.

### Open questions

Every `UNKNOWN`, every unclear answer, and every request with no volume,
grouped into six open questions to ask at kickoff. Each keeps its original
questions as a checklist, so the answer can be ticked off line by line.

**1. "Who sponsors this on your side, and who decides it worked?"**
Blocks every Blocked item on this board, because the exec sponsor is their
default owner. Date at risk: kickoff, and the security review if it stalls. Ask:
Tomás Varga.
- [ ] Who is the exec sponsor? *From: Exec sponsor (unblocks and pays)*
- [ ] Has the exec sponsor been on a call with us? *From: Has the exec sponsor ever been on a call with us?*
- [ ] Who judges whether this worked? Tomás thinks the head of support, who has not been on a call. *From: Who inside their company judges that*
- [ ] Who reports the misrouted ticket share upward each month? *From: Number attached, and who reports it upward*

*From: Exec sponsor (unblocks and pays) · Has the exec sponsor ever been on a call with us? · Who inside their company judges that · Number attached, and who reports it upward*

**2. "Where may traces and ticket data live, and what does your security review need from us?"**
Blocks Deployment and production tracing. Date at risk: go-live, 2026-11-16.
Ask: Lena Hartmann.
- [ ] Hybrid or Self-hosted? Not decided. *From: Products and tiers purchased*
- [ ] Where may traces live: LangSmith Cloud with inputs and outputs masked, BYOC, or self-hosted LangSmith? *From: Data residency or regional hosting requirements · product config*
- [ ] When will the vendor questionnaire come to us? *From: Open items at signature (questionnaire, pen test report, DPA, insurance)*
- [ ] Which security reports does Lena need? Not said. *From: Certifications they need from us*

*From: Products and tiers purchased · Data residency or regional hosting requirements · Open items at signature (questionnaire, pen test report, DPA, insurance) · Certifications they need from us · product config*

**3. "Who runs the cluster the agent will live on?"**
Blocks Deployment. Date at risk: go-live, 2026-11-16. Ask: Tomás Varga, then the
platform team; *unassigned* until someone there is named, routed to the exec
sponsor.
- [ ] Who on the platform team owns the Kubernetes cluster? Nobody named. *From: Who holds the credentials for each system above*
- [ ] Has the platform team agreed to host the agent? Not yet. *From: Has anyone outside the buying team agreed to this*
- [ ] Must the agent be running in their environment by day 30? Tomás wants it; Lena says not before her review. *From: Must something here be live by day 30?*
- [ ] Who approves the firewall change for outbound connections, and how long does it take? *From: Restrictions on installing software or outbound connections*

*From: Who holds the credentials for each system above · Has anyone outside the buying team agreed to this · Must something here be live by day 30? · Restrictions on installing software or outbound connections*

**4. "Who owns your identity provider, and who needs access where?"**
Blocks Set up SSO, and with it the week 1 promise. Date at risk: week 1. Ask:
Owen Achebe, introduced by Tomás.
- [ ] Which identity provider? Not said. *From: Identity provider*
- [ ] Is automated user provisioning (SCIM) required? *From: Automated user provisioning (SCIM) required*
- [ ] Has Owen heard about this project, and how long does adding an app take? *From: Identity / IT contact · Anything promised on timing specifically*
- [ ] "Keep dev and production apart": how many environments? **Discovery task.** *From: What they want set up first, workspace and access, request 2*

*From: Identity provider · Automated user provisioning (SCIM) required · Identity / IT contact · Anything promised on timing specifically · What they want set up first, workspace and access, request 2*

**5. "What should the agent's quality be measured against?"**
Blocks Evaluation. Date at risk: the eval baseline after the first week of real
traffic. Ask: Tomás Varga.
- [ ] "Know before we ship if a prompt change makes routing worse": how many prompt changes a month? **Discovery task.** *From: What they want set up first, evaluation, request 1*
- [ ] Anything out of scope for evaluation? *From: Explicitly out of scope for now*
- [ ] How many agent runs a month do they expect in production? *From: Agent runs per month expected in production*
- [ ] May the ~2,000 past tickets with a known queue (estimate) seed an eval dataset, given where data may live? *From: Past tickets with a known correct queue · Data residency or regional hosting requirements*

*From: What they want set up first, evaluation, request 1 · Explicitly out of scope for now · Agent runs per month expected in production · Past tickets with a known correct queue · Data residency or regional hosting requirements*

**6. "When the agent stops triaging at 3am, who should hear about it?"**
Blocks Monitoring and alerts. Date at risk: the alert thresholds after the first
week of real traffic. Ask: Tomás Varga.
- [ ] "Page us if the agent stops triaging": how many incidents a month today? **Discovery task.** *From: What they want set up first, monitoring and alerts, request 1*
- [ ] Anything out of scope for monitoring? *From: Explicitly out of scope for now*
- [ ] Who receives alerts, and through their on-call paging tool? *From: Anything already built or automated they expect to keep · product config*

*From: What they want set up first, monitoring and alerts, request 1 · Explicitly out of scope for now · Anything already built or automated they expect to keep · product config*

### Conflicts

1. **Promised in sales: "SSO will be live in week 1"** (M. Osei to Tomás Varga,
   call recording, commercial call, 2026-09-03; "Deliverable as stated?"
   `UNKNOWN`). The config's SSO lead time is long when the identity team sits
   outside the buying team, and it does: Owen Achebe has not been on a call and
   has not heard about the project from us. Workspace and access is therefore
   planned at its long reading, 1 to 4 weeks, and SSO waits for their IT
   approval, which takes 3 to 4 weeks (Lena, commercial call). **Promised week
   1, lead time 4 to 8 weeks: reset expectations at kickoff.** The timing stays
   as promised on the board; it is not moved.
   *From: Commitments made during the sales cycle · Anything promised on timing specifically · Anything promised we are not sure we can deliver · Identity / IT contact · About how many weeks do their security or IT approvals take? (min to max) · product config*
2. **"No ticket data leaves our environment" against Hybrid.** The config says
   Hybrid keeps the agent in their infrastructure, but its traces go wherever
   the tracing endpoint points, which can be LangSmith Cloud. Choosing Hybrid
   does not on its own keep ticket data inside. Decide where traces live in week
   1, with Lena, before any real ticket is traced.
   *From: Data residency or regional hosting requirements · Products and tiers purchased · product config*
3. **Deployment by day 30: the handoff disagrees with itself.** Tomás wants the
   agent running in their environment by day 30; Lena says nothing touching real
   tickets runs before her review, which has not started. The config's lead time
   for Deployment is 4 to 10 weeks, plus 3 to 4 for their security and IT
   approval. Raise it at kickoff with both of them in the
   room.
   *From: Must something here be live by day 30? · Review status · Handoff notes · product config*
4. **Deployment is already drifting on day 1.** At the long end of its lead time,
   the latest safe start was 2026-08-05, before the contract started. See the
   drift check. The target date is preferred, not fixed. Week 1 decision:
   **Decide new go-live or cut scope**, owned by Tomás Varga (Step 1).
   *From: Fixed or preferred · Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config*

### First value (proposed, confirm at kickoff) (inferred)

- **Headline:** the triage agent's runs on test tickets, traced step by step in
  a dev project.
- **Volume:** ~18,000 tickets a month, measured (ticketing system export). First
  value runs on test tickets; real tickets wait for the trace storage decision.
- **Proof:** for a test ticket sent to the wrong queue, Tomás can open the trace
  and see which step chose the queue. That is the first step toward their
  signal, fewer tickets moved to a second queue.
- **Why first:** must be live by day 30, highest volume, and needs no security
  review while it runs on test data.
- **Why?** Two section 6 blocks have `day30_required: yes`: Workspace and access
  (~25 users, estimate) and Observability (~18,000 tickets, measured). The
  Observability request has the higher volume and is the one their
  `why_leaving` quote is about: "nobody can tell us why." It serves
  `success_signal` directly. The config makes it the week 1 quick win, on test
  data only.

### Milestones (inferred)

1. **Kickoff done**, by end of week 1 (2026-09-20)
   - Exec sponsor named (item: Identify exec sponsor)
   - SSO timing reset with Tomás (item: Confirm SSO provider)
   - Go-live date or scope decided (item: Decide new go-live or cut scope)
   - Success plan confirmed and shared (item: success plan)
2. **First traces**, by end of week 2 (2026-09-27)
   - Tracing on in a dev project (item: Turn on tracing)
   - Trace storage decision recorded (item: Decide where traces live)
3. **Foundation cleared**, by day 30 (2026-10-13)
   - Security review opened (item: Open the security review)
   - SSO tested by a real user (item: Set up SSO)
   - Platform owner named (item: Name owner: Prepare their infrastructure)

---

## Step 1, week one: Kickoff setup, Foundation, and workspace and access

- [ ] Reviewed

Per the config, the long items here are mostly waiting, which is why they start
first.

### Week 1 decision

| Decision | Why it is here | Owners | Status | From |
|---|---|---|---|---|
| Decide new go-live or cut scope | Deployment is Drifting on day 1 (conflict 4). At the long end of its lead time it finishes after 2026-11-16, and the review it waits on has not started. The date is preferred, not fixed. Options: move the target date, or cut what must be live on 2026-11-16. | Technical owner (them); CSM (us) | **Ready:** decide at kickoff, with the answer to open question 3 | From: Target go-live date · Fixed or preferred · Must something here be live by day 30? · product config |

### Kickoff setup

| Kickoff setup item | Where it stands | Status | From |
|---|---|---|---|
| Set up the organization | One organization for support engineering. Organization Admin: Tomás Varga, the named admin (inferred). | **Ready** | From: Day-to-day admin, if different · product config |
| Create workspaces | One team at launch. Separate test and production required: `yes`. The config separates environments with resource tags, not with workspaces. | **Ready** | From: Number of teams / workspaces · Separate test and production required · product config |
| Assign roles | About 25 support engineers. Who needs which role is not written down yet. | **Ready** | From: Teams in scope at launch · product config |
| Issue service keys | Needed before tracing can start. Nothing issued yet. | **Ready** | From: product config |
| Success plan: draft, confirm at kickoff, share by end of week 1 | Built from their stated outcome. The judge is `UNKNOWN`, so it goes to Tomás and the exec sponsor once named. | **Ready** | From: Their stated outcome · Who inside their company judges that |

### Foundation

| Foundation item | Lead time | Where it stands | Expected to finish | Status | From |
|---|---|---|---|---|---|
| Name the customer admin | Short to name; the time budget is what slips | Tomás Varga is named admin. He has about 8 hours a week and also runs the triage rotation. | Week 1 | **Ready:** confirm his hours in writing | From: Day-to-day admin, if different · Hours per week the technical owner has for this · product config |
| Confirm SSO provider | Short when the identity owner is in the room | Owen Achebe owns the identity provider, and has not been on a call. Which provider: not said. | Week 1 | **Ready:** Tomás introduces Owen | From: Identity / IT contact · Identity provider · product config |
| Set up SSO. **Promised in sales:** week 1 | 4 to 8 weeks: 1 to 4 (estimate; long here, the identity team sits outside the buying team), plus 3 to 4 for their IT approval. | SSO required: `yes`. Provider not said. SCIM `UNKNOWN`. Promised week 1, lead time 4 to 8 weeks: reset expectations at kickoff (conflict 1). | Weeks 4 to 8, counted from reaching Owen | **Gated by UNKNOWN:** `identity_provider`, `provisioning_required` | From: Single sign-on required · Identity provider · Automated user provisioning (SCIM) required · Commitments made during the sales cycle · product config |
| Decide where traces live | Short to decide (estimate) | Ticket data must stay inside their environment. The deployment option is not decided. Nothing recorded. | Week 1 to 2 | **Ready:** Lena Hartmann and Tomás decide | From: Data residency or regional hosting requirements · Products and tiers purchased · product config |
| Open the security review | 1 to 2 weeks on our side (estimate), plus their review | Required: `yes`. Status: not started. Sign-off: Lena Hartmann. Their questionnaire has not been sent to us. DPA with their legal team. | Our part in weeks 1 to 2; their review after that | **Ready:** ask Lena for the questionnaire | From: Security review required before deployment · Review status · Who owns security sign-off on their side · Open items at signature (questionnaire, pen test report, DPA, insurance) · product config |

### Module

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Workspace and access | Long here, 4 to 8 weeks: 1 to 4 (estimate; SSO depends on an identity team outside the buying team), plus 3 to 4 for their IT approval | Confirm SSO provider: not started, Owen not yet reached. List the people and roles: about 25 users (estimate), roles not assigned. | *"Their people sign in through their own identity provider, and nobody shares a login"*; *"Workspace roles match the people list, reviewed once by their admin"*; *"Someone who leaves loses access through their identity provider, without a ticket to us"* | **Gated by UNKNOWN:** `identity_provider`, `provisioning_required` | From: Single sign-on required · Identity / IT contact · Teams in scope at launch · product config |

**Requests, by volume** (`day30_required: yes`, SSO for the support
engineering team; out of scope: access for teams outside support engineering):

1. "Everyone signs in with our SSO", ~25 users, estimate.
   *From: What they want set up first, workspace and access, request 1*
2. "Keep dev and production apart", volume blank. **Discovery task**, Tomás
   Varga (open question 4).
   *From: What they want set up first, workspace and access, request 2*

## Step 2, week one quick win: Observability on test tickets

- [ ] Reviewed

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Observability | Short, 1 to 3 weeks (estimate). First traces in a cloud dev project with test data in week 1. Production tracing waits for the trace storage decision and the deployment. | Issue service keys: not issued. Decide where traces live: not decided, and needed before any real ticket is traced. Pick test data: not started; test tickets with no customer data, from Tomás. | *"Their engineers open a trace to debug a real failure, without us on the call"*; *"Traces from the production agent arrive from their own pipeline, in the project and location the storage decision names"*; *"No customer data appears anywhere the storage decision rules out, checked by their security contact"* | **Ready** for test data. Production tracing **Blocked** until the storage decision (Lena Hartmann). | From: Data residency or regional hosting requirements · Must something here be live by day 30? · product config |

**Requests, by volume** (`day30_required: yes`, traces of the agent on test
tickets; out of scope: tracing their other internal agents):

1. "See every step the agent took on a ticket", ~18,000 tickets a month,
   measured. First value.
   *From: What they want set up first, observability, request 1*

## Step 3, weeks 2 to 8: Deployment in their environment

- [ ] Reviewed

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Deployment. **Promised in sales:** "We'll help you choose between Hybrid and Self-hosted" | Long, 7 to 14 weeks: 4 to 10 (estimate), plus 3 to 4 for their security and IT approval. Gated by their security review and their infrastructure team. | Open the security review: not started, questionnaire not sent. Decide where traces live: not decided. Name the platform owner: nobody named; the platform team has not been on a call. Outbound connections need an IT-approved firewall change. | *"The agent handles real tickets from their infrastructure, deployed by their team through their own pipeline"*; *"They ship a new version of the agent without us"*; *"Security sign-off is recorded in writing by their security contact"* | **Blocked:** no platform owner. Unblocked by the exec sponsor, by default, because the handoff names nobody; the exec sponsor is `UNKNOWN` too. | From: Products and tiers purchased · Security review required before deployment · Who holds the credentials for each system above · Has anyone outside the buying team agreed to this · Restrictions on installing software or outbound connections · Commitments made during the sales cycle · product config |

**Requests, by volume** (`day30_required: UNKNOWN`, conflict 3; out of scope:
cloud deployment):

1. "Run the triage agent on our own cluster", ~18,000 tickets a month,
   measured.
   *From: What they want set up first, deployment, request 1*

The second commitment, help choosing between Hybrid and Self-hosted (K.
Lindqvist to Lena Hartmann, deliverable: `yes`), sits on the config step
**Decide the deployment option**.

## Step 4, after one week of real traffic: Evaluation, and Monitoring and alerts

- [ ] Reviewed

Both are earned: they need a week of real traffic to have a pattern to measure.
Neither can start its real work inside 30 days, because real traffic waits on
Deployment. Each gets groundwork as its first step.

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |
|---|---|---|---|---|---|
| Evaluation | Earned, 2 to 4 weeks (estimate) after a week of real traffic | Trace production traffic: not possible until Deployment and the storage decision. Agree what a good outcome is: their outcome says "triaged within 5 minutes, fewer misrouted", not yet written as a scoring rule. Name a reviewer: not named. | *"An experiment compared two versions of their agent, and the result changed a decision (a version shipped, or did not)"*; *"The dataset holds examples from real tickets, reviewed by a person on their side"*; *"Evaluation runs as a step before they release a new version, run by them"* | **Blocked** behind production traffic. First step inside 30 days: groundwork, agree what a good outcome is and name a reviewer. | From: Their stated outcome · How they will know it worked · Past tickets with a known correct queue · product config |
| Monitoring and alerts | Earned, 1 to 2 weeks (estimate) from the first week of production traffic | Trace production traffic: as above. Name the alert owner: not named. Their on-call paging tool stays. | *"Their on-call received an alert from the production project and acted on it"*; *"Thresholds were set from real traffic and reviewed once since"*; *"The dashboard is reviewed in a standing meeting by a named owner"* | **Blocked** behind production traffic. First step inside 30 days: groundwork, name the alert owner. | From: Anything already built or automated they expect to keep · product config |

**Requests, by volume:**

1. Evaluation: "Know before we ship if a prompt change makes routing worse",
   volume `UNKNOWN`. **Discovery task**, Tomás Varga (open question 5).
   *From: What they want set up first, evaluation, request 1*
2. Monitoring and alerts: "Page us if the agent stops triaging", volume
   `UNKNOWN`. **Discovery task**, Tomás Varga (open question 6).
   *From: What they want set up first, monitoring and alerts, request 1*

---

## Drift check

- [ ] Reviewed

Checked as of **2026-09-14** (day 1). Every threshold comes from the config's
**Drift rules**: a buffer of 0 weeks, freeze periods pause work, amber uses the
long end of the lead time and red the short end. The freeze from 2026-10-26 to
2026-10-30 is skipped in every count below. All lead times are estimates, so
every flag here rests on an estimate. Where the config says an item waits for
their approval, the lead time includes their approval time, 3 to 4 weeks
(approval_lead_time). The app rechecks these against its own as-of date.

| Module | Lead time in weeks | Latest safe start | Earliest finish if started 2026-09-14 | Flag | From |
|---|---|---|---|---|---|
| Deployment | 7 to 14: 4 to 10 (estimate) plus 3 to 4 for their approvals | 2026-08-05 | 2026-11-07 | **Drifting** (amber). Turns red from 2026-09-24 if still not started. | From: Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |
| Workspace and access (long here: identity team outside the buying team) | 4 to 8: 1 to 4 (estimate) plus 3 to 4 for their IT approval | 2026-09-16 | 2026-10-12 | None. Turns amber after 2026-09-16 and red from 2026-10-15 if still not started. | From: Target go-live date · Identity / IT contact · product config |

Observability is short, and Evaluation and Monitoring and alerts are earned, so
none of them is checked.

## Ordering rules, stated plainly

- [ ] Reviewed

The config gives three. *From: product config*

- **No customer data is traced until the trace storage decision is recorded.**
  Applies now: week 1 tracing runs on test tickets only.
- **Alert thresholds set before a week of real traffic either page for nothing
  or miss the real problem.** Applies: thresholds wait for production traffic.
- **An eval baseline built before real traffic measures the test set, not their
  tickets.** Applies: the baseline experiment waits for production traffic.

## Where these plans usually slip, checked against this handoff

- [ ] Reviewed

| Known failure mode (config: expected patterns, estimate) | Here | From |
|---|---|---|
| The security review of Hybrid or Self-hosted surfaces in week five instead of week one | **Avoidable now.** Required, not started, and the questionnaire has not been sent. Ask for it at kickoff. | From: Security review required before deployment · Review status · product config |
| SSO waits on an identity team that was never in the kickoff | **Already happening.** Owen Achebe owns the identity provider and has not heard about the project, and SSO was promised for week 1. | From: Identity / IT contact · Commitments made during the sales cycle · product config |
| Nobody decides where traces may live, so production tracing never starts | **Not yet visible.** The requirement is clear; the decision has no date. Put it in week 1. | From: Data residency or regional hosting requirements · product config |
| Self-hosting needs a cluster and datastores their platform team has not planned for | **Already happening.** The platform team has not been on a call, and nobody there is named. | From: Who holds the credentials for each system above · Has anyone outside the buying team agreed to this · product config |
| The eval dataset is built from made-up examples only, so the baseline says nothing about real tickets | **Not yet visible.** About 2,000 past tickets with a known queue exist (estimate); whether they may be used depends on the storage decision. | From: Past tickets with a known correct queue · product config |
| The agent goes live and nobody owns the alerts | **Not yet visible.** No alert owner is named. | From: product config |

Two of six are already happening, one is avoidable if acted on this week, and
three are not yet visible. The week-one agenda is people and decisions: the exec
sponsor, Owen, the platform owner, and where traces live.

## Item index

- [ ] Reviewed

Every item on this board, one row each, in plan order: the tasks, decisions and
open questions above, plus the config steps the plan schedules after day 30.
Names are short titles: the config's, a rule's, or, for an open question, its topic from the fixed list. The
app's item list must match this table exactly. "Week" is the plan week the item
is due in; "after" means after day 30.

| Item | Kind | Week | Module |
|---|---|---|---|
| Set up the organization | task | 1 | Workspace and access |
| Create workspaces | task | 1 | Workspace and access |
| Assign roles | task | 1 | Workspace and access |
| Issue service keys | task | 1 | Workspace and access |
| Draft the success plan | task | 1 | Success plan |
| Decide new go-live or cut scope | decision | 1 | Deployment |
| People and sponsor | question | 1 | Kickoff questions |
| Security review and data | question | 1 | Kickoff questions |
| Platform owner | question | 1 | Kickoff questions |
| Access and identity | question | 1 | Kickoff questions |
| Baseline numbers | question | 1 | Kickoff questions |
| Alert owners | question | 1 | Kickoff questions |
| Identify exec sponsor | task | 1 | People |
| Raise conflict: Set up SSO | task | 1 | Workspace and access |
| Raise conflict: Deploy the agent | task | 1 | Deployment |
| Name the customer admin | task | 1 | Workspace and access |
| Confirm SSO provider | task | 1 | Workspace and access |
| Set up SSO | task | 1 | Workspace and access |
| Decide where traces live | decision | 1 | Observability |
| Open the security review | task | 1 | Deployment |
| Capture baselines | task | 1 | Baseline |
| Pick test data | task | 1 | Observability |
| Turn on tracing | task | 1 | Observability |
| Decide the deployment option | decision | 2 | Deployment |
| Name owner: Prepare their infrastructure | task | 1 | Deployment |
| Agree what a good outcome is | task | 2 | Evaluation |
| Name a reviewer | task | 2 | Evaluation |
| Prepare their infrastructure | task | 3 | Deployment |
| Mask sensitive fields | task | 3 | Observability |
| Name the alert owner | task | 3 | Monitoring and alerts |
| Hold the day 30 review | task | 4 | Review |
| Deploy the agent | task | after | Deployment |
| Record security sign-off | task | after | Deployment |
| Trace production traffic | task | after | Observability |
| Build the eval dataset | task | after | Evaluation |
| Choose evaluators | task | after | Evaluation |
| Run a baseline experiment | task | after | Evaluation |
| Turn on online evaluators | task | after | Evaluation |
| Build a project dashboard | task | after | Monitoring and alerts |
| Set alert thresholds | task | after | Monitoring and alerts |
| Route alerts to on-call | task | after | Monitoring and alerts |
