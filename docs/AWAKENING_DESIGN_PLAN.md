# The Awakening — Design Direction

A two-phase landing experience: monochrome void → colorful reveal.

---

## The Insight

The site has two modes that aren't in conflict — they're chapters of the same story:

1. **The Void** — Monochrome ring, pure black, cinematic, mysterious
2. **Neon Noir** — Colorful gradients, UV/ice accents, energetic, functional

---

## Narrative Arc

```
PHASE 0: THE VOID (Landing)
───────────────────────────
• Pure black background (#05060A)
• Monochrome ring (silver/white, subtle cyan bleed)
• Wordmark only: "thirdplane studios"
• NO navigation links
• NO gradient background
• NO scroll indicator (or ultra-subtle)

Duration: Until scroll or ~3-4 seconds
Feeling: "What is this? I want to know more."


PHASE 1: THE AWAKENING (Scroll Trigger)
───────────────────────────────────────
• Ring transitions: monochrome → site-default palette
  (ice cyan ↔ UV purple gradient bleeds in)
• Nav links fade in (muted tone, --text-600)
• Background: --gradient-soul fades in
• Ring may shrink slightly + drift upward

Duration: 800-1200ms transition
Feeling: "It's alive. It's responding to me."


PHASE 2: FULL NEON NOIR (Content)
─────────────────────────────────
• Content sections scroll into view
• Full design system active
• Project cards, writing list, labs grid
• Ring persists as ambient element (or fades to bg)

Feeling: "Now I understand. This is a studio. Show me more."
```

---

## Visual Storyboard

### Frame 1: The Void (Landing)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   thirdplane studios                                            │
│                                                                 │
│                                                                 │
│                                                                 │
│                      ╭───────────────╮                          │
│                   ╱                   ╲                         │
│                 ╱   ┌─ orbiting       ╲                        │
│                │    │  sliver          │                        │
│                │    ↓                  │                        │
│               ◐░░░░░░░░░░░░░░░░░░░░░░░│  ← monochrome          │
│                │                       │    silver/white        │
│                │       (void)          │    subtle cyan         │
│                │                       │    at bottom           │
│                 ╲                     ╱                         │
│                   ╲_________________╱                           │
│                                                                 │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Frame 2: The Awakening (After Scroll)

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   thirdplane studios            projects  writing  labs         │
│                                 ^^^^^^^^^^^^^^^^^^^^^^^^        │
│                                 (fades in, lowercase, muted)    │
│                                                                 │
│                      ╭───────────────╮                          │
│                   ╱ ░░░░░░░░░░░░░░░░░ ╲   ← color bleeds in    │
│                 ╱ ░░ ice ░░░░░░░ uv ░░ ╲                       │
│                │ ░░░░░░░░░░░░░░░░░░░░░░ │                       │
│                │        (void)          │                       │
│                 ╲ ░░░░░░░░░░░░░░░░░░░░ ╱                        │
│                   ╲░░░░░░░░░░░░░░░░░╱                           │
│                                                                 │
│   ┌───────────────────────────────────────────────────────┐     │
│   │         Content begins to peek in from below...       │     │
│   └───────────────────────────────────────────────────────┘     │
│                                                                 │
│   Background: --gradient-soul fades in (purple/pink/gold orbs)  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Palette Strategy

### Preferred Palettes (User Feedback)

| Palette | Vibe | RGB Values |
|---------|------|------------|
| **Monochrome** | Mystery, cinematic | Silver/white tones |
| **Site Default** | Balanced tech-creative | Ice #7DE7FF + UV #B04BFF |
| **Cyberpunk** | Electric, bold | Pink #FF3399 + Cyan #00E5FF |
| **Magma** | Intense, dramatic | Red #FF2A4A + Amber #FF8A3D |

### Recommended Usage

```
Default flow:    Monochrome → Site Default (ice/UV)
Hover on ring:   Intensify toward Cyberpunk (optional)
Future uses:     Magma for 404, error states, or labs experiments
```

---

## Implementation Tasks

