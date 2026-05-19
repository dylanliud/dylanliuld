import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(0xf5f5f5, 1)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.set(0, 0, 8)

    // Create instanced mesh with geometric shapes
    const count = 60
    const geometry = new THREE.IcosahedronGeometry(0.4, 0)
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.9,
      roughness: 0.15,
      envMapIntensity: 1.0,
    })

    const mesh = new THREE.InstancedMesh(geometry, material, count)
    const dummy = new THREE.Object3D()
    const positions: THREE.Vector3[] = []

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 14
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 8
      positions.push(new THREE.Vector3(x, y, z))
      dummy.position.set(x, y, z)
      dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      const s = 0.3 + Math.random() * 0.8
      dummy.scale.set(s, s, s)
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    scene.add(mesh)

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.2)
    dirLight.position.set(5, 8, 5)
    scene.add(dirLight)

    const dirLight2 = new THREE.DirectionalLight(0xcccccc, 0.6)
    dirLight2.position.set(-5, -3, 3)
    scene.add(dirLight2)

    const pointLight = new THREE.PointLight(0xffffff, 0.8, 20)
    pointLight.position.set(0, 0, 4)
    scene.add(pointLight)

    // Time and animation
    let time = 0
    const clock = new THREE.Clock()
    let rafId: number

    const animate = () => {
      rafId = requestAnimationFrame(animate)
      const delta = clock.getDelta()
      time += delta

      // Camera orbit with noise-like movement
      const camX = Math.sin(time * 0.08) * 3 + (mouseRef.current.x - 0.5) * 2
      const camY = Math.cos(time * 0.06) * 1.5 + (mouseRef.current.y - 0.5) * 1
      camera.position.x += (camX - camera.position.x) * 0.02
      camera.position.y += (camY - camera.position.y) * 0.02
      camera.lookAt(0, 0, 0)

      // Rotate instances slowly
      for (let i = 0; i < count; i++) {
        dummy.position.copy(positions[i])
        dummy.position.y += Math.sin(time * 0.3 + i * 0.5) * 0.08
        dummy.rotation.x = time * 0.1 + i
        dummy.rotation.y = time * 0.15 + i * 0.5
        const s = 0.3 + Math.sin(time * 0.2 + i) * 0.15 + 0.5
        dummy.scale.set(s, s, s)
        dummy.updateMatrix()
        mesh.setMatrixAt(i, dummy.matrix)
      }
      mesh.instanceMatrix.needsUpdate = true

      // Adjust light intensity based on mouse
      dirLight.intensity = 1.2 + (mouseRef.current.x - 0.5) * 0.3

      renderer.render(scene, camera)
    }

    animate()

    // Resize handler
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onResize)

    // Mouse handler
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX / window.innerWidth
      mouseRef.current.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMouseMove)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('mousemove', onMouseMove)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1,
      }}
    />
  )
}
