# Nova Halo — WebGL Implementation Reference

Consolidated documentation for the Nova Halo ring effect, based on Framer's halo-glow component.

---

## Quick Reference

### Core Parameters

| Parameter | Value | Description |
|-----------|-------|-------------|
| `INNER_RADIUS` | `0.6` | Ring centerline in UV space |
| `COLOR_ROTATION_SPEED` | `2.0` | Gradient rotates 2x orbit speed |
| `ORBIT_SPEED` | `-1.0` | CCW, one revolution per ~6.28s |
| `noiseDensity` | `0.65` | Spatial frequency of edge noise |
| `noiseSpeed` | `0.5` | Temporal frequency of edge noise |

### Palette Uniforms

```glsl
uniform vec3 uColorA;  // Primary gradient endpoint
uniform vec3 uColorB;  // Secondary gradient endpoint
uniform vec3 uColorC;  // Shadow/depth color (blended at edges)
```

---

## The Draw Function

The core shader logic (from Framer AI):

```glsl
vec4 draw(vec2 uv) {
  // 1. Apply hue shift to base colors
  vec3 color1 = adjustHue(baseColor1, hue);
  vec3 color2 = adjustHue(baseColor2, hue);
  vec3 color3 = adjustHue(baseColor3, hue);

  // 2. Polar coordinates
  float ang = atan(uv.y, uv.x);
  float len = length(uv);
  float invLen = len > 0.0 ? 1.0 / len : 0.0;

  // 3. Animated noise for edge breathing
  float n0 = snoise3(vec3(uv * noiseDensity, iTime * noiseSpeed)) * 0.5 + 0.5;

  // 4. Ring centerline radius (oscillates with noise)
  float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0 * noiseIntensity);
  // Result: r0 oscillates between 0.76 and 0.84

  // 5. Distance to ring at this angle
  float d0 = distance(uv, (r0 * invLen) * uv);

  // 6. Core ring glow (v0)
  float v0 = light1(1.0, 10.0, d0);      // inverse distance: a / (1 + d * b)
  v0 *= smoothstep(r0 * 1.05, r0, len);  // fade inside ring edge

  // 7. Color rotation around ring
  float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;

  // 8. Orbiting highlight (v1)
  float a = iTime * -1.0;                // CCW rotation
  vec2 pos = vec2(cos(a), sin(a)) * r0;  // position on ring
  float d = distance(uv, pos);
  float v1 = light2(1.5, 5.0, d);        // inverse square: a / (1 + d² * b)
  v1 *= light1(1.0, 50.0, d0);           // constrain to ring

  // 9. Edge masks
  float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);  // outer edge
  float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len); // hollow center

  // 10. Color blending
  vec3 col = mix(color1, color2, cl);    // gradient between endpoints
  col = mix(color3, col, v0);            // blend shadow at edges
  col = (col + v1) * v2 * v3;            // add highlight, apply masks
  col = clamp(col, 0.0, 1.0);

  return extractAlpha(col);
}
```

---

## Layer System

The effect uses four multiplicative layers:

### v0 — Ring Glow (Core Luminance)

```glsl
float v0 = light1(1.0, 10.0, d0);
v0 *= smoothstep(r0 * 1.05, r0, len);
```

- Inverse distance falloff from ring centerline
- Smoothstep fades intensity inside the ring edge
- Controls how much of `color1/color2` vs `color3` shows

### v1 — Orbiting Highlight (Sliver)

```glsl
float v1 = light2(1.5, 5.0, d);
v1 *= light1(1.0, 50.0, d0);
```

- Bright point that orbits the ring
- `light2` (inverse square) creates tight, intense highlight
- Constrained to ring by multiplying with `light1(1.0, 50.0, d0)`
- **Additive** to color: `col + v1`

### v2 — Outer Edge Mask

```glsl
float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
```

- Fades to zero outside the ring
- Noise-animated: outer boundary undulates
- **Multiplicative**: `col * v2`

### v3 — Hollow Center Mask

```glsl
float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
```

- Creates the hollow interior
- `v3 = 0` at center, `v3 = 1` at ring
- Transition zone: `innerRadius` (0.6) to `0.8`
- **Multiplicative**: `col * v3`

---

## Lighting Functions

### Inverse Distance (Soft Glow)

```glsl
float light1(float a, float b, float d) {
  return a / (1.0 + d * b);
}
```

- Linear falloff
- `b` controls spread (higher = tighter)
- Used for: ring glow, constraining highlight to ring

### Inverse Square (Point Light)

```glsl
float light2(float a, float b, float d) {
  return a / (1.0 + d * d * b);
}
```

- Physically-based quadratic falloff
- Much tighter than `light1`
- Used for: orbiting highlight sliver

---

## Color System

### YIQ Hue Shifting

