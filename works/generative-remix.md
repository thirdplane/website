---
title: "Generative Remix"
subtitle: "A workbench that parameterizes components on the fly"
date: 2026-02-21
type: "Software"
year: 2026
cover: "https://res.cloudinary.com/dxghuzxip/image/upload/v1773099027/Screenshot_2026-03-09_at_7.29.58_PM_ahz4pm.png"
excerpt: "A workbench where AI generates the UI itself — you curate taste, Claude builds the knobs."
featured: true
draft: false
badgeType: "interface"
memberOf:
  - artificial-creativity
  - selected-work
---

You can't prompt taste, but you can curate it.

Rather than asking users to articulate what they want in words, Generative Remix lets them point at something tasteful and remix it — with AI generating the interface itself, not just the output.

![The Workbench](https://res.cloudinary.com/dxghuzxip/image/upload/v1773099027/Screenshot_2026-03-09_at_7.29.58_PM_ahz4pm.png)

## The Prototype

The working prototype is a live remix workbench built around a WebGL shader (a "Nova Halo" component, originally extracted from Framer AI's halo-glow component).

Two LLM agents negotiate behind the scenes:

- **Alice** analyzes the shader's documentation and extracts a taste-to-math mapping — translating 12 shader uniforms into perceptual categories like "Edge Turbulence" and "Color Warmth."
- **Bob** generates a complete UI control schema via structured tool use, deciding what controls to expose, how to group them, and what to call them.

The controls you see on screen weren't designed by us. Claude decided what knobs a non-technical person would need to explore this artifact.

## Three Conventions Shattered

1. **The UI is generative.** Different artifacts produce entirely different control panels. The sliders, color pickers, and groupings are Claude's output, not a static form.

2. **Direct manipulation and natural language coexist.** Drag a slider at 60fps for precise control, or type "make it feel like deep space, cold and lonely" and watch Claude interpret that into coordinated parameter shifts across hue, palette, and noise.

3. **The A2A trace panel makes AI collaboration visible.** Alice & Bob are two agents that communicate. As a proof of concept, expand it to see Alice's extraction reasoning and Bob's parameterization decisions, with syntax-highlighted JSON and timing badges.

---

## Context

- We don't know what AI doesn't know
- Free-form and even scoped generation has zero taste
- We source taste from human choices, requirements, and references
- A lot of design and UI is not structurable into concrete requirements
- How do we quantify and describe good design? Design briefs, stylesheets?

![Limit Fundamentals](https://res.cloudinary.com/dxghuzxip/image/upload/v1773100685/image-3_ruhfyb.png)

We are approaching the limit of prompt-guided generation (even with markdown files). Ask an AI how it built something, it can instruct another AI how to build it, and then augment with human-tunable toggles. Et voila: custom UI.

## The Thesis

> Prompting fails because it requires you to articulate taste. Most people can recognize taste but can't articulate it. Curation bypasses articulation — you point at an existing thing. AI's job is to extract the math from what you pointed at and expose it as parameters you can tune.

The chain becomes:

1. Curator points at tasteful artifact
2. AI deconstructs into parameters
3. Human tunes without needing vocabulary
4. Professional-quality output

![Problem](https://res.cloudinary.com/dxghuzxip/image/upload/v1773100684/image-4_sor25f.png)

---

## Conceptual Model

### Diagram 1: "Remixing" — The System

![System Design](https://res.cloudinary.com/dxghuzxip/image/upload/f_auto,q_auto/v1773100684/IMG_6883.HEIC_h2smld)

**Input layer:** You curate a Reference — a thing you like (e.g., a component from some cumbersome tool like Figma or Framer). It could be a WebGL shader, art, or some other obscure artifact.

**Two agents:**

- **Alice** — Extraction agent. The resident AI of the source tool. She understands the internals of the reference. (Framer AI in the halo case.)
- **Bob** — Implementation Claude. He takes what Alice extracted, parameterizes it, and provides "remix" levers via natural language.

**Result:** Bob Ross — "happy little accidents." The user doesn't need to be a painter. They just need to choose colors and nudge. The system enables expressive play without requiring expertise.

### Diagram 2: The Workflow

![Workflow Overview](https://res.cloudinary.com/dxghuzxip/image/upload/f_auto,q_auto/v1773100684/IMG_6884.HEIC_uia8jp)

**Curation** — Human picks the reference.

**A2A Communication** — Bob (Claude) says "detailed implementation? in WebGL" and asks Alice (extraction agent) for full requirements. Alice provides physics parameters, written to an MD file. This is agent-to-agent: Bob can't read Framer, Alice can. They negotiate the spec between themselves.

**Customization** — Bob builds, human inspects, requests "make it red/blue," Bob refers to the MD guide and produces artifact. The human's input is simple natural language preferences, not technical specs.

---

## Technical Details

Stability comes from layered fallbacks:

- **Zod** validates every Claude tool output at runtime
- A **hardcoded fallback schema** loads instantly if the API fails
- **localStorage** caches successful extractions for instant reload
- **Offline mode** bundles pre-recorded agent responses

The WebGL renderer writes uniforms directly via ref (bypassing React state entirely) for locked 60fps performance even while Claude streams responses.

### Stack

React 18 + TypeScript, Vite, Vercel Edge Functions (Claude API proxy with native streaming), @anthropic-ai/sdk, WebGL1 (raw, no Three.js), Zod (runtime validation), react-colorful, lucide-react.

Claude powers both agents via structured tool use with `generate_control_schema` and `update_parameters` tools.
