"use client"

import { useState } from "react"
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  ZAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts"

// Generate some sample threat data
const generateThreatData = () => {
  const threats = []
  const threatTypes = ["Infantry", "Armor", "Artillery", "Air Defense"]

  for (let i = 0; i < 40; i++) {
    const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)]
    const threat = {
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      z: Math.floor(Math.random() * 100) + 20, // threat level
      type: threatType,
    }
    threats.push(threat)
  }

  return threats
}

const threatData = generateThreatData()

// Organize data by threat type
const infantryThreats = threatData.filter((t) => t.type === "Infantry")
const armorThreats = threatData.filter((t) => t.type === "Armor")
const artilleryThreats = threatData.filter((t) => t.type === "Artillery")
const airDefenseThreats = threatData.filter((t) => t.type === "Air Defense")

// Color mapping for threat types
const threatColors = {
  Infantry: "#3b82f6",
  Armor: "#ef4444",
  Artillery: "#f59e0b",
  "Air Defense": "#8b5cf6",
}

// Custom tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload
    return (
      <div className="bg-navy-800 p-3 border border-gray-700 rounded-md">
        <p className="text-white font-semibold">{`Threat: ${data.type}`}</p>
        <p className="text-gray-300">{`Coordinates: (${data.x}, ${data.y})`}</p>
        <p className="text-gray-300">{`Threat Level: ${data.z}`}</p>
      </div>
    )
  }
  return null
}

export default function ThreatHeatmap() {
  const [activeThreats, setActiveThreats] = useState<string[]>(["Infantry", "Armor", "Artillery", "Air Defense"])

  const toggleThreatType = (type: string) => {
    if (activeThreats.includes(type)) {
      setActiveThreats(activeThreats.filter((t) => t !== type))
    } else {
      setActiveThreats([...activeThreats, type])
    }
  }

  return (
    <div className="bg-navy-900 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Battlefield Threat Analysis</h3>

      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        {["Infantry", "Armor", "Artillery", "Air Defense"].map((type) => (
          <button
            key={type}
            onClick={() => toggleThreatType(type)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              activeThreats.includes(type)
                ? `bg-${threatColors[type as keyof typeof threatColors].replace("#", "")} text-white`
                : "bg-gray-700 text-gray-300"
            }`}
            style={{
              backgroundColor: activeThreats.includes(type)
                ? threatColors[type as keyof typeof threatColors]
                : "#374151",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis
              type="number"
              dataKey="x"
              name="X Coordinate"
              tick={{ fill: "#9ca3af" }}
              label={{ value: "X Coordinate (km)", position: "bottom", fill: "#9ca3af" }}
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Y Coordinate"
              tick={{ fill: "#9ca3af" }}
              label={{ value: "Y Coordinate (km)", angle: -90, position: "left", fill: "#9ca3af" }}
            />
            <ZAxis type="number" dataKey="z" range={[50, 400]} name="Threat Level" />
            <Tooltip content={<CustomTooltip />} />

            {activeThreats.includes("Infantry") && (
              <Scatter name="Infantry" data={infantryThreats} fill={threatColors["Infantry"]}>
                {infantryThreats.map((entry, index) => (
                  <Cell key={`infantry-${index}`} fill={threatColors["Infantry"]} />
                ))}
              </Scatter>
            )}

            {activeThreats.includes("Armor") && (
              <Scatter name="Armor" data={armorThreats} fill={threatColors["Armor"]}>
                {armorThreats.map((entry, index) => (
                  <Cell key={`armor-${index}`} fill={threatColors["Armor"]} />
                ))}
              </Scatter>
            )}

            {activeThreats.includes("Artillery") && (
              <Scatter name="Artillery" data={artilleryThreats} fill={threatColors["Artillery"]}>
                {artilleryThreats.map((entry, index) => (
                  <Cell key={`artillery-${index}`} fill={threatColors["Artillery"]} />
                ))}
              </Scatter>
            )}

            {activeThreats.includes("Air Defense") && (
              <Scatter name="Air Defense" data={airDefenseThreats} fill={threatColors["Air Defense"]}>
                {airDefenseThreats.map((entry, index) => (
                  <Cell key={`airdefense-${index}`} fill={threatColors["Air Defense"]} />
                ))}
              </Scatter>
            )}

            <Legend wrapperStyle={{ color: "#fff" }} onClick={(e) => toggleThreatType(e.dataKey)} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center text-gray-400 text-sm">
        Toggle threat types using the buttons above and hover for detailed information
      </div>
    </div>
  )
}
