# M4-P11 — Twisted 3D Text (GLSL)

Your **first hand-written shader**. Take extruded 3D text and twist it in the
**vertex shader** — displacing geometry on the GPU, animated by time. This is the
line the whole lab was building toward: you stop tuning other people's materials
and write GLSL yourself.

## In scope (M4)

drei **`shaderMaterial`** (builds a `ShaderMaterial` + auto-registers a JSX
component) · **custom vertex + fragment GLSL** · **uniforms** (`uTime`, `uTwist`) ·
**vertex displacement** (the twist) · `useFrame` driving a uniform · `<Text3D>` +
`<Center>` (drei) for the geometry.

## The technique

- **`shaderMaterial(uniforms, vertexGLSL, fragmentGLSL)`** → a material class;
  `extend({ MyMaterial })` makes it `<myMaterial />` in JSX (camelCase).
- **The twist is vertex math:** for each vertex, rotate its `xz` by an angle that
  grows with `y` (`angle = position.y * uTwist + uTime`), build a 2×2 rotation,
  apply it, then the usual `gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0)`.
- **Animate** by writing `matRef.current.uTime = clock.elapsedTime` in `useFrame`.
- **The text**: `<Text3D font="/fonts/Orbitron_Regular.json">` gives extruded geometry
  with enough vertices to twist smoothly. Wrap in `<Center>`.

## Watch out

- **Twist must be in the shader**, not `mesh.rotation`. Rotating the mesh is not
  vertex displacement — the graded concept is GPU geometry deformation.
- `<Text3D>` needs a **typeface JSON** (you have `/fonts/Orbitron_Regular.json`),
  not a `.ttf`.
- Enough geometry resolution — extruded text has plenty; a flat plane wouldn't twist.
- With `extend`, add a module-level JSX intrinsic typing so TS accepts your `<myMaterial />` (no `any`).

## Done when

- [ ] Extruded 3D text renders (`<Text3D>` + a typeface JSON), centered.
- [ ] A **custom `shaderMaterial`** (your GLSL) is on the text — not a stock material.
- [ ] The **vertex shader twists** the geometry (position displacement), visibly warping the letters.
- [ ] The twist **animates** via a `uTime` uniform driven by `useFrame`.
- [ ] At least one tunable uniform (e.g. `uTwist`) — bonus: wire it to a slider.
- [ ] `dpr={[1, 2]}` on the `<Canvas>`.
- [ ] Tested on mobile viewport.
- [ ] No `any` types (type the `extend`ed material).

## Route

`/m4-11-twisted-3d-text`  — remember to re-add this `href` to the P11 card in `app/page.tsx` on ship.
