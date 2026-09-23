import { formatDate, weekEnd, weekStart } from "../dates";
import { ownerLine, useRoles } from "../owners";
import type { Account, Item, Side, Status } from "../types";
import { StatusIcon } from "./icons";

// Customer view: this week's items, the owner on each side, and status.
// Nothing else: no notes, no risk commentary, no source tags.

const STATUS_LABEL: Record<Status, string> = { todo: "To do", progress: "In progress", blocked: "Blocked", done: "Done" };

function Owner({ item, side }: { item: Item; side: Side }) {
  const book = useRoles();
  const { primary, more } = ownerLine(book, item, side);
  return (
    <span className={primary === "Not named" || primary.endsWith("(not named)") ? "text-muted" : ""}>
      {primary}
      {more > 0 && <span className="text-muted"> +{more}</span>}
    </span>
  );
}

export function CustomerWeek({ items, week, account }: { items: Item[]; week: 1 | 2 | 3 | 4; account: Account }) {
  const rows = [...items].sort((a, b) => Number(a.status === "done") - Number(b.status === "done"));
  const head = "text-[12px] font-medium uppercase tracking-wide text-faint";
  return (
    <section className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline gap-x-3">
        <h2 className="text-[24px] font-semibold">This week</h2>
        <span className="text-[15px] text-muted">
          Week {week} · {formatDate(weekStart(week, account))} – {formatDate(weekEnd(week, account))}
        </span>
      </div>
      <div className="rounded-xl border border-line bg-panel">
        <div className={`hidden gap-4 border-b border-line px-4 py-2 sm:grid sm:grid-cols-[1fr_11rem_11rem_8rem] ${head}`}>
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
              className="grid gap-x-4 gap-y-1 border-b border-line px-4 py-3 last:border-b-0 sm:grid-cols-[1fr_11rem_11rem_8rem] sm:items-baseline"
            >
              <span className={`text-[16px] ${i.status === "done" ? "text-muted line-through decoration-faint" : ""}`}>
                {i.title}
              </span>
              <span className="text-[14px]">
                <span className="text-faint sm:hidden">Us: </span>
                <Owner item={i} side="us" />
              </span>
              <span className="text-[14px]">
                <span className="text-faint sm:hidden">{account.customer}: </span>
                <Owner item={i} side="customer" />
              </span>
              <span className="flex items-center gap-1.5 text-[14px] text-muted">
                <StatusIcon status={i.status} size={13} /> {STATUS_LABEL[i.status]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
