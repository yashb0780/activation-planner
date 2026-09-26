---
name: activation-planner
description: Turn a filled-in customer handoff into a prioritized activation board and a draft 30-day plan. Use when someone hands over a completed handoff (from templates/handoff.md) and asks for an activation plan, an onboarding plan, a 30-day plan, a kickoff plan, or a prioritized board for a newly closed customer.
---

# Activation planner

Read a filled handoff plus the product config, and write two files. Nothing
else. Do not begin the activation work, do not draft customer-facing material,
and do not edit the config to make a plan fit.

## Inputs

1. **The filled handoff** — the file the user points at, in the shape of
   `templates/handoff.md`.
2. **The product config** — the file in `config/` matching what the
   `products` field in **Account basics** names. If only one config exists,
   use it. If several could match, ask rather than guess. Each config's first
   line names its product. A `config/private-*.md` file for the **same**
   product is read in addition and wins on name collisions. A private config
   for a **different** product is a product config of its own: use it only when
   the handoff's `products` field names that product, and never mix it into
   another product's plan.

### How the handoff is laid out

The rep fills sections 1 to 5 and the SE fills sections 6 to 10. Every answer
sits in a row with a fixed **ID** (such as `target_date` or `sso_required`) and
a **Source**. Refer to fields by their ID when you pull them forward.

- **Answer choices.** Some fields list their allowed answers, such as
  `yes / no / UNKNOWN`. An answer that is not one of the listed choices is
  treated as `UNKNOWN`, and the board notes what was actually written.
- **Sources.** Carry each answer's source forward. An answer sourced as
  `rep's read` or `SE's read` is someone's judgement, not a confirmed fact.
  Describe it that way. A blank source is not a reason to discard an answer,
  but say that it is unsourced when it matters to a decision.
- **Agent's read.** An answer sourced as `agent's read`, usually with a reason
  after a colon (`agent's read: SSO setup was promised for week 1`), is a
  handoff agent's interpretation. Wherever the board or plan uses it, label it
  `Verify` and give the reason. It never sets a date, a milestone or a
  commitment on its own; that needs a stated answer from another field. This
  rule is for `agent's read` only. `rep's read` and `SE's read` keep the rule
  above.
- **Match by meaning.** A handoff filled by an agent, or copied between tools,
  may change heading wording or numbering. Match each section and field to the
  template by what it asks, not by its exact heading or number. Ignore any
  section the template does not have. **Handoff notes** is in the template and
  is read as usual.
- **Industry** is shown in **Read this first** when given. It is never used to
  plan.

### Using an agent-filled handoff doc

A handoff agent may fill the template from CRM data and call recordings. It
uses this same template, so nothing above changes. Three things to expect:

- `UNKNOWN` where it has no data. `TBD` and `Not found` mean the same.
- Sources such as `CRM` or `call, 20 Aug` in the Source column.
- `agent's read: <reason>` as the source of anything it interpreted. Apply the
  **Agent's read** rule above, and add the agent's read line to the handoff
  gate (Step 0).

A person reviews the agent's output before planning. Headings or numbering may
differ from the template; match by meaning, and ignore sections the template
does not have.

The config is authoritative on the product. The handoff is authoritative on the
customer. Where they disagree about what is possible, the config wins and the
disagreement is a finding.

## Outputs

Write both, in this order, beside the handoff unless told otherwise:

- `<customer>-board.md`
- `<customer>-30-day-plan.md`

The board ranks. The plan sequences what the board ranked. Build them in that
order.

**Both files open the same way**, before anything else:

1. **A status line: `Status: Draft, 0 of N sections reviewed`.** Every
   generated file is a draft. Under every `##` section heading, put one line:
   `- [ ] Reviewed`. The person reviewing ticks each box as they finish a
   section, and changes the status line to `Status: Reviewed` only when every
   box is ticked. Never write `Reviewed` yourself.
2. **The handoff gate panel**, if Step 0 found gaps (see Step 0).

---

## Ground rules

