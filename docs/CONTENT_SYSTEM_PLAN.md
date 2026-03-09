# Content Publishing System — Technical Plan

> Third Plane Studios — Content Architecture & Implementation
> Version: 3.0 | Date: 2025-01-13

---

## 1. Executive Summary

### 1.1 Problem Statement

Third Plane Studios needs a publishing system for three content types:
1. **Writings** — Long-form text (essays, process posts, thoughts)
2. **Works** — Case study pages for portfolio projects
3. **Vignettes** — AI-generated videos (10-60 seconds)

Current options (Substack, Medium) break site continuity and surrender design control. We need a solution that:
- Maintains the Neon Noir design system
- Enables easy markdown-based authoring
- Requires minimal friction to publish
- Preserves SEO and performance

### 1.2 Recommended Solution

**Eleventy (11ty)** static site generator with:
- Markdown + front matter for content authoring
- Nunjucks templates inheriting existing design tokens
- Custom shortcodes for embeds and galleries
- GLightbox for vignette lightbox functionality (video support)
- Cloudinary for video hosting
- Zero client-side rendering (all pre-built HTML)

### 1.3 Why Eleventy

| Requirement | Eleventy Solution |
|-------------|-------------------|
| Preserve existing site | Works around current HTML/CSS — incremental adoption |
| Design system control | Templates use existing CSS custom properties |
| Easy authoring | Markdown files with YAML front matter |
| SEO | Pre-rendered static HTML |
| Performance | No JS framework overhead |
| Embeds | Custom shortcodes for iframes |
| Galleries | Collection-based with GLightbox |
| Future-proof | Can add complexity incrementally |

---

## 2. Content Type Specifications

### 2.1 Writings

**Purpose:** Long-form essays, process documentation, design thinking, technical posts.

**Content Model:**
```yaml
---
layout: layouts/writing.njk
title: "Designing in the Void"           # Required
date: 2025-01-15                         # Required, ISO format
description: "Brief summary for SEO"     # Required, <160 chars
tags:                                    # Optional, for filtering
  - design
  - process
featured: false                          # Optional, highlights on index
draft: false                             # Optional, excludes from build
---

Markdown content here...
```

**Features:**
- Full markdown support (headings, lists, code blocks, images, links)
- Syntax highlighting for code (via Prism or Shiki)
- Estimated reading time (auto-calculated)
- Previous/Next navigation within writings
- Tag-based filtering on index page
- RSS feed generation

**URL Structure:** `/writings/[slug]/`

**Index Page:** `/writings/` — Reverse-chronological list with title, date, description

---

### 2.2 Works (Case Studies)

**Purpose:** Portfolio case study pages — detailed breakdowns of projects with screenshots and process documentation.

**Content Model:**
```yaml
---
layout: layouts/work.njk
title: "Project Name"
type: "Brand Identity"                   # or Web Experience, Generative Art, etc.
year: 2024
github: https://github.com/thirdplane/project
live: https://project.com               # optional
cover: /assets/works/project/cover.jpg
featured: true
draft: false
---

Markdown content with case study details...
```

**Features:**
- Individual markdown files (like writings)
- Screenshots stored in git under `assets/works/[project]/`
- GitHub repo link in front matter
- Optional live site link
- DIA-style masonry grid on index, click into detail page
- Type categorization for filtering

**URL Structure:**
- Index: `/works/`
- Individual: `/works/[slug]/`

**Index Page:** `/works/` — DIA-style masonry grid (from existing works.html)

---

### 2.3 Vignettes (Video-First)

**Purpose:** AI-generated videos — visual explorations in latent space (10-60 seconds each).

**Primary Content:** AI-generated videos from tools like Runway Gen-3, Pika, Sora, etc.

**Video Hosting: Cloudinary (Confirmed)**
- Free tier: 25GB bandwidth/month
- Auto poster frame generation
- Adaptive format serving (WebM/MP4)
- No branding (clean HTML5 player)

**URL Patterns:**
- Video: `https://res.cloudinary.com/thirdplane/video/upload/vignettes/[name].mp4`
- Poster: `https://res.cloudinary.com/thirdplane/video/upload/so_0/vignettes/[name].jpg`

**Content Model:**
```yaml
---
layout: layouts/vignette.njk            # optional, mainly for collection
title: "Emergence"
date: 2025-01-15
prompt: "Particle system coalescing into form, slow motion, abstract"
model: "Runway Gen-3"
video: https://res.cloudinary.com/thirdplane/video/upload/vignettes/emergence.mp4
poster: https://res.cloudinary.com/thirdplane/video/upload/so_0/vignettes/emergence.jpg
duration: "0:24"
draft: false
---

Optional notes about the generation process...
```

**Interaction Design:**
- Grid shows poster thumbnail
- Hover: video autoplays (muted, looped)
- Click: opens GLightbox with full video + metadata (prompt, model, duration)
- No individual detail pages (lightbox is sufficient)

**Features:**
- Masonry or uniform grid layout
- GLightbox integration for fullscreen video viewing
- Prompt and model display in lightbox caption
- Duration metadata
- Lazy loading with poster frames
- Hover-to-play interaction

**URL Structure:**
- Gallery index: `/vignettes/`
- No individual pages (lightbox only)

---

## 3. Information Architecture

### 3.1 Site Map (Post-Implementation)

```
thirdplane.io/
├── index.html              # Home (existing void/statement hero)
├── works/                  # Portfolio grid (DIA-style)
│   └── [project]/          # Individual case study pages
├── writings/               # Essay index
│   └── [slug]/             # Individual writing
├── vignettes/              # AI video gallery
│   (lightbox only, no individual pages)
└── about/                  # Future: about page
```

### 3.2 Navigation Updates

**Primary Nav (all pages):**
```html
<nav class="nav">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <span class="logo-third">third</span><span class="logo-plane">plane</span><span class="logo-studios"> studios</span>
    </a>
    <div class="nav-links">
      <a href="/works/">Works</a>
      <a href="/writings/">Writings</a>
      <a href="/vignettes/">Vignettes</a>
    </div>
  </div>
</nav>
```

**Active States:** `.nav-link--active` applied based on current section

**Mobile Consideration:** With 3 nav items, hamburger menu is not needed

---

## 4. Technical Architecture

