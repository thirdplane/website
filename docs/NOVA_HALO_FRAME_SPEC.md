# Nova Halo — Frame-Synthesized Spec (Single Ring)

This spec describes the **single halo ring** as observed in the provided screen recording, synthesized across **all frames**. It intentionally avoids “orb”/filled-sphere language: the asset is a **thin neon tube ring with a hollow center**, plus a rotating color field and an orbiting highlight sliver.

Scope:
- Get the **one-ring asset** correct first.
- Convergence (two rings interacting) is a later phase.
- Final step: swap the ring’s endpoint colors to the **site palette tokens** (CSS variables) without changing the motion model.

## 1) Frame-Derived Invariants (True in Every Frame)

1. **Hollow center**: the interior is fully dark/transparent at all times (no filled disc/donut body).
2. **Large radius, thin tube**: the ring reads like a neon tube:
   - large radius in UV space
   - thin luminous core + soft bloom
3. **Soft glow (no banding)**: the bloom looks continuous and physical; avoid stacked `smoothstep` bands that create visible contours.
4. **No clipping**: bloom never clips on the canvas; leave headroom so the widest halo is contained.
5. **Motion is angular**: perceived rotation comes from the orbiting highlight + rotating color field; the ring’s geometry itself is stable in idle.
6. **Highlight is an arc/sliver**: it hugs the tube and has tangential extent (not a circular dot).
7. **Alive, not wavy**: idle motion is a gentle breathing/wobble; no harsh scallops or noisy jitter in the silhouette.

## 2) Time Model (One Clock Drives Everything)

- Use a single uniform time source: `iTime` in seconds, updated each `requestAnimationFrame`.
- Two derived angular motions:
  - **Orbiting highlight** (counter-clockwise): `lightAngle = iTime * -1.0` (≈ one revolution per `2π` seconds)
  - **Color field rotation** (faster): `colorPhase = iTime * 2.0`

## 3) Coordinate System (Correct Circle on Any Aspect Ratio)

Compute UV so the ring remains perfectly circular:
- `uv = (v_uv - 0.5) * 2.0`
- Normalize by aspect (one of the equivalent approaches):
  - `uv.x *= iResolution.x / iResolution.y`
  - or normalize by `min(iResolution.x, iResolution.y)` in a `fragCoord` pipeline

All geometry below assumes UV is centered at the origin in a circular metric.

## 4) Ring Geometry (Tube, Not Filled Donut)

Critical proportions (UV space `[-1, 1]`):
- `RING_CENTER = 0.65`
- `RING_THICKNESS = 0.08`
- `RING_HALF_WIDTH = 0.04`

Tube distance field:
- `dist = length(uv)`
- `ringDist = abs(dist - RING_CENTER)`

Tube mask (thin):
- `ring = smoothstep(RING_HALF_WIDTH + featherOut, RING_HALF_WIDTH - featherIn, ringDist)`

Hollow interior mask (must fully darken center):
- `hollow = smoothstep(RING_CENTER - RING_HALF_WIDTH - innerFeather, RING_CENTER - RING_HALF_WIDTH, dist)`
- Apply to both color + alpha:
  - `color *= hollow`
  - `alpha *= hollow`

## 5) Color Field (Green ↔ Blue Gradient Rotating Around the Ring)

Observed behavior:
- The ring’s color is a smooth wraparound gradient between two endpoints (green-ish and blue-ish in the recording).
- The gradient rotates continuously over time.

Angular coordinate:
- `ang = atan(uv.y, uv.x)`

Rotating mix:
- `mixT = cos(ang + iTime * 2.0) * 0.5 + 0.5`
- `baseColor = mix(colorA, colorB, mixT)`

Notes:
- Keep it smooth and continuous (no segmented wedges).
- “Final step” palette swap: set `colorA/colorB` from CSS variables (site tokens) without changing this logic.

## 6) Highlight (Orbiting Sliver / Arc)

Observed behavior:
- A bright sliver travels counter-clockwise along the ring.
- It is radially tight (stays on the tube) and tangentially extended (arc-like).

