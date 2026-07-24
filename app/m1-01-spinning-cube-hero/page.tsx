'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'




export default function LabExperiment() {
  
  //declaración de variables Ref
  const mountRef = useRef<HTMLDivElement>(null)
  const speedRef = useRef<number>(0.002);
  const meshRef = useRef<THREE.Mesh | null>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial | null>(null)
  
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const material = new THREE.MeshStandardMaterial( { color: 0x00ff00 });
    materialRef.current = material;
    const cube = new THREE.Mesh ( geometry, material );
    meshRef.current = cube;
    scene.add(cube);


    const renderer = new THREE.WebGLRenderer();

    renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    renderer.setSize( window.innerWidth, window.innerHeight );
    mount.appendChild( renderer.domElement );

    const lightA = new THREE.DirectionalLight();
    lightA.position.set(2, 2, 5);
    scene.add(lightA);

    let raf = 0
    const tick = () => {
      cube.rotation.x +=  speedRef.current;
      cube.rotation.y += 0.001;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    }
    tick()

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight)
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement)
    }
  }, [])
  return (
  <>
    <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
    <div className='fixed right-4 top-4 z-50 flex flex-col gap-3 rounded-lg bg-black/60 p-4'>
      <label className='text-xs text-zinc-300'>
        Color
        <input type="color" onChange={(e) => { materialRef.current?.color.set(e.target.value)}} />
      </label>
      <label className='text-xs text-zinc-300'>
        Size
        <input type="range" min={0.1} max={3} step={0.1} onChange={(e) => { meshRef.current?.scale.setScalar(Number(e.target.value))}} />
      </label>
      <label className='text-xs text-zinc-300'>
        Speed
        <input type="range" min={0} max={0.05} step={0.001} onChange={(e) => { speedRef.current = Number(e.target.value)}} />
      </label>
      </div>
  </>
  )
}
