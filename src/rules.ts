import { isUnassigned, labelOf, nameOf, rolesFor, type RoleBook } from "./owners.ts";
import { PREFIX, RULE } from "./titles.ts";
import type { Item } from "./types";

// Items the planner adds by rule, for any product. They are worked out live from the
// plan and the People list, so naming someone on the People list makes the matching
// task go away. Each rule is also written in SKILL.md; change both together.

const EXEC_SPONSOR = "exec_sponsor";

/** "Identify exec sponsor", when the exec sponsor has nobody named and the plan does not
 *  already have that task. */
function execSponsorTask(items: Item[], book: RoleBook): Item[] {
  if (nameOf(book, EXEC_SPONSOR)) return [];
  if (items.some((i) => i.title === RULE.execSponsor)) return [];
  return [
    {
      id: "rule-exec-sponsor",
      title: RULE.execSponsor,
      description: "Find out who sponsors this rollout on their side: the person who unblocks it and pays for it.",
      kind: "task",
      module: "People",
      lane: "start",
      week: 1,
      status: "todo",
      side: "customer",
      why: { facts: ["Exec sponsor: not named in the handoff"], source: "" },
      from: [EXEC_SPONSOR],
      doneWhen: ["Exec sponsor named on the People list", "They have been on a call with us, or one is booked"],
      notEvidence: [],
      visibility: "shared",
    },
  ];
}

/** "Name owner: <title>" in week 1, one for each role on their side that has nobody named
 *  and owns an unfinished item. The title names the first item waiting on that role; the
 *  description lists them all. A missing exec sponsor is covered by "Identify exec sponsor". */
function nameOwnerTasks(items: Item[], book: RoleBook): Item[] {
  const waiting = new Map<string, Item[]>();
  for (const i of items) {
    if (i.status === "done" || !isUnassigned(i, book)) continue;
    const role = rolesFor(i, "customer")[0];
    if (role === EXEC_SPONSOR) continue;
    // No role at all: the item gets its own task. Otherwise, one task per role.
    const key = role ?? `item:${i.id}`;
    waiting.set(key, [...(waiting.get(key) ?? []), i]);
  }
  const weekOrder = (i: Item) => (i.week === "after" ? 5 : i.week);
  return [...waiting].flatMap(([key, list]) => {
    const sorted = [...list].sort((a, b) => weekOrder(a) - weekOrder(b));
    const first = sorted[0]!;
    const title = `${PREFIX.nameOwner}: ${first.title}`;
    if (items.some((i) => i.title === title)) return [];
    const role = key.startsWith("item:") ? undefined : key;
    const label = role ? labelOf(book, role) : "Owner";
    const titles = sorted.map((i) => i.title).join(", ");
    return [
      {
        id: `rule-name-owner-${role ?? first.id}`,
        title,
        description: role
          ? `Get a named person on their side for the ${label.toLowerCase()} role. Waiting on it: ${titles}.`
          : `Get a named person on their side for "${first.title}". The plan has no role for it yet.`,
        kind: "task",
        module: first.module,
        lane: "start",
        week: 1,
        status: "todo",
        side: "us",
        why: { facts: [`${label}: nobody named`, ...sorted.map((i) => `Waiting on it: ${i.title}`)], source: "" },
        from: [],
        doneWhen: role
          ? [`A person is named for ${label.toLowerCase()} on the People list`, "They know which tasks are theirs"]
          : ["A person on their side is named as its owner", "They know it is theirs"],
        notEvidence: [],
        visibility: "shared",
      },
    ];
  });
}

/** The plan with every rule applied: the items as given, then the items rules add. */
export function applyRules(items: Item[], book: RoleBook): Item[] {
  return [...items, ...execSponsorTask(items, book), ...nameOwnerTasks(items, book)];
}
