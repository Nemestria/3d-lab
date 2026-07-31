# M2-P05 — Scrollytelling Exploded View

Scroll drives the story. Load a multi-part model, and as the user scrolls, the
parts **explode outward** from their assembled position (then optionally
reassemble). This is the canonical product-page "exploded diagram" — now the
camera can stay put and the *model* comes apart, pinned in place while the page
scrolls. Where P4 scrubbed a camera by wheel, P5 scrubs **object transforms** by
real scroll with ScrollTrigger.

## In scope (M2)

gsap timeline · **ScrollTrigger** (scrub, **pin**, refresh) · per-part position
tweening from a stored resting pose · scroll-height layout (tall spacer) ·
easing. (Bloom/EffectComposer is P6 — don't pull it in here.)

## The model

Use a `.glb` with **separable parts** (named sub-meshes) — an engine, a gadget,
furniture with components. Free: [Khronos glTF samples](https://github.com/KhronosGroup/glTF-Sample-Assets),
[market.pmnd.rs](https://market.pmnd.rs/), Sketchfab.

## Done when

- [ ] A multi-part model loads and renders, lit well enough to read.
- [ ] Each explodable part's resting position is captured (`part.position.clone()`).
- [ ] Scrolling scrubs a gsap timeline that moves parts outward (ScrollTrigger `scrub`).
- [ ] The canvas is **pinned** while the explode plays (ScrollTrigger `pin`), with real scroll height (tall spacer).
- [ ] Motion is eased; parts return cleanly if you reassemble.
- [ ] `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` is set.
- [ ] Resize keeps the model un-stretched **and** calls `ScrollTrigger.refresh()`.
- [ ] Cleanup: raf cancelled, gsap timeline + all ScrollTriggers killed, geometries/materials/textures + renderer disposed, listeners removed, canvas removed.
- [ ] Tested on mobile viewport.
- [ ] No `any` types.

## Route

`/m2-05-scrollytelling-exploded-view`
