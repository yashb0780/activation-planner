# Product config: LangChain

Unofficial demo for a hypothetical engagement. Not affiliated with LangChain. LangChain is named as plain text only: no logo, colours or visual identity. Every lead time below is an estimate, not a fact about LangChain.

**What this file is:** the product half of an activation plan, in the same shape as `config/itsm.md`. The handoff says what the customer wants and by when. This file says what each module costs to stand up, what has to exist first, and what counts as proof it is live.

**Sources:** product names and facts come from public pages on docs.langchain.com, read 2026-09-25. Each page is listed under **Sources** at the end. Anything not found there is marked `estimate` or left out.

## The product in one line

LangSmith, a platform for building, observing, evaluating and deploying AI agents: tracing (Observability), datasets, evaluators and experiments (Evaluation), dashboards and alerts, and LangSmith Deployment, which runs agents on Agent Servers in LangChain's cloud, in the customer's infrastructure (Hybrid), or fully self-hosted.

## How to read the fields

**Lead time** is calendar time from kickoff to the evidence below being true, assuming the customer shows up. It is not effort. Every number in this file is an estimate.

* Short: 1 to 2 weeks (estimate). Configuration we control.
* Long: 4 to 10 weeks (estimate). Gated by something on the customer's side: a security review, their identity team, their infrastructure team, or a decision about where data may live. Start these in week one.

**Depends on** is a hard prerequisite. Starting a module before its dependencies are in place produces rework, not progress.

**Evidence** is what proves the module is doing work, not that it was switched on. The test for any piece of evidence: could this still be true if nobody at the customer had run their agent since go-live? If yes, it is not evidence, it is configuration.

**Short title** is the bold text at the start of a bullet or step. Every task built from that bullet uses it, word for word, as its title on the board. Verb first, 2 to 6 words.

**Needs customer approval** names the kind of sign-off the customer gives before the item can finish: `security`, `IT` or `procurement`. The planner adds the customer's usual approval time (from the handoff) to the lead time of these items only.

## Kickoff setup

Quick base-level setup done at kickoff, first in week one. The planner adds the customer success plan to this list for every product. Module for all of these: Workspace and access.

* **Set up the organization.** One organization for the customer, with an Organization Admin named. Organizations hold settings shared across all workspaces.
* **Create workspaces.** One workspace per team in scope. Separate dev, staging and production with resource tags (tag key `Environment`), not with separate workspaces, as the docs advise.
* **Assign roles.** Organization roles (Admin, Operator, User, Viewer) and workspace roles (Admin, Editor, Viewer). Workspace roles need the Enterprise plan.
* **Issue service keys.** Service keys for the agent and pipelines (service accounts); personal access tokens only for people.

## Foundation

Nothing below starts cleanly without these. Every item starts in week one. Each keeps its own lead time, so a long one starts in week one and may finish later.

* **Name the customer admin.** A named admin on the customer side with time budgeted, not an interested volunteer. Module: Workspace and access. Lead time: short to name; the time budget is what slips.
* **Confirm SSO provider.** Which identity provider, and who on their side owns adding an app to it. The docs have setup guides for Entra ID, Google and Okta. Module: Workspace and access. Lead time: short when the identity owner is in the room.
* **Set up SSO.** SAML SSO, configured by an Organization Admin. Enterprise plan. Automated user provisioning (SCIM) is Enterprise too, and on cloud it needs SAML SSO first. Module: Workspace and access. Lead time: 1 week of product setup (estimate); long when the identity team sits outside the buying team. Needs customer approval: IT.
* **Decide where traces live.** Traces hold the agent's inputs and outputs, which for a support agent means customer data. The options: LangSmith Cloud (US or EU region) with sensitive inputs and outputs masked before they are sent; BYOC; or self-hosted LangSmith. No customer data is traced anywhere until this is recorded. Module: Observability. Lead time: short to decide (estimate); the security review may decide it for them.
* **Open the security review.** Their security team's review of the deployment option and the trace storage decision. We supply the documents they ask for. Module: Deployment. Lead time: 1 to 2 weeks on our side (estimate). Needs customer approval: security.

## Module: Workspace and access

Organization, workspaces, SSO and roles. Most of the work sits in Kickoff setup and Foundation above.

Lead time: Short without SSO. Long when SSO depends on an identity team outside the buying team.

Lead time in weeks: 1 to 4 (estimate)

Needs customer approval: IT

Depends on

* **Confirm SSO provider.** (Foundation)
* **List the people and roles.** Who needs access, in which workspace, with which role. Comes from the handoff's people and teams sections.

Steps

1. **Set up the organization.**
2. **Create workspaces.**
3. **Assign roles.**
4. **Set up SSO.**
5. **Turn on user provisioning.** Only if SCIM is required, and only after SSO works.

Evidence it is real

* Their people sign in through their own identity provider, and nobody shares a login
* Workspace roles match the people list, reviewed once by their admin
* Someone who leaves loses access through their identity provider, without a ticket to us

Not evidence: SSO configured but not tested with a real user, invites sent, an organization created.