### 4.1 Directory Structure

```
website/
├── _data/
│   └── site.json
├── _includes/
│   ├── layouts/
│   │   ├── base.njk
│   │   ├── writing.njk
│   │   ├── work.njk              ← NEW
│   │   └── vignette.njk          ← Optional (for collection)
│   ├── components/
│   │   ├── nav.njk
│   │   ├── footer.njk
│   │   ├── head.njk
│   │   ├── writing-card.njk
│   │   ├── work-card.njk         ← NEW
│   │   └── vignette-card.njk     ← UPDATED for video
│   └── styles/
│       ├── tokens.css
│       ├── base.css
│       ├── nav.css
│       ├── footer.css
│       ├── prose.css
│       ├── writing.css
│       ├── work.css              ← NEW
│       └── vignettes.css         ← UPDATED for video
├── writings/
│   ├── writings.json
│   └── *.md
├── works/
│   ├── works.json                ← NEW
│   └── *.md                      ← NEW case studies
├── vignettes/
│   ├── vignettes.json
│   └── *.md                      ← References Cloudinary URLs
├── assets/
│   └── works/                    ← Screenshots for case studies
│       ├── lumina/
│       └── synthesis/
├── .eleventy.js
├── package.json
└── vercel.json
```

### 4.2 Eleventy Configuration

```javascript
// .eleventy.js
module.exports = function(eleventyConfig) {

  // ============ PASSTHROUGH COPIES ============
  // Preserve existing static files
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("*.html");  // Existing pages
  eleventyConfig.addPassthroughCopy("*.css");   // If external stylesheets

  // ============ COLLECTIONS ============
  // Writings collection (exclude drafts in production)
  eleventyConfig.addCollection("writings", (collectionApi) => {
    const isProduction = process.env.ELEVENTY_ENV === 'production';
    return collectionApi.getFilteredByGlob("writings/*.md")
      .filter(item => isProduction ? !item.data.draft : true)
      .sort((a, b) => b.date - a.date);
  });

  // Works collection
  eleventyConfig.addCollection("works", (collectionApi) => {
    const isProduction = process.env.ELEVENTY_ENV === 'production';
    return collectionApi.getFilteredByGlob("works/*.md")
      .filter(item => isProduction ? !item.data.draft : true)
      .sort((a, b) => b.data.year - a.data.year);  // Sort by year descending
  });

  // Featured works (for homepage)
  eleventyConfig.addCollection("featuredWorks", (collectionApi) => {
    return collectionApi.getFilteredByGlob("works/*.md")
      .filter(item => item.data.featured && !item.data.draft)
      .sort((a, b) => b.data.year - a.data.year)
      .slice(0, 6);
  });

  // Vignettes collection
  eleventyConfig.addCollection("vignettes", (collectionApi) => {
    const isProduction = process.env.ELEVENTY_ENV === 'production';
    return collectionApi.getFilteredByGlob("vignettes/*.md")
      .filter(item => isProduction ? !item.data.draft : true)
      .sort((a, b) => b.date - a.date);
  });

  // Featured writings (for homepage or highlights)
  eleventyConfig.addCollection("featuredWritings", (collectionApi) => {
    return collectionApi.getFilteredByGlob("writings/*.md")
      .filter(item => item.data.featured && !item.data.draft)
      .sort((a, b) => b.date - a.date)
      .slice(0, 3);
  });

  // Tag collection for writings
  eleventyConfig.addCollection("writingTags", (collectionApi) => {
    const tags = new Set();
    collectionApi.getFilteredByGlob("writings/*.md").forEach(item => {
      (item.data.tags || []).forEach(tag => tags.add(tag));
    });
    return [...tags].sort();
  });

  // ============ FILTERS ============
  // Date formatting
  eleventyConfig.addFilter("formatDate", (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  });

  // ISO date for datetime attribute
  eleventyConfig.addFilter("isoDate", (date) => {
    return new Date(date).toISOString().split('T')[0];
  });

  // Reading time estimate
  eleventyConfig.addFilter("readingTime", (content) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / wordsPerMinute);
    return `${minutes} min read`;
  });

  // Excerpt (first paragraph)
  eleventyConfig.addFilter("excerpt", (content) => {
    const match = content.match(/<p>(.*?)<\/p>/);
    return match ? match[1] : content.substring(0, 160) + '...';
  });

  // Pad numbers (for counts like "03 Essays")
  eleventyConfig.addFilter("pad", (num, size) => {
    return String(num).padStart(size, '0');
  });

  // ============ SHORTCODES ============
  // Figure with caption
  eleventyConfig.addShortcode("figure", (src, alt, caption) => {
    return `
      <figure class="content-figure">
        <img src="${src}" alt="${alt}" loading="lazy" decoding="async">
        ${caption ? `<figcaption>${caption}</figcaption>` : ''}
      </figure>
    `;
  });

  // Video embed
  eleventyConfig.addShortcode("video", (src, poster, caption) => {
    return `
      <figure class="content-video">
        <video
          src="${src}"
          poster="${poster}"
          controls
          playsinline
          preload="metadata"
        ></video>
        ${caption ? `<figcaption>${caption}</figcaption>` : ''}
      </figure>
    `;
  });

  // ============ MARKDOWN CONFIG ============
  const markdownIt = require("markdown-it");
  const markdownItAnchor = require("markdown-it-anchor");
  const markdownItAttrs = require("markdown-it-attrs");

  const mdOptions = {
    html: true,
    breaks: false,
    linkify: true,
    typographer: true
  };

  const md = markdownIt(mdOptions)
    .use(markdownItAnchor, {
      permalink: markdownItAnchor.permalink.headerLink(),
      level: 2
    })
    .use(markdownItAttrs);

  eleventyConfig.setLibrary("md", md);

  // ============ BUILD CONFIG ============
  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};
```

### 4.3 Collection Configuration Details

#### Pagination for Index Pages

```javascript
// writings/index.njk front matter
---
layout: layouts/base.njk
title: Writings
pagination:
  data: collections.writings
  size: 10
  alias: posts
  reverse: true
permalink: "writings/{% if pagination.pageNumber > 0 %}page/{{ pagination.pageNumber + 1 }}/{% endif %}"
---
```

#### Tag Pages Generation

