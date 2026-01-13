# Works Page Technical Specification

> Third Plane Studios — Portfolio Grid Implementation
> Version: 1.0 | Date: 2025-01-09

---

## 1. Overview

Create a standalone `/works.html` page featuring a responsive portfolio grid with:
- 4→2→1 column responsive layout
- Spring-based hover animations
- Staggered scroll-reveal entrance
- Accessible, performant implementation
- Consistent with existing Neon Noir design system

---

## 2. File Structure

```
/website
├── index.html          # Update: add nav link to works
├── works.html          # NEW: portfolio grid page
└── docs/
    ├── WORKS_GRID_NOTES.md      # Reference notes
    └── WORKS_PAGE_SPEC.md       # This document
```

---

## 3. Design System Integration

### 3.1 Shared CSS (copy from index.html)

| Section | Lines | Purpose |
|---------|-------|---------|
| `:root` variables | 35-105 | Colors, typography, springs, spacing |
| Reset & base | 107-128 | Box-sizing, body styles |
| Container | 130-140 | Max-width wrapper |
| Section label | 142-151 | Mono typography for headers |
| Typography | 153-159 | Heading styles |
| Links | 161-166 | Base anchor styles |
| Navigation | 168-275 | Nav bar + logo styles |
| Footer | 813-948 | Footer layout + social links |
| Accessibility | 950-988 | Reduced motion, focus, selection |

### 3.2 Design Tokens to Use

```css
/* Colors */
--bg: var(--ink-950);           /* #05060A - page background */
--surface: var(--ink-900);       /* #0D0F14 - elevated surfaces */
--ink-850: #121319;              /* card backgrounds */
--text-100: #EAF0FF;             /* primary text */
--text-200: #D6E6FF;             /* secondary text */
--text-400: #A8B2D1;             /* muted text */
--text-600: #676D81;             /* subtle text */
--ice-400: #7DE7FF;              /* accent color */
--uv-600: #7A2BFF;               /* purple accent */

/* Typography */
--font-primary: 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', monospace;
--letter-spacing-tight: -0.03em;

/* Animation */
--spring-hover: 450ms linear(0, 0.2459, 0.6526, 0.9468, 1.0764, 1.0915, 1.0585, 1.0219, 0.9993, 0.9914, 0.9921, 0.9957, 0.9988, 1.0004, 1);
--spring-stagger: 500ms linear(0, 0.4133, 1.0078, 1.2506, 1.1719, 1.0154, 0.9389, 0.9509, 0.9912, 1.0144, 1.0137, 1.0036, 0.9968, 0.9962, 0.9987, 1.0007, 1);
--transition-fast: 0.2s ease;

/* Spacing */
--section-padding: 120px;
--card-gap: 24px;
```

---

## 4. HTML Structure

### 4.1 Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Works — Third Plane Studios</title>
  <meta name="description" content="Selected works from Third Plane Studios. Brand identity, web experiences, generative art, and more.">
  <meta name="theme-color" content="#05060A">

  <!-- Open Graph -->
  <meta property="og:type" content="website">
  <meta property="og:title" content="Works — Third Plane Studios">
  <meta property="og:description" content="Selected works from Third Plane Studios.">
  <meta property="og:url" content="https://www.thirdplane.io/works">

  <!-- Favicon (same as index.html) -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>">

  <!-- Fonts (same as index.html) -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <style>
    /* All CSS goes here */
  </style>
</head>
<body>
  <nav class="nav" id="nav">...</nav>
  <main>
    <section class="works-section">...</section>
  </main>
  <footer class="footer">...</footer>
  <script>...</script>
</body>
</html>
```

### 4.2 Navigation (with Works link active)

```html
<nav class="nav" id="nav">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <span class="logo-third">third</span><span class="logo-plane">plane</span><span class="logo-studios"> studios</span>
    </a>
    <div class="nav-links">
      <a href="/works.html" class="nav-link--active">Works</a>
    </div>
  </div>
