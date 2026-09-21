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
   use it. If several could match, ask rather than guess. A
   `config/private-*.md` file is read in addition and wins on name collisions.

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

The config is authoritative on the product. The handoff is authoritative on the
customer. Where they disagree about what is possible, the config wins and the
disagreement is a finding.

## Outputs

Write both, in this order, beside the handoff unless told otherwise:

- `<customer>-board.md`
- `<customer>-30-day-plan.md`

The board ranks. The plan sequences what the board ranked. Build them in that
order.

---

## Ground rules

**`UNKNOWN` is a signal, not a blank.** The handoff template instructs the
filler to write `UNKNOWN` rather than guess. Treat every `UNKNOWN` as a
week-one question with a name attached. Never resolve one with a plausible
default. An empty field that should have been `UNKNOWN` is also `UNKNOWN`, but
note that the filler left it empty rather than marking it — those are different
levels of confidence about whether anyone looked.

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

---

## Step 1 — Read both files and build the fact base

From the **config**, extract for every module: lead time (with its conditions),
the `Depends on` list, the `Evidence it is real` list, and the `Not evidence`
line. Also extract the cross-cutting prerequisites, the sequencing order, the
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

**Treat the cross-cutting prerequisites as a row of their own**, sitting ahead
of every module.

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
- **Open questions** — a table of every `UNKNOWN`: the question, the module it
  blocks, the date it risks, and who to ask. Where the handoff names nobody,
  write *unassigned* and route it to the exec sponsor.
- **Conflicts** — the handoff against itself, the handoff against the config,
  and the commitments table against the lead times. Give each one a sentence on
  what to do about it and when to raise it.

Then one table per sequencing step, in config order:

| Module | Lead time | Depends on, and where each stands | Evidence it is real | Status |

Every dependency gets its current state from the handoff, not just a name. A
dependency list that does not say where each item stands is a copy of the
config, not a plan.

Close the board with the config's **where these plans usually slip** list,
scored against this handoff: for each, whether it is already happening here,
already avoided, or not yet visible. This is the cheapest useful thing in the
whole document — it is a list of known failure modes checked against a specific
customer.

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

Per week: **focus**, **starting**, **reaching evidence this week** (rare, and
only where dependencies closed in an earlier week), **needed from the
customer** (named people, specific asks), **checkpoint**, **risks live this
week**.

Then, for every long-lead module, a **day-30 checkpoint** — a real signal of
progress, never a completion claim. A good checkpoint is observable, is drawn
from the module's dependency list, and would be false if nothing had happened:
credentials received for three of five platforms; the security reviewer named
and the questionnaire returned; the first scan run against one subnet; article
owners named for each team and the first agent-written article published. A bad
checkpoint restates an intention, or claims the module is "on track" without
saying what makes that visible.

Give each long-lead module: what started, its day-30 signal, and an **expected
landing window** as a range from the config's lead time, anchored to the event
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
- Every section 6 request with no volume is a discovery task with an owner.
- Gate and payload modules are separate rows with separate evidence everywhere.
- Every evidence statement is quoted from the config, unedited.
- Every `Blocked` names who unblocks it. Every `Gated by UNKNOWN` names the
  fields.
- Every `UNKNOWN` is tied to a module and a date at risk.
- No date, name, or number appears that is not in the handoff. Every estimate
  from the baseline table is still labelled an estimate.
- Step 7 ran, and its downgrades are recorded.
- Every `(inferred)` line is marked.

Then report back in a few lines: the two file paths, the single largest
`UNKNOWN`, the longest-lead item, and any commitment in the handoff that the
config's lead times do not support. Do not restate the plan in chat.