### 1. Landing State (Phase 0)

- [ ] Hide nav links by default (`opacity: 0`)
- [ ] Add `.void-mode` class to body on load
- [ ] Create monochrome palette in shader:
  ```javascript
  monochrome: {
    a: [200, 200, 210],  // silver
    b: [180, 200, 220],  // cool silver
    c: [20, 25, 35]      // near black
  }
  ```
- [ ] Hide `--gradient-soul` background
- [ ] Optional: hide scroll indicator initially

### 2. Scroll Detection

- [ ] Detect scroll > 50px OR time > 3500ms
- [ ] Add `.awakened` class to body
- [ ] Trigger color transition

### 3. Awakening Transition

- [ ] Nav links: `opacity 0 → 1` (800ms ease)
- [ ] Ring: interpolate uniforms over ~1000ms (mono → color)
- [ ] Background: fade in `--gradient-soul` (1200ms)
- [ ] Optional: ring `scale 1.0 → 0.85`, `translateY` up

### 4. Nav Typography Update

- [ ] Change to match wordmark tone:
  - lowercase
  - `letter-spacing: 0.08em`
  - `color: var(--text-600)` (not --text-400)
  - `font-size: 13px`
- [ ] Hover: `--ice-400`

### 5. Palette Interpolation (WebGL)

- [ ] Add `uMix` uniform (0.0 = mono, 1.0 = color)
- [ ] In JS: animate `uMix` from 0 → 1 on awakening
- [ ] Shader: `mix(monoPalette, colorPalette, uMix)`

### 6. Optional: Hover Palette Shift

- [ ] On ring hover while awakened: interpolate toward cyberpunk
- [ ] On hover end: ease back to site-default

---

## CSS Additions

```css
/* ============ VOID MODE (Phase 0) ============ */
body.void-mode .nav-links {
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.8s ease;
}

body.void-mode .hero::before {
  opacity: 0;
  transition: opacity 1.2s ease;
}

body.void-mode .scroll-indicator {
  opacity: 0;
}

/* ============ AWAKENED MODE (Phase 1+) ============ */
body.awakened .nav-links {
  opacity: 1;
  pointer-events: auto;
}

body.awakened .hero::before {
  opacity: 1;
}

/* ============ NAV TYPOGRAPHY UPDATE ============ */
.nav-links a {
  font-size: 13px;
  font-weight: 400;
  letter-spacing: 0.08em;
  text-transform: lowercase;
  color: var(--text-600);
}

.nav-links a:hover {
  color: var(--ice-400);
}
```

---

## JavaScript Additions

```javascript
// Awakening trigger
let awakened = false;
const AWAKEN_SCROLL_THRESHOLD = 50;
const AWAKEN_TIME_THRESHOLD = 3500;

function awaken() {
  if (awakened) return;
  awakened = true;
  document.body.classList.remove('void-mode');
  document.body.classList.add('awakened');

  // Animate ring palette
  animatePaletteTransition(0, 1, 1000); // mono → color over 1s
}

// Scroll trigger
window.addEventListener('scroll', () => {
  if (window.scrollY > AWAKEN_SCROLL_THRESHOLD) {
    awaken();
  }
}, { passive: true });

// Time trigger (fallback)
setTimeout(awaken, AWAKEN_TIME_THRESHOLD);

// Initial state
document.body.classList.add('void-mode');
```

---

## Open Questions

1. **Ring behavior on awakening**: Stay in place, shrink + drift up, or fade out?
2. **Mobile**: Same flow, or skip void mode for faster content access?
3. **Cyberpunk hover**: Implement now or save for later?

---

## Reference

- [NEON_NOIR_DESIGN_SYSTEM.md](./NEON_NOIR_DESIGN_SYSTEM.md) — Full CSS reference
- [NOVA_HALO_PALETTES.md](./NOVA_HALO_PALETTES.md) — All palette variations
- [NOVA_HALO_IMPLEMENTATION.md](./NOVA_HALO_IMPLEMENTATION.md) — Shader documentation

---

*Created December 2025*
