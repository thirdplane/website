# Third Plane Studios

Portfolio website for Third Plane Studios. Built with Eleventy, static HTML/CSS, and a "Neon Noir" design system.

## Quick Start

```bash
npm install

# Development (includes drafts, live reload)
npm run dev
# => http://localhost:8080

# Production build (excludes drafts)
npm run build:prod
# => output in _site/
```

## Site Architecture

The site is a static Eleventy (11ty) project using Nunjucks templates and markdown content. No JavaScript frameworks.

**Navigation:** Collections | Thoughts | About

**Content model:** Works are organized into thematic **collections** by conceptual inquiry, not by medium. An essay, a generative art piece, and a video can all live in the same collection. A single work can belong to multiple collections.

### Folder Structure

```
.
├── _data/              Site config (site.json)
├── _includes/
│   ├── components/     Nav, footer, head
│   ├── layouts/        Page templates (base, work, writing, vignette, collection-detail, etc.)
│   └── styles/         CSS partials (tokens, collections, prose, etc.)
├── collections/        Collection definitions (thematic groupings)
├── works/              Individual works (projects, essays, videos)
├── writings/           Long-form thoughts and essays
├── vignettes/          Short video notes and clips
├── assets/             Images, videos, static files
├── docs/               Internal documentation (not built)
└── .eleventy.js        Build config
```

---

## Adding Content

### Adding a Work

Create a markdown file in `works/`. The filename becomes the URL slug: `works/my-project.md` produces `/works/my-project/`.

**Full frontmatter template:**

```yaml
---
title: "Project Name"
type: "Generative Art"          # Free text, shown in header (e.g. "React App", "AI Video", "Article")
year: 2025                      # Year completed, used for sorting
cover: "/assets/works/project/cover.jpg"  # Cover image URL (Cloudinary or local)
featured: true                  # Pin to top of works list (default: false)
draft: true                     # Hide in production builds (default: false)
memberOf:                       # Collections this work belongs to (use collection slugs)
  - scaffolding-efficient-systems
  - artificial-creativity
badgeType: "essay"              # Type badge on collection pages (see table below)
excerpt: "One sentence about this work."  # Shown on cards and the About timeline
github: https://github.com/you/repo      # Optional: GitHub link in header
live: https://example.com                 # Optional: Live site link in header
---

Your markdown content here. Supports full HTML, images, and shortcodes.
```

**Minimal work (just the required fields):**

```yaml
---
title: "Quick Sketch"
type: "Experiment"
year: 2025
---

Description of the work.
```

**`badgeType` options:**

| Value        | Color  | Use for                        |
|--------------|--------|--------------------------------|
| `essay`      | Cyan   | Written articles, case studies |
| `interface`  | Purple | Apps, UI, interactive work     |
| `generative` | Gold   | Generative art, creative code  |
| `vignette`   | Red    | Video pieces, short clips      |
| `research`   | Amber  | Research, explorations         |

If omitted, the badge falls back to the `type` field text with default styling.

**`memberOf` — valid collection slugs:**

These must match the `slug` field in a collection definition file. Current collections:

- `scaffolding-efficient-systems`
- `artificial-creativity`

A work can list multiple collections. Works not in any collection still appear in `/works/` and the About timeline.

---

### Adding a Thought (Writing)

Create a markdown file in `writings/`. Note: the folder is `writings/` but URLs are `/thoughts/` (remapped via permalink in `writings/writings.json`).

`writings/my-essay.md` produces `/thoughts/my-essay/`.

**Full frontmatter template:**

```yaml
---
title: "Your Essay Title"
date: 2025-01-15               # Publication date (used for sorting, newest first)
description: "One-line description shown on listing pages."
tags:
  - Design
  - Philosophy
---

Your markdown content here.
```

All fields except `title` are optional. The `description` field serves as the excerpt on index pages. Custom `tags` (beyond the auto-applied `writing` tag) display as pills on the article page. Your custom tags are added alongside the auto-applied `writing` tag from the directory data file. Do not re-add `writing` manually.

---

### Adding a Vignette

Create a markdown file in `vignettes/`. `vignettes/my-clip.md` produces `/vignettes/my-clip/`.

**Full frontmatter template:**

