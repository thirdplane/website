# Unified Gallery Design Brief

## Executive Summary

The current three-page content architecture (Writings, Works, Vignettes) creates artificial boundaries that fragment a unified creative practice. Content like `latent-space.md` (6-second video + 200-word philosophical essay) exposes this taxonomy failure - it's simultaneously a vignette, a writing, and a work.

**Core Insight:** These are ALL works, just different shapes. A gallery has rooms, not separate buildings.

---

## Problem Statement

### Current Architecture
```
/writings/     → Text-first content (list layout)
/works/        → Visual-first content (masonry grid)
/vignettes/    → Video-first content (grid + lightbox)
```

### Issues Identified

1. **Arbitrary Categorization**
   - User must decide "what type of work is this?" before browsing
   - Hybrid content (video + essay) has no natural home
   - Same creative practice split across three destinations

2. **Navigation Friction**
   - Three nav items competing for attention
   - No unified "see all work" entry point
   - Cross-type discovery requires explicit navigation

3. **Inconsistent Presentation**
   - Writings: Linear list (text-focused)
   - Works: Masonry grid (image-focused)
   - Vignettes: Grid + lightbox (no detail pages)
   - Detail pages exist for writings/works but not vignettes

4. **Metadata Fragmentation**
   - `tags` only on Writings
   - `featured` not on Vignettes
   - `series` only on Vignettes
   - No cross-type relationships

---

## Requirements

### Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | Single entry point to browse all creative work | Must Have |
| FR-2 | Visual distinction between content types without segregation | Must Have |
| FR-3 | Detail pages for ALL content types (including vignettes) | Must Have |
| FR-4 | Filtering/faceting by type (optional, not primary) | Should Have |
| FR-5 | Chronological and featured sorting options | Should Have |
| FR-6 | Cross-type tagging and relationships | Could Have |
| FR-7 | Thematic collections/curation | Could Have |

### Non-Functional Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-1 | Maintain "Neon Noir" visual identity | Must Have |
| NFR-2 | Preserve scroll-reveal animation system | Must Have |
| NFR-3 | Mobile-responsive grid (3→2→1 columns) | Must Have |
| NFR-4 | No JavaScript required for core browsing | Should Have |
| NFR-5 | Accessible (keyboard navigation, screen readers) | Must Have |
| NFR-6 | Fast load time (<2s on 3G) | Should Have |

### Content Requirements

| ID | Requirement | Priority |
|----|-------------|----------|
| CR-1 | Support image-dominant works (projects) | Must Have |
| CR-2 | Support text-dominant works (essays) | Must Have |
| CR-3 | Support video works (vignettes) | Must Have |
| CR-4 | Support hybrid content (video + substantial text) | Must Have |
| CR-5 | Unified frontmatter schema across types | Should Have |

---

## Design Options

### Option A: Single Gallery, Visual Type Distinction

**Concept:** One `/works/` page. All content types in unified masonry grid. Cards adapt visually to content type.

**Card Treatments:**
- **Video works:** Thumbnail with play icon + duration badge, title below
- **Text works:** Taller card with title + excerpt visible, no image required
- **Visual works:** Image-dominant with title + type badge below

**Navigation:**
```
[Works]  →  Single gallery page with all content
```

**Pros:**
- Simplest mental model
- "See all my work" in one place
- Cross-pollination of types
- Reduced navigation complexity

**Cons:**
- Mixed aspect ratios may feel chaotic
- Text-heavy cards compete with visual cards
- No easy way to "just see essays"

**Technical Complexity:** Medium
- Unified collection in Eleventy
- Conditional card templates based on type
- CSS grid that handles mixed aspect ratios

---

### Option B: Timeline/Stream

**Concept:** Chronological feed of all work. Date is primary organization. Type is secondary metadata.

**Layout:**
```
2026-01-03  ─────────────────────────────────
            latent space
            [▶ video thumbnail]
            Essay excerpt visible...

2025-12-15  ─────────────────────────────────
            Synthesis
            [project image]
            Generative art system...
```

**Navigation:**
```
[Journal]  →  Chronological stream of all work
```

**Pros:**
- Shows creative evolution over time
- Blog-like intimacy
- Natural for regular updates
- Simple mental model

**Cons:**
- Recent work dominates
- Hard to browse by interest
- Archive gets buried
- Not portfolio-friendly for clients

**Technical Complexity:** Low
- Single collection sorted by date
- Uniform card treatment
- Simple vertical layout

---

### Option C: Hub + Facets

**Concept:** Unified gallery with optional type filters. Filters are facets, not destinations. Default shows everything.