```javascript
// In .eleventy.js
eleventyConfig.addCollection("writingsByTag", (collectionApi) => {
  const tagMap = {};
  collectionApi.getFilteredByGlob("writings/*.md").forEach(item => {
    (item.data.tags || []).forEach(tag => {
      if (!tagMap[tag]) tagMap[tag] = [];
      tagMap[tag].push(item);
    });
  });
  return tagMap;
});
```

```yaml
# writings/tags.njk
---
pagination:
  data: collections.writingsByTag
  size: 1
  alias: tag
  addAllPagesToCollections: true
permalink: /writings/tags/{{ tag }}/
layout: layouts/base.njk
---
```

#### Featured/Pinned Content

Use the `featured` front matter field combined with collection filtering:

```javascript
// Get featured items first, then remaining by date
eleventyConfig.addCollection("writingsOrdered", (collectionApi) => {
  const all = collectionApi.getFilteredByGlob("writings/*.md")
    .filter(item => !item.data.draft);

  const featured = all.filter(item => item.data.featured)
    .sort((a, b) => b.date - a.date);

  const regular = all.filter(item => !item.data.featured)
    .sort((a, b) => b.date - a.date);

  return [...featured, ...regular];
});
```

#### Draft Handling

Drafts are shown in development but excluded in production:

```javascript
// Collection filtering by environment
eleventyConfig.addCollection("writings", (collectionApi) => {
  const isProduction = process.env.ELEVENTY_ENV === 'production';
  return collectionApi.getFilteredByGlob("writings/*.md")
    .filter(item => isProduction ? !item.data.draft : true)
    .sort((a, b) => b.date - a.date);
});
```

Visual indicator for drafts in development:

```html
<!-- In writing template -->
{% if draft and not isProduction %}
<div class="draft-banner">
  <span>Draft — Not visible in production</span>
</div>
{% endif %}
```

### 4.4 Front Matter Standards

#### Writings Front Matter Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `layout` | string | Yes | - | Template path (always `layouts/writing.njk`) |
| `title` | string | Yes | - | Article title |
| `date` | date | Yes | - | Publication date (ISO 8601) |
| `description` | string | Yes | - | SEO description, max 160 chars |
| `tags` | array | No | `[]` | Categorization tags |
| `featured` | boolean | No | `false` | Pin to top of index |
| `draft` | boolean | No | `false` | Exclude from production build |
| `image` | string | No | - | OG image path |
| `canonicalUrl` | string | No | - | Original publication URL if cross-posted |

**Directory Data File (`writings/writings.json`):**
```json
{
  "layout": "layouts/writing.njk",
  "tags": ["writing"],
  "draft": false,
  "featured": false
}
```

#### Works Front Matter Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `layout` | string | Yes | - | Template path (always `layouts/work.njk`) |
| `title` | string | Yes | - | Project name |
| `type` | string | Yes | - | Project type (Brand Identity, Web Experience, etc.) |
| `year` | number | Yes | - | Project year |
| `cover` | string | Yes | - | Cover image path |
| `github` | string | No | - | GitHub repository URL |
| `live` | string | No | - | Live site URL |
| `featured` | boolean | No | `false` | Show in featured section |
| `draft` | boolean | No | `false` | Exclude from production build |

**Directory Data File (`works/works.json`):**
```json
{
  "layout": "layouts/work.njk",
  "tags": ["work"],
  "draft": false,
  "featured": false
}
```

#### Vignettes Front Matter Schema

| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| `layout` | string | No | - | Template path (optional for collection) |
| `title` | string | Yes | - | Vignette title |
| `date` | date | Yes | - | Creation date |
| `prompt` | string | Yes | - | Generation prompt |
| `model` | string | Yes | - | AI model used (e.g., "Runway Gen-3") |
| `video` | string | Yes | - | Cloudinary video URL |
| `poster` | string | Yes | - | Cloudinary poster frame URL |
| `duration` | string | Yes | - | Video duration (e.g., "0:24") |
| `draft` | boolean | No | `false` | Exclude from production |

**Directory Data File (`vignettes/vignettes.json`):**
```json
{
  "layout": "layouts/vignette.njk",
  "tags": ["vignette"],
  "draft": false
}
```

### 4.5 Dependencies

```json
{
  "name": "thirdplane-website",
  "scripts": {
    "dev": "ELEVENTY_ENV=development eleventy --serve --watch",
    "build": "eleventy",
    "build:prod": "ELEVENTY_ENV=production eleventy",
    "preview": "ELEVENTY_ENV=development eleventy --serve --port=8081",
    "clean": "rm -rf _site",
    "lint": "prettier --check .",
    "debug": "DEBUG=Eleventy* eleventy"
  },
  "devDependencies": {
    "@11ty/eleventy": "^2.0.1",
    "@11ty/eleventy-img": "^3.1.0",
    "@11ty/eleventy-plugin-rss": "^1.2.0",
    "markdown-it": "^14.0.0",
    "markdown-it-anchor": "^8.6.7",
    "markdown-it-attrs": "^4.1.6",
    "prismjs": "^1.29.0"
  }
}
```

---

## 5. Template Specifications

### 5.1 Base Layout (`_includes/layouts/base.njk`)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>{{ title }} — Third Plane Studios</title>
  <meta name="description" content="{{ description | default(site.description) }}">
  <meta name="theme-color" content="#05060A">

  <!-- Open Graph -->
  <meta property="og:type" content="{{ ogType | default('website') }}">
  <meta property="og:title" content="{{ title }} — Third Plane Studios">
  <meta property="og:description" content="{{ description | default(site.description) }}">
  <meta property="og:url" content="{{ site.url }}{{ page.url }}">
  {% if image %}
  <meta property="og:image" content="{{ site.url }}{{ image }}">
  {% endif %}

  <!-- Favicon -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">

  <!-- Styles -->
  <style>
    {% include "styles/tokens.css" %}
    {% include "styles/base.css" %}
    {% include "styles/nav.css" %}
    {% include "styles/footer.css" %}
    {% block styles %}{% endblock %}
  </style>
</head>
<body class="{{ bodyClass | default('') }}">

  {% include "components/nav.njk" %}

  <main>
    {% block content %}
    {{ content | safe }}
    {% endblock %}
  </main>

  {% include "components/footer.njk" %}

  {% block scripts %}{% endblock %}

