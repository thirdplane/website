# Nova Halo Color Palette Variations

Prototyping palettes for the Nova Halo WebGL effect. Each palette defines three colors:
- **Color A**: Primary gradient endpoint
- **Color B**: Secondary gradient endpoint
- **Color C**: Shadow/depth color (blended at edges via `mix(colorC, col, v0)`)

---

## Current Implementation

### Site Default (Ice + UV)
```glsl
vec3 colorA = vec3(0.490, 0.906, 1.000);  // #7DE7FF — Ice Cyan
vec3 colorB = vec3(0.690, 0.294, 1.000);  // #B04BFF — UV Purple
vec3 colorC = vec3(0.478, 0.169, 1.000);  // #7A2BFF — UV Deep
```
**Vibe**: Cool, electric, tech-forward

### Framer Original
```glsl
vec3 colorA = vec3(0.612, 0.263, 0.996);  // #9C43FE — Purple
vec3 colorB = vec3(0.298, 0.761, 0.914);  // #4CC2E9 — Teal Cyan
vec3 colorC = vec3(0.063, 0.078, 0.600);  // #101499 — Deep Blue
```
**Vibe**: Balanced, classic neon, depth

---

## Warm Variations

### 1. Solar Flare (Gold + Orange + Deep Red)
```glsl
vec3 colorA = vec3(1.000, 0.824, 0.416);  // #FFD26A — Sun Gold
vec3 colorB = vec3(1.000, 0.541, 0.239);  // #FF8A3D — Amber
vec3 colorC = vec3(0.600, 0.120, 0.080);  // #991F14 — Deep Ember
```
**Vibe**: Warm, energetic, sunrise/sunset
**Use case**: Highlight important CTAs, warm accent rings

### 2. Magma (Red + Orange + Black-Red)
```glsl
vec3 colorA = vec3(1.000, 0.165, 0.290);  // #FF2A4A — Strobe Red
vec3 colorB = vec3(1.000, 0.541, 0.239);  // #FF8A3D — Amber
vec3 colorC = vec3(0.300, 0.050, 0.080);  // #4D0D14 — Dark Blood
```
**Vibe**: Intense, dramatic, danger/power
**Use case**: Error states, high-energy sections

### 3. Sunset Gradient (Pink + Gold + Deep Purple)
```glsl
vec3 colorA = vec3(1.000, 0.400, 0.600);  // #FF6699 — Hot Pink
vec3 colorB = vec3(1.000, 0.750, 0.300);  // #FFBF4D — Warm Gold
vec3 colorC = vec3(0.300, 0.100, 0.400);  // #4D1A66 — Deep Violet
```
**Vibe**: Warm dusk, nostalgic, dreamlike
**Use case**: Creative/artistic sections

---

## Cool Variations

### 4. Arctic (Ice + White-Blue + Deep Navy)
```glsl
vec3 colorA = vec3(0.490, 0.906, 1.000);  // #7DE7FF — Ice Cyan
vec3 colorB = vec3(0.800, 0.920, 1.000);  // #CCEBFF — Frost White
vec3 colorC = vec3(0.040, 0.080, 0.200);  // #0A1433 — Deep Navy
```
**Vibe**: Clean, minimal, icy cold
**Use case**: Tech/data visualization, clean UI

### 5. Ocean Depths (Teal + Cyan + Abyss Blue)
```glsl
vec3 colorA = vec3(0.000, 0.808, 0.820);  // #00CED1 — Dark Cyan
vec3 colorB = vec3(0.298, 0.761, 0.914);  // #4CC2E9 — Sky Cyan
vec3 colorC = vec3(0.020, 0.060, 0.150);  // #050F26 — Abyss
```
**Vibe**: Deep, mysterious, underwater
**Use case**: Immersive, calming sections

### 6. Moonlight (Silver + Lavender + Midnight)
```glsl
vec3 colorA = vec3(0.780, 0.800, 0.880);  // #C7CCE0 — Silver
vec3 colorB = vec3(0.700, 0.600, 0.900);  // #B399E5 — Lavender
vec3 colorC = vec3(0.080, 0.060, 0.150);  // #140F26 — Midnight
```
**Vibe**: Soft, ethereal, nocturnal
**Use case**: Subtle backgrounds, elegant accents

---

## Electric/Neon Variations

### 7. Cyberpunk (Hot Pink + Electric Blue + Black)
```glsl
vec3 colorA = vec3(1.000, 0.200, 0.600);  // #FF3399 — Hot Pink
vec3 colorB = vec3(0.000, 0.900, 1.000);  // #00E5FF — Electric Cyan
vec3 colorC = vec3(0.050, 0.020, 0.100);  // #0D0519 — Void Black
```
**Vibe**: High contrast, cyberpunk, 80s retro
**Use case**: Bold statements, gaming aesthetic

