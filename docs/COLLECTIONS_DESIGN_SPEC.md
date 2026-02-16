# Collections Design Specification

**Option D: Thematic Collections**
Third Plane Studios - January 2025

This document captures the complete design system for the thematic collections approach to organizing portfolio work. This is the **chosen direction** for the works/portfolio section of the site.

---

## Canonical Design References

The following mockup files are the **source of truth** for the visual design. They are complete, self-contained HTML pages with all CSS inline -- open them directly in a browser to see the exact intended design.

| File | Description |
|------|-------------|
| `mockups/option-d-collections-index.html` | Collections index page -- 2x2 mosaic cards, curatorial section, 4 collection cards with accent colors |
| `mockups/option-d-collection-detail.html` | Collection detail page (AI Futures) -- header with curator's note, 6 mixed-type work cards, prev/next navigation |

These mockups contain the exact CSS values, spring animations, color tokens, and component structures that the production implementation should match.

---

## Table of Contents

0. [Canonical Design References](#canonical-design-references)
1. [Design Philosophy](#1-design-philosophy)
2. [Information Architecture](#2-information-architecture)
3. [Color System](#3-color-system)
4. [Typography](#4-typography)
5. [Component Specifications](#5-component-specifications)
6. [Animation System](#6-animation-system)
7. [Responsive Behavior](#7-responsive-behavior)
8. [Accessibility](#8-accessibility)
9. [Complete CSS Reference](#9-complete-css-reference)
10. [Implementation Guide](#10-implementation-guide)

---

## 1. Design Philosophy

### 1.1 Why Thematic Collections Over Type-Based Organization

Traditional portfolio organization groups work by format: "Essays," "Projects," "Experiments." This approach has significant drawbacks:

1. **It fragments related thinking.** An essay about AI and an AI interface prototype explore the same inquiry but would live in separate silos.

2. **It privileges form over substance.** Visitors must care about *what* something is before discovering *what it's about*.

3. **It's static.** Format categories don't evolve; thematic collections can grow, merge, and transform.

4. **It's impersonal.** Categories like "Projects" reveal nothing about the creator's perspective or curatorial voice.

**Thematic collections solve these problems:**

- Work is grouped by *inquiry*, not format
- A single collection can contain essays, interfaces, generative work, and research
- Collections reveal the artist's intellectual preoccupations
- The structure itself becomes a form of self-expression

### 1.2 The "Artist as Curator" Philosophy

This design treats the portfolio not as a catalog but as an **exhibition**. Key principles:

1. **Curatorial Voice**: Each collection includes a "Curator's Note" - a personal statement about why these works belong together and what unites them.

2. **Living Arrangements**: Collections are explicitly described as "living" - they grow, shift, and reorganize as understanding deepens.

3. **Multiplicity**: A single work can belong to multiple collections. An essay about AI might also be a meditation on void.

4. **Narrative Over Taxonomy**: The index page doesn't just list collections; it introduces them with evocative descriptions that invite exploration.

### 1.3 The Curatorial Tone

The voice throughout is:
- **Intellectual but accessible**: Uses phrases like "sustained inquiry" and "semantic topology" but explains them through context
- **Personal without being precious**: First-person perspective ("questions I keep returning to") without navel-gazing
- **Invitational**: "Explore collection" rather than "View all"
- **Philosophical**: Acknowledges that boundaries between categories "have always felt artificial"

**Example copy from index page:**
> "Thematic groupings that trace threads across different mediums and moments. Each collection represents a *sustained inquiry* - a question I keep returning to."

**Example curator's note:**
> "This collection began as skepticism and evolved into fascination. The works here don't celebrate AI uncritically - they interrogate it, play with it, and sometimes *resist* it. What unites them is a refusal to accept easy narratives about what machines can and cannot do."

### 1.4 Why 2x2 Mosaic Thumbnails

The collection cards use a 2x2 mosaic of images rather than a single hero image:

1. **Visual Density**: Communicates that collections contain multitudes
2. **Texture Preview**: Shows the variety of visual styles within
3. **Hover Interest**: Each tile can animate independently, creating depth
4. **Format Agnosticism**: Avoids privileging one work as the "hero" of the collection
5. **Memory Trigger**: Multiple images are easier to remember than one

Technical specs:
- Aspect ratio: `16 / 10`
- Grid: `2 x 2` with `2px` gap
- Images cropped with `object-fit: cover`
- On hover: all images scale to `1.08` simultaneously

---

## 2. Information Architecture

### 2.1 Page Structure

```
/ (Home)
|-- /collections (Index)
|   |-- /collections/ai-futures (Detail)
|   |-- /collections/void-studies (Detail)
|   |-- /collections/systems (Detail)
|   |-- /collections/experiments (Detail)
|-- Individual work pages (linked from collections)
```

### 2.2 Collection Index Page Anatomy

```
+---------------------------------------------+
| Navigation                                   |
+---------------------------------------------+
| Page Header                                  |
|   - Label ("Curated")                        |
|   - Title ("Collections")                    |
|   - Introduction paragraph                   |
+---------------------------------------------+
| Collections Grid (2-column)                  |
|   +------------+  +------------+             |
|   | Collection |  | Collection |             |
|   | Card 1     |  | Card 2     |             |
|   +------------+  +------------+             |
|   +------------+  +------------+             |
|   | Collection |  | Collection |             |
|   | Card 3     |  | Card 4     |             |
|   +------------+  +------------+             |
+---------------------------------------------+
| Curatorial Section                           |
|   - "Curatorial Note" label                  |
|   - Philosophy text (2 paragraphs)           |
|   - Signature                                |
+---------------------------------------------+
| Footer                                       |
+---------------------------------------------+
```

### 2.3 Collection Detail Page Anatomy

```
+---------------------------------------------+
| Navigation                                   |
+---------------------------------------------+
| Collection Header                            |
|   - Back link ("<- All Collections")         |
|   - Accent dot + "Collection" label + Count  |
|   - Title                                    |
|   - Description (with <em> emphasis)         |
|   - Curator's Note card                      |
+---------------------------------------------+
| Works Grid (3-column desktop)                |
|   +--------+  +--------+  +--------+         |
|   | Work 1 |  | Work 2 |  | Work 3 |         |
|   +--------+  +--------+  +--------+         |
|   +--------+  +--------+  +--------+         |
|   | Work 4 |  | Work 5 |  | Work 6 |         |
|   +--------+  +--------+  +--------+         |
+---------------------------------------------+
| Collection Navigation                        |
|   +------------------+  +------------------+ |
|   | <- Prev Coll.    |  | Next Coll. ->    | |
|   +------------------+  +------------------+ |
+---------------------------------------------+
| Footer                                       |
+---------------------------------------------+
```

### 2.4 The Four Collections

| Collection   | Accent | Theme                                      | Work Types                      |
|--------------|--------|--------------------------------------------|---------------------------------|
| AI Futures   | UV     | AI & human creativity intersection         | Essays, interfaces, generative  |
| Void Studies | Ice    | Negative space, darkness, absence          | Visual works, written reflections |
| Systems      | Gold   | Interconnected structures, design systems  | Data viz, systematic approaches |
| Experiments  | Strobe | Short-form explorations, prototypes        | Sketches, unfinished thoughts   |

---

## 3. Color System

### 3.1 Collection Accent Colors

Each collection has a signature color that appears in:
- The accent dot
- Hover glow effects
- Border highlights on hover
- Arrow/link color on hover
- Background tint on curator's note cards

| Collection   | Accent Name | Primary Value | Dim Value                       | Glow Value                          |
|--------------|-------------|---------------|---------------------------------|-------------------------------------|
| AI Futures   | `uv`        | `#B04BFF`     | `rgba(176, 75, 255, 0.15)`      | `0 0 32px rgba(176, 75, 255, 0.25)` |
| Void Studies | `ice`       | `#7DE7FF`     | `rgba(125, 231, 255, 0.12)`     | `0 0 32px rgba(125, 231, 255, 0.20)` |
| Systems      | `gold`      | `#FFD26A`     | `rgba(255, 210, 106, 0.12)`     | `0 0 32px rgba(255, 210, 106, 0.15)` |
| Experiments  | `strobe`    | `#FF2A4A`     | `rgba(255, 42, 74, 0.12)`       | `0 0 32px rgba(255, 42, 74, 0.18)` |

### 3.2 Work Type Badge Colors

Work types have their own color associations:

| Type       | `data-type` value | Color Variable  | Hex Value |
|------------|-------------------|-----------------|-----------|
| Essay      | `essay`           | `--ice-400`     | `#7DE7FF` |
| Interface  | `interface`       | `--uv-400`      | `#C77DFF` |
| Generative | `generative`      | `--sun-400`     | `#FFD26A` |
| Writing    | `writing`         | `--text-200`    | `#D6E6FF` |
| Vignette   | `vignette`        | `--strobe-500`  | `#FF2A4A` |
| Research   | `research`        | `--amber-500`   | `#FF8A3D` |

### 3.3 Complete Color Palette

```css
:root {
  color-scheme: dark;

  /* Core neutrals (dark to light) */
  --ink-950: #05060A;   /* Page background */
  --ink-900: #0D0F14;   /* Surface/card background */
  --ink-850: #121319;   /* Image placeholder background */
  --ink-800: #16181E;   /* Mosaic grid background */
  --ink-700: #1E2028;   /* Elevated surfaces */

  /* Text hierarchy */
  --text-100: #EAF0FF;  /* Primary text, headings */
  --text-200: #D6E6FF;  /* Secondary text, emphasis */
  --text-400: #A8B2D1;  /* Body text, descriptions */
  --text-600: #676D81;  /* Muted text, metadata */

  /* Accent colors */
  --uv-600: #7A2BFF;    /* Deep purple (gradients) */
  --uv-500: #B04BFF;    /* Primary purple */
  --uv-400: #C77DFF;    /* Light purple */
  --ice-400: #7DE7FF;   /* Cyan */
  --strobe-500: #FF2A4A; /* Red */
  --sun-400: #FFD26A;   /* Gold */
  --amber-500: #FF8A3D; /* Orange */

  /* Semantic aliases */
  --bg: var(--ink-950);
  --surface: var(--ink-900);
  --border: rgba(214, 230, 255, 0.12);
  --border-hover: rgba(214, 230, 255, 0.24);
  --text: var(--text-100);
  --text-muted: var(--text-400);

  /* Glow effects */
  --glow-uv: 0 0 32px rgba(176, 75, 255, 0.25);
  --glow-ice: 0 0 32px rgba(125, 231, 255, 0.20);
  --glow-red: 0 0 32px rgba(255, 42, 74, 0.18);
  --glow-gold: 0 0 32px rgba(255, 210, 106, 0.15);
}
```

### 3.4 Collection-Specific CSS Variables (Detail Pages)

On detail pages, set these variables based on the collection:

```css
/* AI Futures (UV) */
--collection-accent: var(--uv-500);
--collection-accent-dim: rgba(176, 75, 255, 0.15);
--collection-glow: 0 0 32px rgba(176, 75, 255, 0.25);

/* Void Studies (Ice) */
--collection-accent: var(--ice-400);
--collection-accent-dim: rgba(125, 231, 255, 0.12);
--collection-glow: 0 0 32px rgba(125, 231, 255, 0.20);

/* Systems (Gold) */
--collection-accent: var(--sun-400);
--collection-accent-dim: rgba(255, 210, 106, 0.12);
--collection-glow: 0 0 32px rgba(255, 210, 106, 0.15);

/* Experiments (Strobe) */
--collection-accent: var(--strobe-500);
--collection-accent-dim: rgba(255, 42, 74, 0.12);
--collection-glow: 0 0 32px rgba(255, 42, 74, 0.18);
```

---

## 4. Typography

### 4.1 Font Stack

```css
--font-primary: 'Inter', system-ui, -apple-system, sans-serif;
--font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

| Font          | Usage                                      |
|---------------|--------------------------------------------|
| Inter         | Body text, descriptions, navigation links  |
| Space Grotesk | Headings, titles, work names               |
| JetBrains Mono | Labels, metadata, dates, counts, badges   |

### 4.2 Type Scale

| Element                | Font Family    | Size                    | Weight | Letter-spacing | Line-height |
|------------------------|----------------|-------------------------|--------|----------------|-------------|
| Page Title (index)     | Space Grotesk  | `clamp(42px, 8vw, 64px)` | 600    | `-0.04em`      | `1.05`      |
| Collection Title (detail) | Space Grotesk | `clamp(48px, 10vw, 72px)` | 600  | `-0.04em`      | `1.05`      |
| Collection Card Title  | Space Grotesk  | `24px`                  | 600    | `-0.03em`      | default     |
| Work Card Title        | Space Grotesk  | `17px`                  | 600    | `-0.03em`      | default     |
| Nav Link Title         | Space Grotesk  | `18px`                  | 600    | `-0.03em`      | default     |
| Page Intro             | Inter          | `18px`                  | 400    | normal         | `1.7`       |
| Collection Description | Inter          | `19px`                  | 400    | normal         | `1.7`       |
| Card Description       | Inter          | `15px`                  | 400    | normal         | `1.6`       |
| Work Excerpt           | Inter          | `14px`                  | 400    | normal         | `1.55`      |
| Curator Note Text (index) | Inter       | `17px`                  | 400    | normal         | `1.75`      |
| Curator Note Text (detail)| Inter       | `15px`                  | 400    | normal         | `1.7`       |
| Label (uppercase)      | JetBrains Mono | `11px`                  | 500    | `0.12em`       | default     |
| Badge                  | JetBrains Mono | `10px`                  | 500    | `0.04em`       | default     |
| Count/Date             | JetBrains Mono | `11px`                  | 500    | `0.04em`       | default     |
| Arrow Text             | JetBrains Mono | `12px`                  | 500    | normal         | default     |
| Back Link              | JetBrains Mono | `12px`                  | 500    | `0.02em`       | default     |
| Nav Direction          | JetBrains Mono | `10px`                  | 500    | `0.1em`        | default     |

### 4.3 Emphasis Treatment

Throughout the design, `<em>` tags are used for conceptual emphasis (not italics):

```css
.page-intro em,
.collection-description em {
  color: var(--text-200);
  font-style: normal;
}

.curator-note-text em {
  color: var(--text-200);
  font-style: italic; /* Exception: curator notes use italic */
}
```

---

## 5. Component Specifications

### 5.1 Collection Card (Index Page)

The primary navigation element for browsing collections.

#### HTML Structure

```html
<a href="/collections/ai-futures/" class="collection-card" data-accent="uv">
  <div class="collection-mosaic">
    <div class="mosaic-tile">
      <img src="..." alt="" loading="lazy">
    </div>
    <div class="mosaic-tile">
      <img src="..." alt="" loading="lazy">
    </div>
    <div class="mosaic-tile">
      <img src="..." alt="" loading="lazy">
    </div>
    <div class="mosaic-tile">
      <img src="..." alt="" loading="lazy">
    </div>
  </div>
  <div class="collection-info">
    <div class="collection-meta">
      <span class="collection-count">6 works</span>
      <span class="collection-accent" data-color="uv"></span>
    </div>
    <h2 class="collection-title">AI Futures</h2>
    <p class="collection-description">
      Explorations at the intersection of artificial intelligence and human creativity.
      Essays, interfaces, and generative experiments.
    </p>
    <span class="collection-arrow">
      Explore collection
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </span>
  </div>
</a>
```

#### CSS Classes

| Class                | Purpose                                     |
|----------------------|---------------------------------------------|
| `.collection-card`   | Main container, handles hover/reveal states |
| `.collection-mosaic` | 2x2 grid of thumbnail images                |
| `.mosaic-tile`       | Individual image container                  |
| `.collection-info`   | Text content wrapper                        |
| `.collection-meta`   | Count + accent dot row                      |
| `.collection-count`  | "6 works" label                             |
| `.collection-accent` | Colored dot indicator                       |
| `.collection-title`  | Collection name (h2)                        |
| `.collection-description` | Brief description                      |
| `.collection-arrow`  | "Explore collection" + arrow                |

#### Data Attributes

| Attribute      | Values                        | Purpose                        |
|----------------|-------------------------------|--------------------------------|
| `data-accent`  | `uv`, `ice`, `gold`, `strobe` | Card hover glow color          |
| `data-color`   | `uv`, `ice`, `gold`, `strobe` | Accent dot color               |

#### States

**Default (before reveal):**
- `opacity: 0`
- `transform: translateY(32px)`
- Border: `1px solid var(--border)`
- Background: `var(--surface)`

**Revealed (scroll trigger):**
- `opacity: 1`
- `transform: translateY(0)`
- Transition: `opacity 0.6s ease-out, transform var(--spring-reveal)`

**Hover:**
- `transform: translateY(-6px)`
- Border color changes to accent-tinted (e.g., `rgba(176, 75, 255, 0.3)`)
- Box shadow shows glow effect (`var(--glow-uv)`)
- Mosaic images scale to `1.08`
- Mosaic overlay opacity reduces to `0.5`
- Accent dot scales to `1.5` with glow
- Arrow gap increases from `8px` to `12px`
- Arrow SVG translates `4px` right
- Arrow text color changes to accent color

#### Dimensions

| Property       | Value              |
|----------------|--------------------|
| Border radius  | `16px`             |
| Mosaic aspect  | `16 / 10`          |
| Mosaic gap     | `2px`              |
| Info padding   | `28px 28px 32px`   |
| Accent dot     | `8px` (1.5x on hover = `12px`) |

---

### 5.2 Mosaic Thumbnail Grid

The 2x2 image grid within collection cards.

#### CSS Structure

```css
.collection-mosaic {
  position: relative;
  aspect-ratio: 16 / 10;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 2px;
  background: var(--ink-800);
  overflow: hidden;
}

.mosaic-tile {
  position: relative;
  overflow: hidden;
  background: var(--ink-850);
}

.mosaic-tile img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease, opacity var(--transition-fast);
}

.collection-card:hover .mosaic-tile img {
  transform: scale(1.08);
}
```

#### Overlay Gradient

A bottom-to-top fade creates depth and ensures text readability:

```css
.collection-mosaic::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(5, 6, 10, 0.6) 0%,
    rgba(5, 6, 10, 0) 50%
  );
  pointer-events: none;
  transition: opacity var(--transition-fast);
}

.collection-card:hover .collection-mosaic::after {
  opacity: 0.5;
}
```

---

### 5.3 Collection Header (Detail Page)

The hero section of a collection detail page.

#### HTML Structure

```html
<header class="collection-header">
  <div class="container">
    <div class="collection-header-content">
      <a href="/collections/" class="back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        All Collections
      </a>

      <div class="collection-meta-row">
        <span class="collection-accent-dot"></span>
        <span class="collection-label">Collection</span>
        <span class="collection-count">6 works</span>
      </div>

      <h1 class="collection-title">AI Futures</h1>

      <p class="collection-description">
        Explorations at the intersection of <em>artificial intelligence</em> and <em>human creativity</em>.
        Essays questioning our assumptions, interfaces reimagining collaboration,
        and generative experiments probing the boundaries of authorship.
      </p>

      <div class="curator-note">
        <!-- Curator's note content -->
      </div>
    </div>
  </div>
</header>
```

#### Background Treatment

Each collection has a themed radial gradient background:

```css
/* AI Futures (UV) */
.collection-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse 70% 50% at 30% 30%, rgba(122, 43, 255, 0.15) 0%, transparent 60%),
    radial-gradient(ellipse 50% 40% at 70% 60%, rgba(176, 75, 255, 0.10) 0%, transparent 50%);
  pointer-events: none;
}

/* Index page uses a different gradient */
.page-header::before {
  background:
    radial-gradient(ellipse 80% 50% at 20% 40%, rgba(122, 43, 255, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 30%, rgba(125, 231, 255, 0.08) 0%, transparent 50%);
}
```

#### Dimensions

| Property     | Value            |
|--------------|------------------|
| Padding      | `140px 0 64px`   |
| Max width    | `640px` (description & curator note) |

#### Meta Row

```css
.collection-meta-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
}

.collection-accent-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--collection-accent);
  box-shadow: 0 0 12px var(--collection-accent);
}

.collection-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--collection-accent);
}

.collection-count {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--text-600);
  margin-left: auto;
}
```

---

### 5.4 Curator's Note Card

A distinctive card for the curatorial statement on detail pages.

#### HTML Structure

```html
<div class="curator-note">
  <div class="curator-note-header">
    <svg class="curator-note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>
    <span class="curator-note-label">Curator's Note</span>
  </div>
  <p class="curator-note-text">
    This collection began as skepticism and evolved into fascination. The works here
    don't celebrate AI uncritically - they interrogate it, play with it, and sometimes
    <em>resist</em> it. What unites them is a refusal to accept easy narratives about
    what machines can and cannot do.
  </p>
</div>
```

#### CSS

```css
.curator-note {
  background: var(--collection-accent-dim);
  border: 1px solid rgba(176, 75, 255, 0.2); /* Adjust per collection */
  border-radius: 12px;
  padding: 24px 28px;
  max-width: 640px;
}

.curator-note-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.curator-note-icon {
  width: 20px;
  height: 20px;
  color: var(--collection-accent);
}

.curator-note-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--uv-400); /* Or collection light accent */
}