</body>
</html>
```

### 5.2 Writing Layout (`_includes/layouts/writing.njk`)

```html
{% extends "layouts/base.njk" %}

{% set bodyClass = "writing-page" %}
{% set ogType = "article" %}

{% block styles %}
{% include "styles/writing.css" %}
{% include "styles/prose.css" %}
{% endblock %}

{% block content %}
<article class="writing">
  <header class="writing-header">
    <div class="container">
      <span class="section-label">// WRITING</span>
      <h1 class="writing-title">{{ title }}</h1>
      <div class="writing-meta">
        <time datetime="{{ date | isoDate }}" class="writing-date">
          {{ date | formatDate }}
        </time>
        <span class="writing-reading-time">{{ content | readingTime }}</span>
      </div>
      {% if tags %}
      <div class="writing-tags">
        {% for tag in tags %}
        <span class="tag">{{ tag }}</span>
        {% endfor %}
      </div>
      {% endif %}
    </div>
  </header>

  <div class="writing-content">
    <div class="container container--narrow">
      <div class="prose">
        {{ content | safe }}
      </div>
    </div>
  </div>

  <footer class="writing-footer">
    <div class="container container--narrow">
      <nav class="writing-nav" aria-label="More writings">
        {% set previousPost = collections.writings | getPreviousCollectionItem(page) %}
        {% set nextPost = collections.writings | getNextCollectionItem(page) %}

        {% if previousPost %}
        <a href="{{ previousPost.url }}" class="writing-nav__link writing-nav__link--prev">
          <span class="writing-nav__label">Previous</span>
          <span class="writing-nav__title">{{ previousPost.data.title }}</span>
        </a>
        {% endif %}

        {% if nextPost %}
        <a href="{{ nextPost.url }}" class="writing-nav__link writing-nav__link--next">
          <span class="writing-nav__label">Next</span>
          <span class="writing-nav__title">{{ nextPost.data.title }}</span>
        </a>
        {% endif %}
      </nav>
    </div>
  </footer>
</article>
{% endblock %}
```

### 5.3 Work Layout (`_includes/layouts/work.njk`)

```html
{% extends "layouts/base.njk" %}

{% set bodyClass = "work-page" %}
{% set ogType = "article" %}

{% block styles %}
{% include "styles/work.css" %}
{% include "styles/prose.css" %}
{% endblock %}

{% block content %}
<article class="work">
  <header class="work-header">
    <div class="container">
      <span class="section-label">// {{ type | upper }}</span>
      <h1 class="work-title">{{ title }}</h1>
      <div class="work-meta">
        <span class="work-year">{{ year }}</span>
        {% if github %}
        <a href="{{ github }}" class="work-link" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          GitHub
        </a>
        {% endif %}
        {% if live %}
        <a href="{{ live }}" class="work-link" target="_blank" rel="noopener">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          Live Site
        </a>
        {% endif %}
      </div>
    </div>
  </header>

  {% if cover %}
  <div class="work-cover">
    <div class="container">
      <img src="{{ cover }}" alt="{{ title }} cover image" loading="eager">
    </div>
  </div>
  {% endif %}

  <div class="work-content">
    <div class="container container--narrow">
      <div class="prose">
        {{ content | safe }}
      </div>
    </div>
  </div>

  <footer class="work-footer">
    <div class="container">
      <a href="/works/" class="back-link">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        Back to Works
      </a>
    </div>
  </footer>
</article>
{% endblock %}
```

### 5.4 Vignettes Index (`vignettes/index.njk`)

```html
---
layout: layouts/base.njk
title: Vignettes
description: AI-generated videos — explorations in latent space
bodyClass: vignettes-page
---

{% block styles %}
{% include "styles/vignettes.css" %}
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css">
{% endblock %}

<section class="vignettes-section">
  <div class="container">
    <header class="vignettes-head">
      <span class="section-label">// VIGNETTES</span>
      <span class="vignettes-count">{{ collections.vignettes.length | pad(2) }} Pieces</span>
    </header>

    <div class="vignettes-grid">
      {% for vignette in collections.vignettes %}
      <a href="{{ vignette.data.video }}"
         class="vignette-card glightbox"
         data-gallery="vignettes"
         data-type="video"
         data-title="{{ vignette.data.title }}"
         data-description="<strong>Prompt:</strong> {{ vignette.data.prompt }}<br><strong>Model:</strong> {{ vignette.data.model }}<br><strong>Duration:</strong> {{ vignette.data.duration }}">
        <figure class="vignette-media">
          <img
            src="{{ vignette.data.poster }}"
            alt="{{ vignette.data.title }}"
            loading="lazy"
            decoding="async"
          >
          <video
            class="vignette-preview"
            src="{{ vignette.data.video }}"
            muted
            loop
            playsinline
            preload="none"
          ></video>
          <span class="vignette-duration">{{ vignette.data.duration }}</span>
        </figure>
      </a>
      {% endfor %}
    </div>
  </div>
</section>

{% block scripts %}
<script src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script>
<script>
  // Initialize GLightbox for video
  const lightbox = GLightbox({
    touchNavigation: true,
    loop: true,
    openEffect: 'fade',
    closeEffect: 'fade',
    cssEfects: {
      fade: { in: 'fadeIn', out: 'fadeOut' }
    }
  });

  // Hover to play preview
  const cards = document.querySelectorAll('.vignette-card');
  cards.forEach(card => {
    const video = card.querySelector('.vignette-preview');
    if (!video) return;

    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
</script>
{% endblock %}
```

---

## 6. CSS Specifications

### 6.1 Prose Styles (`_includes/styles/prose.css`)

Typography for long-form content, inheriting Neon Noir tokens:

```css
.prose {
  font-size: 17px;
  line-height: 1.7;
  color: var(--text-200);
}

.prose > * + * {
  margin-top: 1.5em;
}

.prose h2 {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-100);
  margin-top: 2.5em;
  margin-bottom: 0.75em;
  letter-spacing: var(--letter-spacing-tight);
}

.prose h3 {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-100);
  margin-top: 2em;
  margin-bottom: 0.5em;
}

.prose p {
  margin-top: 1.25em;
}

