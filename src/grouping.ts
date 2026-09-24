import { formatDate, weekEnd, weekStart } from "./dates";
import type { Account, Gate, Item, Lane, Week } from "./types";

// How the Plan tab groups its rows. Every grouping produces the same shape:
// collapsible groups, each with one or more labelled sections of rows.

export type Lens = "week" | "lead" | "owner" | "module";
export const LENSES = ["week", "lead", "owner", "module"] as const;
export const LENS_LABEL: Record<Lens, string> = { week: "Week", lead: "Lead time", owner: "Owner", module: "Module" };

export interface Section {
  key: string;
  label?: string;
  note?: string;
  items: Item[];
}

export interface Group {
  key: string;
  title: string;
  meta?: string;
  sections: Section[];
}

const LANE_ORDER: Record<Lane, number> = { kickoff: 0, foundation: 1, start: 2, quick: 3, earned: 4 };
const doneLast = (a: Item, b: Item) => Number(a.status === "done") - Number(b.status === "done");
const byLane = (a: Item, b: Item) => doneLast(a, b) || LANE_ORDER[a.lane] - LANE_ORDER[b.lane];

/** "Clears “Prerequisites cleared”: 1 of 4 done", for the Foundation section. */
function foundationNote(gates: Gate[], all: Item[]): string | undefined {
  const g = gates.find((x) => x.lane === "foundation");
  if (!g) return undefined;
  const done = g.linked.filter((id) => all.find((i) => i.id === id)?.status === "done").length;
  return `Clears “${g.label}”: ${done} of ${g.linked.length} done`;
}

function section(key: string, items: Item[], label?: string, note?: string): Section {
  return { key, label, note, items: [...items].sort(byLane) };
}

const nonEmpty = (g: Group) => ({ ...g, sections: g.sections.filter((s) => s.items.length > 0) });

export function buildGroups(items: Item[], all: Item[], lens: Lens, account: Account, gates: Gate[]): Group[] {
  const decisions = items.filter((i) => i.kind === "decision");
  const questions = items.filter((i) => i.kind === "question");
  const tasks = items.filter((i) => i.kind === "task");
  const fNote = foundationNote(gates, all);
  let groups: Group[];

  if (lens === "week") {
    const weeks: Week[] = [1, 2, 3, 4, "after"];
    groups = weeks.map((w) => {
      const inW = items.filter((i) => i.week === w);
      return {
        key: `w-${w}`,
        title: w === "after" ? "After day 30" : `Week ${w}`,
        meta:
          w === "after"
            ? "Started inside the window, lands after it"
            : `${formatDate(weekStart(w, account))} – ${formatDate(weekEnd(w, account))}`,
        sections: [
          section("kickoff", inW.filter((i) => i.kind === "task" && i.lane === "kickoff"), "Kickoff setup", "Quick setup done at kickoff"),
          section("decisions", inW.filter((i) => i.kind === "decision"), "Decisions"),
          section("questions", inW.filter((i) => i.kind === "question"), "Questions"),
          section("foundation", inW.filter((i) => i.kind === "task" && i.lane === "foundation"), "Foundation", fNote),
          section("tasks", inW.filter((i) => i.kind === "task" && i.lane !== "foundation" && i.lane !== "kickoff"), "Tasks"),
        ],
      };
    });
  } else {
    const pinned: Group[] = [
      {
        key: "kickoff",
        title: "Kickoff setup",
        meta: "Quick setup done at kickoff",
        sections: [section("all", tasks.filter((i) => i.lane === "kickoff"))],
      },
      { key: "decisions", title: "Decisions", meta: "Someone has to choose. Record what, who and when.", sections: [section("all", decisions)] },
      { key: "questions", title: "Questions", meta: "Unknowns in the handoff, and volumes to find out", sections: [section("all", questions)] },
      {
        key: "foundation",
        title: "Foundation",
        meta: fNote ?? "Setup every module needs. Starts in week 1.",
        sections: [section("all", tasks.filter((i) => i.lane === "foundation"))],
      },
    ];
    const rest = tasks.filter((i) => i.lane !== "foundation" && i.lane !== "kickoff");
    let others: Group[];
    if (lens === "lead") {
      const now = rest.filter((i) => i.week !== "after");
      others = [
        { key: "start", title: "Start now", meta: "Long lead, mostly waiting", sections: [section("all", now.filter((i) => i.lane === "start"))] },
        { key: "quick", title: "Quick wins", meta: "Finish early, buy credibility", sections: [section("all", now.filter((i) => i.lane === "quick"))] },
        { key: "earned", title: "Earned", meta: "Needs evidence from the first two", sections: [section("all", now.filter((i) => i.lane === "earned"))] },
        { key: "after", title: "After day 30", meta: "Started inside the window, lands after it", sections: [section("all", rest.filter((i) => i.week === "after"))] },
      ];
    } else if (lens === "owner") {
      const group = (i: Item) => (i.team === "other" ? "other" : i.side);
      others = [
        { key: "us", title: "Us", meta: "Our side of the work", sections: [section("all", rest.filter((i) => group(i) === "us"))] },
        { key: "customer", title: "Customer", meta: "The customer's core team", sections: [section("all", rest.filter((i) => group(i) === "customer"))] },
        { key: "other", title: "Customer's other teams", meta: "Identity, security, infrastructure", sections: [section("all", rest.filter((i) => group(i) === "other"))] },
      ];
    } else {
      const modules = [
        ...new Set(all.filter((i) => i.kind === "task" && i.lane !== "foundation" && i.lane !== "kickoff").map((i) => i.module)),
      ];
      others = modules.map((m) => ({ key: `m-${m}`, title: m, sections: [section("all", rest.filter((i) => i.module === m))] }));
    }
    groups = [...pinned, ...others];
  }
  return groups.map(nonEmpty).filter((g) => g.sections.length > 0);
}
