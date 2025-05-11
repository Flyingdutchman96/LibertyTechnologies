"use client"

import { useRef, useMemo, useEffect } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface RainProps {
  count?: number
  speed?: number
  opacity?: number
  color?: string
  area?: number
  lowDetail?: boolean
}

export function Rain({
  count = 1000,
  speed = 1.5,
  opacity = 0.6,
  color = "#8ec5fc",
  area = 50,
  lowDetail = false,
}: RainProps) {
  const rainRef = useRef<THREE.Points>(null)

  // Reduce particle count in low detail mode
  const particleCount = lowDetail ? Math.floor(count / 3) : count

  // Create rain drops
  const rainDrops = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Random position within area
      positions[i * 3] = (Math.random() - 0.5) * area
      positions[i * 3 + 1] = Math.random() * 30 // Height
      positions[i * 3 + 2] = (Math.random() - 0.5) * area

      // Random velocity
      velocities[i] = 0.5 + Math.random() * 0.5

      // Random size
      sizes[i] = 0.1 + Math.random() * 0.3
    }

    return { positions, velocities, sizes }
  }, [particleCount, area])

  // Update rain animation
  useFrame((state, delta) => {
    if (rainRef.current) {
      const positions = rainRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        // Update y position (falling)
        positions[i * 3 + 1] -= rainDrops.velocities[i] * speed * delta * 10

        // Reset if below ground
        if (positions[i * 3 + 1] < -2) {
          positions[i * 3 + 1] = 30
          positions[i * 3] = (Math.random() - 0.5) * area
          positions[i * 3 + 2] = (Math.random() - 0.5) * area
        }
      }

      rainRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={rainRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={rainDrops.positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={rainDrops.sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={{
          color: { value: new THREE.Color(color) },
          pointTexture: { value: createRainTexture() },
        }}
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = vec3(1.0, 1.0, 1.0);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform sampler2D pointTexture;
          varying vec3 vColor;
          void main() {
            gl_FragColor = vec4(color, ${opacity}) * texture2D(pointTexture, gl_PointCoord);
            if (gl_FragColor.a < 0.1) discard;
          }
        `}
      />
    </points>
  )
}

interface SnowProps {
  count?: number
  speed?: number
  opacity?: number
  color?: string
  area?: number
  lowDetail?: boolean
}

export function Snow({
  count = 1000,
  speed = 0.5,
  opacity = 0.8,
  color = "#ffffff",
  area = 50,
  lowDetail = false,
}: SnowProps) {
  const snowRef = useRef<THREE.Points>(null)

  // Reduce particle count in low detail mode
  const particleCount = lowDetail ? Math.floor(count / 3) : count

  // Create snowflakes
  const snowflakes = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      // Random position within area
      positions[i * 3] = (Math.random() - 0.5) * area
      positions[i * 3 + 1] = Math.random() * 30 // Height
      positions[i * 3 + 2] = (Math.random() - 0.5) * area

      // Random velocity (including some horizontal drift)
      velocities[i * 3] = (Math.random() - 0.5) * 0.2
      velocities[i * 3 + 1] = 0.1 + Math.random() * 0.3
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2

      // Random size
      sizes[i] = 0.2 + Math.random() * 0.5
    }

    return { positions, velocities, sizes }
  }, [particleCount, area])

  // Update snow animation
  useFrame((state, delta) => {
    if (snowRef.current) {
      const positions = snowRef.current.geometry.attributes.position.array as Float32Array

      for (let i = 0; i < particleCount; i++) {
        // Update position (falling with drift)
        positions[i * 3] += snowflakes.velocities[i * 3] * speed * delta * 5
        positions[i * 3 + 1] -= snowflakes.velocities[i * 3 + 1] * speed * delta * 5
        positions[i * 3 + 2] += snowflakes.velocities[i * 3 + 2] * speed * delta * 5

        // Add some wobble
        positions[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.02
        positions[i * 3 + 2] += Math.cos(state.clock.elapsedTime * 0.5 + i) * 0.02

        // Reset if below ground
        if (positions[i * 3 + 1] < -2) {
          positions[i * 3 + 1] = 30
          positions[i * 3] = (Math.random() - 0.5) * area
          positions[i * 3 + 2] = (Math.random() - 0.5) * area
        }

        // Reset if outside area
        if (Math.abs(positions[i * 3]) > area / 2 || Math.abs(positions[i * 3 + 2]) > area / 2) {
          positions[i * 3] = (Math.random() - 0.5) * area
          positions[i * 3 + 1] = 30
          positions[i * 3 + 2] = (Math.random() - 0.5) * area
        }
      }

      snowRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <points ref={snowRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={particleCount} array={snowflakes.positions} itemSize={3} />
        <bufferAttribute attach="attributes-size" count={particleCount} array={snowflakes.sizes} itemSize={1} />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={{
          color: { value: new THREE.Color(color) },
          pointTexture: { value: createSnowTexture() },
        }}
        vertexShader={`
          attribute float size;
          varying vec3 vColor;
          void main() {
            vColor = vec3(1.0, 1.0, 1.0);
            vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `}
        fragmentShader={`
          uniform vec3 color;
          uniform sampler2D pointTexture;
          varying vec3 vColor;
          void main() {
            gl_FragColor = vec4(color, ${opacity}) * texture2D(pointTexture, gl_PointCoord);
            if (gl_FragColor.a < 0.1) discard;
          }
        `}
      />
    </points>
  )
}

interface FogProps {
  color?: string
  density?: number
}

export function EnhancedFog({ color = "#88bdf8", density = 0.02 }: FogProps) {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.FogExp2(color, density)

    return () => {
      scene.fog = null
    }
  }, [scene, color, density])

  return null
}

// Helper function to create a raindrop texture
function createRainTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext("2d")

  if (ctx) {
    const gradient = ctx.createLinearGradient(0, 0, 0, 32)
    gradient.addColorStop(0, "rgba(255, 255, 255, 0)")
    gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.5)")
    gradient.addColorStop(1, "rgba(255, 255, 255, 1)")

    ctx.fillStyle = gradient
    ctx.beginPath()
    ctx.ellipse(16, 16, 2, 8, 0, 0, Math.PI * 2)
    ctx.fill()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Helper function to create a snowflake texture
function createSnowTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 32
  canvas.height = 32
  const ctx = canvas.getContext("2d")

  if (ctx) {
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.arc(16, 16, 8, 0, Math.PI * 2)
    ctx.fill()

    // Add some snowflake details
    ctx.strokeStyle = "rgba(200, 200, 255, 0.8)"
    ctx.lineWidth = 1

    // Draw snowflake arms
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2
      ctx.beginPath()
      ctx.moveTo(16, 16)
      ctx.lineTo(16 + Math.cos(angle) * 12, 16 + Math.sin(angle) * 12)
      ctx.stroke()

      // Draw small branches on each arm
      const midX = 16 + Math.cos(angle) * 6
      const midY = 16 + Math.sin(angle) * 6
      const perpAngle1 = angle + Math.PI / 3
      const perpAngle2 = angle - Math.PI / 3

      ctx.beginPath()
      ctx.moveTo(midX, midY)
      ctx.lineTo(midX + Math.cos(perpAngle1) * 4, midY + Math.sin(perpAngle1) * 4)
      ctx.stroke()

      ctx.beginPath()
      ctx.moveTo(midX, midY)
      ctx.lineTo(midX + Math.cos(perpAngle2) * 4, midY + Math.sin(perpAngle2) * 4)
      ctx.stroke()
    }
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Weather controller component
interface WeatherControllerProps {
  type: "none" | "rain" | "snow" | "fog"
  intensity?: "light" | "medium" | "heavy"
  lowDetail?: boolean
}

export default function WeatherController({
  type = "none",
  intensity = "medium",
  lowDetail = false,
}: WeatherControllerProps) {
  // Determine particle count based on intensity
  let particleCount = 1000
  let fogDensity = 0.02

  switch (intensity) {
    case "light":
      particleCount = 500
      fogDensity = 0.01
      break
    case "medium":
      particleCount = 1000
      fogDensity = 0.02
      break
    case "heavy":
      particleCount = 2000
      fogDensity = 0.04
      break
  }

  // Render appropriate weather effect
  switch (type) {
    case "rain":
      return <Rain count={particleCount} lowDetail={lowDetail} />
    case "snow":
      return <Snow count={particleCount} lowDetail={lowDetail} />
    case "fog":
      return <EnhancedFog density={fogDensity} />
    default:
      return null
  }
}
