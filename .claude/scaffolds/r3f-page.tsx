'use client'
import { Canvas } from '@react-three/fiber'
// TODO: import Drei helpers you'll use (Environment, OrbitControls, useGLTF,
//       MeshTransmissionMaterial, ScrollControls, shaderMaterial, ...).
export default function R3FLabExperiment() {
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}        // caps pixel ratio — important for mobile fps
        gl={{ antialias: true }}
      >
        {/* ⬇️ TODO: lights, meshes, controls, post-fx — per your project spec */}
      </Canvas>
    </div>
  )
}
