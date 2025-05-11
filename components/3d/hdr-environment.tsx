"use client"

import { useRef, useEffect, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Environment, Sphere, useEnvironment } from "@react-three/drei"
import * as THREE from "three"

interface HDREnvironmentProps {
  path?: string
  files?: string[]
  preset?: "apartment" | "city" | "dawn" | "forest" | "lobby" | "night" | "park" | "studio" | "sunset" | "warehouse"
  background?: boolean
  rotation?: number
  intensity?: number
  enableRotation?: boolean
  rotationSpeed?: number
  enableAtmosphere?: boolean
  atmosphereColor?: string
  atmosphereIntensity?: number
}

export default function HDREnvironment({
  path,
  files,
  preset = "night",
  background = true,
  rotation = 0,
  intensity = 1,
  enableRotation = true,
  rotationSpeed = 0.05,
  enableAtmosphere = true,
  atmosphereColor = "#60a5fa",
  atmosphereIntensity = 0.2,
}: HDREnvironmentProps) {
  const groupRef = useRef<THREE.Group>(null)
  const { scene } = useThree()

  // Load environment map if path and files are provided
  const [envMap, setEnvMap] = useState<THREE.Texture | THREE.CubeTexture | null>(null)

  useEffect(() => {
    if (path && files) {
      useEnvironment.preload({ files, path }).then((loadedEnvMap) => {
        setEnvMap(loadedEnvMap)
      })
    } else {
      setEnvMap(null)
    }
  }, [path, files])

  // Handle rotation animation
  useFrame((state) => {
    if (enableRotation && groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * rotationSpeed
    }
  })

  // Set scene background and environment
  useEffect(() => {
    if (envMap && background) {
      scene.background = envMap
    }
    return () => {
      if (background) {
        scene.background = null
      }
    }
  }, [envMap, scene, background])

  return (
    <group ref={groupRef}>
      {/* Use Environment component for preset environments */}
      {!path && (
        <Environment
          preset={preset}
          background={background}
          rotation={[0, rotation, 0]}
          scene={undefined}
          intensity={intensity}
        />
      )}

      {/* Use custom environment map if provided */}
      {path && files && envMap && <primitive object={envMap} attach="environment" scene={undefined} />}

      {/* Atmospheric effects */}
      {enableAtmosphere && (
        <>
          {/* Atmospheric glow sphere */}
          <Sphere args={[100, 64, 64]}>
            <meshBasicMaterial
              color={atmosphereColor}
              transparent
              opacity={0.05 * atmosphereIntensity}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </Sphere>

          {/* Inner atmospheric glow */}
          <Sphere args={[80, 64, 64]}>
            <meshBasicMaterial
              color={atmosphereColor}
              transparent
              opacity={0.03 * atmosphereIntensity}
              side={THREE.BackSide}
              depthWrite={false}
            />
          </Sphere>

          {/* Volumetric light rays */}
          <directionalLight position={[10, 20, 10]} intensity={0.8 * atmosphereIntensity} color={atmosphereColor} />
        </>
      )}
    </group>
  )
}
