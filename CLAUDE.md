# Third Plane Studios Website

Portfolio website for Third Plane Studios using a "Neon Noir" design system.

## Homepage Architecture

`index.html` extends `base.njk` via Nunjucks `{% extends "layouts/base.njk" %}`. It is a fully integrated template — it uses `components/footer.njk`, `components/nav.njk`, `components/head.njk`, and has access to `_data/site.json` exactly like every other page.

### Homepage-specific CSS
Page-specific styles (void section, statement section, scroll indicators, WebGL canvas) live in `{% block styles %}` inside `index.html`. Do NOT add homepage-only CSS to `footer.css` or other shared files.

### Homepage-specific scripts
The Nova Halo WebGL animation lives in `{% block scripts %}` at the bottom of `index.html`.

### Footer
`components/footer.njk` is the single source of truth for the footer. It renders `site.tagline`, `site.email`, `site.social.*`, and `site.copyright.*` from `_data/site.json`. To change any footer content, edit `_data/site.json` or `_includes/components/footer.njk` — it applies everywhere.

## Assets Folder

Local images are stored in `assets/` and copied to `_site/assets/` via passthrough.

Reference in frontmatter: `cover: "/assets/works/my-project/cover.jpg"`

For video or images needing transforms, use Cloudinary (cloud: `dxghuzxip`).

## Design Tokens

Key color variables:
- `--uv-600` / `--uv-500`: Purple accents
- `--ice-400`: Cyan/ice accent (primary interactive color)
- `--strobe-500`: Red accent
- `--sun-400` / `--amber-500`: Gold/orange accents

## Collections System (Option D)

The site uses a **thematic collections** architecture instead of type-based organization. Works are grouped by conceptual inquiry, not medium.

### Philosophy
- **Artist as curator**: Works converse across media types
- **Thematic groupings**: "Scaffolding Efficient Systems", "Artificial Creativity"
- **Multi-collection**: A work can belong to multiple collections

### Collection Accent Colors
Each collection has a signature accent that carries through hover states, glows, and badges:

| Collection | Accent | Variable | Slug | Hidden |
|------------|--------|----------|------|--------|
| Scaffolding Efficient Systems | Gold | `--sun-400` | `scaffolding-efficient-systems` | No |
| Artificial Creativity | Purple | `--uv-500` | `artificial-creativity` | No |
| Selected Work | Cyan | `--ice-400` | `selected-work` | Yes |

### Hidden Collections
Collections with `hidden: true` are excluded from the `/collections/` index but remain accessible via direct URL. Use for job application portfolios, client curations, or unlisted shareable links.

### Key Components
- **Collection Card**: 2x2 mosaic thumbnail, accent dot, arrow indicator
- **Curator's Note**: Glass-morphism card with editorial voice
- **Work Card**: Type badge with colored dot, image with hover scale
- **Type Badge**: Floating over media, backdrop-blur, color-coded by type

### Collection Accent Theming
Apply `data-collection-accent` attribute to set theme:
```html
<body data-collection-accent="uv">
```

This sets CSS custom properties:
- `--collection-accent`: Primary accent color
- `--collection-accent-dim`: Background tint (15% opacity)
- `--collection-accent-border`: Border color (20% opacity)
- `--collection-glow`: Box-shadow glow

### Documentation
- Full design spec: `docs/COLLECTIONS_DESIGN_SPEC.md`
- CSS: `_includes/styles/collections.css`
- Mockups: `mockups/option-d-*.html`
