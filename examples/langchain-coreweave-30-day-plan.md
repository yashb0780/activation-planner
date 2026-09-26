> **Unofficial demo of a hypothetical engagement. Not affiliated with LangChain or CoreWeave.** Scenario, people, and timelines are fictional estimates. Generated from `langchain-coreweave-handoff.md` and `langchain-coreweave-board.md`.

# Draft 30-day plan: CoreWeave

**Status: Draft, 0 of 8 sections reviewed.** Tick each section's box as you
review it. Change this line to `Status: Reviewed` only when every box is ticked.

Handoff gate: all required fields filled. One of them, time to triage a ticket
today, is an estimate.

### People

Tasks below name roles, not people. Each name is looked up here, so a change
to one name changes every task that uses the role. Default owners: CSM (us) and
Technical owner (them). A task names other roles only where this plan does.

| Side | Role | Name |
|---|---|---|
| Us | CSM | S. Adeyemi |
| Us | Implementation lead | S. Adeyemi (activation specialist; received the handoff) |
| Us | SE | K. Lindqvist |
| Us | Rep | M. Osei |
| Them | Technical owner | Tomás Varga, Staff Engineer, Support Engineering |
| Them | Exec sponsor | *not named* (`UNKNOWN`) |
| Them | Day-to-day admin | Tomás Varga |
| Them | Security contact | Lena Hartmann, Security Engineering Manager |
| Them | Identity / IT contact | Owen Achebe, IT Identity Lead (never on a call) |
| Them | Platform owner | *not named*: the platform team runs the cluster, nobody there is named |

**Day 1 is 2026-09-14**, the contract start date. Day 30 is 2026-10-13.

**What this document is.** CoreWeave bought LangSmith to trace, evaluate and
monitor a support triage agent, and to run it in their own environment.
Deployment there runs 4 to 10 weeks (estimate) behind a security review that
has not started. A 30-day plan against that is not a list of things that will
be finished. It answers three questions: what got started, what proof exists
that it is moving, and what is on track to land after day 30. Nothing below is
late because it is unfinished at day 30.

Every purchased module gets a first step inside the 30 days. For Evaluation and
Monitoring and alerts, the first step is groundwork, because the config says
they wait for a week of real traffic.

This is a draft. It has not been agreed with the customer.

---

## Week 1: 14 to 20 September

- [ ] Reviewed

**Focus:** Reset the SSO promise, find the people who are missing (exec
sponsor, platform owner, Owen), decide where traces may live, and get the first
traces flowing on test tickets.

**Starting**

