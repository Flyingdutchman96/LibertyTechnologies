"use client"

import { useState, useEffect, createContext, useContext, type ReactNode } from "react"
import * as THREE from "three"

// Define the context type
interface MaterialLibraryContextType {
  textures: {
    [key: string]: THREE.Texture
  }
  materials: {
    [key: string]: THREE.Material
  }
  loaded: boolean
}

// Create the context
const MaterialLibraryContext = createContext<MaterialLibraryContextType | null>(null)

// Create a fallback texture
function createFallbackTexture(color = "#ffffff"): THREE.Texture {
  const canvas = document.createElement("canvas")
  canvas.width = 64
  canvas.height = 64
  const ctx = canvas.getContext("2d")
  if (ctx) {
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 64, 64)

    // Add a grid pattern
    ctx.strokeStyle = "#cccccc"
    ctx.lineWidth = 1
    ctx.beginPath()
    for (let i = 0; i < 64; i += 8) {
      ctx.moveTo(i, 0)
      ctx.lineTo(i, 64)
      ctx.moveTo(0, i)
      ctx.lineTo(64, i)
    }
    ctx.stroke()

    // Add a warning text
    ctx.fillStyle = "#ff0000"
    ctx.font = "10px Arial"
    ctx.fillText("Missing", 10, 30)
    ctx.fillText("Texture", 10, 42)
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.needsUpdate = true
  return texture
}

// Provider component
export function MaterialLibraryProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<MaterialLibraryContextType>({
    textures: {},
    materials: {},
    loaded: false,
  })

  useEffect(() => {
    // Create fallback textures
    const fallbackMetalTexture = createFallbackTexture("#888888")
    const fallbackPanelTexture = createFallbackTexture("#333333")
    const fallbackWarheadTexture = createFallbackTexture("#ff0000")

    // Load all textures
    const textureLoader = new THREE.TextureLoader()
    const loadTexture = (url: string, fallback: THREE.Texture): Promise<THREE.Texture> => {
      return new Promise((resolve) => {
        textureLoader.load(
          url,
          (texture) => {
            // Optimize texture
            texture.minFilter = THREE.LinearFilter
            texture.generateMipmaps = false
            resolve(texture)
          },
          undefined,
          () => {
            console.warn(`Failed to load texture: ${url}, using fallback`)
            resolve(fallback)
          },
        )
      })
    }

    // Load all textures in parallel
    Promise.all([
      loadTexture("/textures/metal.png", fallbackMetalTexture),
      loadTexture("/textures/panel.png", fallbackPanelTexture),
      loadTexture("/textures/warhead.png", fallbackWarheadTexture),
    ]).then(([metalMap, panelMap, warheadMap]) => {
      // Create materials
      const materials = {
        // Drone body materials
        droneMetal: new THREE.MeshStandardMaterial({
          color: "#3b82f6",
          metalness: 0.8,
          roughness: 0.2,
          map: metalMap,
        }),
        dronePanel: new THREE.MeshStandardMaterial({
          color: "#0f172a",
          metalness: 0.9,
          roughness: 0.1,
          emissive: "#3b82f6",
          emissiveIntensity: 0.1,
          map: panelMap,
        }),
        ghostMetal: new THREE.MeshStandardMaterial({
          color: "#1e293b",
          metalness: 0.9,
          roughness: 0.1,
          map: metalMap,
        }),
        warhead: new THREE.MeshStandardMaterial({
          color: "#ef4444",
          metalness: 0.7,
          roughness: 0.3,
          map: warheadMap,
        }),
      }

      // Update state
      setState({
        textures: {
          metalMap,
          panelMap,
          warheadMap,
        },
        materials,
        loaded: true,
      })
    })
  }, [])

  return <MaterialLibraryContext.Provider value={state}>{children}</MaterialLibraryContext.Provider>
}

// Hook to use the material library
export function useMaterialLibrary() {
  const context = useContext(MaterialLibraryContext)
  if (!context) {
    throw new Error("useMaterialLibrary must be used within a MaterialLibraryProvider")
  }
  return context
}