```yaml
---
title: "Vignette Title"
date: 2025-01-15               # Publication date (sorted newest first)
video: https://res.cloudinary.com/.../video.mov   # Video source URL (no extension needed in template)
poster: https://res.cloudinary.com/.../thumb.png  # Thumbnail/poster image
duration: "0:24"               # Display duration
model: "Runway Gen-3"          # Optional — AI model used (shown in header)
series: "vibes"                # Optional series grouping label
prompt: "The generation prompt used..."  # Shown in a styled blockquote
memberOf:                      # Collections (same as works)
  - artificial-creativity
badgeType: "vignette"          # Type badge for collection pages
excerpt: "Short description for cards and timeline."
---

Optional markdown body content with notes or context.
```

The `video` and `poster` fields are typically Cloudinary URLs. The `video` shortcode outputs `.mp4` only. If the vignette layout handles additional formats (e.g. `.webm`), those are specified as separate source elements in the layout template, not auto-generated from the base URL.

---

### Adding a Collection

Create a markdown file in `collections/`. The `slug` field in frontmatter determines the URL: `slug: "my-collection"` produces `/collections/my-collection/`.

**Full frontmatter template:**

```yaml
---
title: "Collection Name"
slug: "collection-name"                # URL slug and the value works use in memberOf
accent: "gold"                         # Color theme (see table below)
order: 1                               # Sort position on index page (lower = first)
description: "Short tagline, under 200 characters. Shown on index cards."
longDescription: "Longer description shown at the top of the collection detail page."
curatorNote: "Personal note about why these works belong together."
mosaic:                                # 4 thumbnail URLs for the 2x2 mosaic on the index card
  - "https://example.com/thumb1.jpg"
  - "https://example.com/thumb2.jpg"
  - "https://example.com/thumb3.jpg"
  - "https://example.com/thumb4.jpg"
---
```

Any markdown body below the frontmatter is ignored. All collection content is rendered from frontmatter fields.

**Accent color options:**

| Value    | Color  | Meaning                    |
|----------|--------|----------------------------|
| `gold`   | Gold   | Warm, structured, systems  |
| `uv`     | Purple | Synthetic, technological   |
| `ice`    | Cyan   | Cold, negative space       |
| `strobe` | Red    | Raw, in-progress           |

The accent color carries through the collection dot, card hover glow, detail page header, and curator's note styling.

---

## Content Relationships

### How `memberOf` works

Any content file (work, writing, or vignette) can include a `memberOf` array in its frontmatter. Each entry is a collection `slug`.

```yaml
memberOf:
  - scaffolding-efficient-systems
  - artificial-creativity
```

- The collection detail page automatically lists all content whose `memberOf` includes that collection's slug.
- Work counts on collection cards are computed dynamically.
- A work with no `memberOf` still appears on the `/works/` index and About timeline -- it just won't show up in any collection.

### About page timeline

The About page automatically pulls every item from `works/`, `writings/`, and `vignettes/` into a chronological timeline. No extra configuration needed. Adding any content file automatically includes it.

---

## URL Structure

| Content Type | Folder        | URL Pattern                     | Notes                              |
|--------------|---------------|---------------------------------|------------------------------------|
| Work         | `works/`      | `/works/{filename}/`            | Filename is the slug               |
| Writing      | `writings/`   | `/thoughts/{filename}/`         | Folder is `writings/`, URL is `/thoughts/` |
| Vignette     | `vignettes/`  | `/vignettes/{filename}/`        | Filename is the slug               |
| Collection   | `collections/`| `/collections/{slug}/`          | Uses `slug` from frontmatter, not filename |
| About        | `about.njk`   | `/about/`                       |                                    |
| Home         | `index.html`  | `/`                             |                                    |

The `writings/` to `/thoughts/` remap is defined in `writings/writings.json`:
```json
{ "permalink": "/thoughts/{{ page.fileSlug }}/" }
```

---

## Frontmatter Reference

### Works (`works/*.md`)