Use a compound model:

### 6.1 Perimeter point
- `lightPos = vec2(cos(lightAngle), sin(lightAngle)) * RING_CENTER`
- `lightDist = length(uv - lightPos)`
- `lightPoint = 1.0 / (1.0 + lightDist * lightDist * kPoint)`
  - `kPoint` controls focus (higher = tighter).

### 6.2 Arc elongation (tangential sliver)
- Angular delta (wrapped):
  - `dAng = abs(atan(sin(ang - lightAngle), cos(ang - lightAngle)))`
- Arc intensity:
  - `lightArc = exp(-dAng * kAng) * exp(-ringDist * kRad) * ampArc`
  - `kAng` controls tangential length
  - `kRad` keeps it hugging the tube

Highlight color:
- Near-white but still “belongs” to the local tube color:
  - `highlightColor = mix(vec3(1.0), baseColor, smallAmount)`

Apply highlight primarily to the tube core to avoid becoming a big blob:
- `tubeCore = smoothstep(RING_HALF_WIDTH, RING_HALF_WIDTH - coreFeather, ringDist)`
- `color += highlightColor * (lightPoint * gainPoint + lightArc * gainArc) * tubeCore`

## 7) Glow (Exponential Falloff)

Observed behavior:
- Bloom extends outward softly and continuously.
- It looks like exponential/physical falloff rather than layered smoothsteps.
- Bloom must stay visible and un-clipped; leave margin in UV/canvas so the outer glow is fully contained.

Distance from ring centerline:
- `glowDist = abs(dist - RING_CENTER)`

Two-scale exponential glow (core + wide):
- `outerGlow = exp(-glowDist * kGlow) * aGlow` (tight)
- `outerGlowWide = exp(-glowDist * kGlowWide) * aGlowWide` (very soft halo)
- Typical: `kGlow ≈ 4–5`, `aGlow ≈ 0.45–0.6`; `kGlowWide ≈ 2`, `aGlowWide ≈ 0.14–0.22`

Add as a soft mixture of endpoint colors:
- `glowColor = mix(colorA, colorB, 0.5)`
- `color += glowColor * (outerGlow + outerGlowWide)`

Canvas framing guidance (to avoid clipping):
- Keep the visible ring center at `~0.65` in normalized UV, and allow at least `~0.25` spare radius for the widest glow.
- On layout, reserve padding around the canvas equal to ~10–12% of its shorter dimension when the canvas is tightly fitted in a container.

## 8) Continuous Warp (Always On, Even Without Gradient Rotation)

From the frame comparisons, the ring is **not a mathematically perfect circle in idle**: the tube subtly **wobbles/warps** over time even when you conceptually “ignore” the rotating gradient/highlight. This motion is low-frequency and smooth (no jitter), and it should read as the ring having a living, elastic boundary.

Model this as an **angular warp of the ring centerline** plus (optionally) a **thickness warp**, both driven by low-speed noise. Crucially: this warp must be **decoupled** from the color rotation so you can pause/alter the gradient while the ring still subtly moves.

### 8.1 Ring centerline warp (radius varies with angle + time)

Let the ring radius be a function of `ang` and `iTime`:

- `ang = atan(uv.y, uv.x)`
- `dir = vec2(cos(ang), sin(ang))`
- `warp = snoise3(vec3(dir * WARP_FREQ, iTime * WARP_SPEED + WARP_SEED))`
- `r = RING_CENTER + warp * WARP_AMP`
- `ringDist = abs(length(uv) - r)`

Recommended ranges (tuned visually):
- `WARP_AMP` (idle): `0.004` → `0.009` (keeps silhouette smooth)
- `WARP_AMP` (hover add): `+0.005` → `+0.010`
- `WARP_FREQ`: `0.8` → `1.6` (lower = smoother, “breathing rubber”)
- `WARP_SPEED`: `0.10` → `0.35` (slow drift; independent of `COLOR_ROTATION_SPEED`)
- `WARP_SEED`: any constant to decorrelate from other noises
- To stay “alive not wavy,” prefer **filtered FBM** (e.g., 2 low-frequency octaves with 0.55–0.65 persistence) rather than a single high-frequency octave.

