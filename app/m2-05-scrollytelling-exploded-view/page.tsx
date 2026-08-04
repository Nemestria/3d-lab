'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader, HDRLoader, DRACOLoader } from 'three/examples/jsm/Addons.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LabHint from '@/components/ui/LabHint'

const partGroups: Record<string, { name: string; offset: THREE.Vector3 }[]> = {
  bolts: [
    { name: 'Bolt',     offset: new THREE.Vector3(0, 0, -5) },
    { name: 'Bolt 001', offset: new THREE.Vector3(0, 0, -5) },
    { name: 'Bolt 004', offset: new THREE.Vector3(0, 0, -5) },
  ],
  fixer: [{ name: 'Fixer', offset: new THREE.Vector3(0, 6, 0) }],
}

    const steps = [
  { cam: { pos: [0, 5, 10], look: [0, 0, 0] }, move: null,    text: 'Profile Corten assembly overview' },
  { cam: { pos: [-45, 5, 10.9], look: [-45, 1, -1] }, move: null,    text: 'Two bolts secure the joints' },
  { cam: { pos: [-50, 3, -4], look: [-30.2, -2.1, 0] }, move: null,    text: 'A nail secures the stability' },
  { cam: { pos: [-50, 3, -4], look: [-30.2, -2.1, 0] }, move: 'bolts',   text: 'Bolts to join the pieces' },
  { cam: { pos: [-50, 8, 4], look: [-40.2, 0, 1] }, move: null,    text: '' },
  { cam: null,                        move: 'fixer', text: 'We provide this nail and the bolts with the product' },

]

export default function LabExperiment() {
  const mountRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
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

    scene.background = new THREE.Color(0x121212);
    const hdrLoader = new HDRLoader();
    hdrLoader.load('/textures/hdri/m1-03-hdri.hdr', (envMap) => {
      envMap.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envMap;
    });

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const light = new THREE.DirectionalLight();
    light.position.set(100, 100, 100);
    scene.add(light);
 // ⬇️ TODO [P5]: register ScrollTrigger — this project IS scroll-driven, unlike P4.
    //    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(ScrollTrigger);
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        duration: 1,
        ease: "power1.inOut",
      },
      scrollTrigger: {
        trigger: scrollRef.current,
        start: "top top",
        end: "bottom bottom",
        pin: false,
        scrub: 1,
      },
    })
    const camTarget = new THREE.Vector3(0, 0, 0);

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
      Object.values(partGroups).flat().forEach((m) => {
        const part = gltf.scene.getObjectByName(m.name);
        if (!part) return
        part.userData.home = part.position.clone();
      })
      steps.forEach((step, i) => {
      if (step.cam) {
        tl.to(camera.position, { x: step.cam.pos[0], y: step.cam.pos[1], z: step.cam.pos[2] })
          .to(camTarget, { x: step.cam.look[0], y: step.cam.look[1], z: step.cam.look[2] }, '<')
      }
      if (step.move) {
        partGroups[step.move].forEach((m) => {
          const part = gltf.scene.getObjectByName(m.name);
          if (!part) return
          const home = part.userData.home
          tl.to(part.position, { x: home.x + m.offset.x, y: home.y + m.offset.y, z: home.z + m.offset.z }, '<')
      })
    }
    
    if (i > 0) tl.to(`.step-${i - 1}`, { opacity: 0 }, '<')
    tl.to(`.step-${i}`, { opacity: 1 }, '<')
  })
      scene.add(gltf.scene);
      gltf.scene.position.sub(center);
    })
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/');
    gltfLoader.setDRACOLoader(dracoLoader);
   

    // ⬇️ TODO [P5]: the EXPLODE — build a gsap timeline (scrub: true) tied to a tall
    //    scrollable element. As the user scrolls, tween each part OUTWARD along its
    //    own direction (e.g. from center), then optionally reassemble. Pin the canvas
    //    (ScrollTrigger `pin`) so it stays put while the story scrolls.
    

    let raf = 0
    const tick = () => {
      // ⬇️ TODO [P5]: renderer.render(scene, camera). (Optional camera controls update.)
      camera.lookAt(camTarget);
      renderer.render(scene, camera);

      raf = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      // ⬇️ TODO [P5]: camera.aspect, camera.updateProjectionMatrix(), renderer.setSize.
      //    Then ScrollTrigger.refresh() so pinned/scrubbed triggers recompute.
     camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
      ScrollTrigger.refresh();
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      // ⬇️ TODO [P5]: kill gsap timeline + ScrollTrigger.getAll().forEach(t => t.kill()),
      //    dispose renderer + every geometry/material/texture, remove the canvas.
      if (model) {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        })
      }
      tl.kill();
      ScrollTrigger.getAll().forEach((t) => t.kill())
      dracoLoader.dispose();
      scene.environment?.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    }
  }, [])
  // ⬇️ TODO [P5]: the fixed canvas + a TALL spacer to generate scroll distance.
  //    e.g. <div ref={mountRef} className="fixed inset-0 ..." /> then a
  //    <div className="h-[400vh]" /> so there is something to scroll through.
  return (
    <>
    <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
    {steps.map((s, i) => (
      <div key={i} className={`step-text step-${i} fixed left-8 top-1/2 max-w-xs opacity-0` }>
        {s.text}
      </div>
    ))}
    <div ref={scrollRef} className="h-[600vh]" />
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