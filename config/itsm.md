Product config: ITSM
What this file is: the product half of an activation plan. The handoff says what the customer wants and by when. This file says what each module actually costs to stand up, what has to exist first, and what counts as proof it is live.
What to edit: this file, when the product or the delivery reality changes. The plays and the handoff template stay put.
The product in one line
A service management platform for internal IT and shared-services teams: a request portal and service catalog, a knowledge base, workflow and routing automation, an asset inventory fed by network discovery, and change management sitting on top of that inventory.
How to read the fields
Lead time is calendar time from kickoff to the evidence below being true, assuming the customer shows up. It is not effort. A module can be two days of work and ten weeks of waiting.

* Short: 2 to 4 weeks. Configuration we control. Slips because of scheduling, not blockers.
* Long: 6 to 16 weeks. Gated by something on the customer's side: access, data quality, a security review, or a behaviour change in their team. Start these in week one even when the target date looks far away.

Depends on is a hard prerequisite. Starting a module before its dependencies are in place produces rework, not progress.
Evidence is what proves the module is doing work, not that it was switched on. The test for any piece of evidence: could this still be true if nobody at the customer had touched the product since go-live? If yes, it is not evidence, it is configuration.
Foundation
Nothing below starts cleanly without these. Every item starts in week one. Each keeps its own lead time, so a long one starts in week one and may finish later.

* Roles and permissions: agent, admin and requester roles set for each team in scope. Lead time: short.
* Authentication: SSO configured, and user provisioning (directory sync or SCIM) agreed. Lead time: short when the identity team is in the room; long when it sits outside the buying team.
* Workspaces: one or several, decided from how many genuinely different processes the teams run. Lead time: short once that is decided.
* Agent groups and business hours defined, so routing has somewhere to route. Lead time: short.
* Inbound email or alias cutover plan, including what happens to the old address. Lead time: short.
* Sandbox or test instance if they have a change freeze or an audit requirement. Lead time: short.
* A named admin on the customer side with time actually budgeted, not an interested volunteer. Lead time: short to name; the time budget is what slips.

Module: Service catalog
Lead time: Short for a starter set of 8 to 12 request types. Long if they insist on launching with a complete catalog, which is the most common reason a go-live date slips.
Depends on

* A settled request taxonomy (categories, subcategories, form fields). Changing this after items are built means rebuilding them.
* Named approvers per item, plus a decision on what happens when an approver is on leave
* Requester visibility rules: which groups see which items, which needs directory sync working
* The fulfilment group receiving each item, and confirmation that group has capacity

Evidence it is real

* More than half of new requests arrive through catalog items rather than free-text email or a tap on the shoulder, sustained across two consecutive weeks
* At least one approval requested, approved and fulfilled end to end in production, by the real approver rather than the admin testing it
* Low reassignment rate on catalog tickets: requests land on the right team first time
* Every live item has a named owner recorded on the item itself

Not evidence: items built, portal branded, a test request submitted by the admin.
Module: Knowledge base
Lead time: Long, 6 to 10 weeks. The tool is ready on day one. The content, the owners, and the habit of writing articles are the actual work.
Depends on

* The same taxonomy as the catalog, so articles file where tickets live
* A seed set: whatever documentation they have today, plus an agreed export path out of it
* Named article owners per team and a review cadence
* A publishing decision: open authoring, or a review queue with a reviewer who has time
* End-user portal access if deflection is the goal, which needs the same visibility rules as the catalog

Evidence it is real

* Articles are linked from resolved tickets, and that rate is rising month over month
* Articles created by agents during ticket work in the last 30 days. This is the one that matters: the read path is easy, the write path is where knowledge bases die.
* Self-service or deflected sessions tracked against the handoff baseline
* Only a small share of articles are past their review date

Not evidence: N articles imported, search works, the portal is live.
Module: Workflow automation
Lead time: Short per workflow, often days. Long to reach coverage that changes the team's numbers, 8 weeks plus. Plan it as a sequence of small deliveries, never as one project.
Depends on

* Catalog and taxonomy settled. Automation written against fields that are still moving gets rewritten.
* Agent groups, business hours and SLA targets defined
* Credentials and scopes for anything reaching another system (directory, HR system, endpoint management, chat)
* A named owner for the rules. Unowned automation gets switched off the first time it misfires, and nobody turns it back on.

Evidence it is real

* A measurable share of tickets routed, categorised or resolved with no human touch, compared against the pre-automation baseline in the handoff
* Execution logs showing rules firing in production on real tickets, not test records
* The rules are still enabled 30 days after launch, with no pile of manual workarounds running alongside them
* Time to first response has moved, not just time to assign

