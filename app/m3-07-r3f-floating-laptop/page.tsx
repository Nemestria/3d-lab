'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment } from '@react-three/drei'
import { useRef, Suspense } from 'react'
import type { Group } from 'three'
import LabHint from '@/components/ui/LabHint'

function Computer () {
  const { scene } = useGLTF('/models/computer.glb');
  const ref = useRef<Group>(null);
  useFrame((state, delta) => {
  if (ref.current) {
    ref.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1
    ref.current.rotation.y += delta * 0.3
  }
    
})
  return <primitive object={scene} ref={ref} />
}

export default function R3FLabExperiment() {
  return (
    <>
      <div className="fixed inset-0 w-screen h-screen">
        <Canvas
          camera={{ position: [0, 10, 22], fov: 25, near: 0.1, far: 1000 }}
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
      <LabHint
        title="R3F Floating Laptop"
        steps={[
          'A computer model floating in real time (React Three Fiber).',
          'Drag to orbit around it.',
          'Scroll or pinch to zoom in and out.',
        ]}
      />
    </>
  )
}
