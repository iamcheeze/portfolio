import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import scrap1Url from './assets/Scrap1.glb?url'
import scrap2Url from './assets/Scrap2.glb?url'
import scrap3Url from './assets/Scrap3.glb?url'
import './SceneBackground.css'

const SCRAP_URLS = [scrap1Url, scrap2Url, scrap3Url, scrap1Url, scrap2Url, scrap3Url] as const
const FOG_COLOR = 0x0a1654
const NAVY = 0x000b44

const DEPTH_LAYERS = [
  { zMin: -20, zMax: -15, targetSize: 0.5 },
  { zMin: -13, zMax: -9, targetSize: 0.6 },
  { zMin: -11, zMax: -7, targetSize: 0.7 },
  { zMin: -8, zMax: -5, targetSize: 0.9 },
  { zMin: -6, zMax: -3, targetSize: 1 },
] as const

type ScrapInstance = {
  object: THREE.Object3D
  rotSpeed: THREE.Vector3
}

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min)
}

/** Calculates the visible camera boundaries (half-width and half-height) at a specific Z depth */
function getCameraBoundsAtZ(camera: THREE.PerspectiveCamera, camZ: number, targetZ: number) {
  const distance = Math.abs(camZ - targetZ)
  
  // Convert vertical FOV to radians
  const vFovRad = (camera.fov * Math.PI) / 180
  
  // Calculate total height and width visible at this distance
  const visibleHeight = 2 * Math.tan(vFovRad / 2) * distance
  const visibleWidth = visibleHeight * camera.aspect

  // Multiply by a slight safety buffer (0.85) so models don't clip through screen edges
  return {
    xMax: (visibleWidth / 2) * 0.85,
    yMax: (visibleHeight / 2) * 0.85,
  }
}

function createBlueMaterial() {
  return new THREE.MeshStandardMaterial({
    color: 0x3a86ff,
    metalness: 0.4,
    roughness: 0.38,
    emissive: new THREE.Color(0x1a4db3),
    emissiveIntensity: 0.35,
    fog: true,
  })
}

function applyBlueMaterial(root: THREE.Object3D, material: THREE.MeshStandardMaterial) {
  root.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = material
    }
  })
}

function normalizeAndCenter(model: THREE.Object3D, targetSize: number) {
  const box = new THREE.Box3().setFromObject(model)
  const size = box.getSize(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z, 0.001)
  model.scale.setScalar(targetSize / maxDim)

  const centered = new THREE.Box3().setFromObject(model)
  const center = centered.getCenter(new THREE.Vector3())
  model.position.sub(center)
}

