import { useState } from "react";
import type { Person, Quadrant, Sentiment } from "../types";

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

export function People({ people, quadrants, sentiments, onMove, onSentiment }: PeopleProps) {
  const [over, setOver] = useState<Quadrant | null>(null);
  const place = (p: Person) => quadrants[p.id] ?? p.quadrant;

  return (
    <section className="mt-6">
      <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h2 className="text-[20px] font-semibold">People</h2>
        <span className="text-[14px] text-muted">
          Internal. Hidden in customer view. Drag a card, or use its picker, to move it.
        </span>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-2">
        <div className="flex items-center justify-center">
          <span className="text-[13px] uppercase tracking-wide text-faint [writing-mode:vertical-rl] rotate-180">
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
                  <h3 className="text-[17px] font-semibold">{q.label}</h3>
                  <span className="text-[13px] text-faint">{q.hint}</span>
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
        <p className="text-center text-[13px] uppercase tracking-wide text-faint">Involvement →</p>
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
  return (
    <article
      draggable
      onDragStart={(e) => e.dataTransfer.setData("text/plain", person.id)}
      className={`cursor-grab rounded-lg px-3.5 py-3 active:cursor-grabbing ${
        person.placeholder ? "border border-dashed border-line bg-transparent" : "border border-line bg-bg"
      }`}
    >
      <div className="flex items-center gap-2">
        {!person.placeholder && (
          <span
            title={`Sentiment: ${s.label}`}
            className="h-2.5 w-2.5 shrink-0 rounded-full border border-muted"
            style={{ background: s.color }}
          />
        )}
        <h4 className={`text-[16px] font-medium ${person.placeholder ? "text-muted" : ""}`}>{person.name}</h4>
        <span className="ml-auto text-[12px] text-faint">{moved ? "moved" : "(inferred)"}</span>
      </div>
      <p className="mt-0.5 text-[14px] text-muted">{person.role}</p>
      {!person.placeholder && (
        <dl className="mt-2 space-y-1 text-[14px]">
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
      <div className="mt-2 flex flex-wrap gap-2 text-[13px]">
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
        {!person.placeholder && (
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
