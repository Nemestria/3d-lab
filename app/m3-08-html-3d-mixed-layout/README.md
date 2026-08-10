# M3-P08 — HTML / 3D Mixed Layout

Blend real DOM and 3D in **one shared space**. Using drei's `<Html>`, anchor HTML
elements (labels, cards, tooltips, buttons) to positions inside the 3D scene so
they track objects as the camera moves. This is the "annotated product" / "3D
dashboard" pattern — styled DOM that lives in the 3D world.

## In scope (M3)

`<Canvas>` · drei **`<Html>`** (the star: DOM anchored to 3D, with `occlude`,
`transform`, `distanceFactor`, `center`) · `useGLTF` or primitives · `<Environment>` ·
`<OrbitControls>` · `<Suspense>`. No custom GLSL — that's M4.

## The concept

`<Html>` renders a portal'd DOM node positioned by a 3D coordinate:
- **`distanceFactor`** — scales the DOM with camera distance (feels part of the scene).
- **`occlude`** — hides the label when geometry is in front of it.
- **`transform`** — renders the DOM in 3D space (rotates/scales with the object) vs. as a flat billboard.
- **`center`** — centers the DOM node on its anchor point.

## Done when

- [ ] A 3D scene renders (model or primitives), lit well enough to read.
- [ ] At least 2 `<Html>` labels/cards are anchored to 3D positions and track them as you orbit.
- [ ] The HTML is real, styled DOM (Tailwind classes work) — not a texture.
- [ ] `<OrbitControls>` lets you rotate; labels stay anchored to their objects.
- [ ] At least one meaningful `<Html>` prop is used deliberately (`occlude`, `distanceFactor`, `transform`, or `center`) — and you can say why.
- [ ] `<Suspense>` wraps anything that loads.
- [ ] `dpr={[1, 2]}` on the `<Canvas>`.
- [ ] Tested on mobile viewport.
- [ ] No `any` types.

## Route

`/m3-08-html-3d-mixed-layout`
