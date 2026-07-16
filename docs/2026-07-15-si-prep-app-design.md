# SI-Prep App — Design Spec (2026-07-15)

Confirmed via /grill-me interview. Target: JKSSB Sub-Inspector (J&K Police) written exam.

## Exam facts (from syllabus PDF, graphify-out/graph.json)
100 MCQ · 200 marks · 120 min · −0.5 negative marking.
A Reasoning 20Q/40M (grad) · B General Awareness 20Q/40M (grad) · C Quant 15Q/30M (10th) ·
D English 15Q/30M (grad) · E Math 15Q/30M (10th) · F Computer 15Q/30M (10th).
User target: 95% (≤4 wrong of 100). Timeline 1–2 months, 3–4 h/day. English only. Offline.

## Architecture
Static app in `E:\exam\app\`, no build step, works from file:// or any static server.
- `index.html` — single page, hash routing
- `css/` — styles (custom design system, dark default + light)
- `js/` — ES modules loaded as classic scripts in dependency order (file:// safe):
  `store.js` (localStorage state), `srs.js` (spaced repetition), `engine.js` (quiz/mock logic),
  `gamify.js` (XP/streaks/badges/readiness), `lessons.js` (animated lesson player),
  `views/*.js` (dashboard, practice, mock, revise, lessons, stats), `app.js` (router)
- `data/` — question bank as `.js` files pushing into `window.BANK` (not fetched JSON — CORS-free on file://):
  `bank-reasoning.js` (400), `bank-ga.js` (400), `bank-quant.js` (300), `bank-english.js` (300),
  `bank-math.js` (300), `bank-computer.js` (300). Total 2000.
  `lessons-data.js`, `taxonomy.js` (from graphify graph).

## Question schema
`{id:"R001", sec:"A", topic:"analogies", diff:1|2|3, q, opts:[4], ans:0-3, exp, tags:[]}`
IDs prefixed R/G/Q/E/M/C per section. Every question has explanation. Style matched to real
2022 JKSSB SI paper (concise stems, plausible distractors, J&K-heavy GA).

## Features
1. **Dashboard**: readiness meter (predicted score = Σ per-section recent accuracy × marks, minus
   negative-marking expectation), due-revision count, streak, daily quota progress (~130 Q/day), section cards.
2. **Practice**: topic or section quizzes, instant feedback + explanation, weak-topic weighted shuffle.
3. **Mock exam**: composes 100Q by real section weights from unseen-preferring pool, 120-min countdown,
   OMR palette (answered/marked/skipped), auto-submit, section-wise analysis + accuracy vs target,
   review every question.
4. **Revision (SRS)**: wrong answers queue at intervals 1/3/7/16 days (SM-2 lite, ease adjusts);
   due deck on dashboard.
5. **Lessons**: animated explainers (CSS/SVG step-through) for high-yield tricks per section.
6. **Gamification**: XP (+10 correct, +2 attempt, streak multiplier), levels, badges, daily streak.
7. **Planner**: 8-week plan, phase 1 learn (wk1-3), phase 2 drill (wk4-6), phase 3 mock+revise (wk7-8).

## Testing/verification
Data integrity script (node or python): unique ids, ans∈0..3, 4 options, counts per section.
Browser walkthrough of all flows; console clean; state survives reload.

## Risks
AI-generated question errors → "report question" flag stored, excluded from stats; user reviews list.
Current affairs cutoff mid-2026 → clearly labeled module; user tops up final weeks.
