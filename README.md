# activation-planner

Turns a filled-in customer handoff into two things a team can work from: a
**prioritized activation board** and a **draft 30-day plan**.

The problem it solves shows up right after a deal closes. The handoff has
everything in it and tells you nothing about what to do on Monday. Long-lead
items get noticed in week six, when starting them in week one was the only
lever that existed. Blanks get filled with plausible guesses nobody remembers
making. Status gets reported as "configured" when nothing is actually in use.

## What it does

Given a filled handoff and a product config, it:

1. Reads what was purchased and matches it against the modules that exist.
2. Resolves lead times that depend on a scope decision, and flags the ones the
   handoff does not decide.
3. Statuses each module — Ready, Blocked, or Gated by `UNKNOWN` — and ties
   every `UNKNOWN` to the module it blocks and the date it puts at risk.
4. Orders the work by the config's sequencing rules.
5. Sequences that into four weeks, then checks its own output for claims that
   do not survive the config's "Not evidence" lists.

## Five checks built into every plan

**1. It checks the handoff first.** A few fields have to be filled before a
plan means much: the technical owner, the target date, the use case in the
customer's words, and the baseline numbers. That list lives in one place, the
**Required before planning** table at the top of `templates/handoff.md`. Add or
remove a row there to change it. If anything is blank or `UNKNOWN`, the planner
still builds the plan, but opens it with a **Handoff incomplete** panel saying
what is missing and whether the rep or the SE fills it.

**2. Every line says where it came from.** Each row on the board and each task
in the plan ends with a tag such as *From: Security review required before
deployment*, using the field's name from the handoff template. Anything that
came from the product config rather than the handoff says *From: product
config*. If a task looks wrong, the tag tells you which answer to go and check.

**3. Owners are roles, not names.** Each plan has one **People** list: CSM, SE,
implementation lead and rep on our side; technical owner, exec sponsor and the
rest on theirs. Tasks point at roles, and the name is looked up. By default our
side is the CSM and theirs is the technical owner. Change a name once and every
task using that role follows. In the tracker you can also change one task's
owner, and it keeps a small note: *Previously: Priya Raman, changed 23 Sep
2026*.

**4. Drift flags, by rule.** For each long-lead module, the planner works out
the **latest safe start**: the target date, counted back by the lead time, with
freeze weeks skipped. If the module has not started by then it is marked
**drifting** (amber). If even the shortest lead time can no longer finish
before the target date, it is **at risk** (red). There is no judgement in it,
only dates. The lead times and every threshold (the safety buffer, whether a
freeze pauses work, which end of the lead time each colour uses) live in the
product config's **Drift rules**, never in the planner.

**5. Nothing leaves draft without a review.** Every plan says **Draft**. Each
section has a **Reviewed** box, and the plan only says **Reviewed** once every
box is ticked. In the markdown files the reviewer ticks the boxes and changes
the status line; in the tracker the badge changes by itself.

**Questions read like a conversation, not a form.** Every gap in the handoff
is grouped under 5 to 7 open questions a CSM would actually ask on a call,
such as "Who works on each system today, and who has admin access?". Each
keeps the original detail as a checklist to tick off as the answer comes in,
so nothing is lost.

**Kickoff setup comes first.** Quick base-level setup done at kickoff (roles
and permissions, workspace setup, the success plan) sits at the top of week 1.
Each product config lists its own kickoff items; the success plan is always
added.

## The five ideas it runs on

**`UNKNOWN` is a signal, not a blank.** The handoff template tells whoever
fills it to write `UNKNOWN` rather than guess. The planner treats each one as a
week-one question with a name attached, and never resolves one with a default.

**Lead time is waiting, not effort.** A module can be two days of work and ten
weeks of waiting. Long-lead items start in week one regardless of importance,
because waiting is the only thing that cannot be recovered.

**Evidence is what proves a module is doing work, not that it was switched on.**
The test, from the config: could this still be true if nobody at the customer
had touched the product since go-live? If yes, it is configuration.

