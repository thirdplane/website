# Site Restructure Plan

De-clutter landing page, move content sections to dedicated subpages.

---

## Current vs. Proposed Structure

### Current (Monolith)
```
website/
└── index.html          # Everything: hero, ring, projects, writing, labs, footer
```

### Proposed (Modular)
```
website/
├── index.html          # Void landing: ring + wordmark only
├── projects/
│   └── index.html      # Project cards grid
├── writing/
│   └── index.html      # Article list with lines
├── labs/
│   └── index.html      # Experiment cards grid
├── components/
│   ├── README.md       # Component documentation
│   ├── _nav.html       # Reusable nav snippet
│   ├── _footer.html    # Reusable footer snippet
│   └── _head.html      # Shared <head> content
└── docs/
    └── ...             # Design documentation
```

---

## URL Structure

| Page | URL | Content |
|------|-----|---------|
| Landing | `/` | Void + ring + wordmark |
| Projects | `/projects/` | Card grid, "// Selected Work" |
| Writing | `/writing/` | Article list with dates |
| Labs | `/labs/` | Experiment cards |

---

## Page Templates

### Landing (index.html)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   thirdplane studios            (nav hidden until awakening)    │
│                                                                 │
│                                                                 │
│                                                                 │
│                      ╭───────────────╮                          │
│                   ╱                   ╲                         │
│                 ╱                       ╲                       │
│                │                         │                      │
│                │    MONOCHROME RING      │                      │
│                │                         │                      │
│                 ╲                       ╱                       │
│                   ╲_________________╱                           │
│                                                                 │
│                                                                 │
│                                                                 │
│                   (no content sections)                         │
│                   (no footer)                                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

On awakening:
- Nav fades in: "projects  writing  labs"
- Ring gains color
- Optional: subtle "explore →" or scroll hint
```

### Subpage Template (projects/, writing/, labs/)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   thirdplane studios            projects  writing  labs         │
│                                 ^^^^^^^^                        │
│                                 (active state)                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   // Section Label                                              │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐                             │
│   │             │  │             │                             │
│   │   Card 1    │  │   Card 2    │   (or list items)           │
│   │             │  │             │                             │
│   └─────────────┘  └─────────────┘                             │
│                                                                 │
│   ┌─────────────┐  ┌─────────────┐                             │
│   │             │  │             │                             │
│   │   Card 3    │  │   Card 4    │                             │
│   │             │  │             │                             │
│   └─────────────┘  └─────────────┘                             │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   thirdplane studios          j@thirdplane.io                   │
│   The curation of latent space.                                 │
│                                                                 │
│   © 2025 Third Plane Studios                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Asset Preservation

### CSS to Extract

All patterns are documented in `docs/NEON_NOIR_DESIGN_SYSTEM.md`, but for quick reference:

**Grid Patterns:**
```css
/* 2-column project grid */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

/* 3-column labs grid */
.labs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}
```

**Line Patterns:**
```css
/* Writing list with horizontal lines */
.writing-list {
  list-style: none;
  border-top: 1px solid var(--border);
}

.writing-item {
  border-bottom: 1px solid var(--border);
}

/* Footer gradient line */
.footer::before {
  background: linear-gradient(90deg, transparent, rgba(125, 231, 255, 0.3), transparent);
}
```

**Section Labels:**
```css
.section-label {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  color: var(--text-600);
}
/* Usage: <span class="section-label">// Selected Work</span> */
```

---

## Implementation Steps

### Phase 1: Create Subpage Structure

1. [ ] Create `/projects/index.html`
   - Copy nav, projects section, footer from index.html
   - Add active state to "Projects" nav link
   - Keep all project cards

2. [ ] Create `/writing/index.html`
   - Copy nav, writing section, footer
   - Add active state to "Writing" nav link
   - Keep all article items

3. [ ] Create `/labs/index.html`
   - Copy nav, labs section, footer
   - Add active state to "Labs" nav link
   - Keep all lab cards

### Phase 2: Strip Landing Page

4. [ ] Remove from index.html:
   - Hero section (tagline, sub, CTA button)
   - Projects section
   - Writing section
   - Labs section
   - Footer

5. [ ] Keep in index.html:
   - Nav (hidden initially)
   - Nova Halo section (full viewport)

### Phase 3: Implement Awakening

6. [ ] Add void-mode CSS
7. [ ] Add scroll/time trigger
8. [ ] Animate nav reveal
9. [ ] Animate ring color transition

### Phase 4: Polish Subpages

10. [ ] Add page-specific hero/intro if needed
11. [ ] Add back-to-home affordance (logo click)
12. [ ] Test responsive behavior

---

## Nav Active States

```css
/* Add to nav styling */
.nav-links a.active {
  color: var(--ice-400);
}

.nav-links a.active::after {
  width: 100%;
  opacity: 0.4;
}
```

```html
<!-- On projects page -->
<div class="nav-links">
  <a href="/projects/" class="active">Projects</a>
  <a href="/writing/">Writing</a>
  <a href="/labs/">Labs</a>
</div>
```

---

## Shared Components Strategy

For a static site without a build system, use one of these approaches:

### Option A: Copy-Paste (Current)
- Duplicate nav/footer in each file
- Simple but requires manual sync

### Option B: Server-Side Includes (If hosting supports)
```html
<!--#include file="components/_nav.html" -->
```

### Option C: JavaScript Include (Client-side)
```html
<div id="nav-placeholder"></div>
<script>
  fetch('/components/_nav.html')
    .then(r => r.text())
    .then(html => document.getElementById('nav-placeholder').innerHTML = html);
</script>
```

### Option D: Build Step (Future)
- Use 11ty, Astro, or similar
- Components become includes/partials
- Single source of truth

**Recommendation:** Start with Option A (copy-paste), document components in `/components/README.md` for future extraction.

---

## Components Folder Contents

```
components/
├── README.md           # Documentation for each component
├── _nav.html           # Navigation markup (reference copy)
├── _footer.html        # Footer markup (reference copy)
├── _project-card.html  # Single card template
├── _writing-item.html  # Single list item template
└── _lab-card.html      # Single lab card template
```

These are **reference templates**, not live includes. They document the markup patterns for consistency.

---

## File Checklist

After restructure, the repo should contain:

```
website/
├── index.html                    # Void landing
├── projects/
│   └── index.html                # Projects page
├── writing/
│   └── index.html                # Writing page
├── labs/
│   └── index.html                # Labs page
├── components/
│   ├── README.md                 # Component docs
│   └── [template files]          # Reference templates
├── docs/
│   ├── README.md
│   ├── AWAKENING_DESIGN_PLAN.md
│   ├── NEON_NOIR_DESIGN_SYSTEM.md
│   ├── NOVA_HALO_PALETTES.md
│   ├── NOVA_HALO_IMPLEMENTATION.md
│   └── SITE_RESTRUCTURE_PLAN.md  # This file
├── CLAUDE.md
└── .gitignore
```

---

## Questions Before Implementation

1. **Subpage hero**: Should each subpage have a small hero/intro, or dive straight into content?

2. **Ring on subpages**: Should the Nova Halo appear anywhere on subpages (smaller, in corner, etc.) or only on landing?

3. **Footer on landing**: After awakening, should landing show footer, or remain minimal?

4. **Build system**: Stay with pure HTML, or introduce a simple static site generator?

---

*Created December 2025*
