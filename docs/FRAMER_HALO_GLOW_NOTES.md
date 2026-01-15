# Framer Halo-Glow Component — Implementation Notes

These notes are transcribed from Framer's AI description of the existing orb animation component.

---

# PART A: VERBATIM FRAMER AI RESPONSES

## A.1 Initial Animation Description (Verbatim)

> This code implements a WebGL-based animated orb with the following animation characteristics:
>
> **Core Animation:**
> - Continuous time-based animation driven by `iTime` uniform that increments each frame
> - The orb rotates counter-clockwise at a constant speed (angle = iTime * -1.0)
>
> **Visual Effects:**
> 1. **Noise-based morphing**: Uses 3D simplex noise (`snoise3`) that animates over time to create organic, flowing deformations of the orb's edge. The noise samples from `vec3(uv * 0.65, iTime * 0.5)`, creating slow, smooth variations.
> 2. **Animated color gradient**: A cosine-based color oscillation (`cos(angle + iTime * 2.0)`) that rotates around the orb twice as fast as the main rotation, creating a shimmering color shift between two gradient colors.
> 3. **Orbiting light point**: A bright highlight that orbits around the orb's perimeter in a circular path, calculated using `vec2(cos(a), sin(a)) * r0` where `a = iTime * -1.0`.
>
> **Interaction Effects:**
> 1. **Hover detection**: Detects when mouse is within 0.8 radius of the orb center and smoothly interpolates `currentHover` value using exponential smoothing (lerp factor 0.1).
> 2. **Hover distortion**: When hovering, applies sinusoidal wave distortion to UV coordinates:
>    - X-axis: `sin(uv.y * 10.0 + iTime)` - vertical waves
>    - Y-axis: `sin(uv.x * 10.0 + iTime)` - horizontal waves
>    - Intensity scales with `hoverIntensity` property (default 0.2)
> 3. **Rotation on hover**: Optional continuous rotation at 0.3 radians/second when hovering, accumulated in `currentRot` and applied as a 2D rotation matrix to the UV coordinates.
>
> **Rendering Technique:**
> - Uses custom lighting functions (inverse distance and inverse square distance attenuation)
> - Blends three base colors (purple, cyan, dark blue) with hue adjustment capability
> - Alpha extraction based on maximum RGB channel value
> - Smooth falloff using multiple `smoothstep` operations for soft edges
>
> The animation creates a living, breathing orb effect with organic movement, shimmering colors, and responsive interaction.

---

## A.2 Implementation Details for Frontend Agent (Verbatim)

