"use client"

import { useEffect, useRef } from "react"
import { useThree } from "@react-three/fiber"
import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  DepthOfField,
  Noise,
  Vignette,
  SMAA,
  SSR,
  SSAO,
} from "@react-three/postprocessing"
import { BlendFunction, KernelSize } from "postprocessing"
import { useDetectGPU } from "@react-three/drei"

interface PostProcessingProps {
  enabled?: boolean
  preset?: "low" | "medium" | "high" | "ultra"
  bloom?: boolean
  bloomIntensity?: number
  chromaticAberration?: boolean
  depthOfField?: boolean
  noise?: boolean
  vignette?: boolean
  ssao?: boolean
  ssr?: boolean
}

export default function PostProcessing({
  enabled = true,
  preset = "medium",
  bloom = true,
  bloomIntensity = 0.5,
  chromaticAberration = true,
  depthOfField = true,
  noise = true,
  vignette = true,
  ssao = false,
  ssr = false,
}: PostProcessingProps) {
  const { gl, camera, scene } = useThree()
  const gpuTier = useDetectGPU()
  const composerRef = useRef<any>(null)

  // Adjust quality based on GPU tier
  useEffect(() => {
    if (gpuTier && gpuTier.tier < 2) {
      // Force low preset for low-end GPUs
      preset = "low"
    }
  }, [gpuTier, preset])

  // Apply preset settings
  useEffect(() => {
    switch (preset) {
      case "low":
        bloom = true
        bloomIntensity = 0.3
        chromaticAberration = false
        depthOfField = false
        noise = false
        vignette = true
        ssao = false
        ssr = false
        break
      case "medium":
        bloom = true
        bloomIntensity = 0.5
        chromaticAberration = true
        depthOfField = false
        noise = true
        vignette = true
        ssao = false
        ssr = false
        break
      case "high":
        bloom = true
        bloomIntensity = 0.7
        chromaticAberration = true
        depthOfField = true
        noise = true
        vignette = true
        ssao = true
        ssr = false
        break
      case "ultra":
        bloom = true
        bloomIntensity = 1.0
        chromaticAberration = true
        depthOfField = true
        noise = true
        vignette = true
        ssao = true
        ssr = true
        break
    }
  }, [preset])

  if (!enabled) return null

  return (
    <EffectComposer ref={composerRef} multisampling={0}>
      <SMAA />

      {bloom && (
        <Bloom
          intensity={bloomIntensity}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
          kernelSize={KernelSize.MEDIUM}
        />
      )}

      {chromaticAberration && (
        <ChromaticAberration
          offset={[0.001, 0.001]}
          blendFunction={BlendFunction.NORMAL}
          radialModulation={true}
          modulationOffset={0.5}
        />
      )}

      {depthOfField && <DepthOfField focusDistance={0.02} focalLength={0.5} bokehScale={6} />}

      {noise && <Noise opacity={0.02} blendFunction={BlendFunction.NORMAL} />}

      {vignette && <Vignette offset={0.5} darkness={0.5} blendFunction={BlendFunction.NORMAL} />}

      {ssao && <SSAO blendFunction={BlendFunction.MULTIPLY} samples={16} radius={10} intensity={20} />}

      {ssr && <SSR thickness={10} maxRoughness={0.9} blend={0.9} resolutionScale={0.5} maxDepthDifference={10} />}
    </EffectComposer>
  )
}
