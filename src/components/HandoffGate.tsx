import { displayName, labelOf, useRoles } from "../owners";
import type { GateGap } from "../types";

// The handoff gate: required fields (listed only in templates/handoff.md,
// "Required before planning") that the handoff left missing or partly missing.
// The plan is still built; this panel says what to fill and who fills it.

export function HandoffGate({ gaps }: { gaps: GateGap[] }) {
  const book = useRoles();
  if (gaps.length === 0) {
    return <p className="text-[14px] text-muted">Handoff gate: all required fields filled.</p>;
  }
  return (
    <section className="rounded-xl border border-warn/60 bg-warn/10 px-5 py-4" aria-labelledby="gate-title">
      <h2 id="gate-title" className="text-[18px] font-semibold text-warn">
        Handoff incomplete
      </h2>
      <p className="mt-0.5 text-[14px] text-muted">
        The plan was still built. Fill these in the handoff, then regenerate the plan.
      </p>
      <ul className="mt-3 flex flex-col gap-2.5">
        {gaps.map((g) => (
          <li key={g.id} className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[14rem_1fr_12rem]">
            <span className="font-medium">{g.field}</span>
            <span className="text-[15px]">
              <span className="text-warn">{g.state === "missing" ? "Missing." : "Partly missing."}</span> {g.detail}
            </span>
            <span className="text-[14px] text-muted">
              Fills it: {labelOf(book, g.filledBy)} · {displayName(book, g.filledBy)}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
