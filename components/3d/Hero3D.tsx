"use client"

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei"
import { Suspense, useState, useEffect } from "react"

function AnimatedSphere() {
  return (
    <Sphere args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#9333ea"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0}
      />
    </Sphere>
  )
}

export default function Hero3D() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-full h-full min-h-screen bg-purple-500/5" />
  }

  return (
    <div className="w-full h-full min-h-screen">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
          <AnimatedSphere />
          <OrbitControls
            enableZoom={false}
            autoRotate
            autoRotateSpeed={2}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}
