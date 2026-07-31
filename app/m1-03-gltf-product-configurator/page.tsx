'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js'
import { HDRLoader } from 'three/addons/loaders/HDRLoader.js';
import LabHint from '@/components/ui/LabHint'


export default function LabExperiment() {
  const mountRef = useRef<HTMLDivElement>(null)
  const selectedRef = useRef<THREE.Mesh | null>(null)
  const bubbleRef = useRef<HTMLDivElement>(null)
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
    const hdrLoader = new HDRLoader;  
    hdrLoader.load('/textures/hdri/m1-03-hdri.hdr', (envMap) => {
      envMap.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envMap;   
     });
    
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const light = new THREE.DirectionalLight();
    light.position.set(100,100,100);
    scene.add(light);

    // ⬇️ TODO [P3]: OrbitControls so the user can rotate the product.
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;

    // ⬇️ TODO [P3]: load the model — put a .glb in /public, then:
    let model: THREE.Object3D | null = null;
      const gltfLoader = new GLTFLoader()
      gltfLoader.load('/models/house.glb', (gltf) => {
        model = gltf.scene;
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.userData.originalColor = child.material.color.clone();
          }
        })
        scene.add(gltf.scene);
      });

    // ⬇️ TODO [P3]: CONFIGURATOR — after load, traverse gltf.scene, find the mesh(es)
    //    you want to customise (gltf.scene.traverse / getObjectByName), and change
    //    material.color (or swap materials) from UI controls or a Raycaster click.
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onClick = (e: MouseEvent) => {
      if (!model) return;
      if (selectedRef.current) {
        (selectedRef.current.material as THREE.MeshStandardMaterial).emissive.set(0x000000)
      }
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObject(model, true);
      
      if (hits.length > 0) {
        selectedRef.current = hits[0].object as THREE.Mesh;
        (selectedRef.current.material as THREE.MeshStandardMaterial).emissive.set(0x333333);
      } else {
        selectedRef.current = null;
      }
      
    }

    const projected = new THREE.Vector3();

    let raf = 0
    const tick = () => {
      const bubble = bubbleRef.current;
      const mesh = selectedRef.current;
      const box = new THREE.Box3();
      if (mesh && bubble) {
        box.setFromObject(mesh);
        box.getCenter(projected);
        projected.project(camera);
        const x = (projected.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-projected.y * 0.5 + 0.5) * window.innerHeight;
        bubble.style.display = 'flex';
        bubble.style.transform = `translate(${x}px, ${y}px)`
      } else if (bubble) {  
        bubble.style.display = 'none';
      }
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
    renderer.domElement.addEventListener('click', onClick);
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      renderer.domElement.removeEventListener('click', onClick);
      if (model) {
        model.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            child.material.dispose();
          }
        })
      }
      scene.environment?.dispose();
      controls.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
      // ⬇️ TODO [P3]: dispose — traverse the loaded model and dispose every geometry +
      //    material + texture, renderer.dispose(), controls.dispose(), remove the canvas.
    }
  }, [])
  return (
  <>
    <div ref={bubbleRef} className="fixed z-10 flex gap-2" style={{ display: 'none' }}>
      <button aria-label="Red" className='w-8 h-8 rounded-full border border-white/30 bg-[#e11d48] transition-transform hover:scale-110'
       onClick={() => {
        const mesh = selectedRef.current;
        if(!mesh) return
         (mesh.material as THREE.MeshStandardMaterial).color.set('#e11d48');
        }}>
        
      </button>
      <button aria-label="Blue" className='w-8 h-8 rounded-full border border-white/30 bg-[#2a1de1] transition-transform hover:scale-110'
      onClick={() => {
        const mesh = selectedRef.current;
        if(!mesh) return
         (mesh.material as THREE.MeshStandardMaterial).color.set('#2a1de1')}}>
          
        </button>
      <button aria-label="Green" className='w-8 h-8 rounded-full border border-white/30 bg-[#1de15e] transition-transform hover:scale-110'
      onClick={() => {
        const mesh = selectedRef.current;
        if(!mesh) return
         (mesh.material as THREE.MeshStandardMaterial).color.set('#1de15e')}}>
          
        </button>
      <button aria-label="Reset" className='w-8 h-8 rounded-full border border-white/30 bg-zinc-500 transition-transform hover:scale-110'
      onClick={() => { 
        const mesh = selectedRef.current;
        if (!mesh) return
        (mesh.material as THREE.MeshStandardMaterial).color.copy(mesh.userData.originalColor)}}>
          ↺
        </button>
    </div>
    <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />     
    <LabHint
  title="GLTF Configurator"
  steps={[
    'Click a part of the house to select it.',
    'Use the colour bubbles to repaint that part.',
    'Drag to orbit · click empty space to deselect.',
  ]}
/>
  </>
  )
}
