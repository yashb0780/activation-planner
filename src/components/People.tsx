import { useState } from "react";
import { labelOf, nameOf, useRoles } from "../owners";
import type { Person, Quadrant, Role, Sentiment, Side } from "../types";

const QUADRANTS: { id: Quadrant; label: string; hint: string }[] = [
  // Grid order: top row is high influence, right column is high involvement.
  { id: "satisfied", label: "Keep satisfied", hint: "High influence, low involvement" },
  { id: "closely", label: "Manage closely", hint: "High influence, high involvement" },
  { id: "monitor", label: "Monitor", hint: "Low influence, low involvement" },
  { id: "informed", label: "Keep informed", hint: "Low influence, high involvement" },
];

const SENTIMENTS: { id: Sentiment; label: string; color: string }[] = [
  { id: "supporter", label: "Supporter", color: "var(--ok)" },
  { id: "neutral", label: "Neutral", color: "var(--muted)" },
  { id: "skeptic", label: "Skeptic", color: "var(--danger)" },
  { id: "unknown", label: "Unknown", color: "transparent" },
];

interface PeopleProps {
  people: Person[];
  quadrants: Record<string, Quadrant>;
  sentiments: Record<string, Sentiment>;
  onMove: (id: string, q: Quadrant) => void;
  onSentiment: (id: string, s: Sentiment) => void;
}

/** The one People list: every role on both sides and who holds it. Items look names up from here. */
export function PeopleList({ roles, onRename }: { roles: Role[]; onRename: (roleId: string, name: string) => void }) {
  const sides: { side: Side; title: string }[] = [
    { side: "us", title: "Our side" },
    { side: "customer", title: "Their side" },
  ];
  return (
    <section className="mt-6">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-lg font-semibold">People list</h2>
        <span className="text-sm text-muted">
          Owners on the plan are roles. Change a name here and every item with that role updates.
        </span>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {sides.map(({ side, title }) => (
          <div key={side} className="rounded-xl border border-line bg-panel p-3">
            <h3 className="mb-2 text-xs font-medium text-faint">{title}</h3>
            <ul className="flex flex-col gap-1.5">
              {roles
                .filter((r) => r.side === side)
                .map((r) => (
                  <li key={`${r.id}:${r.name}`} className="flex items-center gap-2">
                    <label htmlFor={`role-${r.id}`} className="w-48 shrink-0 text-sm text-muted">
                      {r.label}
                    </label>
                    <input
                      id={`role-${r.id}`}
                      defaultValue={r.name}
                      placeholder="Not named"
                      onBlur={(e) => onRename(r.id, e.target.value.trim())}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                      }}
                      className="min-w-0 flex-1 rounded-md border border-line bg-bg px-2 py-1 text-sm outline-none focus:border-accent/60"
                    />
                  </li>
                ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function People({ people, quadrants, sentiments, onMove, onSentiment }: PeopleProps) {
  const [over, setOver] = useState<Quadrant | null>(null);
  const place = (p: Person) => quadrants[p.id] ?? p.quadrant;

  return (
    <section className="mt-6">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-lg font-semibold">People</h2>
        <span className="text-sm text-muted">
          Internal. Hidden in customer view. Drag a card, or use its picker, to move it.
        </span>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="flex items-center justify-center">
          <span className="text-xs text-faint [writing-mode:vertical-rl] rotate-180">
            Influence →
          </span>
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {QUADRANTS.map((q) => {
            const here = people.filter((p) => place(p) === q.id);
            return (
              <div
                key={q.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  setOver(q.id);
                }}
                onDragLeave={() => setOver((o) => (o === q.id ? null : o))}
                onDrop={(e) => {
                  e.preventDefault();
                  const id = e.dataTransfer.getData("text/plain");
                  if (id) onMove(id, q.id);
                  setOver(null);
                }}
                className={`min-h-[180px] rounded-xl border p-3 ${
                  over === q.id ? "border-accent/60 bg-hover" : "border-line bg-panel"
                }`}
              >
                <div className="mb-2 flex items-baseline gap-2">
                  <h3 className="text-base font-semibold">{q.label}</h3>
                  <span className="text-xs text-faint">{q.hint}</span>
                </div>
                <div className="flex flex-col gap-2">
                  {here.map((p) => (
                    <PersonCard
                      key={p.id}
                      person={p}
                      quadrant={place(p)}
                      moved={Boolean(quadrants[p.id]) && quadrants[p.id] !== p.quadrant}
                      sentiment={sentiments[p.id] ?? p.sentiment}
                      onMove={(nq) => onMove(p.id, nq)}
                      onSentiment={(s) => onSentiment(p.id, s)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <span />
        <p className="text-center text-xs text-faint">Involvement →</p>
      </div>
    </section>
  );
}

function PersonCard({
  person,
  quadrant,
  moved,
  sentiment,
  onMove,
  onSentiment,
}: {
  person: Person;
  quadrant: Quadrant;
  moved: boolean;
  sentiment: Sentiment;
  onMove: (q: Quadrant) => void;
  onSentiment: (s: Sentiment) => void;
}) {
  const s = SENTIMENTS.find((x) => x.id === sentiment)!;
  const book = useRoles();
  const name = nameOf(book, person.roleId);
  // A role nobody is named for is drawn as an empty dashed card.
  const placeholder = !name;
  return (
    <article
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", person.id)}
      className={`cursor-grab rounded-lg px-3.5 py-3 active:cursor-grabbing ${
        placeholder ? "border border-dashed border-line bg-transparent" : "border border-line bg-bg"
      }`}
    >
      <div className="flex items-center gap-2">
        {!placeholder && (
          <span
            title={`Sentiment: ${s.label}`}
            className="h-2.5 w-2.5 shrink-0 rounded-full border border-muted"
            style={{ background: s.color }}
          />
        )}
        <h4 className={`text-sm font-medium ${placeholder ? "text-muted" : ""}`}>{name || labelOf(book, person.roleId)}</h4>
        <span className="ml-auto text-xs text-faint">{moved ? "moved" : "(inferred)"}</span>
      </div>
      <p className="mt-0.5 text-sm text-muted">{person.role}</p>
      {!placeholder && (
        <dl className="mt-2 space-y-1 text-sm">
          <div>
            <dt className="inline text-faint">What's in it for them: </dt>
            <dd className="inline">{person.wiifm || <span className="text-faint">not stated in the handoff</span>}</dd>
          </div>
          <div>
            <dt className="inline text-faint">Engagement: </dt>
            <dd className="inline">{person.engagement}</dd>
          </div>
        </dl>
      )}
      <div className="mt-2 flex flex-wrap gap-2 text-xs">
        <label className="flex items-center gap-1 text-faint">
          Quadrant
          <select
            value={quadrant}
            onChange={(e) => onMove(e.target.value as Quadrant)}
            className="rounded border border-line bg-panel px-1 py-0.5 text-ink"
          >
            {QUADRANTS.map((q) => (
              <option key={q.id} value={q.id}>
                {q.label}
              </option>
            ))}
          </select>
        </label>
        {!placeholder && (
          <label className="flex items-center gap-1 text-faint">
            Sentiment
            <select
              value={sentiment}
              onChange={(e) => onSentiment(e.target.value as Sentiment)}
              className="rounded border border-line bg-panel px-1 py-0.5 text-ink"
            >
              {SENTIMENTS.map((x) => (
                <option key={x.id} value={x.id}>
                  {x.label}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
    </article>
  );
}
