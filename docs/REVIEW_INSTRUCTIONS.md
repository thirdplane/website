# Code Review Instructions for Codex

> Review the Eleventy content system implementation against the specifications in this repository.

---

## Primary Documentation

**READ THESE FILES FIRST before flagging any issues:**

1. **`/docs/CONTENT_SYSTEM_PLAN.md`** — The authoritative technical specification (v3.0)
2. **`/docs/IMPLEMENTATION_CHECKLIST.md`** — Phase-by-phase implementation checklist

---

## Critical Implementation Details (DO NOT flag as issues)

### 1. `layout: false` in Index Files

**Files:** `works/index.njk`, `writings/index.njk`

**This is CORRECT.** Here's why:

- Directory data files (`works/works.json`, `writings/writings.json`) apply `layout` to ALL files in their directory
- Index files use `{% extends "layouts/base.njk" %}` — they define their OWN layout
- Without `layout: false`, Eleventy applies BOTH layouts, creating nested HTML documents
- Reference: This is standard Eleventy behavior for directory data files

**Verification:** Run `grep -c '<!DOCTYPE' _site/works/index.html` — should return `1`, not `2`

---

### 2. CSS Inlining (Not External Links)

**File:** `_includes/components/head.njk`

**Correct approach:** Inline CSS using `{% include %}`:
```html
<style>
{% include "styles/tokens.css" %}
{% include "styles/base.css" %}
{% include "styles/nav.css" %}
{% include "styles/footer.css" %}
</style>
```

**DO NOT suggest external `<link>` tags.** The plan explicitly specifies inline CSS:
- Reference: `CONTENT_SYSTEM_PLAN.md` Section 5.1 (Base Layout)
- Reference: `CONTENT_SYSTEM_PLAN.md` Section 10.2 (CSS Token Extraction Strategy)

Quote from plan:
> "Inline eliminates render-blocking CSS request... Small site means CSS fits easily in initial HTML payload"

---

### 3. Nav URLs Use Clean URLs

**File:** `_data/site.json`

**Correct:**
```json
"nav": [
  { "title": "Works", "url": "/works/" },
  { "title": "Writings", "url": "/writings/" },
  { "title": "Vignettes", "url": "/vignettes/" }
]
```

**INCORRECT (do not suggest):**
```json
"nav": [
  { "title": "Works", "url": "/works.html" },
  ...
]
```

The Eleventy-generated pages use clean URLs (`/works/index.html` served as `/works/`).

---

### 4. Vignettes Have NO Individual Pages

**This is BY DESIGN.** Reference: `CONTENT_SYSTEM_PLAN.md` Section 2.3:

> "No individual detail pages (lightbox only)"
> "URL Structure: Gallery index: `/vignettes/` — No individual pages (lightbox only)"

The vignettes collection uses GLightbox for fullscreen video viewing. Clicking a vignette opens the lightbox, NOT a detail page.

**DO NOT flag the lack of `_includes/layouts/vignette.njk` as an issue.** The vignettes.json intentionally has no layout because vignettes don't render as individual pages.

---

### 5. Collection Sorting

| Collection | Sort Order | Reference |
|------------|------------|-----------|
| Works | By `year` descending, featured first | Section 4.2 |
| Writings | By `date` descending | Section 4.2 |
| Vignettes | By `date` descending | Section 4.2 |

---

### 6. Directory Data File Patterns

**Correct pattern for `works/works.json`:**
```json
{
  "layout": "work.njk",
  "tags": ["work"],
  "draft": false,
  "featured": false
}
```

**Correct pattern for `writings/writings.json`:**
```json
{
  "layout": "writing.njk",
  "tags": ["writing"],
  "draft": false
}
```

**Correct pattern for `vignettes/vignettes.json`:**
```json
{
  "tags": ["vignette"],
  "draft": false,
  "permalink": false
}
```

Note: vignettes.json has NO layout and `permalink: false` — this is correct per Section 2.3.
The `permalink: false` prevents individual pages from being generated (lightbox-only design).

---

## Verification Commands

Run these to verify correct implementation:

```bash
# Build should succeed with no errors
npm run build

# Should output 11 files:
# - index.html (home)
# - works/index.html + works/lumina/ + works/synthesis/
# - writings/index.html + 2 articles
# - vignettes/index.html + 3 vignettes (these ARE generated but only for collection data)

# Verify no nested HTML documents
grep -c '<!DOCTYPE' _site/works/index.html    # Should be 1
grep -c '<!DOCTYPE' _site/writings/index.html # Should be 1

# Verify CSS is inlined (not external links)
grep '<link rel="stylesheet" href="/_includes' _site/works/index.html  # Should return nothing

# Verify nav URLs are clean
grep 'href="/works/"' _site/index.html  # Should find the nav link
```

---

## What to Review

### Phase 1: Foundation
- [ ] `.eleventy.js` — collections, filters, shortcodes, passthrough, ignores
- [ ] `_data/site.json` — site metadata, nav with clean URLs
- [ ] `_includes/layouts/base.njk` — base HTML structure
- [ ] `_includes/components/head.njk` — meta tags, INLINE CSS
- [ ] `_includes/components/nav.njk` — dynamic active states
- [ ] `_includes/components/footer.njk` — footer with site data

### Phase 2: Works
- [ ] `works/works.json` — layout applies to .md files only (index.njk has `layout: false`)
- [ ] `works/index.njk` — DIA-style grid, has `layout: false` in front matter
- [ ] `_includes/layouts/work.njk` — case study template with slide-replace header
- [ ] `_includes/styles/work.css` — work page styles
- [ ] `_includes/styles/works-grid.css` — grid styles
- [ ] Sample content: `works/lumina.md`, `works/synthesis.md`

### Phase 3: Writings
- [ ] `writings/writings.json` — layout applies to .md files only
- [ ] `writings/index.njk` — list view, has `layout: false` in front matter
- [ ] `_includes/layouts/writing.njk` — article template
- [ ] `_includes/styles/writing.css` — writing page styles
- [ ] `_includes/styles/writings-list.css` — list styles
- [ ] `_includes/styles/prose.css` — long-form typography
- [ ] Sample content: `writings/designing-in-the-void.md`, `writings/latent-space-explorations.md`

### Phase 4: Vignettes
- [ ] `vignettes/vignettes.json` — NO layout (correct), just tags
- [ ] `vignettes/index.njk` — video grid with GLightbox, hover-to-play JS
- [ ] `_includes/styles/vignettes.css` — video grid styles
- [ ] Sample content: `vignettes/emergence.md`, `vignettes/dissolution.md`, `vignettes/threshold.md`

---

## DO NOT Flag These as Issues

1. ❌ "Index files should use the directory layout" — NO, they extend base.njk directly
2. ❌ "CSS should use external stylesheets" — NO, inline is specified for performance
3. ❌ "Vignettes need individual pages" — NO, lightbox-only by design
4. ❌ "Nav should link to .html files" — NO, clean URLs are correct
5. ❌ "vignettes.json should have a layout" — NO, vignettes don't have detail pages

---

## Actual Issues to Look For

- Missing filters or shortcodes referenced in templates
- Broken template inheritance chains
- Missing CSS variables used in stylesheets
- Collection queries that don't match front matter fields
- JavaScript errors in hover-to-play or reveal animations
- Missing responsive breakpoints

---

*Document created: 2025-01-13*
*For: Codex review of Eleventy content system implementation*
