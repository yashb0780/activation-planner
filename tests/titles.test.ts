// Checks every demo in src/data against the short-title rules in src/titles.ts.
// Run with `npm test`. Works for any product: it reads each demo's own config file.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { configTitles, PREFIX, QUESTION_TOPICS, questionTitleFor, RULE, titleProblems } from "../src/titles.ts";
import type { Dataset } from "../src/types.ts";

const root = new URL("../", import.meta.url);
const dataDir = new URL("src/data/", root);

const datasets: Dataset[] = [];
for (const file of readdirSync(dataDir).filter((f) => f.endsWith(".ts") && f !== "index.ts")) {
  const mod = (await import(new URL(file, dataDir).href)) as { dataset?: Dataset };
  if (mod.dataset) datasets.push(mod.dataset);
}

const RULES = new Set<string>(Object.values(RULE));
const PREFIXES = new Set<string>(Object.values(PREFIX));

test("there is at least one demo", () => {
  assert.ok(datasets.length > 0);
});

for (const d of datasets) {
  const fromConfig = configTitles(readFileSync(new URL(d.configFile, root), "utf8"));
  const baselineFields = Object.keys(d.configFieldLabels);
  const titles = new Set(d.items.map((i) => i.title));
  const modules = new Set(d.items.map((i) => i.module));

  /** Where a task or decision title comes from, or null when nothing gives it. */
  function source(title: string): "config" | "rule" | null {
    if (fromConfig.has(title)) return "config";
    if (RULES.has(title)) return "rule";
    const [before, after] = title.split(": ");
    if (after && PREFIXES.has(before!)) {
      const ok = titles.has(after) || modules.has(after) || QUESTION_TOPICS.includes(after) || /^request \d+$/.test(after);
      if (ok) return "rule";
    }
    return null;
  }

  test(`${d.label}: every title follows the style rules`, () => {
    const bad = d.items.map((i) => ({ id: i.id, title: i.title, problems: titleProblems(i) })).filter((x) => x.problems.length);
    assert.deepEqual(bad, []);
  });

  test(`${d.label}: every item has a description`, () => {
    assert.deepEqual(d.items.filter((i) => !i.description?.trim()).map((i) => i.id), []);
  });

  test(`${d.label}: no two items share a title`, () => {
    const seen = new Map<string, string>();
    const dupes: string[] = [];
    for (const i of d.items) {
      if (seen.has(i.title)) dupes.push(`${i.title} (${seen.get(i.title)}, ${i.id})`);
      seen.set(i.title, i.id);
    }
    assert.deepEqual(dupes, []);
  });

  test(`${d.label}: question titles come from the fixed topic list`, () => {
    const wrong = d.items
      .filter((i) => i.kind === "question" && i.title !== questionTitleFor(i, baselineFields))
      .map((i) => `${i.id}: "${i.title}", expected "${questionTitleFor(i, baselineFields)}"`);
    assert.deepEqual(wrong, []);
    const offList = d.items.filter((i) => i.topic && !QUESTION_TOPICS.includes(i.topic)).map((i) => `${i.id}: ${i.topic}`);
    assert.deepEqual(offList, [], "A question's topic must be on the fixed list");
  });

  test(`${d.label}: task and decision titles come from the config or a rule, unless marked hand-written`, () => {
    const others = d.items.filter((i) => i.kind !== "question");
    const unexplained = others.filter((i) => !i.handTitle && !source(i.title)).map((i) => `${i.id}: ${i.title}`);
    const wronglyMarked = others.filter((i) => i.handTitle && source(i.title)).map((i) => `${i.id}: ${i.title}`);
    assert.deepEqual(unexplained, [], "Titles with no source: add them to the config, use a rule, or mark handTitle");
    assert.deepEqual(wronglyMarked, [], "Marked hand-written, but the config or a rule gives this title");
    const hand = others.filter((i) => i.handTitle);
    console.log(`${d.label}: ${hand.length} hand-written title${hand.length === 1 ? "" : "s"} of ${d.items.length} items`);
  });
}

// The board's item index and the app's item list must match: same items, kinds, weeks and
// modules, in the same order.
for (const d of datasets.filter((x) => x.boardFile)) {
  test(`${d.label}: items match the board's item index`, () => {
    const board = readFileSync(new URL(d.boardFile!, root), "utf8");
    const index = board.split("## Item index")[1];
    assert.ok(index, "The board has no Item index section");
    const rows = index
      .split("\n")
      .filter((l) => l.startsWith("| ") && !l.startsWith("| Item "))
      .map((l) => l.slice(1, -1).split("|").map((c) => c.trim()).join(" / "));
    const items = d.items.map((i) => [i.title, i.kind, String(i.week), i.module].join(" / "));
    const count = (xs: string[], kind: string) => xs.filter((x) => x.split(" / ")[1] === kind).length;
    console.log(
      `${d.label}: board ${count(rows, "task")} tasks, ${count(rows, "decision")} decisions, ${count(rows, "question")} questions; ` +
        `app ${count(items, "task")} tasks, ${count(items, "decision")} decisions, ${count(items, "question")} questions`,
    );
    assert.deepEqual(items, rows);
  });
}

// Every dependency points to an item in the same demo, and never to itself.
for (const d of datasets) {
  test(`${d.label}: every dependency points to a real item`, () => {
    const ids = new Set(d.items.map((i) => i.id));
    const bad = d.items.flatMap((i) => (i.dependsOn ?? []).filter((x) => !ids.has(x) || x === i.id).map((x) => `${i.id} -> ${x}`));
    assert.deepEqual(bad, []);
  });
}
