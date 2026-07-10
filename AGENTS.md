# Third Plane Studios Website

Portfolio website for Third Plane Studios using a "Neon Noir" design system.

## Tech Stack

- Static HTML/CSS site
- Google Fonts (Inter, JetBrains Mono)
- CSS custom properties for theming
- Spring-based animations using CSS `linear()` easing

## Motion Dev MCP

Two tools for generating physics-based CSS animations using the `linear()` easing function.

### `mcp__motion-dev__generate-css-spring`

Generates spring animations with natural physics-based motion.

**Parameters:**
- `bounce` (0-1, default: 0.2): Oscillation/overshoot amount
  - `0` = critically damped, no overshoot
  - `0.2` = subtle bounce (default, good for UI)
  - `0.5` = moderate bounce
  - `1` = maximum bounce with significant overshoot
- `duration` (seconds, default: 0.4): Perceptual duration
  - `0.2s` = quick/snappy
  - `0.3-0.4s` = normal
  - `1s` = slow/sluggish

**Output format:** `<calculated_duration>ms linear(<values>)`

**Important - Perceptual vs Calculated Duration:**
The tool returns a CALCULATED duration that may differ from the submitted perceptual duration. Perceptual duration is how long the animation "appears" to take; calculated duration includes settling time.

When coordinating multiple animations, use the SUBMITTED duration for other properties:
```css
/* Requested 0.2s spring, got 800ms calculated */
transition: opacity 0.2s linear, transform 800ms linear(0, 0.0497, ...);
```

**Examples:**
```css
/* Subtle hover (bounce: 0.2, duration: 0.4s) */
--spring-hover: 450ms linear(0, 0.2459, 0.6526, 0.9468, 1.0764, 1.0915, 1.0585, 1.0219, 0.9993, 0.9914, 0.9921, 0.9957, 0.9988, 1.0004, 1);

/* Snappy interaction (bounce: 0.5, duration: 0.3s) */
--spring-snap: 850ms linear(0, 0.0465, 0.158, 0.3009, 0.4514, 0.5935, 0.7182, 0.821, 0.9013, 0.9605, 1.0011, 1.0267, 1.0405, 1.0457, 1.045, 1.0407, 1.0345, 1.0276, 1.0209, 1.0148, 1.0097, 1.0057, 1.0027, 1.0005, 0.9991, 0.9983, 1, 1);

/* No bounce, smooth (bounce: 0, duration: 0.2s) */
--spring-smooth: 800ms linear(0, 0.0497, 0.1647, 0.3069, 0.4517, 0.5848, 0.6991, 0.7923, 0.8647, 0.9186, 0.9571, 0.9831, 0.9996, 1.0091, 1.0137, 1.0151, 1.0146, 1.0129, 1.0108, 1.0086, 1.0066, 1.0048, 1.0033, 1.0022, 1.0013, 1.0007, 1);
```

### `mcp__motion-dev__generate-css-bounce-easing`

Generates bouncing ball animation (element hits target, bounces back).

**Parameters:**
- `duration` (seconds, default: 1): Animation duration
  - Longer = lighter gravity feel
  - Shorter = heavier feel
  - Works best around 1 second

**Output format:** `linear(<values>)` (no duration prefix - you specify your own)

**Usage:**
```css
/* 1 second bounce */
animation: dropIn 1s linear(0, 0.0008, 0.0031, ..., 1);
```

**Key difference from spring:**
- **Spring**: element overshoots target, oscillates around it, settles
- **Bounce**: element reaches target (1.0), bounces back down, settles

### When to Use Each

| Animation Type | Use Case |
|----------------|----------|
| Spring (low bounce) | Hover states, subtle UI feedback |
| Spring (high bounce) | Playful interactions, attention-grabbing |
| Bounce | Drop-in animations, gravity-based motion |

## Existing Spring Variables

The site defines these springs in `:root`:
```css
--spring-hero: 550ms linear(...);   /* Hero entrance animations */
--spring-snap: 700ms linear(...);   /* Logo tension-snap effect */
--spring-stagger: 500ms linear(...); /* Staggered card reveals */
--spring-hover: 450ms linear(...);  /* Hover interactions */
```

## Homepage Architecture

`index.html` extends `base.njk` via Nunjucks `{% extends "layouts/base.njk" %}`. It is a fully integrated template — it uses `components/footer.njk`, `components/nav.njk`, `components/head.njk`, and has access to `_data/site.json` exactly like every other page.

### Homepage-specific CSS
Page-specific styles (void section, statement section, scroll indicators, WebGL canvas) live in `{% block styles %}` inside `index.html`. Do NOT add homepage-only CSS to `footer.css` or other shared files.

### Homepage-specific scripts
The Nova Halo WebGL animation lives in `{% block scripts %}` at the bottom of `index.html`.

### Footer
`components/footer.njk` is the single source of truth for the footer. It renders `site.tagline`, `site.email`, `site.social.*`, and `site.copyright.*` from `_data/site.json`. To change any footer content, edit `_data/site.json` or `_includes/components/footer.njk` — it applies everywhere.

## Assets Folder

Local images are stored in `assets/` and copied to `_site/assets/` via passthrough:

```
assets/
├── images/           # Shared images (collection mosaics, site graphics)
├── works/            # Work-specific images (subfolder per project)
└── vignettes/        # Vignette posters (if not using Cloudinary)
```

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

### Type Badge Colors
```css
[data-type="essay"]      { color: var(--ice-400); }
[data-type="interface"]  { color: var(--uv-400); }
[data-type="generative"] { color: var(--sun-400); }
[data-type="vignette"]   { color: var(--strobe-500); }
[data-type="research"]   { color: var(--amber-500); }
```

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
