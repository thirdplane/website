# Works Case Study Specification

> Third Plane Studios — Portfolio Case Studies
> Version: 1.0 | Date: 2025-01-13

---

## Overview

Works are portfolio case studies — detailed project pages showcasing completed work. Unlike simple portfolio grids, each work gets a dedicated page with:
- Project overview
- Process documentation
- Screenshots/visuals
- Outcomes
- Links (GitHub, live site)

---

## Information Architecture

### URL Structure
```
/works/                    → Index (DIA-style masonry grid)
/works/lumina/             → Individual case study
/works/synthesis/          → Individual case study
```

### Navigation Flow
```
Homepage → Works (grid) → Project Detail (case study)
                ↑
         Click card to enter
```

---

## Content Model

### Front Matter Schema

```yaml
---
layout: layouts/work.njk
title: "Lumina"                       # Required: Project name
type: "Brand Identity"                # Required: Project category
year: 2024                            # Required: Completion year
client: "Lumina AI"                   # Optional: Client name
github: https://github.com/thirdplane/lumina
                                      # Optional: Source code
live: https://lumina.ai               # Optional: Live URL
cover: /assets/works/lumina/cover.jpg # Required: Grid thumbnail
featured: true                        # Optional: Pin to top of grid
draft: false                          # Optional: Exclude from production
---

Case study content in markdown...
```

### Collection Defaults

`works/works.json`:
```json
{
  "layout": "layouts/work.njk",
  "tags": ["work"],
  "draft": false,
  "featured": false
}
```

### Project Types (Taxonomy)

Suggested categories for the `type` field:
- Brand Identity
- Web Experience
- Generative Art
- Motion Design
- Data Visualization
- Installation
- Typography
- Spatial Design
- Sound Design
- Editorial
- Product Design
- Research

---

## Asset Management

### Directory Structure

```
assets/works/
├── lumina/
│   ├── cover.jpg           ← Grid thumbnail (800x600 recommended)
│   ├── hero.jpg            ← Optional: large hero image
│   ├── process-01.jpg      ← Process/exploration images
│   ├── process-02.jpg
│   ├── final-logo.jpg      ← Deliverable screenshots
│   ├── guidelines.jpg
│   └── mockup.jpg
├── synthesis/
│   ├── cover.jpg
│   └── ...
└── void-protocol/
    ├── cover.jpg
    └── ...
```

### Image Guidelines

| Image Type | Dimensions | Format | Notes |
|------------|------------|--------|-------|
| Cover | 800×600 (4:3) | JPG | Grid thumbnail, <200KB |
| Hero | 1600×900 (16:9) | JPG | Full-width header, <500KB |
| Process | Varies | JPG/PNG | Inline images, <300KB each |
| Screenshots | Varies | PNG | UI/product shots |

### Optimization

Images should be optimized before committing:
```bash
# Using ImageOptim CLI (macOS)
imageoptim assets/works/lumina/*.jpg

# Or using squoosh-cli
npx @squoosh/cli --mozjpeg '{"quality":80}' assets/works/lumina/*.jpg
```

---

## Case Study Template

### Recommended Structure

```markdown
---
layout: layouts/work.njk
title: "Lumina"
type: "Brand Identity"
year: 2024
github: https://github.com/thirdplane/lumina
live: https://lumina.ai
cover: /assets/works/lumina/cover.jpg
featured: true
---

## Overview

Brief project summary. What is it? Who is the client? What was the goal?

![Hero image](/assets/works/lumina/hero.jpg)

## The Challenge

What problem needed solving? What constraints existed?

## Process

### Research & Discovery

What did exploration look like? Mood boards, references, initial sketches.

![Process exploration](/assets/works/lumina/process-01.jpg)

### Iteration

How did the solution evolve? Key decisions and pivots.

![Iteration](/assets/works/lumina/process-02.jpg)

## Solution

### Final Deliverables

What was delivered? Key features and components.

![Final logo](/assets/works/lumina/final-logo.jpg)

![Brand guidelines](/assets/works/lumina/guidelines.jpg)

## Results

Outcomes, metrics, client feedback. What impact did the work have?

## Technical Details

- **Stack**: Next.js, Tailwind, Framer Motion
- **Timeline**: 6 weeks
- **Role**: Design & Development

---

[View on GitHub](https://github.com/thirdplane/lumina) · [Visit Live Site](https://lumina.ai)
```

---

## Layout Template

### _includes/layouts/work.njk