.curator-note-text {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text-400);
}

.curator-note-text em {
  color: var(--text-200);
  font-style: italic;
}
```

---

### 5.5 Curatorial Section (Index Page)

The philosophy statement at the bottom of the collections index.

#### HTML Structure

```html
<section class="curatorial-section">
  <div class="container">
    <div class="curatorial-content">
      <span class="curatorial-label">Curatorial Note</span>
      <div class="curatorial-text">
        <p>
          These collections are <em>living arrangements</em> - they grow and shift as new work emerges
          and old work reveals new connections. A piece might belong to multiple collections,
          or migrate between them as my understanding deepens.
        </p>
        <p>
          The boundaries between categories have always felt artificial to me. An essay about AI
          is also a meditation on void. A data visualization is also an aesthetic experiment.
          These collections honor that multiplicity.
        </p>
        <div class="curatorial-signature">
          - J, Third Plane Studios
        </div>
      </div>
    </div>
  </div>
</section>
```

#### CSS

```css
.curatorial-section {
  padding: 80px 0 var(--section-padding);
  border-top: 1px solid var(--border);
  margin-top: 40px;
}

.curatorial-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: start;
}

@media (min-width: 800px) {
  .curatorial-content {
    grid-template-columns: 200px 1fr;
    gap: 64px;
  }
}

