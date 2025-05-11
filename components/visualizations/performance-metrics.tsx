"use client"
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const responseTimeData = [
  { name: "Target Acquisition", current: 1.2, previous: 3.5 },
  { name: "Threat Analysis", current: 0.8, previous: 2.2 },
  { name: "Decision Making", current: 0.5, previous: 1.8 },
  { name: "Strike Execution", current: 1.5, previous: 4.2 },
  { name: "Mission Assessment", current: 0.9, previous: 2.5 },
]

const accuracyData = [
  { name: "Infantry", current: 98, previous: 85 },
  { name: "Light Vehicles", current: 96, previous: 82 },
  { name: "Armor", current: 94, previous: 78 },
  { name: "Artillery", current: 92, previous: 75 },
  { name: "Air Defense", current: 90, previous: 70 },
]

const reliabilityData = [
  { month: "Jan", uptime: 99.2, failures: 2 },
  { month: "Feb", uptime: 99.5, failures: 1 },
  { month: "Mar", uptime: 99.7, failures: 1 },
  { month: "Apr", uptime: 99.8, failures: 0 },
  { month: "May", uptime: 99.9, failures: 0 },
  { month: "Jun", uptime: 100, failures: 0 },
]

export default function PerformanceMetrics() {
  return (
    <div className="bg-navy-900 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-6 text-center">System Performance Metrics</h3>

      <Tabs defaultValue="response" className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="response">Response Time</TabsTrigger>
          <TabsTrigger value="accuracy">Target Accuracy</TabsTrigger>
          <TabsTrigger value="reliability">System Reliability</TabsTrigger>
        </TabsList>

        <TabsContent value="response">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimeData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} />
                <YAxis
                  tick={{ fill: "#9ca3af" }}
                  label={{
                    value: "Time (seconds)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#9ca3af",
                  }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#172554",
                    borderColor: "#3b82f6",
                    borderRadius: "0.375rem",
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Bar name="Current System" dataKey="current" fill="#3b82f6" />
                <Bar name="Previous Generation" dataKey="previous" fill="#6b7280" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center text-gray-400 text-sm">Lower response times indicate better performance</div>
        </TabsContent>

        <TabsContent value="accuracy">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={accuracyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" tick={{ fill: "#9ca3af" }} />
                <YAxis
                  tick={{ fill: "#9ca3af" }}
                  label={{
                    value: "Accuracy (%)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#9ca3af",
                  }}
                  domain={[0, 100]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#172554",
                    borderColor: "#3b82f6",
                    borderRadius: "0.375rem",
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Bar name="Current System" dataKey="current" fill="#3b82f6" />
                <Bar name="Previous Generation" dataKey="previous" fill="#6b7280" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center text-gray-400 text-sm">
            Higher percentages indicate better target identification accuracy
          </div>
        </TabsContent>

        <TabsContent value="reliability">
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={reliabilityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" tick={{ fill: "#9ca3af" }} />
                <YAxis
                  yAxisId="left"
                  tick={{ fill: "#9ca3af" }}
                  label={{
                    value: "Uptime (%)",
                    angle: -90,
                    position: "insideLeft",
                    fill: "#9ca3af",
                  }}
                  domain={[98, 100]}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tick={{ fill: "#9ca3af" }}
                  label={{
                    value: "System Failures",
                    angle: 90,
                    position: "insideRight",
                    fill: "#9ca3af",
                  }}
                  domain={[0, 5]}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#172554",
                    borderColor: "#3b82f6",
                    borderRadius: "0.375rem",
                    color: "#fff",
                  }}
                />
                <Legend wrapperStyle={{ color: "#fff" }} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="uptime"
                  name="System Uptime"
                  stroke="#3b82f6"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="failures"
                  name="System Failures"
                  stroke="#ef4444"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-center text-gray-400 text-sm">
            Increasing uptime and decreasing failures indicate improved system reliability
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
