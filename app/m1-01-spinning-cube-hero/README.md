# M1-P01 — Spinning Cube Hero

First light. A single cube rotating in a full-viewport canvas — the "hello world" of three.js.

## In scope (M1)

Scene · PerspectiveCamera · WebGLRenderer · lights · BoxGeometry · material · Mesh · per-frame rotation · resize handling · disposal.

## Done when

- [ ] A cube renders full-viewport and spins smoothly (~60fps).
- [ ] `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` is set.
- [ ] Resize keeps the cube un-stretched (camera aspect + renderer size update).
- [ ] Cleanup on unmount: `raf` cancelled, geometry/material/renderer disposed, canvas removed.
- [ ] Tested on mobile viewport.
- [ ] No `any` types.

## Route

`/m1-01-spinning-cube-hero`
