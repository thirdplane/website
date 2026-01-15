# Third Plane Studios

Portfolio website built with Eleventy and a "Neon Noir" design system.

## Quick Start

```bash
npm install
npx @11ty/eleventy --serve   # Dev server at localhost:8080
npx @11ty/eleventy           # Production build to _site/
```

## Adding Content

### Writings

Essays and long-form articles. Add markdown files to `writings/`.

```yaml
# writings/your-essay.md
---
title: Your Essay Title
date: 2025-01-15
description: One-line description for listing pages.
tags:
  - Design
  - Philosophy
---

Your markdown content here...
```

### Works

Project case studies. Add markdown files to `works/`.

```yaml
# works/your-project.md
---
title: "Project Name"
type: "Generative Art"
year: 2024
github: https://github.com/you/project  # optional
cover: /assets/works/project/cover.jpg  # optional
featured: true                          # optional, pins to top
draft: true                             # optional, hides in production
---

## Overview

Project description in markdown...
```

### Vignettes

Short notes and video clips. Add markdown files to `vignettes/`.

```yaml
# vignettes/your-note.md
---
title: "Vignette Title"
date: 2025-01-15
prompt: "The generation prompt..."       # for AI-generated content
model: "Runway Gen-3"
video: https://cloudinary.com/...        # video URL
poster: https://cloudinary.com/...jpg    # thumbnail
duration: "0:24"
series: "Void Studies"                   # optional grouping
---

Short note or context about the piece.
```

## Content Reference

| Section   | Directory    | Sorted By                    | Layout        |
|-----------|--------------|------------------------------|---------------|
| Writings  | `writings/`  | Date (newest first)          | `writing.njk` |
| Works     | `works/`     | Featured flag, then year     | `work.njk`    |
| Vignettes | `vignettes/` | Date (newest first)          | `vignette.njk`|

## Project Structure

```
├── _data/              # Global data (site.json)
├── _includes/
│   ├── components/     # Reusable components (nav, footer)
│   ├── layouts/        # Page layouts (base, writing, work)
│   └── styles/         # CSS partials
├── writings/           # Markdown essays
├── works/              # Markdown project pages
├── vignettes/          # Markdown video notes
├── assets/             # Images, videos, static files
└── .eleventy.js        # Eleventy config
```

## Available Shortcodes

Use these in your markdown content:

```nunjucks
{% figure "/path/to/image.jpg", "Alt text", "Optional caption", "optional-class" %}

{% video "/path/to/video.mp4", "/poster.jpg", true, true, true %}
{# Args: src, poster, autoplay, loop, muted #}
```

## Build Modes

```bash
# Development (includes drafts)
npx @11ty/eleventy --serve

# Production (excludes drafts)
ELEVENTY_ENV=production npx @11ty/eleventy
```
