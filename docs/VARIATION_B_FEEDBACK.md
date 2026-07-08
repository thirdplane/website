# Variation B feedback — revision pass

Direction chosen: **B (Restrained Editorial)**. Verdict on v1: right skeleton, muddied execution.
The thesis is "the work is the color; the site is the gallery" — v1 has too many competing voices.
Revise `mockups/variation-b-editorial.html` in place per the notes below. Each is actionable and independent.

## 1. Cut Newsreader — one serif only
Fraunces (display) + Newsreader (tagline, curator's note) are two italic serifs doing the same job; at these sizes they read as "almost the same font," which is exactly what muddiness feels like. Delete Newsreader from the font link and tokens. Use Fraunces italic (lower opsz, ~14–30) for the tagline and curator's note. Final stack: Fraunces / Inter / JetBrains Mono — three families, three jobs.

## 2. Wonk is a moment, not a default
`WONK 1` is on both the hero h1 and the collection h2, so the quirk becomes wallpaper. Keep wonk ON only for the hero h1. Collection h2 gets `WONK 0` and a step down in presence (e.g., 2rem–2.8rem clamp, or weight 300) so the hero remains the page's single typographic event. Right now h1 and h2 are near-identical treatments at different sizes — that flattens hierarchy.

## 3. Fix the hero frame — it's Neon Noir contraband
The `.frame` purple/cyan radial gradient reintroduces the exact ambient-neon look this variation exists to reject. Replace with either: (a) a real still (Cloudinary asset, e.g. the Embers frame) in grayscale (`filter: grayscale(1) contrast(1.05)`) that gains color on hover, or (b) a flat `--ink-850` block with a thin 1px border and the mono caption. The caption conceit (`fig. 01 — latent traversal, still`) is good — keep it.

## 4. Consolidate mono usage
Mono currently appears in 6 roles (kicker, frame caption, collection-meta, curator's label, work-meta, badge-note) at 4 different size/tracking combos. Define ONE `.meta` utility class (single size ~0.72rem, single letter-spacing, `--text-600`) and use it everywhere mono appears. Drop uppercase from the frame caption and work-meta — uppercase mono everywhere reads as decoration, not information.

## 5. Curator's note: don't shrink mid-quote
`p + p` drops from 1.4rem to 1.15rem, so the note visually deflates halfway through. Pick one: (a) whole note at one size (1.25rem), or (b) first sentence as the serif pull-quote at 1.4rem and the remainder in Inter at body size + `--text-400` — a true wall-label structure. Option (b) preferred.

## 6. Let the work keep its shape
`aspect-ratio: 3/4` portrait-crops UI screenshots (Generative Remix, Intent Configuration Interface), destroying their legibility — the opposite of "the site is the gallery." Use the work's native ratio: 16/10 for the software screenshots, keep 3/4 only if a work is actually portrait. Uneven card heights are fine — editorial grids tolerate them; add `align-items: start` to the grid.

## 7. Small technical cleanups
- `line-height: 1.0` on 6.5rem Fraunces with wonk risks clipped ascenders/descenders — use 1.05 and check "p." in "space."
- Remove `font-variation-settings: "opsz" 32` from `body` — Inter is loaded without an opsz axis; the inherited setting is dead weight and can interfere with per-element Fraunces settings.
- Card hover: brightness lift + accent underline is right; also remove the resting `saturate(0.95)` desaturation on thumbs — the work should be at full color at rest (the CHROME is monochrome, not the art).

## Acceptance check
After revisions, squint test: the page should read as (1) one big serif moment (hero), (2) quiet gray chrome, (3) full-color work images, (4) accent appearing only as dot + note border + hover underline. If anything else has color or typographic personality, cut it.
