'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { DRACOLoader, GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import { EXRLoader } from 'three/addons/loaders/EXRLoader.js';


export default function LabExperiment() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    // ⬇️ TODO [P3]: the trio — Scene, PerspectiveCamera, WebGLRenderer.
    //    Required: renderer.setPixelRatio(Math.min(devicePixelRatio, 2)).
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 5000);
      const renderer = new THREE.WebGLRenderer();
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      mount.appendChild(renderer.domElement);
      camera.position.set(0.5, 1.1, 0.9);
      camera.lookAt(0,0,0);

      scene.background = new THREE.Color(0x202030);

    // ⬇️ TODO [P3]: lighting — a GLTF model needs light to be seen. Add lights
    //    (e.g. Directional + Ambient/Hemisphere) OR an Environment map for reflections.
    const exrLoader = new EXRLoader;
    const light = new THREE.DirectionalLight();
    light.position.set(100,100,100);
    scene.add(light);
     const envMap = exrLoader.load('/textures/hdri/m1-03-hdri.exr', (texture) => {
      
     });
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    scene.environment = envMap; 
    // ⬇️ TODO [P3]: OrbitControls so the user can rotate the product.
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

    // ⬇️ TODO [P3]: load the model — put a .glb in /public, then:
      const gltfLoader = new GLTFLoader()
      gltfLoader.load('/models/house.glb', (gltf) => {
        scene.add(gltf.scene);
      });

    // ⬇️ TODO [P3]: CONFIGURATOR — after load, traverse gltf.scene, find the mesh(es)
    //    you want to customise (gltf.scene.traverse / getObjectByName), and change
    //    material.color (or swap materials) from UI controls or a Raycaster click.
    let raf = 0
    const tick = () => {
      // ⬇️ TODO [P3]: controls.update() (if damping) + renderer.render(scene, camera).
      controls.update();
      renderer.render(scene, camera);

      raf = requestAnimationFrame(tick)
    }
    tick()
    const onResize = () => {
      // ⬇️ TODO [P3]: update camera.aspect, camera.updateProjectionMatrix(), renderer.setSize.
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    }
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      // ⬇️ TODO [P3]: dispose — traverse the loaded model and dispose every geometry +
      //    material + texture, renderer.dispose(), controls.dispose(), remove the canvas.
    }
  }, [])
  return <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
}
