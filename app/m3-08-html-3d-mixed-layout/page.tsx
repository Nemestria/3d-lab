'use client'
import { Canvas } from '@react-three/fiber'
import { useRef, Suspense, useEffect } from 'react'
import { Html, OrbitControls, Environment, useGLTF,  } from '@react-three/drei'
import LabHint from '@/components/ui/LabHint'
import { Group } from 'three'

function Computer({ objectRef }: { objectRef: React.Ref<Group> }) {
  const { scene } = useGLTF('/models/computer.glb')
  useEffect(() => {
    const id = requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
    return () => cancelAnimationFrame(id)
  }, [])
  return <primitive object={scene} ref={objectRef} />
}

export default function R3FLabExperiment() {
  const computerRef = useRef<Group>(null!)
  return (
    <>
    <div className="fixed inset-0 w-screen h-screen">
      <Canvas
        camera={{ position: [0, 10, 25], fov: 50 }}
        dpr={[1, 2]}        // caps pixel ratio — R3F's equivalent of setPixelRatio
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Environment preset="city" />
          <group position={[0, 0, 0]}>
            <Computer objectRef={computerRef} />
            <Html
              transform                    // embed in 3D (not a billboard)
              occlude={[computerRef]}      // hide when the case rotates in front
              position={[0, 2.6, -0.18]}         // the screen's location on the model
              rotation={[0, 0, 0]}      // tilt to match the screen's plane
              scale={0.2}                  // with transform you use scale, NOT distanceFactor
            >
              <div className="w-sm text-sm text-lime-400 justify-center text-center">
                Ale is learning 3D websites to create immersive experiences. Contact him to get this crazy experiments built in real projects.
              </div>
            </Html>
            <Html  
              distanceFactor={5} 
              position={[6, 5, 0]} 
              occlude="blending">
                <div className="block mb-4 mx-auto border-b border-slate-300 pb-2 max-w-[360px]">
                  <a 
                      target="_blank" 
                      href="https://threejs.org/" 
                      className="block w-full px-4 py-2 text-center text-slate-700 transition-all text-white"
                  >
                    <b>New futuristic computer!</b>
                  </a>
                </div>
                  <div className="relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96">
                    <div className="relative mx-4 mt-4 overflow-hidden text-gray-700 bg-white bg-clip-border rounded-xl h-96">
                      <img
                          // src="/commodoro.jpg"
                          alt="card-image" className="object-cover w-full h-full" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-gray-900">
                            Commodoro Freshly New Computer
                        </p>
                        <p className="block font-sans text-base antialiased font-medium leading-relaxed text-gray-900">
                            1.998,02€
                        </p>
                      </div>
                        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 opacity-75">
                            Brand new, no AI, manually operated computer for functional use and professional work like writting your own texts.
                        </p>
                      </div>
                      <div className="p-6 pt-0">
                        <button
                            className="align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg shadow-gray-900/10 hover:shadow-gray-900/20 focus:opacity-[0.85] active:opacity-[0.85] active:shadow-none block w-full bg-gray-900/10 text-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                            type="button">
                            Add to Cart
                        </button>
                    </div>
                  </div>
              </Html>
          </group>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
    <LabHint
    title="R3F Floating Laptop in HTML"
    steps={['A computer inside an HTML component from drei. Orbit controls activated, so rotate and check how occlusions works on the card']}
   />
  </>
  )
}