.curatorial-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-600);
}

.curatorial-text {
  max-width: 600px;
}

.curatorial-text p {
  font-size: 17px;
  line-height: 1.75;
  color: var(--text-400);
  margin-bottom: 24px;
}

.curatorial-text p:last-child {
  margin-bottom: 0;
}

.curatorial-text em {
  color: var(--text-200);
  font-style: normal;
}

.curatorial-signature {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-600);
}
```

---

### 5.6 Work Card

Individual work items within a collection.

#### HTML Structure

```html
<a href="/works/latent-space-of-meaning/" class="work-card">
  <div class="work-media">
    <span class="work-type-badge" data-type="essay">
      <span class="type-dot"></span>
      Essay
    </span>
    <img
      src="..."
      alt="The Latent Space of Meaning"
      width="800"
      height="600"
      loading="lazy"
    >
  </div>
  <div class="work-meta">
    <h3 class="work-title">The Latent Space of Meaning</h3>
    <p class="work-excerpt">What happens when machines learn to navigate the space between words? An exploration of embedding models and semantic topology.</p>
    <span class="work-date">Dec 2024</span>
  </div>
</a>
```

#### CSS Classes

| Class            | Purpose                           |
|------------------|-----------------------------------|
| `.work-card`     | Main container, link wrapper      |
| `.work-media`    | Image container with overflow     |
| `.work-type-badge` | Type indicator overlay          |
| `.type-dot`      | Colored circle in badge           |
| `.work-meta`     | Text content below image          |
| `.work-title`    | Work name (h3)                    |
| `.work-excerpt`  | Brief description (2-line clamp)  |
| `.work-date`     | Publication date                  |

#### States

**Default (before reveal):**
- `opacity: 0`
- `transform: translateY(24px)`

**Revealed:**
- `opacity: 1`
- `transform: translateY(0)`
- Transition delay calculated by position (center-out reveal)

**Hover:**
- `transform: translateY(-4px)`
- Image scales to `1.04`
- Title color changes to `var(--collection-accent)`
- Arrow pseudo-element fades in on date

#### Image Handling

Images have natural aspect ratios (no forced ratio). The design accommodates:
- Landscape (16:9, 4:3)
- Portrait (3:4, 2:3)
- Square (1:1)

```css
.work-media {
  position: relative;
  overflow: hidden;
  background: var(--ink-850);
  border-radius: 4px;
}

