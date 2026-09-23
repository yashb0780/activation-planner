# TODO

Parked issues. Not fixed yet.

## Foundation tier follow-ups (2026-09-23)

1. **No `config/devtool.md` yet.** The Foundation tier was added to
   `config/itsm.md` only. When a devtool config is written, give it a
   Foundation section in the same shape.
2. **`public/report.html` is out of date.** The example board and plan now
   show Foundation, source tags, the handoff gate, the People list, drift flags
   and review boxes. The static report shows none of these, and still says
   "cross-cutting prerequisites". The tracker labels its link "Older version,
   being updated". Regenerate it from the current board and plan.
3. **Tracker data is copied by hand.** `src/data/halden.ts` copies the People
   list, drift thresholds and gate result from the example files, and
   `src/fields.ts` copies field names from the template. Until the tracker
   reads a handoff directly, keep them in step when either side changes.

## SKILL.md gaps found when regenerating the example (2026-09-21)

1. **Combined section 6 block vs split modules.** The handoff has one section 6
   block for "asset management with discovery", but the config splits
   discovery (the gate) from asset management (the payload). SKILL.md does not
   say how to divide one block's requests between the two modules. The example
   split them by what each request needs, marked as inferred.
2. **No place on the board for discovery tasks.** SKILL.md says a request with
   no volume becomes a discovery task with an owner, but Step 5 does not say
   where those go on the board. The example added a table under Open
   questions.
3. **No default owner for a discovery task.** When the handoff names nobody,
   SKILL.md routes Blocked items and open questions to the exec sponsor, but
   says nothing for discovery tasks. The example applied the same rule.
4. **Two rules pull against each other.** Step 5 says to list every `UNKNOWN`
   as an open question. Step 3 says an `UNKNOWN` with no module and no date "is
   not yet a finding". The example listed `alternatives` and `frameworks` but
   marked them "not yet a finding".
