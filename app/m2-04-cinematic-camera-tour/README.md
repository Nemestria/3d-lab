# M2-P04 — Cinematic Camera Tour

Move the **camera**, not the objects. Build a small 3D set, define a handful of
camera waypoints, and fly between them with a **gsap timeline** — either
autoplaying or scrubbed by scroll (**ScrollTrigger**). This is where M2 starts:
animation is now gsap's job, not hand-written `+=` in the tick loop.

## In scope (M2)

gsap core (`gsap.to` / `gsap.timeline`) · ScrollTrigger (scrub, pin) ·
camera position + lookAt tweening · easing · (later this milestone: EffectComposer,
UnrealBloomPass). OrbitControls is optional and usually **off** during a tour.

## New dependency

`gsap` is not installed yet. Ask the coach, then:

```bash
pnpm add gsap
```

## Done when

- [V] A small scene/set renders, lit well enough to read on camera.
- [V] At least 3 camera waypoints (position + look target) are defined.
- [V] A gsap timeline flies the camera between them with eased motion.
- [V] The tour is driven either by autoplay OR scrubbed by ScrollTrigger.
- [V] `camera.lookAt(...)` is updated during the tween (onUpdate), so framing stays right.
- [V] `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` is set.
- [V] Resize keeps the scene un-stretched.
- [ ] Cleanup: raf cancelled, gsap timeline + all ScrollTriggers killed, geometries/materials/textures + renderer disposed, listeners removed, canvas removed.
- [ ] Tested on mobile viewport.
- [ ] No `any` types.

## Route

`/m2-04-cinematic-camera-tour`
