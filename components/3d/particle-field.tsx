"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface ParticleFieldProps {
  count?: number
  size?: number
  color?: string
  speed?: number
  opacity?: number
  spread?: number
  lowDetail?: boolean
}

export default function ParticleField({
  count = 1000,
  size = 0.05,
  color = "#60a5fa",
  speed = 0.05,
  opacity = 0.5,
  spread = 50,
  lowDetail = false,
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null)

  // Reduce particle count in low detail mode
  const particleCount = lowDetail ? Math.floor(count / 3) : count

  // Create particles
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * spread
      const y = (Math.random() - 0.5) * spread
      const z = (Math.random() - 0.5) * spread
      const w = Math.random() // For animation offset
      temp.push(x, y, z, w)
    }
    return new Float32Array(temp)
  }, [particleCount, spread])

  // Update particles
  useFrame((state) => {
    if (points.current) {
      const positions = points.current.geometry.attributes.position.array as Float32Array
      const time = state.clock.elapsedTime

      for (let i = 0; i < positions.length; i += 4) {
        const w = positions[i + 3]
        // Subtle movement based on time and offset
        positions[i + 1] += Math.sin(time * speed + w) * 0.01
      }

      points.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particles.length / 4} array={particles} itemSize={4} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={opacity}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
