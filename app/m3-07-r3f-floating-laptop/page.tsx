'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei/'
import { useRef, Suspense } from 'react'
import type { Group } from 'three'

function Computer () {
  const { scene } = useGLTF('/models/Computer.glb');
  const ref = useRef<Group>(null);
  useFrame((state) => {
  if (ref.current) {
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.3
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.5
  }
    
})
  return <primitive object={scene} ref={ref} />
}

export default function R3FLabExperiment() {
  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas 
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}        // caps pixel ratio — R3F's equivalent of setPixelRatio
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Computer />
          <Environment preset="city" />
          </Suspense>
          <OrbitControls />
      </Canvas>
    </div>
  )
}
