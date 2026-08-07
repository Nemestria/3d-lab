'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'

import { EffectComposer } from  'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import SliderPanel from '@/components/ui/SliderPanel'
import LabHint from '@/components/ui/LabHint'

// Do NOT remove 'use client' — three.js runs in window.
export default function LabExperiment() {
  const bloomRef = useRef<UnrealBloomPass | null>(null)
  const mountRef = useRef<HTMLDivElement>(null)
  const strength = 0.15; // Bloom strength
  const radius = 0.50;   // Bloom radius
  const threshold = .15; // Bloom threshold
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ⬇️ TODO [P6]: the trio — Scene, PerspectiveCamera, WebGLRenderer.
    //    Required: renderer.setPixelRatio(Math.min(devicePixelRatio, 2)).
    //    A dark scene reads best — bloom is about bright shapes against black.
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);
    camera.position.set(0, 20, 200);

    scene.background = new THREE.Color(0x121212);

    const controls = new OrbitControls(camera, renderer.domElement);

    // ⬇️ TODO [P6]: the SIGN — build a glowing shape. Bloom picks up BRIGHT pixels,
    //    so use an emissive material (MeshBasicMaterial in a bright color, or
    //    MeshStandardMaterial with a high `emissive` + `emissiveIntensity`).
    //    Colors above 1.0 (HDR) bloom hardest.

    let signMesh: THREE.Mesh | null = null;

    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/Orbitron_Regular.json', (font) => {
      const geo = new TextGeometry(`VERTIGO'S LAB`, {
        font: font,
        size: 12,
        depth: 2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 1
      });
      geo.center();
      const mat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xff0000, emissiveIntensity: 5 });
      const mesh = new THREE.Mesh(geo, mat);
      scene.add(mesh);
      signMesh = mesh;
    });

    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(100, 100, 100);
    scene.add(light);


    const resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const bloomPass = new UnrealBloomPass(resolution, strength, radius, threshold);
    bloomRef.current = bloomPass;
    composer.addPass(bloomPass);

    let raf = 0
    const tick = () => {
      // ⬇️ TODO [P6]: render via composer.render() — NOT renderer.render().
      controls.update();
      composer.render();
      
      raf = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      // ⬇️ TODO [P6]: camera.aspect + updateProjectionMatrix, renderer.setSize,
      camera.aspect = (window.innerWidth / window.innerHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      //    AND composer.setSize(innerWidth, innerHeight) — the composer needs it too.
      composer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      // ⬇️ TODO [P6]: dispose — composer.dispose(), the bloom pass, renderer,
      //    every geometry/material/texture, remove the canvas.
      if (signMesh) {
        scene.remove(signMesh);
        signMesh.geometry.dispose();
        (signMesh.material as THREE.Material).dispose();
      }
      bloomRef.current?.dispose();
      composer.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      controls.dispose();

    }
  }, [])
  return (
    <>
    <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
    <SliderPanel
  title="BLOOM"
  sliders={[
    { label: 'STRENGTH',  min: 0, max: 3, step: 0.01, defaultValue: strength,
      onChange: (v) => { if (bloomRef.current) bloomRef.current.strength = v } },
    { label: 'RADIUS',    min: 0, max: 1, step: 0.01, defaultValue: radius,
      onChange: (v) => { if (bloomRef.current) bloomRef.current.radius = v } },
    { label: 'THRESHOLD', min: 0, max: 1, step: 0.01, defaultValue: threshold,
      onChange: (v) => { if (bloomRef.current) bloomRef.current.threshold = v } },
  ]}
/>
    <LabHint
      title="Neon Bloom Sign"
      steps={[
        "A glowing sign, rendered through bloom post-processing.",
        "Drag the sliders (top-right) to tune strength, radius & threshold.",
        "Drag on the sign to orbit around it.",
      ]}
    />
    </>
  )
}
