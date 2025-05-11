import Image from "next/image"
import ScrollAnimation from "@/components/scroll-animation"
import TechCard from "@/components/tech-card"
import CTAButton from "@/components/cta-button"
import { Brain, Eye, Zap, Shield, Radio } from "lucide-react"
import NetworkDiagram from "@/components/visualizations/network-diagram"
import CapabilitiesRadar from "@/components/visualizations/radar-chart"
import MissionTimeline from "@/components/visualizations/mission-timeline"
import ThreatHeatmap from "@/components/visualizations/threat-heatmap"
import PerformanceMetrics from "@/components/visualizations/performance-metrics"
import DataFlowDiagram from "@/components/visualizations/data-flow-diagram"
import DynamicMissionSimulator from "@/components/mission-simulation/dynamic-mission-simulator"

export default function SystemPage() {
  const techComponents = [
    {
      title: "Sensors",
      icon: <Eye className="h-6 w-6" />,
      description:
        "Multi-spectral sensor suite including EO/IR cameras, synthetic aperture radar, and signals intelligence for comprehensive battlefield awareness.",
    },
    {
      title: "Target AI",
      icon: <Brain className="h-6 w-6" />,
      description:
        "Advanced neural networks trained on millions of data points to accurately identify and classify targets in complex environments.",
    },
    {
      title: "Strike Logic",
      icon: <Zap className="h-6 w-6" />,
      description:
        "Autonomous decision-making algorithms that determine optimal attack vectors and munition deployment for maximum effectiveness.",
    },
    {
      title: "Swarm Coordination",
      icon: <Radio className="h-6 w-6" />,
      description:
        "Distributed command and control system enabling coordinated action across multiple platforms without central point of failure.",
    },
    {
      title: "Data Encryption",
      icon: <Shield className="h-6 w-6" />,
      description:
        "Military-grade encryption protocols securing all communications and preventing unauthorized access or interference.",
    },
  ]

  return (
    <div className="bg-navy-950">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy-950/80 z-10"></div>
          <div className="absolute inset-0 hud-overlay z-20"></div>
          <div className="absolute inset-0 grid-pattern z-30"></div>
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="System architecture visualization"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              System Architecture
              <span className="block text-2xl md:text-3xl text-blue-500 mt-2">Unified Autonomy Core</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              The integrated intelligence behind Liberty Dynamics' autonomous defense systems.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Simulation Section */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              <span className="text-blue-500">Mission</span> Simulation
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in">
            <DynamicMissionSimulator />
          </ScrollAnimation>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="section-padding bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              <span className="text-blue-500">Unified</span> Autonomy Core
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation animation="fade-in">
              <p className="text-xl text-gray-300 mb-6">
                At the heart of Liberty Dynamics is a battlefield-tested autonomy engine powered by proprietary neural
                vision models and decentralized swarm logic. All mission-critical actions remain auditable and can be
                overridden by human operators.
              </p>
              <p className="text-gray-400 mb-8">
                Our system architecture integrates multiple autonomous platforms into a cohesive network, enabling
                seamless coordination between high-altitude surveillance assets and precision strike capabilities.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Real-time target acquisition and tracking</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Secure, encrypted communications</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Distributed decision-making algorithms</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Human oversight with manual override capabilities</p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={300}>
              <NetworkDiagram />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* System Capabilities */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              <span className="text-blue-500">System</span> Capabilities
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ScrollAnimation animation="fade-in">
              <CapabilitiesRadar />
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={200}>
              <PerformanceMetrics />
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Tech Components */}
      <section className="section-padding bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Core Technology Components</h2>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              Our integrated system combines multiple advanced technologies to deliver unmatched battlefield
              capabilities.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techComponents.map((component, index) => (
              <ScrollAnimation key={index} animation="slide-up" delay={index * 100}>
                <TechCard title={component.title} icon={component.icon} description={component.description} />
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Timeline */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              <span className="text-blue-500">Mission</span> Execution
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in">
            <MissionTimeline />
          </ScrollAnimation>
        </div>
      </section>

      {/* Threat Analysis */}
      <section className="section-padding bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              <span className="text-blue-500">Threat</span> Analysis
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in">
            <ThreatHeatmap />
          </ScrollAnimation>
        </div>
      </section>

      {/* Data Flow */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              <span className="text-blue-500">Operational</span> Data Flow
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in">
            <DataFlowDiagram />
          </ScrollAnimation>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-800 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Want to learn more about our technology?
              </h2>
              <p className="text-gray-300 mb-8">
                Request our detailed architecture whitepaper or explore partnership opportunities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton href="#" variant="primary" className="px-8 py-3">
                  Request Architecture Whitepaper
                </CTAButton>
                <CTAButton href="/contact" variant="outline" className="px-8 py-3">
                  Partner with Us
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
