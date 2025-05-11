"use client"

import React from "react"

import { useState, useRef, useEffect, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  useDetectGPU,
  Stats,
  Float,
  ContactShadows,
  BakeShadows,
  SoftShadows,
} from "@react-three/drei"
import * as THREE from "three"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  RefreshCw,
  Sun,
  Moon,
  Cloud,
  CloudSnow,
  CloudRain,
  Droplets,
  Sparkles,
  Layers,
} from "lucide-react"
import EnhancedSentinelLiberator from "@/components/3d/enhanced-sentinel-liberator"
import EnhancedGhostViper from "@/components/3d/enhanced-ghost-viper"
import HDREnvironment from "@/components/3d/hdr-environment"
import ParticleField from "@/components/3d/particle-field"
import { MaterialLibraryProvider } from "@/components/3d/material-library"
import PostProcessing from "@/components/3d/post-processing"
import WeatherController from "@/components/3d/weather-effects"
import ShadowSetup from "@/components/3d/shadow-setup"

// Performance monitor component
function PerformanceMonitor({ showStats = false }) {
  const gpuTier = useDetectGPU()
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  useEffect(() => {
    // Determine if we should use low detail mode based on GPU tier
    if (gpuTier && gpuTier.tier < 2) {
      setIsLowPerformance(true)
    }
  }, [gpuTier])

  return (
    <>
      {showStats && <Stats />}
      {isLowPerformance && (
        <Html position={[0, -2, 0]} center>
          <div className="bg-red-900/80 text-white text-xs px-2 py-1 rounded">Low performance mode active</div>
        </Html>
      )}
    </>
  )
}

// Level of Detail controller - fixed to handle null children
function LODController({ children }) {
  const { camera } = useThree()
  const [lowDetail, setLowDetail] = useState(false)

  useFrame(() => {
    // Check camera distance and set detail level
    const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
    setLowDetail(distance > 20)
  })

  // Clone children with lowDetail prop, handling null children
  return (
    <>
      {React.Children.map(children, (child) => {
        // Skip null or undefined children
        if (!child) return null
        // Clone with props for valid React elements
        return React.isValidElement(child) ? React.cloneElement(child, { lowDetail }) : child
      })}
    </>
  )
}

// Mission phases
const MISSION_PHASES = [
  {
    id: "surveillance",
    name: "Surveillance",
    description: "Sentinel Liberator™ conducts high-altitude reconnaissance of the area of operations.",
    duration: 10,
  },
  {
    id: "detection",
    name: "Target Detection",
    description: "Advanced sensors identify potential targets and begin tracking.",
    duration: 8,
  },
  {
    id: "classification",
    name: "Target Classification",
    description: "AI systems classify targets and determine threat levels.",
    duration: 6,
  },
  {
    id: "decision",
    name: "Decision Making",
    description: "Autonomous systems select priority targets and plan strike approach.",
    duration: 5,
  },
  {
    id: "deployment",
    name: "GhostViper™ Deployment",
    description: "Strike drones are deployed from launch platforms.",
    duration: 7,
  },
  {
    id: "approach",
    name: "Target Approach",
    description: "GhostViper™ units navigate to target area using terrain masking.",
    duration: 10,
  },
  {
    id: "strike",
    name: "Precision Strike",
    description: "Coordinated attack on designated targets with minimal collateral damage.",
    duration: 5,
  },
  {
    id: "assessment",
    name: "Battle Damage Assessment",
    description: "Sentinel Liberator™ confirms target neutralization and assesses results.",
    duration: 8,
  },
]

// Total duration of all phases
const TOTAL_DURATION = MISSION_PHASES.reduce((acc, phase) => acc + phase.duration, 0)

