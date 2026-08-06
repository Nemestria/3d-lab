'use client'
import { Canvas } from '@react-three/fiber'
// ⬇️ TODO [P7]: import the Drei helpers + R3F hooks you'll use:
//   - useGLTF (load the laptop model)  →  '@react-three/drei'
//   - Environment (image-based lighting / reflections)  →  '@react-three/drei'
//   - OrbitControls (drei's version)  →  '@react-three/drei'
//   - useFrame (per-frame float animation)  →  '@react-three/fiber'
//   - useRef from 'react' to grab the mesh/group you animate

export default function R3FLabExperiment() {
  // ⬇️ TODO [P7]: build a component for the laptop:
  //   - const { scene } = useGLTF('/models/your-laptop.glb')
  //   - useRef the group, then useFrame((state) => { ... }) to BOB it up/down
  //     (e.g. ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2)
  //   - return <primitive object={scene} ref={...} /> (or <group>…</group>)
  //   NOTE: this is a CHILD component rendered INSIDE <Canvas>. Hooks like
  //   useFrame/useGLTF ONLY work inside the Canvas tree, never in this page fn.

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}        // caps pixel ratio — R3F's equivalent of setPixelRatio
        gl={{ antialias: true }}
      >
        {/* ⬇️ TODO [P7]: inside here (the Canvas tree) add:
              - lights and/or <Environment preset="city" /> for reflections
              - <Suspense> wrapping the model (useGLTF suspends while loading)
              - your <Laptop /> component (the useFrame float lives there)
              - <OrbitControls /> so the user can rotate it
            R3F disposes geometries/materials automatically on unmount —
            you do NOT write manual dispose() here. */}
      </Canvas>
    </div>
  )
}