```nunjucks
{% extends "layouts/base.njk" %}

{% set bodyClass = "work-page" %}
{% set ogType = "article" %}

{% block styles %}
{% include "styles/work.css" %}
{% include "styles/prose.css" %}
{% endblock %}

{% block content %}
<article class="work">
  <!-- Header with slide-replace navigation -->
  <header class="work-header">
    <div class="container">
      <a href="/works/" class="section-label-link">
        <span class="section-label-link__prefix">//&nbsp;</span>
        <span class="section-label-link__text">
          <span class="section-label-link__default">WORKS</span>
          <span class="section-label-link__hover">← Back</span>
        </span>
      </a>

      <h1 class="work-title">{{ title }}</h1>

      <div class="work-meta">
        <span class="work-type">{{ type }}</span>
        <span class="work-year">{{ year }}</span>
        {% if client %}
        <span class="work-client">{{ client }}</span>
        {% endif %}
      </div>

      {% if github or live %}
      <div class="work-links">
        {% if github %}
        <a href="{{ github }}" target="_blank" rel="noopener" class="work-link">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          GitHub
        </a>
        {% endif %}
        {% if live %}
        <a href="{{ live }}" target="_blank" rel="noopener" class="work-link">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
            <polyline points="15 3 21 3 21 9"/>
            <line x1="10" y1="14" x2="21" y2="3"/>
          </svg>
          Live Site
        </a>
        {% endif %}
      </div>
      {% endif %}
    </div>
  </header>

  <div class="work-content">
    <div class="container container--narrow">
      <div class="prose">
        {{ content | safe }}
      </div>
    </div>
  </div>

  <footer class="work-footer">
    <div class="container">
      <nav class="work-nav" aria-label="More works">
        {% set previousWork = collections.works | getPreviousCollectionItem(page) %}
        {% set nextWork = collections.works | getNextCollectionItem(page) %}

        {% if previousWork %}
        <a href="{{ previousWork.url }}" class="work-nav__link work-nav__link--prev">
          <span class="work-nav__label">Previous</span>
          <span class="work-nav__title">{{ previousWork.data.title }}</span>
        </a>
        {% endif %}

        {% if nextWork %}
        <a href="{{ nextWork.url }}" class="work-nav__link work-nav__link--next">
          <span class="work-nav__label">Next</span>
          <span class="work-nav__title">{{ nextWork.data.title }}</span>
        </a>
        {% endif %}
      </nav>
    </div>
  </footer>
</article>
{% endblock %}
```

---

## Styles

### _includes/styles/work.css

```css
/* ============ WORK PAGE ============ */

.work-header {
  padding: 120px 0 48px;
  border-bottom: 1px solid var(--border);
}

.work-title {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  color: var(--text-100);
  margin: 24px 0 16px;
  letter-spacing: var(--letter-spacing-tight);
}

.work-meta {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
  margin-bottom: 24px;
}

.work-type,
.work-year,
.work-client {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.work-type {
  color: var(--ice-400);
}

.work-links {
  display: flex;
  gap: 16px;
  margin-top: 24px;
}

.work-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-400);
  padding: 8px 16px;
  border: 1px solid var(--border);
  border-radius: 6px;
  transition: all var(--transition-fast);
}

.work-link:hover {
  color: var(--ice-400);
  border-color: var(--ice-400);
  background: rgba(125, 231, 255, 0.08);
}

/* ============ WORK CONTENT ============ */

.work-content {
  padding: 64px 0;
}

.work-content .prose img {
  border-radius: 8px;
  margin: 2em 0;
}

/* ============ WORK NAVIGATION ============ */

.work-footer {
  padding: 48px 0;
  border-top: 1px solid var(--border);
  background: var(--ink-900);
}

.work-nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.work-nav__link {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 24px;
  border: 1px solid var(--border);
  border-radius: 8px;
  transition: all var(--transition-fast);
}

.work-nav__link:hover {
  border-color: var(--ice-400);
  background: rgba(125, 231, 255, 0.04);
}

.work-nav__link--next {
  text-align: right;
}

.work-nav__label {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.work-nav__title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-200);
}

.work-nav__link:hover .work-nav__title {
  color: var(--ice-400);
}

@media (max-width: 600px) {
  .work-nav {
    grid-template-columns: 1fr;
  }

  .work-nav__link--next {
    text-align: left;
  }
}

/* ============ SLIDE-REPLACE HEADER ============ */
/* (Same as writings — extract to shared component) */

.section-label-link {
  display: inline-flex;
  align-items: baseline;
  text-decoration: none;
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--text-600);
}

.section-label-link__text {
  position: relative;
  display: inline-block;
  overflow: hidden;
}

.section-label-link__default,
.section-label-link__hover {
  display: inline-block;
  transition: transform 0.35s ease-out, opacity 0.3s ease-out;
}

.section-label-link__hover {
  position: absolute;
  left: 0;
  top: 0;
  color: var(--ice-400);
  transform: translateX(-100%);
  opacity: 0;
}

.section-label-link:hover .section-label-link__default {
  transform: translateX(100%);
  opacity: 0;
}

.section-label-link:hover .section-label-link__hover {
  transform: translateX(0);
  opacity: 1;
}
```