</nav>
```

### 4.3 Works Section

```html
<section class="works-section">
  <div class="container">
    <header class="works-head">
      <span class="section-label">Selected Work</span>
      <span class="works-count">08 Projects</span>
    </header>

    <div class="works-grid">
      <!-- Work cards here -->
    </div>
  </div>
</section>
```

### 4.4 Work Card Structure

```html
<a href="#" class="work-card">
  <div class="work-media">
    <img
      src="[placeholder-svg-data-uri]"
      alt="View [Project Name] — [brief description]"
      width="600"
      height="800"
      loading="eager"
      decoding="async"
    >
    <span class="work-index" aria-hidden="true">#001</span>
  </div>
  <div class="work-meta">
    <h3 class="work-title">Project Name</h3>
    <span class="work-type">Category</span>
  </div>
</a>
```

### 4.5 Footer (same as index.html)

Copy exact footer HTML from index.html lines 1020-1046.

---

## 5. CSS Specification

### 5.1 Works Section

```css
.works-section {
  padding: 140px 0 var(--section-padding);
  background: var(--bg);
  min-height: 100vh;
}

.works-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 48px;
}

.works-count {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-600);
  letter-spacing: 0.04em;
}
```

### 5.2 Works Grid

```css
.works-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px 24px;
}

@media (max-width: 1024px) {
  .works-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .works-grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
```

### 5.3 Work Card

```css
.work-card {
  position: relative;
  display: block;
  text-decoration: none;
  color: inherit;
  /* Scroll reveal initial state */
  opacity: 0;
  transform: translateY(24px);
}

.work-card.revealed {
  opacity: 1;
  transform: translateY(0);
  transition:
    opacity 0.5s ease-out,
    transform var(--spring-stagger);
}

/* Focus state for accessibility */
.work-card:focus-visible {
  outline: 2px solid var(--ice-400);
  outline-offset: 4px;
}
```

### 5.4 Work Media (Image Container)

```css
.work-media {
  position: relative;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  background: var(--ink-850);
}

.work-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--spring-hover);
}

.work-card:hover .work-media img {
  transform: scale(1.04);
}
```

### 5.5 Work Index Badge

```css
.work-index {
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-100);
  opacity: 0.5;
  letter-spacing: 0.02em;
  transition: opacity var(--transition-fast);
}

.work-card:hover .work-index {
  opacity: 0.9;
}
```

### 5.6 Work Meta

```css
.work-meta {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}

.work-title {
  font-size: 15px;
  font-weight: 500;
  color: var(--text-200);
  letter-spacing: var(--letter-spacing-tight);
  transition: color var(--transition-fast);
}

.work-card:hover .work-title {
  color: var(--text-100);
}

.work-type {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}
```

### 5.7 Performance Optimization

```css
/* Defer rendering of off-screen cards (items 5+) */
.work-card:nth-child(n+5) {
  content-visibility: auto;
  contain-intrinsic-size: auto 450px;
}
```

### 5.8 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  .work-card {
    opacity: 1;
    transform: none;
    transition: none;
  }

  .work-media img {
    transition: none;
  }
}
```

### 5.9 Nav Link Active State

```css
.nav-link--active {
  color: var(--text-100);
}

.nav-link--active::after {
  width: 100%;
}
```

---

## 6. JavaScript Specification

### 6.1 Nav Scroll State

```javascript
(function() {
  'use strict';

  const nav = document.getElementById('nav');
  if (!nav) return;

  const updateNavState = () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  };

  updateNavState();
  window.addEventListener('scroll', updateNavState, { passive: true });
})();
```

### 6.2 Staggered Scroll Reveal

```javascript
(function() {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll('.work-card');

  if (prefersReducedMotion) {
    cards.forEach(card => card.classList.add('revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const card = entry.target;
        const index = parseInt(card.dataset.index, 10) || 0;

        // Get current column count based on viewport
        const gridStyles = getComputedStyle(card.parentElement);
        const columns = gridStyles.gridTemplateColumns.split(' ').length;

        // Stagger: row delay + column delay
        const row = Math.floor(index / columns);
        const col = index % columns;
        const delay = (row * 80) + (col * 60);

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
})();
```

