'use client'
import { Canvas } from '@react-three/fiber'
import { shaderMaterial, Text3D, Center,  OrbitControls,  } from '@react-three/drei'
import { extend , useFrame,  type ThreeElement } from '@react-three/fiber'
import { useRef, useState, Suspense } from 'react' 
import * as THREE from 'three'
import SliderPanel from '@/components/ui/SliderPanel'

// ⬇️ TODO [P11]: define your custom material with drei's shaderMaterial:
const TwistMaterial = shaderMaterial(
  { uTime: 0, uTwist: 0.5 },
  /* glsl */ // vertex
  `
    uniform float uTime;
    uniform float uTwist;

    void main() {
    vec3 p = position;

    float angle = p.y * uTwist + uTime;
    float c = cos(angle);
    float s = sin(angle);
    p.xz = mat2(c, -s, s, c) * p.xz; //this rotates xz-plane by 'angle'

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
    }
  `,
  /* glsl */  // fragment 
  `
    void main() {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
    }
  `
)
extend({ TwistMaterial })

declare module '@react-three/fiber' {
  interface ThreeElements {
    twistMaterial: ThreeElement<typeof TwistMaterial>
  }
}

function TwistedText({ twist }: { twist: number }) {
  const matRef = useRef<THREE.ShaderMaterial & { uTime: number; uTwist: number }>(null)

  useFrame((state) => {
    if (matRef.current) matRef.current.uTime = state.clock.elapsedTime
  })

  return (
    <Center>
      <Text3D font="/fonts/Orbitron_Regular.json" size={1} height={0.3}>
      VERTIGO
      <twistMaterial ref={matRef} uTwist={twist}/>
      </Text3D>
    </Center>
  )
}

export default function R3FLabExperiment() {
  // ⬇️ TODO [P11]: build a <TwistedText /> child (INSIDE <Canvas>):
  //   - <Text3D font="/fonts/xxx.json" ...>YOUR TEXT<twistMaterial ref={matRef} /></Text3D>
  //     (Text3D needs a TYPEFACE JSON — you already have /fonts/Orbitron_Regular.json)
  //   - wrap in <Center> so it's centered
  //   - useFrame: matRef.current.uTime = clock.elapsedTime  (animate the twist)
  const [twist, setTwist] = useState(0.65);


  return (
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
      >
          {/* ⬇️ TODO [P11]: dark bg, your <TwistedText />, <OrbitControls />.
                The GRADED concept is the VERTEX shader displacing geometry — the twist
                must happen in GLSL (position math in the vertex shader), not by
                rotating the mesh. Drive it with a uTime uniform from useFrame. */}
        <color attach={"background"} args={['#050550']} />
        <Suspense fallback={null}>
          <TwistedText twist={twist} />
        </Suspense>
        <OrbitControls />
      </Canvas>
      <SliderPanel title='Skewed 3D Text' sliders={[
         { label: 'TWIST', min: -2, max: 2, step: 0.01, defaultValue: twist, onChange: setTwist },
      ]} />
    </div>
  )
}
