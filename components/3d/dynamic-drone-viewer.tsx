"use client"

import { useState, Suspense, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import {
  OrbitControls,
  PerspectiveCamera,
  Html,
  Bounds,
  useBounds,
  SpotLight,
  Environment,
  Sky,
} from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Info, Maximize, Minimize, RotateCcw, ZoomIn, ZoomOut } from "lucide-react"
import EnhancedSentinelLiberator from "./enhanced-sentinel-liberator"
import EnhancedGhostViper from "./enhanced-ghost-viper"

// Scene content component - moved outside the main component
function SceneContent({ resetCamera, activeTab, setHoveredPart, resetView }) {
  const bounds = useBounds()

  // Reset camera view when resetCamera changes
  useEffect(() => {
    if (resetCamera) {
      bounds.refresh().fit()
    }
  }, [resetCamera, bounds])

  return (
    <>
      {activeTab === "sentinel" && (
        <EnhancedSentinelLiberator
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          setHoveredPart={setHoveredPart}
          resetView={resetView}
        />
      )}
      {activeTab === "ghostviper" && (
        <EnhancedGhostViper
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          setHoveredPart={setHoveredPart}
          resetView={resetView}
        />
      )}
      {activeTab === "swarm" && (
        <group>
          {Array.from({ length: 5 }).map((_, i) => {
            const angle = (i / 5) * Math.PI * 2
            const radius = 3
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            const y = (Math.random() - 0.5) * 2

            return (
              <EnhancedGhostViper
                key={`drone-${i}`}
                position={[x, y, z]}
                rotation={[Math.random() * 0.2, Math.random() * Math.PI * 2, Math.random() * 0.2]}
                setHoveredPart={setHoveredPart}
              />
            )
          })}
        </group>
      )}
    </>
  )
}

export default function DynamicDroneViewer() {
  const [activeTab, setActiveTab] = useState("sentinel")
  const [hoveredPart, setHoveredPart] = useState(null)
  const [resetView, setResetView] = useState(false)
  const [fullscreen, setFullscreen] = useState(false)
  const [showSkybox, setShowSkybox] = useState(true)

  const handleResetView = () => {
    setResetView(true)
    setTimeout(() => setResetView(false), 100)
  }

  const toggleFullscreen = () => {
    setFullscreen(!fullscreen)
  }

  const toggleSkybox = () => {
    setShowSkybox(!showSkybox)
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
          onClick={toggleSkybox}
          className="bg-navy-800/80 border-gray-700"
          title={`Switch to ${showSkybox ? "sky" : "skybox"}`}
        >
          {showSkybox ? "🌌" : "☀️"}
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

      <Canvas shadows dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }} key={`canvas-${activeTab}`}>
        <PerspectiveCamera makeDefault position={[0, 1, 5]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />

        {showSkybox ? (
          <Environment preset="night" background />
        ) : (
          <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />
        )}

        <Suspense fallback={null}>
          <Bounds fit clip observe margin={1.2}>
            <SceneContent
              resetCamera={resetView}
              activeTab={activeTab}
              setHoveredPart={setHoveredPart}
              resetView={resetView}
            />
          </Bounds>
        </Suspense>

        <SpotLight
          position={[5, 5, 5]}
          angle={0.3}
          penumbra={0.5}
          intensity={1}
          castShadow
          color="#60a5fa"
          shadow-bias={-0.0001}
        />

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={10}
          target={[0, 0, 0]}
        />

        <gridHelper args={[20, 20, "#1e293b", "#1e293b"]} position={[0, -1.5, 0]} />

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
      </Canvas>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-navy-900/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-navy-900/70 to-transparent"></div>
      </div>
    </div>
  )
}
