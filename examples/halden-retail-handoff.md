> **Illustrative example.** Halden Retail Group is fictional, and so is every
> person, system, date, and number below. Nothing here describes a real
> customer.

# Activation handoff: Halden Retail Group

| | |
|---|---|
| Filled by | D. Osei, AE |
| Date filled | 2026-09-16 |
| Received by (CSM) | M. Lindqvist |

**How to fill this in:** write `UNKNOWN` for anything you do not actually know. Do not guess and do not smooth over a gap. The planner treats `UNKNOWN` as a week-one question to chase, which is useful. It treats a confident wrong answer as fact, which is not.

---

## Account basics

- Customer: Halden Retail Group
- Products and tiers purchased: ITSM, enterprise tier — request portal and service catalog, knowledge base, workflow automation, asset management with discovery, change management
- Seats / agents / contract size: 45 agent seats
- Contract start date: 2026-10-01
- Close date: 2026-09-11
- AE: D. Osei
- Assigned CSM: M. Lindqvist

---

## 1. Production use case, in their words

*The job they are hiring the product to do, quoted from a call or an email where possible. Not the category ("they bought ITSM"), the job ("consolidate three regional helpdesks into one queue before the Berlin office opens in March").*

> "We are merging the store-support desk and the head-office IT desk into one queue before the new distribution centre opens in March. Right now a store manager emails whoever they last spoke to, and nobody can tell me how many open requests we have."

- Source of the quote (call or thread, date): Discovery call, 2026-08-27, recorded
- Is this the whole scope, or phase one of something bigger: Phase one. Facilities and HR have asked to come onto the same platform during 2027. Not scoped, not priced.

---

## 2. Named technical owner and exec sponsor

| Role | Name | Title | Email | Have we met them? |
|---|---|---|---|---|
| Technical owner (does the work) | Priya Raman | IT Operations Manager | p.raman@example.com | Yes, on every call |
| Exec sponsor (unblocks and pays) | Dana Whitfield | COO | d.whitfield@example.com | Once, commercial call 2026-09-04 |
| Day-to-day admin, if different | UNKNOWN | | | Priya expects to name someone from the service desk |
| Infrastructure / security contact, if known | UNKNOWN | | | Never came up on any call |

- Is the technical owner doing this on top of a full-time job: Yes. Priya runs the head-office desk day to day and has no backfill.
- Has the exec sponsor ever been on a call with us: Once, 2026-09-04, commercial terms only. Not on any technical call.

---

## 3. Target date and what is driving it

- Target go-live date: 2027-01-12
- What is driving it (audit, incumbent contract expiry, office opening, fiscal year, a promise made to their board): The distribution centre opens in March 2027. Dana told the board in July that the merged desk would be running before it opens.
- Fixed or preferred: Dana describes it as fixed. Priya, on a later call, described the same date as "what we are aiming for". They have not said this to each other in front of us.
- What happens to them if it slips: The distribution centre opens onto two separate desks, and store managers keep emailing individuals.
- Any freeze periods we already know about (quarter end, holiday change freeze): No IT changes between 1 December and 6 January. Retail peak trading. Stated firmly by Priya.

---

## 4. Security or compliance constraints

*The most common single cause of a blown activation date. Ask even when they say there are none.*

- Security review required before deployment: UNKNOWN
- Data residency or regional hosting requirements: UNKNOWN
- Certifications they need from us (SOC 2, ISO 27001, HIPAA, FedRAMP, other): Priya asked what we hold on the technical call. Nothing has been formally requested.
- Restrictions on agents, scanners, or outbound connections: UNKNOWN
- Open items at signature (pen test report, vendor questionnaire, DPA, insurance): DPA signed at contract. Nothing else was raised.
- Who owns security sign-off on their side: UNKNOWN

---

## 5. Current stack and framework

- Tool being replaced, or is this greenfield: Head office runs a shared mailbox plus a spreadsheet tracker. Stores use a separate legacy service desk tool whose contract expires 2027-03-31.
- Why they are leaving the incumbent (in their words): "Nobody can tell me how many open requests we have."
- Identity provider: A cloud directory with SSO available. Whether their licence tier includes automated user provisioning is UNKNOWN.
- Systems we will need to integrate with: The HR system for joiners and leavers, their endpoint management tool, and the legacy store desk tool during any parallel running.
- Where their documentation lives today: A head-office wiki, roughly 200 pages. Stores keep printed sheets behind the counter. Last review date of the wiki is UNKNOWN.
- Process framework they follow (ITIL, home-grown, none): None formally. Priya has read ITIL and wants "the useful parts".
- Anything they have already built or automated that they expect to keep: A spreadsheet macro that produces the weekly open-request count Dana receives by email. Priya expects it to keep running.
- Who holds the credentials for each of the above: UNKNOWN for all of them except the wiki, which Priya administers.

