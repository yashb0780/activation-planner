import type { ReactNode } from "react";
import { formatDate, weekEnd } from "../dates";
import type { FirstValueEdit } from "../state";
import type { Account, Gate, Item, Person, SuccessPlan as Plan, TeamMember } from "../types";

// One page, built only from data the tracker already holds: the handoff's
// success fields and baselines, the proposed first value, the milestone gates
// and the people on both sides. Nothing here is new information.

function Block({ title, note, children }: { title: string; note?: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-4">
      <div className="mb-2 flex flex-wrap items-baseline gap-x-2">
        <h3 className="text-[17px] font-semibold">{title}</h3>
        {note && <span className="text-[13px] text-faint">{note}</span>}
      </div>
      {children}
    </section>
  );
}

/** Role without the internal aside in brackets, e.g. "(unblocks and pays)". */
const shortRole = (role: string) => role.replace(/\s*\([^)]*\)\s*$/, "");

export function SuccessPlan({
  account,
  plan,
  firstValue,
  firstValueEdited,
  gates,
  items,
  people,
  ourTeam,
}: {
  account: Account;
  plan: Plan;
  firstValue: FirstValueEdit;
  firstValueEdited: boolean;
  gates: Gate[];
  items: Item[];
  people: Person[];
  ourTeam: TeamMember[];
}) {
  const byId = new Map(items.map((i) => [i.id, i]));
  const theirs = people.filter((p) => !p.placeholder);
  const toName = people.filter((p) => p.placeholder);

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-5 rounded-xl border border-line bg-panel px-5 py-5">
      <header>
        <h2 className="text-[24px] font-semibold">Success plan</h2>
        <p className="mt-1 text-[14px] text-muted">
          {account.customer} · Draft, to confirm at kickoff. Built from the handoff; conclusions marked (inferred).
        </p>
      </header>

      <Block title="Their goal" note={`In their words · ${plan.goalSource}`}>
        <blockquote className="border-l-2 border-accent/60 pl-3 text-[17px] leading-snug">“{plan.goal}”</blockquote>
        <p className="mt-2 text-[14px] text-muted">Judged by {plan.judge}.</p>
      </Block>

      <Block title="First value" note={firstValueEdited ? "Edited, confirm at kickoff" : "Proposed (inferred)"}>
        <p className="text-[16px] font-medium">{firstValue.headline}</p>
        <ul className="mt-1.5 flex flex-col gap-0.5 text-[15px]">
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
              <span className="text-[15px] font-medium">{m.measure}</span>
              <span className="text-[15px]">
                {m.baseline}
                <span className="block text-[13px] text-faint">{m.basis}</span>
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
                <span className="w-24 shrink-0 text-[14px] tabular-nums text-muted">
                  {g.by === "after" ? "After day 30" : `by ${formatDate(weekEnd(g.by, account))}`}
                </span>
                <span className={`text-[15px] ${passed ? "text-ok" : ""}`}>
                  {passed && "✓ "}
                  {g.label}
                </span>
                <span className="text-[13px] tabular-nums text-faint">
                  {done} of {linked.length} done
                </span>
              </li>
            );
          })}
          <li className="flex flex-wrap items-baseline gap-x-3">
            <span className="w-24 shrink-0 text-[14px] tabular-nums text-muted">{formatDate(account.goLive, true)}</span>
            <span className="text-[15px]">Target go-live</span>
            <span className="text-[13px] text-faint">Stated in the handoff, confirm at kickoff</span>
          </li>
        </ol>
      </Block>

      <Block title="Owners">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <h4 className="mb-1 text-[13px] font-medium uppercase tracking-wide text-faint">{account.customer}</h4>
            <ul className="flex flex-col gap-1 text-[15px]">
              {theirs.map((p) => (
                <li key={p.id}>
                  {p.name} <span className="text-muted">· {shortRole(p.role)}</span>
                </li>
              ))}
              {toName.map((p) => (
                <li key={p.id} className="text-muted">
                  {p.name} <span className="text-faint">· to be named</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-1 text-[13px] font-medium uppercase tracking-wide text-faint">Us</h4>
            <ul className="flex flex-col gap-1 text-[15px]">
              {ourTeam.map((m) => (
                <li key={m.name}>
                  {m.name} <span className="text-muted">· {m.role}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Block>
    </article>
  );
}
