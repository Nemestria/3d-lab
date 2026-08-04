'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// ⬇️ TODO [P6]: add the imports YOU need:
//   - EffectComposer  →  'three/examples/jsm/postprocessing/EffectComposer.js'
//   - RenderPass      →  'three/examples/jsm/postprocessing/RenderPass.js'
//   - UnrealBloomPass →  'three/examples/jsm/postprocessing/UnrealBloomPass.js'
//   - (optional) OrbitControls, and a way to make the "sign" shape
//     (TubeGeometry along a path, extruded TextGeometry + FontLoader, or a .glb)
// Do NOT remove 'use client' — three.js runs in window.
export default function LabExperiment() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ⬇️ TODO [P6]: the trio — Scene, PerspectiveCamera, WebGLRenderer.
    //    Required: renderer.setPixelRatio(Math.min(devicePixelRatio, 2)).
    //    A dark scene reads best — bloom is about bright shapes against black.

    // ⬇️ TODO [P6]: the SIGN — build a glowing shape. Bloom picks up BRIGHT pixels,
    //    so use an emissive material (MeshBasicMaterial in a bright color, or
    //    MeshStandardMaterial with a high `emissive` + `emissiveIntensity`).
    //    Colors above 1.0 (HDR) bloom hardest.

    // ⬇️ TODO [P6]: POST-PROCESSING — this is the new concept. Instead of
    //    renderer.render(scene, camera) directly, you render THROUGH a composer:
    //      const composer = new EffectComposer(renderer)
    //      composer.addPass(new RenderPass(scene, camera))
    //      composer.addPass(new UnrealBloomPass(resolution, strength, radius, threshold))
    //    Tune strength / radius / threshold for the neon glow.

    let raf = 0
    const tick = () => {
      // ⬇️ TODO [P6]: render via composer.render() — NOT renderer.render().
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      // ⬇️ TODO [P6]: camera.aspect + updateProjectionMatrix, renderer.setSize,
      //    AND composer.setSize(innerWidth, innerHeight) — the composer needs it too.
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      // ⬇️ TODO [P6]: dispose — composer.dispose(), the bloom pass, renderer,
      //    every geometry/material/texture, remove the canvas.
    }
  }, [])
  return <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
}
