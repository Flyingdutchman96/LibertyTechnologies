"use client"

import { useState } from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"

const data = [
  { time: "T-10", surveillance: 20, targeting: 0, strike: 0, recovery: 0 },
  { time: "T-8", surveillance: 40, targeting: 10, strike: 0, recovery: 0 },
  { time: "T-6", surveillance: 60, targeting: 30, strike: 0, recovery: 0 },
  { time: "T-4", surveillance: 80, targeting: 60, strike: 0, recovery: 0 },
  { time: "T-2", surveillance: 100, targeting: 80, strike: 0, recovery: 0 },
  { time: "T-0", surveillance: 100, targeting: 100, strike: 20, recovery: 0 },
  { time: "T+2", surveillance: 100, targeting: 100, strike: 60, recovery: 0 },
  { time: "T+4", surveillance: 100, targeting: 100, strike: 100, recovery: 20 },
  { time: "T+6", surveillance: 100, targeting: 80, strike: 80, recovery: 40 },
  { time: "T+8", surveillance: 80, targeting: 60, strike: 60, recovery: 60 },
  { time: "T+10", surveillance: 60, targeting: 40, strike: 40, recovery: 80 },
  { time: "T+12", surveillance: 40, targeting: 20, strike: 20, recovery: 100 },
]

const phaseDescriptions = {
  surveillance: "High-altitude reconnaissance and area scanning",
  targeting: "Target identification, classification, and prioritization",
  strike: "Deployment and execution of precision munitions",
  recovery: "Mission assessment and system redeployment",
}

export default function MissionTimeline() {
  const [activePhase, setActivePhase] = useState<string | null>(null)

  return (
    <div className="bg-navy-900 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Mission Execution Timeline</h3>

      {activePhase && (
        <div className="mb-4 p-3 bg-navy-800 rounded-md border border-gray-700">
          <h4 className="text-md font-semibold text-white mb-1 capitalize">{activePhase} Phase</h4>
          <p className="text-gray-300 text-sm">{phaseDescriptions[activePhase as keyof typeof phaseDescriptions]}</p>
        </div>
      )}

      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="time" tick={{ fill: "#9ca3af" }} />
            <YAxis tick={{ fill: "#9ca3af" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#172554",
                borderColor: "#3b82f6",
                borderRadius: "0.375rem",
                color: "#fff",
              }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} onClick={(e) => setActivePhase(e.dataKey)} />
            <Area
              type="monotone"
              dataKey="surveillance"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={activePhase === "surveillance" ? 0.8 : 0.6}
              strokeWidth={activePhase === "surveillance" ? 3 : 1}
              onMouseEnter={() => setActivePhase("surveillance")}
            />
            <Area
              type="monotone"
              dataKey="targeting"
              stackId="1"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={activePhase === "targeting" ? 0.8 : 0.6}
              strokeWidth={activePhase === "targeting" ? 3 : 1}
              onMouseEnter={() => setActivePhase("targeting")}
            />
            <Area
              type="monotone"
              dataKey="strike"
              stackId="1"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={activePhase === "strike" ? 0.8 : 0.6}
              strokeWidth={activePhase === "strike" ? 3 : 1}
              onMouseEnter={() => setActivePhase("strike")}
            />
            <Area
              type="monotone"
              dataKey="recovery"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={activePhase === "recovery" ? 0.8 : 0.6}
              strokeWidth={activePhase === "recovery" ? 3 : 1}
              onMouseEnter={() => setActivePhase("recovery")}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center text-gray-400 text-sm">
        Click on legend items or hover over areas to see phase details
      </div>
    </div>
  )
}