**The config's ordering wins.** Sequencing comes from the config's delivery
rules, not from a scoring formula and not from customer enthusiasm. Scoring
survives only as a tiebreaker between modules inside the same step.

**A 30-day plan against 12-week modules is not a failure report.** The output
says what got started, what proof exists that it is moving, and what is on
track to land after day 30. Every long-lead module gets a day-30 checkpoint
that is a real signal of progress — credentials received for three of five
platforms, the security reviewer named — never a completion claim and never
"on track".

## How to run it

The planner has no code. It runs as a skill — point Claude Code at a filled
handoff and it reads `SKILL.md` for the procedure.

```bash
claude "Run the activation planner on examples/halden-retail-handoff.md"
```

Or from an interactive session:

```
Use SKILL.md to build the activation board and 30-day plan from ./acme-handoff.md
```

It writes `<customer>-board.md` and `<customer>-30-day-plan.md` beside the
handoff, then reports the two paths, the largest `UNKNOWN`, the longest-lead
item, and any commitment in the handoff that the config's lead times do not
support.

### Using an agent-filled handoff doc

A handoff agent can fill `templates/handoff.md` from CRM data and call
recordings. It uses the same template a person does, so the planner reads it
the same way:

- It writes `UNKNOWN` where it has no data. `TBD` and `Not found` count as
  `UNKNOWN` too, in any field.
- It fills the Source column like anyone else: `CRM`, `call, 20 Aug`.
- Anything it interpreted, rather than read, is sourced `agent's read`, with
  the reason after a colon: `agent's read: SSO setup was promised for week 1`.

A person reviews and edits the agent's output before the planner runs. The
planner then labels every use of an `agent's read` answer **Verify**, never
lets one set a date, milestone or commitment on its own, and adds one line to
the Handoff incomplete panel: "N answers are the agent's interpretation: verify
before kickoff." It ignores any section the template does not have.

`examples/acme-*` is an agent-filled example. It is in the tracker's example
switch as "Acme Corp (agent-filled)".

### Running the activation tracker locally

The repo also holds an interactive activation tracker: a small web app built
from the example board and 30-day plan. It needs Node.js.

- **Activation plan** opens with the Handoff incomplete panel, then a
  proposed first value, four milestone gates, and the work as dense rows
  grouped by week (or by lead time, owner, or module) under collapsible
  headers. Each row has a **status pill** (Not started grey, In progress
  orange, Blocked yellow, Done green) and an **owner pill**, both clickable.
  Blocked opens the side panel and only takes effect once a reason is saved;
  Done asks for proof. Drift shows as a separate outlined warning chip
  ("Drifting" or "At risk"), never as a coloured pill.
- Opening an item shows **Why it's here** (the handoff fields it came from,
  as pills, and what we know, as short bullets) and **Done when**: two or
  three checks anyone could verify by looking.
- **Success plan** is a one-page summary for the customer.
- **People** holds the People list (edit a name here and every task follows)
  and an internal stakeholder map.
- The **Internal / Customer** switch is for screen-sharing. Customer view shows
  only this week's items, the owner on each side, and status, plus the Success
  plan. Notes, risk commentary, drift flags and source tags stay hidden.
- The header badge says **Draft** until every section's **Reviewed** box is
  ticked.
- Keyboard: **j / k** move between rows, **Enter** opens one, **s** opens its
  status menu, **o** its owner menu, **x** starts marking it done, **v**
  switches Internal and Customer view, and **⌘K** (Ctrl+K) opens a command
  menu to jump anywhere.

Every colour, font size, space and radius lives in `src/theme.css`. Change the
look there without touching the components.