.prose a {
  color: var(--ice-400);
  text-decoration: underline;
  text-decoration-color: rgba(125, 231, 255, 0.3);
  text-underline-offset: 2px;
  transition: text-decoration-color var(--transition-fast);
}

.prose a:hover {
  text-decoration-color: var(--ice-400);
}

.prose strong {
  color: var(--text-100);
  font-weight: 600;
}

.prose em {
  font-style: italic;
}

.prose blockquote {
  border-left: 3px solid var(--uv-600);
  padding-left: 1.5em;
  margin-left: 0;
  color: var(--text-400);
  font-style: italic;
}

.prose ul,
.prose ol {
  padding-left: 1.5em;
}

.prose li {
  margin-top: 0.5em;
}

.prose li::marker {
  color: var(--text-600);
}

.prose code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  background: var(--ink-850);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  color: var(--ice-400);
}

.prose pre {
  background: var(--ink-850);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 1.25em 1.5em;
  overflow-x: auto;
  font-size: 0.875rem;
  line-height: 1.6;
}

.prose pre code {
  background: none;
  padding: 0;
  border-radius: 0;
  color: var(--text-200);
}

.prose img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 2em 0;
}

.prose figure {
  margin: 2em 0;
}

.prose figcaption {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-600);
  text-align: center;
  margin-top: 0.75em;
}

.prose hr {
  border: none;
  height: 1px;
  background: var(--border);
  margin: 3em 0;
}

/* Container variant for narrower prose */
.container--narrow {
  max-width: 720px;
}
```

### 6.2 Vignettes Grid Styles (Video-First)

```css
.vignettes-section {
  padding: 120px 0 var(--section-padding);
  background: var(--bg);
  min-height: 100vh;
}

.vignettes-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 32px;
}

.vignettes-count {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-600);
  letter-spacing: 0.04em;
}

.vignettes-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: min-content;
  align-items: start;
  gap: 24px;
}

@media (max-width: 900px) {
  .vignettes-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
}

@media (max-width: 600px) {
  .vignettes-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
}

.vignette-card {
  display: block;
  position: relative;
  overflow: hidden;
  background: var(--ink-850);
  border-radius: 4px;
  aspect-ratio: 16 / 9;
  transition: transform var(--spring-hover);
}

.vignette-card:hover {
  transform: scale(1.02);
}

.vignette-card:hover .vignette-preview {
  opacity: 1;
}

.vignette-card:hover img {
  opacity: 0;
}

.vignette-media {
  margin: 0;
  width: 100%;
  height: 100%;
  position: relative;
}

.vignette-media img,
.vignette-media .vignette-preview {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
}

.vignette-preview {
  opacity: 0;
}

.vignette-duration {
  position: absolute;
  bottom: 8px;
  right: 8px;
  background: var(--scrim);
  border-radius: 4px;
  padding: 4px 8px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-100);
}

/* GLightbox overrides for Neon Noir */
.glightbox-clean .gslide-description {
  background: var(--scrim-strong);
  font-family: var(--font-primary);
}

.glightbox-clean .gdesc-inner {
  padding: 16px 20px;
}

.glightbox-clean .gslide-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--text-100);
  margin-bottom: 8px;
}

.glightbox-clean .gslide-desc {
  font-family: var(--font-mono);
  font-size: 12px;
  color: var(--text-400);
  line-height: 1.6;
}

.glightbox-clean .gnext,
.glightbox-clean .gprev,
.glightbox-clean .gclose {
  background: var(--surface);
  border: 1px solid var(--border);
}
```

### 6.3 Work Styles (`_includes/styles/work.css`)

```css
.work-page {
  background: var(--bg);
}

.work-header {
  padding: 120px 0 48px;
  text-align: center;
}

.work-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 600;
  color: var(--text-100);
  margin: 16px 0 24px;
  letter-spacing: var(--letter-spacing-tight);
}

.work-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-400);
}

.work-year {
  color: var(--ice-400);
}

.work-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--text-400);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.work-link:hover {
  color: var(--ice-400);
}

.work-cover {
  margin-bottom: 64px;
}

.work-cover img {
  width: 100%;
  max-height: 70vh;
  object-fit: cover;
  border-radius: 8px;
}

.work-content {
  padding-bottom: 80px;
}

.work-footer {
  padding: 48px 0;
  border-top: 1px solid var(--border);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--text-400);
  text-decoration: none;
  transition: color var(--transition-fast);
}

.back-link:hover {
  color: var(--ice-400);
}
```

---

## 7. Build & Deploy Workflow

### 7.1 Development Workflow

#### Hot Reload Configuration

Eleventy's built-in server supports hot reload out of the box:

```bash
# Start dev server with hot reload
npm run dev

# Eleventy serves at http://localhost:8080
# Changes to .md, .njk, .css files trigger rebuild
```

For additional watch targets (e.g., custom JavaScript):

```javascript
// .eleventy.js
eleventyConfig.addWatchTarget("./assets/js/");
eleventyConfig.setWatchThrottleWaitTime(100); // debounce in ms
```

#### Draft Preview with Query Parameter

View drafts in development by checking URL parameters:

```javascript
// In .eleventy.js
eleventyConfig.addGlobalData("eleventyComputed", {
  showDrafts: () => {
    return process.env.ELEVENTY_ENV !== 'production';
  }
});
```

```html
<!-- In template -->
{% if showDrafts %}
<div class="draft-banner">Draft Preview</div>
{% endif %}
```

#### Environment Variables

```javascript
// .eleventy.js
module.exports = function(eleventyConfig) {
  // Access via process.env
  const isProduction = process.env.ELEVENTY_ENV === 'production';

  // Make available in templates
  eleventyConfig.addGlobalData("env", process.env.ELEVENTY_ENV || "development");
  eleventyConfig.addGlobalData("isProduction", isProduction);

  // Conditional behavior
  if (isProduction) {
    // Minify HTML, exclude drafts, etc.
  }
};
```

#### NPM Scripts

```json
{
  "scripts": {
    "dev": "ELEVENTY_ENV=development eleventy --serve --watch",
    "build": "eleventy",
    "build:prod": "ELEVENTY_ENV=production eleventy",
    "preview": "ELEVENTY_ENV=development eleventy --serve --port=8081",
    "clean": "rm -rf _site",
    "debug": "DEBUG=Eleventy* eleventy"
  }
}
```

### 7.2 Production Build

```bash
# Build to _site/ directory
npm run build:prod

