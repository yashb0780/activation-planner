import { useEffect, useRef } from "react";
import type { DriftFlag } from "../drift";
import type { Group } from "../grouping";
import type { Item, Role, Side, Status } from "../types";
import { OwnerMenu, RowFlag, StatusMenu } from "./Status";

// The plan as dense rows under collapsible group headers, one line per item:
// status, short title, module, owner, due date. Status and owner open a small
// menu; the title opens the side panel, which holds everything else.

export interface RowInfo {
  flag?: DriftFlag | null;
  module: string;
  /** "3 Oct", or "After day 30". */
  due: string;
}

export interface RowActions {
  onStatus: (id: string, s: Status) => void;
  /** Open the side panel on the reason box. The status changes only once a reason is saved. */
  onRequestHold: (id: string) => void;
  onRequestDone: (id: string) => void;
  onOwner: (id: string, side: Side, roleId: string) => void;
}

/** A keyboard request to open one row's menu: s for status, o for owner. */
export interface MenuRequest {
  id: string;
  kind: "status" | "owner";
  n: number;
}

interface Props {
  groups: Group[];
  collapsed: Record<string, boolean>;
  onToggle: (key: string) => void;
  selectedId?: string;
  scrollToSelected: boolean;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  info: (item: Item) => RowInfo;
  roles: Role[];
  actions: RowActions;
  menuRequest?: MenuRequest;
}

const COLS =
  "grid-cols-[var(--col-status)_minmax(0,1fr)_var(--col-owner)] md:grid-cols-[var(--col-status)_minmax(0,1fr)_var(--col-owner)_var(--col-due)] lg:grid-cols-[var(--col-status)_minmax(0,1fr)_var(--col-where)_var(--col-owner)_var(--col-due)]";

function Row({
  item,
  info,
  selected,
  scroll,
  onSelect,
  onOpen,
  roles,
  actions,
  menuRequest,
}: {
  item: Item;
  info: RowInfo;
  selected: boolean;
  scroll: boolean;
  onSelect: () => void;
  onOpen: () => void;
  roles: Role[];
  actions: RowActions;
  menuRequest?: MenuRequest;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (selected && scroll) ref.current?.scrollIntoView({ block: "nearest" });
  }, [selected, scroll]);
  const done = item.status === "done";
  const mine = menuRequest?.id === item.id ? menuRequest : undefined;
  return (
    <div
      ref={ref}
      role="row"
      data-row={item.id}
      aria-selected={selected}
      onClick={onSelect}
      className={`grid min-h-[var(--row-height)] items-center gap-4 border-t border-line px-3 transition-colors first:border-t-0 ${COLS} ${
        selected ? "bg-raised shadow-[inset_2px_0_0_var(--accent)]" : "hover:bg-hover"
      }`}
    >
      <span className="min-w-0">
        <StatusMenu
          item={item}
          onStatus={(s) => actions.onStatus(item.id, s)}
          onRequestHold={() => actions.onRequestHold(item.id)}
          onRequestDone={() => actions.onRequestDone(item.id)}
          openSignal={mine?.kind === "status" ? mine.n : undefined}
        />
      </span>
      <span className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
            onOpen();
          }}
          className={`truncate text-left hover:underline hover:decoration-line-strong hover:underline-offset-4 ${
            done ? "text-muted line-through decoration-faint" : "text-ink"
          }`}
        >
          {item.title}
        </button>
        <RowFlag item={item} drift={info.flag} />
      </span>
      <span className="hidden truncate text-xs text-muted lg:block" title={info.module}>
        {info.module}
      </span>
      <span className="min-w-0">
        <OwnerMenu
          item={item}
          side={item.side}
          roles={roles}
          prefix={item.side === "us" ? "Us" : "Them"}
          onOwner={(r) => actions.onOwner(item.id, item.side, r)}
          openSignal={mine?.kind === "owner" ? mine.n : undefined}
        />
      </span>
      <span className="tabular hidden text-right text-xs text-muted md:block">{info.due}</span>
    </div>
  );
}

export function PlanList(props: Props) {
  const { groups, collapsed, onToggle, selectedId } = props;
  return (
    <div className="flex flex-col gap-3">
      {groups.map((g) => {
        const all = g.sections.flatMap((s) => s.items);
        const done = all.filter((i) => i.status === "done").length;
        const isCollapsed = Boolean(collapsed[g.key]);
        return (
          <section
            key={g.key}
            className="rounded-lg border border-line bg-panel [&>div:last-child_[role=row]:last-child]:rounded-b-lg"
          >
            <button
              type="button"
              onClick={() => onToggle(g.key)}
              aria-expanded={!isCollapsed}
              className="flex h-11 w-full items-center gap-2 rounded-lg px-3 text-left transition-colors hover:bg-hover"
            >
              <span aria-hidden className={`inline-block w-3 text-faint transition-transform ${isCollapsed ? "" : "rotate-90"}`}>
                ›
              </span>
              <h3 className="text-sm font-semibold">{g.title}</h3>
              {g.meta && <span className="truncate text-xs text-muted">{g.meta}</span>}
              <span className="tabular ml-auto shrink-0 text-xs text-faint">
                {all.length} · {done} done
              </span>
            </button>
            {!isCollapsed &&
              g.sections.map((s) => (
                <div key={s.key} className="border-t border-line">
                  {s.label && (
                    <div className="flex items-baseline gap-2 px-3 py-1.5">
                      <span className="text-xs font-semibold text-muted">{s.label}</span>
                      {s.note && <span className="text-xs text-faint">{s.note}</span>}
                    </div>
                  )}
                  <div className={s.label ? "border-t border-line" : ""}>
                    {s.items.map((i) => (
                      <Row
                        key={i.id}
                        item={i}
                        info={props.info(i)}
                        selected={i.id === selectedId}
                        scroll={props.scrollToSelected}
                        onSelect={() => props.onSelect(i.id)}
                        onOpen={() => props.onOpen(i.id)}
                        roles={props.roles}
                        actions={props.actions}
                        menuRequest={props.menuRequest}
                      />
                    ))}
                  </div>
                </div>
              ))}
          </section>
        );
      })}
    </div>
  );
}
