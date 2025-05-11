"use client"

import React from "react"

import { useState, useRef, Suspense } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  Bounds,
  useBounds,
  SpotLight,
  useDetectGPU,
  Stats,
  Float,
  ContactShadows,
  AccumulativeShadows,
  RandomizedLight,
  BakeShadows,
  SoftShadows,
} from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Info,
  Maximize,
  Minimize,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Sun,
  Moon,
  Cloud,
  CloudSnow,
  CloudRain,
  Droplets,
  Sparkles,
  Layers,
} from "lucide-react"
import EnhancedSentinelLiberator from "./enhanced-sentinel-liberator"
import EnhancedGhostViper from "./enhanced-ghost-viper"
import HDREnvironment from "./hdr-environment"
import ParticleField from "./particle-field"
import { MaterialLibraryProvider } from "./material-library"
import PostProcessing from "./post-processing"
import WeatherController from "./weather-effects"
import ShadowSetup from "./shadow-setup"
import * as THREE from "three"

// Performance monitor component
function PerformanceMonitor({ showStats = false }) {
  const gpuTier = useDetectGPU()
  const [isLowPerformance, setIsLowPerformance] = useState(false)

  React.useEffect(() => {
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

// Level of Detail component - fixed to handle null children
function LODController({ children }) {
  const { camera } = useThree()
  const [lowDetail, setLowDetail] = useState(false)

  useFrame(() => {
    // Check camera distance and set detail level
    const distance = camera.position.distanceTo(new THREE.Vector3(0, 0, 0))
    setLowDetail(distance > 8)
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

// Ground plane with shadows
function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]} receiveShadow>
      <planeGeometry args={[50, 50]} />
      <meshStandardMaterial color="#1e293b" roughness={0.8} metalness={0.2} envMapIntensity={0.5} />
    </mesh>
  )
}

// Swarm visualization with optimized rendering
function DroneSwarm({
  count = 10,
  setHoveredPart,
  lowDetail = false,
}: { count: number; setHoveredPart: (part: string | null) => void; lowDetail?: boolean }) {
  const group = useRef<THREE.Group>(null)

  // Reduce animation calculations for better performance
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = state.clock.getElapsedTime() * 0.1
    }
  })

  // Reduce number of drones in low detail mode
  const droneCount = lowDetail ? Math.min(5, count) : count

  return (
    <group ref={group}>
      {Array.from({ length: droneCount }).map((_, i) => {
        const angle = (i / droneCount) * Math.PI * 2
        const radius = 3 + Math.random() * 2
        const x = Math.cos(angle) * radius
        const z = Math.sin(angle) * radius
        const y = (Math.random() - 0.5) * 2

        return (
          <Float key={i} speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
            <EnhancedGhostViper
              position={new THREE.Vector3(x, y, z)}
              rotation={new THREE.Euler(Math.random() * 0.2, Math.random() * Math.PI * 2, Math.random() * 0.2)}
              setHoveredPart={setHoveredPart}
              lowDetail={lowDetail}
            />
          </Float>
        )
      })}
    </group>
  )
}

// Scene setup with camera controls
function Scene({ children, resetCamera }: { children: React.ReactNode; resetCamera: boolean }) {
  const bounds = useBounds()

  // Reset camera view when resetCamera changes
  if (resetCamera) {
    bounds.refresh().fit()
  }

  return <>{children}</>
}

