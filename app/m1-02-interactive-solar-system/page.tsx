'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
// TODO: add the imports YOU need (OrbitControls from 'three/examples/jsm/controls/OrbitControls').
// Do NOT remove 'use client' — three.js runs in window.
export default function LabExperiment() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    // ⬇️ TODO [P2]: the trio — Scene, PerspectiveCamera, WebGLRenderer.
    //    Required: renderer.setPixelRatio(Math.min(devicePixelRatio, 2)).
    //    Pull the camera back + up so you look down on the system.

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    const geometry = new THREE.SphereGeometry(15, 32, 16);
    const material = new THREE.MeshStandardMaterial( { color: 0xfdf512 });
    const sunLight = new THREE.PointLight( 0xff0000, 50, 0, 500);

    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);
    camera.position.z = 50;
    camera.rotation.x = 0;


    
    // ⬇️ TODO [P2]: light — the sun emits. Use a PointLight at the origin
    //    (planets need a lit material: MeshStandardMaterial, not Basic).
    // ⬇️ TODO [P2]: the sun — SphereGeometry + a bright material at the center.
    const sun = new THREE.Mesh( geometry, material );
    sun.position.set(0,0,0)
    sunLight.position.set(0,0,0)
    scene.add(sun);
    scene.add(sunLight);
    // ⬇️ TODO [P2]: planets — SphereGeometry each, different sizes/colors.
    //    KEY CONCEPT: orbits come from the SCENE GRAPH, not from math you write.
    //    Make a pivot (new THREE.Object3D or Group) at the origin, add the planet
    //    to the pivot at some x-offset, add the pivot to the scene. Rotate the
    //    PIVOT and the planet sweeps a circle for free. One pivot per planet.
    // ⬇️ TODO [P2]: interactivity — a Raycaster + pointer Vector2. On click,
    //    setFromCamera(pointer, camera), intersectObjects(planets), react to hit[0].
    // ⬇️ TODO [P2]: (optional) OrbitControls so you can drag to look around.
    let raf = 0
    const tick = () => {
      // ⬇️ TODO [P2]: spin each pivot (orbit) + each planet on its own axis.
      //    Different speeds per planet. Then renderer.render(scene, camera).
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick)
    }
    tick()
    const onResize = () => {
      // ⬇️ TODO [P2]: update camera.aspect, camera.updateProjectionMatrix(), renderer.setSize.
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight)
    }
    window.addEventListener('resize', onResize)
    // ⬇️ TODO [P2]: add your pointer/click listener here (and remove it in cleanup).
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      // ⬇️ TODO [P2]: dispose EVERY geometry + material (sun + all planets),
      //    renderer.dispose(), OrbitControls.dispose() if used, remove the canvas,
      //    and remove your pointer listener.
    }
  }, [])
  return <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
}
