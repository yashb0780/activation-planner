import { useCallback, useEffect, useMemo, useState } from "react";
import { displayName, rolesFor, type RoleBook } from "./owners";
import type { Decision, FirstValue, Item, Note, Quadrant, Role, Sentiment, Side, Status } from "./types";

/** The parts of First value a person can edit. */
export type FirstValueEdit = Pick<FirstValue, "headline" | "points">;

export interface Saved {
  status: Record<string, Status>;
  notes: Record<string, Note[]>;
  answers: Record<string, string>;
  decisions: Record<string, Decision>;
  firstValue: FirstValueEdit | null;
  quadrants: Record<string, Quadrant>;
  sentiments: Record<string, Sentiment>;
  /** Names typed into the People list, by role ID. */
  roleNames: Record<string, string>;
  /** Owner roles changed on a single item, by item ID and side. */
  ownerOverrides: Record<string, Partial<Record<Side, string[]>>>;
  /** "Previously: ..." notes, by item ID. */
  ownerHistory: Record<string, OwnerChange[]>;
  /** Review ticks, by section ID. */
  reviewed: Record<string, boolean>;
  /** Why an item is on hold, when set here rather than in the plan. */
  holdReasons: Record<string, string>;
  /** Ticked checklist lines on grouped questions: item ID → line indexes. */
  checks: Record<string, number[]>;
}

export interface OwnerChange {
  previous: string;
  side: Side;
  at: string;
}

const empty: Saved = {
  status: {},
  notes: {},
  answers: {},
  decisions: {},
  firstValue: null,
  quadrants: {},
  sentiments: {},
  roleNames: {},
  ownerOverrides: {},
  ownerHistory: {},
  reviewed: {},
  holdReasons: {},
  checks: {},
};

function load(key: string): Saved {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return empty;
    const saved = { ...empty, ...(JSON.parse(raw) as Partial<Saved>) };
    // Older versions saved First value as one paragraph. Drop it rather than show a broken card.
    const fv = saved.firstValue as unknown;
    if (fv !== null && (typeof fv !== "object" || !Array.isArray((fv as FirstValueEdit).points))) saved.firstValue = null;
    // Older versions called On hold "blocked".
    for (const [id, st] of Object.entries(saved.status)) if ((st as string) === "blocked") saved.status[id] = "hold";
    return saved;
  } catch {
    return empty;
  }
}

export function readPref<T extends string>(key: string, fallback: T, allowed?: readonly T[]): T {
  try {
    const v = localStorage.getItem(key) as T | null;
    if (v === null) return fallback;
    return allowed && !allowed.includes(v) ? fallback : v;
  } catch {
    return fallback;
  }
}

export function writePref(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage unavailable (private window, blocked site data). The app still works for this visit.
  }
}

const now = () => new Date().toISOString();

/** `derive` adds the items rules make (see src/rules.ts). They are worked out again on every
 *  change, from the items and the People list, and keep any status saved for them. */