# Output is static HTML, ready for any host
```

### 7.3 Deployment: Vercel (Confirmed)

Vercel is already set up for this project. Preview deploys are automatic for PRs.

**`vercel.json`:**
```json
{
  "buildCommand": "npm run build:prod",
  "outputDirectory": "_site",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}
```

### 7.4 Content Authoring Workflow

1. Create new `.md` file in appropriate directory (`writings/`, `works/`, `vignettes/`)
2. Add front matter with required fields
3. Write content in markdown
4. For vignettes: upload video to Cloudinary first, get URLs
5. Run `npm run dev` to preview locally
6. Commit and push to trigger deploy

---

## 8. Implementation Phases

### Phase 1: Foundation (2-3 hours)

**Objective:** Get Eleventy running without breaking existing site

- [ ] Initialize npm and install Eleventy
- [ ] Create `.eleventy.js` with passthrough copies
- [ ] Create `_data/site.json` with global metadata
- [ ] Create `_includes/layouts/base.njk`
- [ ] Create `_includes/components/nav.njk` and `footer.njk`
- [ ] Verify existing `index.html` and `works.html` still work
- [ ] Test build and dev server
- [ ] Add `vercel.json` configuration

**Success Criteria:** `npm run dev` serves site, existing pages unchanged

### Phase 2: Works (2-3 hours)

**Objective:** Launch works section with case study pages

- [ ] Create `_includes/layouts/work.njk`
- [ ] Create `_includes/styles/work.css`
- [ ] Create works collection in `.eleventy.js`
- [ ] Create `works/works.json` defaults
- [ ] Create `works/index.njk` (DIA grid from existing works.html)
- [ ] Add 1-2 sample case study `.md` files
- [ ] Update main nav to include Works link

**Success Criteria:** `/works/` shows grid, `/works/lumina/` renders styled case study

### Phase 3: Writings (2-3 hours)

**Objective:** Launch writings section with seed post

- [ ] Wire up writings collection (template exists)
- [ ] Create `writings/index.njk`
- [ ] Create `_includes/styles/prose.css`
- [ ] Convert existing article to proper `.md`
- [ ] Add reading time filter
- [ ] Add previous/next navigation
- [ ] Update main nav to include Writings link

**Success Criteria:** `/writings/` shows list, `/writings/designing-void/` renders styled post

### Phase 4: Vignettes (3-4 hours)

**Objective:** Launch vignettes gallery with video support

- [ ] Set up Cloudinary account
- [ ] Upload 3-5 sample videos to Cloudinary
- [ ] Create vignettes collection in `.eleventy.js`
- [ ] Update `vignettes/index.njk` with video grid
- [ ] Update `_includes/styles/vignettes.css` for video
- [ ] Implement hover autoplay JavaScript
- [ ] Update GLightbox for video playback
- [ ] Create sample vignette `.md` files with Cloudinary URLs
- [ ] Update main nav to include Vignettes link

**Success Criteria:** `/vignettes/` shows grid with hover-to-play, clicking opens lightbox with video

### Phase 5: Polish (2-3 hours)

**Objective:** Refinements and production readiness

- [ ] Add RSS feed for writings (`@11ty/eleventy-plugin-rss`)
- [ ] Add syntax highlighting for code blocks
- [ ] Add 404 page
- [ ] Add sitemap generation
- [ ] Add SEO meta tags
- [ ] Test responsive layouts at all breakpoints
- [ ] Test reduced motion preferences
- [ ] Performance audit (Lighthouse)

**Success Criteria:** Lighthouse scores 90+ across categories

---

## 9. Migration Strategy

### 9.1 Incremental Adoption Approach

The key principle: **Eleventy should wrap existing content, not replace it immediately.**

1. **Phase 0: Coexistence** — Eleventy builds new content while passing through existing HTML unchanged
2. **Phase 1: Template Extraction** — Extract components from HTML into reusable partials
3. **Phase 2: Progressive Conversion** — Convert pages one at a time, testing after each

### 9.2 Migration Order

Convert content types in this order (simplest to most complex):

1. **Works** (first)
   - Case study pages are the primary portfolio content
   - DIA grid already exists in works.html
   - Tests the base layout and work-specific templates

2. **Writings** (second)
   - Pure markdown content
   - Simple template requirements
   - No JavaScript dependencies
   - Validates prose styles

3. **Vignettes** (last)
   - Most complex (video hosting, hover interactions)
   - Requires Cloudinary setup
   - Tests GLightbox video integration

### 9.3 URL Preservation Strategy

**Goal:** All existing URLs must continue to work after migration.

```javascript
// .eleventy.js passthrough for existing pages
eleventyConfig.addPassthroughCopy("index.html");
eleventyConfig.addPassthroughCopy("works.html");
eleventyConfig.addPassthroughCopy("vignettes.html");
eleventyConfig.addPassthroughCopy("writings.html");
```

Once a page is converted to Eleventy, remove it from passthrough and let the template generate it:

```javascript
// After converting writings.html to writings/index.njk:
// Remove: eleventyConfig.addPassthroughCopy("writings.html");
```

**Permalink Configuration:**
```yaml
# writings/index.njk
---
permalink: /writings/index.html
# Or for clean URLs:
permalink: /writings/
---
```

### 9.4 Testing Strategy During Migration

1. **Visual Regression Testing**
   - Screenshot existing pages before migration
   - Compare after Eleventy conversion
   - Use Percy, Chromatic, or manual comparison

2. **URL Audit**
   ```bash
   # Before migration, capture all URLs
   curl -s https://yoursite.com/sitemap.xml | grep -oP '(?<=<loc>)[^<]+'

   # After migration, verify all still resolve
   ```

3. **Component-Level Testing**
   - Test nav component across all pages
   - Verify footer renders consistently
   - Check active state logic

4. **Incremental Deployment**
   - Deploy after each page conversion
   - Monitor for 404s in analytics
   - Roll back if issues detected

### 9.5 Rollback Plan

Keep original HTML files in a `_legacy/` directory until migration is complete:

```
website/
├── _legacy/
│   ├── writings.html.bak
│   ├── vignettes.html.bak
│   └── works.html.bak
├── writings/
│   └── index.njk          # New Eleventy version
```

To rollback, simply restore the `.bak` file and add it back to passthrough.

---

## 10. Template Extraction Guide

### 10.1 Extracting Components from Existing HTML

The existing HTML pages share common elements. Here's how to extract them.

#### Navigation Component (`_includes/components/nav.njk`)

**Extract from existing HTML (e.g., `writings.html` lines 536-547):**

```html
{% set currentPath = page.url %}