### 6.3 Lazy Image Loading (for future real images)

```javascript
(function() {
  'use strict';

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const realSrc = img.dataset.src;

        if (realSrc) {
          const tempImg = new Image();
          tempImg.onload = () => {
            img.src = realSrc;
            img.classList.add('loaded');
          };
          tempImg.src = realSrc;
        }

        imageObserver.unobserve(img);
      }
    });
  }, {
    rootMargin: '100px'
  });

  document.querySelectorAll('.work-media img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
})();
```

---

## 7. Placeholder Content

### 7.1 SVG Placeholder Data URI

Generate inline SVG with gradient matching design tokens:

```
data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 600 800'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%237A2BFF' stop-opacity='0.15'/%3E%3Cstop offset='50%25' stop-color='%23121319'/%3E%3Cstop offset='100%25' stop-color='%237DE7FF' stop-opacity='0.08'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='600' height='800' fill='%23121319'/%3E%3Crect width='600' height='800' fill='url(%23g)'/%3E%3C/svg%3E
```

### 7.2 Project Data (8 items)

| Index | Title | Type | Loading |
|-------|-------|------|---------|
| #001 | Lumina | Brand Identity | eager |
| #002 | Synthesis | Web Experience | eager |
| #003 | Void Protocol | Generative Art | eager |
| #004 | Neural Garden | Installation | eager |
| #005 | Chromatic | Motion Design | lazy |
| #006 | Lattice | Data Visualization | lazy |
| #007 | Echo Chamber | Sound Design | lazy |
| #008 | Meridian | Product Design | lazy |

---

## 8. Accessibility Requirements

### 8.1 Semantic Structure
- Use `<main>` for primary content
- Use `<section>` with appropriate heading hierarchy
- Use `<nav>` for navigation

### 8.2 Images
- Alt text describes link purpose: "View [Project] — [description]"
- Decorative indices use `aria-hidden="true"`
- Explicit `width` and `height` attributes

### 8.3 Focus Management
- All cards keyboard-focusable (native `<a>` behavior)
- `:focus-visible` outline using `--ice-400`
- Focus order follows visual order

### 8.4 Motion
- Respect `prefers-reduced-motion: reduce`
- Disable all animations and transforms for reduced motion users

### 8.5 Color Contrast
- Text-100 on ink-950: passes AAA
- Text-600 on ink-950: passes AA

---

## 9. Performance Requirements

### 9.1 Critical Rendering
- First 4 cards (above fold) use `loading="eager"`
- Items 5+ use `content-visibility: auto`
- No render-blocking resources

### 9.2 Image Optimization
- Placeholder SVGs inline (no network request)
- Real images: WebP format, lazy loaded
- Explicit dimensions prevent CLS

### 9.3 JavaScript
- All scripts in single `<script>` at end of body
- Use `passive: true` for scroll listeners
- Unobserve elements after animation completes

---

## 10. Update to index.html

Add nav links section to index.html navigation:

```html
<!-- In index.html, update nav to: -->
<nav class="nav" id="nav">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <span class="logo-third">third</span><span class="logo-plane">plane</span><span class="logo-studios"> studios</span>
    </a>
    <div class="nav-links">
      <a href="/works.html">Works</a>
    </div>
  </div>
</nav>
```

The `.nav-links` CSS already exists in index.html (lines 235-275).

---

## 11. Testing Checklist

- [ ] Grid displays 4 columns on desktop (>1024px)
- [ ] Grid displays 2 columns on tablet (601-1024px)
- [ ] Grid displays 1 column on mobile (≤600px)
- [ ] Hover zoom works on all cards
- [ ] Scroll reveal staggers correctly per row
- [ ] Reduced motion disables all animations
- [ ] Focus outline visible on keyboard navigation
- [ ] Nav scrolled state applies after 50px scroll
- [ ] Page loads without CLS
- [ ] All 8 project cards render
- [ ] Nav link to Works visible on index.html
- [ ] Works nav link shows active state on works.html