| Field       | Required | Type     | Default | Description                                    |
|-------------|----------|----------|---------|------------------------------------------------|
| `title`     | Yes      | string   | --      | Work title                                     |
| `type`      | No       | string   | --      | Free-text type label (shown in work header)    |
| `year`      | No       | number   | --      | Year completed (used for sorting)              |
| `cover`     | No       | string   | --      | Cover image URL                                |
| `featured`  | No       | boolean  | `false` | Pin to top of works list                       |
| `draft`     | No       | boolean  | `false` | Hide from production builds                    |
| `memberOf`  | No       | string[] | --      | Collection slugs this work belongs to          |
| `badgeType` | No       | string   | --      | Type badge: `essay`, `interface`, `generative`, `vignette`, `research` |
| `excerpt`   | No       | string   | --      | Short description for cards and timeline       |
| `github`    | No       | string   | --      | GitHub repo URL (shown as link in header)      |
| `live`      | No       | string   | --      | Live site URL (shown as link in header)        |

### Writings (`writings/*.md`)

| Field         | Required | Type     | Default | Description                              |
|---------------|----------|----------|---------|------------------------------------------|
| `title`       | Yes      | string   | --      | Article title                            |
| `date`        | No       | date     | --      | Publication date (`YYYY-MM-DD`)          |
| `description` | No       | string   | --      | Excerpt for listing pages                |
| `tags`        | No       | string[] | --      | Display tags (the `writing` tag is auto-added) |
| `excerpt`     | No       | string   | --      | Used in About page timeline cards. If omitted, `description` is used as fallback. |
| `draft`       | No       | boolean  | `false` | Field exists in directory data but filtering is not currently implemented for writings. |

### Vignettes (`vignettes/*.md`)

| Field       | Required | Type     | Default | Description                              |
|-------------|----------|----------|---------|------------------------------------------|
| `title`     | Yes      | string   | --      | Vignette title                           |
| `date`      | No       | date     | --      | Publication date (`YYYY-MM-DD`)          |
| `video`     | No       | string   | --      | Video source URL (Cloudinary)            |
| `poster`    | No       | string   | --      | Poster/thumbnail image URL               |
| `duration`  | No       | string   | --      | Display duration (e.g. `"0:24"`)         |
| `model`     | No       | string   | --      | AI model name (e.g. `"Runway Gen-3"`)   |
| `prompt`    | No       | string   | --      | Generation prompt (rendered as blockquote) |
| `series`    | No       | string   | --      | Series grouping label                    |
| `memberOf`  | No       | string[] | --      | Collection slugs                         |
| `badgeType` | No       | string   | --      | Type badge for collection pages          |
| `excerpt`   | No       | string   | --      | Short description for cards and timeline |

### Collections (`collections/*.md`)

| Field             | Required | Type     | Default | Description                              |
|-------------------|----------|----------|---------|------------------------------------------|
| `title`           | Yes      | string   | --      | Collection name                          |
| `slug`            | Yes      | string   | --      | URL slug and `memberOf` reference key    |
| `accent`          | Yes      | string   | --      | Color theme: `gold`, `uv`, `ice`, `strobe` |
| `order`           | No       | number   | `999`   | Sort position on index (lower = first)   |
| `description`     | No       | string   | --      | Short tagline for index cards (<200 chars) |
| `longDescription` | No       | string   | --      | Expanded description for detail page     |
| `curatorNote`     | No       | string   | --      | Personal note about the collection       |
| `mosaic`          | No       | string[] | --      | Array of 4 thumbnail URLs for index card |

---

## Shortcodes

Use these inside any markdown content:

```nunjucks
{% figure "/path/to/image.jpg", "Alt text", "Optional caption", "optional-class" %}

{% video "/path/to/video.mp4", "/poster.jpg", true, true, true %}
{# Arguments: src, poster, autoplay, loop, muted #}
```

---

## Build Modes

```bash
npm run dev          # Development: includes drafts, live reload at localhost:8080
npm run build        # Standard build
npm run build:prod   # Production: excludes draft content
```

Draft filtering is implemented for works only. A work with `draft: true` is hidden in production builds. Writings and vignettes do not currently support draft filtering.

---

## Design Tokens

Color variables and spring animation tokens are defined in `_includes/styles/tokens.css`. See `CLAUDE.md` for the full reference.

Key accent colors:
- **Purple (UV):** `--uv-500` / `--uv-600`
- **Cyan (Ice):** `--ice-400`
- **Red (Strobe):** `--strobe-500`
- **Gold/Amber:** `--sun-400` / `--amber-500`

---

## Current Action Items

There are `[INSERT: ...]` placeholders throughout the content that need real copy, images, and URLs. See `docs/CONTENT_ACTION_ITEMS.md` for the full list organized by file.