export function useTracker(key: string, base: Item[], baseRoles: Role[], derive?: (items: Item[], book: RoleBook) => Item[]) {
  const [saved, setSaved] = useState<Saved>(() => load(key));

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(saved));
    } catch {
      // See writePref.
    }
  }, [key, saved]);

  const roles: Role[] = useMemo(
    () => baseRoles.map((r) => ({ ...r, name: saved.roleNames[r.id] ?? r.name })),
    [baseRoles, saved.roleNames],
  );
  const book: RoleBook = useMemo(() => new Map(roles.map((r) => [r.id, r])), [roles]);

  const withOwners = (i: Item, overrides: Saved["ownerOverrides"]): Item => ({
    ...i,
    ours: overrides[i.id]?.us ?? i.ours,
    theirs: overrides[i.id]?.customer ?? i.theirs,
  });

  const withSaved = (i: Item): Item => ({
    ...withOwners(i, saved.ownerOverrides),
    status: saved.status[i.id] ?? i.status,
    holdReason: saved.holdReasons[i.id] ?? i.holdReason,
  });
  const merged = base.map(withSaved);
  const baseIds = new Set(base.map((i) => i.id));
  const items: Item[] = derive
    ? derive(merged, book).map((i) => (baseIds.has(i.id) ? i : withSaved(i)))
    : merged;

  const setStatus = useCallback((id: string, status: Status) => {
    setSaved((s) => ({ ...s, status: { ...s.status, [id]: status } }));
  }, []);

  /** Put an item on hold. A reason is required. */
  const setHold = useCallback((id: string, reason: string) => {
    setSaved((s) => ({
      ...s,
      status: { ...s.status, [id]: "hold" },
      holdReasons: { ...s.holdReasons, [id]: reason },
    }));
  }, []);

  const toggleCheck = useCallback((id: string, line: number) => {
    setSaved((s) => {
      const on = s.checks[id] ?? [];
      const next = on.includes(line) ? on.filter((n) => n !== line) : [...on, line];
      return { ...s, checks: { ...s.checks, [id]: next } };
    });
  }, []);

  const addNote = useCallback((id: string, text: string, internal: boolean) => {
    setSaved((s) => ({ ...s, notes: { ...s.notes, [id]: [...(s.notes[id] ?? []), { text, internal, at: now() }] } }));
  }, []);

  const answer = useCallback((id: string, text: string) => {
    setSaved((s) => ({
      ...s,
      status: { ...s.status, [id]: "done" },
      answers: { ...s.answers, [id]: text },
    }));
  }, []);

  const decide = useCallback((id: string, d: Decision) => {
    setSaved((s) => ({
      ...s,
      status: { ...s.status, [id]: "done" },
      decisions: { ...s.decisions, [id]: d },
    }));
  }, []);

  /** Reopen a resolved decision or question. */
  const reopen = useCallback((id: string) => {
    setSaved((s) => {
      const { [id]: _a, ...answers } = s.answers;
      const { [id]: _d, ...decisions } = s.decisions;
      const { [id]: _s, ...status } = s.status;
      void _a;
      void _d;
      void _s;
      return { ...s, answers, decisions, status };
    });
  }, []);

  const setFirstValue = useCallback((fv: FirstValueEdit) => setSaved((s) => ({ ...s, firstValue: fv })), []);
  const setQuadrant = useCallback(
    (id: string, q: Quadrant) => setSaved((s) => ({ ...s, quadrants: { ...s.quadrants, [id]: q } })),
    [],
  );
  const setSentiment = useCallback(
    (id: string, v: Sentiment) => setSaved((s) => ({ ...s, sentiments: { ...s.sentiments, [id]: v } })),
    [],
  );

  /** Replace the primary owner on one side of one item. Any co-owners after it stay. */
  const setOwner = useCallback(
    (id: string, side: Side, roleId: string) => {
      setSaved((s) => {
        const item = base.find((i) => i.id === id);
        if (!item) return s;
        const current = rolesFor(withOwners(item, s.ownerOverrides), side);
        if (current[0] === roleId) return s;
        const previous = current[0] ? displayName(book, current[0]) : "Not named";
        const next = [roleId, ...current.slice(1).filter((r) => r !== roleId)];
        return {
          ...s,
          ownerOverrides: { ...s.ownerOverrides, [id]: { ...s.ownerOverrides[id], [side]: next } },
          ownerHistory: { ...s.ownerHistory, [id]: [...(s.ownerHistory[id] ?? []), { previous, side, at: now() }] },
        };
      });
    },
    [base, book],
  );

  /** Rename a role on the People list. Every item using the role gets a "Previously" note. */
  const renameRole = useCallback(
    (roleId: string, name: string) => {
      setSaved((s) => {
        const role = book.get(roleId);
        if (!role || role.name === name) return s;
        const previous = role.name || "Not named";
        const at = now();
        const ownerHistory = { ...s.ownerHistory };
        base.forEach((i) => {
          const it = withOwners(i, s.ownerOverrides);
          (["us", "customer"] as const).forEach((side) => {
            if (rolesFor(it, side).includes(roleId)) {
              ownerHistory[i.id] = [...(ownerHistory[i.id] ?? []), { previous, side, at }];
            }
          });
        });
        return { ...s, roleNames: { ...s.roleNames, [roleId]: name }, ownerHistory };
      });
    },
    [base, book],
  );

  const setReviewed = useCallback(
    (section: string, on: boolean) => setSaved((s) => ({ ...s, reviewed: { ...s.reviewed, [section]: on } })),
    [],
  );

  const reset = useCallback(() => setSaved(empty), []);

  const exportJson = useCallback(
    (customer: string) => {
      const data = {
        customer,
        exportedAt: now(),
        firstValue: saved.firstValue,
        reviewed: saved.reviewed,
        roles: roles.map((r) => ({ id: r.id, side: r.side, label: r.label, name: r.name })),
        items: items.map((i) => ({
          id: i.id,
          kind: i.kind,
          title: i.title,
          status: i.status,
          answer: saved.answers[i.id] ?? null,
          decision: saved.decisions[i.id] ?? null,
          notes: saved.notes[i.id] ?? [],
          holdReason: i.status === "hold" ? (i.holdReason ?? null) : null,
          checklist: i.checklist?.map((c, n) => ({ line: c.text, answered: (saved.checks[i.id] ?? []).includes(n) })),
          owners: { us: rolesFor(i, "us"), customer: rolesFor(i, "customer") },
          ownerHistory: saved.ownerHistory[i.id] ?? [],
        })),
        people: { quadrants: saved.quadrants, sentiments: saved.sentiments },
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `activation-tracker-${now().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
    [items, roles, saved],
  );

  return {
    items,
    roles,
    book,
    saved,
    setOwner,
    setHold,
    toggleCheck,
    renameRole,
    setReviewed,
    setStatus,
    addNote,
    answer,
    decide,
    reopen,
    setFirstValue,
    setQuadrant,
    setSentiment,
    reset,
    exportJson,
  };
}
