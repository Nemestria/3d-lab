'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// TODO: add the imports YOU need (loaders, controls, post-fx, gsap).
// Do NOT remove 'use client' — three.js runs in window.
export default function LabExperiment() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    // ⬇️ TODO: build Scene, Camera, Renderer, lights, meshes per your project spec.
    // Open threejs.org/docs and threejs.org/examples first.
    // Required: renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
    let raf = 0
    const tick = () => {
      // ⬇️ TODO: animate per frame (rotation, GSAP tween step, physics, etc.)
      raf = requestAnimationFrame(tick)
    }
    tick()
    const onResize = () => {
      // ⬇️ TODO: update camera.aspect, updateProjectionMatrix, renderer.setSize on mount.
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      // ⬇️ TODO: dispose renderer + every geometry + every material + every texture.
    }
  }, [])
  return <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
}
