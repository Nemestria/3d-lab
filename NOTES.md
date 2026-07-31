# Lab Notes & Resources

Running knowledge base for the 3D Lab — articles, docs, and hard-won lessons,
grouped by topic. Add a link the moment it helps; leave a one-line note on *why*
it earned a spot so future-you doesn't re-read junk.

> Format per entry: **[Title](url)** — what it's good for. Then 2–4 takeaway
> bullets in your own words (never paste the article).

---

## 🎥 Cameras

- **[Mastering Camera Movement in Three.js](https://blog.iamdipankarpaul.com/mastering-camera-movement-in-threejs)** — the go-to overview for *how* to move a camera, from static shots to first-person.
  - The camera is just another Object3D — it has `position`, `rotation`, and a direction; treat it like any mesh you place.
  - Static framing = `camera.position.set(...)` + `camera.lookAt(target)`. `lookAt` is what points it; setting position alone isn't enough.
  - `OrbitControls` with `enableDamping` + `dampingFactor` gives drag-to-rotate/zoom/pan. **Don't also hand-set `camera.rotation`** — they fight each other.
  - Smooth follow = `camera.position.lerp(target, t)` each frame (ease toward, don't snap). First-person = `translateZ` / `translateX` (local-space moves).
  - _Relevant to P2:_ my solar-system camera sat edge-on because I set position but treated the plane wrong — `lookAt(0,0,0)` from an **elevated** position (y > 0) is what tilts the view so orbits read as ellipses, not a flat line.

---

## 🌳 Scene Graph & Transforms

- **[three.js manual — Scene Graph](https://threejs.org/manual/#en/scenegraph)** — builds a solar system to teach parenting; the canonical "orbits come from hierarchy" lesson.
  - Child objects inherit the parent's transform. Offset a planet on `x`, parent it to a pivot at the origin, rotate the *pivot* → orbit for free.
  - Nest pivots for moons. Self-spin (`planet.rotation.y`) is independent of orbit (`pivot.rotation.y`).

---

## 💡 Materials & Lighting

- **[Color.set / .setRGB](https://threejs.org/docs/#api/en/math/Color.set)** — `.set()` takes **one** value (hex / CSS string / Color); `.setRGB(r,g,b)` takes three floats in `0..1`. Channels are 0–1, not 0–255.
- _Lesson:_ a light source (sun) shouldn't depend on being lit — use `emissive` so it renders its own color; keep the `PointLight` for illuminating *other* objects.

---

## 🎯 Interactivity

- **[Raycaster](https://threejs.org/docs/#api/en/core/Raycaster)** — `setFromCamera(pointer, camera)` + `intersectObjects([...])` to pick meshes under the cursor. `pointer` is NDC (−1..1), not pixels.

---

## 📦 Loading & Framing Models

- **[Box3](https://threejs.org/docs/#api/en/math/Box3)** — the axis-aligned bounding box; how you measure a loaded model you didn't build and don't know the scale of.
  - `const box = new THREE.Box3().setFromObject(gltf.scene)` — wraps the whole model, world-space.
  - `const size = box.getSize(new THREE.Vector3())` → how big it is per axis. `const center = box.getCenter(new THREE.Vector3())` → where its middle sits.
  - **Store `center` in a `const`** — if you only call `getCenter(...)` inline inside a `console.log`, there's no variable to reuse later (I hit `center is not defined`).
- **Recenter a model to the origin:** `gltf.scene.position.sub(center)` shifts it so its bbox center lands at `(0,0,0)`. Do this — a centered model makes camera/waypoint numbers symmetric and sane instead of orbiting some random offset.
- **Frame it (how far back the camera goes):** `distance ≈ (maxDimension / 2) / tan(fov/2)`, plus margin. For an 86-unit-long beam at 75° FOV → `43 / tan(37.5°) ≈ 56` units. Camera closer than that = model overflows / you're inside it.
- **[DRACOLoader](https://threejs.org/docs/#examples/en/loaders/DRACOLoader)** — a `.glb` can be Draco-compressed; `GLTFLoader` alone throws `No DRACOLoader instance provided`.
  - `const draco = new DRACOLoader(); draco.setDecoderPath('/draco/gltf/'); gltfLoader.setDRACOLoader(draco)`.
  - The decoder is separate WASM three.js doesn't bundle. **Self-host:** copy `node_modules/three/examples/jsm/libs/draco/` → `public/draco/`, point the path at `/draco/gltf/` (served at site root, like `/models/`). Dispose with `draco.dispose()`.
- **Odd normals on a loaded `.glb`** (blocky facets, dark patches under light) — often **Draco** quantizes/mangles them. Fix in the load callback: traverse and `child.geometry.computeVertexNormals()` to rebuild smooth per-vertex normals.
  - Only works if the **winding order** is correct. If the model looks inside-out (solid from inside, see-through outside), that's flipped faces → band-aid `material.side = THREE.DoubleSide`, real fix is Blender "Recalculate Normals Outside" + re-export.
  - Hard-edge vs smooth look = `material.flatShading` + `material.needsUpdate = true`.

---

## 🖱️ Input & Responsiveness

- **Drive a paused gsap timeline by input, not autoplay:** build `gsap.timeline({ paused: true })`, keep a `target` progress `0..1`, and on each input event do `gsap.to(tl, { progress: target, duration, ease, overwrite: true })`. The eased tween toward `target` *is* a hand-rolled ScrollTrigger `scrub` — no scroll height needed for a `fixed` canvas.
  - `overwrite: true` — each new input kills the previous progress-tween so they don't stack/fight.
  - Always `THREE.MathUtils.clamp(target, 0, 1)` so you can't scrub past the ends.
- **`wheel` is desktop-only — touch devices never fire it.** For responsiveness add a touch fallback so mobile can drive the same timeline.
  - Wheel gives you `e.deltaY` directly. Touch does NOT — track frame-to-frame: `onTouchStart` stores `lastY = e.touches[0].clientY`, `onTouchMove` computes `delta = lastY - y` then updates `lastY`.
  - **Separate sensitivity constants per input** — a finger drag spans far more pixels than a wheel notch (wheel ≈ `0.0005`, touch ≈ `0.002`). Tune independently.
- **DRY the inputs:** both wheel + touch should mutate `target` then call one shared `applyProgress()` — a single source of truth for the scrub feel, instead of duplicating the `gsap.to`.
- **`{ passive: false }` on `touchmove`** if you need `e.preventDefault()` (to block native scroll / pull-to-refresh). A passive listener physically cannot preventDefault.
- Attach input listeners to `renderer.domElement` (the canvas under the finger/cursor), not `window`, so the gesture is scoped to the experiment.

---

## 🧰 General / Reference

- **[three.js docs](https://threejs.org/docs/)** · **[three.js examples](https://threejs.org/examples/)** · **[three.js manual](https://threejs.org/manual/)**
- **[React docs — useRef](https://react.dev/reference/react/useRef)** — the bridge between React handlers and objects built inside `useEffect`.

---

## ⚠️ Gotchas I hit (so I stop repeating them)

- three.js rotations are **radians**, not degrees. `33` ≠ 33°.
- `PointLight(color, intensity, distance, decay)` — a huge `decay` kills the light within ~1 unit. Default `decay` is 2 (physical inverse-square).
- Camera *inside* a mesh (position closer than the mesh radius) = you see back-faces / nothing.
