'use client'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'
import { useRef, useState, useMemo, useLayoutEffect } from 'react'
import * as THREE from 'three'
import SliderPanel from '@/components/ui/SliderPanel'
import LabHint from '@/components/ui/LabHint'


function Motes( { count = 100000, branches, spin, randomness, randomnessPower, maxRadius }: { 
    count?: number;
    branches: number;
    spin: number;
    randomness: number;
    randomnessPower: number;
    maxRadius: number; 
  }) {

    const ref = useRef<THREE.InstancedMesh>(null)
    const dummy = useMemo(() => new THREE.Object3D(), [])
    const inside = new THREE.Color('#ff6030');
    const outside = new THREE.Color('#1b3984');
    const color = new THREE.Color();

  // Step 2 goes here: useLayoutEffect that seeds the galaxy positions
  useLayoutEffect(() => {

    if (!ref.current) return
    
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
        color.copy(inside).lerp(outside, radius / maxRadius);
        ref.current.setColorAt(i, color);
    }
    ref.current.instanceMatrix.needsUpdate = true
    if (ref.current.instanceColor) ref.current.instanceColor.needsUpdate = true;
  }, [count, dummy, branches, spin, randomness, randomnessPower, maxRadius]);

  useFrame((_, delta) => { if (ref.current) ref.current.rotation.y += delta * 0.05; })
  
  return <instancedMesh ref={ref} args={[undefined, undefined, count]}>
    <sphereGeometry args={[0.02, 6, 6]} />
    <meshBasicMaterial color="white" />
  </instancedMesh>
}

export default function R3FLabExperiment() {
  const [branches, setBranches] = useState(4)
  const [spin, setSpin] = useState(0.5)
  const [randomness, setRandomness] = useState(0.8)
  const [randomnessPower, setRandomnessPower] = useState(3)
  const [maxRadius, setMaxRadius] = useState(15)

  return (
    <>
      <div className="fixed inset-0 w-screen h-screen">
        <Canvas
          camera={{ position: [0, 5, 10], fov: 60 }}
          dpr={[1, 2]}        // caps pixel ratio — critical at 100k instances
          gl={{ antialias: true }}
        >
          <color attach="background" args={['#000010']} />
          <Motes branches={branches} spin={spin} randomness={randomness} randomnessPower={randomnessPower} maxRadius={maxRadius} />
          <OrbitControls />
          <Stats className='!left-4 !top-auto !bottom-16'/>

        </Canvas>
      </div>
      <SliderPanel title="GALAXY" sliders={[
        { label: 'BRANCHES', min: 1, max: 10, step: 1, defaultValue: branches, onChange: setBranches },
        { label: 'SPIN', min: -2, max: 2, step: 0.01, defaultValue: spin, onChange: setSpin },
        { label: 'RANDOMNESS', min: 0, max: 2, step: 0.01, defaultValue: randomness, onChange: setRandomness },
        { label: 'CONCENTRATION', min: 1, max: 6, step: 0.1, defaultValue: randomnessPower, onChange: setRandomnessPower },
        { label: 'RADIUS', min: 3, max: 25, step: 0.5, defaultValue: maxRadius, onChange: setMaxRadius },
        ]} 
      />
      <LabHint
        title="100k Dust Motes"
        steps={[
          '100,000 motes drawn as one InstancedMesh — a spiral galaxy.',
          'Drag to orbit · scroll to zoom.',
          'Use the sliders to reshape the spiral live.',
        ]}
      />
    </>
  )
}
