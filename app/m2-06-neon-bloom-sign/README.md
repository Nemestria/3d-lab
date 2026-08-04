# M2-P06 — Neon Bloom Sign

Make something **glow**. Build a bright, emissive "sign" shape in a dark scene and
run the render through a post-processing chain so it blooms like neon. This is the
last M2 project and it introduces **post-processing**: you stop calling
`renderer.render()` directly and render *through* an `EffectComposer`.

## In scope (M2)

EffectComposer · RenderPass · **UnrealBloomPass** (strength / radius / threshold) ·
emissive / HDR-bright materials · composer resize + dispose. (No GLSL yet — that's
M4. Bloom here is the built-in pass, not a custom shader.)

## The sign shape

Anything bright and readable against black. Options, easiest first:
- **TubeGeometry** along a hand-made `CatmullRomCurve3` — a bent "neon tube".
- **Extruded `TextGeometry`** (needs `FontLoader` + a typeface JSON) — actual words.
- A **`.glb`** sign model with an emissive material.

## The bloom concept

`UnrealBloomPass(resolution, strength, radius, threshold)`:
- **threshold** — how bright a pixel must be to bloom (lower = more blooms).
- **strength** — glow intensity.
- **radius** — how far the glow spreads.
Colours above `1.0` (HDR) bloom hardest — push emissive intensity past 1.

## Done when

- [ ] A bright, emissive sign shape renders in a dark scene.
- [ ] Rendering goes through `EffectComposer` (`RenderPass` + `UnrealBloomPass`), not `renderer.render()` directly.
- [ ] Bloom is tuned (strength / radius / threshold) so it reads as neon, not a white blowout.
- [ ] `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` is set.
- [ ] Resize updates camera, `renderer.setSize`, **and** `composer.setSize`.
- [ ] Cleanup: raf cancelled, composer + passes disposed, geometries/materials/textures + renderer disposed, listeners removed, canvas removed.
- [ ] Tested on mobile viewport.
- [ ] No `any` types.

## Route

`/m2-06-neon-bloom-sign`
