import { useCallback, useEffect, useState } from "react";
import type { Item, Note, Status } from "./types";

const KEY = "activation-tracker:halden:v1";

export interface Saved {
  status: Record<string, Status>;
  notes: Record<string, Note[]>;
  answers: Record<string, string>;
}

const empty: Saved = { status: {}, notes: {}, answers: {} };

function load(): Saved {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return empty;
    const parsed = JSON.parse(raw) as Partial<Saved>;
    return {
      status: parsed.status ?? {},
      notes: parsed.notes ?? {},
      answers: parsed.answers ?? {},
    };
  } catch {
    return empty;
  }
}

export function readPref(key: string, fallback: string): string {
  try {
    return localStorage.getItem(key) ?? fallback;
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
    const note: Note = { text, internal, at: new Date().toISOString() };
    setSaved((s) => ({ ...s, notes: { ...s.notes, [id]: [...(s.notes[id] ?? []), note] } }));
  }, []);

  const answer = useCallback((id: string, text: string) => {
    const note: Note = { text: `Answered: ${text}`, internal: false, at: new Date().toISOString() };
    setSaved((s) => ({
      status: { ...s.status, [id]: "done" },
      answers: { ...s.answers, [id]: text },
      notes: { ...s.notes, [id]: [...(s.notes[id] ?? []), note] },
    }));
  }, []);

  const reset = useCallback(() => setSaved(empty), []);

  const exportJson = useCallback(
    (customer: string) => {
      const data = {
        customer,
        exportedAt: new Date().toISOString(),
        items: items.map((i) => ({
          id: i.id,
          title: i.title,
          status: i.status,
          answer: saved.answers[i.id] ?? null,
          notes: saved.notes[i.id] ?? [],
        })),
      };
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `activation-tracker-${new Date().toISOString().slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    },
    [items, saved],
  );

  return { items, saved, setStatus, addNote, answer, reset, exportJson };
}
