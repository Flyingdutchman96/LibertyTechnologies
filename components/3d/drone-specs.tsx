"use client"

import type React from "react"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Eye, Shield, Zap, Clock, Ruler, Crosshair } from "lucide-react"

interface SpecItemProps {
  icon: React.ReactNode
  label: string
  value: string
  highlight?: boolean
}

function SpecItem({ icon, label, value, highlight = false }: SpecItemProps) {
  return (
    <div className="flex items-center space-x-3 p-3 rounded-md bg-navy-800/50 border border-gray-700">
      <div className={`p-2 rounded-full ${highlight ? "bg-blue-500/20" : "bg-gray-700/50"}`}>{icon}</div>
      <div>
        <p className="text-gray-400 text-sm">{label}</p>
        <p className={`font-medium ${highlight ? "text-blue-400" : "text-white"}`}>{value}</p>
      </div>
    </div>
  )
}

export default function DroneSpecs() {
  const [activeTab, setActiveTab] = useState("sentinel")

  const sentinelSpecs = [
    { icon: <Eye className="h-4 w-4 text-blue-500" />, label: "Sensor Range", value: "200+ km", highlight: true },
    { icon: <Clock className="h-4 w-4 text-gray-300" />, label: "Flight Time", value: "24+ hours" },
    { icon: <Ruler className="h-4 w-4 text-gray-300" />, label: "Operational Altitude", value: "60,000 ft (18 km)" },
    {
      icon: <Shield className="h-4 w-4 text-gray-300" />,
      label: "Stealth Rating",
      value: "Class IV (Very Low Observable)",
    },
    {
      icon: <Zap className="h-4 w-4 text-blue-500" />,
      label: "Power Source",
      value: "Electric + Solar",
      highlight: true,
    },
    {
      icon: <Crosshair className="h-4 w-4 text-gray-300" />,
      label: "Target Capacity",
      value: "500+ simultaneous tracks",
    },
  ]

  const ghostviperSpecs = [
    {
      icon: <Crosshair className="h-4 w-4 text-red-500" />,
      label: "Strike Precision",
      value: "< 1.5m CEP",
      highlight: true,
    },
    { icon: <Clock className="h-4 w-4 text-gray-300" />, label: "Loiter Time", value: "45 minutes" },
    { icon: <Ruler className="h-4 w-4 text-gray-300" />, label: "Operational Range", value: "30 km" },
    { icon: <Shield className="h-4 w-4 text-gray-300" />, label: "Armor Penetration", value: "Standard NATO MBT" },
    {
      icon: <Zap className="h-4 w-4 text-red-500" />,
      label: "Warhead Type",
      value: "Dual-purpose HEAT/Frag",
      highlight: true,
    },
    { icon: <Eye className="h-4 w-4 text-gray-300" />, label: "Guidance", value: "Multi-mode (IR/Visual/GPS)" },
  ]

  const swarmSpecs = [
    {
      icon: <Zap className="h-4 w-4 text-purple-500" />,
      label: "Swarm Size",
      value: "Up to 50 units",
      highlight: true,
    },
    { icon: <Clock className="h-4 w-4 text-gray-300" />, label: "Deployment Time", value: "< 30 seconds" },
    { icon: <Ruler className="h-4 w-4 text-gray-300" />, label: "Formation Spread", value: "Configurable, 5-500m" },
    { icon: <Shield className="h-4 w-4 text-gray-300" />, label: "Redundancy", value: "N+2 mission assurance" },
    {
      icon: <Zap className="h-4 w-4 text-purple-500" />,
      label: "Coordination",
      value: "Mesh network, no single point of failure",
      highlight: true,
    },
    {
      icon: <Crosshair className="h-4 w-4 text-gray-300" />,
      label: "Multi-target Capacity",
      value: "Up to 15 simultaneous targets",
    },
  ]

  return (
    <div className="bg-navy-900 rounded-lg border border-gray-700 p-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="sentinel">Sentinel Liberator™</TabsTrigger>
          <TabsTrigger value="ghostviper">GhostViper™</TabsTrigger>
          <TabsTrigger value="swarm">Swarm Capabilities</TabsTrigger>
        </TabsList>

        <TabsContent value="sentinel">
          <div className="mb-4">
            <Badge className="bg-blue-600 mb-2">High-Altitude Surveillance Platform</Badge>
            <p className="text-gray-300">
              The Sentinel Liberator™ provides persistent wide-area surveillance with advanced multi-spectral sensors
              and AI-powered target recognition.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {sentinelSpecs.map((spec, index) => (
              <SpecItem key={index} {...spec} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ghostviper">
          <div className="mb-4">
            <Badge className="bg-red-600 mb-2">Autonomous Strike Munition</Badge>
            <p className="text-gray-300">
              The GhostViper™ is a precision loitering munition designed to neutralize high-value targets with minimal
              collateral damage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {ghostviperSpecs.map((spec, index) => (
              <SpecItem key={index} {...spec} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="swarm">
          <div className="mb-4">
            <Badge className="bg-purple-600 mb-2">Coordinated Swarm Operations</Badge>
            <p className="text-gray-300">
              Liberty Dynamics' swarm technology enables coordinated multi-unit operations with distributed
              decision-making and no single point of failure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {swarmSpecs.map((spec, index) => (
              <SpecItem key={index} {...spec} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
