# Components

Reference templates for Third Plane Studios site components.

These are **not live includes** — they're documentation of markup patterns for consistency when building new pages.

---

## Usage

When creating a new page:
1. Copy the relevant component markup from these templates
2. Update content as needed
3. Ensure CSS classes match the design system

---

## Available Components

| Component | File | Used On |
|-----------|------|---------|
| Navigation | `_nav.html` | All pages |
| Footer | `_footer.html` | Subpages |
| Project Card | `_project-card.html` | /projects/ |
| Writing Item | `_writing-item.html` | /writing/ |
| Lab Card | `_lab-card.html` | /labs/ |
| Section Label | `_section-label.html` | All content pages |

---

## Quick Patterns

### Section Label (// Comment Style)

```html
<span class="section-label">// Selected Work</span>
```

### Container

```html
<div class="container">
  <!-- Content here, max-width: 1200px -->
</div>
```

### Grid Layouts

```html
<!-- 2-column (projects) -->
<div class="projects-grid">
  <!-- Cards -->
</div>

<!-- 3-column (labs) -->
<div class="labs-grid">
  <!-- Cards -->
</div>
```

### List Layout

```html
<ul class="writing-list">
  <li class="writing-item">
    <!-- Items -->
  </li>
</ul>
```

---

## CSS Dependencies

All components require the Neon Noir design system CSS. Key variables:

```css
--surface: #0D0F14;
--border: rgba(214, 230, 255, 0.16);
--text-100: #EAF0FF;
--text-400: #A8B2D1;
--text-600: #676D81;
--ice-400: #7DE7FF;
--uv-500: #B04BFF;
--font-mono: 'JetBrains Mono', monospace;
--spring-hover: 450ms linear(...);
```

See `docs/NEON_NOIR_DESIGN_SYSTEM.md` for complete reference.
