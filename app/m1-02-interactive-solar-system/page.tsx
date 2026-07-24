'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { Clock } from 'three'

// Do NOT remove 'use client' — three.js runs in window.
export default function LabExperiment() {
  const mountRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    // ⬇️ TODO [P2]: the trio — Scene, PerspectiveCamera, WebGLRenderer.
    //    Required: renderer.setPixelRatio(Math.min(devicePixelRatio, 2)).
    //    Pull the camera back + up so you look down on the system.

    // variables for components of the 3D Scene
    // spheres
    const radius = 1;
    const widthSegments = 12;
    const heightSegments = 12;


    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer();
    const geometry = new THREE.SphereGeometry(radius, widthSegments, heightSegments);
    const emiMaterial = new THREE.MeshPhongMaterial({emissive: 0xFFFF00});

    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);
    camera.position.set(500, 50, 500);
    camera.up.set(0,0,1);
    camera.lookAt(0,0,0);

    
    //Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0, 0,);
    controls.enableDamping = true;
    controls.dampingFactor = 0.01;
    


    const objects = [];
    
    

    // ⬇️ TODO [P2]: planets — SphereGeometry each, different sizes/colors.
    //    KEY CONCEPT: orbits come from the SCENE GRAPH, not from math you write.
    //    Make a pivot (new THREE.Object3D or Group) at the origin, add the planet
    //    to the pivot at some x-offset, add the pivot to the scene. Rotate the
    //    PIVOT and the planet sweeps a circle for free. One pivot per planet.
    const pivotPoint = new THREE.Object3D;
    pivotPoint.position.set(0,0,0);
    scene.add(pivotPoint);
    objects.push(pivotPoint);
    
    // ⬇️ TODO [P2]: light — the sun emits. Use a PointLight at the origin
    //    (planets need a lit material: MeshStandardMaterial, not Basic).
    // ⬇️ TODO [P2]: the sun — SphereGeometry + a bright material at the center.
    const sun = new THREE.Mesh( geometry, emiMaterial );
    sun.scale.set(15,15,15);
    sun.receiveShadow = true;
    sun.position.set(0,0,0);
    pivotPoint.add(sun);
    objects.push(sun);

    // ## Mercury
    const mercuryMat = new THREE.MeshStandardMaterial( { color: 0xbf3232 } );
    const mercuryGeo = new THREE.SphereGeometry (radius, widthSegments, heightSegments);
    const mercury = new THREE.Mesh( mercuryGeo, mercuryMat );
    mercury.receiveShadow = true;
    mercury.scale.set(5, 5, 5)
    mercury.position.set(125, 0, 0);
    pivotPoint.add(mercury);
    objects.push(mercury);    


    const color = 0xFFFFFF;
    const intensityPLight = 500;
    const dirLight = new THREE.DirectionalLight( 0xf0fdff, 2.5 );

    scene.add(dirLight);
    // ⬇️ TODO [P2]: interactivity — a Raycaster + pointer Vector2. On click,
    //    setFromCamera(pointer, camera), intersectObjects(planets), react to hit[0].
    // ⬇️ TODO [P2]: (optional) OrbitControls so you can drag to look around.
    let raf = 0
    const tick = (  ) => {

      const time = new THREE.Clock.getElapsedTime();
      let planetRotation = 0;

      planetRotation *= time;
      // ⬇️ TODO [P2]: spin each pivot (orbit) + each planet on its own axis.
      //    Different speeds per planet. Then renderer.render(scene, camera).
      objects.forEach( ( obj ) => {
        obj.rotation.y = planetRotation;  
      })

      controls.update();
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
