# M4-P10 — 100k Dust Motes (InstancedMesh)

Performance project. Render **100,000** drifting dust motes at a smooth framerate
using **InstancedMesh** — one geometry + one material, drawn `count` times in a
single draw call. Naïvely making 100k meshes would kill the tab; instancing is
the technique that makes it trivial. This is the "performance" half of M4.

## In scope (M4)

**InstancedMesh** · per-instance matrices (`setMatrixAt` via a dummy `Object3D`) ·
`instanceMatrix.needsUpdate` · `useFrame` animation over instances · optional
`instanceColor` · dpr capping. (Stretch: a custom `shaderMaterial` on the motes —
that's the GLSL path this milestone opens.)

## The technique

- **One** `<instancedMesh args={[geometry, material, count]}>` = one draw call for all 100k.
- Position each instance with a throwaway `THREE.Object3D` "dummy": set its
  transform, `dummy.updateMatrix()`, `mesh.setMatrixAt(i, dummy.matrix)`.
- After writing matrices: `mesh.instanceMatrix.needsUpdate = true`.
- Seed positions **once** (`useLayoutEffect`), animate by either re-writing
  matrices in `useFrame` (per-mote drift) or rotating/moving the whole field (cheap).

## Watch out

- **Tiny geometry, cheap material** — 100k of anything expensive tanks the fps.
  A low-poly sphere (or a point/plane) + `meshBasicMaterial` is the target.
- Re-writing 100k matrices every frame is heavy; if it stutters, animate the
  field as a whole, or move only a subset, or push the drift into a vertex shader.
- `dpr={[1, 2]}` is not optional here.

## Done when

- [ ] ~100,000 instances render via a single `InstancedMesh` (not 100k meshes).
- [ ] Instance transforms are seeded with `setMatrixAt` + a dummy `Object3D`, `instanceMatrix.needsUpdate` set.
- [ ] The field animates (per-mote drift, or the whole cloud moving) in `useFrame`.
- [ ] It holds a smooth framerate on desktop (check the R3F/browser FPS meter).
- [ ] `dpr={[1, 2]}` on the `<Canvas>`.
- [ ] Tested on mobile viewport (lower the count if needed — note the threshold).
- [ ] No `any` types.

## Route

`/m4-10-dust-motes`  — remember to re-add this `href` to the P10 card in `app/page.tsx` on ship.
