'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
// ⬇️ TODO [P4]: add the imports YOU need:
//   - OrbitControls? (optional — a tour usually DRIVES the camera, so maybe not)
import { GLTFLoader, HDRLoader, DRACOLoader } from 'three/examples/jsm/Addons.js'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function LabExperiment() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    // ⬇️ TODO [P4]: the trio — Scene, PerspectiveCamera, WebGLRenderer.
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
    // ⬇️ TODO [P4]: build something worth touring — a small "set" of meshes,
    //    or load a .glb. Add lights (or an environment) so it reads on camera.
    const hdrLoader = new HDRLoader;
    hdrLoader.load('/textures/hdri/m1-03-hdri.hdr', (envMap) => {
      envMap.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = envMap;
    });

    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    const light = new THREE.DirectionalLight();
    light.position.set(100, 100, 100);
    scene.add(light);

    let model: THREE.Object3D | null = null;
    const gltfLoader = new GLTFLoader();
    gltfLoader.load('/models/PerfilCortenL10.glb', (gltf) => {
      model = gltf.scene;
      const box = new THREE.Box3().setFromObject(gltf.scene)
      const center = box.getCenter(new THREE.Vector3)
      scene.add(gltf.scene);
      gltf.scene.position.sub(center);
    })

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/gltf/')
    gltfLoader.setDRACOLoader(dracoLoader);    
    // ⬇️ TODO [P4]: define the WAYPOINTS — an ordered list of camera positions
    //    and matching look-at targets (e.g. [{ pos: Vector3, look: Vector3 }, ...]).
    const waypoints = [
      { pos: new THREE.Vector3(-1.23, 14.28, 43.63), look: new THREE.Vector3(0,0,0) },
      { pos: new THREE.Vector3(-50, 2.29, 5.0), look: new THREE.Vector3(-40,0,-5) },
      { pos: new THREE.Vector3(-45., 0, -10), look: new THREE.Vector3(-40,0,0) },
      { pos: new THREE.Vector3(-35., 10, 0), look: new THREE.Vector3(-40,-10,0) },
      { pos: new THREE.Vector3(-1.23, 14.28, 43.63), look: new THREE.Vector3(0,0,0) },
      
      
    ]

        const camTarget = new THREE.Vector3(0,0,0);
    camera.position.copy(waypoints[0].pos);
    camTarget.copy(waypoints[0].look);

    
    // ⬇️ TODO [P4]: register the ScrollTrigger plugin ONCE:
    //    gsap.registerPlugin(ScrollTrigger)
    gsap.registerPlugin(ScrollTrigger);
    // ⬇️ TODO [P4]: build a gsap TIMELINE that tweens camera.position through the
    //    waypoints. On each tween use onUpdate to camera.lookAt(currentTarget).
    //    Drive it either by time (autoplay) OR scrub it with ScrollTrigger
    //    (scrub: true) so scrolling moves the camera along the tour.
    const tl = gsap.timeline({
      paused: true, 
      defaults: {
        duration: 5,
        ease: 'power2.inOut'
      }
    })
    waypoints.slice(1).forEach((wp) => {
      tl.to(camera.position, {
        x: wp.pos.x,
        y: wp.pos.y,
        z: wp.pos.z,
      })
      .to(camTarget, {
        x: wp.look.x,
        y: wp.look.y,
        z: wp.look.z
      }, '<')
    })

  //gsap timeline declared as variable so it's reused in desktop and mobile events
  const applyProgress = () => {
      gsap.to(
        tl,
        { 
          progress: target,
          duration: 2,
          ease: 'power4.out',
          overwrite: true
        },
      )
    }
    let target = 0;
    const onWheel = (e: WheelEvent) => {
      target += e.deltaY * 0.0005;
      target = THREE.MathUtils.clamp(target, 0, 1);
      applyProgress();
    }
    window.addEventListener('wheel', onWheel);
    
    // RESPONSIVE EVENT
  

    let lastY = 0;
    const onTouchStart = (e: TouchEvent) => { lastY = e.touches[0].clientY };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0].clientY;
      const delta = lastY - y;
      lastY = y;
      target += delta * 0.0002;
      target = THREE.MathUtils.clamp(target, 0, 1);
      applyProgress();
    }

    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('touchmove', onTouchMove, { passive: false });

    let raf = 0
    const tick = () => {
      // ⬇️ TODO [P4]: renderer.render(scene, camera). gsap steps itself on its own
      //    ticker — you do NOT manually advance the timeline here.
      camera.lookAt(camTarget);
      renderer.render(scene, camera);

      raf = requestAnimationFrame(tick)
    }
    tick()

    const onResize = () => {
      // ⬇️ TODO [P4]: camera.aspect, camera.updateProjectionMatrix(), renderer.setSize.
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(innerWidth, innerHeight);
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('wheel', onWheel);
      // ⬇️ TODO [P4]: kill the gsap timeline + ScrollTrigger.getAll().forEach(t => t.kill()),
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
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      dracoLoader.dispose();
      scene.environment?.dispose();
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    }
  }, [])
  return <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
}
