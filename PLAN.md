# Activation v2: the remaining plan

A handover note, so a new session can pick this up. Branch: `activation-v2`.
Read `CLAUDE.md` first; everything below adds to it.

## How we work (the owner's rules)

- The owner is non-technical. Explain every change in plain language, with a
  concrete example.
- **Never use em dashes**, anywhere: code, comments, UI copy, commits, docs,
  chat. Use colons, commas or parentheses.
- Show drafts of new content files (configs, handoffs, boards, plans) in the
  scratch folder before writing them to the repo, and wait for an OK.
- After each approved step: `npm run build`, `npm test`, commit (author email
  yashbriju@gmail.com, the GitHub account email), and push `activation-v2`
  only. **Never merge into main or push main unless the owner says so.**
- The planner must keep working when a CSM fills the handoff by hand. No step
  may make source tags or agent-style answers required.
- The engine (`SKILL.md`, `templates/`, `src/` outside `src/data/`) stays
  product-agnostic. Product details live only in `config/`.
- **Name rule.** LangChain and CoreWeave may appear only in
  `config/langchain.md`, `examples/langchain-coreweave-*`,
  `src/data/langchain-*.ts`, the CLAUDE.md exception paragraph, and one README
  line describing the demo. Check with exactly this command (the only allowed
  hits are the CLAUDE.md exception and the one README line):

  ```bash
  git grep -n -i -E "langchain|langsmith|coreweave|salesforce|gong" -- . ':!config/langchain.md' ':!examples/langchain-coreweave-*' ':!src/data/langchain-*.ts'
  ```

- **Customer view** (the panel and the rows) never shows: source tags (the
  handoff fields and the call or document an item came from), Promised in
  sales, Promise at risk, Verify and agent's read lines, drift detail, hold or
  blocked reasons, internal notes, or "What we know".
- Short titles follow `src/titles.ts` and the "short title" rules in
  `SKILL.md`: tasks start with a verb, decisions with "Decide", questions are a
  topic from the fixed list; 2 to 6 words, sentence case, no full stop; for
  "Name owner: <title>" style titles only the part before the colon counts.
  `npm test` enforces this.
- The demo is pinned to 2026-09-25 (`asOf` on the dataset); `?asof=` overrides.

## Done so far

| Step | What | Where |
|---|---|---|
| A1 to A4 | LangChain config, CoreWeave handoff, board, 30-day plan, app switched to the new demo, Veltmoor retired | merged to main |
| B1 to B3 | Short titles plus descriptions, slim rows, side panel in both views | merged to main (6f2cf73) |
| C | Named customer owners: "Unassigned" in amber, one "Name owner: <title>" per unnamed role, "Identify exec sponsor" (`src/rules.ts`) | branch, not merged |
| D | Customer approval time (`approval_lead_time`, weeks), combined lead times (`src/lead.ts`), computed "Promise at risk", "Ask about approval timelines" | branch, not merged |
| E | Health strip (`src/health.ts`): Open blockers, Customer tasks with no owner, Overdue; On hold renamed Blocked; click a count to filter | branch, not merged |

Main is at the commit after B3 plus the two fixes (6f2cf73). C, D and E wait on
`activation-v2` until the owner says to merge.

## Step F: Accounts view

- An **Accounts** page becomes the home page. It lists every account being
  activated on the LangChain demo; clicking a row opens that account's board.
  Use hash addresses (`#/` for the list, `#/account/<id>` for a board), so no
  new packages and no Vercel change. A board has a link back to the list.
- Each row shows: account name, **phase**, target go-live date, **day N of 30**,
  next milestone, and the three health counts from step E (computed with the
  same engine function the strip uses, `src/health.ts`).
- **Phases live in the product config**, never the engine. `config/langchain.md`
  already has a Phases section (Kickoff, Setup, First value, Production, Day 30
  review), each listing its milestone tasks by short title. Carry it into
  `src/data/langchain-product.ts` so all LangChain accounts share it. An
  account's phase is the earliest phase that still has an unfinished milestone
  task. It is a status label only: it must not change task order on the board.
  "the kickoff call held" and "the day 30 review held" map to the rule-made
  titles "Draft the success plan" / "Hold the day 30 review" (check and adjust
  the config wording so every milestone matches a real short title).
- **Two more fictional accounts** at different phases (for example one in First
  value, one in Production), with fictional company names, clearly marked
  "(fictional)" in the list and on the board. Each needs a short filled
  handoff and an account data file built from the shared product file. Show
  drafts first.
  - Open question for the owner before writing them: the name rule only allows
    the product name in `examples/langchain-coreweave-*`. Either extend the
    allowed patterns to `examples/langchain-*` (and update the CLAUDE.md
    exception and the grep command), or keep the product name out of the new
    handoffs and name the files without it.
  - The config's evidence lines mention "tickets" (support-specific). If a new
    account's agent is not a ticket agent, make those lines product-level in the
    config, and update the quotes in `langchain-product.ts` to match.
- **Halden and Acme** move under an "Other product examples" section on the
  Accounts page (they are different products, so they are not "my accounts").
  The dropdown switcher in the header can go once the Accounts page exists.
- Keep the Veltmoor demo retired.

## Step G: Check, then push

1. `npm run build` and `npm test`.
2. Run the name-rule command above and show the results.
3. **Hand-filled handoff check.** Make a copy of a handoff with every Source
   column blank (in the scratch folder, not committed), run the skill on it,
   and confirm the board still builds. Also confirm with `npm test` (or a new
   check) that the engine rules (titles, owners, approval time, health counts)
   work when every source is empty.
4. **README:** describe the Accounts view, the side panel (and what Customer
   view hides), the short-title rules and `npm test`, and the new handoff field
   `approval_lead_time`. Remove the README's older em dashes. Keep the demo to
   one line.
5. Also: remove the em dashes left in `SKILL.md` prose; update "Current state"
   in `CLAUDE.md`; add to `TODO.md` that the app does not yet read a handoff file
   directly (demos are built by hand from the skill's output).
6. Show a summary of all commits on the branch, then **ask before merging into
   main**.
7. After merging, explain in simple terms how to find the Vercel preview link
   for a branch, and how merging into main updates the live site.
