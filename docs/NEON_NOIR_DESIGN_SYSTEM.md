# Neon Noir Design System — Third Plane Studios (2025)

A complete reference for the original design system. Preserved for future use.

---

## Table of Contents

1. [Color Tokens](#color-tokens)
2. [Typography](#typography)
3. [Spacing & Layout](#spacing--layout)
4. [Spring Animations](#spring-animations)
5. [Components](#components)
6. [Section Patterns](#section-patterns)
7. [Full CSS Reference](#full-css-reference)

---

## Color Tokens

### Core Neutrals (Ink Scale)

```css
--ink-950: #05060A;   /* Deepest background */
--ink-900: #0D0F14;   /* Surface/card background */
--ink-850: #121319;   /* Subtle elevation */
--ink-800: #16181E;   /* Higher elevation */
```

### Text Scale

```css
--text-100: #EAF0FF;  /* Primary text — crisp white-blue */
--text-200: #D6E6FF;  /* Secondary text — softer */
--text-400: #A8B2D1;  /* Muted text — descriptions */
--text-600: #676D81;  /* Tertiary — labels, meta */
```

### Accent Colors

```css
--uv-600: #7A2BFF;    /* Deep UV purple — brand anchor */
--uv-500: #B04BFF;    /* Bright UV purple — highlights */
--ice-400: #7DE7FF;   /* Ice cyan — primary interactive */
--strobe-500: #FF2A4A; /* Strobe red — alerts, energy */
--sun-400: #FFD26A;   /* Sun gold — warmth, premium */
--amber-500: #FF8A3D; /* Amber — secondary warm */
```

### Semantic Aliases

```css
--bg: var(--ink-950);
--surface: var(--ink-900);
--border: rgba(214, 230, 255, 0.16);
--text: var(--text-100);
--text-muted: var(--text-400);
--brand: var(--uv-600);
--link: var(--ice-400);
```

### Gradient Soul (Hero Background)

```css
--gradient-soul:
  radial-gradient(55rem 55rem at 38% 26%, rgba(122, 43, 255, 0.35) 0%, rgba(122, 43, 255, 0.00) 60%),
  radial-gradient(52rem 52rem at 60% 34%, rgba(176, 75, 255, 0.25) 0%, rgba(176, 75, 255, 0.00) 60%),
  radial-gradient(58rem 58rem at 70% 62%, rgba(255, 42, 74, 0.20) 0%, rgba(255, 42, 74, 0.00) 60%),
  radial-gradient(64rem 64rem at 28% 70%, rgba(255, 138, 61, 0.16) 0%, rgba(255, 138, 61, 0.00) 60%),
  radial-gradient(70rem 70rem at 55% 8%, rgba(125, 231, 255, 0.14) 0%, rgba(125, 231, 255, 0.00) 60%),
  linear-gradient(140deg, rgba(255, 210, 106, 0.00) 0%, rgba(255, 210, 106, 0.00) 28%, rgba(255, 210, 106, 0.22) 36%, rgba(255, 210, 106, 0.00) 55%, rgba(255, 210, 106, 0.00) 100%);
```

### Glow Effects

```css
--glow-uv: 0 0 24px rgba(176, 75, 255, 0.35);
--glow-ice: 0 0 22px rgba(125, 231, 255, 0.25);
--glow-red: 0 0 22px rgba(255, 42, 74, 0.22);
--glow-gold: 0 0 28px rgba(255, 210, 106, 0.18);
```

### Overlays

```css
--scrim: rgba(5, 6, 10, 0.72);
--scrim-strong: rgba(5, 6, 10, 0.86);
```

---

## Typography

### Font Stack

```css
--font-primary: 'Inter', system-ui, -apple-system, sans-serif;
--font-display: 'Space Grotesk', 'Inter', system-ui, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Google Fonts Import

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

### Letter Spacing

```css
--letter-spacing-tight: -0.03em;  /* Headlines */
```

### Type Hierarchy

| Element | Font | Size | Weight | Letter Spacing | Color |
|---------|------|------|--------|----------------|-------|
| H1 (Hero) | Space Grotesk | clamp(48px, 10vw, 72px) | 600 | -0.04em | --text-100 |
| Section Label | JetBrains Mono | 12px | 500 | 0.08em | --text-600 |
| Nav Logo | JetBrains Mono | 14px | 500 | -0.01em | --text-200 |
| Nav Links | Inter | 14px | 500 | — | --text-400 |
| Card Title | Inter | 18px | 600 | -0.03em | --text-100 |
| Card Meta | JetBrains Mono | 11px | — | 0.05em | --text-600 |
| Body | Inter | 16px | 400 | — | --text-400 |
| Tag | JetBrains Mono | 10px | 500 | 0.06em | --ice-400 |

### Section Label Pattern

The `// Comment` style section headers:

```css
.section-label {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  color: var(--text-600);
  margin-bottom: 48px;
  display: block;
}
```

Usage:
```html
<span class="section-label">// Selected Work</span>
<span class="section-label">// Writing</span>
<span class="section-label">// Labs</span>
```

---

## Spacing & Layout

### Section Padding

```css
--section-padding: 120px;
--card-gap: 24px;
```

### Container

```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 768px) {
  .container { padding: 0 48px; }
}
```

---

## Spring Animations

Physics-based easing using CSS `linear()`:

```css
/* Hero entrance — 550ms, slight overshoot */
--spring-hero: 550ms linear(0, 0.2606, 0.7094, 1.0343, 1.158, 1.1389, 1.0674, 1.006, 0.977, 0.975, 0.9856, 0.9967, 1.003, 1, 1.0029, 1.001, 0.9997, 1);

/* Logo tension-snap — 700ms, snappy with bounce */
--spring-snap: 700ms linear(0, 0.1737, 0.5211, 0.8491, 1.0647, 1.1552, 1.1532, 1.1043, 1.0466, 1.0024, 0.979, 0.9735, 0.979, 0.9883, 0.9968, 1.0021, 1.0042, 1.004, 1.0026, 1.0011, 1, 0.9994, 1);

/* Staggered reveals — 500ms, quick settle */
--spring-stagger: 500ms linear(0, 0.4133, 1.0078, 1.2506, 1.1719, 1.0154, 0.9389, 0.9509, 0.9912, 1.0144, 1.0137, 1.0036, 0.9968, 0.9962, 0.9987, 1.0007, 1);

/* Hover interactions — 450ms, subtle */
--spring-hover: 450ms linear(0, 0.2459, 0.6526, 0.9468, 1.0764, 1.0915, 1.0585, 1.0219, 0.9993, 0.9914, 0.9921, 0.9957, 0.9988, 1.0004, 1);
```

### Simple Transitions

```css
--transition-fast: 0.2s ease;
--transition-medium: 0.35s ease;
```

---

## Components

### Navigation

```css
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  padding: 20px 0;
  background: transparent;
  transition: background var(--transition-medium), backdrop-filter var(--transition-medium);
}

.nav.scrolled {
  background: var(--scrim);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
}
```

### Nav Logo (Tension-Snap Effect)

```css
.nav-logo {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.01em;
  color: var(--text-200);
  display: inline-flex;
  align-items: baseline;
  transition: text-shadow var(--spring-snap);
}

.nav-logo:hover {
  text-shadow: var(--glow-ice);
}

.logo-third,
.logo-plane {
  display: inline;
  transition: margin var(--spring-snap);
}

.nav-logo:hover .logo-third {
  margin-right: 0.25em;
}

.nav-logo:hover .logo-plane {
  margin-left: 0.08em;
}

.logo-studios {
  color: var(--text-600);
  margin-left: 0.35em;
}
```

### Nav Links (Underline Reveal)

```css
.nav-links a {
  font-size: 14px;
  font-weight: 500;
  color: var(--text-400);
  position: relative;
  transition: color var(--transition-fast);
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 1px;
  background: var(--ice-400);
  transition: width var(--transition-fast);
}

.nav-links a:hover {
  color: var(--ice-400);
}

.nav-links a:hover::after {
  width: 100%;
}
```

### Project Cards

```css
.project-card {
  background: var(--surface);
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid var(--border);
  transition: transform var(--spring-hover), box-shadow var(--spring-hover), border-color var(--transition-fast);
  cursor: pointer;
}

.project-card:hover {
  transform: translateY(-8px);
  box-shadow: var(--glow-uv);
  border-color: rgba(176, 75, 255, 0.3);
}

.project-image {
  aspect-ratio: 16 / 10;
  background: var(--ink-850);
  overflow: hidden;
}

.project-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.project-card:hover .project-image img {
  transform: scale(1.06);
}

.project-info {
  padding: 28px;
}

.project-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-100);
  margin-bottom: 12px;
  letter-spacing: var(--letter-spacing-tight);
}

.project-meta {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Writing List (Horizontal Shift on Hover)

```css
.writing-list {
  list-style: none;
  border-top: 1px solid var(--border);
}

.writing-item {
  border-bottom: 1px solid var(--border);
}

.writing-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 28px 0;
  gap: 24px;
  transition: padding var(--transition-fast);
}

.writing-link:hover {
  padding-left: 16px;
  padding-right: 8px;
}

.writing-title {
  font-size: 17px;
  font-weight: 500;
  color: var(--text-200);
  letter-spacing: var(--letter-spacing-tight);
  transition: color var(--transition-fast);
  position: relative;
}

.writing-link:hover .writing-title {
  color: var(--ice-400);
}

.writing-link:hover .writing-title::after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 100%;
  height: 1px;
  background: var(--ice-400);
  opacity: 0.6;
}

.writing-date {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-600);
  white-space: nowrap;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

### Lab Cards (Icon + Tag)

```css
.lab-card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px;
  transition: all var(--spring-hover);
  cursor: pointer;
}

.lab-card:hover {
  transform: translateY(-6px);
  border-color: rgba(125, 231, 255, 0.25);
  box-shadow: var(--glow-ice);
}

.lab-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  font-size: 22px;
  transition: transform var(--spring-hover);
}

.lab-icon.uv {
  background: rgba(176, 75, 255, 0.12);
  color: var(--uv-500);
}

.lab-icon.ice {
  background: rgba(125, 231, 255, 0.12);
  color: var(--ice-400);
}

.lab-icon.gold {
  background: rgba(255, 210, 106, 0.12);
  color: var(--sun-400);
}

.lab-card:hover .lab-icon {
  transform: scale(1.1);
}

.lab-tag {
  display: inline-block;
  font-family: var(--font-mono);
  font-size: 10px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: var(--ice-400);
  background: rgba(125, 231, 255, 0.1);
  padding: 6px 14px;
  border-radius: 100px;
}
```

### Primary Button

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 32px;
  font-family: var(--font-primary);
  font-size: 15px;
  font-weight: 600;
  border-radius: 100px;
  border: none;
  cursor: pointer;
  transition: all var(--spring-hover);
}

.btn-primary {
  background: var(--ice-400);
  color: var(--ink-950);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: var(--glow-ice);
}

.btn-primary:active {
  transform: translateY(-1px);
}
```

---

## Section Patterns

### Projects Grid

```css
.projects-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--card-gap);
}

@media (min-width: 700px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
```

### Labs Grid (3-column)

```css
.labs-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--card-gap);
}

@media (min-width: 580px) {
  .labs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .labs-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## Accessibility

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States

```css
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--ice-400);
  outline-offset: 3px;
}
```

### Selection

```css
::selection {
  background: rgba(125, 231, 255, 0.25);
  color: var(--text-100);
}
```

---

## Footer Pattern

```css
.footer {
  background: var(--ink-900);
  padding: 80px 0 48px;
  border-top: 1px solid var(--border);
  position: relative;
}

/* Subtle gradient line at top */
.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(125, 231, 255, 0.3), transparent);
}

.footer-logo {
  font-family: var(--font-mono);
  font-size: 14px;
  font-weight: 500;
  color: var(--text-200);
  letter-spacing: -0.01em;
}

.footer-copyright {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-600);
  text-transform: uppercase;
  letter-spacing: 0.06em;
}
```

---

## Social Icons (Circle + Glow)

```css
.footer-social a {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  color: var(--text-600);
  border: 1px solid var(--border);
  transition: all var(--spring-hover);
}

.footer-social a:hover {
  color: var(--ice-400);
  border-color: var(--ice-400);
  background: rgba(125, 231, 255, 0.08);
  transform: translateY(-3px);
  box-shadow: var(--glow-ice);
}

.footer-social svg {
  width: 18px;
  height: 18px;
}
```

---

## Hero Animation Keyframes

```css
@keyframes heroFadeUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradientPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.85; }
}

@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(12px); }
}

@keyframes fadeIn {
  to { opacity: 0.6; }
}
```

### Hero Element Timing

```css
.hero-tagline {
  opacity: 0;
  transform: translateY(24px);
  animation: heroFadeUp var(--spring-hero) 0.2s forwards;
}

.hero-sub {
  opacity: 0;
  transform: translateY(20px);
  animation: heroFadeUp var(--spring-hero) 0.35s forwards;
}

.btn {
  opacity: 0;
  transform: translateY(16px);
  animation: heroFadeUp var(--spring-hero) 0.5s forwards;
}
```

---

## Quick Reference: Design DNA

| Trait | Value |
|-------|-------|
| Background | Pure black (#05060A) |
| Primary accent | Ice cyan (#7DE7FF) |
| Secondary accent | UV purple (#B04BFF) |
| Card radius | 20-24px |
| Button radius | 100px (pill) |
| Border opacity | 16% white |
| Glow strength | 22-28px blur |
| Section label | `// Monospace Comment Style` |
| Animation style | Spring curves, not bezier |
| Hover lift | -6px to -8px translateY |
| Fonts | Inter / Space Grotesk / JetBrains Mono |

---

*Preserved from Third Plane Studios website, December 2025*