---

## Index Page

### works/index.njk

```nunjucks
---
layout: layouts/base.njk
title: Works
description: Selected works from Third Plane Studios
bodyClass: works-page
---

{% block styles %}
{% include "styles/works-grid.css" %}
{% endblock %}

<section class="works-section">
  <div class="container">
    <header class="works-head">
      <span class="section-label">Selected Work</span>
      <span class="works-count">{{ collections.works.length | pad(2) }} Projects</span>
    </header>

    <div class="works-grid">
      {% for work in collections.works %}
      <a href="{{ work.url }}" class="work-card" data-index="{{ loop.index0 }}">
        <div class="work-media">
          <img
            src="{{ work.data.cover }}"
            alt="View {{ work.data.title }}"
            loading="{% if loop.index0 < 3 %}eager{% else %}lazy{% endif %}"
            decoding="async"
          >
        </div>
        <div class="work-meta">
          <span class="work-type">{{ work.data.type }}</span>
        </div>
      </a>
      {% endfor %}
    </div>
  </div>
</section>

{% block scripts %}
<script>
  // DIA-style center-out scroll reveal
  // (Same as existing works.html implementation)
</script>
{% endblock %}
```

---

## Eleventy Configuration

Add to `.eleventy.js`:

```javascript
// Works collection
eleventyConfig.addCollection("works", (collectionApi) => {
  const isProduction = process.env.ELEVENTY_ENV === 'production';
  return collectionApi.getFilteredByGlob("works/*.md")
    .filter(item => isProduction ? !item.data.draft : true)
    .sort((a, b) => {
      // Featured items first, then by date
      if (a.data.featured && !b.data.featured) return -1;
      if (!a.data.featured && b.data.featured) return 1;
      return b.date - a.date;
    });
});

// Pad filter for counts
eleventyConfig.addFilter("pad", (num, size = 2) => {
  return String(num).padStart(size, '0');
});
```

---

## Sample Content

### works/lumina.md

```markdown
---
title: "Lumina"
type: "Brand Identity"
year: 2024
client: "Lumina AI"
github: https://github.com/thirdplane/lumina
live: https://lumina.ai
cover: /assets/works/lumina/cover.jpg
featured: true
---

## Overview

Lumina is an AI-powered lighting startup creating adaptive illumination systems for commercial spaces. They needed a brand identity that communicated intelligence and warmth—technology that feels human.

![Lumina brand hero](/assets/works/lumina/hero.jpg)

## The Challenge

The lighting industry is split between cold, clinical tech companies and traditional fixture manufacturers. Lumina needed to occupy a unique position: cutting-edge AI that creates comfortable, human-centered environments.

Key constraints:
- Must work across digital and physical applications
- Scalable from app icons to building signage
- Convey both "smart" and "warm"

## Process

### Exploration

We began with extensive mood boarding, exploring the visual language of light itself—gradients, halos, the way illumination creates atmosphere.

![Mood board](/assets/works/lumina/process-01.jpg)

### Direction Development

Three directions emerged:
1. **Geometric** — Abstract light forms
2. **Organic** — Soft, biological shapes
3. **Typographic** — Custom letterforms with illumination

![Explorations](/assets/works/lumina/process-02.jpg)

The client gravitated toward the organic direction, leading to the final mark.

## Solution

The final logomark represents adaptive light—a form that appears to shift and breathe. The wordmark uses a custom-modified geometric sans with softened terminals, bridging technical precision with approachability.

![Final logo](/assets/works/lumina/final-logo.jpg)

### Brand System

- **Primary palette**: Deep navy (#0A1628) with warm amber (#FFB547) accents
- **Typography**: Inter for UI, custom display face for marketing
- **Motion**: Gentle breathing animations for digital applications

![Brand guidelines](/assets/works/lumina/guidelines.jpg)

## Results

The rebrand launched alongside Lumina's Series A announcement. The new identity has been applied across their product UI, marketing site, investor materials, and environmental signage.

---

**Timeline**: 6 weeks
**Role**: Brand Strategy, Visual Identity, Guidelines

[View on GitHub](https://github.com/thirdplane/lumina) · [Visit Live Site](https://lumina.ai)
```

---

*Document created: 2025-01-13*