.work-media img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: cover;
  transition: transform var(--spring-hover);
}

.work-card:hover .work-media img {
  transform: scale(1.04);
}
```

#### Excerpt Clamping

```css
.work-excerpt {
  font-size: 14px;
  line-height: 1.55;
  color: var(--text-600);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

#### Date Arrow Animation

```css
.work-date {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-600);
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.work-date::after {
  content: '\2192'; /* Right arrow */
  opacity: 0;
  transform: translateX(-8px);
  transition: opacity var(--transition-fast), transform var(--spring-hover);
}

.work-card:hover .work-date::after {
  opacity: 0.6;
  transform: translateX(0);
}
```

---

### 5.7 Type Badge System

Overlay badges indicating work format.

#### HTML Structure

```html
<span class="work-type-badge" data-type="essay">
  <span class="type-dot"></span>
  Essay
</span>
```

#### Supported Types

| Type       | `data-type` value | Color         |
|------------|-------------------|---------------|
| Essay      | `essay`           | `--ice-400`   |
| Interface  | `interface`       | `--uv-400`    |
| Generative | `generative`      | `--sun-400`   |
| Writing    | `writing`         | `--text-200`  |
| Vignette   | `vignette`        | `--strobe-500`|
| Research   | `research`        | `--amber-500` |

#### CSS

```css
.work-type-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  padding: 6px 10px;
  border-radius: 4px;
  background: rgba(5, 6, 10, 0.85);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid var(--border);
  transition: background var(--transition-fast), border-color var(--transition-fast);
}

.work-card:hover .work-type-badge {
  background: rgba(5, 6, 10, 0.95);
}

.type-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: currentColor;
}

/* Type-specific colors */
.work-type-badge[data-type="essay"] { color: var(--ice-400); }
.work-type-badge[data-type="interface"] { color: var(--uv-400); }
.work-type-badge[data-type="generative"] { color: var(--sun-400); }
.work-type-badge[data-type="writing"] { color: var(--text-200); }
.work-type-badge[data-type="vignette"] { color: var(--strobe-500); }
.work-type-badge[data-type="research"] { color: var(--amber-500); }
```

---

### 5.8 Collection Navigation (Prev/Next)

Navigation between collections at the bottom of detail pages.

#### HTML Structure

```html
<section class="collection-nav">
  <div class="container">
    <div class="collection-nav-inner">
      <a href="/collections/void-studies/" class="collection-nav-link collection-nav-link--prev">
        <span class="nav-link-direction">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Previous Collection
        </span>
        <span class="nav-link-title">Void Studies</span>
        <span class="nav-link-count">4 works</span>
      </a>

      <a href="/collections/systems/" class="collection-nav-link collection-nav-link--next">
        <span class="nav-link-direction">
          Next Collection
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </span>
        <span class="nav-link-title">Systems</span>
        <span class="nav-link-count">5 works</span>
      </a>
    </div>
  </div>
</section>
```

#### CSS

```css
.collection-nav {
  padding: 64px 0;
  border-top: 1px solid var(--border);
}

.collection-nav-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
}

@media (max-width: 600px) {
  .collection-nav-inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}

.collection-nav-link {
  display: flex;
  flex-direction: column;
  padding: 24px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  transition:
    border-color var(--transition-fast),
    transform var(--spring-card),
    box-shadow var(--transition-medium);
}

.collection-nav-link:hover {
  border-color: var(--border-hover);
  transform: translateY(-4px);
}

.collection-nav-link--prev:hover {
  box-shadow: 0 0 24px rgba(125, 231, 255, 0.15);
  border-color: rgba(125, 231, 255, 0.25);
}

.collection-nav-link--next:hover {
  box-shadow: 0 0 24px rgba(255, 210, 106, 0.15);
  border-color: rgba(255, 210, 106, 0.25);
}

.collection-nav-link--next {
  text-align: right;
}

.nav-link-direction {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-600);
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.collection-nav-link--next .nav-link-direction {
  justify-content: flex-end;
}

.nav-link-direction svg {
  width: 14px;
  height: 14px;
  transition: transform var(--spring-hover);
}

.collection-nav-link:hover .nav-link-direction svg {
  transform: translateX(-4px);
}

.collection-nav-link--next:hover .nav-link-direction svg {
  transform: translateX(4px);
}

.nav-link-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  letter-spacing: var(--letter-spacing-tight);
  color: var(--text-100);
  margin-bottom: 4px;
}

.nav-link-count {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-600);
}

.collection-nav-link--prev:hover .nav-link-title {
  color: var(--ice-400);
}

.collection-nav-link--next:hover .nav-link-title {
  color: var(--sun-400);
}
```

---

### 5.9 Back Link

Navigation back to collections index.

#### HTML Structure

```html
<a href="/collections/" class="back-link">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
  All Collections
</a>
```

#### CSS

```css
.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.02em;
  color: var(--text-600);
  margin-bottom: 32px;
  transition: color var(--transition-fast), gap var(--spring-hover);
}

.back-link:hover {
  color: var(--collection-accent);
  gap: 12px;
}

.back-link svg {
  width: 16px;
  height: 16px;
  transition: transform var(--spring-hover);
}

.back-link:hover svg {
  transform: translateX(-4px);
}
```

---

### 5.10 Page Header (Index)

The hero section of the collections index.

#### HTML Structure

```html
<header class="page-header">
  <div class="container">
    <div class="page-header-content">
      <span class="page-label">Curated</span>
      <h1 class="page-title">Collections</h1>
      <p class="page-intro">
        Thematic groupings that trace threads across different mediums and moments.
        Each collection represents a <em>sustained inquiry</em> - a question I keep returning to.
      </p>
    </div>
  </div>
</header>
```

#### CSS

```css
.page-header {
  padding: 160px 0 80px;
  position: relative;
}

.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse 80% 50% at 20% 40%, rgba(122, 43, 255, 0.12) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 30%, rgba(125, 231, 255, 0.08) 0%, transparent 50%);
  pointer-events: none;
}

.page-header-content {
  position: relative;
  z-index: 1;
  max-width: 720px;
}

.page-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ice-400);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-label::before {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--ice-400);
  opacity: 0.5;
}

.page-title {
  font-family: var(--font-display);
  font-size: clamp(42px, 8vw, 64px);
  font-weight: 600;
  letter-spacing: -0.04em;
  line-height: 1.05;
  color: var(--text-100);
  margin-bottom: 28px;
}

.page-intro {
  font-size: 18px;
  line-height: 1.7;
  color: var(--text-400);
  max-width: 560px;
}

.page-intro em {
  color: var(--text-200);
  font-style: normal;
}
```

---

## 6. Animation System

### 6.1 Spring Variables

```css
:root {
  /* Card hover - snappy response, low bounce */
  --spring-card: 350ms linear(0, 0.3667, 0.8271, 1.0379, 1.0652, 1.0332, 1.006, 0.9961, 0.996, 0.9984, 0.9999, 1);

  /* Scroll reveal - gentle entrance, moderate bounce */
  --spring-reveal: 700ms linear(0, 0.1737, 0.5211, 0.8491, 1.0647, 1.1552, 1.1532, 1.1043, 1.0466, 1.0024, 0.979, 0.9735, 0.979, 0.9883, 0.9968, 1.0021, 1.0042, 1.004, 1.0026, 1.0011, 1, 0.9994, 1);

  /* Micro-interactions - subtle overshoot */
  --spring-hover: 450ms linear(0, 0.2459, 0.6526, 0.9468, 1.0764, 1.0915, 1.0585, 1.0219, 0.9993, 0.9914, 0.9921, 0.9957, 0.9988, 1.0004, 1);

  /* Logo tension effect */
  --spring-snap: 700ms linear(0, 0.1737, 0.5211, 0.8491, 1.0647, 1.1552, 1.1532, 1.1043, 1.0466, 1.0024, 0.979, 0.9735, 0.979, 0.9883, 0.9968, 1.0021, 1.0042, 1.004, 1.0026, 1.0011, 1, 0.9994, 1);

  /* Work card stagger - slightly bouncier */
  --spring-stagger: 500ms linear(0, 0.4133, 1.0078, 1.2506, 1.1719, 1.0154, 0.9389, 0.9509, 0.9912, 1.0144, 1.0137, 1.0036, 0.9968, 0.9962, 0.9987, 1.0007, 1);

  /* Simple easing fallbacks */
  --transition-fast: 0.2s ease;
  --transition-medium: 0.35s ease;
}
```

### 6.2 Scroll Reveal Animation

Collection cards and work cards use IntersectionObserver for scroll-triggered reveals.

**Collection Cards (Index) - Sequential reveal:**
```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const card = entry.target;
      const index = Array.from(cards).indexOf(card);
      const delay = index * 120; // 120ms stagger

      setTimeout(() => {
        card.classList.add('revealed');
      }, delay);

      observer.unobserve(card);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -60px 0px'
});

cards.forEach(card => observer.observe(card));
```

**Work Cards (Detail) - Center-out reveal:**
```javascript
// Get column count from computed grid styles
const columns = gridStyles.gridTemplateColumns.split(' ').length;

// Define reveal order by column position (center first)
const getRevealOrder = (cols) => {
  if (cols === 3) return [1, 0, 2]; // center, left, right
  if (cols === 2) return [0, 1];
  return [0];
};

const row = Math.floor(index / columns);
const col = index % columns;
const revealOrder = getRevealOrder(columns);
const orderIndex = revealOrder[col];

// Calculate delay: row stagger + column position stagger
const delay = (row * 180) + (orderIndex * 80);
card.style.transitionDelay = `${delay}ms`;
card.classList.add('revealed');
```

### 6.3 Hover Transitions

| Element              | Properties                    | Timing                |
|----------------------|-------------------------------|-----------------------|
| Card lift            | `transform`                   | `--spring-card`       |
| Border color         | `border-color`                | `--transition-fast`   |
| Box shadow (glow)    | `box-shadow`                  | `--transition-medium` |
| Image scale          | `transform`                   | `0.6s ease` (mosaic) / `--spring-hover` (work) |
| Accent dot scale     | `transform`                   | `--spring-hover`      |
| Arrow gap            | `gap`                         | `--spring-hover`      |
| Arrow icon           | `transform`                   | `--spring-hover`      |
| Title color          | `color`                       | `--transition-fast`   |
| Back link gap        | `gap`                         | `--spring-hover`      |

### 6.4 Navigation Scroll State

```javascript
const nav = document.getElementById('nav');
const updateNavState = () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
};
window.addEventListener('scroll', updateNavState, { passive: true });
```

When scrolled, nav gets:
- `background: rgba(5, 6, 10, 0.72)`
- `backdrop-filter: blur(16px)`

---

## 7. Responsive Behavior

### 7.1 Breakpoints

| Breakpoint | Purpose                        |
|------------|--------------------------------|
| `600px`    | Mobile/tablet text adjustments, nav gap, footer stack |
| `700px`    | Collection grid 1col -> 2col    |
| `768px`    | Page padding increase (24px -> 48px) |
| `800px`    | Curatorial section 2-column layout |
| `900px`    | Works grid 2col -> 3col         |

### 7.2 Collections Grid

```css
/* Mobile (default) */
.collections-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
}

/* Tablet+ */
@media (min-width: 700px) {
  .collections-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 40px;
  }
}
```

### 7.3 Works Grid

```css
/* Desktop (default) */
.works-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  align-items: start;
  gap: 40px 32px;
}

/* Tablet */
@media (max-width: 900px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 24px;
  }
}

/* Mobile */
@media (max-width: 600px) {
  .works-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
```

### 7.4 Page Padding

```css
:root {
  --page-padding: 24px;
}

@media (min-width: 768px) {
  :root {
    --page-padding: 48px;
  }
}
```

### 7.5 Navigation Responsive

```css
@media (max-width: 600px) {
  .nav-links {
    gap: 20px;
  }
  .nav-links a {
    font-size: 13px;
  }
}
```

### 7.6 Footer Responsive

```css
@media (max-width: 600px) {
  .footer {
    padding: 64px 0 40px;
  }
  .footer-content {
    flex-direction: column;
    gap: 32px;
  }
  .footer-contact {
    text-align: left;
  }
  .footer-social {
    justify-content: flex-start;
  }
}
```

---

## 8. Accessibility

### 8.1 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }

  .collection-card,
  .work-card {
    opacity: 1;
    transform: none;
  }
}
```

JavaScript also respects this preference:
```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (prefersReducedMotion) {
  cards.forEach(card => card.classList.add('revealed'));
} else {
  // Set up IntersectionObserver...
}
```

### 8.2 Focus States

```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--ice-400);
  outline-offset: 3px;
}

