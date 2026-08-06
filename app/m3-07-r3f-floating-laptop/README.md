# M3-P07 — R3F Floating Laptop

Your first **React Three Fiber** project. Rebuild the three.js mental model as
**declarative React**: no more `new THREE.Mesh` + `scene.add` + a manual raf loop —
you describe the scene as JSX components, and R3F runs the render loop for you.
Load a laptop (or any) model, light it with an environment, and make it gently
**float** with `useFrame`.

## Milestone setup (do this ONCE for all of M3)

New dependencies — ask the coach, then:
```bash
pnpm add @react-three/fiber @react-three/drei
```
And `next.config.ts` must transpile three:
```ts
transpilePackages: ['three']
```

## In scope (M3)

`<Canvas>` · `useFrame` (per-frame animation) · `useGLTF` (model loading) ·
`<Environment>` (IBL / reflections) · `<OrbitControls>` (drei) · `<Suspense>`
(loading fallback while the model streams). No custom GLSL — that's M4.

## Mental-model shifts from M1/M2

- **No manual raf / renderer / cleanup.** R3F owns the loop and disposes GPU
  resources on unmount. `useFrame((state, delta) => …)` is your per-frame hook.
- **Hooks only work INSIDE `<Canvas>`.** `useFrame`/`useGLTF` must live in a child
  component of `<Canvas>`, never in the page function itself.
- **`dpr={[1, 2]}`** on `<Canvas>` is the R3F equivalent of
  `setPixelRatio(Math.min(devicePixelRatio, 2))`.

## Done when

- [ ] A model loads via `useGLTF` and renders inside `<Canvas>`.
- [ ] It's lit — `<Environment>` (and/or lights) so reflections/material read well.
- [ ] It **floats** — a `useFrame` bob (sine on position.y and/or a slow rotation).
- [ ] `<OrbitControls>` lets the user rotate the view.
- [ ] `<Suspense>` provides a fallback while the model loads (no crash before it arrives).
- [ ] `dpr={[1, 2]}` is set on the `<Canvas>`.
- [ ] Resize is automatic (R3F handles it) — verify it doesn't stretch.
- [ ] Tested on mobile viewport.
- [ ] No `any` types.

## Route

`/m3-07-r3f-floating-laptop`
