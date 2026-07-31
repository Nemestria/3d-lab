'use client'
import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { Timer } from 'three/src/core/Timer.js'
import LabHint from '@/components/ui/LabHint'
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

    scene.background = new THREE.Color(0x060a1a);
    scene.fog = new THREE.Fog(0x060a1a, 400, 2500) //color, near, far

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
    
    //Objects Array
    const objects: THREE.Object3D[] = [];
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
    sun.scale.set(35,35,35);
    sun.receiveShadow = true;
    sun.position.set(0,0,0);
    pivotPoint.add(sun);
    objects.push(sun);
    sun.name = "Sun";

    // ## Mercury
    const mercuryMat = new THREE.MeshStandardMaterial( { color: 0xbf3232 } );
    const mercuryGeo = new THREE.SphereGeometry (radius, widthSegments, heightSegments);
    const mercury = new THREE.Mesh( mercuryGeo, mercuryMat );
    const mercuryPivot = new THREE.Object3D();
    mercury.receiveShadow = true;
    mercury.scale.set(5, 5, 5)
    mercury.position.set(125, 0, 0);
    scene.add(mercuryPivot);
    mercuryPivot.add(mercury);
    objects.push(mercury);
    mercury.name = "Mercury";  
    
    // ## Venus
    const venusMat = new THREE.MeshStandardMaterial( { color: 0xFF7F50 } );
    const venusGeo = new THREE.SphereGeometry (radius, widthSegments, heightSegments);
    const venus = new THREE.Mesh( venusGeo, venusMat );
    const venusPivot = new THREE.Object3D();
    venus.receiveShadow = true;
    venus.scale.set(10, 10, 10)
    venus.position.set(200, 10, 0);
    scene.add(venusPivot);
    venusPivot.add(venus);
    objects.push(venus);  
    venus.name = "Venus"
    // ## Earth
    const earthMat = new THREE.MeshStandardMaterial( { color: 0x0000CD } );
    const earthGeo = new THREE.SphereGeometry (radius, widthSegments, heightSegments);
    const earth = new THREE.Mesh( earthGeo, earthMat );
    const earthPivot = new THREE.Object3D();
    earth.receiveShadow = true;
    earth.scale.set(15, 15, 15)
    earth.position.set(300, 0, 0);
    scene.add(earthPivot);
    earthPivot.add(earth);
    objects.push(earth);  
    earth.name = "Earth";
    // ## Mars
    const marsMat = new THREE.MeshStandardMaterial( { color: 0xFF4500 } );
    const marsGeo = new THREE.SphereGeometry (radius, widthSegments, heightSegments);
    const mars = new THREE.Mesh( marsGeo, marsMat );
    const marsPivot = new THREE.Object3D();
    mars.receiveShadow = true;
    mars.scale.set(8, 8, 8)
    mars.position.set(375, 0, 0);
    scene.add(marsPivot);
    marsPivot.add(mars);
    objects.push(mars);  
    mars.name = "Mars"
    // ## Jupiter
    const jupiterMat = new THREE.MeshStandardMaterial( { color: 0xD2691E } );
    const jupiterGeo = new THREE.SphereGeometry (radius, widthSegments, heightSegments);
    const jupiter = new THREE.Mesh( jupiterGeo, jupiterMat );
    const jupiterPivot = new THREE.Object3D();
    jupiter.receiveShadow = true;
    jupiter.scale.set(30, 30, 30)
    jupiter.position.set(500, 0, 0);
    scene.add(jupiterPivot);
    jupiterPivot.add(jupiter);
    objects.push(jupiter);
    jupiter.name = "Jupiter";
    // ## Saturn
    const saturnMat = new THREE.MeshStandardMaterial( { color: 0xF4A460 } );
    const saturnGeo = new THREE.SphereGeometry (radius, widthSegments, heightSegments);
    const saturn = new THREE.Mesh( saturnGeo, saturnMat );
    const saturnPivot = new THREE.Object3D();
    saturn.receiveShadow = true;
    saturn.scale.set(25, 25, 25)
    saturn.position.set(675, 0, 0);
    scene.add(saturnPivot);
    saturnPivot.add(saturn);
    objects.push(saturn);
    saturn.name = "Saturn"
    // ## Uranus
    const uranusMat = new THREE.MeshStandardMaterial( { color: 0xB0C4DE } );
    const uranusGeo = new THREE.SphereGeometry (radius, widthSegments, heightSegments);
    const uranus = new THREE.Mesh( uranusGeo, uranusMat );
    const uranusPivot = new THREE.Object3D();
    uranus.receiveShadow = true;
    uranus.scale.set(15, 15, 15)
    uranus.position.set(750, 0, 0);
    scene.add(uranusPivot);
    uranusPivot.add(uranus);
    objects.push(uranus);
    uranus.name = "Uranus"
    // ## Neptune

    const neptuneMat = new THREE.MeshStandardMaterial( { color: 0x5F9EA0 });
    const neptuneGeo = new THREE.SphereGeometry (radius, widthSegments, heightSegments);
    const neptune = new THREE.Mesh( neptuneGeo, neptuneMat );
    const neptunePivot = new THREE.Object3D();
    neptune.receiveShadow = true;
    neptune.scale.set(18, 18, 18);
    neptune.position.set(825, 0, 0)
    scene.add(neptunePivot)
    neptunePivot.add(neptune);
    objects.push(neptune);
    neptune.name = "Neptune"
    // ## Pluto is a planet

    const plutoMat = new THREE.MeshStandardMaterial( { color: 0xB0E0E6 });
    const plutoGeo = new THREE.SphereGeometry (radius, widthSegments, heightSegments);
    const pluto = new THREE.Mesh( plutoGeo, plutoMat );
    const plutoPivot = new THREE.Object3D();
    pluto.receiveShadow = true;
    pluto.scale.set(5, 5, 5);
    pluto.position.set(1000, 0, 0);
    scene.add(plutoPivot);
    plutoPivot.add(pluto);
    objects.push(pluto);
    pluto.name = "Pluto"

    const dirLight = new THREE.DirectionalLight( 0xf0fdff, 2.5 );
    dirLight.position.set(90,50,120);
    scene.add(dirLight);
    
    // ⬇️ TODO [P2]: interactivity — a Raycaster + pointer Vector2. On click,
    //    setFromCamera(pointer, camera), intersectObjects(planets), react to hit[0]
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const onClick = (e: MouseEvent) => {
      // 1. mouse pixels → NDC (−1..1), the space the ray needs
      pointer.x =  (e.clientX / window.innerWidth)  * 2 - 1
      pointer.y = -(e.clientY / window.innerHeight) * 2 + 1

      // 2. aim the ray from the camera through that point
      raycaster.setFromCamera(pointer, camera)

      // 3. fire it at your objects — sorted array, nearest first
      const hits = raycaster.intersectObjects(objects)
      
      // 4. act on the nearest hit (guard: empty click returns [])
      if (hits.length > 0) {
        const mesh = hits[0].object as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        const original = mat.color.getHex();
        mat.color.set(0xffffff);
        setTimeout(() => mat.color.setHex(original), 1000)
        console.log('hit:', hits[0].object.name)
      }
}
    // ⬇️ TODO [P2]: (optional) OrbitControls so you can drag to look around.
    let raf = 0
    const timer = new Timer();
    timer.connect( document );
    const tick = (  ) => {
      const speed = timer.update().getDelta();

      // ⬇️ TODO [P2]: spin each pivot (orbit) + each planet on its own axis.
      //    Different speeds per planet. Then renderer.render(scene, camera).
      objects.forEach( ( obj ) => {
        obj.rotation.z += 1 * speed;
      })
      mercuryPivot.rotation.z += 0.3 * speed;
      venusPivot.rotation.z += 0.45 * speed;
      earthPivot.rotation.z += 0.51 * speed;
      marsPivot.rotation.z += 0.55 * speed;
      saturnPivot.rotation.z += 0.35 * speed;
      jupiterPivot.rotation.z += 0.23 * speed;
      uranusPivot.rotation.z += 0.289 * speed;
      neptunePivot.rotation.z += 0.362 * speed;
      plutoPivot.rotation.z += 0.08 * speed;

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
    window.addEventListener('click', onClick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
      // ⬇️ TODO [P2]: dispose EVERY geometry + material (sun + all planets),
      //    renderer.dispose(), OrbitControls.dispose() if used, remove the canvas,
      //    and remove your pointer listener.
      window.removeEventListener('click', onClick);
      renderer.domElement.removeEventListener('click', onClick);  
      mount.removeChild(renderer.domElement);
      renderer.dispose();
      controls.dispose();
      sun.geometry.dispose();
      sun.material.dispose();
      mercury.geometry.dispose();
      mercury.material.dispose();
      venus.geometry.dispose();
      venus.material.dispose();
      earth.geometry.dispose();
      earth.material.dispose();
      mars.geometry.dispose();
      mars.material.dispose();
      jupiter.geometry.dispose();
      jupiter.material.dispose();
      saturn.geometry.dispose();
      saturn.material.dispose();
      neptune.geometry.dispose();
      neptune.material.dispose();
      uranus.geometry.dispose();
      uranus.material.dispose();
      pluto.geometry.dispose();
      pluto.material.dispose();
      
    }
  }, [])
  return (
    <>
      <div ref={mountRef} className="fixed inset-0 w-screen h-screen" />
      <LabHint
        title="Interactive Solar System"
        steps={[
          'Drag to orbit the camera around the system.',
          'Scroll to zoom in and out.',
          'Click a planet to highlight it for a second.',
        ]}
      />
    </>
  )
}