.work-card:focus-visible {
  outline: 2px solid var(--ice-400);
  outline-offset: 4px;
}
```

### 8.3 Selection Styling

```css
::selection {
  background: rgba(125, 231, 255, 0.25);
  color: var(--text-100);
}
```

### 8.4 Semantic HTML

- Use `<header>` for page/collection headers
- Use `<main>` for primary content
- Use `<section>` for distinct content areas
- Use `<nav>` for navigation
- Use `<footer>` for footer
- Use `<a>` elements for all clickable cards (not `<div>`)
- Include proper heading hierarchy (h1 -> h2 -> h3)

### 8.5 Image Alt Text

- Decorative mosaic images: `alt=""`
- Work thumbnails: Descriptive alt text of the work
- Icons: Either `aria-label` or `alt=""`

---

## 9. Complete CSS Reference

### 9.1 Full CSS Variables Block

```css
:root {
  color-scheme: dark;

  /* Core neutrals */
  --ink-950: #05060A;
  --ink-900: #0D0F14;
  --ink-850: #121319;
  --ink-800: #16181E;
  --ink-700: #1E2028;

  /* Text */
  --text-100: #EAF0FF;
  --text-200: #D6E6FF;
  --text-400: #A8B2D1;
  --text-600: #676D81;

  /* Accents */
  --uv-600: #7A2BFF;
  --uv-500: #B04BFF;
  --uv-400: #C77DFF;
  --ice-400: #7DE7FF;
  --strobe-500: #FF2A4A;
  --sun-400: #FFD26A;
  --amber-500: #FF8A3D;

  /* Semantic */
  --bg: var(--ink-950);
  --surface: var(--ink-900);
  --border: rgba(214, 230, 255, 0.12);
  --border-hover: rgba(214, 230, 255, 0.24);
  --text: var(--text-100);
  --text-muted: var(--text-400);

  /* Glows */
  --glow-uv: 0 0 32px rgba(176, 75, 255, 0.25);
  --glow-ice: 0 0 32px rgba(125, 231, 255, 0.20);
  --glow-red: 0 0 32px rgba(255, 42, 74, 0.18);
  --glow-gold: 0 0 32px rgba(255, 210, 106, 0.15);

  /* Typography */
  --font-primary: 'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  --letter-spacing-tight: -0.03em;

  /* Spacing */
  --page-padding: 24px;
  --section-padding: 120px;

  /* Springs */
  --spring-card: 350ms linear(0, 0.3667, 0.8271, 1.0379, 1.0652, 1.0332, 1.006, 0.9961, 0.996, 0.9984, 0.9999, 1);
  --spring-reveal: 700ms linear(0, 0.1737, 0.5211, 0.8491, 1.0647, 1.1552, 1.1532, 1.1043, 1.0466, 1.0024, 0.979, 0.9735, 0.979, 0.9883, 0.9968, 1.0021, 1.0042, 1.004, 1.0026, 1.0011, 1, 0.9994, 1);
  --spring-hover: 450ms linear(0, 0.2459, 0.6526, 0.9468, 1.0764, 1.0915, 1.0585, 1.0219, 0.9993, 0.9914, 0.9921, 0.9957, 0.9988, 1.0004, 1);
  --spring-snap: 700ms linear(0, 0.1737, 0.5211, 0.8491, 1.0647, 1.1552, 1.1532, 1.1043, 1.0466, 1.0024, 0.979, 0.9735, 0.979, 0.9883, 0.9968, 1.0021, 1.0042, 1.004, 1.0026, 1.0011, 1, 0.9994, 1);
  --spring-stagger: 500ms linear(0, 0.4133, 1.0078, 1.2506, 1.1719, 1.0154, 0.9389, 0.9509, 0.9912, 1.0144, 1.0137, 1.0036, 0.9968, 0.9962, 0.9987, 1.0007, 1);

  /* Transitions */
  --transition-fast: 0.2s ease;
  --transition-medium: 0.35s ease;
}