<nav class="nav" id="nav">
  <div class="nav-container">
    <a href="/" class="nav-logo">
      <span class="logo-third">third</span><span class="logo-plane">plane</span><span class="logo-studios"> studios</span>
    </a>
    <div class="nav-links">
      <a href="/works/" {% if '/works' in currentPath %}class="nav-link--active"{% endif %}>Works</a>
      <a href="/writings/" {% if '/writings' in currentPath %}class="nav-link--active"{% endif %}>Writings</a>
      <a href="/vignettes/" {% if '/vignettes' in currentPath %}class="nav-link--active"{% endif %}>Vignettes</a>
    </div>
  </div>
</nav>
```

**Key changes from static HTML:**
- Dynamic active state via `page.url`
- Can be included in any template with `{% include "components/nav.njk" %}`

#### Footer Component (`_includes/components/footer.njk`)

**Extract from existing HTML (common to all pages):**

```html
<footer class="footer">
  <div class="container">
    <div class="footer-content">
      <div class="footer-brand">
        <span class="footer-logo">thirdplane studios</span>
        <p class="footer-tagline">{{ site.tagline }}</p>
      </div>

      <div class="footer-contact">
        <a href="mailto:{{ site.email }}" class="footer-email">{{ site.email }}</a>
        <div class="footer-social">
          <a href="{{ site.social.github }}" target="_blank" rel="noopener" aria-label="GitHub">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
          </a>
          <a href="{{ site.social.twitter }}" target="_blank" rel="noopener" aria-label="Twitter/X">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
          </a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <span class="footer-copyright">&copy; {{ site.currentYear }} Third Plane Studios</span>
    </div>
  </div>
</footer>
```

**Requires `_data/site.json`:**
```json
{
  "title": "Third Plane Studios",
  "tagline": "The curation of latent space.",
  "url": "https://www.thirdplane.io",
  "email": "j@thirdplane.io",
  "currentYear": 2025,
  "social": {
    "github": "https://github.com/thirdplane",
    "twitter": "https://twitter.com/thirdplane"
  }
}
```

#### Head Component (`_includes/components/head.njk`)

**For consistent meta tags across all pages:**

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{{ title }}{% if title %} — {% endif %}{{ site.title }}</title>
<meta name="description" content="{{ description | default(site.description) }}">
<meta name="theme-color" content="#05060A">

<!-- Open Graph -->
<meta property="og:type" content="{{ ogType | default('website') }}">
<meta property="og:title" content="{{ title }}{% if title %} — {% endif %}{{ site.title }}">
<meta property="og:description" content="{{ description | default(site.description) }}">
<meta property="og:url" content="{{ site.url }}{{ page.url }}">
{% if image %}
<meta property="og:image" content="{{ site.url }}{{ image }}">
{% endif %}

<!-- Twitter -->
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="{{ title }}{% if title %} — {% endif %}{{ site.title }}">
<meta name="twitter:description" content="{{ description | default(site.description) }}">

<!-- Favicon -->
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✦</text></svg>">

<!-- Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

### 10.2 CSS Token Extraction Strategy

**Current state:** CSS is inline in each HTML file (duplicated ~100 lines of `:root` variables).

**Recommended approach:** Keep CSS inline for now, but extract to partial files.

```
_includes/styles/
├── tokens.css       # :root variables only (~100 lines)
├── base.css         # Reset, body, container, typography base
├── nav.css          # Navigation styles
├── footer.css       # Footer styles
├── prose.css        # Long-form content typography
├── writing.css      # Writing page specific
├── work.css         # Work/case study page specific
└── vignettes.css    # Vignettes grid and video cards
```

**In base layout:**
```html
<style>
  {% include "styles/tokens.css" %}
  {% include "styles/base.css" %}
  {% include "styles/nav.css" %}
  {% include "styles/footer.css" %}
  {% block styles %}{% endblock %}
</style>
```

**Why inline vs external stylesheet:**
- Inline eliminates render-blocking CSS request
- Small site means CSS fits easily in initial HTML payload
- Can switch to external stylesheet later if CSS grows significantly
- External stylesheet recommended once total CSS exceeds ~50KB

---

## 11. Asset Pipeline

### 11.1 Image Optimization with `@11ty/eleventy-img`

```javascript
// .eleventy.js
const Image = require("@11ty/eleventy-img");
const path = require("path");

async function imageShortcode(src, alt, sizes = "100vw") {
  const metadata = await Image(src, {
    widths: [400, 800, 1200],
    formats: ["avif", "webp", "jpeg"],
    outputDir: "./_site/assets/img/",
    urlPath: "/assets/img/",
    filenameFormat: function (id, src, width, format) {
      const name = path.basename(src, path.extname(src));
      return `${name}-${width}w.${format}`;
    }
  });

  const imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async"
  };

  return Image.generateHTML(metadata, imageAttributes);
}

eleventyConfig.addAsyncShortcode("image", imageShortcode);
```

**Usage in markdown:**
```markdown
{% image "./assets/vignettes/neon-city.jpg", "Cyberpunk cityscape" %}
```

**Output:**
```html
<picture>
  <source type="image/avif" srcset="/assets/img/neon-city-400w.avif 400w, /assets/img/neon-city-800w.avif 800w, /assets/img/neon-city-1200w.avif 1200w" sizes="100vw">
  <source type="image/webp" srcset="/assets/img/neon-city-400w.webp 400w, /assets/img/neon-city-800w.webp 800w, /assets/img/neon-city-1200w.webp 1200w" sizes="100vw">
  <img src="/assets/img/neon-city-400w.jpeg" alt="Cyberpunk cityscape" loading="lazy" decoding="async" width="1200" height="800">
</picture>
```

### 11.2 Works Screenshot Storage

Screenshots for case studies are stored in git:

```
assets/
└── works/
    ├── lumina/
    │   ├── cover.jpg
    │   ├── screenshot-1.jpg
    │   └── screenshot-2.jpg
    └── synthesis/
        ├── cover.jpg
        └── process.jpg