Not evidence: rules built, a test ticket firing correctly, a walkthrough of the builder.
Module: Asset management and discovery
Lead time: Long, 8 to 16 weeks, and the longest pole in most deployments. Discovery is a separate and earlier project from asset management. Split them in the plan or the dates will lie.
Discovery (the gate)
Depends on

* A passed security review. Assume one exists even when nobody has mentioned it.
* Service accounts and credentials per platform: Windows, Linux, network gear, hypervisors, cloud accounts
* Network access: firewall rules, the subnet list, a host for the scanner or collector
* Approval to deploy agents, plus access to their deployment tooling to push them
* An owner on the infrastructure team, who is almost never the same person as the ITSM project owner

Evidence it is real

* Scans running on schedule for at least two consecutive cycles without a manual restart
* Device count found reconciles against the customer's own expected count, with the gap explained rather than ignored
* Unidentified and duplicate records below an agreed threshold
* Relationships between devices, services and software populated, not just rows of hardware

Asset management
Depends on

* Discovery output, or a clean import if they are starting from a spreadsheet
* An agreed asset model: what is tracked, at what depth, and what is deliberately out of scope
* Assignment rules linking assets to people or departments, which needs directory or HR data
* Named process owners for purchase, assignment, reclaim and disposal

Evidence it is real

* Assets referenced on incidents and changes by agents doing normal work, without being told to
* A spot audit of 20 random records matches physical or cloud reality above an agreed rate
* Lifecycle events (assign, reclaim, retire) recorded in the product, and the parallel spreadsheet has actually been retired
* Stale record share (not seen by discovery in 30 days) is tracked and trending down

Not evidence: a populated asset list, a dashboard with a device count, one successful scan.
Module: Change management
Lead time: Long, 8 to 12 weeks, and longer where no change process exists today. You are implementing a process, not a module. If they already run a change board somewhere else, this is a migration and moves faster.
Depends on

* Asset and CMDB data of usable quality, otherwise impact analysis is theatre
* Change types agreed: standard (pre-approved), normal, emergency, with real examples of each
* Approval chains and change-board membership, plus a standing meeting already on calendars
* Maintenance windows and freeze periods documented
* Integration with the tooling where work actually happens (deploy pipeline, vendor ticketing) if standard changes are meant to be raised automatically
* Executive backing. Change management fails on adoption, never on configuration.

Evidence it is real

* Changes are raised before the work happens. The ratio of retroactive and emergency changes to planned ones is the single best indicator, and it should be falling.
* The change board runs from the product's queue, not a spreadsheet or a slide
* Standard change templates used repeatedly by engineers without help from the admin
* Failed change and rollback rates being reported, which means somebody is actually looking
* Changes reference affected assets or services, which is only possible if the asset data holds up

Not evidence: the workflow is built, a board meeting was scheduled, the first change was filed by the admin.
Baseline metrics
Section 10 of the handoff asks for three core numbers on every product. For this product they mean:

* core_volume: tickets or requests per month
* core_cycle_time: average time to resolve

Add these rows to section 10 as well:

* first_response_time: average time to first response
* unstructured_share: share of requests arriving unstructured (email, chat, tap on the shoulder)
* asset_count: known asset count
* change_volume: changes per month, and share that are emergency
* kb_articles: existing knowledge articles

Sequencing
Default order, driven by dependencies rather than by customer enthusiasm:

1. Week 1: foundation, plus open the security review and the credential requests for discovery. These are mostly waiting rather than work, which is exactly why they start first.
2. Weeks 1 to 4: taxonomy, then the service catalog starter set. First visible win.
3. Weeks 2 to 6: workflow automation on the catalog items that now exist.
4. Weeks 1 to 12, in parallel: discovery, then asset management.
5. After asset data is trustworthy: change management.
6. From week 2, continuously: knowledge base. It is content-limited, so it never finishes if it waits for a slot.

Two ordering rules worth saying out loud in the plan:

* Change management before trustworthy asset data produces a process nobody believes.
* Automation before a settled taxonomy produces rework.

Where these plans usually slip

* The security review surfaces in week six instead of week one
* The named technical owner also has a day job, and the project is the part that gives
* The customer holds out for a complete catalog at launch instead of a starter set
* The knowledge base is treated as a content migration rather than a habit to build
* Discovery credentials are owned by a team that was never in the kickoff
* Change management was sold to the exec sponsor and never explained to the engineers expected to file changes

When the handoff is thin
Modules still have dependencies even when the handoff is silent about them. If the customer bought asset management and the handoff has no infrastructure or security contact, that is a week-one risk to name in the plan, not a detail to pick up later. Flag the gap against the module it blocks, and say which date it puts at risk.
