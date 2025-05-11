"use client"

import dynamic from "next/dynamic"

// Dynamically import the MissionSimulator component with SSR disabled
const MissionSimulator = dynamic(() => import("./mission-simulator"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-navy-900 rounded-lg border border-gray-700 flex items-center justify-center">
      <div className="text-blue-500 animate-pulse">Loading mission simulation...</div>
    </div>
  ),
})

export default MissionSimulator