@media (min-width: 768px) {
  :root { --page-padding: 48px; }
}
```

### 9.2 Base Reset

```css
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-primary);
  font-weight: 400;
  line-height: 1.6;
  color: var(--text);
  background: var(--bg);
  min-height: 100vh;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--page-padding);
}

a {
  color: inherit;
  text-decoration: none;
  transition: color var(--transition-fast);
}
```

---

## 10. Implementation Guide

### 10.1 Collection Data Schema (Frontmatter)

```yaml
---
title: "AI Futures"
slug: "ai-futures"
accent: "uv"  # uv | ice | gold | strobe
order: 1
description: "Explorations at the intersection of artificial intelligence and human creativity. Essays, interfaces, and generative experiments."
curatorNote: "This collection began as skepticism and evolved into fascination. The works here don't celebrate AI uncritically - they interrogate it, play with it, and sometimes resist it."
mosaic:
  - /images/collections/ai-futures/thumb-1.jpg
  - /images/collections/ai-futures/thumb-2.jpg
  - /images/collections/ai-futures/thumb-3.jpg
  - /images/collections/ai-futures/thumb-4.jpg
---
```

| Field         | Type   | Required | Description                           |
|---------------|--------|----------|---------------------------------------|
| `title`       | string | Yes      | Display title                         |
| `slug`        | string | Yes      | URL slug                              |
| `accent`      | string | Yes      | Color theme: `uv`, `ice`, `gold`, `strobe` |
| `order`       | number | No       | Sort order on index (lower = first)   |
| `description` | string | Yes      | Short description (<200 chars)        |
| `curatorNote` | string | No       | Personal editorial note               |
| `mosaic`      | array  | Yes      | 4 image paths for 2x2 thumbnail grid  |

### 10.2 Work Data Schema (Frontmatter)

```yaml
---
title: "The Latent Space of Meaning"
slug: "latent-space-of-meaning"
type: "essay"  # essay | interface | generative | writing | vignette | research
collections:
  - ai-futures
  - void-studies  # Can belong to multiple collections
