import Image from "next/image"
import ScrollAnimation from "@/components/scroll-animation"
import CTAButton from "@/components/cta-button"
import DynamicMissionSimulator from "@/components/mission-simulation/dynamic-mission-simulator"
import { Shield, Target, Eye, Zap } from "lucide-react"

export default function MissionSimulationPage() {
  return (
    <div className="bg-navy-950">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy-950/80 z-10"></div>
          <div className="absolute inset-0 hud-overlay z-20"></div>
          <div className="absolute inset-0 grid-pattern z-30"></div>
          <Image
            src="/assets/mission-simulation-hero.png"
            alt="Liberty Dynamics mission simulation"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Mission Simulation
              <span className="block text-2xl md:text-3xl text-blue-500 mt-2">From Surveillance to Strike</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Experience the complete operational flow of Liberty Dynamics' autonomous defense system.
            </p>
          </div>
        </div>
      </section>

      {/* Simulation Section */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              <span className="text-blue-500">Interactive</span> Mission Simulation
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in">
            <DynamicMissionSimulator />
          </ScrollAnimation>
        </div>
      </section>

      {/* Mission Phases */}
      <section className="section-padding bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              <span className="text-blue-500">Mission</span> Phases
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation animation="fade-in">
              <div className="bg-navy-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <Eye className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-bold text-white">Surveillance & Detection</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  The Sentinel Liberator™ conducts high-altitude reconnaissance, scanning the battlefield with advanced
                  multi-spectral sensors to identify potential targets.
                </p>
                <div className="relative h-48 rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src="/assets/surveillance-phase.png"
                    alt="Surveillance phase visualization"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={200}>
              <div className="bg-navy-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <Target className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-bold text-white">Target Classification</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  AI-powered systems analyze sensor data to classify targets, determine threat levels, and prioritize
                  based on mission parameters.
                </p>
                <div className="relative h-48 rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src="/assets/classification-phase.png"
                    alt="Target classification visualization"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={300}>
              <div className="bg-navy-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <Zap className="h-8 w-8 text-red-500 mr-3" />
                  <h3 className="text-xl font-bold text-white">Strike Execution</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  GhostViper™ units are deployed and navigate to the target area using terrain masking before executing
                  a coordinated precision strike.
                </p>
                <div className="relative h-48 rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src="/assets/strike-phase.png"
                    alt="Strike execution visualization"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={400}>
              <div className="bg-navy-800 rounded-lg p-6 border border-gray-700">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-bold text-white">Battle Damage Assessment</h3>
                </div>
                <p className="text-gray-300 mb-6">
                  Sentinel Liberator™ confirms target neutralization, assesses results, and provides real-time mission
                  effectiveness data.
                </p>
                <div className="relative h-48 rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src="/assets/assessment-phase.png"
                    alt="Battle damage assessment visualization"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Technical Details */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation animation="fade-in">
              <h2 className="text-3xl font-bold text-white mb-6">Technical Specifications</h2>
              <p className="text-xl text-gray-300 mb-6">
                The mission simulation demonstrates the complete operational capabilities of Liberty Dynamics'
                integrated autonomous defense system.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Real-time target acquisition and tracking with sub-meter precision</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">AI-powered target classification with 98.5% accuracy</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Autonomous strike coordination with swarm intelligence</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">End-to-end mission execution in under 15 minutes</p>
                </div>
              </div>
              <CTAButton href="/system" variant="primary" className="inline-flex items-center">
                Explore Full System Architecture
              </CTAButton>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={300}>
              <div className="relative h-[500px] rounded-lg overflow-hidden border border-gray-700">
                <div className="absolute inset-0 bg-navy-950/30 z-10"></div>
                <Image
                  src="/assets/mission-technical.png"
                  alt="Mission technical visualization"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950 to-transparent p-6 z-20">
                  <p className="text-gray-300 text-sm">
                    Advanced visualization of Liberty Dynamics' integrated mission execution system
                  </p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-800 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to see a live demonstration?</h2>
              <p className="text-gray-300 mb-8">
                Contact our team to schedule a live demonstration of Liberty Dynamics' autonomous defense system.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton href="/contact" variant="primary" className="px-8 py-3">
                  Schedule Live Demo
                </CTAButton>
                <CTAButton href="/system" variant="outline" className="px-8 py-3">
                  Explore System Architecture
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
