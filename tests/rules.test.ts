// Checks the rules the planner applies by itself (src/rules.ts, src/lead.ts), on a demo
// that has the parts each rule needs. Run with `npm test`.

import { test } from "node:test";
import assert from "node:assert/strict";
import { readdirSync } from "node:fs";
import { effectiveLead } from "../src/lead.ts";
import { health, HEALTH_KEYS } from "../src/health.ts";
import { applyRules } from "../src/rules.ts";
import { RULE } from "../src/titles.ts";
import type { Dataset } from "../src/types.ts";

const dataDir = new URL("../src/data/", import.meta.url);
const datasets: Dataset[] = [];
for (const file of readdirSync(dataDir).filter((f) => f.endsWith(".ts") && f !== "index.ts")) {
  const mod = (await import(new URL(file, dataDir).href)) as { dataset?: Dataset };
  if (mod.dataset) datasets.push(mod.dataset);
}
const bookOf = (d: Dataset) => new Map(d.roles.map((r) => [r.id, r]));

// A demo with approval time in the handoff and a promise with a stated week.
const withApproval = datasets.find((d) => d.account.approvalWeeks && d.items.some((i) => i.approval?.length && i.promisedWeek));

test("their approval time is added to items that wait for it, and only those", { skip: !withApproval }, () => {
  const d = withApproval!;
  for (const i of d.items.filter((x) => x.lead)) {
    const l = effectiveLead(i, d.account)!;
    const extra = i.approval?.length ? d.account.approvalWeeks! : { min: 0, max: 0 };
    assert.equal(l.min, i.lead!.min + extra.min, i.id);
    assert.equal(l.max, i.lead!.max + extra.max, i.id);
  }
});

test("a promise the combined lead time cannot meet is at risk, with a one-line reason", { skip: !withApproval }, () => {
  const d = withApproval!;
  const plan = applyRules(d.items, bookOf(d), d.account);
  for (const i of plan.filter((x) => x.promisedWeek !== undefined && x.lead)) {
    const l = effectiveLead(i, d.account)!;
    if (l.min > i.promisedWeek!) {
      assert.ok(i.promiseRisk?.startsWith(`Promised by week ${i.promisedWeek}`), i.id);
      assert.ok(!i.promiseRisk!.includes("\n"), "one line");
    } else assert.equal(i.promiseRisk, undefined, i.id);
  }
});

test("with approval time blank: product lead only, and a week 1 task to ask", { skip: !withApproval }, () => {
  const d = withApproval!;
  const account = { ...d.account, approvalWeeks: undefined };
  const plan = applyRules(d.items, bookOf(d), account);
  for (const i of d.items.filter((x) => x.lead)) assert.deepEqual([effectiveLead(i, account)!.min, effectiveLead(i, account)!.max], [i.lead!.min, i.lead!.max]);
  const ask = plan.find((i) => i.title === RULE.askApprovals);
  assert.ok(ask, "Ask about approval timelines is added");
  assert.equal(ask!.week, 1);
  assert.equal(applyRules(d.items, bookOf(d), d.account).some((i) => i.title === RULE.askApprovals), false, "not added when the time is known");
});

test("no config item waits for approval: no ask task, whatever the handoff says", () => {
  for (const d of datasets.filter((x) => !x.items.some((i) => i.approval?.length))) {
    assert.equal(applyRules(d.items, bookOf(d), d.account).some((i) => i.title === RULE.askApprovals), false, d.label);
  }
});

test("naming the missing person clears their Name owner task", () => {
  for (const d of datasets) {
    const book = bookOf(d);
    const before = applyRules(d.items, book, d.account).filter((i) => i.id.startsWith("rule-name-owner-"));
    for (const task of before) {
      const role = task.id.slice("rule-name-owner-".length);
      if (!book.has(role)) continue;
      const named = new Map(book);
      named.set(role, { ...book.get(role)!, name: "A. Person" });
      const after = applyRules(d.items, named, d.account);
      assert.equal(after.some((i) => i.id === task.id), false, `${d.label}: ${task.title}`);
    }
  }
});

test("rules work when a handoff gives no sources at all (hand-filled)", () => {
  for (const d of datasets) {
    const bare = d.items.map((i) => ({ ...i, why: { ...i.why, source: "" }, verify: undefined }));
    const plan = applyRules(bare, bookOf(d), d.account);
    assert.ok(plan.length >= bare.length, d.label);
  }
});

test("the health strip is not all zeros on a demo's own date", () => {
  for (const d of datasets.filter((x) => x.asOf)) {
    const book = bookOf(d);
    const h = health(applyRules(d.items, book, d.account), book, d.asOf!, d.account);
    for (const k of HEALTH_KEYS) assert.ok(h[k].length > 0, `${d.label}: ${k} is 0`);
    console.log(`${d.label} on ${d.asOf}: ${HEALTH_KEYS.map((k) => `${k} ${h[k].length}`).join(", ")}`);
  }
});

test("health counts never include done items, and overdue never includes after-day-30 items", () => {
  for (const d of datasets) {
    const book = bookOf(d);
    const h = health(applyRules(d.items, book, d.account), book, "2099-01-01", d.account);
    for (const k of HEALTH_KEYS) assert.equal(h[k].some((i) => i.status === "done"), false, `${d.label}: ${k}`);
    assert.equal(h.overdue.some((i) => i.week === "after"), false, d.label);
  }
});
