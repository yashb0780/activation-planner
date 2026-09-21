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

### Running the activation tracker locally

The repo also holds an interactive activation tracker: a small web app built
from the example board and 30-day plan. **Plan** shows a proposed first value,
four milestone gates, and the work as bucket columns you can group by lead
time, owner, or module, with decisions and questions pinned first. **People**
is an internal stakeholder map. **Customer view** hides everything internal
for screen-sharing. It needs Node.js.

```bash
npm install
```

```bash
npm run dev
```

Then open the address it prints (usually http://localhost:5173). The full
static report is at `/report.html`. Progress is saved in your browser only, and
**Export** downloads it as JSON. `npm run build` checks the code and builds the
site into `dist/`, which is what Vercel deploys.

### Setting it up for your product

1. Write your own config in `config/`, using `config/itsm.md` as the shape.
   Per module: lead time (short or long, with any conditions that change it),
   what it depends on, what evidence proves it is doing work, and a
   `Not evidence` line listing what gets mistaken for that evidence. Plus the
   cross-cutting prerequisites, the baseline metrics your product measures, a
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
config/itsm.md             product modules, evidence, sequencing (the only product-specific file)
examples/                  one filled handoff and both generated outputs
src/                       the activation tracker app (React + TypeScript)
src/data/halden.ts         the tracker's items, built from the example board and plan
public/report.html         the full example report as one static page
TODO.md                    parked issues
```

`.gitignore` excludes `config/private-*`, so a config you would rather not
commit can sit beside the public one. The planner reads both and the private
file wins on name collisions.

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
