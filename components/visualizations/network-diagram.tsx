"use client"

import { useState } from "react"
import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell, Sector } from "recharts"

const data = [
  { name: "Sentinel Liberator™", value: 35, description: "High-altitude surveillance platform" },
  { name: "Target AI", value: 25, description: "Neural vision models for target identification" },
  { name: "Secure Comms", value: 15, description: "Encrypted communication channels" },
  { name: "GhostViper™", value: 25, description: "Autonomous strike munitions" },
]

const COLORS = ["#3b82f6", "#1d4ed8", "#60a5fa", "#2563eb"]

const renderActiveShape = (props: any) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent } = props

  return (
    <g>
      <text x={cx} y={cy - 20} dy={8} textAnchor="middle" fill="#fff" className="text-lg font-bold">
        {payload.name}
      </text>
      <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#9ca3af" className="text-sm">
        {payload.description}
      </text>
      <text x={cx} y={cy + 30} dy={8} textAnchor="middle" fill="#60a5fa" className="text-sm">
        {`${(percent * 100).toFixed(0)}% System Resources`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 10}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 15}
        outerRadius={outerRadius + 20}
        fill={fill}
      />
    </g>
  )
}

export default function NetworkDiagram() {
  const [activeIndex, setActiveIndex] = useState(0)

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="bg-navy-900 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 text-center">System Component Distribution</h3>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
              onMouseEnter={onPieEnter}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#172554",
                borderColor: "#3b82f6",
                borderRadius: "0.375rem",
                color: "#fff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 text-center text-gray-400 text-sm">
        Hover over segments to see detailed component information
      </div>
    </div>
  )
}
