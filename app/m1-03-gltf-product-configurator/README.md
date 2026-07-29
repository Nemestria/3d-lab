# M1-P03 — GLTF Product Configurator

Load a real 3D model (a `.glb`) and let the user customise it — change a part's
colour or material. Where P2 built geometry by hand, this one **loads** an artist
asset with `GLTFLoader` and reaches into its scene graph to reconfigure it.

## In scope (M1)

GLTFLoader · async loading (onLoad callback) · scene-graph traversal
(`traverse` / `getObjectByName`) · material/color swaps · lighting or Environment ·
OrbitControls · Raycaster picking (optional) · resize · disposal.

## The model

Drop a `.glb` in `/public` (e.g. a chair, sneaker, or any product with named
parts). Free sources: [Khronos glTF samples](https://github.com/KhronosGroup/glTF-Sample-Assets),
[market.pmnd.rs](https://market.pmnd.rs/), Sketchfab (downloadable glTF).

## Done when

- [ ] A `.glb` model loads and renders, lit well enough to read its form.
- [ ] Loading is handled async (model added in the loader callback, no crash before it arrives).
- [ ] The user can orbit the product (OrbitControls).
- [ ] At least one part can be reconfigured live — color/material swap via UI or click.
- [ ] `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` is set.
- [ ] Resize keeps the model un-stretched.
- [ ] Cleanup: raf cancelled, loaded model's geometries/materials/textures disposed, renderer disposed, listeners removed, canvas removed.
- [ ] Tested on mobile viewport.
- [ ] No `any` types.

## Route

`/m1-03-gltf-product-configurator`