### 8.2 Thickness warp (optional; very subtle)

In addition to radius warp, the tube thickness can breathe slightly:

- `w2 = snoise3(vec3(dir * THICK_FREQ + 13.7, iTime * THICK_SPEED + 91.2))`
- `halfWidth = RING_HALF_WIDTH + w2 * THICK_AMP`

Recommended:
- `THICK_AMP`: `0.001` → `0.004` (idle), add `0.001` → `0.003` on hover
- `THICK_FREQ`: `0.6` → `1.2`
- `THICK_SPEED`: `0.08` → `0.22`

### 8.3 Interaction with hover warp

Hover warp should **add on top** of this always-on warp. The “idle warp” is the soul baseline; hover is an escalation.

### 8.4 Smoothness requirements
- The warp field should be smooth (no kinks); avoid sharp derivative changes that create polygonal or scalloped edges.
- Clamp extremes softly (e.g., `warp = clamp(warp, -1.2, 1.2) * amp`) to prevent sudden scallops.

## 9) Noise (Subtle in Idle; Stronger Under Interaction)

The frame set shows a mostly clean circle in idle; strong “wavy/scalloped” deformation appears in an interaction window.

Noise source:
- 3D simplex noise: `noise = snoise3(vec3(uv * 0.65, iTime * 0.5))`

Idle usage (subtle shimmer + contributes to the continuous warp above):
- Use noise to modulate brightness slightly:
  - `baseColor *= 1.0 + noise * smallShimmer`
- Avoid a single “global radius jitter” term; prefer **angle-dependent** warp as in §8.1 so the silhouette gently deforms instead of uniformly inflating/deflating.

Interaction usage (ramped by hover):
- Apply stronger UV warping / stronger geometry modulation only when `uHover` is high (see below).

## 10) Interaction (Hover) — Detection + Smooth Response

Hover detection (JS):
- Convert pointer position to centered UV.
- Set hover if pointer is within `0.8` radius.

Smoothing (JS):
- `currentHover += (targetHover - currentHover) * 0.1`

Hover distortion (shader):
- `uv.x += uHover * 0.02 * sin(uv.y * 10.0 + iTime)`
- `uv.y += uHover * 0.02 * sin(uv.x * 10.0 + iTime)`

Optional hover spin (spec intent; apply as UV rotation, not by modifying time):
- JS: `spin += dt * 0.3` while hovering (can persist after hover ends)
- Shader: `uv = rot2(uSpin) * uv`

## 11) Alpha + Blending (Compositing)

Alpha follows intensity:
- `alpha = clamp(max(color.r, max(color.g, color.b)), 0.0, 1.0)`

WebGL context + blend:
- `alpha: true`
- `premultipliedAlpha: false`
- `gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)`

## 12) Frontend Implementation Checklist (Agent-Friendly)

Minimum working component:
- Canvas + WebGL1 context
- Single fullscreen triangle (`[-1,-1, 3,-1, -1,3]`)
- Uniforms: `iTime`, `iResolution`, `uColorA`, `uColorB`, `uHover`, `uSpin`
- `requestAnimationFrame` loop
- Pointer tracking for hover detection + smoothing
- Resize handling with DPR cap (≤2) + debounced resize (~150ms)
- Pause RAF on `document.hidden` and handle `prefers-reduced-motion` with a static frame
- Cleanup: cancel RAF, remove listeners, optionally `WEBGL_lose_context`

## 13) Palette Integration (Final Step)

Once the halo matches the reference motion/feel, swap endpoint colors to the site tokens:
- `colorA = --ice-400` (or your chosen “cool” token)
- `colorB = --uv-500` (or your chosen “warm/UV” token)

If you require a true neon green endpoint (as in the recording), add a dedicated design token or explicitly choose an allowed non-token accent for this asset.
