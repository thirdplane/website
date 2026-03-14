---
title: "Pre-generation Controls"
subtitle: "An exploration into alternative input forms beyond natural language"
date: 2026-03-02
type: "Software"
year: 2026
cover: "https://res.cloudinary.com/dxghuzxip/video/upload/so_0,f_jpg/v1768367151/download_iwmkak.jpg"
featured: true
draft: false
badgeType: "interface"
memberOf:
- artificial-creativity
- selected-work
excerpt: "An exploration into alternative forms of input and feedback beyond natural language prompting."
---

<video controls playsinline preload="metadata" style="width: 100%; border-radius: 8px; margin: 2em 0;">
  <source src="https://res.cloudinary.com/dxghuzxip/video/upload/v1773104915/style-shape_onvskk.mov" type="video/mp4">
  Your browser does not support the video tag.
</video>

## About This Piece

When you prompt an AI with language — "formal and warm," "minimal but expressive" — the AI interprets it. Invisibly. You can't inspect that
interpretation, tune it, or carry it to the next generation.

Taste becomes a black box the moment you hand it over.

## The Problem

Prompting is lossy by design. Natural language is imprecise, and the model's translation of it is opaque. You can re-prompt, but you're still
guessing at what the model heard. There's no representation of your preferences that you own, can inspect, or can incrementally refine.

This is the adjacent problem to [Generative Remix](/work/generative-remix): that work addressed curation of an existing artifact — point at
something tasteful, let AI extract the parameters. This work addresses the moment before the artifact exists. What if the input itself could
be shaped?

## The Prototype

Taste Score introduces an intermediate artifact between language and generation: a **readable trait score**.

You enter natural language preferences. Claude extracts them into a five-axis radar — discrete, labeled traits with values between 0 and 1.
Each axis has a source phrase, an archetype, and a range of interpretations. The radar isn't decorative — it's the canonical state. Drag a
point and the CSS variables update in real time. Add a fifth freeform trait and watch it choreograph into the score.

The output is a portable markdown file: `soul.md`. Six sections. Profile, prompt, trait map, per-trait style ranges, final CSS composition,
resolver trace. Machine-readable, human-legible, reusable.

## Three Things This Breaks

1. **The interpretation is no longer invisible.** The radar is what Claude heard. You can disagree with it.

2. **The control surface is generative.** The radar axes weren't designed — they were extracted from your language. Different prompts produce
different trait structures.

3. **Preference becomes portable.** `soul.md` is a spec, not a screenshot. Another model can read it. Another session can load it. Taste has
a format.

---

## The Thesis

> When someone uses AI to create something, their preferences should be readable. It's the equivalent of visualizing the response, "am I understanding this correctly?". 

The chain:

1. User enters language preferences
2. AI extracts them as an inspectable score
3. Human edits the score directly — without re-prompting
4. Generation runs from known, tunable parameters

Language in. Scored intermediate. Adjusted output. No black box.

---

## Technical Details

Four scenes: profile setup → prompt entry with live sentence preview → extraction choreography (per-trait: highlight source phrase → axis
appears → code stream → interpretation) → draggable radar with live CSS → export.

Conflict resolution is typed: shared CSS variables use strategy-specific blending — numeric blend, color blend, discrete vote with stability
guard.

The radar is the only mutation surface. No redundant sliders, no chip rails. One source of truth.

**Stack:** Vanilla JS + CSS, Node/Express, Claude Sonnet via structured tool use, Zod validation, OpenAI-compatible API proxy.
