# Phase 3: Collections System -- Comprehensive Implementation Plan

**Option D: Thematic Collections**
**Branch:** `feature/content-system`
**Date:** 2026-02-16

This document is the authoritative implementation plan for integrating the thematic collections system into the Eleventy site. Every file, every change, every edge case is documented here.

---

## Table of Contents

- [A. File Inventory](#a-file-inventory)
- [B. Task Breakdown](#b-task-breakdown)
- [C. Frontmatter Migration](#c-frontmatter-migration)
- [D. Eleventy Configuration](#d-eleventy-configuration)
- [E. Template Requirements](#e-template-requirements)
- [F. Navigation Changes](#f-navigation-changes)
- [G. CSS Integration](#g-css-integration)
- [H. Edge Cases & Risks](#h-edge-cases--risks)
- [I. Testing Criteria](#i-testing-criteria)

---

## A. File Inventory

### Files to CREATE (10 files)

| # | Path | Purpose |
|---|------|---------|
| 1 | `collections/collections.json` | Directory data defaults (layout, tags, permalink) |
| 2 | `collections/ai-futures.md` | AI Futures collection definition |
| 3 | `collections/void-studies.md` | Void Studies collection definition |
| 4 | `collections/systems.md` | Systems collection definition |
| 5 | `collections/experiments.md` | Experiments collection definition |
| 6 | `collections/index.njk` | Collections index page (renders `/collections/`) |
| 7 | `_includes/layouts/collection-index.njk` | Layout for the collections index page |
| 8 | `_includes/layouts/collection-detail.njk` | Layout for individual collection detail pages |
| 9 | `_includes/styles/collection-index.css` | Page header + curatorial section styles (index-specific, not in collections.css) |
| 10 | `_includes/styles/collection-detail.css` | Collection header background gradient styles (detail-specific, not in collections.css) |

### Files to MODIFY (19 files)

| # | Path | Changes |
|---|------|---------|
| 1 | `.eleventy.js` | Add `thematicCollections` and `allContent` collections, `worksInCollection`/`accentColors`/`prevNextCollections`/`formatDateShort`/`head` filters, passthrough for `collections/` images |
| 2 | `_data/site.json` | Replace "Works" with "Collections" in `site.nav` array |
| 3 | `_includes/styles/tokens.css` | Add `--spring-card`, `--spring-reveal`, `--border-hover`, `--ink-700` |
| 4 | `works/lumina.md` | Add `collections`, `badgeType`, `excerpt` fields |
| 5 | `works/synthesis.md` | Add `collections`, `badgeType`, `excerpt` fields |
| 6 | `works/void-protocol.md` | Add `collections`, `badgeType`, `excerpt` fields |
| 7 | `works/neural-drift.md` | Add `collections`, `badgeType`, `excerpt` fields |
| 8 | `works/chromatic-pulse.md` | Add `collections`, `badgeType`, `excerpt` fields |
| 9 | `works/echo-chamber.md` | Add `collections`, `badgeType`, `excerpt` fields |
| 10 | `works/phantom-grid.md` | Add `collections`, `badgeType`, `excerpt` fields |
| 11 | `works/signal-decay.md` | Add `collections`, `badgeType`, `excerpt` fields |
| 12 | `works/liminal-space.md` | Add `collections`, `badgeType`, `excerpt` fields |
| 13 | `works/data-mirage.md` | Add `collections`, `badgeType`, `excerpt` fields |
| 14 | `writings/designing-in-the-void.md` | Add `collections`, `badgeType` fields |
| 15 | `writings/latent-space-explorations.md` | Add `collections`, `badgeType` fields |
| 16 | `vignettes/emergence.md` | Add `collections`, `badgeType` fields |
| 17 | `vignettes/dissolution.md` | Add `collections`, `badgeType` fields |
| 18 | `vignettes/threshold.md` | Add `collections`, `badgeType` fields |
| 19 | `vignettes/latent-space.md` | Add `collections`, `badgeType` fields |

### Files that STAY UNCHANGED

| Path | Reason |
|------|--------|
| `_includes/styles/collections.css` | Already production-ready; includes all collection card, work card, type badge, curator's note, and collection nav CSS |
| `_includes/layouts/base.njk` | No changes needed; new layouts extend it |
| `_includes/layouts/work.njk` | Keep as-is; individual work pages still link back to `/works/` |
| `_includes/layouts/writing.njk` | No changes needed |
| `_includes/layouts/vignette.njk` | No changes needed |
| `_includes/components/nav.njk` | No changes needed; already data-driven from `site.nav` |
| `_includes/components/head.njk` | No changes needed; already includes `tokens.css`, `base.css`, `nav.css`, `footer.css` |
| `_includes/components/footer.njk` | No changes needed |
| `works/index.njk` | Existing `/works/` page stays as-is |
| `works/works.json` | No changes needed |
| `writings/index.njk` | Existing `/writings/` page stays as-is |
| `writings/writings.json` | No changes needed |
| `vignettes/index.njk` | Existing `/vignettes/` page stays as-is |
| `vignettes/vignettes.json` | No changes needed |

**Total: 10 new files, 19 modified files, 29 files touched overall.**

---

## B. Task Breakdown

### Task 1: Add `collections` frontmatter to ALL existing content files

**Files touched:** All 16 content markdown files (10 works, 2 writings, 4 vignettes)

**What happens:** Add a `collections` array, a `badgeType` string, and an `excerpt` string (works only -- writings already have `description`) to every frontmatter block. Each piece is assigned to one or more of the 4 collections based on its thematic alignment.

**Dependencies:** None (this is the foundation).

**Acceptance criteria:**
- Every `.md` file in `works/`, `writings/`, and `vignettes/` has a `collections:` array in its frontmatter
- Each item in the array is a valid collection slug: `ai-futures`, `void-studies`, `systems`, or `experiments`
- At least some works appear in multiple collections (demonstrating multi-collection membership)
- No content file is left without at least one collection assignment
- Every file has a `badgeType` matching one of: `essay`, `interface`, `generative`, `writing`, `vignette`, `research`, `project`

---

### Task 2: Create collection definition files

**Files touched:**
- `collections/collections.json` (NEW)
- `collections/ai-futures.md` (NEW)
- `collections/void-studies.md` (NEW)
- `collections/systems.md` (NEW)
- `collections/experiments.md` (NEW)

**What happens:** Create the `collections/` directory with a directory data file and four collection markdown files. Each collection file contains frontmatter defining: `title`, `slug`, `accent`, `order`, `description`, `longDescription`, `curatorNote`, and `mosaic` (4 image paths).

**Dependencies:** None (can be done in parallel with Task 1).

**Acceptance criteria:**
- `collections/collections.json` sets default layout to `collection-detail.njk`, tag to `collection`, and permalink pattern to `/collections/{{ slug }}/`
- Four `.md` files exist with complete frontmatter per the schema in Section 10.1 of the design spec
- `order` values: ai-futures=1, void-studies=2, systems=3, experiments=4
- Accent values match spec: `uv`, `ice`, `gold`, `strobe`
- Mosaic arrays reference placeholder images (picsum or SVG data URIs; real images can come later)

---

### Task 3: Register Eleventy collections, filters, and add missing CSS tokens

**Files touched:**
- `.eleventy.js`
- `_includes/styles/tokens.css`

**What happens:**

In `.eleventy.js`, add:
1. `thematicCollections` collection -- Glob `collections/*.md`, sort by `order` ascending
2. `allContent` collection -- Merge works, writings, and vignettes into a single array sorted by date descending
3. `worksInCollection` filter -- Takes an array + collection slug, returns items where `item.data.collections` includes that slug
4. `accentColors` filter -- Maps accent string to color object
5. `prevNextCollections` filter -- Returns `{prev, next}` with wrapping
6. `formatDateShort` filter -- Formats date as "Mon YYYY" (e.g., "Dec 2024")
7. `head` filter -- Returns first N items from an array
8. Passthrough copy for `collections/**/*.{jpg,jpeg,png,gif,svg,webp}`

In `tokens.css`, add missing variables:
- `--spring-card`
- `--spring-reveal`
- `--border-hover`
- `--ink-700`

**Dependencies:** None (can be done in parallel with Tasks 1 and 2, but must be done before Tasks 4-5).

**Acceptance criteria:**
- `npx @11ty/eleventy --dryrun` succeeds without errors
- `collections.thematicCollections` returns an array of 4 items sorted by order
- `worksInCollection` correctly filters content items by collection slug
- `accentColors` returns correct color objects for all 4 accent values
- `prevNextCollections` wraps correctly (prev of first = last, next of last = first)
- `tokens.css` includes all 4 new variables

---

### Task 4: Create collection index layout and page

**Files touched:**
- `_includes/layouts/collection-index.njk` (NEW)
- `_includes/styles/collection-index.css` (NEW)
- `collections/index.njk` (NEW)

**What happens:**

The **index page** (`collections/index.njk`) sets frontmatter with `title`, `description`, `layout: false`, `permalink: /collections/`.

The **layout** (`collection-index.njk`) extends `layouts/base.njk` and provides:
- `{% block styles %}` including `collections.css` and `collection-index.css`
- `{% block content %}` with page header, collections grid, and curatorial section
- `{% block scripts %}` with scroll reveal JavaScript for collection cards

The **CSS** (`collection-index.css`) contains only styles NOT already in `collections.css`:
- `.page-header`, `.page-header::before`, `.page-header-content`
- `.page-label`, `.page-label::before`
- `.page-title`
- `.page-intro`, `.page-intro em`

HTML structure matches the mockup at `mockups/option-d-collections-index.html` exactly.

**Dependencies:** Tasks 2 and 3 must be complete.

**Acceptance criteria:**
- `/collections/` renders in browser with correct design matching the mockup
- All 4 collection cards appear with correct accent colors
- Work counts are dynamically calculated and correct
- Collection cards link to `/collections/{slug}/`
- Scroll reveal animation works (cards fade in on scroll)
- Curatorial section renders at bottom
- Reduced-motion preference is respected

---

### Task 5: Create collection detail layout

**Files touched:**
- `_includes/layouts/collection-detail.njk` (NEW)
- `_includes/styles/collection-detail.css` (NEW)

**What happens:**

The layout extends `layouts/base.njk` and provides:
- `{% block styles %}` including `collections.css` and `collection-detail.css`
- Sets `data-collection-accent="{{ accent }}"` on a wrapper element to activate CSS custom property theming from `collections.css`
- Collection header with back link, meta row, title, long description, curator's note
- Works grid iterating filtered works for this collection
- Work cards with type badges, thumbnails, titles, excerpts, dates
- Prev/next collection navigation at bottom

HTML structure matches the mockup at `mockups/option-d-collection-detail.html` exactly.

**Dependencies:** Tasks 1, 2, and 3 must be complete.

**Acceptance criteria:**
- `/collections/ai-futures/` (and all 4 collection detail pages) render correctly
- `data-collection-accent` attribute sets the correct CSS custom properties
- Back link points to `/collections/`
- Work count is accurate
- Works grid shows all content items assigned to this collection
- Type badges display with correct colors per data-type
- Work cards link to correct individual work/writing/vignette detail pages
- Prev/next navigation works correctly and wraps
- Center-out scroll reveal animation works
- Reduced-motion preference is respected

---

### Task 6: Update site navigation

**Files touched:** `_data/site.json`

**What happens:** Replace "Works" with "Collections" in the nav array.

**Dependencies:** None (can be done early, but should be coordinated with Task 4).

**Acceptance criteria:**
- Nav renders with "Collections" link
- "Collections" shows `nav-link--active` class when on any `/collections/*` page
- Existing `/works/`, `/writings/`, `/vignettes/` pages remain accessible at their URLs

---

### Task 7: Build verification and end-to-end testing

**Files touched:** None (testing only).

**What happens:** Run the full Eleventy build and verify all pages per Section I criteria.

**Dependencies:** All previous tasks.

**Acceptance criteria:** See [Section I](#i-testing-criteria).

---

## C. Frontmatter Migration

### Fields to add to existing content files

Every work, writing, and vignette markdown file needs:

```yaml
collections:
  - slug-1
  - slug-2  # optional, for multi-collection membership
badgeType: "generative"  # essay | interface | generative | writing | vignette | research | project
```

Works also need an `excerpt` field (writings already have `description`, which serves as the excerpt):

```yaml
excerpt: "One to two sentence description for the work card."
```

### Example 1: `works/lumina.md`

**Current frontmatter:**
```yaml
---
title: "Lumina"
type: "Brand Identity"
year: 2024
github: https://github.com/thirdplane/lumina
live: https://lumina.example.com
cover: /assets/works/lumina/cover.jpg
featured: true
---
```

**Updated frontmatter:**
```yaml
---
title: "Lumina"
type: "Brand Identity"
year: 2024
github: https://github.com/thirdplane/lumina
live: https://lumina.example.com
cover: /assets/works/lumina/cover.jpg
featured: true
collections:
  - systems
badgeType: "interface"
excerpt: "A comprehensive brand identity system designed for an AI-powered creative tools platform."
---
```

### Example 2: `works/neural-drift.md`

**Current frontmatter:**
```yaml
---
title: "Neural Drift"
type: "AI Experiment"
year: 2024
cover: https://picsum.photos/seed/neuraldrift/1200/675
featured: false
---
```

**Updated frontmatter:**
```yaml
---
title: "Neural Drift"
type: "AI Experiment"
year: 2024
cover: https://picsum.photos/seed/neuraldrift/1200/675
featured: false
collections:
  - ai-futures
  - experiments
badgeType: "generative"
excerpt: "A meditation on machine perception using fine-tuned diffusion models, generating landscapes in the liminal space between recognition and abstraction."
---
```

### Example 3: `writings/designing-in-the-void.md`

**Current frontmatter:**
```yaml
---
title: Designing in the Void
date: 2025-01-15
description: On the practice of creating from nothing...
tags:
  - Design
  - Process
  - Philosophy
---
```

**Updated frontmatter:**
```yaml
---
title: Designing in the Void
date: 2025-01-15
description: On the practice of creating from nothing — embracing uncertainty as a design methodology.
tags:
  - Design
  - Process
  - Philosophy
collections:
  - void-studies
badgeType: "essay"
---
```

### Example 4: `vignettes/emergence.md`

**Current frontmatter:**
```yaml
---
title: "Emergence"
date: 2025-01-15
prompt: "Particle system coalescing into humanoid form..."
model: "Runway Gen-3"
video: https://res.cloudinary.com/thirdplane/video/upload/f_auto/vignettes/emergence
poster: https://res.cloudinary.com/thirdplane/video/upload/so_2/vignettes/emergence.jpg
duration: "0:24"
series: "Void Studies"
---
```

**Updated frontmatter:**
```yaml
---
title: "Emergence"
date: 2025-01-15
prompt: "Particle system coalescing into humanoid form..."
model: "Runway Gen-3"
video: https://res.cloudinary.com/thirdplane/video/upload/f_auto/vignettes/emergence
poster: https://res.cloudinary.com/thirdplane/video/upload/so_2/vignettes/emergence.jpg
duration: "0:24"
series: "Void Studies"
collections:
  - void-studies
  - experiments
badgeType: "vignette"
---
```

### Complete collection assignments for ALL content

| Content File | Collections | Badge Type |
|---|---|---|
| `works/lumina.md` | systems | interface |
| `works/synthesis.md` | ai-futures, systems | generative |
| `works/void-protocol.md` | void-studies | interface |
| `works/neural-drift.md` | ai-futures, experiments | generative |
| `works/chromatic-pulse.md` | experiments | generative |
| `works/echo-chamber.md` | systems, experiments | interface |
| `works/phantom-grid.md` | systems | research |
| `works/signal-decay.md` | void-studies, experiments | generative |
| `works/liminal-space.md` | void-studies, experiments | interface |
| `works/data-mirage.md` | systems, ai-futures | generative |
| `writings/designing-in-the-void.md` | void-studies | essay |
| `writings/latent-space-explorations.md` | ai-futures | essay |
| `vignettes/emergence.md` | void-studies, experiments | vignette |
| `vignettes/dissolution.md` | void-studies, experiments | vignette |
| `vignettes/threshold.md` | void-studies, experiments | vignette |
| `vignettes/latent-space.md` | ai-futures, experiments | vignette |

**Resulting collection counts:**
- **AI Futures:** 5 items (synthesis, neural-drift, data-mirage, latent-space-explorations, latent-space)
- **Void Studies:** 7 items (void-protocol, signal-decay, liminal-space, designing-in-the-void, emergence, dissolution, threshold)
- **Systems:** 5 items (lumina, synthesis, echo-chamber, phantom-grid, data-mirage)
- **Experiments:** 9 items (neural-drift, chromatic-pulse, echo-chamber, signal-decay, liminal-space, emergence, dissolution, threshold, latent-space)

---

## D. Eleventy Configuration

### Collections to register

```javascript
// Thematic collections (the collection definitions themselves)
eleventyConfig.addCollection("thematicCollections", function(collectionApi) {
  return collectionApi.getFilteredByGlob("collections/*.md")
    .sort((a, b) => (a.data.order || 999) - (b.data.order || 999));
});

// All content items (works + writings + vignettes) for cross-collection filtering
eleventyConfig.addCollection("allContent", function(collectionApi) {
  const works = collectionApi.getFilteredByGlob("works/**/*.md");
  const writings = collectionApi.getFilteredByGlob("writings/**/*.md");
  const vignettes = collectionApi.getFilteredByGlob("vignettes/**/*.md");
  return [...works, ...writings, ...vignettes].sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date) : new Date((a.data.year || 2020) + '-01-01');
    const dateB = b.data.date ? new Date(b.data.date) : new Date((b.data.year || 2020) + '-01-01');
    return dateB - dateA;
  });
});
```

### Filters to add

```javascript
// Filter content items by collection slug
eleventyConfig.addFilter("worksInCollection", function(allContent, collectionSlug) {
  return allContent.filter(item =>
    item.data.collections && item.data.collections.includes(collectionSlug)
  ).sort((a, b) => {
    const dateA = a.data.date ? new Date(a.data.date) : new Date((a.data.year || 2020) + '-01-01');
    const dateB = b.data.date ? new Date(b.data.date) : new Date((b.data.year || 2020) + '-01-01');
    return dateB - dateA;
  });
});

// Get accent color values for a collection
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

// Get prev/next collections for navigation (wrapping)
eleventyConfig.addFilter("prevNextCollections", function(collectionsArray, currentSlug) {
  const index = collectionsArray.findIndex(c => c.data.slug === currentSlug);
  const total = collectionsArray.length;
  return {
    prev: collectionsArray[(index - 1 + total) % total],
    next: collectionsArray[(index + 1) % total]
  };
});

// Short date format: "Dec 2024"
eleventyConfig.addFilter("formatDateShort", function(date, year) {
  if (date) {
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }
  if (year) return String(year);
  return "";
});

// Head filter: return first N items from array
eleventyConfig.addFilter("head", function(array, n) {
  if (!Array.isArray(array)) return [];
  return array.slice(0, n);
});
```

### Passthrough copies to add

```javascript
eleventyConfig.addPassthroughCopy("collections/**/*.{jpg,jpeg,png,gif,svg,webp}");
```

### CSS tokens to add to `_includes/styles/tokens.css`

```css
/* Add to :root block */
--ink-700: #1E2028;
--border-hover: rgba(214, 230, 255, 0.24);
--spring-card: 350ms linear(0, 0.3667, 0.8271, 1.0379, 1.0652, 1.0332, 1.006, 0.9961, 0.996, 0.9984, 0.9999, 1);
--spring-reveal: 700ms linear(0, 0.1737, 0.5211, 0.8491, 1.0647, 1.1552, 1.1532, 1.1043, 1.0466, 1.0024, 0.979, 0.9735, 0.979, 0.9883, 0.9968, 1.0021, 1.0042, 1.004, 1.0026, 1.0011, 1, 0.9994, 1);
```

---

## E. Template Requirements

### Collection Index Page (`collections/index.njk`)

```nunjucks
---
title: Collections
description: Curated collections of work exploring AI futures, void aesthetics, systems thinking, and experimental forms.
layout: false
permalink: /collections/
---

{% extends "layouts/collection-index.njk" %}
```

### Collection Index Layout (`_includes/layouts/collection-index.njk`)

```nunjucks
{% extends "layouts/base.njk" %}

{% block styles %}
<style>
{% include "styles/collections.css" %}
{% include "styles/collection-index.css" %}
</style>
{% endblock %}

{% block content %}
<main>
  <!-- Page Header -->
  <header class="page-header">
    <div class="container">
      <div class="page-header-content">
        <span class="page-label">Curated</span>
        <h1 class="page-title">Collections</h1>
        <p class="page-intro">
          Thematic groupings that trace threads across different mediums and moments.
          Each collection represents a <em>sustained inquiry</em> — a question I keep returning to.
        </p>
      </div>
    </div>
  </header>

  <!-- Collections Grid -->
  <section class="collections-section">
    <div class="container">
      <div class="collections-grid">
        {% for collection in collections.thematicCollections %}
        {% set collectionWorks = collections.allContent | worksInCollection(collection.data.slug) %}
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
              <span class="collection-count">{{ collectionWorks.length }} work{{ 's' if collectionWorks.length != 1 }}</span>
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
        {% endfor %}
      </div>
    </div>
  </section>

  <!-- Curatorial Note -->
  <section class="curatorial-section">
    <div class="container">
      <div class="curatorial-content">
        <span class="curatorial-label">Curatorial Note</span>
        <div class="curatorial-text">
          <p>
            These collections are <em>living arrangements</em> — they grow and shift as new work emerges
            and old work reveals new connections. A piece might belong to multiple collections,
            or migrate between them as my understanding deepens.
          </p>
          <p>
            The boundaries between categories have always felt artificial to me. An essay about AI
            is also a meditation on void. A data visualization is also an aesthetic experiment.
            These collections honor that multiplicity.
          </p>
          <div class="curatorial-signature">
            — J, Third Plane Studios
          </div>
        </div>
      </div>
    </div>
  </section>
</main>
{% endblock %}

{% block scripts %}
<script>
(function() {
  'use strict';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll('.collection-card');
  if (prefersReducedMotion) {
    cards.forEach(card => card.classList.add('revealed'));
  } else {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const index = Array.from(cards).indexOf(card);
          const delay = index * 120;
          setTimeout(() => { card.classList.add('revealed'); }, delay);
          observer.unobserve(card);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    cards.forEach(card => observer.observe(card));
  }
})();
</script>
{% endblock %}
```

### Collection Detail Layout (`_includes/layouts/collection-detail.njk`)

```nunjucks
{% extends "layouts/base.njk" %}

{% block styles %}
<style>
{% include "styles/collections.css" %}
{% include "styles/collection-detail.css" %}
</style>
{% endblock %}

{% block content %}
<main data-collection-accent="{{ accent }}">
  <!-- Collection Header -->
  <header class="collection-header">
    <div class="container">
      <div class="collection-header-content">
        <a href="/collections/" class="back-link">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          All Collections
        </a>

        {% set collectionWorks = collections.allContent | worksInCollection(slug) %}

        <div class="collection-meta-row">
          <span class="collection-accent-dot"></span>
          <span class="collection-label">Collection</span>
          <span class="collection-count">{{ collectionWorks.length }} work{{ 's' if collectionWorks.length != 1 }}</span>
        </div>

        <h1 class="collection-title">{{ title }}</h1>

        <p class="collection-description">
          {{ longDescription or description }}
        </p>

        {% if curatorNote %}
        <div class="curator-note">
          <div class="curator-note-header">
            <svg class="curator-note-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
            </svg>
            <span class="curator-note-label">Curator's Note</span>
          </div>
          <p class="curator-note-text">{{ curatorNote }}</p>
        </div>
        {% endif %}
      </div>
    </div>
  </header>

  <!-- Works Grid -->
  <section class="works-section">
    <div class="container">
      <div class="works-grid">
        {% for work in collectionWorks %}
        <a href="{{ work.url }}" class="work-card" data-index="{{ loop.index0 }}">
          <div class="work-media">
            <span class="work-type-badge" data-type="{{ work.data.badgeType or 'project' }}">
              <span class="type-dot"></span>
              {{ work.data.badgeType or work.data.type or 'Project' }}
            </span>
            {% if work.data.cover or work.data.poster %}
            <img
              src="{{ work.data.cover or work.data.poster }}"
              alt="{{ work.data.title }}"
              loading="{% if loop.index0 < 3 %}eager{% else %}lazy{% endif %}"
              decoding="async"
            >
            {% else %}
            <div style="width:100%;aspect-ratio:4/3;background:var(--ink-850);"></div>
            {% endif %}
          </div>
          <div class="work-meta">
            <h3 class="work-title">{{ work.data.title }}</h3>
            <p class="work-excerpt">{{ work.data.excerpt or work.data.description or '' }}</p>
            <span class="work-date">{{ work.data.date | formatDateShort(work.data.year) }}</span>
          </div>
        </a>
        {% endfor %}
      </div>
    </div>
  </section>

  <!-- Collection Navigation (Prev/Next) -->
  {% set navData = collections.thematicCollections | prevNextCollections(slug) %}
  {% set prevWorks = collections.allContent | worksInCollection(navData.prev.data.slug) %}
  {% set nextWorks = collections.allContent | worksInCollection(navData.next.data.slug) %}

  <section class="collection-nav">
    <div class="container">
      <div class="collection-nav-inner">
        <a href="/collections/{{ navData.prev.data.slug }}/" class="collection-nav-link collection-nav-link--prev">
          <span class="nav-link-direction">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Previous Collection
          </span>
          <span class="nav-link-title">{{ navData.prev.data.title }}</span>
          <span class="nav-link-count">{{ prevWorks.length }} works</span>
        </a>

        <a href="/collections/{{ navData.next.data.slug }}/" class="collection-nav-link collection-nav-link--next">
          <span class="nav-link-direction">
            Next Collection
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
          <span class="nav-link-title">{{ navData.next.data.title }}</span>
          <span class="nav-link-count">{{ nextWorks.length }} works</span>
        </a>
      </div>
    </div>
  </section>
</main>
{% endblock %}

{% block scripts %}
<script>
(function() {
  'use strict';
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
          const grid = card.parentElement;
          const gridStyles = getComputedStyle(grid);
          const columns = gridStyles.gridTemplateColumns.split(' ').length;
          const getRevealOrder = (cols) => {
            if (cols === 3) return [1, 0, 2];
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
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    cards.forEach((card, i) => {
      card.dataset.index = i;
      observer.observe(card);
    });
  }
})();
</script>
{% endblock %}
```

### Prev/Next navigation behavior

The prev/next navigation is between **collections** (not between individual works within a collection). It wraps circularly:

| Collection | Prev | Next |
|---|---|---|
| AI Futures (1) | Experiments (4) | Void Studies (2) |
| Void Studies (2) | AI Futures (1) | Systems (3) |
| Systems (3) | Void Studies (2) | Experiments (4) |
| Experiments (4) | Systems (3) | AI Futures (1) |

The prev/next hover colors are hardcoded in `collections.css` (prev = ice, next = gold), matching the mockup.

---

## F. Navigation Changes

### Changes to `_data/site.json`

**From:**
```json
"nav": [
  { "title": "Works", "url": "/works/" },
  { "title": "Writings", "url": "/writings/" },
  { "title": "Vignettes", "url": "/vignettes/" }
]
```

**To:**
```json
"nav": [
  { "title": "Collections", "url": "/collections/" },
  { "title": "Writings", "url": "/writings/" },
  { "title": "Vignettes", "url": "/vignettes/" }
]
```

### Changes to `_includes/components/nav.njk`

**No changes needed.** The nav component is already fully data-driven. It iterates `site.nav` and applies `nav-link--active` based on URL prefix matching:

```nunjucks
{% if page.url == item.url or (page.url and page.url.startsWith(item.url | replace('.html', '/'))) %}
```

This means `/collections/ai-futures/` will match the `startsWith('/collections/')` check and correctly show the active state on the "Collections" nav link.

### Do existing pages stay?

**Yes.** The `/works/`, `/writings/`, and `/vignettes/` pages all remain fully functional at their current URLs. They are simply no longer all in the primary nav (works is replaced by collections). Users can still access them via direct URL, and individual work/writing/vignette detail pages still have back links pointing to their respective listing pages.

---

## G. CSS Integration

### How `collections.css` gets included

The existing `_includes/styles/collections.css` file is already production-ready and complete. It gets included via Nunjucks `{% include %}` inside `<style>` blocks, following the same pattern used by all other layouts:

```nunjucks
{% block styles %}
<style>
{% include "styles/collections.css" %}
{% include "styles/collection-index.css" %}
</style>
{% endblock %}
```

This is **inline CSS** (included at build time), NOT a linked stylesheet. The existing passthrough copy for `_includes/styles` in `.eleventy.js` copies CSS files to `_site/_includes/styles/` but that path is not used for linking -- it is for the `{% include %}` directive.

### New CSS files needed

**`_includes/styles/collection-index.css`** -- Contains styles that appear in the index mockup but are NOT in `collections.css`:
- `.page-header` (padding: 160px 0 80px, position: relative)
- `.page-header::before` (radial gradient background with UV and ice tints)
- `.page-header-content` (max-width: 720px, z-index: 1)
- `.page-label` (JetBrains Mono, 11px, uppercase, ice-400 color, line prefix via ::before)
- `.page-title` (Space Grotesk, clamp(42px, 8vw, 64px), -0.04em tracking)
- `.page-intro` (Inter, 18px, text-400 color, max-width: 560px)
- `.page-intro em` (text-200, font-style: normal)

**`_includes/styles/collection-detail.css`** -- Minimal or potentially empty. After thorough review, `collections.css` already contains ALL detail page styles:
- `.back-link` and hover states
- `.collection-header` with `::before` using `var(--collection-accent-dim)` (set by `[data-collection-accent]`)
- `.collection-header-content`, `.collection-meta-row`, `.collection-accent-dot`, `.collection-label`
- `.collection-header .collection-title`, `.collection-header .collection-description`
- `.curator-note` and all sub-elements
- `.works-section`, `.works-grid` responsive styles
- `.work-card`, `.work-media`, `.work-type-badge`, `.type-dot`, `.work-meta`, `.work-title`, `.work-excerpt`, `.work-date`
- `.collection-nav` and all sub-elements
- `[data-collection-accent]` selectors for all 4 themes
- Reduced-motion styles

This file may end up containing only a CSS comment and no actual rules if truly nothing is missing.

### Potential CSS conflicts

**Class name collision: `.works-section`, `.works-grid`, `.work-card`, `.work-media`, `.work-meta`, `.work-title`**

These class names appear in both `_includes/styles/works-grid.css` (used by `works/index.njk`) and `_includes/styles/collections.css` (used by collection detail pages). The two files define slightly different styles for the same class names.

**This is NOT a problem** because the two CSS files are never loaded on the same page. `works/index.njk` includes `works-grid.css`, while collection detail pages include `collections.css`. Eleventy inlines CSS via `{% include %}`, so there is no global stylesheet conflict.

**`.back-link` class reuse:** `collections.css` defines `.back-link` styles. The existing layouts (`work.njk`, `writing.njk`, `vignette.njk`) also use `.back-link` but with their own CSS. Since these are different pages loading different CSS, there is no conflict.

### CSS variables required by `collections.css`

The following variables are referenced in `collections.css` and must exist in `tokens.css`:

| Variable | Status | Action |
|---|---|---|
| `--spring-card` | **MISSING** from tokens.css | Add to tokens.css |
| `--spring-reveal` | **MISSING** from tokens.css | Add to tokens.css |
| `--border-hover` | **MISSING** from tokens.css | Add to tokens.css |
| `--ink-700` | **MISSING** from tokens.css | Add to tokens.css |
| `--spring-hover` | Present in tokens.css | No action |
| `--spring-stagger` | Present in tokens.css | No action |
| `--transition-fast` | Present in tokens.css | No action |
| `--transition-medium` | Present in tokens.css | No action |
| `--glow-uv`, `--glow-ice`, `--glow-red`, `--glow-gold` | Present in tokens.css | No action |
| `--ink-950`, `--ink-900`, `--ink-850`, `--ink-800` | Present in tokens.css | No action |
| `--font-mono`, `--font-display`, `--font-primary` | Present in tokens.css | No action |
| `--collection-accent`, etc. | Set by `[data-collection-accent]` in collections.css | No action |

---

## H. Edge Cases & Risks

### What happens if a work belongs to no collection?

The work still exists at its individual URL (e.g., `/works/lumina/`) and appears on the `/works/` index page. It simply does not appear on any collection detail page. The plan ensures every content file gets at least one collection assignment, so this should not happen after migration. The system gracefully handles it -- nothing breaks; the `worksInCollection` filter safely excludes it.

### What happens if a collection has 0 works?

The collection detail page renders with an empty works grid. The count shows "0 works". This is not visually ideal but is not broken. The plan ensures every collection has at least 4 works, so this should not happen in practice.

### Do existing `/works/`, `/writings/`, `/vignettes/` pages stay?

**Yes, all three listing pages and all individual detail pages remain exactly as they are.** Nothing is deleted or changed about the existing type-based pages. The collections system is an additive overlay that provides a new organizational view.

### What about existing detail pages for individual works?

**They stay as-is.** The `works/works.json` still sets `layout: work.njk` for all works. The individual work detail pages (e.g., `/works/lumina/`) continue to use the `work.njk` layout which links back to `/works/`. Work cards on collection detail pages link to these same individual work pages.

**Future improvement (out of scope for Phase 3):** In a future phase, the individual work page back-link could be contextual (linking back to the collection the user came from, using a query parameter or referrer check). For now, it always links to `/works/`.

### Permalink collision risk

The `collections/collections.json` sets permalink to `/collections/{{ slug }}/`. The `collections/index.njk` sets permalink to `/collections/`. These are distinct paths and do not collide. Eleventy will generate:
- `_site/collections/index.html`
- `_site/collections/ai-futures/index.html`
- `_site/collections/void-studies/index.html`
- `_site/collections/systems/index.html`
- `_site/collections/experiments/index.html`

### `collections` frontmatter field name vs Eleventy `collections` object

In Nunjucks templates, `collections` refers to the Eleventy collections object (e.g., `collections.works`). In frontmatter, we are adding a `collections` field to content files. These do NOT conflict:
- Eleventy collections: accessed as `collections.thematicCollections` (global)
- Frontmatter field: accessed as `item.data.collections` (per-page data)

**Important:** The collection definition `.md` files (`ai-futures.md`, etc.) should NOT have a `collections` frontmatter field themselves. The `collections` array is only on content items (works, writings, vignettes).

### Image paths for mosaic thumbnails

For initial implementation, use picsum placeholder images with deterministic seeds per collection. Real images can be swapped in later by updating the `mosaic` array in each collection's frontmatter.

### Nunjucks `head` filter

Nunjucks does not have a built-in `head` filter. Eleventy does not ship one by default. The plan includes adding a `head` filter in `.eleventy.js` for template convenience:
```javascript
eleventyConfig.addFilter("head", (arr, n) => arr.slice(0, n));
```

### Writings without `cover` image

Writings (`designing-in-the-void.md`, `latent-space-explorations.md`) do not have a `cover` or `poster` field. When they appear in a collection's work card, the template falls back to a placeholder div:
```nunjucks
{% if work.data.cover or work.data.poster %}
  <img ...>
{% else %}
  <div style="width:100%;aspect-ratio:4/3;background:var(--ink-850);"></div>
{% endif %}
```

### Vignettes linking behavior

Vignette detail pages exist at `/vignettes/{slug}/` and their current listing page uses GLightbox for inline video playback. When a vignette appears in a collection, the work card links to the vignette's individual page URL (e.g., `/vignettes/emergence/`). This is correct behavior.

---

## I. Testing Criteria

### Build verification

1. Run `npx @11ty/eleventy` -- build must complete with zero errors
2. Verify output directory `_site/collections/` exists and contains:
   - `index.html`
   - `ai-futures/index.html`
   - `void-studies/index.html`
   - `systems/index.html`
   - `experiments/index.html`
3. Verify existing pages still build: `_site/works/index.html`, `_site/writings/index.html`, `_site/vignettes/index.html`, and all individual detail pages

### Page rendering verification

4. Open `/collections/` in browser -- verify:
   - Page header with "Curated" label, "Collections" title, intro text renders
   - All 4 collection cards render with correct titles, descriptions, accent dots
   - Work counts are dynamically correct (AI Futures: 5, Void Studies: 7, Systems: 5, Experiments: 9)
   - Scroll reveal animation triggers on scroll
   - Collection cards link to correct detail pages
   - Curatorial section renders at bottom with signature

5. Open `/collections/ai-futures/` (and each detail page) -- verify:
   - Back link to `/collections/` works
   - Accent dot, "Collection" label, work count render
   - Title and long description render
   - Curator's note card renders with pen icon
   - `data-collection-accent` attribute sets correct CSS variables (check via DevTools: `--collection-accent` should be the correct color)
   - Works grid shows correct items with correct type badges
   - Work cards link to correct individual work/writing/vignette pages
   - Center-out scroll reveal animation works
   - Prev/next navigation shows correct adjacent collections
   - Prev/next links work and correctly wrap

### Navigation verification

6. Click "Collections" in nav -- active state shows correctly
7. Navigate to a collection detail page -- "Collections" nav link still shows active state
8. Navigate from collection detail to individual work page -- work page renders correctly with its own back link to `/works/`
9. Prev/next collection navigation wraps correctly (Experiments -> AI Futures, AI Futures -> Experiments)
10. All existing pages (`/works/`, `/writings/`, `/vignettes/` and their detail pages) continue to work and are accessible via direct URL

### Responsive verification

11. Test at mobile (375px), tablet (768px), and desktop (1200px+):
    - Collections grid: 1col mobile, 2col tablet+
    - Works grid: 1col mobile, 2col tablet, 3col desktop
    - Collection nav: stacked on mobile, side-by-side on desktop
    - Page padding: 24px mobile, 48px tablet+

### Accessibility verification

12. Enable `prefers-reduced-motion: reduce` -- all cards appear immediately (no animation)
13. Tab through page -- focus-visible outlines appear on interactive elements (2px solid ice-400)
14. Verify semantic HTML: `<header>`, `<main>`, `<section>`, `<nav>`, `<footer>` used correctly
15. Mosaic images have `alt=""` (decorative)
16. Work images have descriptive alt text (the work title)

---

## Appendix: `collections/collections.json` Schema

```json
{
  "layout": "collection-detail.njk",
  "tags": ["collection"],
  "permalink": "/collections/{{ slug }}/"
}
```

## Appendix: Collection Definition Schema

```yaml
---
title: "AI Futures"           # Display title
slug: "ai-futures"            # URL slug (must match filename)
accent: "uv"                  # Color theme: uv | ice | gold | strobe
order: 1                      # Sort order on index (lower = first)
description: "Short desc"     # <200 chars, for index card
longDescription: "Long desc"  # For detail page header (supports <em> in template)
curatorNote: "Personal note"  # Editorial note for detail page
mosaic:                        # 4 image paths for 2x2 thumbnail grid
  - /path/to/thumb-1.jpg
  - /path/to/thumb-2.jpg
  - /path/to/thumb-3.jpg
  - /path/to/thumb-4.jpg
---
```

---

*This document serves as the authoritative reference for implementing Phase 3 of the collections system. All implementation decisions should be consistent with this plan.*