date: 2024-12-15
excerpt: "What happens when machines learn to navigate the space between words? An exploration of embedding models and semantic topology."
thumbnail: /images/works/latent-space-of-meaning/thumb.jpg
thumbnailAlt: "Abstract visualization of word embeddings in latent space"
featured: true  # Optional: for special positioning
---
```

| Field          | Type   | Required | Description                           |
|----------------|--------|----------|---------------------------------------|
| `title`        | string | Yes      | Work title                            |
| `slug`         | string | Yes      | URL slug                              |
| `type`         | string | Yes      | Work format (see Type Badge System)   |
| `collections`  | array  | Yes      | Collection slugs this belongs to      |
| `date`         | date   | Yes      | Publication date (YYYY-MM-DD)         |
| `excerpt`      | string | Yes      | 1-2 sentence description              |
| `thumbnail`    | string | Yes      | Path to thumbnail image               |
| `thumbnailAlt` | string | Yes      | Alt text for thumbnail                |
| `featured`     | bool   | No       | Special positioning in collection     |

### 10.3 Eleventy Collection Configuration

```javascript
// .eleventy.js

module.exports = function(eleventyConfig) {

  // Create collections from frontmatter
  eleventyConfig.addCollection("collections", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/collections/*.md")
      .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
  });

  // Get works for a specific collection
  eleventyConfig.addFilter("worksInCollection", function(works, collectionSlug) {
    return works.filter(work =>
      work.data.collections && work.data.collections.includes(collectionSlug)
    ).sort((a, b) => new Date(b.data.date) - new Date(a.data.date));
  });

  // Get accent colors for a collection
  eleventyConfig.addFilter("accentColors", function(accent) {
    const colors = {
      uv: {
        primary: '#B04BFF',
        dim: 'rgba(176, 75, 255, 0.15)',
        border: 'rgba(176, 75, 255, 0.2)',
        glow: '0 0 32px rgba(176, 75, 255, 0.25)',
        hoverBorder: 'rgba(176, 75, 255, 0.3)'
      },
      ice: {
        primary: '#7DE7FF',
        dim: 'rgba(125, 231, 255, 0.12)',
        border: 'rgba(125, 231, 255, 0.2)',
        glow: '0 0 32px rgba(125, 231, 255, 0.20)',
        hoverBorder: 'rgba(125, 231, 255, 0.25)'
      },
      gold: {
        primary: '#FFD26A',
        dim: 'rgba(255, 210, 106, 0.12)',
        border: 'rgba(255, 210, 106, 0.2)',
        glow: '0 0 32px rgba(255, 210, 106, 0.15)',
        hoverBorder: 'rgba(255, 210, 106, 0.25)'
      },
      strobe: {
        primary: '#FF2A4A',
        dim: 'rgba(255, 42, 74, 0.12)',
        border: 'rgba(255, 42, 74, 0.2)',
        glow: '0 0 32px rgba(255, 42, 74, 0.18)',
        hoverBorder: 'rgba(255, 42, 74, 0.25)'
      }
    };
    return colors[accent] || colors.uv;
  });

  // Get prev/next collections for navigation
  eleventyConfig.addFilter("prevNextCollections", function(collections, currentSlug) {
    const index = collections.findIndex(c => c.data.slug === currentSlug);
    const total = collections.length;
    return {
      prev: collections[(index - 1 + total) % total],
      next: collections[(index + 1) % total]
    };
  });

};
```

### 10.4 Adding a New Collection

1. **Create collection file:**
   ```
   src/collections/new-collection.md
   ```

2. **Add frontmatter:**
   ```yaml
   ---
   title: "New Collection Name"
   slug: "new-collection"
   accent: "ice"
   order: 5
   description: "Brief description of the thematic inquiry..."
   curatorNote: "Personal statement about why these works belong together..."
   mosaic:
     - /images/collections/new-collection/thumb-1.jpg
     - /images/collections/new-collection/thumb-2.jpg
     - /images/collections/new-collection/thumb-3.jpg
     - /images/collections/new-collection/thumb-4.jpg
   ---
   ```

3. **Create mosaic images:**
   - 4 images, any aspect ratio (will be cropped to fill)
   - Suggested source: 400x300px each minimum
   - Optimize for web (WebP preferred, fallback to JPEG)
   - Should represent the visual variety within the collection

4. **Update works** to include in this collection:
   ```yaml
   # In each work's frontmatter
   collections:
     - existing-collection
     - new-collection  # Add the slug
   ```

5. **Test:**
   - Verify collection appears on index
   - Verify works appear on detail page
   - Check accent color theming
   - Test prev/next navigation wraps correctly

### 10.5 File Structure

```
src/
├── collections/
│   ├── collections.json      # Directory data defaults
│   ├── index.njk             # Collections index page
│   ├── ai-futures.md
│   ├── void-studies.md
│   ├── systems.md
│   └── experiments.md
├── works/
│   ├── latent-space-of-meaning.md
│   ├── synthesis.md
│   └── ...
├── _includes/
│   ├── layouts/
│   │   ├── collection-index.njk
│   │   └── collection-detail.njk
│   └── components/
│       ├── collection-card.njk
│       ├── work-card.njk
│       ├── curator-note.njk
│       ├── collection-nav.njk
│       └── back-link.njk
├── css/
│   └── collections.css
└── images/
    └── collections/
        ├── ai-futures/
        │   ├── thumb-1.jpg
        │   ├── thumb-2.jpg
        │   ├── thumb-3.jpg
        │   └── thumb-4.jpg
        └── ...
```

### 10.6 Template Example: Collection Card

```nunjucks
{# _includes/components/collection-card.njk #}
{% set works = collections.works | worksInCollection(collection.data.slug) %}

<a href="/collections/{{ collection.data.slug }}/"
   class="collection-card"
   data-accent="{{ collection.data.accent }}">
  <div class="collection-mosaic">
    {% for thumb in collection.data.mosaic %}
    <div class="mosaic-tile">
      <img src="{{ thumb }}" alt="" loading="lazy">
    </div>
    {% endfor %}
  </div>
  <div class="collection-info">
    <div class="collection-meta">
      <span class="collection-count">{{ works.length }} work{{ 's' if works.length != 1 }}</span>
      <span class="collection-accent" data-color="{{ collection.data.accent }}"></span>
    </div>
    <h2 class="collection-title">{{ collection.data.title }}</h2>
    <p class="collection-description">{{ collection.data.description }}</p>
    <span class="collection-arrow">
      Explore collection
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    </span>
  </div>
</a>
```

### 10.7 URL Structure

```
/collections/                    -> Collections index
/collections/ai-futures/         -> AI Futures detail
/collections/void-studies/       -> Void Studies detail
/collections/systems/            -> Systems detail
/collections/experiments/        -> Experiments detail
```

---

## Appendix A: Icons Used

### Arrow Right (Explore, Next)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M5 12h14M12 5l7 7-7 7"/>
</svg>
```

### Arrow Left (Back, Previous)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M19 12H5M12 19l-7-7 7-7"/>
</svg>
```

### Pen (Curator's Note)
```html
<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
  <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
</svg>
```

---

## Appendix B: Complete JavaScript

### Scroll Reveal (Index Page)

```javascript
(function() {
  'use strict';

  // Nav scroll state
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNavState = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
  }

  // Staggered scroll reveal for collection cards
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll('.collection-card');

  if (prefersReducedMotion) {
    cards.forEach(card => card.classList.add('revealed'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = Array.from(cards).indexOf(card);
          const delay = index * 120;

          setTimeout(() => {
            card.classList.add('revealed');
          }, delay);

          observer.unobserve(card);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    cards.forEach(card => observer.observe(card));
  }
})();
```

### Scroll Reveal (Detail Page)

```javascript
(function() {
  'use strict';

  // Nav scroll state
  const nav = document.getElementById('nav');
  if (nav) {
    const updateNavState = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    updateNavState();
    window.addEventListener('scroll', updateNavState, { passive: true });
  }

  // Staggered scroll reveal for work cards - center-out pattern
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll('.work-card');

  if (prefersReducedMotion) {
    cards.forEach(card => card.classList.add('revealed'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = parseInt(card.dataset.index, 10) || 0;

          // Get column count from grid
          const grid = card.parentElement;
          const gridStyles = getComputedStyle(grid);
          const columns = gridStyles.gridTemplateColumns.split(' ').length;

          // Center-out reveal order
          const getRevealOrder = (cols) => {
            if (cols === 3) return [1, 0, 2]; // center, left, right
            if (cols === 2) return [0, 1];
            return [0];
          };

          const row = Math.floor(index / columns);
          const col = index % columns;
          const revealOrder = getRevealOrder(columns);
          const orderIndex = revealOrder[col] !== undefined ? revealOrder[col] : col;

          const delay = (row * 180) + (orderIndex * 80);

          card.style.transitionDelay = `${delay}ms`;
          card.classList.add('revealed');

          observer.unobserve(card);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    cards.forEach((card, i) => {
      card.dataset.index = i;
      observer.observe(card);
    });
  }
})();
```

---

## Revision History

| Date       | Version | Changes                              |
|------------|---------|--------------------------------------|
| 2025-01-28 | 1.0     | Initial specification document       |
| 2025-01-28 | 2.0     | Expanded with complete CSS, JS, implementation details |

---

*This document serves as the authoritative reference for implementing the thematic collections design system. All design decisions, component structures, and implementation patterns should be consistent with this specification.*
