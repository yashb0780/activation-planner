import { displayName, labelOf, useRoles } from "../owners";
import type { GateGap } from "../types";

// The handoff gate: required fields (listed only in templates/handoff.md,
// "Required before planning") that the handoff left missing or partly missing.
// The plan is still built; this panel says what to fill and who fills it.
// Neutral surface; the thin amber bar on the left is its only colour.

/** "N answers are the agent's interpretation", or nothing when the handoff has none. */
function agentReadLine(n: number) {
  return `${n} ${n === 1 ? "answer is" : "answers are"} the agent's interpretation: verify before kickoff.`;
}

export function HandoffGate({ gaps, agentReads = 0 }: { gaps: GateGap[]; agentReads?: number }) {
  const book = useRoles();
  if (gaps.length === 0) {
    return (
      <div className="text-xs text-muted">
        <p>Handoff gate: all required fields filled.</p>
        {agentReads > 0 && <p className="mt-0.5">{agentReadLine(agentReads)}</p>}
      </div>
    );
  }
  return (
    <section
      aria-labelledby="gate-title"
      className="rounded-lg border border-line bg-panel shadow-[inset_3px_0_0_var(--flag-drift)]"
    >
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 px-5 pb-2 pt-3">
        <h2 id="gate-title" className="text-base font-semibold">
          Handoff incomplete
        </h2>
        <span className="text-xs text-muted">The plan was still built. Fill these in the handoff, then regenerate it.</span>
      </div>
      <ul className="border-t border-line">
        {gaps.map((g) => (
          <li
            key={g.id}
            className="grid gap-x-6 gap-y-0.5 border-t border-line px-5 py-2.5 first:border-t-0 lg:grid-cols-[16rem_minmax(0,1fr)_14rem]"
          >
            <span className="font-medium">{g.field}</span>
            <span className="text-sm text-muted">
              <span className="font-medium text-ink">{g.state === "missing" ? "Missing." : "Partly missing."}</span> {g.detail}
            </span>
            <span className="text-sm text-muted">
              Fills it: <span className="text-ink">{labelOf(book, g.filledBy)}</span> · {displayName(book, g.filledBy)}
            </span>
          </li>
        ))}
      </ul>
      {agentReads > 0 && <p className="border-t border-line px-5 py-2.5 text-sm text-muted">{agentReadLine(agentReads)}</p>}
    </section>
  );
}
