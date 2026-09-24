import { formatDate, weekEnd, weekStart } from "../dates";
import { ownerLine, useRoles } from "../owners";
import type { Account, Item, Side } from "../types";
import { StatusDot } from "./Status";

// Customer view: this week's items, the owner on each side, and status.
// Nothing else: no notes, no risk commentary, no drift flags, no source tags.

function Owner({ item, side }: { item: Item; side: Side }) {
  const book = useRoles();
  const { primary, more } = ownerLine(book, item, side);
  const unnamed = primary === "Not named" || primary.endsWith("(not named)");
  return (
    <span className={unnamed ? "text-muted" : ""}>
      {primary}
      {more > 0 && <span className="text-muted"> +{more}</span>}
    </span>
  );
}

const COLS = "md:grid-cols-[minmax(0,1fr)_12rem_12rem_9rem]";

export function CustomerWeek({ items, week, account }: { items: Item[]; week: 1 | 2 | 3 | 4; account: Account }) {
  const rows = [...items].sort((a, b) => Number(a.status === "done") - Number(b.status === "done"));
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h2 className="text-xl font-semibold">This week</h2>
        <span className="tabular text-sm text-muted">
          Week {week} · {formatDate(weekStart(week, account))} – {formatDate(weekEnd(week, account))}
        </span>
      </div>
      <div className="rounded-lg border border-line bg-panel">
        <div className={`hidden gap-4 border-b border-line px-4 py-2 text-xs font-semibold text-muted md:grid ${COLS}`}>
          <span>Item</span>
          <span>Us</span>
          <span className="truncate">{account.customer}</span>
          <span>Status</span>
        </div>
        {rows.length === 0 && <p className="px-4 py-3 text-muted">Nothing planned for this week.</p>}
        <ul>
          {rows.map((i) => (
            <li
              key={i.id}
              className={`grid min-h-[var(--row-height)] items-center gap-x-4 gap-y-1 border-t border-line px-4 py-2 first:border-t-0 ${COLS}`}
            >
              <span className={i.status === "done" ? "text-muted line-through decoration-faint" : ""}>{i.title}</span>
              <span className="text-sm">
                <span className="text-faint md:hidden">Us: </span>
                <Owner item={i} side="us" />
              </span>
              <span className="text-sm">
                <span className="text-faint md:hidden">{account.customer}: </span>
                <Owner item={i} side="customer" />
              </span>
              <StatusDot status={i.status} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