**Layout:**
```
┌─────────────────────────────────────────────────────────────┐
│  [All]  [Essays]  [Projects]  [Vignettes]     Sort: Recent ▼│
├─────────────────────────────────────────────────────────────┤
│                                                             │
│    Masonry grid of all work                                 │
│    Active filter highlights matching cards                  │
│    Non-matching cards can fade or hide                      │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**Navigation:**
```
[Works]  →  Gallery with filter bar
```

**Filter Behavior Options:**
1. **Fade:** Non-matching cards become translucent
2. **Hide:** Non-matching cards removed, grid reflows
3. **Highlight:** Matching cards get glow/border

**Pros:**
- Best of unified + discoverability
- User controls their experience
- "All" default emphasizes unified practice
- Type filters for focused browsing

**Cons:**
- Requires JavaScript for interactivity
- More complex UI to design
- Filter state management (URL params?)

**Technical Complexity:** Medium-High
- Unified collection
- JavaScript filter logic
- CSS transitions for filter states
- Optional: URL-based filter persistence

---

### Option D: Thematic Collections

**Concept:** Artist-curated groupings by concept/theme. Works can appear in multiple collections. Type is incidental.

**Collections Example:**
```
/collections/ai-futures/
  - latent space (vignette)
  - neural drift (project)
  - "On Prompting" (essay)

/collections/void-studies/
  - synthesis (project)
  - threshold (vignette)
  - designing in the void (essay)

/collections/systems/
  - data mirage (project)
  - echo chamber (project)
```

**Navigation:**
```
[Collections]  →  Grid of collection cards
   └── [Collection Name]  →  Works in that collection
```

**Pros:**
- Most sophisticated curatorial approach
- Works converse across media
- Tells a story about practice
- Artist as curator

**Cons:**
- Requires active curation effort
- Overhead to maintain
- Works without collection feel orphaned
- More pages to manage

**Technical Complexity:** High
- New `collections` content type
- Many-to-many relationships (work ↔ collection)
- Collection index + detail pages
- Works need `collections` array in frontmatter

---

## Comparison Matrix

| Criteria | Option A | Option B | Option C | Option D |
|----------|----------|----------|----------|----------|
| **Unified View** | ★★★★★ | ★★★★★ | ★★★★★ | ★★★☆☆ |
| **Type Discovery** | ★★☆☆☆ | ★☆☆☆☆ | ★★★★★ | ★★☆☆☆ |
| **Technical Effort** | ★★★☆☆ | ★★★★★ | ★★☆☆☆ | ★☆☆☆☆ |
| **Maintenance** | ★★★★★ | ★★★★★ | ★★★★☆ | ★★☆☆☆ |
| **Portfolio Appeal** | ★★★★☆ | ★★☆☆☆ | ★★★★★ | ★★★★★ |
| **Future Flexibility** | ★★★☆☆ | ★★★☆☆ | ★★★★☆ | ★★★★★ |

---

## Unified Frontmatter Schema (Proposed)

```yaml
---
# Required for all types
title: string
date: ISO date (YYYY-MM-DD)
type: "essay" | "project" | "vignette"

# Optional metadata
description: string (<160 chars)
featured: boolean
tags: [array]
series: string

# Type-specific (conditional)
# For projects:
cover: string (image URL)
year: number
github: string
live: string

# For vignettes:
video: string (video URL)
poster: string (thumbnail URL)
duration: string ("0:24")
model: string ("Runway Gen-3")
prompt: string

# For essays:
# (body content is the essay)

# Cross-linking
related: [array of slugs]
collections: [array of collection slugs]
---
```

---

## Success Metrics

1. **Reduced Navigation Complexity**
   - From 3 primary nav items to 1-2
   - Fewer clicks to discover all work

2. **Hybrid Content Support**
   - `latent-space` type content has natural home
   - No forcing content into wrong category

3. **Unified Identity**
   - "See all my work" possible in one view
   - Cross-pollination of content types

4. **Maintained Aesthetics**
   - Scroll-reveal animations preserved
   - Neon Noir visual language intact
   - Mobile-responsive

---

## Next Steps

1. **Review mockups** for each option
2. **User testing** (even informal) on navigation clarity
3. **Select option** based on creative direction
4. **Implementation plan** with phased rollout

---

## Appendix: Current Content Inventory

| Type | Count | Has Detail Page | Has Featured | Has Tags |
|------|-------|-----------------|--------------|----------|
| Writings | 2 | Yes | Yes | Yes |
| Works | 11 | Yes | Yes | No |
| Vignettes | 5 | No (lightbox) | No | No |

**Total unique pieces:** 18

---

*Document created: 2026-01-20*
*Status: Awaiting mockup review*
