# M1-P02 — Interactive Solar System

A sun with orbiting planets you can click. Where P1 was one static mesh, this is
a **scene graph** — parented pivots that make orbits fall out of hierarchy, plus
a Raycaster so the scene reacts to the pointer.

## In scope (M1)

SphereGeometry · PointLight · scene graph / parenting (Group / Object3D pivots) ·
per-object transforms (orbit + self-spin) · Raycaster picking · resize · disposal.

## Done when

- [V] A central sun + at least 3 planets render, each orbiting at its own speed.
- [V] Orbits are driven by rotating parent pivots, not by hand-written sin/cos per frame.
- [V] Each planet also spins on its own axis.
- [V] Clicking a planet does something visible (highlight, log, select).
- [V] `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` is set.
- [V] Resize keeps the scene un-stretched.
- [V] Cleanup: raf cancelled, every geometry/material disposed, renderer disposed, listeners removed, canvas removed.
- [V] Tested on mobile viewport.
- [V] No `any` types.

## Route

`/m1-02-interactive-solar-system`
