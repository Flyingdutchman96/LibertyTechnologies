"use client"

import { useEffect } from "react"
import { useThree } from "@react-three/fiber"
import * as THREE from "three"
import { useDetectGPU } from "@react-three/drei"

interface ShadowSetupProps {
  enabled?: boolean
  quality?: "low" | "medium" | "high"
  mapSize?: number
  bias?: number
  normalBias?: number
}

export default function ShadowSetup({
  enabled = true,
  quality = "medium",
  mapSize = 2048,
  bias = -0.001,
  normalBias = 0.1,
}: ShadowSetupProps) {
  const { gl, scene, camera } = useThree()
  const gpuTier = useDetectGPU()

  useEffect(() => {
    if (!enabled) return

    // Adjust quality based on GPU tier
    if (gpuTier && gpuTier.tier < 2) {
      quality = "low"
    }

    // Set shadow map size based on quality
    switch (quality) {
      case "low":
        mapSize = 1024
        break
      case "medium":
        mapSize = 2048
        break
      case "high":
        mapSize = 4096
        break
    }

    // Configure renderer for shadows
    gl.shadowMap.enabled = true
    gl.shadowMap.type = THREE.PCFSoftShadowMap
    gl.shadowMap.autoUpdate = true

    // Configure scene for shadows
    scene.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true
        object.receiveShadow = true
      }

      if (object instanceof THREE.DirectionalLight || object instanceof THREE.SpotLight) {
        object.castShadow = true
        object.shadow.mapSize.width = mapSize
        object.shadow.mapSize.height = mapSize
        object.shadow.bias = bias
        object.shadow.normalBias = normalBias

        // Configure shadow camera
        if (object.shadow.camera instanceof THREE.OrthographicCamera) {
          const shadowCamera = object.shadow.camera as THREE.OrthographicCamera
          shadowCamera.left = -20
          shadowCamera.right = 20
          shadowCamera.top = 20
          shadowCamera.bottom = -20
          shadowCamera.near = 0.1
          shadowCamera.far = 50
        }

        if (object instanceof THREE.DirectionalLight) {
          object.shadow.camera.near = 0.1
          object.shadow.camera.far = 50
        }
      }
    })

    return () => {
      gl.shadowMap.enabled = false
    }
  }, [gl, scene, camera, enabled, quality, mapSize, bias, normalBias, gpuTier])

  return null
}