## Module: Observability

Tracing: every run of the agent recorded as a trace in a tracing project.

Lead time: Short for first traces in a cloud dev project with test data, which can happen in week one. Production tracing waits for the trace storage decision and, if they host, for the deployment.

Lead time in weeks: 1 to 3 (estimate)

Depends on

* **Issue service keys.** (Kickoff setup)
* **Decide where traces live.** (Foundation) Before any customer data is traced.
* **Pick test data.** Test or synthetic tickets that contain no customer data, for the dev project.

Steps

1. **Turn on tracing.** In a cloud dev project, tagged `Environment: dev`, with test data only. Tracing is switched on with environment variables (`LANGSMITH_TRACING`, `LANGSMITH_API_KEY`) or a framework integration.
2. **Mask sensitive fields.** Only if traces go to LangSmith Cloud: hide or redact inputs and outputs before they are sent.
3. **Trace production traffic.** Real tickets, traced to wherever the storage decision says.

Evidence it is real

* Their engineers open a trace to debug a real failure, without us on the call
* Traces from the production agent arrive from their own pipeline, in the project and location the storage decision names
* No customer data appears anywhere the storage decision rules out, checked by their security contact

Not evidence: an API key created, one test trace sent from a notebook, a screenshot of the trace view.

## Module: Evaluation

Datasets (test cases with inputs and reference outputs), evaluators (functions that score outputs) and experiments (one version of the agent run on a dataset). Offline evaluation tests before shipping; online evaluation scores real traffic.

Lead time: Earned. A baseline is only meaningful once there is a week of real traffic to build the dataset from.

Lead time in weeks: 2 to 4 (estimate)

Depends on

* **Trace production traffic.** (Observability) At least one week of it.
* **Agree what a good triage is.** Their definition of a correct outcome, from the handoff's success section. Without it, no evaluator can score anything.
* **Name a reviewer.** Someone on their side who checks the dataset's reference outputs.

Steps

1. **Build the eval dataset.** From real traces, with reference outputs reviewed by their named reviewer.
2. **Choose evaluators.** Code rules, LLM-as-judge, or human review, per what a good outcome means to them.
3. **Run a baseline experiment.** The current agent version on the dataset. This is the baseline every later version is compared to.
4. **Turn on online evaluators.** Scoring real traffic as it arrives.

Evidence it is real

* An experiment compared two versions of their agent, and the result changed a decision (a version shipped, or did not)
* The dataset holds examples from real tickets, reviewed by a person on their side
* Evaluation runs as a step before they release a new version, run by them

Not evidence: a dataset created, an evaluator configured, one experiment run by us.

## Module: Deployment

LangSmith Deployment runs agents on Agent Servers. Options: **Cloud** (LangChain hosts everything), **Hybrid** (LangChain hosts the control plane; the customer hosts the Agent Servers and their data plane), **Self-hosted** (the customer hosts everything, alongside self-hosted LangSmith; Enterprise plan), and **Standalone server** (Agent Server in Docker or Kubernetes, no control plane).

Lead time: Long for Hybrid or Self-hosted. Gated by their security review and their infrastructure team. Self-hosted LangSmith also needs a Kubernetes cluster and its own datastores (PostgreSQL, ClickHouse, Redis, and blob storage recommended for production), and a license key.

Lead time in weeks: 4 to 10 (estimate)

Needs customer approval: security, IT

Depends on

* **Open the security review.** (Foundation)
* **Decide where traces live.** (Foundation)
* **Name the platform owner.** Someone on their infrastructure team who owns the cluster the agent runs on. Often not the person building the agent.

Steps

1. **Choose the deployment option.** Cloud, Hybrid or Self-hosted, recorded with the reason.
2. **Prepare their infrastructure.** The cluster, datastores and network access the chosen option needs, per the docs for that option.
3. **Deploy the agent.** To an Agent Server in their environment, through their own pipeline.
4. **Record security sign-off.** In writing, from their security contact.

Evidence it is real

* The agent handles real tickets from their infrastructure, deployed by their team through their own pipeline
* They ship a new version of the agent without us
* Security sign-off is recorded in writing by their security contact

Not evidence: a deployment created in a sandbox, an Agent Server running on a laptop, a demo deployed by the SE.

## Module: Monitoring and alerts

Dashboards on trace data, and threshold alerts on a project: run count, cost, errors, feedback score or latency, over a 5 or 15 minute window. Alerts are set per project and can go to Slack, PagerDuty, Dynatrace or a webhook.

Lead time: Earned. Thresholds set before a week of real traffic are guesses.

Lead time in weeks: 1 to 2 (estimate), counted from the first week of production traffic

Depends on

* **Trace production traffic.** (Observability) At least one week of it.
* **Name the alert owner.** Who on their side receives alerts, and their on-call route.

Steps

1. **Build a project dashboard.**
2. **Set alert thresholds.** From a week of real numbers, not defaults.
3. **Route alerts to on-call.**

Evidence it is real

