"use client"

import { useState } from "react"
import { ResponsiveContainer, Sankey } from "recharts"

// Data flow nodes and links
const data = {
  nodes: [
    { name: "Sensors" },
    { name: "Data Collection" },
    { name: "Signal Processing" },
    { name: "Target Recognition" },
    { name: "Threat Analysis" },
    { name: "Decision Engine" },
    { name: "Mission Planning" },
    { name: "Strike Coordination" },
    { name: "Execution" },
    { name: "Assessment" },
  ],
  links: [
    { source: 0, target: 1, value: 100 },
    { source: 1, target: 2, value: 100 },
    { source: 2, target: 3, value: 80 },
    { source: 2, target: 4, value: 20 },
    { source: 3, target: 4, value: 80 },
    { source: 4, target: 5, value: 100 },
    { source: 5, target: 6, value: 60 },
    { source: 5, target: 7, value: 40 },
    { source: 6, target: 7, value: 60 },
    { source: 7, target: 8, value: 100 },
    { source: 8, target: 9, value: 100 },
  ],
}

// Node descriptions for tooltips
const nodeDescriptions = {
  Sensors: "Multi-spectral sensor array collecting battlefield data",
  "Data Collection": "Raw data aggregation from multiple sensor platforms",
  "Signal Processing": "Filtering and enhancing signal data for analysis",
  "Target Recognition": "AI-powered identification and classification of potential targets",
  "Threat Analysis": "Assessment of target priority and threat level",
  "Decision Engine": "Core autonomous decision-making system",
  "Mission Planning": "Strategic planning for mission execution",
  "Strike Coordination": "Tactical coordination of strike assets",
  Execution: "Deployment and execution of precision munitions",
  Assessment: "Post-mission analysis and effectiveness evaluation",
}

export default function DataFlowDiagram() {
  const [activeNode, setActiveNode] = useState<string | null>(null)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const nodeName = payload[0].name
      return (
        <div className="bg-navy-800 p-3 border border-gray-700 rounded-md">
          <p className="text-white font-semibold">{nodeName}</p>
          <p className="text-gray-300 text-sm">{nodeDescriptions[nodeName as keyof typeof nodeDescriptions]}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="bg-navy-900 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 text-center">Operational Data Flow</h3>

      {activeNode && (
        <div className="mb-4 p-3 bg-navy-800 rounded-md border border-gray-700">
          <h4 className="text-md font-semibold text-white mb-1">{activeNode}</h4>
          <p className="text-gray-300 text-sm">{nodeDescriptions[activeNode as keyof typeof nodeDescriptions]}</p>
        </div>
      )}

      <div className="h-[500px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <Sankey
            data={data}
            nodeWidth={20}
            nodePadding={50}
            margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            link={{ stroke: "#3b82f6" }}
            node={{
              fill: "#60a5fa",
              stroke: "#3b82f6",
              strokeWidth: 2,
              activeBorderWidth: 2,
              activeBorderColor: "#fff",
              activeOpacity: 0.8,
              inactiveOpacity: 0.5,
              onClick: (e) => setActiveNode(e.name),
              onMouseEnter: (e) => setActiveNode(e.name),
              onMouseLeave: () => setActiveNode(null),
            }}
            tooltip={<CustomTooltip />}
          />
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center text-gray-400 text-sm">
        Click or hover over nodes to see detailed information about each processing stage
      </div>
    </div>
  )
}
