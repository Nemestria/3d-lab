'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// ⬇️ TODO [P5]: add the imports YOU need:
//   - GLTFLoader (+ DRACOLoader if the model is Draco-compressed)
//   - gsap  →  import gsap from 'gsap'
//   - ScrollTrigger  →  import { ScrollTrigger } from 'gsap/ScrollTrigger'
// Do NOT remove 'use client' — three.js runs in window.
export default function LabExperiment() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ⬇️ TODO [P5]: the trio — Scene, PerspectiveCamera, WebGLRenderer.
    //    Required: renderer.setPixelRatio(Math.min(devicePixelRatio, 2)).

    // ⬇️ TODO [P5]: load a multi-PART model (something with separable pieces), light it.
    //    Capture each part you want to move — store its resting position
    //    (part.position.clone()) so you can offset it and return.

    // ⬇️ TODO [P5]: register ScrollTrigger — this project IS scroll-driven, unlike P4.
    //    gsap.registerPlugin(ScrollTrigger)

    // ⬇️ TODO [P5]: the EXPLODE — build a gsap timeline (scrub: true) tied to a tall
    //    scrollable element. As the user scrolls, tween each part OUTWARD along its
    //    own direction (e.g. from center), then optionally reassemble. Pin the canvas
    //    (ScrollTrigger `pin`) so it stays put while the story scrolls.

    // ⬇️ TODO [P5]: NOTE — this route needs real scroll HEIGHT. The canvas is fixed,
    //    so add a tall spacer element (see the returned JSX) for ScrollTrigger to track.

    let raf = 0
    const tick = () => {
      // ⬇️ TODO [P5]: renderer.render(scene, camera). (Optional camera controls update.)
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      // ⬇️ TODO [P5]: camera.aspect, camera.updateProjectionMatrix(), renderer.setSize.
      //    Then ScrollTrigger.refresh() so pinned/scrubbed triggers recompute.
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      // ⬇️ TODO [P5]: kill gsap timeline + ScrollTrigger.getAll().forEach(t => t.kill()),
      //    dispose renderer + every geometry/material/texture, remove the canvas.
    }
  }, [])
  // ⬇️ TODO [P5]: the fixed canvas + a TALL spacer to generate scroll distance.
  //    e.g. <div ref={mountRef} className="fixed inset-0 ..." /> then a
  //    <div className="h-[400vh]" /> so there is something to scroll through.
  return <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
}