---

## 6. How many teams will use this

- Teams in scope at launch: Head-office IT desk (9 agents), store support desk (14 agents)
- Teams in scope later, and roughly when: Facilities and HR, during 2027. Not scoped.
- End-user population served: Roughly 3,200 staff across head office, 240 stores, and 2 distribution centres
- Geographies and time zones: Single country, one time zone. Stores trade seven days a week.
- Is this one process shared across teams, or several that genuinely differ: Stated as one. Worth noting the two desks describe their work differently on every call — store support is phone-first and same-shift, head office is ticket-first and next-day.
- Has anyone outside the buying team agreed to this yet: Tomas Berg leads store support and has not been on a call. His desk carries the larger volume.

---

## 7. Commitments made during the sales cycle

*Include the soft ones. "Yeah, we can do that" in a demo is a commitment to the person who heard it.*

| Commitment | Made by | Made to | Where it is recorded | Deliverable as stated? |
|---|---|---|---|---|
| "Discovery will give you an accurate asset list in the first month" | D. Osei | Priya Raman | Demo call 2026-08-27, recorded | Unsure |
| "You will be live before the distribution centre opens" | D. Osei | Dana Whitfield | Commercial call 2026-09-04 | Depends on the December freeze |
| "We can import your wiki" | Solution engineer | Priya Raman | Demo call 2026-08-27 | Yes, mechanically |

- Anything promised on timing specifically: Go-live before the distribution centre opens, said to the exec sponsor.
- Anything promised that we are not sure we can deliver: The first-month asset list. It was said in a demo and nobody corrected it.

---

## 8. What "good" means to them

*Their definition, not ours. If nobody asked during the cycle, write `UNKNOWN` and it becomes the first question at kickoff.*

- Their stated outcome: One queue for both desks, and one number Dana can read without asking anyone for it.
- How they will know it worked: Dana stops receiving the weekly spreadsheet by email.
- Who inside their company judges that: Dana Whitfield.
- Is there a number attached, and who reports it upward: Open request count and average age, reported monthly to the board by Dana.
- What would make them consider this a failed rollout: Store managers still emailing individuals after go-live.

---

## 9. Baseline numbers before we configure anything

*Blank is fine. Invented is not. A baseline captured after we start configuring is not a baseline. If we cannot get real numbers, record their estimate and label it an estimate.*

| Metric | Current value | Estimate or measured | Source | Date captured |
|---|---|---|---|---|
| Ticket or request volume per month | ~1,400 head office. Stores UNKNOWN. | Estimate | Priya, from the spreadsheet tracker | 2026-09-16 |
| Average time to first response | UNKNOWN | | | |
| Average time to resolve | ~3.5 days, head office only | Estimate | Priya | 2026-09-16 |
| Share of requests arriving unstructured (email, chat, tap on the shoulder) | "Nearly all of it" | Estimate | Priya, discovery call | 2026-08-27 |
| Known asset count | ~4,100 expected | Estimate | Finance fixed-asset register, not an IT source | 2026-09-16 |
| Changes per month, and share that are emergency | UNKNOWN | | | No change process exists today |
| Existing knowledge articles | ~200 wiki pages. How many are current is UNKNOWN. | Measured (page count only) | Wiki export | 2026-09-16 |
| Headcount on the team doing the work | 23 agents across both desks | Measured | Priya | 2026-09-16 |

---

## Handoff notes

*Anything that does not fit a field: internal politics, a skeptic on their side, a champion who is new in seat, a competitor still in the building, a renewal date that is closer than it looks.*

Priya is five months into the role and inherited the spreadsheet tracker from someone who left. She is credible and engaged, and she is also the only person on their side who has done anything on this so far.

Dana is the only person who has said the go-live date out loud to anyone outside IT, and said it to the board.

Tomas Berg has not been in a single call. His desk has the larger volume and the more different way of working, and store support is where the "still emailing individuals" failure would show up first.

The legacy store desk tool expires 2027-03-31. That is a harder date than the stated go-live and nobody has treated it as one.

---

## Open questions for kickoff

1. Who owns security sign-off, and does a review process exist at all?
2. Who can provide discovery credentials for the store and distribution centre networks?
3. Is 2027-01-12 fixed or preferred, and which of Dana and Priya decides?
