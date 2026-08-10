# M3-P09 — Glassmorphism Orb

The drei showpiece: a **glass orb** using `MeshTransmissionMaterial` — real
refraction, thickness, frost, and chromatic aberration. The material samples the
scene behind the orb and bends it, so this project is as much about *what you put
behind the glass* as the glass itself.

## In scope (M3)

`<Canvas>` · **`MeshTransmissionMaterial`** (transmission, thickness, ior,
roughness, chromaticAberration, backside) · `<Environment>` (refraction source +
lighting) · `<OrbitControls>` · `<Suspense>` · `useFrame` (optional motion). No
custom GLSL — the material is drei's; you tune it, you don't write the shader (that's M4).

## The material — key props

- **`transmission`** (0→1) — how see-through; 1 = full glass.
- **`thickness`** — how much the glass bends light; more = chunkier refraction.
- **`ior`** — index of refraction (~1.5 = glass, ~2.4 = diamond).
- **`roughness`** — 0 = clear, higher = frosted glass.
- **`chromaticAberration`** — rainbow fringing at the edges.
- **`backside`** — also refract the orb's far wall (richer, ~2× cost).

## The catch

Transmission refracts **what's behind the orb**. Empty scene → the orb looks like
nothing. Put objects, `<Text />`, or a busy `<Environment>` behind it so the
refraction has something to distort. And it samples a scene buffer each frame —
**heavier than normal materials**, so keep the scene lean and check mobile fps.

## Done when

- [ ] A glass orb renders with `MeshTransmissionMaterial` and clearly refracts.
- [ ] There's something **behind** the orb (objects / text / a rich environment) that the refraction visibly bends.
- [ ] `<Environment>` is present (refraction source + lighting).
- [ ] At least 3 material props tuned deliberately (e.g. `thickness`, `ior`, `roughness`, `chromaticAberration`) — and you can say what each did.
- [ ] `<OrbitControls>` lets you orbit; refraction shifts as the camera moves.
- [ ] `<Suspense>` wraps anything that loads.
- [ ] `dpr={[1, 2]}` on the `<Canvas>`.
- [ ] Tested on mobile viewport (watch the framerate — transmission is expensive).
- [ ] No `any` types.

## Route

`/m3-09-glassmorphism-orb`  — remember to re-add this `href` to the P9 card in `app/page.tsx` on ship.