```glsl
vec3 rgb2yiq(vec3 c) {
  return vec3(
    dot(c, vec3(0.299, 0.587, 0.114)),
    dot(c, vec3(0.596, -0.274, -0.322)),
    dot(c, vec3(0.211, -0.523, 0.312))
  );
}

vec3 yiq2rgb(vec3 c) {
  return vec3(
    dot(c, vec3(1.0, 0.956, 0.621)),
    dot(c, vec3(1.0, -0.272, -0.647)),
    dot(c, vec3(1.0, -1.106, 1.703))
  );
}

vec3 adjustHue(vec3 color, float hue) {
  vec3 yiq = rgb2yiq(color);
  float h = radians(hue);
  yiq.yz = mat2(cos(h), -sin(h), sin(h), cos(h)) * yiq.yz;
  return yiq2rgb(yiq);
}
```

### Color Blending Order

1. `mix(color1, color2, cl)` — Gradient between endpoints based on angle
2. `mix(color3, col, v0)` — Blend shadow color at low-glow areas
3. `col + v1` — Add bright highlight (additive)
4. `col * v2 * v3` — Apply edge masks (multiplicative)

---

## Noise System

### 3D Simplex Noise

```glsl
float n0 = snoise3(vec3(uv * noiseDensity, iTime * noiseSpeed)) * 0.5 + 0.5;
```

- `noiseDensity` (0.65): spatial scale
- `noiseSpeed` (0.5): temporal scale
- Output normalized to 0-1 range

### Ring Breathing

The noise modulates the ring centerline radius:

```glsl
float r0 = mix(
  mix(innerRadius, 1.0, 0.4),   // min: 0.76
  mix(innerRadius, 1.0, 0.6),   // max: 0.84
  n0 * noiseIntensity
);
```

This creates "breathing" where the ring edge subtly expands and contracts.

---

## Interaction

### Hover Detection (JavaScript)

```javascript
function handleMove(e) {
  const rect = canvas.getBoundingClientRect();
  const mx = (e.clientX - rect.left) / rect.width;
  const my = 1 - (e.clientY - rect.top) / rect.height;
  const dx = (mx - 0.5) * 2;
  const dy = (my - 0.5) * 2;
  const dist = Math.sqrt(dx*dx + dy*dy);
  renderer.setHover(dist < 0.8);
}
```

### Hover Smoothing

```javascript
this.currentHover += (this.targetHover - this.currentHover) * 0.1;
```

### Hover Distortion (Shader)

```glsl
uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
```

### Hover Spin

```javascript
if (this.currentHover > 0.01) {
  this.currentSpin += dt * 0.3;
}
// Applied in shader:
// uv = rot2(uSpin) * uv;
```

---

## WebGL Setup

### Context

```javascript
this.gl = canvas.getContext('webgl', {
  alpha: true,
  premultipliedAlpha: false,
  antialias: true
});
```

### Blending

```javascript
gl.enable(gl.BLEND);
gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
```

### Fullscreen Triangle

```javascript
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
  -1, -1,
   3, -1,
  -1,  3
]), gl.STATIC_DRAW);
```

### DPR Handling

```javascript
const dpr = Math.min(window.devicePixelRatio || 1, 2);
canvas.width = rect.width * dpr;
canvas.height = rect.height * dpr;
```

---

## Uniforms Reference

| Uniform | Type | Description |
|---------|------|-------------|
| `iTime` | float | Elapsed time in seconds |
| `iResolution` | vec2 | Canvas dimensions |
| `uColorA` | vec3 | Primary color (0-1 range) |
| `uColorB` | vec3 | Secondary color (0-1 range) |
| `uColorC` | vec3 | Shadow/depth color (0-1 range) |
| `uHover` | float | Hover intensity (0-1) |
| `uSpin` | float | Accumulated rotation (radians) |
| `uHue` | float | Hue shift (degrees) |
| `uNoiseDensity` | float | Noise spatial scale |
| `uNoiseSpeed` | float | Noise temporal scale |
| `uNoiseIntensity` | float | Noise amplitude |
| `uHoverIntensity` | float | Hover distortion strength |

---

## Performance Notes

1. **DPR Cap**: Limit to 2x to prevent GPU strain on high-DPI displays
2. **Visibility API**: Pause RAF when `document.hidden`
3. **Reduced Motion**: Check `prefers-reduced-motion` and render static frame
4. **Resize Debounce**: 150ms debounce on resize handler
5. **Cleanup**: Cancel RAF, remove listeners, optionally call `WEBGL_lose_context`

---

## See Also

- [NOVA_HALO_PALETTES.md](./NOVA_HALO_PALETTES.md) — Color palette variations
- [NEON_NOIR_DESIGN_SYSTEM.md](./NEON_NOIR_DESIGN_SYSTEM.md) — Full CSS reference
- [AWAKENING_DESIGN_PLAN.md](./AWAKENING_DESIGN_PLAN.md) — Phase transition design

---

*Consolidated from Framer AI responses and frame analysis, December 2025*