* Their on-call received an alert from the production project and acted on it
* Thresholds were set from real traffic and reviewed once since
* The dashboard is reviewed in a standing meeting by a named owner

Not evidence: a dashboard created, an alert rule saved, a test notification sent.

## Phases

Status labels for the accounts view. An account's phase is the earliest phase that still has an unfinished milestone. The phase is a label only: it never changes the order of tasks on the board. A milestone below is matched to tasks by short title.

1. **Kickoff.** Milestones: the kickoff call held, the success plan agreed.
2. **Setup.** Milestones: Set up the organization, Create workspaces, Assign roles, Issue service keys, Decide where traces live.
3. **First value.** Milestones: Turn on tracing.
4. **Production.** Milestones: Open the security review (approved), Set up SSO, Deploy the agent, Trace production traffic.
5. **Day 30 review.** Milestones: Run a baseline experiment, Set alert thresholds, the day 30 review held.

## Baseline metrics

Section 10 of the handoff asks for three core numbers on every product. For this product they mean:

* core_volume: the work items the agent will handle per month, counted today (tickets, requests, documents)
* core_cycle_time: time a person takes to do that work today, per item
* team_headcount: people doing that work today

Add these rows to section 10 as well:

* first_time_right: share of items handled correctly the first time today, however they measure it now
* labeled_examples: past items with a known correct outcome that could seed an eval dataset
* expected_runs: agent runs per month they expect in production

## Drift rules

Used to flag long-lead items that are starting too late. The planner applies these as fixed rules, with no judgement. Change the numbers here, never in the skill.

* Applies to: modules whose lead time is Long and has a "Lead time in weeks" line.
* Safety buffer: 0 weeks (estimate: demo default).
* Freeze periods pause work: yes (estimate: demo default).
* Drifting (amber) uses: the long end of the lead time.
* At risk (red) uses: the short end of the lead time.
* When a module gives one number, it is both ends.

## Sequencing

Default order, driven by lead time and dependencies rather than by customer enthusiasm:

1. Week 1, long lead: foundation. Open the security review, confirm the SSO provider and start SSO, and decide where traces live. These are mostly waiting, which is why they start first.
2. Week 1, quick win: turn on tracing in a cloud dev project with test data only. First visible win, and it finishes early.
3. Weeks 2 to 8: deployment on their infrastructure, as soon as the security review allows.
4. After one week of real traffic, earned: the eval baseline (dataset, evaluators, baseline experiment) and alert thresholds. These need a pattern to exist first.

Three ordering rules worth saying out loud in the plan:

* No customer data is traced until the trace storage decision is recorded.
* Alert thresholds set before a week of real traffic either page for nothing or miss the real problem.
* An eval baseline built before real traffic measures the test set, not their tickets.

## Where these plans usually slip

These are expected patterns for this kind of rollout (estimate), not observed data.

* The security review of Hybrid or Self-hosted surfaces in week five instead of week one
* SSO waits on an identity team that was never in the kickoff
* Nobody decides where traces may live, so production tracing never starts
* Self-hosting needs a cluster and datastores their platform team has not planned for
* The eval dataset is built from made-up examples only, so the baseline says nothing about real tickets
* The agent goes live and nobody owns the alerts

## When the handoff is thin

Modules still have dependencies when the handoff is silent about them. If the customer wants to host and the handoff has no security contact or platform owner, that is a week-one risk to name in the plan. Flag the gap against the module it blocks, and say which date it puts at risk.

## Sources

Pages on docs.langchain.com, read 2026-09-25:

* LangSmith Deployment (options: Cloud, Hybrid, Self-hosted, Standalone server; Agent Server): https://docs.langchain.com/langsmith/deployment
* Hybrid: https://docs.langchain.com/langsmith/hybrid
* Self-hosted LangSmith (Enterprise add-on, license key, datastores): https://docs.langchain.com/langsmith/self-hosted
* Set up LangSmith (Cloud, BYOC, Self-hosted): https://docs.langchain.com/langsmith/platform-setup
* Regions FAQ (US and EU): https://docs.langchain.com/langsmith/regions-faq
* Administration overview (organizations, workspaces, resource tags, personal access tokens, service keys): https://docs.langchain.com/langsmith/administration-overview
* User management (SAML SSO, SCIM, JIT provisioning, Entra ID, Google, Okta): https://docs.langchain.com/langsmith/user-management
* Role-based access control (role names, Enterprise): https://docs.langchain.com/langsmith/rbac
* Observability: https://docs.langchain.com/langsmith/observability
* Tracing quickstart: https://docs.langchain.com/langsmith/observability-quickstart
* Prevent logging of sensitive data in traces: https://docs.langchain.com/langsmith/mask-inputs-outputs
* Evaluation (datasets, evaluators, experiments, offline and online): https://docs.langchain.com/langsmith/evaluation
* Online evaluators: https://docs.langchain.com/langsmith/online-evaluations
* Dashboards: https://docs.langchain.com/langsmith/dashboards
* Alerts (metrics, windows, channels, project-scoped): https://docs.langchain.com/langsmith/alerts
