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

## 🧰 General / Reference

- **[three.js docs](https://threejs.org/docs/)** · **[three.js examples](https://threejs.org/examples/)** · **[three.js manual](https://threejs.org/manual/)**
- **[React docs — useRef](https://react.dev/reference/react/useRef)** — the bridge between React handlers and objects built inside `useEffect`.

---

## ⚠️ Gotchas I hit (so I stop repeating them)

- three.js rotations are **radians**, not degrees. `33` ≠ 33°.
- `PointLight(color, intensity, distance, decay)` — a huge `decay` kills the light within ~1 unit. Default `decay` is 2 (physical inverse-square).
- Camera *inside* a mesh (position closer than the mesh radius) = you see back-faces / nothing.
