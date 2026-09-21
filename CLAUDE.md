# activation-planner

## What this is

A tool that reads a filled sales handoff doc and produces:

1. **An interactive activation board**: every purchased module, marked Ready,
   Blocked, or Gated by `UNKNOWN`, in sequence order.
2. **A draft 30-day plan** built from that board.
3. **A CS handoff doc** at the end of activation, built from the notes taken
   during activation.

Today the tool runs as a Claude Code skill (`SKILL.md`) with no code. It covers
outputs 1 and 2 as markdown. `index.html` is a static render of the example
board. The CS handoff output is not built yet.

## Principles

**Product-agnostic engine.** Anything specific to a product lives only in
`config/`. `SKILL.md`, `templates/`, and any app code are written against the
*shape* of a config, never its contents. If a change needs knowledge of one
product, it goes in a config file.

**Lead time drives sequencing.** Start long-lead items first, because waiting is
the one thing you can't recover. Quick wins should finish early. Earned items,
which only count once earlier work holds up, come third. The config's ordering
rules are hard constraints. Scoring only breaks ties within a step.

**The handoff template is the interface.** `templates/handoff.md` defines what
the tool reads. If you change a field there, update everything that reads it in
the same change. `UNKNOWN` is a signal, never a blank to fill in with a default.

**All output is a draft that a human edits.** Never invent dates, names, or
numbers. Never soften an evidence statement. Never promise results. Mark
conclusions as `(inferred)`.

## Rules

**Public repo.** Committed files must never contain customer names, employer
names, or real account data. Examples stay fictional (see `examples/halden-*`).
Real configs go in `config/private-*`, which git ignores.

**Scope.** Only work inside this folder. Never read or modify other folders in
`~/projects`.

**Show before writing.** Show drafts of new files, and a summary of edits to
existing ones, before making the change. Wait for a go-ahead.

**Plain language.** The owner of this repo is non-technical and learning to
code. Explain what each change does and why in simple terms, with a concrete
example when it helps.

## Layout

    SKILL.md               procedure: handoff + config → board + 30-day plan
    templates/handoff.md   blank handoff; the input interface
    config/itsm.md         example product config (the only product-specific file)
    examples/              fictional customer: filled handoff and generated outputs
    index.html             static rendered example board

## Current state

- Version 1 (skill + static example page) is on GitHub at
  github.com/yashb0780/activation-planner.
- A rebuild into an interactive app is planned but not started. Don't start it
  unless asked.