function createBottomFogPlane() {
  const material = new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: {
      uColor: { value: new THREE.Color(FOG_COLOR) },
      uDeep: { value: new THREE.Color(NAVY) },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform vec3 uColor;
      uniform vec3 uDeep;
      void main() {
        float h = smoothstep(0.08, 0.92, vUv.y);
        float alpha = (1.0 - h) * 0.82;
        vec3 col = mix(uDeep, uColor, h * 0.45 + 0.2);
        gl_FragColor = vec4(col, alpha);
      }
    `,
  })

  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(52, 16), material)
  mesh.position.set(0, -3.6, -0.25)
  mesh.renderOrder = 10
  return mesh
}

export function SceneBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

    const scene = new THREE.Scene()
    scene.background = new THREE.Color(NAVY)
    scene.fog = new THREE.FogExp2(FOG_COLOR, 0.052)

    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100)
    const camBase = new THREE.Vector3(0, 0, 4.25)

    const renderer = new THREE.WebGLRenderer({ antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    container.appendChild(renderer.domElement)

    const bottomFogPlane = createBottomFogPlane()
    scene.add(bottomFogPlane)

    const farGroup = new THREE.Group()
    const midFarGroup = new THREE.Group()
    const midGroup = new THREE.Group()
    const midNearGroup = new THREE.Group()
    const nearGroup = new THREE.Group()
    const depthGroups = [farGroup, midFarGroup, midGroup, midNearGroup, nearGroup]
    scene.add(farGroup, midFarGroup, midGroup, midNearGroup, nearGroup)

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
    const starsMat = new THREE.PointsMaterial({
      color: 0x8b9ccf,
      size: 0.045,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      fog: true,
    })
    farGroup.add(new THREE.Points(starsGeom, starsMat))

    scene.add(new THREE.AmbientLight(0xffffff, 0.35))

    const key = new THREE.DirectionalLight(0xffffff, 1.05)
    key.position.set(4, 5, 6)
    scene.add(key)

    const rim = new THREE.DirectionalLight(0x6b9fff, 0.65)
    rim.position.set(-5, 1, -4)
    scene.add(rim)

    const blueFill = new THREE.DirectionalLight(0x3a86ff, 0.35)
    blueFill.position.set(0, -3, 2)
    scene.add(blueFill)

    const scrapInstances: ScrapInstance[] = []
    const blueMaterial = createBlueMaterial()
    const loader = new GLTFLoader()

    const loadScrapModels = async () => {
      const templates = await Promise.all(
        SCRAP_URLS.map((url) =>
          loader.loadAsync(url).then((gltf) => {
            if (cancelled) return null
            const root = gltf.scene
            applyBlueMaterial(root, blueMaterial)
            return root
          }),
        ),
      )

      if (cancelled) return

      // Ensure dimensions are correct on execution
      const w = container.clientWidth
      const h = Math.max(container.clientHeight, 1)
      camera.aspect = w / h
      camera.updateProjectionMatrix()

      templates.forEach((template) => {
        if (!template) return

        DEPTH_LAYERS.forEach((layer, layerIndex) => {
          const group = depthGroups[layerIndex]
          const instance = template.clone(true)
          normalizeAndCenter(instance, layer.targetSize)

          // 1. Calculate a random depth within this layer's bounds
          const randomZ = randomRange(layer.zMin, layer.zMax)

          // 2. Query the dynamically computed maximum visual range at this depth
          const bounds = getCameraBoundsAtZ(camera, camBase.z, randomZ)

          // 3. Keep X and Y precisely within what the camera frustum sees
          const randomX = randomRange(-bounds.xMax, bounds.xMax)
          const randomY = randomRange(-bounds.yMax, bounds.yMax)

          instance.position.set(randomX, randomY, randomZ)
          instance.rotation.set(
            randomRange(0, Math.PI * 2),
            randomRange(0, Math.PI * 2),
            randomRange(0, Math.PI * 2),
          )

          group.add(instance)
          scrapInstances.push({
            object: instance,
            rotSpeed: new THREE.Vector3(
              randomRange(0.002, 0.006) * (Math.random() > 0.5 ? 1 : -1),
              randomRange(0.003, 0.008) * (Math.random() > 0.5 ? 1 : -1),
              randomRange(0.001, 0.004) * (Math.random() > 0.5 ? 1 : -1),
            ),
          })
        })
      })
    }

    void loadScrapModels()

    let targetX = 0
    let targetY = 0
    let smoothX = 0
    let smoothY = 0
    let time = 0
    let isMobile = false

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

      // Mobile check: screen width under 768px OR a touch-capable device
      isMobile = w <= 768 || window.matchMedia('(hover: none) and (pointer: coarse)').matches
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    let rafId = 0
    const tick = () => {
      if (cancelled) return
      time += 0.016

      if (isMobile) {
        // --- MOBILE SINE WAVE ANIMATION ---
        const mobileAmplitude = 0.6
        const mobileSpeed = 1.0
        const sinValue = Math.sin(time * mobileSpeed)

        depthGroups.forEach((group, index) => {
          // Alternating phase: 0 -> -1, 1 -> 1, 2 -> -1, 3 -> 1, 4 -> -1
          const phaseMult = index % 2 === 0 ? -1 : 1
          
          group.position.y = sinValue * mobileAmplitude * phaseMult
          
          // Smoothly revert X position and rotations back to 0 in case user resized from desktop
          group.position.x = lerp(group.position.x, 0, 0.05)
          group.rotation.x = lerp(group.rotation.x, 0, 0.05)
          group.rotation.y = lerp(group.rotation.y, 0, 0.05)
          group.rotation.z = lerp(group.rotation.z, 0, 0.05)
        })

        // Re-center camera gently
        camera.position.x = lerp(camera.position.x, camBase.x, 0.05)
        camera.position.y = lerp(camera.position.y, camBase.y, 0.05)
        camera.position.z = camBase.z

      } else {
        // --- DESKTOP PARALLAX ANIMATION ---
        const follow = reduceMotion.matches ? 1 : 0.085
        smoothX = lerp(smoothX, targetX, follow)
        smoothY = lerp(smoothY, targetY, follow)

        const sx = smoothX
        const sy = smoothY

        farGroup.position.x = sx * 0.42
        farGroup.position.y = sy * 0.32
        farGroup.rotation.y = sx * 0.04
        farGroup.rotation.x = sy * 0.025

        midFarGroup.position.x = sx * 0.65
        midFarGroup.position.y = sy * 0.52

        midGroup.position.x = sx * 0.95
        midGroup.position.y = sy * 0.72
        midGroup.rotation.x = sx * 0.08
        midGroup.rotation.y = sy * 0.06

        midNearGroup.position.x = sx * 1.25
        midNearGroup.position.y = sy * 0.92

        nearGroup.position.x = sx * 1.55
        nearGroup.position.y = sy * 1.12
        nearGroup.rotation.z = sx * 0.05
        nearGroup.rotation.x = sy * 0.04

        camera.position.x = camBase.x + sx * 0.12
        camera.position.y = camBase.y + sy * 0.09
        camera.position.z = camBase.z
      }

      // Applies to both Mobile and Desktop
      camera.lookAt(0, 0, 0)
      farGroup.rotation.z += 0.00015

      // Constant local rotation for individual scrap pieces
      for (const { object, rotSpeed } of scrapInstances) {
        object.rotation.x += rotSpeed.x
        object.rotation.y += rotSpeed.y
        object.rotation.z += rotSpeed.z
      }

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
      blueMaterial.dispose()
      bottomFogPlane.geometry.dispose()
      ;(bottomFogPlane.material as THREE.ShaderMaterial).dispose()
      for (const { object } of scrapInstances) {
        object.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose()
            const mats = Array.isArray(child.material)
              ? child.material
              : [child.material]
            mats.forEach((m) => m.dispose())
          }
        })
      }
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div className="scene-stack" aria-hidden="true">
      <div ref={containerRef} className="scene-bg" />
      <div className="scene-bottom-fog" />
    </div>
  )
}