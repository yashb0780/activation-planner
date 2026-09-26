import { HEALTH_KEYS, HEALTH_LABEL, type Health, type HealthKey } from "../health";

// Three small counts at the top of the activation plan. Clicking one shows only those
// items in the list below; clicking it again, or Clear, shows everything.

const TONE: Record<HealthKey, string> = {
  blockers: "var(--st-hold-ink)",
  unowned: "var(--flag-drift)",
  overdue: "var(--flag-risk)",
};

export function HealthStrip({
  health,
  active,
  onPick,
}: {
  health: Health;
  active: HealthKey | null;
  onPick: (k: HealthKey | null) => void;
}) {
  return (
    <section aria-label="Plan health" className="flex flex-wrap gap-2">
      {HEALTH_KEYS.map((k) => {
        const n = health[k].length;
        const on = active === k;
        return (
          <button
            key={k}
            type="button"
            aria-pressed={on}
            onClick={() => onPick(on ? null : k)}
            title={on ? "Show every item" : `Show only: ${HEALTH_LABEL[k].toLowerCase()}`}
            className={`flex min-w-40 flex-1 items-baseline gap-2 rounded-lg border px-3 py-2 text-left transition-colors sm:flex-none ${
              on ? "border-accent bg-raised" : "border-line bg-panel hover:border-line-strong hover:bg-hover"
            }`}
          >
            <span className="tabular text-xl font-semibold" style={{ color: n > 0 ? TONE[k] : "var(--muted)" }}>
              {n}
            </span>
            <span className="text-xs text-muted">{HEALTH_LABEL[k]}</span>
          </button>
        );
      })}
    </section>
  );
}
