"use client"

import { useState } from "react"
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts"

const data = [
  { subject: "Range", A: 120, B: 110, fullMark: 150 },
  { subject: "Stealth", A: 98, B: 130, fullMark: 150 },
  { subject: "Endurance", A: 86, B: 130, fullMark: 150 },
  { subject: "Payload", A: 99, B: 100, fullMark: 150 },
  { subject: "Speed", A: 85, B: 90, fullMark: 150 },
  { subject: "Precision", A: 65, B: 85, fullMark: 150 },
]

export default function CapabilitiesRadar() {
  const [activeRadar, setActiveRadar] = useState<string | null>(null)

  return (
    <div className="bg-navy-900 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 text-center">System Capabilities Comparison</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
            <PolarGrid stroke="#374151" />
            <PolarAngleAxis dataKey="subject" tick={{ fill: "#9ca3af" }} />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={{ fill: "#9ca3af" }} />
            <Radar
              name="Sentinel Liberator™"
              dataKey="A"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
              onMouseEnter={() => setActiveRadar("A")}
              onMouseLeave={() => setActiveRadar(null)}
              strokeWidth={activeRadar === "A" ? 3 : 1}
            />
            <Radar
              name="GhostViper™"
              dataKey="B"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.6}
              onMouseEnter={() => setActiveRadar("B")}
              onMouseLeave={() => setActiveRadar(null)}
              strokeWidth={activeRadar === "B" ? 3 : 1}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#172554",
                borderColor: "#3b82f6",
                borderRadius: "0.375rem",
                color: "#fff",
              }}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{
                paddingTop: "20px",
                color: "#fff",
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center text-gray-400 text-sm">
        Hover over the chart to compare capabilities between systems
      </div>
    </div>
  )
}
