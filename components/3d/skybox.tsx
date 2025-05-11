"use client"

import { useThree } from "@react-three/fiber"
import { CubeTextureLoader } from "three"
import { useEffect } from "react"

// Skybox component that loads a cubemap texture
export default function Skybox({
  urls = [
    "/textures/skybox/px.png", // right
    "/textures/skybox/nx.png", // left
    "/textures/skybox/py.png", // top
    "/textures/skybox/ny.png", // bottom
    "/textures/skybox/pz.png", // front
    "/textures/skybox/nz.png", // back
  ],
}) {
  const { scene } = useThree()

  useEffect(() => {
    const loader = new CubeTextureLoader()
    // Load the cubemap textures
    const cubeTexture = loader.load(urls)
    // Set the scene's background to the cubemap
    scene.background = cubeTexture

    // Clean up when component unmounts
    return () => {
      scene.background = null
      cubeTexture.dispose()
    }
  }, [scene, urls])

  // This component doesn't render anything directly
  return null
}
