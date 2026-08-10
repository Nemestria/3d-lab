'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { Suspense, useState, useRef, useEffect } from 'react'
import { Environment, MeshTransmissionMaterial, Text } from '@react-three/drei'
import * as THREE from 'three'
import SliderPanel from '@/components/ui/SliderPanel'

function Orb( { 
  thickness, 
  roughness, 
  ior, 
  chromaticAberration,
  transmission,
}: { 
  thickness: number;
  roughness: number;
  ior: number;
  chromaticAberration: number;
  transmission: number
}) {
  const ref = useRef<THREE.Mesh>(null)
  const target = new THREE.Vector3()

  const dragging = useRef(false)

// release anywhere on the page, not just over the orb
useEffect(() => {
  const up = () => { dragging.current = false }
  window.addEventListener('pointerup', up)
  return () => window.removeEventListener('pointerup', up)
}, [])

useFrame((state, delta) => {
  if (!ref.current || !dragging.current) return   // ← only follow while dragging
  target.set(
    (state.pointer.x * state.viewport.width) / 2,
    (state.pointer.y * state.viewport.height) / 2,
    0
  )
  ref.current.position.lerp(target, 1 - Math.pow(0.001, delta))
})
  return <mesh 
    ref={ref} 
    onPointerDown={(e) => { 
      e.stopPropagation(); 
      dragging.current = true 
      }
    }>
      <sphereGeometry
      args={[1, 64, 64]} />
      <MeshTransmissionMaterial 
        thickness={thickness} 
        roughness={roughness} 
        ior={ior} 
        chromaticAberration={chromaticAberration}
        transmission={transmission} />
    </mesh>
}

export default function R3FLabExperiment() {
  const [thickness, setThickness] = useState(0.5);
  const [roughness, setRoughness] = useState(0.5);
  const [ior, setIor] = useState(1.5);
  const [chromaticAberration, setChromaticAberration] = useState(0.1);
  const [transmission, setTransmission] = useState(1);
  // ⬇️ TODO [P9]: build child components rendered INSIDE <Canvas>.
  //   The glass orb is a <mesh> with a sphere geometry + <MeshTransmissionMaterial />.
  //   Key: transmission refracts what's BEHIND it — so put objects (shapes, text,
  //   the environment) behind the orb, or you'll see nothing to distort.
  //     <mesh>
  //       <sphereGeometry args={[1, 64, 64]} />
  //       <MeshTransmissionMaterial
  //         transmission={1} thickness={...} roughness={...} ior={...}
  //         chromaticAberration={...} backside
  //       />
  //     </mesh>
  //   Tune: transmission, thickness, ior (~1.5 glass), roughness (frost),
  //   chromaticAberration (rainbow edges), backside (refract the far wall too).

  return (
    <div className="fixed inset-0 w-screen h-screen">
      <SliderPanel title="GLASS" sliders={[
            { label: 'THICKNESS', min: 0, max: 3, step: 0.01, defaultValue: thickness, onChange: setThickness },
            { label: 'ROUGHNESS', min: 0, max: 1, step: 0.01, defaultValue: roughness, onChange: setRoughness },
            { label: 'IOR', min: 1, max: 2.4, step: 0.01, defaultValue: ior, onChange: setIor },
            { label: 'ABERRATION', min: 0, max: 1, step: 0.01, defaultValue: chromaticAberration, onChange: setChromaticAberration },
            { label: 'TRANSMISSION', min: 0, max: 5, step: 0.01, defaultValue: transmission, onChange: setTransmission },
          ]} />
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}        // caps pixel ratio — R3F's equivalent of setPixelRatio
        gl={{ antialias: true }}
      >
        
        <Suspense fallback={null}>
          
          
          <Environment preset="city" />
          <Text 
          font={"/fonts/alagard.ttf"} 
          characters="abcdefghijklmnopqrstuvwxyz0123456789!"
          fontSize={0.5} 
          position={[0, 0, -2]}>
            {`Ale's experiment with \nglassmorphism orb`}
            </Text>
            <Orb thickness={thickness} roughness={roughness} ior={ior} chromaticAberration={chromaticAberration} transmission={transmission}>
            </Orb>
        </Suspense>
        {/* ⬇️ TODO [P9]: inside the Canvas tree add:
              - <Environment /> — REQUIRED: transmission refracts it; also lights the scene
              - <Suspense> around anything that loads (Environment, models)
              - objects BEHIND the orb (meshes / drei <Text />) so refraction has something to bend
              - the glass orb mesh with <MeshTransmissionMaterial />
              - <OrbitControls /> — orbit to see the refraction shift
            NOTE: MeshTransmissionMaterial samples a buffer of the scene each frame —
            it's heavier than normal materials. Keep the scene simple; test mobile fps.
            R3F disposes 3D resources on unmount — no manual dispose. */}
      </Canvas>
    </div>
  )
}