```

### 11.3 Video Hosting with Cloudinary

Videos are too large for git. All vignette videos are hosted on Cloudinary.

**Cloudinary Setup:**
1. Create free account at cloudinary.com
2. Create folder: `vignettes/`
3. Upload videos (MP4, 1080p max recommended)
4. Cloudinary auto-generates poster frames

**URL Patterns:**
```
# Video
https://res.cloudinary.com/thirdplane/video/upload/vignettes/emergence.mp4

# Auto-generated poster (first frame)
https://res.cloudinary.com/thirdplane/video/upload/so_0/vignettes/emergence.jpg

# Poster at specific time (e.g., 2 seconds in)
https://res.cloudinary.com/thirdplane/video/upload/so_2/vignettes/emergence.jpg
```

**Cloudinary Transformations (optional):**
```
# Optimized delivery (auto format, auto quality)
https://res.cloudinary.com/thirdplane/video/upload/f_auto,q_auto/vignettes/emergence.mp4

# Scaled down for preview
https://res.cloudinary.com/thirdplane/video/upload/w_640/vignettes/emergence.mp4
```

**Free Tier Limits:**
- 25GB bandwidth/month
- 25 credits (roughly 25 video transformations)
- Sufficient for portfolio site traffic

---

## 12. Content Authoring Guide

### 12.1 Markdown Conventions

#### Headings

Use H2 (`##`) for main sections, H3 (`###`) for subsections. H1 is reserved for the page title (from front matter).

```markdown
## Main Section

Content here.

### Subsection

More specific content.
```

#### Links

```markdown
<!-- Internal link -->
[another writing](/writings/another-post/)

<!-- External link (opens in same tab by default) -->
[External Resource](https://example.com)

<!-- External link with explicit new tab (use sparingly) -->
<a href="https://example.com" target="_blank" rel="noopener">External Resource</a>
```

#### Emphasis

```markdown
**Bold text** for strong emphasis
*Italic text* for subtle emphasis
`inline code` for technical terms
```

### 12.2 Image Embedding

#### Basic Image

```markdown
![Alt text description](/assets/images/example.jpg)
```

#### Image with Caption (using shortcode)

```markdown
{% figure "/assets/images/example.jpg", "Alt text", "Figure 1: Caption text here" %}
```

#### Optimized Image with Multiple Sizes

```markdown
{% image "./assets/images/example.jpg", "Alt text description", "(max-width: 600px) 100vw, 800px" %}
```

### 12.3 Code Block Syntax Highlighting

#### Setup with Prism.js

Add to `.eleventy.js`:
```javascript
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
eleventyConfig.addPlugin(syntaxHighlight);
```

Add Prism CSS to your styles (or use a CDN):
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css">
```

#### Usage

````markdown
```javascript
const greeting = "Hello, World!";
console.log(greeting);
```
````

````markdown
```css
.vignette-card {
  background: var(--ink-850);
  border-radius: 6px;
}
```
````

#### Supported Languages

Common languages: `javascript`, `typescript`, `css`, `html`, `json`, `yaml`, `markdown`, `bash`, `python`, `jsx`, `tsx`

### 12.4 Front Matter Templates

**Copy-paste templates for new content:**

#### New Writing Post

```yaml
---
title: "Your Title Here"
date: 2025-01-15
description: "A brief description for SEO and social sharing (max 160 characters)."
tags:
  - design
  - process
featured: false
draft: true
---

Your content starts here...
```

#### New Work (Case Study)

```yaml
---
title: "Project Name"
type: "Brand Identity"
year: 2024
github: https://github.com/thirdplane/project
live: https://project.com
cover: /assets/works/project/cover.jpg
featured: true
draft: true
---

## Overview

Brief project overview...

## Process

How the project was approached...

## Outcome

Results and learnings...
```

#### New Vignette

```yaml
---
title: "Vignette Title"
date: 2025-01-15
prompt: "Your generation prompt here"
model: "Runway Gen-3"
video: https://res.cloudinary.com/thirdplane/video/upload/vignettes/your-video.mp4
poster: https://res.cloudinary.com/thirdplane/video/upload/so_0/vignettes/your-video.jpg
duration: "0:24"
draft: true
---

Optional notes about the generation process...
```

---

## 13. Future Enhancements

### 13.1 Short-Term (Post-Launch)

- **Search:** Client-side search with Pagefind or Lunr.js
- **Tags Index:** `/writings/tags/[tag]/` pages
- **Series Support:** Group related writings/vignettes
- **Draft Preview:** URL-based draft preview for unpublished content

### 13.2 Medium-Term

- **Comments:** Giscus (GitHub Discussions) or similar
- **Newsletter:** Email signup integration (Buttondown, ConvertKit)
- **Analytics:** Privacy-respecting analytics (Plausible, Fathom)
- **Work Type Filtering:** Filter works by type on index page

### 13.3 Long-Term

- **CMS Integration:** Decap CMS (formerly Netlify CMS) for non-technical editing
- **Internationalization:** Multi-language support if needed
- **API Endpoint:** JSON feed for programmatic access

---

## 14. Reference

### 14.1 Eleventy Documentation

- [11ty.dev](https://www.11ty.dev/docs/)
- [Collections](https://www.11ty.dev/docs/collections/)
- [Shortcodes](https://www.11ty.dev/docs/shortcodes/)
- [Filters](https://www.11ty.dev/docs/filters/)
- [Eleventy Image](https://www.11ty.dev/docs/plugins/image/)

### 14.2 Related Tools

- [GLightbox](https://github.com/biati-digital/glightbox)
- [Cloudinary](https://cloudinary.com/documentation)
- [markdown-it](https://github.com/markdown-it/markdown-it)
- [Prism.js](https://prismjs.com/) (syntax highlighting)

### 14.3 Design System Reference

- Colors: See `:root` in `works.html` or `index.html`
- Typography: Inter (primary), JetBrains Mono (mono), Space Grotesk (display)
- Springs: `--spring-hover`, `--spring-stagger`, `--spring-hero`, `--spring-snap`

---

*Document authored: 2025-01-09*
*Last updated: 2025-01-13*
