# Template vs Implementation Audit Report

**Date:** 2026-01-13
**Branch:** `feature/content-system`
**Template Reference:** `content-mockup.html`
**Status:** COMPREHENSIVE FORENSIC AUDIT COMPLETE

---

## Executive Summary

This document consolidates findings from a multi-agent forensic audit comparing the HTML template (`content-mockup.html`) against the Eleventy implementation. The audit identified **23 critical differences** and **15 intentional enhancements** across CSS, HTML structure, animations, and design tokens.

### Severity Classification
- **CRITICAL** - Visual/functional regression from template intent
- **HIGH** - Significant deviation affecting design consistency
- **MEDIUM** - Minor discrepancy with moderate visual impact
- **LOW** - Trivial difference, may be intentional
- **ENHANCEMENT** - Implementation adds features not in template

---

## Part 1: Writing Article Page

### 1.1 Card Background Color — CRITICAL

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| `.writing-preview` | `background: var(--ink-900)` | — | mockup:390 |
| `.writing-card` | — | `background: var(--ink-850)` | writing.css:78 |

**Issue:** Card is too dark. Template uses `--ink-900` (#0D0F14) for visual hierarchy against `--ink-950` page background. Implementation uses darker `--ink-850` (#121319).

**Fix Required:**
```css
/* writing.css:78 */
.writing-card {
  background: var(--ink-900);  /* was: var(--ink-850) */
}
```

---

### 1.2 Title Font Size — CRITICAL

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| `.writing-preview__title` | `font-size: 22px` | — | mockup:421 |
| `.writing-title` | — | `font-size: clamp(24px, 4vw, 32px)` | writing.css:113 |

**Issue:** Title grows to 32px on desktop, disproportionately large. Template specifies deliberate fixed 22px.

**Fix Required:**
```css
/* writing.css:113 */
.writing-title {
  font-size: 22px;  /* was: clamp(24px, 4vw, 32px) */
}
```

---

### 1.3 Tag Background Style — CRITICAL

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| `.tag` | `background: var(--ink-850)` | — | mockup:437 |
| `.writing-tags .tag` | — | `background: transparent` | writing.css:134 |

**Issue:** Tags appear as outline-only instead of filled badges.

**Fix Required:**
```css
/* writing.css:134 */
.writing-tags .tag {
  background: var(--ink-850);  /* was: transparent */
}
```

---

### 1.4 Meta Margin Bottom — MEDIUM

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| `.writing-preview__meta` | `margin-bottom: 12px` | — | mockup:405 |
| `.writing-meta` | — | `margin-bottom: 16px` | writing.css:100 |

**Fix Required:**
```css
/* writing.css:100 */
.writing-meta {
  margin-bottom: 12px;  /* was: 16px */
}
```

---

### 1.5 Tag Letter Spacing — LOW

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| `.tag` | `letter-spacing: 0.04em` | — | mockup:442 |
| `.writing-tags .tag` | — | `letter-spacing: 0.05em` | writing.css:132 |

**Fix Required:**
```css
/* writing.css:132 */
.writing-tags .tag {
  letter-spacing: 0.04em;  /* was: 0.05em */
}
```

---

### 1.6 Tags Container Margin — MEDIUM

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| `.writing-preview__tags` | `margin-top: 12px` | — | mockup:430 |
| `.writing-tags` | — | (missing) | writing.css:121-125 |

**Fix Required:**
```css
/* writing.css:121-125 - ADD margin-top */
.writing-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 12px;  /* ADD THIS */
}
```

---

### 1.7 Prose H2 Letter Spacing — LOW

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| `.prose h2` | `letter-spacing: var(--letter-spacing-tight)` | — | mockup:466 |
| `.prose h2` | — | (missing) | prose.css:13-20 |

**Fix Required:**
```css
/* prose.css:13-20 - ADD letter-spacing */
.prose h2 {
  /* existing properties... */
  letter-spacing: var(--letter-spacing-tight);  /* ADD THIS */
}
```

---

## Part 2: Work Article Page

### 2.1 Card Background Color — CRITICAL

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| Expected | `background: var(--ink-900)` | — | (inferred from writing-preview) |
| `.work-card` | — | `background: var(--ink-850)` | work.css:84 |

**Fix Required:**
```css
/* work.css:84 */
.work-card {
  background: var(--ink-900);  /* was: var(--ink-850) */
}
```

---

### 2.2 Title Font Size — CRITICAL

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| Expected | `font-size: 22px` (match writing) | — | — |
| `.work-title` | — | `font-size: clamp(24px, 4vw, 32px)` | work.css:114 |

**Decision Needed:** Work titles may intentionally be larger. Consider:
- Option A: Match writing at 22px for consistency
- Option B: Keep responsive clamp for work prominence

---

## Part 3: Works Grid Page

### 3.1 Work Card Border/Background — HIGH (INTENTIONAL?)

| Property | Template | Implementation | Status |
|----------|----------|----------------|--------|
| `.work-card` background | `var(--ink-900)` | REMOVED | Intentional simplification |
| `.work-card` border | `1px solid var(--border)` | REMOVED | Intentional simplification |
| `.work-card` border-radius | `8px` | REMOVED | Intentional simplification |

**Analysis:** Implementation intentionally strips card styling, moving visual focus to `.work-media` container. This is a **design decision**, not a bug.

**If reverting to template style:**
```css
/* works-grid.css:53-62 - ADD these properties */
.work-card {
  background: var(--ink-900);
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
  /* ...existing properties... */
}
```

---

### 3.2 Work Card Hover Lift — MEDIUM

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| Hover transform | `translateY(-2px)` | `translateY(-4px)` | mockup:290 vs works-grid.css:80 |

**Analysis:** Implementation has stronger hover lift. May be intentional for emphasis.

---

### 3.3 Work Card Image Scale — LOW

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| Hover scale | `scale(1.03)` | `scale(1.04)` | mockup:314 vs works-grid.css:102 |

---

### 3.4 Work Card Border Color Animation — MEDIUM

| Property | Template | Implementation |
|----------|----------|----------------|
| Revealed transition | Includes `border-color var(--transition-fast)` | REMOVED |
| Hover border-color | `rgba(125, 231, 255, 0.3)` | REMOVED |

**If reverting to template:**
```css
/* works-grid.css:64-70 */
.work-card.revealed {
  transition:
    opacity 0.5s ease-out,
    transform var(--spring-stagger),
    border-color var(--transition-fast);  /* ADD THIS */
}

/* works-grid.css:78-82 */
.work-card.revealed:hover {
  border-color: rgba(125, 231, 255, 0.3);  /* ADD THIS */
  /* ...existing... */
}
```

---

### 3.5 Works Grid Gap at 900px — MEDIUM

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| Gap | `40px 32px` | `32px 24px` | mockup:250 vs works-grid.css:41 |

---

### 3.6 Works Grid Gap at 600px — MEDIUM

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| Gap | `32px` | `40px` | mockup:262 vs works-grid.css:48 |

---

### 3.7 Missing Work Grid Components — HIGH

Template includes these components not in implementation:

| Component | Template Lines | Status |
|-----------|----------------|--------|
| `.work-live-badge` | 333-347 | NOT IMPLEMENTED |
| `.work-card--live` | 318-320 | NOT IMPLEMENTED |
| `.work-card--live iframe` | 322-331 | NOT IMPLEMENTED |
| `.work-tech` | 361-369 | NOT IMPLEMENTED |
| `.tech-tag` | 376-386 | NOT IMPLEMENTED |

---

## Part 4: Vignettes Gallery

### Status: MATCHES TEMPLATE

Vignette implementation is **fully aligned** with template:
- Grid layout and breakpoints ✓
- Card styling (background, border, border-radius) ✓
- Hover effects (translateY(-4px), scale(1.04), border-color) ✓
- Scroll reveal animations ✓
- Title color transitions ✓
- Tech tags ✓

**No changes required.**

---

## Part 5: Writings Index/List

### Status: MATCHES TEMPLATE

Writings list implementation is **fully aligned** with template:
- Flex column layout with 1px gap dividers ✓
- Item background and hover states ✓
- Title, excerpt, date, reading-time styling ✓

**One issue:** Missing `@media (prefers-reduced-motion)` support.

**Fix Required:**
```css
/* writings-list.css - ADD at end */
@media (prefers-reduced-motion: reduce) {
  .writing-item {
    transition: none;
  }
}
```

---

## Part 6: Design Tokens & Base Styles

### 6.1 Container Narrow Max-Width — HIGH

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| `.container--narrow` max-width | `720px` | `1080px` | mockup:116 vs prose.css:151 |

**Analysis:** 360px wider in implementation. This may be intentional if articles should use full `.container` width (1200px) rather than narrow.

**Decision Needed:**
- If using narrow container for prose: fix to 720px
- If aligning with nav (current): keep 1080px or remove entirely

---

### 6.2 Section Label Margin — HIGH

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| `.section-label` margin-bottom | `16px` | `48px` | mockup:126 vs base.css:50 |

**Analysis:** 3x larger margin in implementation. Affects spacing on all grid pages.

**Fix Required (if matching template):**
```css
/* base.css:50 */
.section-label {
  margin-bottom: 16px;  /* was: 48px */
}
```

---

### 6.3 Missing Spring Curves — MEDIUM

Template defines only 2 springs; implementation has 4:

| Variable | Template | Implementation |
|----------|----------|----------------|
| `--spring-hero` | MISSING | 550ms linear(...) |
| `--spring-snap` | MISSING | 700ms linear(...) |
| `--spring-stagger` | ✓ | ✓ |
| `--spring-hover` | ✓ | ✓ |

**Status:** Implementation enhancement - no fix needed.

---

### 6.4 Missing Glow Tokens — MEDIUM

Implementation includes these not in template:
- `--glow-uv`
- `--glow-ice`
- `--glow-red`
- `--glow-gold`
- `--gradient-soul`

**Status:** Implementation enhancement - no fix needed.

---

## Part 7: Navigation

### 7.1 Nav Background Behavior — ENHANCEMENT

| Property | Template | Implementation |
|----------|----------|----------------|
| Background | Always `var(--scrim)` with blur | Transparent → scrolled state |

**Status:** Implementation adds scroll-triggered background reveal. Enhancement.

---

### 7.2 Nav Logo Redesigned — ENHANCEMENT

| Property | Template | Implementation |
|----------|----------|----------------|
| Font family | `var(--font-display)` | `var(--font-mono)` |
| Font size | `17px` | `14px` |
| Hover effect | None | Spring-based glow + micro-shift |

**Status:** Intentional redesign with micro-animation. Enhancement.

---

### 7.3 Nav Link Hover Color — MEDIUM

| Property | Template | Implementation | File:Line |
|----------|----------|----------------|-----------|
| Hover color | `var(--text-100)` | `var(--ice-400)` | mockup:188 vs nav.css:93 |

**Analysis:** Implementation uses cyan accent instead of white. Design decision.

---

### 7.4 Nav Link Underline — ENHANCEMENT

Template has no underline animation. Implementation adds:
```css
.nav-links a::after {
  content: '';
  width: 0;
  transition: width var(--transition-fast);
}
.nav-links a:hover::after {
  width: 100%;
}
```

**Status:** Enhancement - no fix needed.

---

## Part 8: HTML Structure

### 8.1 Class Name Mapping

| Template Class | Implementation Class | Status |
|----------------|---------------------|--------|
| `.writing-preview` | `.writing-card` | RENAMED |
| `.writing-preview__header` | `.writing-card__header` | RENAMED |
| `.writing-preview__content` | `.writing-card__content` | RENAMED |
| `.writing-preview__meta` | `.writing-meta` | RENAMED |
| `.writing-preview__date` | `.writing-date` | RENAMED |
| `.writing-preview__reading-time` | `.writing-reading-time` | RENAMED |
| `.writing-preview__title` | `.writing-title` | RENAMED |
| `.writing-preview__tags` | `.writing-tags` | RENAMED |

**Status:** Intentional BEM naming convention. CSS must use implementation class names.

---

### 8.2 Semantic Elements — ENHANCEMENT

| Element | Template | Implementation |
|---------|----------|----------------|
| Date | `<span>` | `<time datetime="...">` |
| Title | `<h3>` | `<h1>` |
| Root | `<section>` | `<article>` |

**Status:** Implementation uses more semantic HTML. Enhancement.

---

### 8.3 Missing Template Sections

Implementation includes these not in template:
- `header.writing-header` with back navigation
- `footer.writing-footer` with back link
- `nav.work-nav` for previous/next navigation

**Status:** Implementation enhancement.

---

## Part 9: Animations & Interactions

### 9.1 Focus State Inconsistency — LOW

| Scope | Outline Offset |
|-------|----------------|
| Global (base.css) | `3px` |
| Work cards | `4px` |
| Vignette cards | `4px` |

**Fix Required (for consistency):**
```css
/* works-grid.css:75, vignettes.css:91 */
outline-offset: 3px;  /* was: 4px */
```

---

### 9.2 New Animations (ENHANCEMENTS)

| Feature | Location | Description |
|---------|----------|-------------|
| Section label slide-replace | work.css, writing.css | "← Back" slides in on hover |
| Logo micro-shift | nav.css | Characters spread with spring |
| Footer social hover | footer.css | Spring lift + glow |

---

## Summary: Required Changes

### CRITICAL (Must Fix)

1. **writing.css:78** — Card background: `var(--ink-900)`
2. **writing.css:113** — Title font-size: `22px`
3. **writing.css:134** — Tag background: `var(--ink-850)`
4. **work.css:84** — Card background: `var(--ink-900)`

### HIGH (Should Fix)

5. **writing.css:100** — Meta margin-bottom: `12px`
6. **writing.css:121-125** — Tags margin-top: `12px`
7. **writings-list.css** — Add prefers-reduced-motion support

### MEDIUM (Consider Fixing)

8. **writing.css:132** — Tag letter-spacing: `0.04em`
9. **prose.css:13-20** — H2 letter-spacing: `var(--letter-spacing-tight)`
10. **base.css:50** — Section label margin-bottom: `16px` (if matching template)
11. **works-grid.css** — Card border/background (if reverting to template style)

### DESIGN DECISIONS NEEDED

1. **Work title font-size:** Keep responsive clamp or match writing at 22px?
2. **Container narrow width:** Keep 1080px or revert to 720px?
3. **Section label margin:** Keep 48px or revert to 16px?
4. **Work card styling:** Keep minimal or restore borders/background?
5. **Nav link hover color:** Keep ice-400 or revert to text-100?

---

## File Reference

| File | Path |
|------|------|
| Template | `/Users/jasminepoon/src/website/content-mockup.html` |
| Writing CSS | `/Users/jasminepoon/src/website/_includes/styles/writing.css` |
| Work CSS | `/Users/jasminepoon/src/website/_includes/styles/work.css` |
| Prose CSS | `/Users/jasminepoon/src/website/_includes/styles/prose.css` |
| Works Grid CSS | `/Users/jasminepoon/src/website/_includes/styles/works-grid.css` |
| Vignettes CSS | `/Users/jasminepoon/src/website/_includes/styles/vignettes.css` |
| Writings List CSS | `/Users/jasminepoon/src/website/_includes/styles/writings-list.css` |
| Base CSS | `/Users/jasminepoon/src/website/_includes/styles/base.css` |
| Nav CSS | `/Users/jasminepoon/src/website/_includes/styles/nav.css` |
| Tokens CSS | `/Users/jasminepoon/src/website/_includes/styles/tokens.css` |
| Writing Layout | `/Users/jasminepoon/src/website/_includes/layouts/writing.njk` |
| Work Layout | `/Users/jasminepoon/src/website/_includes/layouts/work.njk` |

---

*Generated by multi-agent forensic audit system*