**`UNKNOWN` is a signal, not a blank.** The handoff template instructs the
filler to write `UNKNOWN` rather than guess. Treat every `UNKNOWN` as a
week-one question with a name attached. Never resolve one with a plausible
default. An empty field that should have been `UNKNOWN` is also `UNKNOWN`, but
note that the filler left it empty rather than marking it — those are different
levels of confidence about whether anyone looked. `TBD` and `Not found`, in any
field and any capitalisation, count as `UNKNOWN` too, including in free-text
fields.

**Only facts from the handoff.** No date, person, system, count, or number that
the handoff does not contain. If you conclude something rather than read it,
mark it `(inferred)` inline, and keep those conclusions rare enough that a
reader could strip every one and still have a true document.

**Evidence is quoted from the config, unedited.** Never soften an evidence
statement to make a module reachable. If a module cannot reach its evidence in
the time available, that is the finding.

**No commitments.** Describe intended work and expected windows, never promised
results. Express landing windows as ranges drawn from the config's lead times,
anchored to the event that starts them — not as dates the handoff did not give.

**Vendor-neutral.** Name the customer's systems only as the handoff names them.
Do not introduce product names, vendors, or tooling the handoff does not.

**Every line says where it came from.** Every row on the board and every task in
the plan ends with a source tag: `From: <field name>`, using the field's name
exactly as `templates/handoff.md` writes it in the Field, Role or Metric
column — for example `From: Security review required before deployment`. For
a section 6 request, write `From: What they want set up first, <module>,
request <rank>`. For a baseline row the config adds, use the config's name for
it. If the item comes from a config default and no handoff field, write
`From: product config`. If both, list the handoff fields first and end with
`product config`. A source tag names the field, not its answer.

**Owners are roles, not names.** The plan keeps one **People** list: every role
on both sides, with the name the handoff gives for it, or *not named*. Our
side: CSM, implementation lead, SE, rep. Their side: every role in section 2 of
the handoff, plus anyone else the handoff names with a job on the account.
Every task names an owner role on each side:

- **Default:** our side is the CSM; their side is the technical owner.
- **Override:** where the plan names someone else for a task, use their role
  instead.
- **More than one:** list them in order. The first is the primary.

Write `Owners: <role> (us); <role> (them)`. The name is looked up from the
People list, so a change to one name changes every task that uses the role.

**Every item has a short title and a description.** The title is what a row
shows; the description is the full sentence, shown when the row is opened. A
title never carries detail the description should hold. The rules, the fixed
lists, and a check that enforces them live in `src/titles.ts`; this section is
the same rules in words. Change both together.

