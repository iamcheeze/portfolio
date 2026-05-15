import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export function SceneBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x000b44)

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100)
    const camBase = new THREE.Vector3(0, 0, 4.25)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const farGroup = new THREE.Group()
    const midGroup = new THREE.Group()
    const nearGroup = new THREE.Group()
    scene.add(farGroup, midGroup, nearGroup)

    //the star object
    const starCount = 1400
    const starPos = new Float32Array(starCount * 3)
    for (let i = 0; i < starCount; i++) {
      const r = 14 + Math.random() * 16
      const u = Math.random()
      const v = Math.random()
      const theta = u * Math.PI * 2
      const phi = Math.acos(2 * v - 1)
      const sinPhi = Math.sin(phi)
      starPos[i * 3] = r * sinPhi * Math.cos(theta)
      starPos[i * 3 + 1] = r * sinPhi * Math.sin(theta)
      starPos[i * 3 + 2] = r * Math.cos(phi) - 22
    }
    const starsGeom = new THREE.BufferGeometry()
    starsGeom.setAttribute('position', new THREE.BufferAttribute(starPos, 3))
    //star material
    const starsMat = new THREE.PointsMaterial({
      color: 0x8b9ccf,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    })
    farGroup.add(new THREE.Points(starsGeom, starsMat))

    //haze thing
    /*const hazeGeom = new THREE.RingGeometry(6, 9.5, 64)
    const hazeMat = new THREE.MeshBasicMaterial({
      color: 0x312e81,
      transparent: true,
      opacity: 0.12,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
    const haze = new THREE.Mesh(hazeGeom, hazeMat)
    haze.position.z = -14
    farGroup.add(haze)*/

    //3D objects

    /*const torusGeom = new THREE.TorusGeometry(0.95, 0.32, 20, 72)
    const torusMat = new THREE.MeshStandardMaterial({
      color: 0x7c3aed,
      metalness: 0.55,
      roughness: 0.35,
      emissive: new THREE.Color(0x1e1b4b),
      emissiveIntensity: 0.2,
    })
    const torus = new THREE.Mesh(torusGeom, torusMat)
    torus.position.set(0.15, -0.1, -0.35)
    midGroup.add(torus)

    const boxGeom = new THREE.BoxGeometry(1.25, 1.25, 1.25)
    const boxMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      metalness: 0.4,
      roughness: 0.42,
      emissive: new THREE.Color(0x312e81),
      emissiveIntensity: 0.35,
    })
    const cube = new THREE.Mesh(boxGeom, boxMat)
    nearGroup.add(cube)*/

    scene.add(new THREE.AmbientLight(0xffffff, 0.35))

    const key = new THREE.DirectionalLight(0xffffff, 1.05)
    key.position.set(4, 5, 6)
    scene.add(key)

    const rim = new THREE.DirectionalLight(0xc4b5fd, 0.5)
    rim.position.set(-5, 1, -4)
    scene.add(rim)

    let targetX = 0
    let targetY = 0
    let smoothX = 0
    let smoothY = 0

    const onMove = (e: PointerEvent) => {
      if (reduceMotion.matches) return
      targetX = (e.clientX / window.innerWidth) * 2 - 1
      targetY = -(e.clientY / window.innerHeight) * 2 + 1
    }

    const onLeave = () => {
      targetX = 0
      targetY = 0
    }

    if (!reduceMotion.matches) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.documentElement.addEventListener('mouseleave', onLeave)
    }

    const resize = () => {
      const w = container.clientWidth
      const h = Math.max(container.clientHeight, 1)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    let rafId = 0
    const tick = () => {
      if (cancelled) return

      const follow = reduceMotion.matches ? 1 : 0.085
      smoothX = lerp(smoothX, targetX, follow)
      smoothY = lerp(smoothY, targetY, follow)

      const sx = smoothX
      const sy = smoothY

      farGroup.position.x = sx * 0.42
      farGroup.position.y = sy * 0.32
      farGroup.rotation.y = sx * 0.04
      farGroup.rotation.x = sy * 0.025

      midGroup.position.x = sx * 0.95
      midGroup.position.y = sy * 0.72
      midGroup.rotation.x = sx * 0.08
      midGroup.rotation.y = sy * 0.06

      nearGroup.position.x = sx * 1.55
      nearGroup.position.y = sy * 1.12
      nearGroup.rotation.z = sx * 0.05
      nearGroup.rotation.x = sy * 0.04

      camera.position.x = camBase.x + sx * 0.12
      camera.position.y = camBase.y + sy * 0.09
      camera.position.z = camBase.z
      camera.lookAt(0, 0, 0)

      /*torus.rotation.x += 0.0035
      torus.rotation.y += 0.0055

      cube.rotation.x += 0.0045
      cube.rotation.y += 0.0075*/

      farGroup.rotation.z += 0.00015

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)

    return () => {
      cancelled = true
      cancelAnimationFrame(rafId)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      ro.disconnect()
      starsGeom.dispose()
      starsMat.dispose()
      /*hazeGeom.dispose()
      hazeMat.dispose()
      torusGeom.dispose()
      torusMat.dispose()
      boxGeom.dispose()
      boxMat.dispose()*/
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div ref={containerRef} className="scene-bg" aria-hidden="true" />
}