Drift is checked against today's date. To see how the plan looks on another
day, add `?asof=2026-10-15` to the address.

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints (usually http://localhost:5173). An older
static report is at `/report.html`; it has not caught up with the features
above yet. Progress is saved in your browser only. **Export** (downloads it as
JSON) and **Reset** (asks first) are in the ⌘K menu. `npm run build` checks the code and builds the
site into `dist/`, which is what Vercel deploys.

### Setting it up for your product

1. Write your own config in `config/`, using `config/itsm.md` as the shape.
   Per module: lead time (short or long, with any conditions that change it),
   what it depends on, what evidence proves it is doing work, and a
   `Not evidence` line listing what gets mistaken for that evidence. Give every
   long-lead module a `Lead time in weeks` line with numbers. Plus the
   foundation items (setup every module needs, each with a lead time), the
   baseline metrics your product measures, the **Drift rules** thresholds, a
   default sequencing order, and the ways plans on your product usually slip.
2. Hand `templates/handoff.md` to the rep and the SE, who fill it together on
   one call. The rep owns sections 1 to 5, the SE sections 6 to 10.
3. Run the planner on the result.

The config is the only file that knows anything about a specific product. The
template and the skill are written against the *shape* of a config, not its
contents.

## Layout

```
README.md                  this file
SKILL.md                   how to read a handoff and generate the two outputs
templates/handoff.md       blank handoff — the fields the planner reads
config/itsm.md             example product config (fictional ITSM product)
config/                    one more product config: the default demo's (see "Examples, real names and private files")
examples/                  three filled handoffs, each with its board and 30-day plan (acme-* was filled by a handoff agent)
src/data/                  the tracker's examples, one file each; the default demo has a product file and an account file
src/                       the activation tracker app (React + TypeScript)
src/data/halden.ts         the tracker's items, People list and drift thresholds, built from the example
src/data/acme.ts           the agent-filled example, for the tracker
src/fields.ts              handoff field names, for source tags (copied from the template)
src/drift.ts               the drift rules
src/owners.ts              owner roles and name lookup
src/theme.css              the look: every colour, size and spacing value
public/report.html         an older static version of the example report, not yet updated
TODO.md                    parked issues
```

### Examples, real names and private files

The tracker opens on the default demo:

Unofficial demo of a hypothetical engagement, not affiliated with LangChain or CoreWeave: LangChain (the product) activating CoreWeave (the customer), in `config/langchain.md`, `examples/langchain-coreweave-*` and `src/data/langchain-*.ts`.

Every person, number and date in it is fictional, the product is named as plain
text only, and every lead time is an estimate. The fictional ITSM examples,
Halden Retail Group and Acme Corp, are in the example switch.

The rule for real names: a real company may be named only as the **product
being demoed**, with the unofficial-demo disclaimer, and never with its logo,
colours or visual identity. **Customers are always fictional**, with one
exception for the default demo, set out in `CLAUDE.md`.

`.gitignore` still excludes every `private-*` file in `config/`, `examples/`
and `src/data/`, for anything that should stay off the public repo. A private
config for the same product as a public one is merged in, and wins on name
collisions; one for a different product stands alone. A private tracker demo
is a file `src/data/private-<name>.ts` that exports `dataset`, in the same shape
as `src/data/halden.ts`; when present, it joins the example switch.

## What it will not do

- Invent a fact the handoff does not contain — no dates, names, systems, or
  numbers that are not in the source.
- Soften an evidence statement to make a module reachable. If it does not fit,
  it moves out of the window and says why.
- Let an estimate become a measurement. The baseline table carries an
  estimate-or-measured column, and it stays attached to the number.
- Promise a result.

## Read the example first

`examples/` holds a fictional customer whose handoff leaves eighteen open
questions and five requests with no volume, a recorded sales commitment the lead
times cannot support, two people describing the same target date differently,
and a five-week change freeze inside the runway. That is roughly what a real one
looks like.

The generated plan reaches one module's evidence inside 30 days and does not
read as a failure. The last section of it, **Downgrades applied in review**,
shows the "Not evidence" check catching six completion claims in the
planner's own draft and restating each one — which is the part worth copying if
you adapt this for another product.