- **Kickoff setup**, first: quick base-level setup done at kickoff.
  - **Set up the organization.** One organization; Tomás Varga as
    Organization Admin (inferred: he is the named admin).
    *Owners: CSM (us); Technical owner (them) · From: Day-to-day admin, if different · product config*
    *Done when:* Organization exists · Tomás can sign in as Organization Admin
  - **Create workspaces.** One team at launch. Dev and production kept apart
    with resource tags (`Environment: dev`, `prod`), as the config advises.
    *Owners: CSM (us); Technical owner (them) · From: Number of teams / workspaces · Separate test and production required · product config*
    *Done when:* Workspace created for support engineering · Environment tags agreed and written down
  - **Assign roles.** For about 25 support engineers.
    *Owners: CSM (us); Technical owner (them) · From: Teams in scope at launch · product config*
    *Done when:* Role for each person listed · Roles assigned in the workspace
  - **Issue service keys.** For the agent, not personal tokens.
    *Owners: CSM (us); Technical owner (them) · From: product config*
    *Done when:* A service key exists for the agent · It is stored where their pipeline reads secrets
  - **Draft the success plan, confirm it at kickoff, share it by end of week 1.**
    One page: their goal in their words ("Every new ticket is triaged by the
    agent within 5 minutes, and fewer tickets are misrouted than today."),
    success measures with their baselines (first-time-right routing ~80%,
    estimate; ~6 minutes to triage a ticket by hand, estimate), the proposed
    first value, milestones with target weeks, and the People list above.
    *Owners: CSM (us); Technical owner (them) · From: Their stated outcome · How they will know it worked · Share of tickets routed to the right queue the first time · Time a person takes to triage one ticket today*
    *Done when:* One-page success plan drafted · Confirmed with Tomás at kickoff · Shared with Tomás and the exec sponsor, once named
- **The six open questions** from the board, asked at kickoff, each with its
  checklist to tick off as the answers come in.
  *Owners: CSM (us); Technical owner (them) · From: every `UNKNOWN` in the handoff, listed per question on the board*
  *Done when:* Every checklist line ticked, or given an owner and a date · Each answer saved on its question
- **Identify exec sponsor.** Nobody above Tomás has been on a call; the order
  form came back through procurement.
  *Owners: CSM (us); Technical owner (them) · From: Exec sponsor (unblocks and pays) · Has the exec sponsor ever been on a call with us? · Handoff notes*
  *Done when:* Exec sponsor named · They have been on a call with us, or one is booked
- **Decision: Reset go-live date or cut scope.** Deployment is already drifting
  on day 1: at the long end of its lead time it finishes after 2026-11-16. The
  date is preferred, not fixed (board conflict 4).
  *Owners: Technical owner (them); CSM (us) · From: Target go-live date · Fixed or preferred · Must something here be live by day 30? · product config*
  *Done when:* Decision recorded: a new target date, or what is cut from 2026-11-16 · Tomás signs it off · Shared with the exec sponsor, once named
- **Foundation**: every item from the config, each at its own lead time.
  Foundation starts in week 1; it does not make a long item finish in week 1.
  - **Name the customer admin.** Tomás is named. Confirm his hours: about 8 a
    week, and he also runs the triage rotation.
    *Owners: CSM (us); Technical owner (them) · From: Day-to-day admin, if different · Hours per week the technical owner has for this · product config*
    *Done when:* Tomás confirmed as admin · His weekly hours for this written down
  - **Confirm SSO provider.** Tomás introduces Owen Achebe, who has not heard
    about the project.
    *Owners: CSM (us); Identity / IT contact (them) · From: Identity / IT contact · Identity provider · product config*
    *Done when:* Owen has been on a call · Identity provider named · SCIM required, yes or no
  - **Set up SSO. Promised in sales: SSO in week 1.** Promised week 1, lead
    time 1 to 4 weeks: reset expectations at kickoff (board conflict 1). The
    work starts this week with Owen.
    *Owners: CSM (us); Identity / IT contact (them) · From: Commitments made during the sales cycle · Single sign-on required · Identity provider · Automated user provisioning (SCIM) required · product config*
    *Done when:* New SSO timing agreed with Tomás · Owen has what he needs to add the app
  - **Decide where traces live.** Ticket data must stay inside their
    environment. Options from the config: LangSmith Cloud with inputs and
    outputs masked, BYOC, or self-hosted LangSmith.
    *Owners: CSM, SE (us); Security contact, Technical owner (them) · From: Data residency or regional hosting requirements · Products and tiers purchased · product config*
    *Done when:* Decision recorded with the reason · Lena has signed it off
  - **Open the security review.** Required, not started. Ask Lena for the
    vendor questionnaire.
    *Owners: CSM (us); Security contact (them) · From: Security review required before deployment · Review status · Open items at signature (questionnaire, pen test report, DPA, insurance) · product config*
    *Done when:* Questionnaire received from Lena · The security reports she needs are listed
- **Capture baselines.** One section 10 number is `UNKNOWN`: agent runs per month
  expected in production. Capture it before any module is configured.
  *Owners: CSM (us); Technical owner (them) · From: Agent runs per month expected in production*
  *Done when:* Expected runs per month recorded, labelled estimate or measured
- **Three discovery tasks**: find the volume for each request that has none.
  Each is a checklist line under an open question on the board.

  | Request | Owners | From |
  |---|---|---|
  | Workspace and access: "Keep dev and production apart" | CSM (us); Technical owner (them) | What they want set up first, workspace and access, request 2 |
  | Evaluation: "Know before we ship if a prompt change makes routing worse" | CSM (us); Technical owner (them) | What they want set up first, evaluation, request 1 |
  | Monitoring and alerts: "Page us if the agent stops triaging" | CSM (us); Technical owner (them) | What they want set up first, monitoring and alerts, request 1 |

- **Quick win: first traces on test tickets.** Test data only, because the
  storage decision is not recorded yet.
  - **Pick test data.** Test tickets with no customer data in them.
    *Owners: CSM (us); Technical owner (them) · From: Data residency or regional hosting requirements · product config*
    *Done when:* A set of test tickets chosen · Tomás confirms none holds customer data
  - **Turn on tracing.** In a cloud dev project tagged `Environment: dev`.
    *Owners: CSM (us); Technical owner (them) · From: What they want set up first, observability, request 1 · product config*
    *Done when:* The agent's runs on test tickets appear as traces · Tomás opens one and sees which step chose the queue

**Reaching evidence this week**

None, and none should. Traces of test tickets are configuration, not evidence.

**Needed from the customer**

- Tomás Varga: who the exec sponsor is; an introduction to Owen Achebe; who on
  the platform team owns the cluster; test tickets with no customer data.
- Lena Hartmann: the vendor questionnaire; which security reports she needs;
  where traces may live.
- Owen Achebe: which identity provider, whether SCIM is required, and how long
  adding an app takes.

**Checkpoint:** End of week: exec sponsor named, SSO timing reset with Tomás,
go-live date or scope decided, trace storage decision on Lena's desk, and first
traces on test tickets.

**Risks live this week**

- The SSO promise is already shorter than the config's lead time. The longer it
  goes unsaid, the more it costs.
- Any real ticket traced before the storage decision breaks the one rule they
  gave us.

## Week 2: 21 to 27 September

- [ ] Reviewed

**Focus:** Settle Hybrid or Self-hosted, find the platform owner, and start the
groundwork for Evaluation.

**Starting**

- **Choose the deployment option. Promised in sales: "We'll help you choose
  between Hybrid and Self-hosted."** K. Lindqvist walks Lena and Tomás through
  both, against the storage decision.
  *Owners: SE, CSM (us); Security contact, Technical owner (them) · From: Commitments made during the sales cycle · Products and tiers purchased · product config*
  *Done when:* Option recorded with the reason · Lena agrees it fits her review
- **Name the platform owner.** Nobody on the platform team is named, and they
  have not agreed to host the agent. Routed to the exec sponsor by default.
  *Owners: CSM (us); Exec sponsor (them) · From: Who holds the credentials for each system above · Has anyone outside the buying team agreed to this · product config*
  *Done when:* A platform owner is named · They have been on a call with us
- **Set up SSO**, if Owen was reached in week 1.
  *Owners: CSM (us); Identity / IT contact (them) · From: Single sign-on required · Identity / IT contact · product config*
  *Done when:* SSO configured · One support engineer signs in through SSO
- **Evaluation groundwork: Agree what a good triage is.** Their outcome says
  "within 5 minutes" and "fewer misrouted"; turn that into what an evaluator
  scores.
  *Owners: CSM (us); Technical owner (them) · From: Their stated outcome · How they will know it worked · product config*
  *Done when:* A correct triage defined in writing · Tomás signs it off
- **Evaluation groundwork: Name a reviewer.** Someone on their side who checks
  reference outputs.
  *Owners: CSM (us); Technical owner (them) · From: product config*
  *Done when:* A reviewer is named · Their weekly time for it written down

**Reaching evidence this week**

None.

**Needed from the customer**

- Lena and Tomás in one meeting to choose the deployment option.
- The exec sponsor, or Tomás, to name a platform owner.

**Checkpoint:** Deployment option recorded, platform owner named or escalated,
and the security questionnaire back with our answers.

**Risks live this week**

- Without a platform owner, Deployment cannot start, and it is already drifting.
- If Owen was not reached in week 1, SSO moves toward the long end of its lead
  time.

## Week 3: 28 September to 4 October

- [ ] Reviewed

**Focus:** Start the infrastructure work if the review allows it. Name who owns
alerts.

**Starting**

- **Prepare their infrastructure**, once the option is chosen and a platform
  owner is named: the cluster, datastores and network access the chosen option
  needs, including the IT-approved firewall change for outbound connections.
  *Owners: CSM, SE (us); Platform owner (them), not named · From: Restrictions on installing software or outbound connections · Who holds the credentials for each system above · product config*
  *Done when:* The cluster for the agent named · Firewall change request raised with IT · Datastores listed, if Self-hosted
- **Mask sensitive fields**, only if traces will go to LangSmith Cloud.
  *Owners: CSM (us); Technical owner, Security contact (them) · From: Data residency or regional hosting requirements · product config*
  *Done when:* Masking switched on in the dev project · Lena checks a test trace and finds no ticket content
- **Monitoring groundwork: Name the alert owner.** Who receives alerts, through
  their on-call paging tool.
  *Owners: CSM (us); Technical owner (them) · From: Anything already built or automated they expect to keep · product config*
  *Done when:* An alert owner is named · Their on-call route written down

**Reaching evidence this week**

None. Every evidence line needs real tickets, which wait on Deployment.

**Needed from the customer**

- The platform owner: which cluster, and who raises the firewall change.
- Lena: where her review stands.

**Checkpoint:** Infrastructure work started or explicitly waiting on the review,
with a date.

**Risks live this week**

- The platform change freeze (26 to 30 October) lands inside the Deployment
  runway. Every week lost now pushes more of the work against it.

## Week 4: 5 to 13 October

- [ ] Reviewed

**Focus:** Hold the day 30 review against real states, not intentions. Leave
room.

**Starting**

- **Hold the day 30 review.**
  *Owners: CSM (us); Technical owner, Exec sponsor (them) · From: Target go-live date · What is driving it (audit, contract expiry, office opening, fiscal year, board promise)*
  *Done when:* Held with Tomás and the exec sponsor · Go-live date checked against the Deployment window · Security review status written down with a date

**Reaching evidence this week**

Possible, one item only, and only if SSO is live: *"Their people sign in
through their own identity provider, and nobody shares a login."*

**Needed from the customer**

- The exec sponsor at the day 30 review.

**Checkpoint:** Day 30 review, 13 October.

**Risks live this week**

- Week 4 is deliberately light. Slip from the people questions in week 1 lands
  here.

---

## Where this stands at day 30

- [ ] Reviewed

Not a pass/fail list. Three categories.

### Started and moving, with proof

| Module | Day-30 checkpoint: the observable signal | From |
|---|---|---|
| Workspace and access | Organization, workspace and roles set. SSO tested by a real support engineer, if Owen was reached in week 1. | From: Single sign-on required · Identity / IT contact · product config |
| Observability | The agent's runs on test tickets traced in a dev project; the storage decision recorded and signed by Lena. | From: What they want set up first, observability, request 1 · Data residency or regional hosting requirements · product config |

### Started as waiting, with the gate as the signal

| Module | Day-30 checkpoint: the observable signal | From |
|---|---|---|
| Deployment | The gate, not the deployment. Signals in order: questionnaire received and answered; deployment option recorded; platform owner named; firewall change request raised. Each would be false if nothing had happened. | From: Security review required before deployment · Who holds the credentials for each system above · Restrictions on installing software or outbound connections · product config |

### Groundwork only, and correctly so

| Module | First step taken, and why it stops there | From |
|---|---|---|
| Evaluation | A correct triage defined in writing and a reviewer named. The baseline waits for a week of real traffic. | From: Their stated outcome · product config |
| Monitoring and alerts | An alert owner named with their on-call route. Thresholds wait for a week of real traffic. | From: Anything already built or automated they expect to keep · product config |

## On track to land after day 30

- [ ] Reviewed

Windows are the config's lead times (all estimates), anchored to the event that
starts the clock. They are windows, not dates. The freeze from 2026-10-26 to
2026-10-30 is counted: it adds five days to any window that crosses it.

| Module | Window | What has to stay true | Drift flag (as of day 1) | From |
|---|---|---|---|---|
| SSO | 1 to 4 weeks from reaching Owen. **Promised in sales:** week 1. | Owen is reached in week 1. | Not flagged: finishes inside its window | From: Commitments made during the sales cycle · Identity / IT contact · product config |
| Deployment | 4 to 10 weeks from the security review allowing work to start, plus five freeze days if the runway crosses 26 to 30 October. Started on day 1, the earliest finish would be 2026-10-12; at the long end it would be after the target date. | The questionnaire comes back in week 2, and a platform owner is named by week 2. | **Drifting** (amber); red from 2026-10-15 if not started | From: Products and tiers purchased · Target go-live date · Known freeze periods, as YYYY-MM-DD to YYYY-MM-DD (quarter end, holiday change freeze) · product config |
| Evaluation | 2 to 4 weeks after a week of production traffic | Real tickets may be traced; a reviewer is named. | Not checked: earned | From: product config |
| Monitoring and alerts | 1 to 2 weeks after the first week of production traffic | An alert owner is named. | Not checked: earned | From: product config |

**What this means for go-live, said plainly.** Go-live on 2026-11-16 holds only
if Deployment lands near the short end of its lead time. That depends on two
things this plan cannot do alone: Lena's review moving in weeks 1 and 2, and a
platform owner appearing. Worth saying at kickoff, not at the day 30 review.

## What would change this plan

- [ ] Reviewed

1. **Where traces may live.** If only self-hosted LangSmith satisfies Lena, the
   Deployment work grows to include LangSmith itself, and the windows above
   move.
2. **Who the platform owner and exec sponsor are.** Deployment is Blocked on
   the first, and every Blocked item routes to the second by default.
3. **How long Owen's team takes to add an app.** It decides whether the SSO
   promise is a week late or a month late.

## Downgrades applied in review

- [ ] Reviewed

Step 7 of the skill, run against this draft. Each claim below was written, then
caught by a `Not evidence` line in `config/langchain.md`, then restated.

| Claim as drafted | Caught by | What it became |
|---|---|---|
| "Observability live in week 1" | *Not evidence: an API key created, one test trace sent from a notebook, a screenshot of the trace view.* | "The agent's runs on test tickets traced in a dev project." The evidence is their engineers debugging a real failure from a trace. |
| "SSO done by day 30" | *Not evidence: SSO configured but not tested with a real user, invites sent, an organization created.* | "SSO tested by a real support engineer, if Owen was reached in week 1." |
| "Deployment environment ready" | *Not evidence: a deployment created in a sandbox, an Agent Server running on a laptop, a demo deployed by the SE.* | Replaced with named gate signals: questionnaire answered, option recorded, platform owner named, firewall change raised. |

Each of these would still have been true if nobody at CoreWeave had run their
agent since go-live.
