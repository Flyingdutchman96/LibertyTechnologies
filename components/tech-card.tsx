import type { ReactNode } from "react"

interface TechCardProps {
  title: string
  icon: ReactNode
  description: string
  className?: string
}

const TechCard = ({ title, icon, description, className = "" }: TechCardProps) => {
  return (
    <div
      className={`bg-navy-900 border border-gray-700 rounded-lg p-6 hover:border-blue-500 transition-colors ${className}`}
    >
      <div className="flex items-center mb-4">
        <div className="mr-4 text-blue-500">{icon}</div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
      </div>
      <p className="text-gray-300">{description}</p>
    </div>
  )
}

export default TechCard
