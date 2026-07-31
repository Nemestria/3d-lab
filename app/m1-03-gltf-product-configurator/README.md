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

- [V] A `.glb` model loads and renders, lit well enough to read its form.
- [V] Loading is handled async (model added in the loader callback, no crash before it arrives).
- [V] The user can orbit the product (OrbitControls).
- [V] At least one part can be reconfigured live — color/material swap via UI or click.
- [V] `renderer.setPixelRatio(Math.min(devicePixelRatio, 2))` is set.
- [V] Resize keeps the model un-stretched.
- [V] Cleanup: raf cancelled, loaded model's geometries/materials/textures disposed, renderer disposed, listeners removed, canvas removed.
- [V] Tested on mobile viewport.
- [V] No `any` types.

## Route

`/m1-03-gltf-product-configurator`
