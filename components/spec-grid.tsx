interface SpecItem {
  feature: string
  value: string
}

interface SpecGridProps {
  specs: SpecItem[]
  className?: string
}

const SpecGrid = ({ specs, className = "" }: SpecGridProps) => {
  return (
    <div className={`overflow-hidden rounded-lg border border-gray-700 ${className}`}>
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-navy-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Feature
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
              Value
            </th>
          </tr>
        </thead>
        <tbody className="bg-navy-900 divide-y divide-gray-700">
          {specs.map((spec, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-navy-900" : "bg-navy-800/50"}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{spec.feature}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{spec.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SpecGrid
