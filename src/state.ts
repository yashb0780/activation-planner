import { useCallback, useEffect, useState } from "react";
import type { Decision, Item, Note, Quadrant, Sentiment, Status } from "./types";

const KEY = "activation-tracker:halden:v2";

export interface Saved {
  status: Record<string, Status>;
  notes: Record<string, Note[]>;
  answers: Record<string, string>;
  decisions: Record<string, Decision>;
  firstValue: string | null;
  quadrants: Record<string, Quadrant>;
  sentiments: Record<string, Sentiment>;
}

const empty: Saved = {
  status: {},
  notes: {},
  answers: {},
  decisions: {},
  firstValue: null,
  quadrants: {},
  sentiments: {},
};

function load(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    return { ...empty, ...(JSON.parse(raw) as Partial<Saved>) };
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

export function useTracker(base: Item[]) {
  const [saved, setSaved] = useState<Saved>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(saved));
    } catch {
      // See writePref.
    }
  }, [saved]);

  const items: Item[] = base.map((i) => ({ ...i, status: saved.status[i.id] ?? i.status }));

  const setStatus = useCallback((id: string, status: Status) => {
    setSaved((s) => ({ ...s, status: { ...s.status, [id]: status } }));
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

  const setFirstValue = useCallback((text: string) => setSaved((s) => ({ ...s, firstValue: text })), []);
  const setQuadrant = useCallback(
    (id: string, q: Quadrant) => setSaved((s) => ({ ...s, quadrants: { ...s.quadrants, [id]: q } })),
    [],
  );
  const setSentiment = useCallback(
    (id: string, v: Sentiment) => setSaved((s) => ({ ...s, sentiments: { ...s.sentiments, [id]: v } })),
    [],
  );

  const reset = useCallback(() => setSaved(empty), []);

  const exportJson = useCallback(
    (customer: string) => {
      const data = {
        customer,
        exportedAt: now(),
        firstValue: saved.firstValue,
        items: items.map((i) => ({
          id: i.id,
          kind: i.kind,
          title: i.title,
          status: i.status,
          answer: saved.answers[i.id] ?? null,
          decision: saved.decisions[i.id] ?? null,
          notes: saved.notes[i.id] ?? [],
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
    [items, saved],
  );

  return {
    items,
    saved,
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
