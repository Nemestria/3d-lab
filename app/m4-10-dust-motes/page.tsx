'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Environment } from '@react-three/drei'
import { useRef, useMemo, useLayoutEffect } from 'react'
import * as THREE from 'three'

function Motes({ count = 100000 }: { count?: number }) {
  const ref = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])

  // Step 2 goes here: useLayoutEffect that seeds the galaxy positions
  useLayoutEffect(() => {
    if (!ref.current) return
    const branches = 4, spin = 1, randomness = 0.2, randomnessPower = 3, maxRadius = 5
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * maxRadius;
      const branchAngle = ((i % branches) / branches) * Math.PI * 2
      const spinAngle = radius * spin
      const rand = () =>
        Math.pow(Math.random(), randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) * randomness * radius

        dummy.position.set(
          Math.cos(branchAngle + spinAngle) * radius + rand(),
          rand() * 0.3,
          Math.sin(branchAngle + spinAngle) * radius + rand()
        )
        dummy.updateMatrix()
        ref.current.setMatrixAt(i, dummy.matrix)
    }
    ref.current.instanceMatrix.needsUpdate = true
  }, [count, dummy]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshBasicMaterial color="white" />
    </instancedMesh>
  )
}

export default function R3FLabExperiment() {
  // ⬇️ TODO [P10]: build a <Motes /> child component rendered INSIDE <Canvas>.
  //   The concept is InstancedMesh: ONE geometry + ONE material drawn `count`
  //   times (100_000) in a single draw call — the only way to hit that count.
  //
  //   Pattern:
  //     const ref = useRef<THREE.InstancedMesh>(null)
  //     const dummy = useMemo(() => new THREE.Object3D(), [])
  //     // seed positions ONCE (useLayoutEffect): for i in count →
  //     //   dummy.position.set(randomX, randomY, randomZ); dummy.updateMatrix()
  //     //   ref.current.setMatrixAt(i, dummy.matrix)
  //     // then ref.current.instanceMatrix.needsUpdate = true
  //     // animate in useFrame: re-set matrices (drift) OR rotate the whole field.
  //     return (
  //       <instancedMesh ref={ref} args={[geometry, material, count]}>
  //         <sphereGeometry args={[0.02, 6, 6]} />   // TINY geo — 100k of them
  //         <meshBasicMaterial />                     // cheap material
  //       </instancedMesh>
  //     )
  //   Performance is the point: keep geo tiny, material cheap, dpr capped.
  //   (Stretch: a custom shaderMaterial for the motes — that's the M4 GLSL path.)
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas
        camera={{ position: [0, 5, 10], fov: 60 }}
        dpr={[1, 2]}        // caps pixel ratio — critical at 100k instances
        gl={{ antialias: true }}
      >
        {/* ⬇️ TODO [P10]: dark background, your <Motes count={100000} />,
              optional <OrbitControls />. Watch the FPS meter — this project is
              graded on hitting the count while staying smooth. Test mobile. */}
        <Motes />
        <Environment preset='dawn' />
        <OrbitControls />
      </Canvas>
    </div>
  )
}