### 8. Matrix (Green + Lime + Dark Green)
```glsl
vec3 colorA = vec3(0.000, 1.000, 0.400);  // #00FF66 — Matrix Green
vec3 colorB = vec3(0.600, 1.000, 0.200);  // #99FF33 — Lime
vec3 colorC = vec3(0.000, 0.150, 0.050);  // #00260D — Forest Black
```
**Vibe**: Hacker, digital rain, code
**Use case**: Tech/dev focused, terminal aesthetic

### 9. Synthwave (Purple + Pink + Deep Magenta)
```glsl
vec3 colorA = vec3(0.580, 0.000, 1.000);  // #9400FF — Violet
vec3 colorB = vec3(1.000, 0.412, 0.706);  // #FF69B4 — Hot Pink
vec3 colorC = vec3(0.200, 0.000, 0.300);  // #33004D — Deep Magenta
```
**Vibe**: Retro, vaporwave, 80s nostalgia
**Use case**: Creative projects, music/art

---

## Monochromatic Variations

### 10. UV Spectrum (Light UV + UV + Deep UV)
```glsl
vec3 colorA = vec3(0.800, 0.600, 1.000);  // #CC99FF — Light Lavender
vec3 colorB = vec3(0.690, 0.294, 1.000);  // #B04BFF — UV Purple
vec3 colorC = vec3(0.200, 0.050, 0.400);  // #330D66 — Deep Violet
```
**Vibe**: Cohesive, branded, unified
**Use case**: Brand-focused, consistent theming

### 11. Ice Spectrum (White Ice + Ice + Deep Teal)
```glsl
vec3 colorA = vec3(0.850, 0.970, 1.000);  // #D9F7FF — White Ice
vec3 colorB = vec3(0.490, 0.906, 1.000);  // #7DE7FF — Ice Cyan
vec3 colorC = vec3(0.050, 0.200, 0.250);  // #0D3340 — Deep Teal
```
**Vibe**: Clean, fresh, minimal
**Use case**: Light mode accent, clean tech

---

## Complementary Split Variations

### 12. Teal + Coral (Complementary)
```glsl
vec3 colorA = vec3(0.000, 0.808, 0.820);  // #00CED1 — Teal
vec3 colorB = vec3(1.000, 0.500, 0.400);  // #FF8066 — Coral
vec3 colorC = vec3(0.100, 0.080, 0.120);  // #1A141F — Charcoal
```
**Vibe**: Balanced tension, dynamic contrast
**Use case**: Dual-purpose UI, contrasting elements

### 13. Gold + Purple (Royal)
```glsl
vec3 colorA = vec3(1.000, 0.843, 0.000);  // #FFD700 — Gold
vec3 colorB = vec3(0.580, 0.000, 0.827);  // #9400D3 — Dark Violet
vec3 colorC = vec3(0.150, 0.050, 0.200);  // #260D33 — Royal Black
```
**Vibe**: Luxurious, premium, regal
**Use case**: Premium features, achievements

---

## Usage in Shader

```glsl
// In HaloRenderer initialization:
const palettes = {
  siteDefault: {
    colorA: [0.490, 0.906, 1.000],
    colorB: [0.690, 0.294, 1.000],
    colorC: [0.478, 0.169, 1.000]
  },
  solarFlare: {
    colorA: [1.000, 0.824, 0.416],
    colorB: [1.000, 0.541, 0.239],
    colorC: [0.600, 0.120, 0.080]
  },
  // ... etc
};

// Apply palette:
gl.uniform3fv(uniforms.uColorA, palettes.cyberpunk.colorA);
gl.uniform3fv(uniforms.uColorB, palettes.cyberpunk.colorB);
gl.uniform3fv(uniforms.uColorC, palettes.cyberpunk.colorC);
```

---

## Recommendations for Third Plane Studios

| Use Case | Recommended Palette |
|----------|---------------------|
| Default hero | **Site Default** (Ice + UV) |
| Left ring (Venn) | **UV Spectrum** (purple family) |
| Right ring (Venn) | **Ice Spectrum** (cyan family) |
| Hover/active state | **Cyberpunk** (high contrast) |
| Error/warning | **Magma** (red + orange) |
| Success/completion | **Matrix** or **Ocean Depths** |
| Premium/featured | **Gold + Purple** |

---

## CSS Custom Property Integration

```css
:root {
  /* Nova Halo - Default */
  --nova-color-a: 0.490, 0.906, 1.000;
  --nova-color-b: 0.690, 0.294, 1.000;
  --nova-color-c: 0.478, 0.169, 1.000;

  /* Nova Halo - Warm variant */
  --nova-warm-a: 1.000, 0.824, 0.416;
  --nova-warm-b: 1.000, 0.541, 0.239;
  --nova-warm-c: 0.600, 0.120, 0.080;
}
```

Then read in JavaScript:
```javascript
const style = getComputedStyle(document.documentElement);
const colorA = style.getPropertyValue('--nova-color-a').split(',').map(Number);
```