> ### 1. **Continuous Time-Based Animation**
> - Uses `requestAnimationFrame` loop running at 60fps
> - Time uniform (`iTime`) passed to shaders, incremented each frame
> - Time drives multiple animated effects simultaneously
>
> ### 2. **Shader-Based Visual Effects**
>
> **Noise Animation:**
> - 3D Simplex noise function (`snoise3`) creates organic, flowing distortions
> - Noise samples 3D space: `vec3(uv * noiseScale, iTime * 0.5)`
> - Time component makes noise "flow" continuously
> - `noiseScale = 0.65` controls spatial frequency
> - Speed multiplier `0.5` controls temporal frequency
>
> **Rotating Light Effect:**
> - Orbital light source rotates around the orb
> - Position calculated: `vec2(cos(a), sin(a)) * r0` where `a = iTime * -1.0`
> - Creates dynamic highlights that circle the sphere
> - Combined with distance-based lighting (`light2` function)
>
> **Color Mixing:**
> - Three base colors blend based on noise and angle
> - `cos(ang + iTime * 2.0)` creates rotating color transitions
> - Hue shift applied to all colors via YIQ color space transformation
>
> ### 3. **Mouse Interaction System**
>
> **Hover Detection:**
> - Tracks mouse position relative to orb center
> - Calculates UV coordinates from mouse position
> - Checks if distance from center < 0.8 (within orb bounds)
> - Sets `targetHover` to 1 when hovering, 0 otherwise
>
> **Smooth Transitions:**
> - `currentHover` interpolates toward `targetHover` using exponential smoothing
> - Formula: `currentHover += (targetHover - currentHover) * 0.1`
> - Creates smooth 100ms-ish ease-in/ease-out effect
>
> **Hover Effects:**
> - **Wave Distortion:** UV coordinates displaced by sine waves when hovering
>   ```glsl
>   uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime)
>   uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime)
>   ```
> - Creates rippling, liquid-like distortion
> - Intensity controlled by `hoverIntensity` prop (default 0.2)
>
> **Rotation on Hover:**
> - When hovering and `rotateOnHover` enabled, rotation accumulates
> - `currentRot += dt * rotationSpeed` (0.3 rad/sec)
> - Rotation applied via 2D rotation matrix in shader
> - Persists after hover ends (doesn't reset)
>
> ### 4. **Rendering Pipeline**
>
> **Geometry:**
> - Single triangle covering entire viewport (positions: -1,-1 to 3,3)
> - Overdraw technique - more efficient than quad for fullscreen effects
>
> **Blending:**
> - Alpha extraction from color intensity: `max(r, g, b)`
> - Premultiplied alpha in fragment shader output
> - WebGL context created with `alpha: true, premultipliedAlpha: false`
>
> **Gradient Falloff:**
> - Multiple `smoothstep` functions create soft edges
> - Inner radius (0.6) to outer radius (1.0) gradient
> - Distance-based attenuation for lighting
>
> ### 5. **Performance Optimizations**
> - Static renderer detection - shows CSS gradient fallback
> - Single draw call per frame (3 vertices)
> - Efficient noise implementation (Simplex, not Perlin)
> - No texture lookups - all procedural
> - Device pixel ratio scaling for sharp rendering

---

## A.3 Exact Color and Motion Code (Verbatim)

> The existing animation is a WebGL shader creating a dynamic orb effect using three base colors smoothly blended via snoise and other lighting calculations. The shader uses custom hue shifting (with rgb2yiq/yiq2rgb + adjustHue), and responds to hover by warping the internal noise/position and optionally rotating the render by incrementing a uniform.
>
> The color palette is:
> ```
> baseColor1: vec3(0.6118, 0.2627, 0.9961) // #9C43FE, purple
> baseColor2: vec3(0.2980, 0.7608, 0.9137) // #4CC2E9, cyan
> baseColor3: vec3(0.0627, 0.0784, 0.6)    // #101499, blue
> ```
>
> Color blending is achieved via mix() dependent on the cosine of pixel angle, plus additive light contributions.
>
> Motion code (pseudo):
> 1. `snoise3(vec3(uv * noiseScale, iTime * 0.5))` animates soft turbulence of the surface, controlled by iTime uniform (WebGL: iTime = now/1000).
> 2. `rot` uniform rotates the scene: `uv = rotationMatrix(rot) * uv`.
> 3. `hover` and `hoverIntensity` create wave-like distortions on hover: `uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10 + iTime);` (and similarly for uv.y).
> 4. When hover is within "orb" (inside circle radius), `rotateOnHover` triggers steady rotation (`currentRot += dt * rotationSpeed`).
>
> Implement in frontend: Use a `<canvas>` set to size of parent, WebGL context, compile vertex and fragment shaders (see above), set uniforms for animation timing, size, user-provided hue, hover state, and rotation. Drive animation via requestAnimationFrame, and smooth transitions for hover/rotation. Color controls map directly to shader uniforms, allowing for real-time tuning.

---

## A.4 All Parameters Description (Verbatim)

> The orb's parameters and their exact roles in the frontend and WebGL shader are:
>
> 1. **hue** – the degree of hue shift applied to the three base colors of the orb. 0-360 in degrees, sent via the uniform 'hue'.
>
> 2. **hoverIntensity** – controls how strongly the orb distorts when hovered. Range 0-2. Sent via 'hoverIntensity' uniform; affects `uv` distortion in the shader.
>
> 3. **rotateOnHover** – boolean; if enabled, the orb rotates whenever your cursor is near its center (driven by hover detection in JS, animates rotation speed).
>
> 4. **noiseDensity** – scales the frequency of 3D simplex noise in the orb shape. Range 0-2. Connected to the uniform 'noiseDensity', affects how compact/tight the noise texture appears.
>
> 5. **noiseSpeed** – controls the speed of animated noise movement. Range 0-2. Sent as 'noiseSpeed' uniform, multiplies time in noise sampling.
>
> 6. **noiseIntensity** – controls how strongly noise warps the orb's edge. Range 0-2. Sent as 'noiseIntensity' uniform, affects the mixing between smooth and noisy edge.
>
> Color code:
> - There are three base colors in [0,1] linear RGB:
>   - baseColor1: vec3(0.611765, 0.262745, 0.996078) (purple)
>   - baseColor2: vec3(0.298039, 0.760784, 0.913725) (cyan)
>   - baseColor3: vec3(0.062745, 0.078431, 0.600000) (deep blue)
> - These are each shifted by the user-set 'hue' property in GLSL using a YIQ transform, see `adjustHue()`.
>
> Motion (WebGL):
> - The orb's "surface" is defined by a main radius with a noise tessellation.
> - The edge is modulated using `snoise3(vec3(uv * noiseDensity, iTime * noiseSpeed)) * noiseIntensity`.
> - Hover distortion and orb rotation are driven by JS, sent as uniforms 'hover', 'rot' and 'hoverIntensity' to the shader.
>
> All parameters are passed as uniforms to the shader and directly affect visual output as described, with no additional hidden processing.

---

## A.5 Clarifications on Hollow Center, Geometry, Glow (Verbatim)

> 1. **Hollow Center**: Achieved with a smoothstep mask based on distance from center (`len`). In the fragment shader, the inner radius is defined (`const float innerRadius = 0.6;`), and a smoothstep (`v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);`) creates the hollow ring mask. Pixels with `len < innerRadius` become fully transparent, forming the hollow center.
>
> 2. **Ring Geometry**: Center radius (`innerRadius`) is 0.6 (NDC, so from the center). The ring's tube half-width is determined indirectly through smoothstep's edge and noise functions, typically giving a "soft" width of about 0.2 units. The hollow interior is calculated by masking out all pixels where `length(uv) < innerRadius` (here, `len`).
>
> 3. **Glow/Bloom Implementation**: The outer glow uses layered smoothsteps and light attenuation models (`light1`, `light2`) with exponential-like falloff, e.g., `light1(1.0, 10.0, d0)`; the glow fades as inverse of (1 + distance * attenuation), giving soft exponential attenuation. The parameters are: glow strength (`light1`/`light2` intensity), attenuation (`10.0`, `50.0`, etc.), and masking with smoothsteps (`v2`, `v3`).
>
> 4. **Sliver/Highlight Shape**: The arc-shaped highlight is produced by positioning a point (`pos = vec2(cos(a), sin(a)) * r0;`) that orbits the ring. Its brightness is modulated by `light2` and `light1`, and it's spread by a combination of distance falloff and angle calculation. This forms an "elongated" highlight along the curvature of the ring.
>
> 5. **Full Shader Main Function**:
>    ```glsl
>    void main() {
>      vec2 fragCoord = vUv * iResolution.xy;
>      vec4 col = mainImage(fragCoord);
>      gl_FragColor = vec4(col.rgb * col.a, col.a);
>    }
>    ```
>    Where `mainImage` computes uv, rotates, adds hover warping, and calls `draw(uv)`. `draw(uv)` blends the ring mask, glow, and highlight, using base colors and light functions.
>
> 6. **Color Role Clarification**: There are three base colors. The deep blue (#101499) (`baseColor3`) is used as the shadow/fill blending inside the ring, merged with purple (`baseColor1`) and cyan (`baseColor2`) using `mix`. The visual appearance is dominated by the purple and cyan, but the blue is subtly blended in to add depth, especially near the core and shadow regions.

---

## A.6 Complete draw() Function and Details (Verbatim)

> 1. **The hollow center** is created with the following GLSL code inside draw(uv):
>    ```glsl
>    float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
>    ```
>    The 'innerRadius' variable (0.6) sets where the transition from fully transparent/dark to the ring begins. 'len' is the distance from UV center. This smoothly masks out the center region so pixels with length < innerRadius vanish, forming a ring.
>
> 2. **Ring geometry values**:
>    - center radius (inner hole): innerRadius = 0.6
>    - tube thickness: controlled by smoothstep/transition and the blend between innerRadius, 1.0, and noise. The rim's edge is softened with:
>      ```glsl
>      smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
>      ```
>      n0 is animated noise, so the outer edge waves over time.
>
> 3. **Glow/bloom**: The "soft outer glow" is achieved by exp falloff via the light1/light2 functions and is usually layered with smoothsteps. For bloom:
>    ```glsl
>    float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
>    ```
>    This adds additional falloff beyond the visible ring, and the light1/light2 additively brighten the glow. Parameters: attenuation =~ [10,50] for light1, [5,1] for light2, variable intensity (1.0–2.0).
>
> 4. **Sliver/highlight shape**: It uses a "traveling spotlight" built from light2 at an orbiting vector position:
>    ```glsl
>    vec2 pos = vec2(cos(a), sin(a)) * r0;
>    float d = distance(uv, pos);
>    float v1 = light2(1.5, 5.0, d);
>    ```
>    The highlight stretches along the ring using distance from this point and scales with noise to accentuate the arc. Further elongated with a multiplication by light1's rim.
>
> 5. **Full shader function (verbatim)**:
>    ```glsl
>    vec4 draw(vec2 uv) {
>      vec3 color1 = adjustHue(baseColor1, hue);
>      vec3 color2 = adjustHue(baseColor2, hue);
>      vec3 color3 = adjustHue(baseColor3, hue);
>
>      float ang = atan(uv.y, uv.x);
>      float len = length(uv);
>      float invLen = len > 0.0 ? 1.0 / len : 0.0;
>
>      float n0 = snoise3(vec3(uv * noiseDensity, iTime * noiseSpeed)) * 0.5 + 0.5;
>
>      float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0 * noiseIntensity);
>
>      float d0 = distance(uv, (r0 * invLen) * uv);
>
>      float v0 = light1(1.0, 10.0, d0);
>      v0 *= smoothstep(r0 * 1.05, r0, len);
>
>      float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;
>
>      float a = iTime * -1.0;
>      vec2 pos = vec2(cos(a), sin(a)) * r0;
>      float d = distance(uv, pos);
>
>      float v1 = light2(1.5, 5.0, d);
>      v1 *= light1(1.0, 50.0, d0);
>
>      float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);
>
>      float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
>
>      vec3 col = mix(color1, color2, cl);
>      col = mix(color3, col, v0);
>      col = (col + v1) * v2 * v3;
>      col = clamp(col, 0.0, 1.0);
>
>      return extractAlpha(col);
>    }
>    ```
>
> 6. **Color role**: baseColor1 = purple, baseColor2 = cyan, baseColor3 = deep blue (#101499). Purple and cyan blend together in the main ring/arc (`mix(color1, color2, cl)`). baseColor3 (deep blue) acts as a faint background color or "core" glow; it's mixed with the main ring via `col = mix(color3, col, v0)`, so it faintly influences edges/rim and subtle falloff, and may be visible especially at the edges or when the hover/highlight fades.

---

# PART B: SYNTHESIZED DOCUMENTATION

---

## 0. CRITICAL CLARIFICATIONS (From Framer AI Follow-up)

### Hollow Center Implementation
```glsl
const float innerRadius = 0.6;

// Hollow ring mask - pixels inside innerRadius become transparent
float len = length(uv);
float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);
// Expanded: smoothstep(0.6, 0.8, len)
// - len < 0.6 → v3 = 0 (fully transparent, hollow center)
// - len = 0.7 → v3 = 0.5 (partial)
// - len > 0.8 → v3 = 1 (fully visible ring)
```

### Ring Geometry (Exact Values)
| Parameter | Value | Notes |
|-----------|-------|-------|
| `innerRadius` | 0.6 | Center of ring in NDC |
| Ring outer edge | ~0.8 | `mix(0.6, 1.0, 0.5)` |
| Effective tube width | ~0.2 | Soft edge via smoothstep |
| Hollow interior | `len < 0.6` | Masked to transparent |

### Glow/Bloom Implementation
```glsl
// Inverse distance attenuation (NOT exponential)
float light1(float a, float b, float d) {
  return a / (1.0 + d * b);  // soft inverse falloff
}

float light2(float a, float b, float d) {
  return a / (1.0 + d * d * b);  // inverse square falloff
}

// Usage with typical parameters:
float glow = light1(1.0, 10.0, d0);   // attenuation = 10.0
float highlight = light2(1.0, 50.0, d1);  // tighter falloff
```

The glow uses **layered smoothsteps + inverse distance attenuation** (not pure exponential `exp(-d*k)`).

### Sliver/Highlight Shape
```glsl
// Point orbits at ring radius
float a = iTime * -1.0;  // counter-clockwise
float r0 = 0.6;  // orbit radius = innerRadius
vec2 pos = vec2(cos(a), sin(a)) * r0;

// Distance from current pixel to light point
float d = length(uv - pos);

// Brightness via light1 + light2 combination
// Creates elongated arc effect through distance falloff + angle
float highlight = light2(1.0, 50.0, d) * light1(0.8, 10.0, d);
```

### Third Color Role (Deep Blue #101499)
- `baseColor3` is used for **shadow/fill blending inside the ring**
- Merged with purple and cyan using `mix()`
- Adds depth near core and shadow regions
- **Not directly visible** but contributes to overall depth

### Main Function Structure
```glsl
void main() {
  vec2 fragCoord = vUv * iResolution.xy;
  vec4 col = mainImage(fragCoord);
  gl_FragColor = vec4(col.rgb * col.a, col.a);  // premultiply
}

// mainImage() pipeline:
// 1. Compute UV, apply rotation
// 2. Add hover warping
// 3. Call draw(uv)
// 4. Return final color

// draw(uv) combines:
// - Ring mask (v3 smoothstep)
// - Glow layers (light1, light2)
// - Highlight (orbiting point)
// - Color blending (3 base colors)
```

---

## 1. Core Animation Overview

WebGL-based animated orb with real-time shader effects, mouse interaction, and smooth transitions. Renders a glowing, organic sphere with dynamic noise-based distortions.

### Animation Driver
- Uses `requestAnimationFrame` loop at 60fps
- Single `iTime` uniform increments each frame
- Time drives multiple animated effects simultaneously

---

## 2. Shader-Based Visual Effects

### 2.1 Noise Animation (Organic Morphing)
```glsl
// 3D Simplex noise creates organic, flowing distortions
// Noise samples 3D space with time as Z coordinate
float noise = snoise3(vec3(uv * noiseDensity, iTime * noiseSpeed));

// Edge modulation
float edge = baseRadius + noise * noiseIntensity;
```

| Parameter | Default | Range | Effect |
|-----------|---------|-------|--------|
| `noiseDensity` | 0.65 | 0–2 | Spatial frequency (how compact/tight noise appears) |
| `noiseSpeed` | 0.5 | 0–2 | Temporal frequency (how fast noise flows) |
| `noiseIntensity` | 1.0 | 0–2 | How strongly noise warps the orb's edge |

### 2.2 Rotating Light Effect (Orbiting Sliver)
```glsl
// Orbital light source rotates counter-clockwise
float a = iTime * -1.0;  // 1 rotation per 2π seconds (~6.28s)
vec2 lightPos = vec2(cos(a), sin(a)) * r0;

// Distance-based lighting attenuation
float lightIntensity = light2(uv, lightPos);  // inverse square
```

### 2.3 Animated Color Gradient
```glsl
// Rotating color transitions (2x faster than light orbit)
float colorMix = cos(ang + iTime * 2.0) * 0.5 + 0.5;

// Three base colors blend based on noise and angle
vec3 color = mix(baseColor1, baseColor2, colorMix);
```

---

## 3. Color Palette

### Base Colors (Linear RGB, 0–1)
```glsl
vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);  // #9C43FE — Purple
vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);  // #4CC2E9 — Cyan
vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);  // #101499 — Deep Blue
```

### Hue Shifting (YIQ Transform)
```glsl
// Convert RGB to YIQ color space
vec3 rgb2yiq(vec3 c) {
  return vec3(
    dot(c, vec3(0.299, 0.587, 0.114)),
    dot(c, vec3(0.596, -0.274, -0.322)),
    dot(c, vec3(0.211, -0.523, 0.312))
  );
}

// Convert YIQ back to RGB
vec3 yiq2rgb(vec3 c) {
  return vec3(
    dot(c, vec3(1.0, 0.956, 0.621)),
    dot(c, vec3(1.0, -0.272, -0.647)),
    dot(c, vec3(1.0, -1.106, 1.703))
  );
}

// Apply hue rotation
vec3 adjustHue(vec3 color, float hue) {
  vec3 yiq = rgb2yiq(color);
  float h = hue * 3.14159265 / 180.0;  // degrees to radians
  float c = cos(h);
  float s = sin(h);
  yiq.yz = mat2(c, -s, s, c) * yiq.yz;
  return yiq2rgb(yiq);
}
```

| Parameter | Default | Range | Effect |
|-----------|---------|-------|--------|
| `hue` | 0 | 0–360 | Degree of hue shift applied to all three base colors |

---

## 4. Mouse Interaction System

### 4.1 Hover Detection
```javascript
// Track mouse position relative to orb center
const rect = canvas.getBoundingClientRect();
const mouseX = (e.clientX - rect.left) / rect.width;
const mouseY = (e.clientY - rect.top) / rect.height;

// Convert to UV space (-1 to 1)
const uvX = (mouseX - 0.5) * 2.0;
const uvY = (mouseY - 0.5) * 2.0;

// Check if within orb bounds (radius 0.8)
const dist = Math.sqrt(uvX * uvX + uvY * uvY);
const isHovering = dist < 0.8;

targetHover = isHovering ? 1 : 0;
```

### 4.2 Smooth Transitions (Exponential Smoothing)
```javascript
// ~100ms ease-in/ease-out feel
currentHover += (targetHover - currentHover) * 0.1;
```

### 4.3 Hover Wave Distortion (Shader)
```glsl
// Sinusoidal wave distortion when hovering
uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);
```

| Parameter | Default | Range | Effect |
|-----------|---------|-------|--------|
| `hoverIntensity` | 0.2 | 0–2 | How strongly the orb distorts when hovered |

### 4.4 Rotation on Hover
```javascript
// When hovering and rotateOnHover enabled
if (isHovering && rotateOnHover) {
  currentRot += dt * rotationSpeed;  // 0.3 rad/sec default
}
// Note: rotation persists after hover ends (doesn't reset)
```

```glsl
// Apply rotation in shader
mat2 rotationMatrix(float a) {
  float c = cos(a);
  float s = sin(a);
  return mat2(c, -s, s, c);
}
uv = rotationMatrix(rot) * uv;
```

| Parameter | Default | Effect |
|-----------|---------|--------|
| `rotateOnHover` | false | Boolean; enables continuous rotation while hovering |
| `rotationSpeed` | 0.3 | Radians per second |

---

## 5. Rendering Pipeline

### Geometry
```javascript
// Single triangle covering entire viewport (overdraw technique)
const positions = new Float32Array([
  -1, -1,
   3, -1,
  -1,  3
]);
```

### Alpha Extraction
```glsl
// Alpha from color intensity
float alpha = max(color.r, max(color.g, color.b));
gl_FragColor = vec4(color, alpha);
```

### WebGL Context Options
```javascript
canvas.getContext('webgl', {
  alpha: true,
  premultipliedAlpha: false,
  antialias: true
});
```

### Gradient Falloff (Soft Edges)
```glsl
// Ring mask with hollow center (CORRECTED)
const float innerRadius = 0.6;
float len = length(uv);

// v3 creates the hollow ring:
// - 0 inside innerRadius (hollow)
// - transitions 0→1 between 0.6 and 0.8
// - 1 at the visible ring
float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

// Outer falloff (separate from hollow mask)
float v2 = smoothstep(1.0, 0.6, len);  // fades toward outer edge
```

---

## 6. Complete Uniform List

| Uniform | Type | JS Source | Shader Usage |
|---------|------|-----------|--------------|
| `iTime` | float | `performance.now() / 1000` | Animation driver |
| `iResolution` | vec2 | `[canvas.width, canvas.height]` | Aspect correction |
| `hue` | float | Property (0–360) | Color shift amount |
| `hover` | float | Smoothed 0–1 | Distortion intensity |
| `rot` | float | Accumulated radians | UV rotation |
| `hoverIntensity` | float | Property (0–2) | Wave distortion scale |
| `noiseDensity` | float | Property (0–2) | Noise spatial frequency |
| `noiseSpeed` | float | Property (0–2) | Noise temporal frequency |
| `noiseIntensity` | float | Property (0–2) | Noise edge modulation |

---

## 7. Animation Timing Summary

| Effect | Formula | Speed | Period |
|--------|---------|-------|--------|
| Noise flow | `iTime * noiseSpeed` | 0.5× | Continuous drift |
| Light orbit | `iTime * -1.0` | 1× CCW | ~6.28 seconds |
| Color rotation | `iTime * 2.0` | 2× | ~3.14 seconds |
| Hover smoothing | `lerp(0.1)` | — | ~100ms transition |
| Hover rotation | `dt * 0.3` | 0.3 rad/s | ~21 seconds/rev |

---

## 8. Performance Notes

- Static renderer detection → CSS gradient fallback
- Single draw call per frame (3 vertices)
- Efficient Simplex noise (not Perlin)
- No texture lookups — all procedural
- Device pixel ratio scaling for sharp rendering
- Cleanup: cancel RAF, remove listeners, lose WebGL context

---

## 9. Key Implementation Notes

1. **Time Management:** All animations synchronized to single `iTime` source
2. **Interpolation:** Use exponential smoothing for organic feel, not linear
3. **Shader Uniforms:** Update every frame — time, resolution, hover, rotation
4. **Coordinate Systems:** UV space (−1 to 1), normalized by smaller dimension
5. **Fallback Required:** Static preview for SSR/canvas thumbnail contexts
6. **Cleanup Critical:** Must cancel RAF, remove listeners, lose WebGL context

---

## 10. Comparison: Framer vs Our NOVA_HALO_FRAME_SPEC

| Aspect | Framer Original | Our Current Spec |
|--------|-----------------|------------------|
| **Ring center** | `innerRadius = 0.6` | `RING_CENTER = 0.65` |
| **Ring width** | ~0.2 (soft via smoothstep 0.6→0.8) | 0.08 (`RING_HALF_WIDTH = 0.04`) |
| **Hollow mask** | `smoothstep(0.6, 0.8, len)` | `smoothstep(center - hw - 0.1, center - hw, dist)` |
| **Glow type** | Inverse: `1/(1 + d*k)`, `1/(1 + d²*k)` | Exponential: `exp(-d * k)` |
| **Glow layers** | `light1` + `light2` functions | `outerGlow` + `outerGlowWide` |
| **Colors** | 3: Purple, Cyan, Deep Blue | 2-3: colorA, colorB, (colorC) |
| **Color role** | Blue for shadow/depth fill | All colors in gradient |
| **Sliver orbit** | `r0 = 0.6` (at innerRadius) | `RING_CENTER` (at ring centerline) |
| **Sliver shape** | Point + light falloff | Point + arc angular falloff |

### Key Alignment Needed

1. **Glow falloff**: Switch from exponential to inverse distance?
   ```glsl
   // Framer style:
   float glow = 1.0 / (1.0 + glowDist * 10.0);

   // vs Our current:
   float glow = exp(-glowDist * 4.0);
   ```

2. **Hollow center**: Framer's approach is simpler (single smoothstep), ours has feathering

3. **Third color**: Add deep blue for shadow/depth blending

4. **Ring proportions**: Framer's ring is ~0.2 wide, ours is ~0.08 (much thinner)

---

## 11. VERBATIM draw() Function (From Framer AI)

```glsl
vec4 draw(vec2 uv) {
  vec3 color1 = adjustHue(baseColor1, hue);
  vec3 color2 = adjustHue(baseColor2, hue);
  vec3 color3 = adjustHue(baseColor3, hue);

  float ang = atan(uv.y, uv.x);
  float len = length(uv);
  float invLen = len > 0.0 ? 1.0 / len : 0.0;

  // Noise (0.0 to 1.0 range)
  float n0 = snoise3(vec3(uv * noiseDensity, iTime * noiseSpeed)) * 0.5 + 0.5;

  // r0 = ring centerline radius, modulated by noise
  // Base range: mix(0.6, 1.0, 0.4) = 0.76  to  mix(0.6, 1.0, 0.6) = 0.84
  float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0 * noiseIntensity);

  // d0 = distance from pixel to the ring centerline (at same angle)
  // (r0 * invLen) * uv projects uv onto circle of radius r0
  float d0 = distance(uv, (r0 * invLen) * uv);

  // v0 = ring glow (bright at ring centerline, falls off)
  float v0 = light1(1.0, 10.0, d0);
  v0 *= smoothstep(r0 * 1.05, r0, len);  // fade out beyond ring

  // Color rotation (purple ↔ cyan)
  float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;

  // Orbiting highlight
  float a = iTime * -1.0;  // counter-clockwise
  vec2 pos = vec2(cos(a), sin(a)) * r0;
  float d = distance(uv, pos);

  // v1 = spotlight intensity
  float v1 = light2(1.5, 5.0, d);
  v1 *= light1(1.0, 50.0, d0);  // constrain highlight to ring

  // v2 = outer edge falloff (noise-animated)
  float v2 = smoothstep(1.0, mix(innerRadius, 1.0, n0 * 0.5), len);

  // v3 = hollow center mask
  float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

  // Color blending
  vec3 col = mix(color1, color2, cl);       // purple ↔ cyan gradient
  col = mix(color3, col, v0);               // blend deep blue at edges
  col = (col + v1) * v2 * v3;               // add highlight, apply masks
  col = clamp(col, 0.0, 1.0);

  return extractAlpha(col);
}
```

---

## 12. Annotated Breakdown of draw()

### The Ring Centerline (r0)
```glsl
float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), n0 * noiseIntensity);
// Expanded:
// inner bound = mix(0.6, 1.0, 0.4) = 0.76
// outer bound = mix(0.6, 1.0, 0.6) = 0.84
// r0 oscillates between 0.76 and 0.84 based on noise
```
This creates the **organic breathing** of the ring — the centerline isn't fixed!

### Distance to Ring (d0)
```glsl
float d0 = distance(uv, (r0 * invLen) * uv);
// Mathematically equivalent to: d0 = abs(len - r0)
// But computed as actual Euclidean distance to the closest point on ring
```

### The Four Masks/Layers

| Variable | Formula | Purpose |
|----------|---------|---------|
| `v0` | `light1(1.0, 10.0, d0) * smoothstep(...)` | Ring glow (bright at centerline) |
| `v1` | `light2(1.5, 5.0, d) * light1(1.0, 50.0, d0)` | Orbiting highlight (constrained to ring) |
| `v2` | `smoothstep(1.0, mix(0.6, 1.0, n0*0.5), len)` | Outer edge (noise-animated) |
| `v3` | `smoothstep(0.6, 0.8, len)` | Hollow center mask |

### Color Blend Order
```glsl
col = mix(color1, color2, cl);    // 1. Purple ↔ Cyan (angle-based)
col = mix(color3, col, v0);       // 2. Blend deep blue where ring glow is weak
col = (col + v1) * v2 * v3;       // 3. Add highlight, mask with inner + outer
```

The key insight: **baseColor3 (deep blue) shows through where v0 is low** — at the edges of the ring and in the glow falloff regions.

### Light Functions (Assumed)
```glsl
float light1(float intensity, float attenuation, float dist) {
  return intensity / (1.0 + dist * attenuation);
}

float light2(float intensity, float attenuation, float dist) {
  return intensity / (1.0 + dist * dist * attenuation);
}

vec4 extractAlpha(vec3 col) {
  float alpha = max(col.r, max(col.g, col.b));
  return vec4(col, alpha);
}
```

---

## 13. Key Differences from Our Current Implementation

| Aspect | Framer | Our Current |
|--------|--------|-------------|
| Ring centerline | Dynamic: 0.76–0.84 (noise-modulated) | Fixed: 0.65 |
| Distance calculation | Project to ring: `distance(uv, (r0/len)*uv)` | Simple: `abs(len - RING_CENTER)` |
| Outer edge | Noise-animated: `smoothstep(1.0, mix(0.6,1.0,n0*0.5), len)` | Static or warp-based |
| Highlight constraint | `v1 *= light1(1.0, 50.0, d0)` — tied to ring | Arc falloff |
| Color depth | Deep blue mixed via `mix(color3, col, v0)` | Not present |
| Glow falloff | Inverse: `1/(1+d*k)` | Exponential: `exp(-d*k)` |
