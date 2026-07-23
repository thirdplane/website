# Visual Variations Spec — Third Plane Studios

Spec for building three standalone mockup variations of the site's visual direction.
Written for execution by a coding agent. Read `CLAUDE.md` first.

## Ground rules

- **Do NOT modify production files** (`index.html`, `_includes/**`, `_data/**`, `collections/**`). All output goes to `mockups/`.
- Each variation is a **single self-contained HTML file** (inline CSS + JS, Google Fonts / Fontshare via `<link>`). No build step; must open via `file://` or any static server.
- Each mockup contains **two sections on one page**: (1) a homepage hero, (2) a collection page excerpt — collection header + curator's note + a grid of 3 work cards. Use real content: pull collection titles, curator's note copy, and work titles from `collections/artificial-creativity.md` and related work frontmatter in `works/`. Placeholder images are fine (solid-color divs or `assets/` images if suitable ones exist).
- Reuse the spacing scale, semantic token names, and spring easing variables from `_includes/styles/tokens.css` so variations stay comparable. Copy needed tokens into each file; override per variation as specified.
- Respect `prefers-reduced-motion` in all three.
- Output files:
  - `mockups/variation-a-neon-noir-refined.html`
  - `mockups/variation-b-editorial.html`
  - `mockups/variation-c-generative.html`

---

## Variation A — Neon Noir, Refined

**Thesis:** Keep the existing identity but reduce genericness through restraint and sharper typography. This is the control+polish option.

- **Palette:** Existing tokens unchanged (`--ink-950` bg, `--uv-*`, `--ice-400`, etc.). BUT cut ambient decoration: reduce `--gradient-soul` to at most 2 radial layers at ~half current opacity. Glows (`--glow-*`) appear ONLY on hover/focus, never at rest.
- **Typography:** Display = Clash Display (Fontshare) or General Sans, weights 500/600, tracking −0.03em. Body = Inter (keep). Mono = JetBrains Mono (keep). Hero headline set very large (clamp 3.5rem–7rem), tight leading (1.0–1.05).
- **Hero:** Near-black field, headline + tagline, single thin `--ice-400` accent rule. One accent color per view — hero uses ice only, collection section uses that collection's accent only (per-collection accent system from CLAUDE.md).
- **Cards:** Existing work-card pattern (type badge with colored dot, hover scale) but flatter: 1px border, no resting shadow; on hover, border brightens to `--border-hover` + accent glow + `--spring-hover` lift of 2–4px.
- **Motion:** Use existing `--spring-hero` for entrance, `--spring-stagger` for card reveals (80ms stagger), `--spring-hover` for hovers. Nothing else moves.

## Variation B — Restrained Editorial

**Thesis:** The work is the color; the site is the gallery. Editorial serif voice, near-monochrome, generous whitespace. Neon survives only as thin accents.

- **Palette:** Keep dark scheme but desaturate: bg `--ink-950`, text `--text-100`/`--text-400`. No gradient background, no glows. One accent per view at low frequency — hairline rules, link underlines, the accent dot. Collection accents (gold/purple/cyan) still apply but only in those small roles.
- **Typography:** Display + curator's notes = Fraunces (Google Fonts, variable; use optical size axis, wonk on for display sizes ≥ 2.5rem, off for notes). Body = Inter or Newsreader at 1.05–1.15rem with relaxed leading (1.6). Mono = keep for metadata/badges only.
- **Hero:** Mostly type. Oversized Fraunces headline (clamp 3rem–6.5rem), tagline in italic Newsreader/Fraunces italic, abundant top margin. Optional: one small (~240px) latent-traversal video thumbnail placed asymmetrically, captioned in mono — an artwork in a frame, not a backdrop.
- **Curator's note:** Drop glass-morphism. Left border rule in collection accent, serif italic body, larger than surrounding text. Reads as a wall label / editorial pull-quote.
- **Cards:** Borderless. Image, then title (Fraunces, medium), then a mono metadata line (`type · year`). Hover: image brightens slightly + title underlines in accent. No lift, no glow.
- **Motion:** Fades and small translates only, `--spring-smooth`-style curves (bounce 0). Calm throughout.

## Variation C — Generative-Art-Forward

**Thesis:** The site itself demonstrates "the curation of latent space." Generative visuals are the primary design material; typography embraces degradation.

- **Palette:** Existing Neon Noir tokens, full saturation permitted. The generative layer carries the color; UI chrome stays dark and quiet so the two don't compete.
- **Typography:** Display = Redaction (free; self-host or link). Nav/wordmark in Redaction (clean cut). Hero headline in a degraded cut (Redaction 35 or 50). Section headings clean; expressive moments (collection title, 404-style pages) degraded. Body = Inter. Mono = Fragment Mono or Martian Mono.
- **Hero — latent-space traversal:** Full-bleed canvas behind headline + `--scrim` overlay for legibility.
  - For the mockup, implement the **shader evocation** tier: a WebGL2 fragment shader of slowly evolving fbm/noise fields with feature-map-like banding, colored from `--uv-600` → `--ice-400` → `--strobe-500` stops. Drift slowly on its own; cursor X/Y subtly biases the traversal direction. Cap at 30fps, pause when tab hidden, static gradient fallback for `prefers-reduced-motion` and no-WebGL.
  - Add an HTML comment noting the production plan: replace/augment with a pre-rendered real latent-walk video loop served from Cloudinary (cloud: `dxghuzxip`).
- **Collection mosaics / card thumbnails:** Generative placeholders — small canvases seeded from a hash of the work's title, rendered in the collection's accent hue. Same seed ⇒ same image (deterministic).
- **Cards:** Existing card structure; hover triggers a brief (~300ms) "re-seed" glitch on the generative thumbnail — it re-traverses to a nearby seed, using `--spring-snap`.
- **Motion:** Most animated of the three, but motion belongs to the generative layer; UI transitions stay standard springs.

---

## Deliverable & evaluation

Build all three files, then open each and screenshot for comparison. Judge by: (1) does Jasmine's actual work read better or worse than in the current site, (2) distinctiveness at a glance, (3) legibility of the curator's-note voice. Note per variation: est. implementation cost to roll out site-wide, and any perf risk (fonts, WebGL).