// Main component
export default function DroneViewer() {
  const [activeTab, setActiveTab] = useState("sentinel")
  const [hoveredPart, setHoveredPart] = useState<string | null>(null)
  const [resetView, setResetView] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showStats, setShowStats] = useState(false)
  const [environmentPreset, setEnvironmentPreset] = useState<"night" | "sunset">("night")
  const [showParticles, setShowParticles] = useState(true)
  const [weatherType, setWeatherType] = useState<"none" | "rain" | "snow" | "fog">("none")
  const [weatherIntensity, setWeatherIntensity] = useState<"light" | "medium" | "heavy">("medium")
  const [postProcessingEnabled, setPostProcessingEnabled] = useState(true)
  const [shadowsEnabled, setShadowsEnabled] = useState(true)

  const handleResetView = () => {
    setResetView(true)
    setTimeout(() => setResetView(false), 100)
  }

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  const toggleStats = () => {
    setShowStats(!showStats)
  }

  const toggleEnvironment = () => {
    setEnvironmentPreset(environmentPreset === "night" ? "sunset" : "night")
  }

  const toggleParticles = () => {
    setShowParticles(!showParticles)
  }

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

  const togglePostProcessing = () => {
    setPostProcessingEnabled(!postProcessingEnabled)
  }

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

  return (
    <div
      className={`relative bg-navy-900 rounded-lg border border-gray-700 overflow-hidden transition-all duration-300 ${
        fullscreen ? "fixed inset-0 z-50" : "h-[500px]"
      }`}
    >
      <div className="absolute top-4 left-4 z-10">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-navy-800/80 border border-gray-700">
            <TabsTrigger value="sentinel">Sentinel Liberator™</TabsTrigger>
            <TabsTrigger value="ghostviper">GhostViper™</TabsTrigger>
            <TabsTrigger value="swarm">Swarm Formation</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

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
        <Button variant="outline" size="icon" onClick={handleResetView} className="bg-navy-800/80 border-gray-700">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <Button variant="outline" size="icon" onClick={toggleFullscreen} className="bg-navy-800/80 border-gray-700">
          {fullscreen ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
        </Button>
      </div>

      {hoveredPart && (
        <div className="absolute bottom-4 left-4 z-10 bg-navy-800/90 p-3 rounded-md border border-gray-700">
          <div className="flex items-center space-x-2">
            <Info className="h-4 w-4 text-blue-500" />
            <span className="text-white font-medium">{hoveredPart}</span>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 right-4 z-10 bg-navy-800/80 rounded-md border border-gray-700 flex">
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <ZoomIn className="h-4 w-4 mr-1" />
          Zoom In
        </Button>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <ZoomOut className="h-4 w-4 mr-1" />
          Zoom Out
        </Button>
      </div>

      <Canvas
        shadows={shadowsEnabled}
        dpr={[1, 1.5]} // Limit resolution for better performance
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false, // Disable alpha for better performance
        }}
        performance={{ min: 0.5 }} // Allow ThreeJS to reduce quality for performance
      >
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />

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
              rotationSpeed={0.02}
              enableAtmosphere={true}
              atmosphereColor={environmentPreset === "night" ? "#60a5fa" : "#ffa500"}
              atmosphereIntensity={0.3}
            />

            {/* Weather effects */}
            <WeatherController type={weatherType} intensity={weatherIntensity} />

            {/* Particle field for space dust effect */}
            {showParticles && (
              <ParticleField count={1500} color={environmentPreset === "night" ? "#60a5fa" : "#ffa500"} />
            )}

            {/* Ground plane */}
            <Ground />

            {/* Contact shadows for better grounding */}
            {shadowsEnabled && (
              <ContactShadows
                position={[0, -1.49, 0]}
                opacity={0.7}
                scale={20}
                blur={1}
                far={10}
                resolution={256}
                color="#000000"
              />
            )}

            {/* Accumulative shadows for better ambient occlusion */}
            {shadowsEnabled && (
              <AccumulativeShadows
                position={[0, -1.48, 0]}
                temporal
                frames={100}
                alphaTest={0.85}
                scale={20}
                resolution={1024}
                opacity={0.8}
              >
                <RandomizedLight
                  amount={8}
                  radius={4}
                  ambient={0.5}
                  intensity={1}
                  position={[5, 5, -10]}
                  bias={0.001}
                />
              </AccumulativeShadows>
            )}

            <Bounds fit clip observe margin={1.2}>
              <Scene resetCamera={resetView}>
                <LODController>
                  {activeTab === "sentinel" && (
                    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                      <EnhancedSentinelLiberator
                        position={new THREE.Vector3(0, 0, 0)}
                        rotation={new THREE.Euler(0, 0, 0)}
                        setHoveredPart={setHoveredPart}
                        resetView={resetView}
                      />
                    </Float>
                  )}
                  {activeTab === "ghostviper" && (
                    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.2}>
                      <EnhancedGhostViper
                        position={new THREE.Vector3(0, 0, 0)}
                        rotation={new THREE.Euler(0, 0, 0)}
                        setHoveredPart={setHoveredPart}
                        resetView={resetView}
                      />
                    </Float>
                  )}
                  {activeTab === "swarm" && <DroneSwarm count={15} setHoveredPart={setHoveredPart} />}
                </LODController>
              </Scene>
            </Bounds>

            {/* Enhanced lighting */}
            <SpotLight
              position={[5, 5, 5]}
              angle={0.3}
              penumbra={0.5}
              intensity={1}
              castShadow={shadowsEnabled}
              color="#60a5fa"
              shadow-bias={-0.0001}
            />
            <SpotLight
              position={[-5, 5, -5]}
              angle={0.3}
              penumbra={0.5}
              intensity={0.5}
              castShadow={shadowsEnabled}
              color="#ffffff"
              shadow-bias={-0.0001}
            />

            <OrbitControls
              enablePan={true}
              enableZoom={true}
              enableRotate={true}
              minDistance={2}
              maxDistance={10}
              target={[0, 0, 0]}
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

          {/* Grid helper - simplified */}
          <gridHelper args={[20, 10, "#1e293b", "#1e293b"]} position={[0, -1.5, 0]} />

          {/* Annotations */}
          {activeTab === "sentinel" && (
            <Html position={[-3, 2, 0]} center>
              <Badge className="bg-blue-600">High-Altitude Surveillance Platform</Badge>
            </Html>
          )}
          {activeTab === "ghostviper" && (
            <Html position={[-2, 1.5, 0]} center>
              <Badge className="bg-red-600">Autonomous Strike Munition</Badge>
            </Html>
          )}
          {activeTab === "swarm" && (
            <Html position={[0, 2.5, 0]} center>
              <Badge className="bg-blue-600">Coordinated Swarm Formation</Badge>
            </Html>
          )}
        </MaterialLibraryProvider>
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-navy-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-navy-900/70 to-transparent"></div>
      </div>
    </div>
  )
}
