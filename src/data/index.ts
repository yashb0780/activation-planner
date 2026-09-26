import type { Dataset } from "../types";

// The examples the tracker can show: every file in this folder that exports
// `dataset`, found automatically, so this file never names one. Files that
// export no dataset (a shared product file) are skipped. Private demos live in
// src/data/private-*.ts, which git ignores, and join the same way when present.
// Order: by each dataset's `order`, lowest first; the first is the default on load.
const files = import.meta.glob<{ dataset?: Dataset }>(["./*.ts", "!./index.ts"], { eager: true });

export const datasets: Dataset[] = Object.values(files)
  .flatMap((f) => (f.dataset ? [f.dataset] : []))
  .sort((a, b) => (a.order ?? Infinity) - (b.order ?? Infinity));
