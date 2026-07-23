'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import ControlsPanel from '@/components/ui/ControlsPanel'




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
    <ControlsPanel
      onColorChange={(hex) => materialRef.current?.color.set(hex)}
      onSizeChange={(size) => meshRef.current?.scale.setScalar(size)}
      onSpeedChange={(speed) => { speedRef.current = speed }}
    />
  </>
  )
}