- **Style.** 2 to 6 words, sentence case, no full stop, no em dash. Tasks start
  with a verb ("Set up SSO"). Decisions start with "Decide" ("Decide where traces
  live"). Questions are a short topic ("Current setup and data").
- **Tasks and decisions** take their title from the config: the bold words at
  the start of the bullet or step they come from, word for word. The config
  says which words ("Short title" under How to read the fields).
- **Titles made by rule**, for any product:
  - `Draft the success plan`, `Identify exec sponsor` (exec sponsor `UNKNOWN`),
    `Capture baselines` (a section 10 baseline `UNKNOWN`), `Hold the day 30 review`,
    `Decide new go-live or cut scope` (a long-lead item already drifting on day
    1), `Ask about approval timelines` (approval timelines not in the handoff).
  - With a colon, where only the part before it is fixed, and the part after it
    is another item's title, a module name, a question topic, or `request N`:
    `Name owner: <title>`, `Raise conflict: <what it is about>`,
    `Decide scope: <module>` (a short/long lead time the handoff does not
    resolve, Step 2), `Reach evidence: <module>` (a module reaching its
    evidence after day 30, when the config has no step for it).
- **Questions** take the topic of the first handoff field they cover, so list a
  question's main field first. Topics: People and sponsor · Dates and deadlines
  · Why they bought · Sales commitments · What a win looks like · What to set
  up first · Security review and data · Access and identity · Current setup and
  data · Teams and structure · Baseline numbers · Handoff notes · Platform owner
  · Alert owners. The field-to-topic
  list is in `src/titles.ts`. When the first field is a section 6 request and
  every request the question covers is in one module, the title is
  `<Module> requests`. When that rule reads badly for a question, it may name a
  better topic from the same list instead, such as Platform owner or Alert
  owners, which no field points to. The question as a CSM would ask it is the
  description.
- **Nothing else.** If no config line, rule or topic gives a title, write one by
  hand in the same style and say so: the app marks it hand-written and counts it.
- **No two items share a title.**

---

## Step 0 — Check the handoff gate

`templates/handoff.md` has a table called **Required before planning**. It is
the only place the list of required fields is kept; read it from there every
time, never from memory. For each row, read that field in the filled handoff:

- **Missing:** blank, or `UNKNOWN` (`TBD` and `Not found` count as `UNKNOWN`).
- **Partly missing:** the answer contains `UNKNOWN` alongside something else.

Build the plan either way. If any field is missing or partly missing, open both
files, right under the status line, with a **Handoff incomplete** panel:

| Field | What is missing | Who fills it |

"Who fills it" is the role in the table's **Filled by** column (rep or SE),
followed by that person's name from the handoff. If nothing is missing, write
one line instead: `Handoff gate: all required fields filled.`

**Agent's read line.** If any answer in the handoff is sourced `agent's read`,
count them and add one line: `N answers are the agent's interpretation: verify
before kickoff.` It goes at the foot of the Handoff incomplete panel, or right
under the one-line result when nothing is missing. If there are none, add
nothing.

## Step 1 — Read both files and build the fact base

From the **config**, extract for every module: lead time (with its conditions),
the `Depends on` list, the `Evidence it is real` list, and the `Not evidence`
line. Also extract the Kickoff setup items, the Foundation items with their
lead times, each module's
`Lead time in weeks` line, the **Drift rules**, the sequencing order, the
ordering rules, and the list of where these plans usually slip.

From the **handoff**, pull forward and keep visible for every later step:

- **Why they bought (section 1):** `use_case` in their words, `why_now`,
  `scope_phase` (whole scope or phase one), `incumbent` and `why_leaving`
- **People (section 2):** each named role, which roles are `UNKNOWN`,
  `owner_capacity`, and `sponsor_engaged`
- **Target date (section 3):** `target_date`, `date_driver`, `date_fixed`,
  `slip_impact`, and every period in `freeze_periods`. Where two people gave
  different answers, keep both with their sources.
- **Commitments (section 4):** the commitments table, including the soft ones
  and the SE's "Deliverable as stated?" column, plus `timing_promises` and
  `risky_promises`
- **What good means (section 5):** `success_outcome`, `success_signal`,
  `success_judge`, `success_number`, `failure_definition`
- **What they want first (section 6):** one block per module, with
  `day30_required`, `out_of_scope`, and the ranked requests with their volumes.
  See Step 4 for how these are used.
- **Security and access (section 7):** every answer, including each `UNKNOWN`
- **Stack and integrations (section 8):** `integrations`, `credential_holders`,
  and anything in `keep_existing`
- **Teams and structure (section 9):** `teams_launch`, `team_count`,
  `process_shape`, `separate_envs`, `outside_agreement`
- **Baseline (section 10):** `core_volume`, `core_cycle_time`, `team_headcount`,
  plus the rows the config's **Baseline metrics** section adds. The config says
  what the core rows mean for its product. Keep the estimate-or-measured column
  attached to every number. An estimate never becomes a measurement later in
  your output.

**Split modules the config splits.** Where the config treats a module as a gate
plus a payload — discovery gating asset management — they are two rows with
two dependency lists and two evidence lists, everywhere they appear. Never
merge them into one line, and never let the payload inherit the gate's status.

**Kickoff setup comes first.** It is the quick base-level setup done at
kickoff: things like roles and permissions and workspace setup. Each config
lists its own items in a **Kickoff setup** section. The skill always adds one
item of its own, whatever the product: the success plan (Step 6). If a config
has no Kickoff setup section, the success plan is the whole group. Every
Kickoff setup item is week 1, listed before decisions and questions.

**Foundation is a tier of its own**, sitting ahead of every module. The config
lists its items; the skill knows only two things about them:

- **Every Foundation item starts in week 1.**
- **Foundation does not override lead time.** Each item keeps the lead time the
  config gives it, resolved as in Step 2. A long-lead Foundation item starts in
  week 1 and can finish later; say when, as a range, like any other long item.

Each Foundation item is one row with its own status (Step 3), not one combined
line.

## Step 2 — Resolve conditional lead times

Some lead times are conditional: short under one scope, long under another. For
each one, find the handoff field that decides it.

- If the handoff decides it, record the resolution and the field it came from.
- If the handoff does not decide it, the lead time is unresolved. Plan on the
  shorter reading, say plainly that you did, name the decision, and put it at
  the top of the week-one list. An unresolved scope question on a short/long
  boundary is usually the largest single lever on the target date, and the
  config will normally say so — carry that reasoning through.

## Step 3 — Status each module

- **Ready** — dependencies are met or are themselves in scope and earlier in
  the order, and nothing in the handoff blocks a start.
- **Blocked** — a named thing must resolve first. Name it, and name who
  resolves it. Blocked always has an owner; where the handoff names nobody, the
  owner is the exec sponsor by default, and say that is why.
- **Gated by UNKNOWN** — the handoff does not say enough to tell. Use this
  rather than rounding up to Ready or down to Blocked. List which `UNKNOWN`
  fields would resolve it.

For every `UNKNOWN`, apply the config's rule for a thin handoff: flag it
against the module it blocks, and say which date it puts at risk. An `UNKNOWN`
with no module and no date attached is not yet a finding.

## Step 4 — Order the work

**The config's sequencing section decides the order.** Follow its steps as
written, including anything it says runs continuously rather than in a slot.
Its ordering rules are hard constraints — surface each one in the plan in
plain language where it applies, so a reader sees why the order is what it is.

**Scoring is a tiebreaker only**, used to order modules *within* one sequencing
step, never to move a module between steps. Within a step, order by:

1. longer lead time first — waiting is the only thing that cannot be recovered
2. then the module unblocking the most other in-scope modules
3. then the module serving the customer's stated outcome most directly
4. then the order the config lists them in

If following the config's order contradicts what the customer wants first, keep
the config's order and record the tension as a conflict. The customer's
enthusiasm is an input to the conversation, not to the sequence.

**Every purchased module gets a first step inside 30 days.** Groundwork counts
as a first step: naming the change-board members, requesting credentials,
agreeing the asset model. The config's ordering still holds. A module whose
config says it waits for another module starts with groundwork for its own
dependencies, never with the module itself.

**Within a module, requests from section 6 are built in volume order,**
highest monthly volume first. A request with no volume, blank or `UNKNOWN`,
becomes a **discovery task**: find out the volume, with a named owner, in
week one. Do not guess its rank. (A discovery task is unrelated to any product
module that happens to be called discovery.) Anything in `out_of_scope` stays
off the plan. A module with `day30_required: yes` still follows the config's
order. If the config's lead time says it cannot be live by day 30, that is a
conflict for the board.

## Step 5 — Write the board

Open with **Read this first**:

- customer, handoff date, who filled it, which config files were read
- the production use case, quoted
- the target date, what drives it, fixed or preferred, and every freeze period
- **Open questions**, grouped the way a CSM would ask them on a call: **5 to 7
  open questions**, not a form. Group every `UNKNOWN`, and every discovery
  task (a request with no volume), under the open question that would draw it
  out. For example:
  - "Walk me through your current setup and the systems involved." (install
    restrictions, credentials, what is on each network, where documentation
    lives, data residency)
  - "Who works on each system today, and who has admin access?" (security,
    identity and admin contacts, sign-off, provisioning)
  - "What has to be true on day 30 for this to feel like a win?" (what must be
    live by day 30, what is out of scope, the missing baselines)

  Under each open question, keep every original question as a checklist line
  (`- [ ]`), each with its own `From:` tag, so the answer can be ticked off
  line by line. The open question's own `From:` tag lists every field it
  covers. Nothing from the handoff is dropped, only regrouped. For each open
  question give the modules it blocks, the date it risks, and who to ask.
  Where the handoff names nobody, write *unassigned* and route it to the exec
  sponsor.
- **Conflicts** — the handoff against itself, the handoff against the config,
  and the commitments table against the lead times. Give each one a sentence on
  what to do about it and when to raise it.

**Promised in sales.** Every row of the commitments table appears on the board
at least once, labelled `Promised in sales`, with its stated timing kept as
written. Put it on the row it concerns; a commitment that no config module
covers is a conflict of the handoff against the config. Where the stated timing
is shorter than the config's lead time, do not move it: the conflict names both,
for example "Promised week 1, lead time 2 to 4 weeks: reset expectations at
kickoff." Plan tasks that deliver a commitment carry the same label.

Then **First value**, proposed and marked `(inferred)`, to confirm at kickoff.
Pick the highest-volume request in a module with `day30_required: yes`, and
tie it to `success_outcome`. If no request qualifies, because no module has
`day30_required: yes` or none of its requests has a volume, write
`First value: not proposed yet`, name the fields that would decide it (they are
already open questions), and skip the parts below. Otherwise write it short,
never as a paragraph:

- **Headline** — one line: what flows where, in plain words.
- **Volume** — the request's volume, whose, and estimate or measured.
- **Proof** — what the `success_judge` sees when it works, from
  `success_outcome` or `success_signal`.
- **Why first** — a few words on why this request leads.
- **Why?** — the longer reasoning: which section 6 block, which rule picked it,
  which success field it serves. This is the only part allowed to run long.

Then **Milestones**: 2 to 4 gates, in order, each with a target week (from the
plan, marked `(inferred)`). Under each gate, 2 to 4 criteria. Each criterion:

- is under 7 words, a fact rather than a sentence ("Test instance ready", not
  "A test instance should be in place before configuration starts")
- names the one board item whose completion ticks it, in brackets after it
- never claims a module is live on something its `Not evidence` line rules out

The first gate is kickoff. It includes the success plan (Step 6). If Foundation
has items, one gate is for Foundation clearing, and its criteria are drawn from
the Foundation rows.

Then the **Kickoff setup** table, one row per item from the config's Kickoff
setup section, plus the success plan:

| Kickoff setup item | Where it stands | Status | From |

Then the **Foundation** table, one row per Foundation item:

| Foundation item | Lead time | Where it stands | Expected to finish | Status | From |

Every row starts in week 1. "Expected to finish" is week 1 only when the lead
time allows it; a long-lead item gets a range.

Then one table per sequencing step, in config order:

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status | From |

Every dependency gets its current state from the handoff, not just a name. A
dependency list that does not say where each item stands is a copy of the
config, not a plan.

Then the **Drift check**, for every long-lead module that has a
`Lead time in weeks` line in the config. Follow the config's **Drift rules**
for every threshold: the buffer, whether freezes pause work, and which end of
the lead time each flag uses. The skill never picks those numbers.

- **As of:** day 1, or the date the plan is regenerated if that is later.
- **Latest safe start:** count back from the target date by the lead time
  (the end the config names for amber), skipping freeze days if the config
  says freezes pause work, then subtract the buffer.
- **Earliest finish:** count forward from the as-of date by the lead time (the
  end the config names for red), skipping freeze days the same way.
- **Drifting (amber):** not started, and the as-of date is after the latest
  safe start.
- **At risk (red):** not started, and the earliest finish is after the target
  date. Red wins over amber.
- **Started** means work on the module itself has begun, not groundwork.
- **No target date.** If `target_date` is `UNKNOWN`, still list every module
  with its lead time and earliest finish, write `needs target date` for the
  latest safe start, and give no flag.

| Module | Lead time in weeks | Latest safe start | Earliest finish if started on the as-of date | Flag |

Also give the date each amber module turns red if it still has not started. A
flag is a fact about dates, never a forecast. Name the flag, not a cause.

Close the board with the config's **where these plans usually slip** list,
scored against this handoff: for each, whether it is already happening here,
already avoided, or not yet visible. This is the cheapest useful thing in the
whole document — it is a list of known failure modes checked against a specific
customer.

After it, end the board with an **Item index**: one row per item on the board
and in the plan, in plan order, including the config steps the plan schedules
after day 30.

| Item | Kind | Week | Module |

Item is the short title; Kind is task, decision or question; Week is 1 to 4, or
`after` for after day 30. The app's item list is checked against this table.

## Step 6 — Write the 30-day plan

Day 1 is the contract start date if the handoff has one, otherwise the date
filled. State which.

**Frame the window correctly.** Most modules in a config with long lead times
cannot finish inside 30 days, and a plan that reads as failure because a
twelve-week module is not done in four is a badly written plan, not a bad
project. The 30-day output answers three questions:

1. What got started.
2. What proof exists that it is moving.
3. What is on track to land after day 30, and when.

Open the plan with the **People** list (see Ground rules), after the status
line and the handoff gate panel.

Per week: **focus**, **starting**, **reaching evidence this week** (rare, and
only where dependencies closed in an earlier week), **needed from the
customer** (named people, specific asks), **checkpoint**, **risks live this
week**.

Every task under **starting** carries its owners and its source tag on its own
line: `Owners: CSM (us); Technical owner (them) · From: Target go-live date`.

Every task also gets a **Done when** line: **2 to 3 short checks anyone could
verify by looking**. Specific, not vague, and not complicated. Each check is a
thing you can see: a decision recorded, a person able to log in, a test request
landing in the right place. For example, for setting up workspaces:

- One-or-two workspace decision recorded
- Workspace set up and both teams can log in
- A test request reaches the right team in each workspace

Not "workspaces configured appropriately", and not a paragraph. Where the
module has config evidence, "Done when" does not replace it: the evidence stays
quoted from the config, unedited, in its own place. "Done when" is the
checklist for this task; evidence is what proves the module is doing work.

Where the plan explains why a task is there, write **what we know** as short
bullet points, each one fact from the handoff or the config ("Team 1:
Head-office IT", "Open question: one workspace or two, decided in week 2"),
never one long sentence. Keep the call or document and its date as the source
underneath.

Week 1 always has these, whatever the product, in this order:

- **Kickoff setup**, first: every item from the config's Kickoff setup section
- the open questions, to ask at kickoff
- every Foundation item, starting (not necessarily finishing)
- **Draft success plan, confirm at kickoff, share by end of week 1.** Owner:
  the assigned CSM from section 2, or *unassigned* if the handoff names none.
  The success plan is one page built only from the handoff: their goal in
  their words (`success_outcome`), the proposed first value, success measures
  with their section 10 baselines (estimates stay labelled), the milestones
  with target dates, and the named owners on both sides. It counts toward the
  kickoff gate.

Week 1 also has a **Baseline capture** task for every section 10 baseline that
is `UNKNOWN`. It must be done before any module configuration starts (Kickoff
setup is not module configuration): a baseline captured after we start
configuring is not a baseline.

Then, for every long-lead module, a **day-30 checkpoint** — a real signal of
progress, never a completion claim. A good checkpoint is observable, is drawn
from the module's dependency list, and would be false if nothing had happened:
credentials received for three of five platforms; the security reviewer named
and the questionnaire returned; the first scan run against one subnet; article
owners named for each team and the first agent-written article published. A bad
checkpoint restates an intention, or claims the module is "on track" without
saying what makes that visible.

Give each long-lead module: what started, its day-30 signal, its **drift flag**
from the board, and an **expected landing window** as a range from the config's lead time, anchored to the event
that starts the clock — and adjusted for any freeze period in the handoff.
Count the freeze explicitly; a freeze inside the runway is calendar the plan
does not have.

Close with:

- **Where this stands at day 30** — started, moving with proof, groundwork
  only and correctly so. Not a pass/fail list.
- **On track to land after day 30** — module, window, and what has to stay true.
- **What would change this plan** — the two or three `UNKNOWN`s or conflicts
  whose resolution would most reshape the sequence.

## Step 7 — Run the "Not evidence" check against your own draft

The config lists, per module, what does not count as evidence. Those lists are
not notes for the reader. Run them against your own output before returning it.

1. Collect every claim in both drafts that asserts a module is done, live,
   complete, or reaching evidence — including week entries, day-30 checkpoints,
   and anything in the closing sections.
2. For each claim, read that module's `Not evidence` line.
3. **If the claim is one of those things, or would be satisfied by one of those
   things, downgrade it.** Move it out of completion, restate it as a
   checkpoint describing what it actually demonstrates, and push the real
   evidence to its honest window.

Apply the same test to any claim you wrote yourself in config-free language.
The question the config gives is the general form: *could this still be true if
nobody at the customer had touched the product since go-live?* If yes, it is
configuration, and it cannot carry a completion claim.

Record every downgrade in a short **Downgrades applied in review** section at
the end of the plan: the claim, the `Not evidence` line that caught it, and
what it became. Showing the check ran is part of the output — it is also the
fastest way for a reader to see the difference between the two kinds of claim.

## Step 8 — Final checks

- Every purchased module appears on the board; nothing appears that the config
  does not define.
- Every purchased module has a first step inside 30 days, even if it is only
  groundwork.
- Every section 6 request with no volume is a discovery task with an owner,
  listed as a checklist line under one of the open questions.
- There are 5 to 7 open questions. Every `UNKNOWN` sits as a checklist line
  under one of them, and each open question's `From:` tag lists every field
  it covers.
- Week 1 opens with Kickoff setup: the config's items plus the success plan.
- Gate and payload modules are separate rows with separate evidence everywhere.
- Every Foundation item from the config has a row, starts in week 1, and keeps
  its own lead time.
- First value is a headline plus Volume, Proof and Why first, with the long
  reasoning under Why?. No paragraph.
- Every milestone has 2 to 4 criteria, each under 7 words and tied to one
  board item. The kickoff gate includes the success plan.
- Every evidence statement is quoted from the config, unedited.
- Every `Blocked` names who unblocks it. Every `Gated by UNKNOWN` names the
  fields.
- Every `UNKNOWN` is tied to a module and a date at risk.
- Every `agent's read` answer used is labelled `Verify` with its reason, and
  none sets a date, milestone or commitment on its own. The agent's read line
  is there if any exist.
- Every commitments table row appears labelled `Promised in sales`, with its
  stated timing unchanged.
- No date, name, or number appears that is not in the handoff. Every estimate
  from the baseline table is still labelled an estimate.
- Step 7 ran, and its downgrades are recorded.
- Every `(inferred)` line is marked.
- Both files open with `Status: Draft`, and every `##` section has a
  `- [ ] Reviewed` line.
- Step 0 ran against the **Required before planning** table, and its panel (or
  its one line) is at the top of both files.
- Every board row and every plan task has a `From:` tag.
- The plan has a People list, and every task names an owner role on each side.
- Every drift flag follows the config's Drift rules, and the board states its
  as-of date.
- Every task has a "Done when" of 2 to 3 short checks someone could verify by
  looking. None of them softens a config evidence line.
- Every item has a short title that follows the short-title rules, and a
  description. No two items share a title. Any hand-written title is said so.
- The board ends with an Item index that lists every item exactly once.

Then report back in a few lines: the two file paths, the single largest
`UNKNOWN`, the longest-lead item, and any commitment in the handoff that the
config's lead times do not support. Do not restate the plan in chat.
