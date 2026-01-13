# Void Return — Implementation Plan

The ring remembers you visited. On return, it awakens with color.

---

## The Experience

### First Visit (Scroll Down)

```
┌─────────────────────────────────────────────────────────────────┐
│  SCREEN 1: THE VOID (100vh)                                     │
│                                                                 │
│  • Monochrome ring                                              │
│  • Wordmark only: "thirdplane studios"                          │
│  • Pure black background                                        │
│  • No nav links                                                 │
│  • Bouncing arrow ↓ at bottom (scroll hint)                     │
│                                                                 │
│                          ↓ scroll                               │
├─────────────────────────────────────────────────────────────────┤
│  SCREEN 2: THE STATEMENT (100vh)                                │
│                                                                 │
│  • Gradient soul background                                     │
│  • Wordmark (nav links removed for now)                         │
│  • Single centered line: "The curation of latent space."        │
│  • Bouncing arrow ↑ at bottom (return hint)                     │
│                                                                 │
│                          ↓ scroll                               │
├─────────────────────────────────────────────────────────────────┤
│  FOOTER (natural height)                                        │
│                                                                 │
│  • Standard footer component                                    │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Return Visit (Scroll Back Up)

```
┌─────────────────────────────────────────────────────────────────┐
│  SCREEN 1: THE VOID — TRANSFORMED                               │
│                                                                 │
│  • Ring now renders in CYBERPUNK or MAGMA (random)              │
│  • Smooth palette transition animation                          │
│  • "The void remembers you visited"                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Section Structure

### Screen 1: `.void-section`

```html
<section class="void-section" id="void">
  <div class="void-wordmark">
    <span class="logo-third">third</span><span class="logo-plane">plane</span><span class="logo-studios"> studios</span>
  </div>
  <canvas class="nova-canvas"></canvas>
  <div class="scroll-indicator" aria-hidden="true">↓</div>
</section>
```

```css
.void-section {
  min-height: 100vh;
  background: var(--ink-950);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.void-wordmark {
  position: absolute;
  top: 20px;
  left: 24px;
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-200);
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: var(--text-600);
  animation: scrollBounce 2s ease-in-out infinite;
  opacity: 0.6;
}

@keyframes scrollBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(12px); }
}
```

### Screen 2: `.statement-section`

```html
<section class="statement-section">
  <div class="statement-wordmark">
    <span class="logo-third">third</span><span class="logo-plane">plane</span><span class="logo-studios"> studios</span>
  </div>
  <h1 class="statement-text">The curation of latent space.</h1>
  <a href="#void" class="return-indicator" aria-label="Return to top">↑</a>
</section>
```

```css
.statement-section {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.statement-section::before {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--gradient-soul);
  pointer-events: none;
}

.statement-wordmark {
  position: absolute;
  top: 20px;
  left: 24px;
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--text-200);
  z-index: 1;
}

.statement-text {
  font-family: var(--font-display);
  font-size: clamp(32px, 6vw, 56px);
  font-weight: 600;
  letter-spacing: -0.03em;
  color: var(--text-100);
  text-align: center;
  position: relative;
  z-index: 1;
}

.return-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 24px;
  color: var(--text-600);
  animation: returnBounce 2s ease-in-out infinite;
  opacity: 0.6;
  text-decoration: none;
  transition: color var(--transition-fast), opacity var(--transition-fast);
}

.return-indicator:hover {
  color: var(--ice-400);
  opacity: 1;
}

@keyframes returnBounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-12px); }
}
```

### Footer

Standard footer component (no changes needed).

```html
<footer class="footer">
  <!-- ... existing footer content from components/_footer.html ... -->
</footer>
```

---

## Scroll Detection & Palette Change

### State Tracking

```javascript
let hasVisitedStatement = false;
let currentPalette = 'monochrome';
let hasTransformed = false;

const palettes = {
  monochrome: {
    a: [200, 200, 210],
    b: [180, 200, 220],
    c: [20, 25, 35]
  },
  cyberpunk: {
    a: [255, 51, 153],
    b: [0, 230, 255],
    c: [13, 5, 26]
  },
  magma: {
    a: [255, 42, 74],
    b: [255, 138, 61],
    c: [77, 13, 20]
  }
};
```

### Scroll Observer

```javascript
const voidSection = document.querySelector('.void-section');
const statementSection = document.querySelector('.statement-section');

// Track when user enters statement section
const statementObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      hasVisitedStatement = true;
    }
  });
}, { threshold: 0.5 });

statementObserver.observe(statementSection);

// Track when user returns to void section
const voidObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && hasVisitedStatement && !hasTransformed) {
      transformVoid();
    }
  });
}, { threshold: 0.5 });

voidObserver.observe(voidSection);
```

### Palette Transformation

```javascript
function transformVoid() {
  hasTransformed = true;

  // Random choice: cyberpunk or magma
  const choices = ['cyberpunk', 'magma'];
  const newPalette = choices[Math.floor(Math.random() * 2)];

  // Animate palette transition
  animatePalette(palettes[currentPalette], palettes[newPalette], 1200);
  currentPalette = newPalette;
}

function animatePalette(from, to, duration) {
  const startTime = performance.now();

  function update() {
    const elapsed = performance.now() - startTime;
    const t = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(t);

    // Interpolate colors
    renderer.colors.a = lerpColor(from.a, to.a, eased);
    renderer.colors.b = lerpColor(from.b, to.b, eased);
    renderer.colors.c = lerpColor(from.c, to.c, eased);

    if (t < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function lerpColor(a, b, t) {
  return [
    a[0] + (b[0] - a[0]) * t,
    a[1] + (b[1] - a[1]) * t,
    a[2] + (b[2] - a[2]) * t
  ];
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}
```

---

## Implementation Order

### Step 1: Restructure HTML
- [ ] Remove hero section content (tagline, sub, CTA)
- [ ] Remove nav links (keep wordmark)
- [ ] Remove projects, writing, labs sections
- [ ] Move Nova Halo canvas to first section (void-section)
- [ ] Create statement section with single tagline
- [ ] Keep footer

### Step 2: Style Sections
- [ ] Void section: 100vh, centered ring, wordmark top-left, bouncing ↓ arrow
- [ ] Statement section: 100vh, gradient bg, centered text, bouncing ↑ arrow

### Step 3: Add Monochrome Palette
- [ ] Add monochrome palette to shader palettes
- [ ] Set as default on page load

### Step 4: Implement Scroll Detection
- [ ] Add IntersectionObserver for both sections
- [ ] Track `hasVisitedStatement` flag

### Step 5: Add Palette Transformation
- [ ] Random selection (cyberpunk/magma)
- [ ] Smooth color interpolation
- [ ] Trigger on return to void

### Step 6: Polish
- [ ] Test scroll behavior
- [ ] Ensure single transform per session
- [ ] Verify arrows bounce correctly (↓ down, ↑ up)

---

## Open Questions

1. **Transform persistence**: Should the ring stay colored for the session, or reset on page reload?
   - Recommend: Reset on reload (each visit starts monochrome)

2. **Multiple returns**: If user scrolls up/down multiple times, should palette change each time?
   - Recommend: Only once per session (first return)

3. **Glow peek color**: Should it match ring's current palette, or always be neutral?
   - Recommend: Neutral/white initially, could match palette after transform

---

*Created December 2025*
