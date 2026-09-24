import type { ReactNode } from "react";
import { formatDate, weekEnd } from "../dates";
import type { FirstValueEdit } from "../state";
import { displayName, useRoles } from "../owners";
import type { Account, Gate, Item, Role, SuccessPlan as Plan } from "../types";

// One page, built only from data the tracker already holds: the handoff's
// success fields and baselines, the proposed first value, the milestone gates
// and the people on both sides. Nothing here is new information.

function Block({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-4">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
        <h3 className="text-base font-semibold">{title}</h3>
        {note && <span className="text-xs text-faint">{note}</span>}
      </div>
      {children}
    </section>
  );
}

export function SuccessPlan({
  account,
  plan,
  firstValue,
  firstValueEdited,
  gates,
  items,
  roles,
  review,
}: {
  account: Account;
  plan: Plan;
  firstValue: FirstValueEdit;
  firstValueEdited: boolean;
  gates: Gate[];
  items: Item[];
  roles: Role[];
  /** The Reviewed checkbox, or nothing in customer view. */
  review?: ReactNode;
}) {
  const book = useRoles();
  const byId = new Map(items.map((i) => [i.id, i]));

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-xl border border-line bg-panel px-5 py-5">
      <header>
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-xl font-semibold">Success plan</h2>
          {review}
        </div>
        <p className="mt-1 text-sm text-muted">
          {account.customer} · Draft, to confirm at kickoff. Built from the handoff; conclusions marked (inferred).
        </p>
      </header>

      <Block title="Their goal" note={`In their words · ${plan.goalSource}`}>
        <blockquote className="border-l-2 border-accent/60 pl-3 text-base leading-snug">“{plan.goal}”</blockquote>
        <p className="mt-2 text-sm text-muted">Judged by {displayName(book, plan.judge)}.</p>
      </Block>

      <Block title="First value" note={firstValueEdited ? "Edited, confirm at kickoff" : "Proposed (inferred)"}>
        <p className="text-sm font-medium">{firstValue.headline}</p>
        <ul className="mt-1.5 flex flex-col gap-0.5 text-sm">
          {firstValue.points.map((p) => (
            <li key={p.label}>
              <span className="text-faint">{p.label}:</span> {p.text}
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Success measures" note="Baselines before we configure anything">
        <ul className="flex flex-col gap-3">
          {plan.measures.map((m) => (
            <li key={m.measure} className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[1fr_1fr]">
              <span className="text-sm font-medium">{m.measure}</span>
              <span className="text-sm">
                {m.baseline}
                <span className="block text-xs text-faint">{m.basis}</span>
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Milestones" note="Target dates (inferred) from the 30-day plan">
        <ol className="flex flex-col gap-2">
          {gates.map((g) => {
            const linked = g.linked.map((id) => byId.get(id)).filter((i): i is Item => Boolean(i));
            const done = linked.filter((i) => i.status === "done").length;
            const passed = linked.length > 0 && done === linked.length;
            return (
              <li key={g.id} className="flex flex-wrap items-baseline gap-x-3">
                <span className="w-28 shrink-0 text-sm tabular-nums text-muted">
                  {g.by === "after" ? "After day 30" : `by ${formatDate(weekEnd(g.by, account))}`}
                </span>
                <span className={`text-sm ${passed ? "text-ok" : ""}`}>
                  {passed && "✓ "}
                  {g.label}
                </span>
                <span className="text-xs tabular-nums text-faint">
                  {done} of {linked.length} done
                </span>
              </li>
            );
          })}
          <li className="flex flex-wrap items-baseline gap-x-3">
            <span className="w-28 shrink-0 text-sm tabular-nums text-muted">{formatDate(account.goLive, true)}</span>
            <span className="text-sm">Target go-live</span>
            <span className="text-xs text-faint">Stated in the handoff, confirm at kickoff</span>
          </li>
        </ol>
      </Block>

      <Block title="Owners" note="From the People list">
        <div className="grid gap-4 sm:grid-cols-2">
          {(
            [
              ["customer", account.customer],
              ["us", "Us"],
            ] as const
          ).map(([side, title]) => (
            <div key={side}>
              <h4 className="mb-1 text-xs font-medium text-faint">{title}</h4>
              <ul className="flex flex-col gap-1 text-sm">
                {roles
                  .filter((r) => r.side === side)
                  .map((r) => (
                    <li key={r.id} className={r.name ? "" : "text-muted"}>
                      {r.name || r.label} <span className={r.name ? "text-muted" : "text-faint"}>· {r.name ? r.label : "to be named"}</span>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </Block>
    </article>
  );
}
