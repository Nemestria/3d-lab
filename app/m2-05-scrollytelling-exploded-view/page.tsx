'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader, HDRLoader, DRACOLoader } from 'three/examples/jsm/Addons.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LabHint from '@/components/ui/LabHint'
import { title } from 'process'

export default function LabExperiment() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ⬇️ TODO [P5]: the trio — Scene, PerspectiveCamera, WebGLRenderer.
    //    Required: renderer.setPixelRatio(Math.min(devicePixelRatio, 2)).
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight,
      0.1, 5000);
    const renderer = new THREE.WebGLRenderer();

    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);
    camera.position.set(0, 20, 90);

    scene.background = new THREE.Color(0x721515);
    const hdrLoader = new HDRLoader();
    hdrLoader.load('/textures/hdri/m1-03-hdri.hdr', (envMap) => {
      envMap.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envMap;
    });

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const light = new THREE.DirectionalLight();
    light.position.set(100, 100, 100);
    scene.add(light);
    // ⬇️ TODO [P5]: load a multi-PART model (something with separable pieces), light it.
    //    Capture each part you want to move — store its resting position
    //    (part.position.clone()) so you can offset it and return.
    let model: THREE.Object3D | null = null;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/models/Edgeering.glb', (gltf) => {
      model = gltf.scene;
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const center = box.getCenter(new THREE.Vector3)
      gltf.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry.computeVertexNormals();
          const mat = child.material as THREE.MeshStandardMaterial
          mat.metalness = 0.7;
          mat.roughness = 0.5;
          mat.color.set('#b06a3a');
        }
      })
      scene.add(gltf.scene);
      gltf.scene.position.sub(center);
    })
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');
    gltfLoader.setDRACOLoader(dracoLoader);
    // ⬇️ TODO [P5]: register ScrollTrigger — this project IS scroll-driven, unlike P4.
    //    gsap.registerPlugin(ScrollTrigger)

    gsap.registerPlugin(ScrollTrigger);

    // ⬇️ TODO [P5]: the EXPLODE — build a gsap timeline (scrub: true) tied to a tall
    //    scrollable element. As the user scrolls, tween each part OUTWARD along its
    //    own direction (e.g. from center), then optionally reassemble. Pin the canvas
    //    (ScrollTrigger `pin`) so it stays put while the story scrolls.
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1,
        ease: "power1.inOut",
      },
      scrollTrigger: {
        trigger: mount,
        start: "top top",
        end: "bottom bottom",
        pin: true,
        anticipatePin: 1,
        scrub: true,
      },
    })
    // ⬇️ TODO [P5]: NOTE — this route needs real scroll HEIGHT. The canvas is fixed,
    //    so add a tall spacer element (see the returned JSX) for ScrollTrigger to track.

    let raf = 0
    const tick = () => {
      // ⬇️ TODO [P5]: renderer.render(scene, camera). (Optional camera controls update.)
      renderer.render(scene, camera);

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
  return (
    <>
      <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />)
    <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
    <div className="h-[400vh]" />
    <LabHint 
      title="Scrollytelling Exploded View"
      steps={[
        "Scroll down to see the model explode into its parts.",
        "Scroll back up to reassemble the model.",
      ]
    } />
  </>   
  )
}