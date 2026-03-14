---
title: "Intent Configuration Interface"
subtitle: "An exploration into alternative input forms beyond natural language"
date: 2026-03-02
type: "Software"
year: 2026
cover: "https://res.cloudinary.com/dxghuzxip/image/upload/v1773526314/Screenshot_2026-03-14_at_6.09.11_PM_jijaiy.png"
featured: true
draft: false
model: "inference: gpt-5-mini"
github: "https://github.com/jasminepoon/figma_make"
badgeType: "interface"
memberOf:
  - artificial-creativity
  - selected-work
excerpt: "An exploration into configurable dialogue beyond natural language prompting."
---
## Why wait for AI to show you it's not understanding you correctly, when you can just visualize the prompt as artifacts? Let's also make that configurable.

![The Taste Score: An Intent Configuration Interface](https://res.cloudinary.com/dxghuzxip/image/upload/v1773526314/Screenshot_2026-03-14_at_6.09.11_PM_jijaiy.png)

## The Thesis

> When someone uses AI to create something, their preferences should be readable. It's the equivalent of visualizing the response, "am I understanding this correctly?". 

The chain:

1. User enters language preferences
2. AI extracts them as an inspectable score
3. Human edits the score directly — without re-prompting
4. Generation runs from known, tunable parameters

Language in. Scored intermediate. Adjusted output. No black box.

## Why I made this

When you prompt an AI with language — "formal and warm," "minimal but expressive" — the AI interprets it. Invisibly. You can't inspect that
interpretation, tune it, or carry it to the next generation.

## The Problem

Prompting to generate UI is a game of telephone that wastes time and energy with back and forth refinement using natural language. 
Natural language is imprecise, and the model's translation of it is opaque. You can re-prompt, but you're still guessing at what the model heard. There's no quick representation of your preferences that you own, can inspect, or can incrementally refine within the first iteration. 

This is the natural extension to [Generative Remix](/works/generative-remix/): that work addressed generative toggles that augments an existing artifact. We pointed the AI at something tasteful, and extracted parameters on-the-fly. 
The key difference: This work addresses the moment before the artifact exists. Let's shape the magnitude of the input. In a vector space, we can configure the scalars. 

---

## The Prototype
Note: Generated with `gpt-5-nano` so results are not that performant, but it's a proof of concept. Further iterations with `gpt-5-mini` yielded better results - the easiest eval I ran was on the trait, "bold", where tuning up or down the `bold` slider yielded the expected change in magnitude of bold-related style changes. 
<video controls playsinline preload="metadata" poster="https://res.cloudinary.com/dxghuzxip/video/upload/so_0,f_jpg/v1773104915/style-shape_onvskk.jpg" style="width: 100%; border-radius: 8px; margin: 2em 0;">
  <source src="https://res.cloudinary.com/dxghuzxip/video/upload/v1773104915/style-shape_onvskk.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

Taste Score introduces an intermediate artifact between language and generation: a **readable trait score**.

You enter natural language preferences. Claude extracts them into a five-axis radar — discrete, labeled traits with values between 0 and 1. Each axis has a source phrase, an archetype, and a range of interpretations. The radar isn't decorative — it's the canonical state. Drag a point and the CSS variables update in real time. Add a fifth freeform trait and watch it choreograph into the score.

An extension of the thesis itself, for "taste and preference" to be legible, we output a portable markdown file: `soul.md`. Six sections. Profile, prompt, trait map, per-trait style ranges, final CSS composition, resolver trace. Machine-readable, human-legible, reusable. Inspired by OpenClaw (f.k.a clawdbot) where your agent has a "soul". 

## Three Things This Breaks

1. **The interpretation is no longer invisible.** The radar is what Claude heard. You can disagree with it and provide corrective refinement with the toggles.

2. **The control surface is generative.** The radar axes weren't designed — they were extracted from your language. Different prompts produce different trait structures.

3. **Preference becomes portable.** `soul.md` is a spec, not a screenshot. Another model can read it. Another session can load it. Taste has a format.

---
## Design Notes
Conflict resolution is typed: shared CSS variables use strategy-specific blending — numeric blend, color blend, discrete vote with stability guard.

When two traits compete for the same CSS property, the system resolves by type. Numbers blend proportionally — the stronger scalar pulls harder. Colors mix channel by channel. Categorical choices like font family or easing go to whichever trait has the strongest opinion; if it's a near-tie, the current value holds to prevent flickering. Conflicts resolve invisibly. The radar stays the only thing you touch.

Say "minimal" and "bold" both affect padding. Minimal pulls toward 12px, bold toward 32px — the result lands between them, weighted by how far each slider is turned up. If they both want to set the heading font, whichever scalar is further from center owns it, and holds until the other clearly overtakes it.

## Technical Details
Four scenes: profile setup → prompt entry with live sentence preview → extraction choreography (per-trait: highlight source phrase → axis
appears → code stream → interpretation) → draggable radar with live CSS → export.

The radar is the only mutation surface. No redundant sliders, no chip rails. One source of truth.

**Stack:** Vanilla JS + CSS, Node/Express, Claude Sonnet via structured tool use, Zod validation, OpenAI-compatible API proxy.

## Future Exploration / What's Next?
I plan to investigate this question - can human input inform the development of an agent's automatic "skill" refinement? See Anthropic Claude's skill creation blog: https://claude.com/blog/improving-skill-creator-test-measure-and-refine-agent-skills. Stay tuned.