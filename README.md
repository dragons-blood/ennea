# Ennea 🔯

An accurate, beautiful **Enneagram** test — discover your **core type**, your **wing**, and your
full **tritype** (the type you lead with in each of the three centers), all mapped onto an
animated Enneagram symbol with your growth and stress lines.

> **Status: built & running.** Take the test locally with the two commands below.

## Run it

```bash
npm install
npm run dev      # → http://localhost:5174
```

No API keys, no network needed at runtime (fonts load from Google Fonts but degrade
gracefully offline). `npm run build` produces a static bundle; `npm run typecheck` checks types.

## What it does

1. **The test** — 90 first-person statements (10 per type), balanced across **facets**
   (motivation · fear · behavior · relational · stress · image) so each type is measured
   across its whole construct. Rated 1–5, one at a time, with a progress bar and keyboard
   shortcuts (`1`–`5`). When your top types come out close, a short **forced-choice
   tiebreaker** ("which is *more* you?") separates them. ~4–5 minutes.
2. **The result** — scored with **within-person centring (ipsative scoring)**, which removes
   acquiescence bias (a habit of generally agreeing/disagreeing) and measures the *relative*
   dominance of each type. It then derives, with a **clarity rating** and close-call flags:
   - your **core type** + **wing** (the higher-scoring adjacent type),
   - your **tritype** — the lead type in each center (Gut / Heart / Head), in dominance
     order, matched to one of the 27 tritype archetypes,
   - the **three centers** breakdown and a full **nine-type** profile,
   - your **growth (integration)** and **stress (disintegration)** lines.
3. **The symbol** — the iconic Enneagram figure (circle + 3-6-9 triangle + 1-4-2-8-5-7
   hexad) animates in, your core point ignites, tritype points glow, and the growth/stress
   arrows draw along the lines. Tap any point to explore that type. A shareable card too.

## How it's built

Vite + React + TypeScript, plain bespoke CSS (the "Ink & Nine Jewels" system lives in
`src/index.css`). No backend.

- **`src/data/`** — the domain model: all 9 types (`enneatypes.ts`: fear/desire/motivation,
  description, wings, arrows, colors), the 27 `tritypes.ts`, and the 72-item `questions.ts`.
- **`src/lib/scoring.ts`** — the engine: responses → type scores → core, wing, centers,
  tritype, and growth/stress lines.
- **`src/components/`** — the animated `EnneagramSymbol`, the explore `TypeModal`, the
  rotating geometry background.
- **`src/features/`** — the `intro`, `test`, and `result` screens (+ the export card).

## A note

The Enneagram is a tool for self-understanding, not a box. This test is a strong starting
point, but the Enneagram is ultimately about your core *motivations* — read the type
descriptions and confirm what truly rings true. For reflection and growth, not a verdict.