// Enhanced Terrain component with more detail
function EnhancedTerrain({ lowDetail = false }) {
  // Determine detail level based on performance
  const resolution = lowDetail ? 32 : 128
  const size = 100
  const meshRef = useRef(null)

  // Animate terrain subtly
  useFrame(({ clock }) => {
    if (meshRef.current && meshRef.current.material) {
      meshRef.current.material.uniforms.uTime.value = clock.getElapsedTime() * 0.1
    }
  })

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
      <planeGeometry args={[size, size, resolution, resolution]} />
      <shaderMaterial
        uniforms={{
          uColor1: { value: new THREE.Color("#234b6e") },
          uColor2: { value: new THREE.Color("#172554") },
          uTime: { value: 0 },
        }}
        vertexShader={`
          uniform float uTime;
          varying vec2 vUv;
          varying float vElevation;

          // Improved Perlin noise function
          vec4 permute(vec4 x) {
            return mod(((x*34.0)+1.0)*x, 289.0);
          }
          vec4 taylorInvSqrt(vec4 r) {
            return 1.79284291400159 - 0.85373472095314 * r;
          }
          vec3 fade(vec3 t) {
            return t*t*t*(t*(t*6.0-15.0)+10.0);
          }

          float cnoise(vec3 P) {
            vec3 Pi0 = floor(P);
            vec3 Pi1 = Pi0 + vec3(1.0);
            Pi0 = mod(Pi0, 289.0);
            Pi1 = mod(Pi1, 289.0);
            vec3 Pf0 = fract(P);
            vec3 Pf1 = Pf0 - vec3(1.0);
            vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
            vec4 iy = vec4(Pi0.yy, Pi1.yy);
            vec4 iz0 = Pi0.zzzz;
            vec4 iz1 = Pi1.zzzz;

            vec4 ixy = permute(permute(ix) + iy);
            vec4 ixy0 = permute(ixy + iz0);
            vec4 ixy1 = permute(ixy + iz1);

            vec4 gx0 = ixy0 / 7.0;
            vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
            gx0 = fract(gx0);
            vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
            vec4 sz0 = step(gz0, vec4(0.0));
            gx0 -= sz0 * (step(0.0, gx0) - 0.5);
            gy0 -= sz0 * (step(0.0, gy0) - 0.5);

            vec4 gx1 = ixy1 / 7.0;
            vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
            gx1 = fract(gx1);
            vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
            vec4 sz1 = step(gz1, vec4(0.0));
            gx1 -= sz1 * (step(0.0, gx1) - 0.5);
            gy1 -= sz1 * (step(0.0, gy1) - 0.5);

            vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
            vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
            vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
            vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
            vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
            vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
            vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
            vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

            vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
            g000 *= norm0.x;
            g010 *= norm0.y;
            g100 *= norm0.z;
            g110 *= norm0.w;
            vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
            g001 *= norm1.x;
            g011 *= norm1.y;
            g101 *= norm1.z;
            g111 *= norm1.w;

            float n000 = dot(g000, Pf0);
            float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
            float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
            float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
            float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
            float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
            float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
            float n111 = dot(g111, Pf1);

            vec3 fade_xyz = fade(Pf0);
            vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
            vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
            float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
            return 2.2 * n_xyz;
          }

          void main() {
            vUv = uv;
            
            // Create multi-layered terrain with different frequencies
            float elevation = 0.0;
            
            // Large features
            elevation += cnoise(vec3(position.x * 0.02, position.z * 0.02, uTime * 0.1)) * 2.0;
            
            // Medium features
            elevation += cnoise(vec3(position.x * 0.04, position.z * 0.04, uTime * 0.2)) * 1.0;
            
            // Small features
            elevation += cnoise(vec3(position.x * 0.08, position.z * 0.08, uTime * 0.3)) * 0.5;
            
            // Micro details
            elevation += cnoise(vec3(position.x * 0.16, position.z * 0.16, uTime * 0.4)) * 0.25;
            
            // Apply elevation
            vec3 newPosition = position;
            newPosition.y += elevation;
            
            vElevation = elevation;
            
            gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;
          varying float vElevation;
          
          void main() {
            // Blend between colors based on elevation
            float mixStrength = smoothstep(-1.0, 1.0, vElevation);
            vec3 color = mix(uColor1, uColor2, mixStrength);
            
            // Add some shading based on elevation
            float shading = smoothstep(-2.0, 2.0, vElevation) * 0.5 + 0.5;
            color *= shading;
            
            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  )
}

// Optimized Target component
function EnhancedTarget({
  position,
  isActive,
  isDestroyed,
  lowDetail = false,
}: {
  position: [number, number, number]
  isActive: boolean
  isDestroyed: boolean
  lowDetail?: boolean
}) {
  const meshRef = useRef(null)
  const glowRef = useRef(null)

  // Animate target
  useFrame(({ clock }) => {
    if (meshRef.current && isActive && !isDestroyed) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.5

      // Pulse effect for active targets
      if (glowRef.current) {
        const pulse = Math.sin(clock.getElapsedTime() * 3) * 0.1 + 1
        glowRef.current.scale.set(pulse, pulse, pulse)
      }
    }
  })

  // Determine geometry detail level
  const segments = lowDetail ? 8 : 16

  return (
    <group position={position}>
      {isDestroyed ? (
        // Destroyed target - enhanced with debris and effects
        <>
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0, 1.5, 0.2, segments]} />
            <meshStandardMaterial color="#ef4444" emissive="#ef4444" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[1.5, 1.5, 0.1, segments]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>

          {/* Debris particles */}
          {!lowDetail && (
            <group>
              {Array.from({ length: 10 }).map((_, i) => (
                <mesh
                  key={`debris-${i}`}
                  position={[(Math.random() - 0.5) * 3, Math.random() * 2, (Math.random() - 0.5) * 3]}
                  rotation={[Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI]}
                  scale={[0.2, 0.2, 0.2]}
                  castShadow
                >
                  <boxGeometry />
                  <meshStandardMaterial color="#ef4444" />
                </mesh>
              ))}
            </group>
          )}

          {/* Smoke effect */}
          {!lowDetail && (
            <mesh position={[0, 1, 0]}>
              <sphereGeometry args={[1.2, segments, segments]} />
              <meshStandardMaterial color="#333333" transparent opacity={0.4} depthWrite={false} />
            </mesh>
          )}
        </>
      ) : (
        // Active or inactive target - enhanced with details and effects
        <>
          <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5} enabled={isActive}>
            <group ref={meshRef}>
              {/* Main body */}
              <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
                <boxGeometry args={[1, 1, 2.5, 1, 1, 1]} />
                <meshStandardMaterial color={isActive ? "#ef4444" : "#475569"} metalness={0.7} roughness={0.3} />
              </mesh>

              {/* Turret */}
              <mesh position={[0, 1.3, 0]} castShadow receiveShadow>
                <cylinderGeometry args={[0.3, 0.3, 0.6, segments / 2]} />
                <meshStandardMaterial color={isActive ? "#ef4444" : "#475569"} metalness={0.8} roughness={0.2} />
              </mesh>

              {/* Gun barrel */}
              <mesh position={[0, 1.3, 0.5]} rotation={[0, 0, Math.PI / 2]} castShadow receiveShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
                <meshStandardMaterial color="#333333" />
              </mesh>

              {/* Tracks */}
              <mesh position={[0, 0, 0.8]} castShadow receiveShadow>
                <boxGeometry args={[1.2, 0.3, 0.2]} />
                <meshStandardMaterial color="#333333" />
              </mesh>
              <mesh position={[0, 0, -0.8]} castShadow receiveShadow>
                <boxGeometry args={[1.2, 0.3, 0.2]} />
                <meshStandardMaterial color="#333333" />
              </mesh>
            </group>
          </Float>

          {/* Target glow effect when active */}
          {isActive && !lowDetail && (
            <mesh ref={glowRef} position={[0, 0.5, 0]}>
              <sphereGeometry args={[1.5, segments, segments]} />
              <meshBasicMaterial color="#ef4444" transparent opacity={0.15} depthWrite={false} />
            </mesh>
          )}

          {isActive && (
            <Html position={[0, 2.5, 0]} center>
              <Badge className="bg-red-600 animate-pulse">Target Locked</Badge>
            </Html>
          )}
        </>
      )}
    </group>
  )
}

// Optimized Explosion effect
function EnhancedExplosion({
  position,
  visible,
  lowDetail = false,
}: {
  position: [number, number, number]
  visible: boolean
  lowDetail?: boolean
}) {
  const coreRef = useRef(null)
  const outerRef = useRef(null)
  const [scale, setScale] = useState(0.1)
  const [particles, setParticles] = useState<
    { pos: [number, number, number]; scale: number; rot: [number, number, number] }[]
  >([])

  useEffect(() => {
    if (visible) {
      setScale(0.1)

      // Generate random particles for explosion
      if (!lowDetail) {
        const newParticles = []
        for (let i = 0; i < 20; i++) {
          newParticles.push({
            pos: [(Math.random() - 0.5) * 2, Math.random() * 2, (Math.random() - 0.5) * 2] as [number, number, number],
            scale: Math.random() * 0.3 + 0.1,
            rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
              number,
              number,
              number,
            ],
          })
        }
        setParticles(newParticles)
      }
    }
  }, [visible, lowDetail])

  // Enhanced explosion animation
  useFrame(() => {
    if (visible) {
      if (coreRef.current && outerRef.current) {
        if (scale < 3) {
          const newScale = scale * 1.2
          setScale(newScale)
          coreRef.current.scale.set(newScale, newScale, newScale)
          outerRef.current.scale.set(newScale * 1.5, newScale * 1.5, newScale * 1.5)
        }
      }
    }
  })

  if (!visible) return null

  // Determine geometry detail level
  const segments = lowDetail ? 8 : 16

  return (
    <group position={position}>
      {/* Core explosion */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[1, segments, segments]} />
        <meshBasicMaterial
          color="#ff7b00"
          emissive="#ff7b00"
          emissiveIntensity={2}
          transparent
          opacity={1 - scale / 3}
        />
      </mesh>

      {/* Outer explosion */}
      <mesh ref={outerRef}>
        <sphereGeometry args={[1, segments, segments]} />
        <meshBasicMaterial
          color="#ef4444"
          emissive="#ef4444"
          emissiveIntensity={1}
          transparent
          opacity={0.7 - scale / 4}
        />
      </mesh>

      {/* Explosion particles */}
      {!lowDetail &&
        particles.map((particle, i) => (
          <mesh
            key={`particle-${i}`}
            position={particle.pos}
            rotation={particle.rot}
            scale={[particle.scale, particle.scale, particle.scale]}
          >
            <boxGeometry />
            <meshBasicMaterial color="#ff7b00" />
          </mesh>
        ))}

      {/* Explosion light */}
      <pointLight color="#ff7b00" intensity={10 * (1 - scale / 3)} distance={10} decay={2} />
    </group>
  )
}

// Optimized Scanning effect
function EnhancedScanningEffect({
  position,
  visible,
  lowDetail = false,
}: {
  position: [number, number, number]
  visible: boolean
  lowDetail?: boolean
}) {
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const [radius, setRadius] = useState(0.5)

  useEffect(() => {
    if (visible) {
      setRadius(0.5)
    }
  }, [visible])

  // Enhanced scanning animation
  useFrame(({ clock }) => {
    if (visible && ringRef.current) {
      if (radius < 15) {
        const newRadius = radius * 1.05
        setRadius(newRadius)
        ringRef.current.scale.set(newRadius, 1, newRadius)

        // Add pulsing effect to glow
        if (glowRef.current && glowRef.current.material) {
          const pulse = Math.sin(clock.getElapsedTime() * 5) * 0.2 + 0.8
          glowRef.current.material.opacity = pulse * (1 - radius / 15)
        }
      } else {
        setRadius(0.5)
      }
    }
  })

  if (!visible || lowDetail) return null

  // Determine geometry detail level
  const segments = 32

  return (
    <group position={position}>
      {/* Main scanning ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[0.9, 1, segments]} />
        <meshBasicMaterial
          color="#60a5fa"
          emissive="#60a5fa"
          emissiveIntensity={1}
          transparent
          opacity={1 - radius / 15}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Scanning glow */}
      <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[0.8, 1.1, segments]} />
        <meshBasicMaterial color="#60a5fa" transparent opacity={0.5} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>

      {/* Scanning light */}
      <pointLight color="#60a5fa" intensity={2 * (1 - radius / 15)} distance={5} decay={2} />
    </group>
  )
}

// Animation controller
function AnimationController({
  progress,
  setProgress,
  isPlaying,
  setIsPlaying,
  resetSimulation,
  currentPhase,
}: {
  progress: number
  setProgress: (value: number) => void
  isPlaying: boolean
  setIsPlaying: (value: boolean) => void
  resetSimulation: () => void
  currentPhase: number
}) {
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    resetSimulation()
  }

  const handleStepForward = () => {
    const nextPhase = Math.min(MISSION_PHASES.length - 1, currentPhase + 1)
    const phaseStartProgress = MISSION_PHASES.slice(0, nextPhase).reduce((acc, phase) => acc + phase.duration, 0)
    setProgress((phaseStartProgress / TOTAL_DURATION) * 100)
  }

  const handleStepBack = () => {
    const prevPhase = Math.max(0, currentPhase - 1)
    const phaseStartProgress = MISSION_PHASES.slice(0, prevPhase).reduce((acc, phase) => acc + phase.duration, 0)
    setProgress((phaseStartProgress / TOTAL_DURATION) * 100)
  }

  return (
    <div className="flex flex-col space-y-4 w-full">
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handleStepBack}
            disabled={currentPhase === 0}
            className="bg-navy-800/80 border-gray-700 h-8 w-8"
          >
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePlayPause}
            className="bg-navy-800/80 border-gray-700 h-8 w-8"
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleStepForward}
            disabled={currentPhase === MISSION_PHASES.length - 1}
            className="bg-navy-800/80 border-gray-700 h-8 w-8"
          >
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>
        <Button variant="outline" size="sm" onClick={handleReset} className="bg-navy-800/80 border-gray-700">
          <RefreshCw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
      <div className="w-full">
        <Slider value={[progress]} min={0} max={100} step={0.1} onValueChange={(value) => setProgress(value[0])} />
      </div>
      <div className="grid grid-cols-8 gap-1">
        {MISSION_PHASES.map((phase, index) => (
          <div
            key={phase.id}
            className={`h-1 rounded-full transition-colors ${index <= currentPhase ? "bg-blue-500" : "bg-gray-700"}`}
          ></div>
        ))}
      </div>
    </div>
  )
}

// Scene content component with camera reset logic
function SceneContent({
  currentPhase,
  targetPositions,
  sentinelPosition,
  sentinelRotation,
  ghostViperPositions,
  ghostViperRotations,
  targetActive,
  targetDestroyed,
  showExplosion,
  showScanning,
  resetView,
}) {
  const { camera } = useThree()

  // Reset camera view when resetView changes
  useEffect(() => {
    if (resetView) {
      camera.position.set(0, 10, 30)
      camera.lookAt(0, 0, 0)
    }
  }, [resetView, camera])

  return (
    <>
      {/* Enhanced Terrain */}
      <EnhancedTerrain />

      {/* Sentinel Liberator */}
      <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
        <EnhancedSentinelLiberator
          position={[sentinelPosition[0], sentinelPosition[1], sentinelPosition[2]]}
          rotation={[sentinelRotation[0], sentinelRotation[1], sentinelRotation[2]]}
        />
      </Float>

      {/* GhostViper drones */}
      {ghostViperPositions.map((position, index) => (
        <Float key={`ghostviper-${index}`} speed={1} rotationIntensity={0.2} floatIntensity={0.3}>
          <EnhancedGhostViper
            position={[position[0], position[1], position[2]]}
            rotation={[ghostViperRotations[index][0], ghostViperRotations[index][1], ghostViperRotations[index][2]]}
          />
        </Float>
      ))}

      {/* Enhanced Targets */}
      <EnhancedTarget position={targetPositions[0]} isActive={targetActive} isDestroyed={targetDestroyed} />

      {/* Enhanced Effects */}
      <EnhancedExplosion position={targetPositions[0]} visible={showExplosion} />
      <EnhancedScanningEffect position={[targetPositions[0][0], 0.1, targetPositions[0][2]]} visible={showScanning} />
    </>
  )
}

// Optimized SceneController component
function EnhancedSceneController({
  currentPhase,
  targetPositions,
  setSentinelPosition,
  setSentinelRotation,
  setGhostViperPositions,
  setGhostViperRotations,
  setTargetActive,
  setTargetDestroyed,
  setShowExplosion,
  setShowScanning,
  lowDetail = false,
}: {
  currentPhase: number
  targetPositions: [number, number, number][]
  setSentinelPosition: (position: [number, number, number]) => void
  setSentinelRotation: (rotation: [number, number, number]) => void
  setGhostViperPositions: (positions: [number, number, number][]) => void
  setGhostViperRotations: (rotations: [number, number, number][]) => void
  setTargetActive: (active: boolean) => void
  setTargetDestroyed: (destroyed: boolean) => void
  setShowExplosion: (show: boolean) => void
  setShowScanning: (show: boolean) => void
  lowDetail?: boolean
}) {
  // Reduce animation frame rate for better performance
  const frameSkip = lowDetail ? 2 : 1
  const frameCount = useRef(0)

  // Animation timing helpers
  const lastTime = useRef(0)
  const animationProgress = useRef(0)

  // Easing functions for smoother animations
  const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t)
  const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

  useFrame(({ clock }) => {
    // Skip frames for better performance
    frameCount.current += 1
    if (frameCount.current % frameSkip !== 0) return

    // Calculate delta time for smooth animations
    const time = clock.getElapsedTime()
    const deltaTime = time - lastTime.current
    lastTime.current = time

    // Update animation progress
    animationProgress.current += deltaTime * 0.5
    if (animationProgress.current > 1) animationProgress.current = 1

    // Create temporary variables to hold new positions and rotations
    let newSentinelPosition: [number, number, number] = [0, 0, 0]
    let newSentinelRotation: [number, number, number] = [0, 0, 0]
    let newGhostViperPositions: [number, number, number][] = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    let newGhostViperRotations: [number, number, number][] = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]

    // Phase-specific animations with improved easing and timing
    switch (currentPhase) {
      case 0: // Surveillance
        // Smooth circular path with slight altitude variations
        const surveillanceAngle = time * 0.3
        newSentinelPosition = [
          Math.sin(surveillanceAngle) * 5,
          15 + Math.sin(time * 0.5) * 0.5, // Slight altitude variation
          Math.cos(surveillanceAngle) * 5,
        ]

        // Smooth rotation to face direction of travel
        newSentinelRotation = [
          Math.sin(time * 0.2) * 0.05, // Slight pitch variation
          surveillanceAngle + Math.PI / 2, // Face perpendicular to travel direction
          Math.sin(time * 0.3) * 0.05, // Slight roll variation
        ]

        if (!showScanning && !lowDetail) setShowScanning(true)
        break

      case 1: // Target Detection
        // Wider scanning pattern
        const detectionAngle = time * 0.2
        const detectionRadius = 8 + Math.sin(time * 0.1) * 1 // Variable radius

        newSentinelPosition = [
          Math.sin(detectionAngle) * detectionRadius,
          15 + Math.sin(time * 0.3) * 0.8,
          Math.cos(detectionAngle) * detectionRadius,
        ]

        // Smooth look-at behavior toward target
        const targetDirX = targetPositions[0][0] - newSentinelPosition[0]
        const targetDirY = targetPositions[0][1] - newSentinelPosition[1]
        const targetDirZ = targetPositions[0][2] - newSentinelPosition[2]
        const targetDirLength = Math.sqrt(targetDirX * targetDirX + targetDirY * targetDirY + targetDirZ * targetDirZ)

        newSentinelRotation = [
          -Math.asin(targetDirY / targetDirLength), // Pitch to look at target
          Math.atan2(targetDirX, targetDirZ), // Yaw to face target
          Math.sin(time * 0.4) * 0.03, // Slight roll for realism
        ]

        if (!showScanning && !lowDetail) setShowScanning(true)
        break

      case 2: // Target Classification
        // Hover in position with slight movements
        newSentinelPosition = [
          5 + Math.sin(time * 0.5) * 0.2,
          15 + Math.sin(time * 0.7) * 0.3,
          5 + Math.cos(time * 0.6) * 0.2,
        ]

        // Keep focused on target with slight scanning movements
        const classificationTargetDirX = targetPositions[0][0] - newSentinelPosition[0]
        const classificationTargetDirY = targetPositions[0][1] - newSentinelPosition[1]
        const classificationTargetDirZ = targetPositions[0][2] - newSentinelPosition[2]
        const classificationTargetDirLength = Math.sqrt(
          classificationTargetDirX * classificationTargetDirX +
            classificationTargetDirY * classificationTargetDirY +
            classificationTargetDirZ * classificationTargetDirZ,
        )

        newSentinelRotation = [
          -Math.asin(classificationTargetDirY / classificationTargetDirLength) + Math.sin(time * 2) * 0.02, // Scanning movements
          Math.atan2(classificationTargetDirX, classificationTargetDirZ) + Math.sin(time * 1.5) * 0.02,
          Math.sin(time * 0.8) * 0.02,
        ]

        if (!targetActive) setTargetActive(true)
        if (showScanning) setShowScanning(false)
        break

      case 3: // Decision Making
        // Sentinel maintains position with slight movements
        newSentinelPosition = [
          5 + Math.sin(time * 0.3) * 0.3,
          15 + Math.sin(time * 0.4) * 0.2,
          5 + Math.cos(time * 0.5) * 0.3,
        ]

        // More intense scanning movements
        const decisionTargetDirX = targetPositions[0][0] - newSentinelPosition[0]
        const decisionTargetDirY = targetPositions[0][1] - newSentinelPosition[1]
        const decisionTargetDirZ = targetPositions[0][2] - newSentinelPosition[2]
        const decisionTargetDirLength = Math.sqrt(
          decisionTargetDirX * decisionTargetDirX +
            decisionTargetDirY * decisionTargetDirY +
            decisionTargetDirZ * decisionTargetDirZ,
        )

        newSentinelRotation = [
          -Math.asin(decisionTargetDirY / decisionTargetDirLength) + Math.sin(time * 3) * 0.03,
          Math.atan2(decisionTargetDirX, decisionTargetDirZ) + Math.sin(time * 2.5) * 0.03,
          Math.sin(time * 1.2) * 0.03,
        ]
        break

      case 4: // GhostViper Deployment
        // Move GhostVipers from base toward target with formation
        newGhostViperPositions = [
          [-20, 1, -20],
          [-19, 1, -18],
          [-21, 1, -19],
        ].map((pos, index) => {
          // Calculate target position with formation offset
          const formationOffset = index - 1
          const targetX = -15 + formationOffset * 2
          const targetZ = -15 + formationOffset * 2

          // Use easing for smooth acceleration
          const progress = Math.min(animationProgress.current * 2, 1)
          const easedProgress = easeInOut(progress)

          const newX = pos[0] + (targetX - pos[0]) * easedProgress * 0.05
          const newZ = pos[2] + (targetZ - pos[2]) * easedProgress * 0.05
          const newY = 1 + Math.sin(time * 0.5 + index) * 0.3 + index * 0.2 // Staggered heights

          return [newX, newY, newZ] as [number, number, number]
        })

        newGhostViperRotations = newGhostViperPositions.map((pos, index) => {
          // Calculate direction to target for rotation
          const dirX = targetPositions[0][0] - pos[0]
          const dirZ = targetPositions[0][2] - pos[2]
          const dirLength = Math.sqrt(dirX * dirX + dirZ * dirZ)

          return [
            Math.sin(time * 0.8 + index) * 0.1, // Pitch variation
            Math.atan2(dirX, dirZ), // Yaw toward target
            Math.sin(time * 0.6 + index) * 0.1, // Roll variation
          ] as [number, number, number]
        })
        break

      case 5: // Target Approach
        // GhostVipers approach target in formation with more realistic flight patterns
        newGhostViperPositions = [
          [-15, 1, -15],
          [-13, 1, -13],
          [-17, 1, -17],
        ].map((pos, index) => {
          // Calculate target position with tactical formation
          const angle = (index / 3) * Math.PI * 2
          const formationRadius = 3
          const targetX = targetPositions[0][0] + Math.cos(angle) * formationRadius
          const targetZ = targetPositions[0][2] + Math.sin(angle) * formationRadius

          // Use easing for smooth approach
          const progress = Math.min(animationProgress.current * 1.5, 1)
          const easedProgress = easeOut(progress)

          // Add some randomness and realistic flight patterns
          const wobble = Math.sin(time * (1 + index * 0.1) + index * 10) * 0.3
          const newX = pos[0] + (targetX - pos[0]) * easedProgress * 0.03
          const newZ = pos[2] + (targetZ - pos[2]) * easedProgress * 0.03
          const newY = 1 + Math.sin(time * 0.8 + index * 2) * 0.4 + wobble

          return [newX, newY, newZ] as [number, number, number]
        })

        newGhostViperRotations = newGhostViperPositions.map((pos, index) => {
          // Calculate target position with tactical formation
          const angle = (index / 3) * Math.PI * 2
          const formationRadius = 3
          const targetX = targetPositions[0][0] + Math.cos(angle) * formationRadius
          const targetZ = targetPositions[0][2] + Math.sin(angle) * formationRadius

          // Calculate direction to target for rotation with lead
          const dirX = targetX - pos[0]
          const dirZ = targetZ - pos[2]
          const dirLength = Math.sqrt(dirX * dirX + dirZ * dirZ)

          return [
            Math.sin(time * 1.2 + index) * 0.15, // More aggressive pitch
            Math.atan2(dirX, dirZ) + Math.sin(time * 0.3 + index) * 0.1, // Yaw with slight wobble
            Math.sin(time * 0.9 + index * 2) * 0.15, // More aggressive roll
          ] as [number, number, number]
        })
        break

      case 6: // Precision Strike
        // GhostVipers converge on target with aggressive approach
        newGhostViperPositions = newGhostViperPositions.map((pos, index) => {
          // Direct approach to target
          const progress = Math.min(animationProgress.current * 3, 1)
          const easedProgress = easeOut(progress) // Accelerating approach

          const newX = pos[0] + (targetPositions[0][0] - pos[0]) * easedProgress * 0.2
          const newZ = pos[2] + (targetPositions[0][2] - pos[2]) * easedProgress * 0.2
          const newY = pos[1] + (targetPositions[0][1] - pos[1] + 0.5) * easedProgress * 0.2

          return [newX, newY, newZ] as [number, number, number]
        })

        newGhostViperRotations = newGhostViperPositions.map((pos, index) => {
          // Aggressive diving rotation
          const dirX = targetPositions[0][0] - pos[0]
          const dirY = targetPositions[0][1] - pos[1]
          const dirZ = targetPositions[0][2] - pos[2]
          const dirLength = Math.sqrt(dirX * dirX + dirY * dirY + dirZ * dirZ)

          return [
            -Math.asin(dirY / dirLength) * 1.2, // Exaggerated pitch for diving
            Math.atan2(dirX, dirZ),
            Math.sin(time * 2 + index) * 0.2, // Aggressive roll
          ] as [number, number, number]
        })

        // If close to target, trigger explosion
        const closeToTarget = newGhostViperPositions.some(
          (pos) => Math.abs(pos[0] - targetPositions[0][0]) < 0.5 && Math.abs(pos[2] - targetPositions[0][2]) < 0.5,
        )

        if (closeToTarget && !targetDestroyed && !showExplosion) {
          setShowExplosion(true)
          setTimeout(() => {
            setTargetDestroyed(true)
            setShowExplosion(false)
          }, 800) // Longer explosion for more impact
        }
        break

      case 7: // Battle Damage Assessment
        // Sentinel performs assessment pattern around destroyed target
        const assessmentAngle = time * 0.4
        const assessmentRadius = 8

        newSentinelPosition = [
          targetPositions[0][0] + Math.sin(assessmentAngle) * assessmentRadius,
          15 + Math.sin(time * 0.2) * 1, // Varying altitude
          targetPositions[0][2] + Math.cos(assessmentAngle) * assessmentRadius,
        ]

        // Look at target with scanning movements
        const assessmentTargetDirX = targetPositions[0][0] - newSentinelPosition[0]
        const assessmentTargetDirY = targetPositions[0][1] - newSentinelPosition[1]
        const assessmentTargetDirZ = targetPositions[0][2] - newSentinelPosition[2]
        const assessmentTargetDirLength = Math.sqrt(
          assessmentTargetDirX * assessmentTargetDirX +
            assessmentTargetDirY * assessmentTargetDirY +
            assessmentTargetDirZ * assessmentTargetDirZ,
        )

        newSentinelRotation = [
          -Math.asin(assessmentTargetDirY / assessmentTargetDirLength) + Math.sin(time * 1.5) * 0.05, // Scanning movements
          Math.atan2(assessmentTargetDirX, assessmentTargetDirZ),
          Math.sin(time * 0.7) * 0.05,
        ]

        // GhostVipers circle at a distance
        newGhostViperPositions = [0, 1, 2].map((index) => {
          const ghostAngle = assessmentAngle + (index * Math.PI * 2) / 3
          const ghostRadius = 12

          return [
            targetPositions[0][0] + Math.sin(ghostAngle) * ghostRadius,
            3 + Math.sin(time * 0.5 + index) * 0.5,
            targetPositions[0][2] + Math.cos(ghostAngle) * ghostRadius,
          ] as [number, number, number]
        })

        newGhostViperRotations = newGhostViperPositions.map((pos, index) => {
          // Face inward toward target
          const ghostDirX = targetPositions[0][0] - pos[0]
          const ghostDirZ = targetPositions[0][2] - pos[2]
          const ghostDirLength = Math.sqrt(ghostDirX * ghostDirX + ghostDirZ * ghostDirZ)

          return [
            Math.sin(time * 0.6 + index) * 0.1,
            Math.atan2(ghostDirX, ghostDirZ),
            Math.sin(time * 0.4 + index) * 0.1,
          ] as [number, number, number]
        })
        break
    }

    // Update positions and rotations
    setSentinelPosition(newSentinelPosition)
    setSentinelRotation(newSentinelRotation)
    setGhostViperPositions(newGhostViperPositions)
    setGhostViperRotations(newGhostViperRotations)
  })

  return null // This component doesn't render anything
}

// Main simulation component
function MissionSimulation() {
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [targetActive, setTargetActive] = useState(false)
  const [targetDestroyed, setTargetDestroyed] = useState(false)
  const [showExplosion, setShowExplosion] = useState(false)
  const [showScanning, setShowScanning] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [environmentPreset, setEnvironmentPreset] = useState<"night" | "sunset">("night")
  const [showParticles, setShowParticles] = useState(true)
  const [weatherType, setWeatherType] = useState<"none" | "rain" | "snow" | "fog">("none")
  const [weatherIntensity, setWeatherIntensity] = useState<"light" | "medium" | "heavy">("medium")
  const [postProcessingEnabled, setPostProcessingEnabled] = useState(true)
  const [shadowsEnabled, setShadowsEnabled] = useState(true)
  const [resetView, setResetView] = useState(false)

  // Sentinel Liberator position and rotation
  const [sentinelPosition, setSentinelPosition] = useState<[number, number, number]>([0, 15, 0])
  const [sentinelRotation, setSentinelRotation] = useState<[number, number, number]>([0, 0, 0])

  // GhostViper positions and rotations
  const [ghostViperPositions, setGhostViperPositions] = useState<[number, number, number][]>([
    [-20, 1, -20],
    [-19, 1, -18],
    [-21, 1, -19],
  ])
  const [ghostViperRotations, setGhostViperRotations] = useState<[number, number, number][]>([
    [0, Math.PI / 4, 0],
    [0, Math.PI / 4, 0],
    [0, Math.PI / 4, 0],
  ])

  // Target positions
  const targetPositions: [number, number, number][] = [
    [10, 0, 10],
    [12, 0, 8],
    [8, 0, 12],
  ]

  // Reset the simulation
  const resetSimulation = () => {
    setProgress(0)
    setIsPlaying(false)
    setCurrentPhase(0)
    setTargetActive(false)
    setTargetDestroyed(false)
    setShowExplosion(false)
    setShowScanning(false)
    setResetView(true)
    setTimeout(() => setResetView(false), 100)

    // Reset positions
    setSentinelPosition([0, 15, 0])
    setSentinelRotation([0, 0, 0])

    setGhostViperPositions([
      [-20, 1, -20],
      [-19, 1, -18],
      [-21, 1, -19],
    ])
    setGhostViperRotations([
      [0, Math.PI / 4, 0],
      [0, Math.PI / 4, 0],
      [0, Math.PI / 4, 0],
    ])
  }

  // Toggle stats display
  const toggleStats = () => {
    setShowStats(!showStats)
  }

  // Toggle environment
  const toggleEnvironment = () => {
    setEnvironmentPreset(environmentPreset === "night" ? "sunset" : "night")
  }

  // Toggle particles
  const toggleParticles = () => {
    setShowParticles(!showParticles)
  }

  // Cycle weather
  const cycleWeather = () => {
    switch (weatherType) {
      case "none":
        setWeatherType("rain")
        break
      case "rain":
        setWeatherType("snow")
        break
      case "snow":
        setWeatherType("fog")
        break
      case "fog":
        setWeatherType("none")
        break
    }
  }

  // Cycle weather intensity
  const cycleWeatherIntensity = () => {
    switch (weatherIntensity) {
      case "light":
        setWeatherIntensity("medium")
        break
      case "medium":
        setWeatherIntensity("heavy")
        break
      case "heavy":
        setWeatherIntensity("light")
        break
    }
  }

  // Toggle post-processing
  const togglePostProcessing = () => {
    setPostProcessingEnabled(!postProcessingEnabled)
  }

  // Toggle shadows
  const toggleShadows = () => {
    setShadowsEnabled(!shadowsEnabled)
  }

  // Get weather icon
  const getWeatherIcon = () => {
    switch (weatherType) {
      case "none":
        return <Cloud className="h-4 w-4" />
      case "rain":
        return <CloudRain className="h-4 w-4" />
      case "snow":
        return <CloudSnow className="h-4 w-4" />
      case "fog":
        return <Droplets className="h-4 w-4" />
    }
  }

  // Update current phase based on progress
  useEffect(() => {
    let cumulativeDuration = 0
    for (let i = 0; i < MISSION_PHASES.length; i++) {
      cumulativeDuration += MISSION_PHASES[i].duration
      if ((progress / 100) * TOTAL_DURATION <= cumulativeDuration) {
        setCurrentPhase(i)
        break
      }
    }
  }, [progress])

  // Auto-advance progress when playing
  useEffect(() => {
    let animationFrame: number

    const animate = () => {
      if (isPlaying && progress < 100) {
        setProgress((prev) => Math.min(prev + 0.1, 100))
        animationFrame = requestAnimationFrame(animate)
      } else if (progress >= 100) {
        setIsPlaying(false)
      }
    }

    if (isPlaying) {
      animationFrame = requestAnimationFrame(animate)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
    }
  }, [isPlaying, progress])

  // Generate a unique key for the Canvas to force remount when needed
  const canvasKey = `mission-canvas-${currentPhase}-${weatherType}-${environmentPreset}`

  return (
    <div className="relative h-[600px] bg-navy-900 rounded-lg border border-gray-700 overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleEnvironment}
          className="bg-navy-800/80 border-gray-700"
          title={`Switch to ${environmentPreset === "night" ? "day" : "night"} environment`}
        >
          {environmentPreset === "night" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleParticles}
          className="bg-navy-800/80 border-gray-700"
          title={`${showParticles ? "Hide" : "Show"} particles`}
        >
          <Sparkles className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={cycleWeather}
          className="bg-navy-800/80 border-gray-700"
          title={`Current weather: ${weatherType}`}
        >
          {getWeatherIcon()}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={cycleWeatherIntensity}
          className="bg-navy-800/80 border-gray-700"
          title={`Weather intensity: ${weatherIntensity}`}
        >
          <span className="text-xs font-mono">{weatherIntensity.charAt(0).toUpperCase()}</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={togglePostProcessing}
          className={`bg-navy-800/80 border-gray-700 ${postProcessingEnabled ? "text-blue-500" : "text-gray-500"}`}
          title={`${postProcessingEnabled ? "Disable" : "Enable"} post-processing effects`}
        >
          <Layers className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleShadows}
          className={`bg-navy-800/80 border-gray-700 ${shadowsEnabled ? "text-blue-500" : "text-gray-500"}`}
          title={`${shadowsEnabled ? "Disable" : "Enable"} shadows`}
        >
          <span className="text-xs font-mono">🔅</span>
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={toggleStats}
          className="bg-navy-800/80 border-gray-700"
          title="Toggle performance stats"
        >
          <span className="text-xs font-mono">FPS</span>
        </Button>
      </div>

      <Canvas
        key={canvasKey}
        shadows={shadowsEnabled}
        dpr={[1, 1.5]} // Limit resolution for better performance
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false, // Disable alpha for better performance
        }}
        performance={{ min: 0.5 }} // Allow ThreeJS to reduce quality for performance
      >
        <PerspectiveCamera makeDefault position={[0, 10, 30]} fov={50} />

        <MaterialLibraryProvider>
          <Suspense fallback={null}>
            {/* Shadow setup */}
            {shadowsEnabled && <ShadowSetup />}

            {/* Soft shadows for better quality */}
            {shadowsEnabled && <SoftShadows size={10} samples={16} focus={0.5} />}

            {/* HDR Environment with rotation and atmospheric effects */}
            <HDREnvironment
              preset={environmentPreset}
              enableRotation={true}
              rotationSpeed={0.01}
              enableAtmosphere={true}
              atmosphereColor={environmentPreset === "night" ? "#60a5fa" : "#ffa500"}
              atmosphereIntensity={0.3}
            />

            {/* Weather effects */}
            <WeatherController type={weatherType} intensity={weatherIntensity} />

            {/* Particle field for space dust effect */}
            {showParticles && (
              <ParticleField count={2000} color={environmentPreset === "night" ? "#60a5fa" : "#ffa500"} />
            )}

            <LODController>
              {/* Scene Content */}
              <SceneContent
                currentPhase={currentPhase}
                targetPositions={targetPositions}
                sentinelPosition={sentinelPosition}
                sentinelRotation={sentinelRotation}
                ghostViperPositions={ghostViperPositions}
                ghostViperRotations={ghostViperRotations}
                targetActive={targetActive}
                targetDestroyed={targetDestroyed}
                showExplosion={showExplosion}
                showScanning={showScanning}
                resetView={resetView}
              />
            </LODController>

            {/* Animation Controller - This component will handle the useFrame logic */}
            <EnhancedSceneController
              currentPhase={currentPhase}
              targetPositions={targetPositions}
              setSentinelPosition={setSentinelPosition}
              setSentinelRotation={setSentinelRotation}
              setGhostViperPositions={setGhostViperPositions}
              setGhostViperRotations={setGhostViperRotations}
              setTargetActive={setTargetActive}
              setTargetDestroyed={setTargetDestroyed}
              setShowExplosion={setShowExplosion}
              setShowScanning={setShowScanning}
            />

            {/* Contact shadows for better grounding */}
            {shadowsEnabled && (
              <ContactShadows
                position={[0, -1.99, 0]}
                opacity={0.7}
                scale={50}
                blur={1}
                far={10}
                resolution={256}
                color="#000000"
              />
            )}

            {/* Enhanced Lighting */}
            <ambientLight intensity={0.5} />
            <directionalLight
              position={[10, 10, 5]}
              intensity={1}
              castShadow={shadowsEnabled}
              color={environmentPreset === "night" ? "#ffffff" : "#ffa500"}
              shadow-mapSize={[2048, 2048]}
              shadow-bias={-0.0001}
            />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={5}
              maxDistance={50}
              autoRotate={false}
              autoRotateSpeed={0.5}
            />

            <PerformanceMonitor showStats={showStats} />

            {/* Post-processing effects */}
            {postProcessingEnabled && (
              <PostProcessing preset="medium" bloom={true} chromaticAberration={true} noise={true} vignette={true} />
            )}

            {/* Bake shadows for better performance */}
            {shadowsEnabled && <BakeShadows />}
          </Suspense>
        </MaterialLibraryProvider>
      </Canvas>

      {/* Phase information overlay - moved to top for better visibility */}
      <div className="absolute top-4 left-4 right-[120px] bg-navy-800/90 p-4 rounded-md border border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-white">
            Phase {currentPhase + 1}: {MISSION_PHASES[currentPhase].name}
          </h3>
          <Badge className={`${currentPhase < 4 ? "bg-blue-600" : "bg-red-600"}`}>
            {currentPhase < 4 ? "Sentinel Liberator™" : "GhostViper™"}
          </Badge>
        </div>
        <p className="text-gray-300 text-sm mb-4">{MISSION_PHASES[currentPhase].description}</p>

        <AnimationController
          progress={progress}
          setProgress={setProgress}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          resetSimulation={resetSimulation}
          currentPhase={currentPhase}
        />
      </div>
    </div>
  )
}

export default function MissionSimulator() {
  return (
    <div className="bg-navy-900 rounded-lg border border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        <span className="text-blue-500">Mission</span> Simulation
      </h2>

      <MissionSimulation />

      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        {MISSION_PHASES.slice(0, 4).map((phase) => (
          <div key={phase.id} className="bg-navy-800 p-3 rounded-md border border-gray-700">
            <h4 className="text-white font-medium mb-1">{phase.name}</h4>
            <p className="text-gray-400 text-sm">{phase.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
        {MISSION_PHASES.slice(4).map((phase) => (
          <div key={phase.id} className="bg-navy-800 p-3 rounded-md border border-gray-700">
            <h4 className="text-white font-medium mb-1">{phase.name}</h4>
            <p className="text-gray-400 text-sm">{phase.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
