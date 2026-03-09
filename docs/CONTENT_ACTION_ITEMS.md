# Content Action Items

All placeholder content has been stripped. Below is every `[INSERT: ...]` marker that needs real content, organized by file.

---

## Works (6 files)

### `works/curated-memory.md` — "Curated Memory and Prompt Augmentation" (Sep 2025)
- `cover:` — `[INSERT: cover image URL]`
- `excerpt:` — `[INSERT: 1-2 sentence description of the article about context engineering and human-AI understanding]`
- Body — `[INSERT: Full article content about curated memory and prompt augmentation...]`

### `works/lifely.md` — "Lifely" (Dec 2025)
- `cover:` — `[INSERT: cover image URL or screenshot of the 2025 Wrapped app]`
- `excerpt:` — `[INSERT: 1-2 sentence description of Lifely, the 2025 Wrapped react app...]`
- Body — `[INSERT: Full project description for Lifely...]`

### `works/gingerbread-man.md` — "Gingerbread Man" (Dec 2025)
- `cover:` — `[INSERT: cover image URL]`
- `excerpt:` — `[INSERT: 1-2 sentence description of the Gingerbread Man generative art piece]`
- Body — `[INSERT: Full writeup and content for the Gingerbread Man piece...]`

### `works/building-the-halo.md` — "Building the Halo" (Dec 2025)
- `cover:` — `[INSERT: cover image URL]`
- `excerpt:` — `[INSERT: 1-2 sentence description about the creative process from Framer to implementation]`
- Body — `[INSERT: Full writeup for Building the Halo...]`

### `works/cigarette-ash.md` — "Cigarette Ash on Sora" (Dec 2025)
- `cover:` — `[INSERT: video poster/thumbnail image URL]`
- `excerpt:` — `[INSERT: 1-2 sentence description of the AI-generated video piece made with Sora]`
- Body — `[INSERT: Description or context for Cigarette Ash on Sora...]`

### `works/neon-rain.md` — "Neon Rain" (Feb 2026, WIP)
- `cover:` — `[INSERT: cover image URL or WIP screenshot]`
- `excerpt:` — `[INSERT: 1-2 sentence description of the Neon Rain concept...]`
- Body — `[INSERT: Content for Neon Rain...]`
- Note: This file has `draft: true` so it won't appear in production builds.

**Total work action items: 18**

---

## Vignettes (0 changes needed)

### `vignettes/latent-space.md` — KEPT AS-IS
- Content is real. Only change: updated `memberOf` from `[ai-futures, experiments]` to `[scaffolding-efficient-systems, artificial-creativity]`.
- No action items.

---

## Collections (2 files)

### `collections/scaffolding-efficient-systems.md`
- `description:` — `[INSERT: Short description for index card, <200 chars...]`
- `longDescription:` — `[INSERT: Longer description for detail page header...]`
- `curatorNote:` — `[INSERT: Personal curator's note about why these works belong together...]`
- `mosaic:` (4 items) — `[INSERT: thumbnail 1-4 URL]`

### `collections/artificial-creativity.md`
- `description:` — `[INSERT: Short description for index card, <200 chars...]`
- `longDescription:` — `[INSERT: Longer description for detail page header...]`
- `curatorNote:` — `[INSERT: Personal curator's note about what draws you to machines and creative expression...]`
- `mosaic:` (4 items) — `[INSERT: thumbnail 1-4 URL]`

**Total collection action items: 14**

---

## Layouts & Pages (4 files)

### `_includes/layouts/about.njk`
- Practice statement `<h1>` — `[INSERT: Your practice statement / manifesto...]`
- Bio paragraph 1 — `[INSERT: Your bio — who you are, where you're based, your background and disciplines]`
- Bio paragraph 2 — `[INSERT: Second paragraph about your practice — what the studio name means...]`
- Colophon philosophy — `[INSERT: Your personal philosophy about this site...]`
- Note: The technical colophon (Eleventy, fonts, hosting) is accurate and was kept.

### `_includes/layouts/collection-index.njk`
- Page intro `<p>` — `[INSERT: Your intro text about what collections mean to you...]`
- Curatorial note paragraph 1 — `[INSERT: Your curatorial note about how you organize collections...]`
- Curatorial note paragraph 2 — `[INSERT: Second paragraph expanding on your curatorial philosophy]`
- Curatorial signature — `[INSERT: Your signature, e.g. "— Name, Third Plane Studios"]`

### `writings/index.njk`
- Page intro `<p>` — `[INSERT: Your intro text for the Thoughts page...]`

### `_data/site.json`
- `email` — `[INSERT: your email address]`
- `social.github` — `[INSERT: your GitHub profile URL]`
- `social.twitter` — `[INSERT: your Twitter/X profile URL]`

**Total layout/page action items: 12**

---

## Summary

| Category | Files | Action Items |
|----------|-------|-------------|
| Works | 6 | 18 |
| Vignettes | 0 | 0 |
| Collections | 2 | 14 |
| Layouts & Pages | 4 | 12 |
| **Total** | **12** | **44** |

---

## What Was Deleted

### Placeholder works (10 files removed)
- `works/lumina.md` — "Lumina" (fake brand identity)
- `works/synthesis.md` — "Synthesis" (fake generative art)
- `works/void-protocol.md` — "Void Protocol" (fake installation)
- `works/neural-drift.md` — "Neural Drift" (fake AI experiment)
- `works/chromatic-pulse.md` — "Chromatic Pulse" (fake motion design)
- `works/echo-chamber.md` — "Echo Chamber" (fake sound design)
- `works/phantom-grid.md` — "Phantom Grid" (fake data viz)
- `works/signal-decay.md` — "Signal Decay" (fake generative art)
- `works/liminal-space.md` — "Liminal Space" (fake web experience)
- `works/data-mirage.md` — "Data Mirage" (fake creative coding)

### Placeholder writings (2 files removed)
- `writings/designing-in-the-void.md` — "Designing in the Void"
- `writings/latent-space-explorations.md` — "Latent Space as Medium"

### Placeholder vignettes (3 files removed)
- `vignettes/emergence.md` — "Emergence"
- `vignettes/dissolution.md` — "Dissolution"
- `vignettes/threshold.md` — "Threshold"

### Placeholder collections (4 files removed, replaced with 2)
- `collections/ai-futures.md` — "AI Futures"
- `collections/void-studies.md` — "Void Studies"
- `collections/systems.md` — "Systems"
- `collections/experiments.md` — "Experiments"

---

## Collection Membership Reference

| Work | Scaffolding Efficient Systems | Artificial Creativity |
|------|:---:|:---:|
| Curated Memory and Prompt Augmentation | X | |
| Lifely | X | |
| Building the Halo | X | |
| Latent Space (vignette) | X | X |
| Gingerbread Man | | X |
| Cigarette Ash on Sora | | X |
| Neon Rain (WIP) | | X |

---

## Build Status

Site builds successfully with `npx @11ty/eleventy` — 29 files written, no errors.
