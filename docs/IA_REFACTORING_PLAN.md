# IA Refactoring Plan: About, Thoughts & Navigation

**Branch:** `feature/content-system`
**Date:** 2026-02-18

This document is the authoritative implementation plan for refactoring the site's information architecture: adding an About page, renaming Writings to Thoughts (with URL changes), updating the global navigation, and fixing the homepage's hardcoded nav links. Every file, every change, every edge case is documented here.

---

## Table of Contents

- [A. File Inventory](#a-file-inventory)
- [B. Task Breakdown](#b-task-breakdown)
- [C. About Page Specification](#c-about-page-specification)
- [D. Writings-to-Thoughts Rename Specification](#d-writings-to-thoughts-rename-specification)
- [E. Homepage Fix](#e-homepage-fix)
- [F. Navigation Changes](#f-navigation-changes)
- [G. CSS Specification](#g-css-specification)
- [H. Edge Cases & Risks](#h-edge-cases--risks)
- [I. Testing Criteria](#i-testing-criteria)

---

## A. File Inventory

### Files to CREATE (3 files)

| # | Path | Purpose |
|---|------|---------|
| 1 | `about/index.njk` | About page content (frontmatter + extends layout) |
| 2 | `_includes/layouts/about.njk` | About page layout (extends base.njk) |
| 3 | `_includes/styles/about.css` | About page styles (adapted from Option B timeline mockup) |

### Files to MODIFY (5 files)

| # | Path | Changes |
|---|------|---------|
| 1 | `_data/site.json` | Replace nav array: Collections, Thoughts, About |
| 2 | `index.html` | Update hardcoded nav links from Works/Writings/Vignettes to Collections/Thoughts/About |
| 3 | `writings/writings.json` | Add `permalink` override to remap all writing detail pages from `/writings/slug/` to `/thoughts/slug/` |
| 4 | `writings/index.njk` | Update title, section label, permalink, and description to use "Thoughts" instead of "Writings"; permalink changes to `/thoughts/` |
| 5 | `_includes/layouts/writing.njk` | Update back-link href from `/writings/` to `/thoughts/` and back-link text from "Writings" to "Thoughts" |

### Files that STAY UNCHANGED

| Path | Reason |
|------|--------|
| `_includes/layouts/base.njk` | New layouts extend it; no changes needed |
| `_includes/components/nav.njk` | Already data-driven from `site.nav`; URL prefix matching handles new routes |
| `_includes/components/head.njk` | No changes needed; includes tokens.css, base.css, nav.css, footer.css |
| `_includes/components/footer.njk` | No changes needed; already pulls email/social from site.json |
| `_includes/styles/tokens.css` | All required tokens already present from Phase 3 |
| `_includes/styles/collections.css` | No changes needed |
| `_includes/layouts/collection-index.njk` | No changes needed |
| `_includes/layouts/collection-detail.njk` | No changes needed |
| `_includes/layouts/work.njk` | No changes needed |
| `_includes/layouts/vignette.njk` | No changes needed |
| `.eleventy.js` | No changes needed; `allContent` collection already exists; writings collection glob still matches `writings/**/*.md` regardless of permalink override |
| `writings/designing-in-the-void.md` | Content stays in `writings/` folder; permalink override in `writings.json` handles URL remapping |
| `writings/latent-space-explorations.md` | Same as above |
| All content files (`works/*.md`, `vignettes/*.md`) | No changes needed |
| All collection files (`collections/*.md`, `collections/index.njk`) | No changes needed |

**Total: 3 new files, 5 modified files, 8 files touched overall.**

---

## B. Task Breakdown

### Task 1: Update site navigation data

**Files touched:** `_data/site.json`

**What happens:** Replace the current nav array with the new three-item navigation: Collections, Thoughts, About.

**Dependencies:** None (this is the foundation).

**Acceptance criteria:**
- `site.json` nav array contains exactly 3 items: Collections (`/collections/`), Thoughts (`/thoughts/`), About (`/about/`)
- All existing non-nav fields in site.json (name, url, tagline, email, social, copyright) remain unchanged
- The Eleventy build succeeds without errors after this change

---

### Task 2: Fix homepage hardcoded navigation

**Files touched:** `index.html`

**What happens:** Replace the three hardcoded `<a>` elements in the `.nav-links` div with links matching the new nav structure. The homepage is a standalone static HTML file that does not use the Eleventy nav component, so its navigation must be updated manually.

**Dependencies:** Task 1 (nav structure must be decided first).

**Acceptance criteria:**
- Homepage nav shows "Collections", "Thoughts", "About" links
- Links point to `/collections/`, `/thoughts/`, `/about/` respectively
- No other changes to index.html (hero, void section, WebGL animation, footer all stay as-is)
- Homepage loads in browser with correct nav links

---

### Task 3: Rename Writings to Thoughts (URL remapping)

**Files touched:**
- `writings/writings.json` (MODIFY)
- `writings/index.njk` (MODIFY)
- `_includes/layouts/writing.njk` (MODIFY)

**What happens:** Remap all writing content from `/writings/` URLs to `/thoughts/` URLs. The physical folder stays as `writings/` (see rationale in [Section D](#d-writings-to-thoughts-rename-specification)), but all user-facing URLs, page titles, labels, and back-links change to "Thoughts".

**Dependencies:** Task 1 (nav data must reference `/thoughts/`).

**Acceptance criteria:**
- The writings index page renders at `/thoughts/` (not `/writings/`)
- Individual writing detail pages render at `/thoughts/slug/` (e.g., `/thoughts/designing-in-the-void/`)
- The page title on the index says "Thoughts" (not "Writings")
- The section label on the index says "// THOUGHTS"
- Back-links on detail pages say "Thoughts" and point to `/thoughts/`
- The old `/writings/` URL no longer resolves (Eleventy no longer generates `_site/writings/index.html`)
- The Eleventy `writings` collection in `.eleventy.js` still works correctly (the glob `writings/**/*.md` still matches since the physical folder is unchanged)
- The `allContent` collection still includes writings and sorts them correctly
- Timeline entries on the About page link to `/thoughts/slug/` (this happens automatically since `item.url` reflects the permalink override)

---

### Task 4: Create About page layout and styles

**Files touched:**
- `_includes/layouts/about.njk` (NEW)
- `_includes/styles/about.css` (NEW)

**What happens:** Create the About page layout extending `base.njk` and the CSS stylesheet adapted from the Option B timeline mockup. The layout includes four sections: Practice Statement, The Human, Timeline, and Colophon. The timeline uses the `allContent` Eleventy collection. There is no contact CTA or contact section on the About page.

**Dependencies:** None for file creation; Task 1 must be done for nav to render correctly.

**Acceptance criteria:**
- Layout extends `base.njk` following the same pattern as `collection-index.njk`
- CSS includes `<style>{% include "styles/about.css" %}</style>` in `{% block styles %}`
- Practice statement section renders with large display type and mono label
- Human section renders with curatorial-style text
- Timeline section renders all items from `collections.allContent` in reverse chronological order
- Timeline entries are grouped by month/year with date markers
- Each timeline entry shows: type badge, title, date, collection accent dots, and links to detail page
- Compact card layout (no large images) matches the Option B mockup's visual language
- Colophon section renders at bottom with mono typography
- No contact CTA, contact link, or contact section anywhere on the page
- Scroll reveal IntersectionObserver animation in `{% block scripts %}`
- `prefers-reduced-motion` respected throughout
- Responsive behavior: timeline is single-column at all breakpoints

---

### Task 5: Create About page content

**Files touched:** `about/index.njk` (NEW)

**What happens:** Create the About page content file with frontmatter and template code.

**Dependencies:** Task 4 (layout must exist).

**Acceptance criteria:**
- File sets `layout: about.njk`, `title: About`, `description`, and `permalink: /about/`
- File extends the about layout
- Eleventy generates `_site/about/index.html`

---

### Task 6: Build verification and end-to-end testing

**Files touched:** None (testing only).

**What happens:** Run the full Eleventy build and verify all pages per Section I criteria.

**Dependencies:** All previous tasks.

**Acceptance criteria:** See [Section I](#i-testing-criteria).

---

## C. About Page Specification

### Page File (`about/index.njk`)

```nunjucks
---
title: About
description: The story of Third Plane Studios — practice, process, and the ongoing curation of latent space.
layout: false
permalink: /about/
---

{% extends "layouts/about.njk" %}
```

### Layout (`_includes/layouts/about.njk`)

```nunjucks
{% extends "layouts/base.njk" %}

{% block styles %}
<style>
{% include "styles/about.css" %}
</style>
{% endblock %}

{% block content %}
  <!-- Practice Statement -->
  <header class="about-header">
    <div class="container">
      <div class="about-header-content">
        <span class="about-label">Practice</span>
        <h1 class="about-statement">
          We explore the space between computation and creativity — designing at the edges of what technology makes possible, and what remains irreducibly human.
        </h1>
      </div>
    </div>
  </header>

  <!-- The Human -->
  <section class="about-human">
    <div class="container">
      <div class="about-human-content">
        <div class="about-human-text">
          <span class="about-section-label">The Human</span>
          <p>
            Third Plane Studios is the practice of <em>J</em> — a designer and creative technologist based in the space between disciplines. With a background spanning visual design, software engineering, and generative art, J works at the intersection of systems thinking and aesthetic intuition.
          </p>
          <p>
            The studio name refers to the third plane of perception — beyond the literal and the conceptual, into the territory where new meaning emerges. Every project is an attempt to find that plane.
          </p>
        </div>
        <div class="about-human-image">
          <div class="about-image-placeholder" aria-hidden="true"></div>
        </div>
      </div>
    </div>
  </section>

  <!-- Timeline -->
  <section class="about-timeline" aria-label="Complete archive">
    <div class="container">
      <div class="about-timeline-header">
        <span class="about-section-label">Archive</span>
        <div class="about-timeline-meta">
          <div class="archive-stat">
            <span class="archive-stat__value">{{ collections.allContent.length }}</span>
            <span class="archive-stat__label">Entries</span>
          </div>
          <div class="archive-stat">
            <span class="archive-stat__value">2024</span>
            <span class="archive-stat__label">Since</span>
          </div>
        </div>
      </div>

      <div class="timeline">
        <h2 class="visually-hidden">Complete Timeline</h2>

        {# Group content by month/year for date markers #}
        {% set currentMarker = "" %}
        {% for item in collections.allContent %}
          {# Determine the display date and marker text #}
          {% if item.data.date %}
            {% set itemDate = item.data.date %}
            {% set markerText = item.data.date | formatDateShort %}
          {% elif item.data.year %}
            {% set itemDate = null %}
            {% set markerText = item.data.year | string %}
          {% else %}
            {% set itemDate = null %}
            {% set markerText = "Undated" %}
          {% endif %}

          {# Render date marker when month/year changes #}
          {% if markerText != currentMarker %}
            {% set currentMarker = markerText %}
            <div class="date-marker">
              <span class="date-marker__text">{{ markerText }}</span>
            </div>
          {% endif %}

          {# Timeline Entry #}
          <article class="timeline-entry" data-type="{{ item.data.badgeType or 'project' }}">
            <a href="{{ item.url }}" class="entry-card entry-card--compact">
              <div class="entry-content">
                <div class="entry-header">
                  <span class="entry-type entry-type--{{ item.data.badgeType or 'project' }}">{{ item.data.badgeType or item.data.type or 'Project' }}</span>
                  {% if item.data.date %}
                    <span class="entry-date">{{ item.data.date | formatDate }}</span>
                  {% elif item.data.year %}
                    <span class="entry-date">{{ item.data.year }}</span>
                  {% endif %}
                </div>
                <h3 class="entry-title">{{ item.data.title }}</h3>
                <p class="entry-excerpt">{{ item.data.excerpt or item.data.description or '' }}</p>
                <div class="entry-footer">
                  <div class="entry-collections">
                    {% if item.data.memberOf %}
                      {% for collSlug in item.data.memberOf %}
                        <span class="entry-collection-dot" data-accent="{{ collSlug }}"></span>
                      {% endfor %}
                    {% endif %}
                  </div>
                  <span class="entry-arrow">&#8594;</span>
                </div>
              </div>
            </a>
          </article>
        {% endfor %}
      </div>
    </div>
  </section>

  <!-- Colophon -->
  <section class="about-colophon">
    <div class="container">
      <div class="colophon-content">
        <span class="about-section-label">Colophon</span>
        <div class="colophon-text">
          <p>
            This site is built with static HTML and CSS, generated by Eleventy. No JavaScript frameworks. Spring-based animations use the CSS <code>linear()</code> easing function. The design system is called Neon Noir.
          </p>
          <p>
            Typeset in <a href="https://fonts.google.com/specimen/Inter" target="_blank" rel="noopener">Inter</a> for body text, <a href="https://fonts.google.com/specimen/Space+Grotesk" target="_blank" rel="noopener">Space Grotesk</a> for display, and <a href="https://fonts.google.com/specimen/JetBrains+Mono" target="_blank" rel="noopener">JetBrains Mono</a> for code and labels. Hosted on Vercel.
          </p>
          <p class="colophon-philosophy">
            Built with the belief that a portfolio site should be as considered as the work it presents.
          </p>
        </div>
      </div>
    </div>
  </section>
{% endblock %}

{% block scripts %}
<script>
(function() {
  'use strict';
  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var entries = document.querySelectorAll('.timeline-entry');

  if (prefersReducedMotion) {
    entries.forEach(function(entry) { entry.classList.add('revealed'); });
  } else {
    var observer = new IntersectionObserver(function(observerEntries) {
      observerEntries.forEach(function(observerEntry) {
        if (observerEntry.isIntersecting) {
          var entry = observerEntry.target;
          // Stagger based on visible order
          var visibleEntries = Array.from(entries).filter(function(e) {
            return e.getBoundingClientRect().top < window.innerHeight && !e.classList.contains('revealed');
          });
          var visibleIndex = visibleEntries.indexOf(entry);
          var delay = Math.max(0, visibleIndex) * 80;
          entry.style.transitionDelay = delay + 'ms';
          entry.classList.add('revealed');
          observer.unobserve(entry);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -60px 0px'
    });

    entries.forEach(function(entry) { observer.observe(entry); });
  }
})();
</script>
{% endblock %}
```

### How the layout uses Eleventy data

1. **`collections.allContent`** -- Already registered in `.eleventy.js`. Returns all works, writings, and vignettes sorted by date descending (works without `date` use `year` as fallback).

2. **`formatDateShort` filter** -- Already registered. Formats as "Jan 2025" for items with a `date`, or returns the `year` string for works.

3. **`formatDate` filter** -- Already registered. Formats as "Jan 15, 2025" for the entry date display.

4. **`item.data.memberOf`** -- The frontmatter field used to assign works to collections. Each content file has `memberOf: [slug-1, slug-2]`.

5. **Date marker grouping** -- The template uses Nunjucks `{% set %}` to track the current month/year marker and only renders a new `.date-marker` when the formatted date changes. This groups items naturally since `allContent` is pre-sorted by date descending.

6. **`item.url`** -- For writings, this will automatically reflect the permalink override from `writings.json`. Writing entries in the timeline will link to `/thoughts/slug/` rather than `/writings/slug/`. No special handling needed in the template.

### Timeline section: adapting Option B mockup patterns

The About page timeline adapts the following visual patterns from `mockups/option-b-timeline.html`:

**Structural elements preserved:**
- `.timeline` container with vertical line via `::before` pseudo-element
- `.date-marker` with dot indicator via `::before` and mono text
- `.timeline-entry` articles with `.entry-card` links inside
- `.entry-content`, `.entry-header`, `.entry-type`, `.entry-date`, `.entry-title`, `.entry-excerpt`, `.entry-footer`
- Compact card variant: `.entry-card--compact` (text-only, no media images)

**Key differences from the mockup:**
- **No images in timeline cards.** The About page timeline uses exclusively compact cards (`entry-card--compact`). This keeps it as an overview, not a browsing experience.
- **Collection accent dots instead of tags.** Instead of the mockup's `.entry-tags` with text labels, the About page shows small colored dots indicating which collections the item belongs to.
- **Dynamic data.** The mockup uses hardcoded HTML; the About page iterates `collections.allContent` dynamically.
- **No "Load More" button.** All 16 items are rendered at once since it is a complete archive.
- **Timeline max-width uses the same `--timeline-width: 720px` concept** from the mockup but is expressed within the `.container` constraint.

**CSS classes extracted from the mockup and adapted in `about.css`:**
- `.timeline`, `.timeline::before`
- `.date-marker`, `.date-marker::before`, `.date-marker__text`, `.date-marker__year`
- `.timeline-entry`, `.timeline-entry.revealed`, `.timeline-entry::before`
- `.entry-card`, `.entry-card--compact`
- `.entry-content`, `.entry-header`, `.entry-type` (all variants), `.entry-date`
- `.entry-title`, `.entry-excerpt`, `.entry-footer`, `.entry-arrow`

**New CSS classes (not from the mockup):**
- `.about-header`, `.about-header-content`, `.about-label`, `.about-statement`
- `.about-human`, `.about-human-content`, `.about-human-text`, `.about-human-image`, `.about-image-placeholder`
- `.about-section-label`
- `.about-timeline`, `.about-timeline-header`, `.about-timeline-meta`
- `.archive-stat`, `.archive-stat__value`, `.archive-stat__label`
- `.entry-collections`, `.entry-collection-dot`
- `.about-colophon`, `.colophon-content`, `.colophon-text`, `.colophon-philosophy`

---

## D. Writings-to-Thoughts Rename Specification

### Decision: Keep the folder, override the permalinks

Two approaches were evaluated:

**Option A: Rename the `writings/` folder to `thoughts/`**
- Pros: Physical folder matches URL; no permalink overrides needed
- Cons: Breaks the `writings` collection glob in `.eleventy.js` (would need updating to `thoughts/**/*.md`); breaks the `allContent` collection glob; breaks the passthrough copy for images (`writings/**/*.{jpg,...}`); requires updating `writings.json` to `thoughts.json`; risks breaking any other references to the `writings` path; larger blast radius

**Option B: Keep `writings/` folder, override permalinks in directory data file** (CHOSEN)
- Pros: Minimal changes; `.eleventy.js` globs, collections, passthrough copies all continue working unchanged; only 3 files need modification; the `writings` collection name in Eleventy remains a valid internal identifier
- Cons: Physical folder name diverges from URL (minor confusion for developers)

**Option B is the better approach.** The permalink override in `writings.json` cleanly remaps all URLs without touching the build configuration. The `writings` folder name becomes an internal implementation detail; the user-facing label and URL are "Thoughts".

### Changes to `writings/writings.json`

**From:**
```json
{
  "layout": "writing.njk",
  "tags": ["writing"],
  "draft": false
}
```

**To:**
```json
{
  "layout": "writing.njk",
  "tags": ["writing"],
  "draft": false,
  "permalink": "/thoughts/{{ page.fileSlug }}/"
}
```

This single addition remaps every markdown file in the `writings/` directory from `/writings/slug/` to `/thoughts/slug/`. Eleventy's `page.fileSlug` resolves to the filename without extension (e.g., `designing-in-the-void`), producing URLs like `/thoughts/designing-in-the-void/`.

### Changes to `writings/index.njk`

**From:**
```nunjucks
---
title: Writings
description: Essays and explorations on design, technology, and creative process from Third Plane Studios.
layout: false
---
...
<span class="section-label">// WRITINGS</span>
<span class="writings-count">{{ collections.writings | length | pad(2) }} Essays</span>
```

**To:**
```nunjucks
---
title: Thoughts
description: Essays and explorations on design, technology, and creative process from Third Plane Studios.
layout: false
permalink: /thoughts/
---
...
<span class="section-label">// THOUGHTS</span>
<span class="writings-count">{{ collections.writings | length | pad(2) }} Essays</span>
```

Key changes:
- `title` changes from "Writings" to "Thoughts"
- `permalink: /thoughts/` added to frontmatter (overrides the default `/writings/` derived from folder name)
- Section label changes from `// WRITINGS` to `// THOUGHTS`
- The collection reference `collections.writings` stays the same (this is the Eleventy collection name, not the user-facing label)
- CSS class names like `.writings-section`, `.writings-head`, `.writings-count`, `.writings-list` stay unchanged (these are internal CSS identifiers, not user-facing text)

### Changes to `_includes/layouts/writing.njk`

**From:**
```nunjucks
<a href="/writings/" class="back-link">
  <svg class="back-link-arrow" viewBox="0 0 24 24" ...>
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
  Writings
</a>
```

**To:**
```nunjucks
<a href="/thoughts/" class="back-link">
  <svg class="back-link-arrow" viewBox="0 0 24 24" ...>
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
  Thoughts
</a>
```

Two changes:
1. `href` changes from `/writings/` to `/thoughts/`
2. Link text changes from `Writings` to `Thoughts`

### What does NOT change

- The physical `writings/` folder is not renamed
- The `writings.json` filename is not renamed (Eleventy directory data files must match the directory name)
- The `.eleventy.js` collection definition `writings` stays the same (glob: `writings/**/*.md`)
- The `.eleventy.js` `allContent` collection stays the same (glob: `writings/**/*.md`)
- The passthrough copy `writings/**/*.{jpg,...}` stays the same
- The layout filename `writing.njk` stays the same
- The tag `writing` stays the same
- The `badgeType: "essay"` on individual writing markdown files stays the same
- CSS class names containing "writing" or "writings" stay the same (they are internal identifiers)
- The `collections.writings` reference in templates stays the same

### How `item.url` updates automatically

When Eleventy processes a markdown file in `writings/`, it consults the directory data file (`writings.json`) for default frontmatter. With the new `permalink` field, each writing's `item.url` property changes from `/writings/slug/` to `/thoughts/slug/`. This means:

1. The `collections.writings` array items will have `.url` values like `/thoughts/designing-in-the-void/`
2. The `collections.allContent` array items for writings will also have these updated `.url` values
3. The About page timeline template uses `{{ item.url }}` for entry links, so writing entries will automatically link to `/thoughts/slug/`
4. The writings index page iterates `collections.writings` and uses `{{ writing.url }}`, so listing links will automatically point to `/thoughts/slug/`

No template changes are needed for URL references -- the permalink override propagates everywhere through Eleventy's data cascade.

---

## E. Homepage Fix

### Current state of `index.html` nav

The homepage has a hardcoded `<nav>` element (it does not use the Eleventy nav component since `index.html` is a standalone static file passed through by Eleventy):

```html
<div class="nav-links">
  <a href="/works.html">Works</a>
  <a href="/writings.html">Writings</a>
  <a href="/vignettes.html">Vignettes</a>
</div>
```

### Required changes

**From:**
```html
<div class="nav-links">
  <a href="/works.html">Works</a>
  <a href="/writings.html">Writings</a>
  <a href="/vignettes.html">Vignettes</a>
</div>
```

**To:**
```html
<div class="nav-links">
  <a href="/collections/">Collections</a>
  <a href="/thoughts/">Thoughts</a>
  <a href="/about/">About</a>
</div>
```

### Link mapping

| Old Link | Old Text | New Link | New Text |
|----------|----------|----------|----------|
| `/works.html` | Works | `/collections/` | Collections |
| `/writings.html` | Writings | `/thoughts/` | Thoughts |
| `/vignettes.html` | Vignettes | `/about/` | About |

### Why this change is necessary

The homepage `index.html` is registered as a passthrough copy in `.eleventy.js` (`eleventyConfig.addPassthroughCopy("index.html")`). It is NOT processed by the Nunjucks engine. Therefore, it does not use `{% include "components/nav.njk" %}` and does not read from `site.json`. Its navigation links must be updated manually.

---

## F. Navigation Changes

### Changes to `_data/site.json`

**From:**
```json
"nav": [
  { "title": "Collections", "url": "/collections/" },
  { "title": "Writings", "url": "/writings/" },
  { "title": "Vignettes", "url": "/vignettes/" }
]
```

**To:**
```json
"nav": [
  { "title": "Collections", "url": "/collections/" },
  { "title": "Thoughts", "url": "/thoughts/" },
  { "title": "About", "url": "/about/" }
]
```

### Nav component active state verification

The nav component (`_includes/components/nav.njk`) applies the active state with this logic:

```nunjucks
{% if page.url == item.url or (page.url and page.url.startsWith(item.url | replace('.html', '/'))) %}
  class="nav-link--active"
{% endif %}
```

**Verification for each new route:**

| Page URL | Nav Item URL | Match Logic | Result |
|----------|-------------|-------------|--------|
| `/about/` | `/about/` | `page.url == item.url` | Active (exact match) |
| `/thoughts/` | `/thoughts/` | `page.url == item.url` | Active (exact match) |
| `/thoughts/designing-in-the-void/` | `/thoughts/` | `page.url.startsWith('/thoughts/')` | Active (prefix match) |
| `/collections/` | `/collections/` | `page.url == item.url` | Active (exact match) |
| `/collections/ai-futures/` | `/collections/` | `page.url.startsWith('/collections/')` | Active (prefix match) |

All routes produce correct active states. No changes needed to `nav.njk`.

### Do existing type-based pages still work?

**Partially.** The `/works/` and `/vignettes/` listing pages and all their individual detail pages remain fully functional at their current URLs. They are simply no longer in the primary navigation. Users who know the URLs can still access them directly.

**The `/writings/` URL will no longer resolve.** Since `writings/index.njk` now has `permalink: /thoughts/`, Eleventy generates the listing page at `_site/thoughts/index.html` instead of `_site/writings/index.html`. Individual writing detail pages also move from `/writings/slug/` to `/thoughts/slug/` due to the directory data permalink override. If there is a need to preserve the old `/writings/` URLs (e.g., for existing external links), a redirect solution would need to be added separately (e.g., Vercel redirects in `vercel.json`). This is noted as an edge case in [Section H](#h-edge-cases--risks).

---

## G. CSS Specification

### About Page CSS (`_includes/styles/about.css`)

This stylesheet combines styles adapted from the Option B timeline mockup with new styles for the About page sections. Each class is annotated with its source.

```css
/* ============================================
   ABOUT PAGE
   Third Plane Studios - Neon Noir Design System

   Sections:
   1. Practice Statement Header
   2. The Human Section
   3. Section Labels (shared)
   4. Archive Stats
   5. Timeline (adapted from Option B mockup)
   6. Colophon
   7. Responsive
   8. Accessibility
   ============================================ */

/* ============ 1. PRACTICE STATEMENT ============ */
/* NEW - not from mockup */

.about-header {
  padding: 160px 0 80px;
  position: relative;
}

.about-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(ellipse 80% 50% at 20% 40%, rgba(122, 43, 255, 0.10) 0%, transparent 60%),
    radial-gradient(ellipse 60% 40% at 80% 30%, rgba(125, 231, 255, 0.06) 0%, transparent 50%);
  pointer-events: none;
}

.about-header-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
}

.about-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--ice-400);
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.about-label::before {
  content: '';
  width: 24px;
  height: 1px;
  background: var(--ice-400);
  opacity: 0.5;
}

.about-statement {
  font-family: var(--font-display);
  font-size: clamp(28px, 5vw, 42px);
  font-weight: 600;
  letter-spacing: -0.03em;
  line-height: 1.25;
  color: var(--text-100);
}

/* ============ 2. THE HUMAN SECTION ============ */
/* NEW - styled to match curatorial text from collections */

.about-human {
  padding: 80px 0;
  border-top: 1px solid var(--border);
}

.about-human-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 48px;
  align-items: start;
}

@media (min-width: 800px) {
  .about-human-content {
    grid-template-columns: 1fr 280px;
    gap: 64px;
  }
}

.about-human-text p {
  font-size: 17px;
  line-height: 1.75;
  color: var(--text-400);
  margin-bottom: 24px;
  max-width: 600px;
}

.about-human-text p:last-child {
  margin-bottom: 0;
}

.about-human-text em {
  color: var(--text-200);
  font-style: normal;
}

.about-image-placeholder {
  width: 100%;
  aspect-ratio: 3 / 4;
  background: var(--ink-850);
  border-radius: 8px;
  border: 1px solid var(--border);
}

/* ============ 3. SECTION LABELS (SHARED) ============ */
/* NEW - consistent section label style */

.about-section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--text-600);
  margin-bottom: 32px;
  display: block;
}

/* ============ 4. ARCHIVE STATS ============ */
/* ADAPTED from Option B mockup: .archive-meta, .archive-stat */

.about-timeline {
  padding: 80px 0 120px;
  border-top: 1px solid var(--border);
}

.about-timeline-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 48px;
  flex-wrap: wrap;
  gap: 24px;
}

.about-timeline-meta {
  display: flex;
  gap: 32px;
}

.archive-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.archive-stat__value {
  font-family: var(--font-mono);
  font-size: 24px;
  font-weight: 500;
  color: var(--text-100);
}

.archive-stat__label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

/* ============ 5. TIMELINE ============ */
/* ADAPTED from Option B mockup (mockups/option-b-timeline.html) */

.timeline {
  position: relative;
  max-width: 720px;
  padding: 0 0 40px;
}

/* Vertical timeline line */
/* FROM MOCKUP: .timeline::before */
.timeline::before {
  content: '';
  position: absolute;
  left: 40px;
  top: 0;
  bottom: 40px;
  width: 1px;
  background: linear-gradient(
    to bottom,
    rgba(214, 230, 255, 0.20) 0%,
    rgba(214, 230, 255, 0.12) 50%,
    transparent 100%
  );
  pointer-events: none;
}

@media (max-width: 768px) {
  .timeline::before {
    display: none;
  }
}

/* Date Marker */
/* FROM MOCKUP: .date-marker, .date-marker::before, .date-marker__text */
.date-marker {
  position: relative;
  padding: 48px 0 24px;
  padding-left: 72px;
}

.date-marker::before {
  content: '';
  position: absolute;
  left: 36px;
  top: 56px;
  width: 9px;
  height: 9px;
  background: var(--ink-950);
  border: 2px solid var(--text-600);
  border-radius: 50%;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.date-marker:first-of-type::before {
  border-color: var(--ice-400);
  box-shadow: 0 0 12px rgba(125, 231, 255, 0.4);
}

.date-marker__text {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--text-200);
  letter-spacing: 0.02em;
}

@media (max-width: 768px) {
  .date-marker {
    padding-left: 0;
    padding-top: 40px;
    padding-bottom: 16px;
  }

  .date-marker::before {
    display: none;
  }

  .date-marker__text {
    font-size: 12px;
    padding: 8px 12px;
    background: var(--ink-850);
    border-radius: 6px;
    display: inline-block;
  }
}

/* Timeline Entry */
/* FROM MOCKUP: .timeline-entry, .timeline-entry.revealed, .timeline-entry::before */
.timeline-entry {
  position: relative;
  padding-left: 72px;
  margin-bottom: 24px;
  /* Scroll reveal initial state */
  opacity: 0;
  transform: translateY(24px);
}

.timeline-entry.revealed {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.5s ease-out,
    transform var(--spring-reveal);
}

/* Connector dot on timeline */
.timeline-entry::before {
  content: '';
  position: absolute;
  left: 38px;
  top: 24px;
  width: 5px;
  height: 5px;
  background: var(--text-600);
  border-radius: 50%;
  transition: background var(--transition-fast), box-shadow var(--transition-fast);
}

.timeline-entry:hover::before {
  background: var(--ice-400);
  box-shadow: 0 0 8px rgba(125, 231, 255, 0.5);
}

@media (max-width: 768px) {
  .timeline-entry {
    padding-left: 0;
    margin-bottom: 20px;
  }

  .timeline-entry::before {
    display: none;
  }
}

/* Entry Card */
/* FROM MOCKUP: .entry-card, .entry-card--compact, hover states */
.entry-card {
  display: block;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 12px;
  overflow: hidden;
  transition:
    border-color var(--transition-fast),
    transform var(--spring-hover),
    box-shadow var(--transition-fast);
}

.timeline-entry.revealed .entry-card:hover {
  border-color: rgba(214, 230, 255, 0.20);
  transform: translateY(-4px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
}

/* Type-specific hover accents */
/* FROM MOCKUP: type-specific border colors */
.timeline-entry[data-type="essay"] .entry-card:hover {
  border-color: rgba(125, 231, 255, 0.3);
}

.timeline-entry[data-type="interface"] .entry-card:hover {
  border-color: rgba(199, 125, 255, 0.3);
}

.timeline-entry[data-type="generative"] .entry-card:hover {
  border-color: rgba(255, 210, 106, 0.3);
}

.timeline-entry[data-type="vignette"] .entry-card:hover {
  border-color: rgba(255, 42, 74, 0.3);
}

.timeline-entry[data-type="research"] .entry-card:hover {
  border-color: rgba(255, 138, 61, 0.3);
}

.entry-card:focus-visible {
  outline: 2px solid var(--ice-400);
  outline-offset: 4px;
}

/* Compact card content */
/* FROM MOCKUP: .entry-card--compact .entry-content, etc. */
.entry-card--compact .entry-content {
  padding: 20px 24px;
}

.entry-content {
  padding: 24px;
}

.entry-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 12px;
}

/* Type badge */
/* FROM MOCKUP: .entry-type and variants */
.entry-type {
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 5px 10px;
  border-radius: 4px;
  flex-shrink: 0;
}

.entry-type--essay {
  color: var(--ice-400);
  background: rgba(125, 231, 255, 0.12);
  border: 1px solid rgba(125, 231, 255, 0.2);
}

.entry-type--interface {
  color: var(--uv-400);
  background: rgba(199, 125, 255, 0.12);
  border: 1px solid rgba(199, 125, 255, 0.2);
}

.entry-type--generative {
  color: var(--sun-400);
  background: rgba(255, 210, 106, 0.12);
  border: 1px solid rgba(255, 210, 106, 0.2);
}

.entry-type--vignette {
  color: var(--strobe-500);
  background: rgba(255, 42, 74, 0.12);
  border: 1px solid rgba(255, 42, 74, 0.2);
}

.entry-type--research {
  color: var(--amber-500);
  background: rgba(255, 138, 61, 0.12);
  border: 1px solid rgba(255, 138, 61, 0.2);
}

.entry-type--project {
  color: var(--uv-400);
  background: rgba(199, 125, 255, 0.12);
  border: 1px solid rgba(199, 125, 255, 0.2);
}

/* Entry date */
/* FROM MOCKUP: .entry-date */
.entry-date {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-600);
  white-space: nowrap;
  padding-top: 4px;
}

/* Entry title */
/* FROM MOCKUP: .entry-title, hover state */
.entry-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 600;
  color: var(--text-100);
  letter-spacing: -0.02em;
  line-height: 1.3;
  margin-bottom: 6px;
  transition: color var(--transition-fast);
}

.entry-card:hover .entry-title {
  color: var(--ice-400);
}

/* Entry excerpt */
/* FROM MOCKUP: .entry-excerpt (adapted for compact) */
.entry-excerpt {
  font-size: 14px;
  color: var(--text-400);
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Entry footer */
/* FROM MOCKUP: .entry-footer, adapted with collection dots */
.entry-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid var(--border);
}

/* NEW: Collection accent dots */
.entry-collections {
  display: flex;
  gap: 6px;
  align-items: center;
}

.entry-collection-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--text-600);
}

/* Collection dot colors matching accent system */
.entry-collection-dot[data-accent="ai-futures"] {
  background: var(--uv-500);
}

.entry-collection-dot[data-accent="void-studies"] {
  background: var(--ice-400);
}

.entry-collection-dot[data-accent="systems"] {
  background: var(--sun-400);
}

.entry-collection-dot[data-accent="experiments"] {
  background: var(--strobe-500);
}

/* Entry arrow */
/* FROM MOCKUP: .entry-arrow */
.entry-arrow {
  display: flex;
  align-items: center;
  color: var(--text-600);
  font-size: 16px;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.entry-card:hover .entry-arrow {
  transform: translateX(4px);
  color: var(--ice-400);
}

/* ============ 6. COLOPHON ============ */
/* NEW */

.about-colophon {
  padding: 80px 0 120px;
  border-top: 1px solid var(--border);
}

.colophon-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 32px;
  align-items: start;
}

@media (min-width: 800px) {
  .colophon-content {
    grid-template-columns: 200px 1fr;
    gap: 64px;
  }
}

.colophon-text {
  max-width: 600px;
}

.colophon-text p {
  font-family: var(--font-mono);
  font-size: 13px;
  line-height: 1.7;
  color: var(--text-600);
  margin-bottom: 16px;
}

.colophon-text p:last-child {
  margin-bottom: 0;
}

.colophon-text code {
  color: var(--ice-400);
  background: rgba(125, 231, 255, 0.08);
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
}

.colophon-text a {
  color: var(--text-400);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-color: rgba(168, 178, 209, 0.3);
  transition: color var(--transition-fast), text-decoration-color var(--transition-fast);
}

.colophon-text a:hover {
  color: var(--ice-400);
  text-decoration-color: var(--ice-400);
}

.colophon-philosophy {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid var(--border);
  color: var(--text-400) !important;
  font-style: italic;
}

/* ============ 7. RESPONSIVE ============ */

@media (max-width: 600px) {
  .about-header {
    padding: 120px 0 60px;
  }

  .about-statement {
    font-size: 24px;
  }

  .about-human {
    padding: 60px 0;
  }

  .about-timeline {
    padding: 60px 0 80px;
  }

  .about-timeline-header {
    flex-direction: column;
    gap: 16px;
  }

  .about-colophon {
    padding: 60px 0 80px;
  }

  .entry-card--compact .entry-content {
    padding: 16px 20px;
  }

  .entry-title {
    font-size: 16px;
  }
}

/* ============ 8. ACCESSIBILITY ============ */

@media (prefers-reduced-motion: reduce) {
  .timeline-entry {
    opacity: 1;
    transform: none;
  }

  .timeline-entry.revealed {
    transition: none;
  }
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### Token variables used by `about.css`

All variables referenced below already exist in `tokens.css`. No new tokens are required.

| Variable | Status | Used For |
|----------|--------|----------|
| `--font-mono` | Present | Labels, dates, stats, colophon |
| `--font-display` | Present | Statement heading, entry titles |
| `--font-primary` | Present | Body text (inherited) |
| `--ice-400` | Present | Label color, hover accents |
| `--uv-400` | Present | Interface badge color |
| `--uv-500` | Present | AI Futures dot color |
| `--sun-400` | Present | Generative badge, Systems dot |
| `--strobe-500` | Present | Vignette badge, Experiments dot |
| `--amber-500` | Present | Research badge |
| `--text-100` through `--text-600` | Present | Text hierarchy |
| `--ink-850`, `--ink-950` | Present | Backgrounds |
| `--surface` | Present | Card backgrounds |
| `--border` | Present | Border color |
| `--spring-hover` | Present | Card hover transition |
| `--spring-reveal` | Present | Scroll reveal transition |
| `--transition-fast` | Present | Quick transitions |

---

## H. Edge Cases & Risks

### URL consistency

All new pages use trailing-slash URLs (`/about/`, `/thoughts/`) matching the existing pattern (`/collections/`, `/works/`). Eleventy generates these as `_site/about/index.html` and `_site/thoughts/index.html`, which naturally resolve to `/about/` and `/thoughts/` on any standard web server.

### Active nav states on `/about/` and `/thoughts/`

The nav component uses both exact match (`page.url == item.url`) and prefix match (`page.url.startsWith(...)`) logic.

For `/about/`: This is a leaf page with no subpages. Only exact match is needed, and it works correctly. There is no risk of false positives from prefix matching because no other pages have URLs starting with `/about/`.

For `/thoughts/`: This has subpages (`/thoughts/designing-in-the-void/`, etc.). The prefix match correctly activates the "Thoughts" nav link on both the index page and all detail pages. There is no risk of false positives because no other pages have URLs starting with `/thoughts/`.

### Old `/writings/` URLs become dead links

After the permalink override, Eleventy no longer generates pages at `/writings/` or `/writings/slug/`. If external sites, search engines, or bookmarks reference the old `/writings/` URLs, they will 404.

**Mitigation options (not in scope for this plan, but noted for future):**
- Add Vercel redirects in `vercel.json`: `{ "source": "/writings/:path*", "destination": "/thoughts/:path*", "permanent": true }`
- Or add an Eleventy-generated redirect page at `/writings/` that uses `<meta http-equiv="refresh">`

For now, since the site is not yet widely indexed and external link preservation is not a stated requirement, this is acceptable.

### Timeline ordering: works use `year`, not `date`

The `allContent` collection in `.eleventy.js` already handles this disparity:

```javascript
const dateA = a.data.date ? new Date(a.data.date) : new Date((a.data.year || 2020) + '-01-01');
```

Works without a `date` field use their `year` field as a fallback, placed at January 1st of that year. This means works from 2024 will be sorted after writings/vignettes from January 2025 but before items from 2023. This is correct behavior.

**Impact on date markers:** Works that use `year` instead of `date` will produce a date marker of just "2024" (from the `formatDateShort` filter, which falls back to the year string). This groups all year-only works under a single marker, which is appropriate.

### Content items without images in timeline cards

The About page timeline uses exclusively compact cards (`entry-card--compact`) with no image display. This is intentional -- the timeline is an overview, not a browsing experience. All content types (works, writings, vignettes) are treated uniformly regardless of whether they have a `cover`, `poster`, or neither.

### Content items without `memberOf` field

If a content item lacks a `memberOf` array (which should not happen after Phase 3 migration, but could for future content), the template safely renders no collection dots in the entry footer. The `{% if item.data.memberOf %}` check prevents template errors.

### Content items without `excerpt` or `description`

The template uses `{{ item.data.excerpt or item.data.description or '' }}`. If neither field exists, an empty string is rendered, and the entry displays without an excerpt line. This is acceptable for the compact card layout.

### Nunjucks `string` filter for year display

The date marker logic uses `{% set markerText = item.data.year | string %}` for works. Nunjucks does not have a built-in `string` filter. However, this is not actually needed because the `formatDateShort` filter handles both cases. The template should use `formatDateShort(item.data.year)` consistently. The final template code in Section C uses `formatDateShort` which already returns the year as a string when `date` is absent.

**Correction:** The date marker grouping in the template uses `formatDateShort` for items with `date`, and falls back to `item.data.year` directly for items without. Since Nunjucks will auto-coerce numbers to strings in template output, this works without a `string` filter. The `{% set markerText %}` assignment handles this correctly.

### Homepage is a passthrough copy

The `index.html` file is treated as a passthrough copy in `.eleventy.js`:

```javascript
eleventyConfig.addPassthroughCopy("index.html");
```

This means it is NOT processed by the Nunjucks engine. It does not have access to `site.json` data, Eleventy collections, or template components. Its navigation links must remain hardcoded and must be updated manually. This is a known architectural debt -- a future improvement could convert the homepage to a `.njk` file that uses the shared nav component.

### Permalink override interaction with Eleventy collections

The `permalink` field added to `writings/writings.json` changes the output URL but does NOT affect how Eleventy's `collectionApi.getFilteredByGlob("writings/**/*.md")` works. The glob matches files by their physical filesystem path, not their output URL. Therefore:

- `collections.writings` continues to include all writing markdown files
- `collections.allContent` continues to include writings in its merge of works + writings + vignettes
- Each writing item's `.url` property reflects the new permalink (`/thoughts/slug/`)
- No changes to `.eleventy.js` are required

### Permalink override interaction with the writings index page

The `writings/index.njk` file is a Nunjucks template, not a markdown file. The directory data file `writings.json` applies to all files in the directory, but `index.njk` has its own frontmatter with `layout: false` (and now `permalink: /thoughts/`). Since frontmatter takes precedence over directory data, the index page's permalink is set explicitly. The directory data's `permalink: /thoughts/{{ page.fileSlug }}/` would produce `/thoughts/index/` for `index.njk` if relied upon, which is why the index page must set its own `permalink: /thoughts/` explicitly.

### Responsive behavior

**About page:**
- Practice statement: Font size scales via `clamp(28px, 5vw, 42px)`
- Human section: Single column below 800px, two-column above
- Timeline: Single column at all breakpoints (following the Option B mockup pattern). Vertical line hidden on mobile. Date markers switch to pill style on mobile.
- Colophon: Single column below 800px, two-column (label + text) above

### Collision with existing CSS class names

**`.back-link`**: Not used on the About page. No conflict.

**`.archive-stat`, `.archive-stat__value`, `.archive-stat__label`**: These class names appear in the Option B timeline mockup and are reused in `about.css`. They do NOT appear in any other production CSS file. No conflict.

**`.timeline-entry`, `.entry-card`, etc.**: These class names appear in the Option B mockup and are defined in `about.css`. They do NOT appear in any other production CSS file (they were mockup-only). No conflict.

**`.visually-hidden`**: Defined in `about.css` for the timeline heading. This utility class is also defined in the Option B mockup but not in any shared CSS file. If it is already defined in `base.css`, it can be removed from `about.css`. Worth checking during implementation.

---

## I. Testing Criteria

### Build verification

1. Run `npx @11ty/eleventy` -- build must complete with zero errors
2. Verify output directory `_site/about/` exists and contains `index.html`
3. Verify output directory `_site/thoughts/` exists and contains `index.html`
4. Verify output directory `_site/thoughts/designing-in-the-void/` exists and contains `index.html`
5. Verify output directory `_site/thoughts/latent-space-explorations/` exists and contains `index.html` (or the correct slug equivalent)
6. Verify that `_site/writings/` does NOT contain an `index.html` (the old URL should no longer be generated)
7. Verify existing pages still build: `_site/collections/index.html`, all collection detail pages, `_site/works/index.html`, `_site/vignettes/index.html`, and all individual detail pages
8. Verify `_site/index.html` exists (homepage passthrough)

### Page rendering verification

9. Open `/about/` in browser -- verify:
   - Practice statement renders with "PRACTICE" mono label, large display text
   - Subtle radial gradient atmosphere visible in header
   - Human section renders with biographical text and image placeholder
   - Timeline renders ALL content items (should be 16 items total: 10 works, 2 writings, 4 vignettes)
   - Timeline entries are grouped by date markers in reverse chronological order
   - Each entry shows: type badge (correct color), title, excerpt, date, collection accent dots
   - Collection dots show correct colors for each collection membership
   - Entry cards link to correct detail pages (works to `/works/slug/`, writings to `/thoughts/slug/`, vignettes to `/vignettes/slug/`)
   - Scroll reveal animation triggers on scroll (entries fade in with staggered delays)
   - Colophon section renders at bottom with mono typography
   - No contact CTA, contact link, or contact section anywhere on the page

10. Open `/thoughts/` in browser -- verify:
    - Page title shows "Thoughts"
    - Section label shows "// THOUGHTS"
    - All writing entries are listed with correct titles, dates, and reading times
    - Each writing entry links to `/thoughts/slug/` (not `/writings/slug/`)

11. Open `/thoughts/designing-in-the-void/` in browser -- verify:
    - Article renders correctly with full content
    - Back-link says "Thoughts" and points to `/thoughts/`
    - Back-link arrow SVG renders correctly
    - Article title, date, tags, and content display as expected

### Navigation verification

12. On any page rendered by Eleventy (e.g., `/collections/`, `/about/`, `/thoughts/`): nav shows "Collections", "Thoughts", "About"
13. On `/about/` -- "About" link has `nav-link--active` class
14. On `/thoughts/` -- "Thoughts" link has `nav-link--active` class
15. On `/thoughts/designing-in-the-void/` -- "Thoughts" link has `nav-link--active` class (prefix match)
16. On `/collections/` -- "Collections" link has `nav-link--active` class
17. On `/collections/ai-futures/` -- "Collections" link still has `nav-link--active` class (prefix match)
18. Open `index.html` (homepage) -- nav shows "Collections", "Thoughts", "About" with correct links
19. Existing pages (`/works/`, `/vignettes/` and their detail pages) still render correctly -- they are no longer in the nav but remain accessible via direct URL

### Responsive verification

20. Test About page at mobile (375px), tablet (768px), and desktop (1200px+):
    - Practice statement font scales appropriately
    - Human section: single column on mobile/tablet, two-column on desktop
    - Timeline: single column at all sizes, vertical line hidden on mobile
    - Date markers: pill style on mobile, dot-on-line on desktop
    - Colophon: single column on mobile, two-column on desktop
    - All padding reduces appropriately on mobile

21. Test Thoughts index page at mobile and desktop -- writings list renders correctly at all breakpoints

### Accessibility verification

22. Enable `prefers-reduced-motion: reduce` on About page -- all timeline entries appear immediately (no animation)
23. Tab through About page -- focus-visible outlines appear on all entry cards (2px solid ice-400)
24. Tab through Thoughts detail page -- focus-visible outline appears on back-link
25. Verify semantic HTML: `<header>`, `<section>`, `<article>`, `<nav>` used correctly on About page
26. Timeline has an `aria-label="Complete archive"` on the section and a visually-hidden `<h2>` heading

---

## Appendix: Complete content for all 16 timeline entries

For reference, here is what `collections.allContent` returns (sorted by date descending), which determines the timeline order on the About page:

| # | Title | Type | Date/Year | Badge Type | Collections |
|---|-------|------|-----------|------------|-------------|
| 1 | Emergence | Vignette | Jan 15, 2025 | vignette | void-studies, experiments |
| 2 | Designing in the Void | Writing | Jan 15, 2025 | essay | void-studies |
| 3 | Dissolution | Vignette | Jan 10, 2025 | vignette | void-studies, experiments |
| 4 | Latent Space as Medium | Writing | Jan 8, 2025 | essay | ai-futures |
| 5 | Threshold | Vignette | Jan 5, 2025 | vignette | void-studies, experiments |
| 6 | Latent Space | Vignette | Dec 20, 2024 | vignette | ai-futures, experiments |
| 7 | Void Protocol | Work | 2025 | interface | void-studies |
| 8 | Lumina | Work | 2024 | interface | systems |
| 9 | Synthesis | Work | 2024 | generative | ai-futures, systems |
| 10 | Neural Drift | Work | 2024 | generative | ai-futures, experiments |
| 11 | Chromatic Pulse | Work | 2024 | generative | experiments |
| 12 | Echo Chamber | Work | 2024 | interface | systems, experiments |
| 13 | Phantom Grid | Work | 2024 | research | systems |
| 14 | Signal Decay | Work | 2024 | generative | void-studies, experiments |
| 15 | Liminal Space | Work | 2024 | interface | void-studies, experiments |
| 16 | Data Mirage | Work | 2024 | generative | systems, ai-futures |

**Note:** Items 1-6 have explicit `date` fields and will each produce date markers (e.g., "Jan 2025", "Dec 2024"). Items 7-16 use `year` only, so item 7 groups under "2025" and items 8-16 group under "2024". The exact ordering of works within the same year depends on their file processing order since they all resolve to Jan 1 of their year.

**URL note:** Writing entries (#2 and #4) will link to `/thoughts/designing-in-the-void/` and `/thoughts/latent-space-explorations/` respectively (reflecting the permalink override), not `/writings/...`.

---

*This document serves as the authoritative reference for refactoring the site's information architecture. All implementation decisions should be consistent with this plan.*
