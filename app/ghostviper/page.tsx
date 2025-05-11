import Image from "next/image"
import ScrollAnimation from "@/components/scroll-animation"
import SpecGrid from "@/components/spec-grid"
import CTAButton from "@/components/cta-button"
import DroneSpecs from "@/components/3d/drone-specs"
import DynamicDroneViewer from "@/components/3d/dynamic-drone-viewer"
import { Play, Users } from "lucide-react"

export default function GhostViperPage() {
  const specs = [
    { feature: "Warhead Type", value: "Anti-armor (HEAT) / Fragmentation" },
    { feature: "Navigation", value: "GPS + Visual Targeting" },
    { feature: "Endurance", value: "45 min" },
    { feature: "Swarm Capability", value: "Up to 50 drones / Sentinel" },
    { feature: "Launch Platform", value: "Mobile / Aerial / Fixed" },
    { feature: "Range", value: "30 km" },
    { feature: "Speed", value: "180 km/h" },
    { feature: "Payload", value: "2.5 kg warhead" },
  ]

  const tacticalScenarios = [
    {
      title: "Urban Denial",
      description: "Pinpoint armored targets with minimal collateral damage in urban environments",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Ambush/Flank",
      description: "Launch from camouflaged positions to surprise enemy forces",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      title: "Convoy Disruption",
      description: "Precision kill on mobile platforms with coordinated swarm attacks",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  return (
    <div className="bg-navy-950">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy-950/80 z-10"></div>
          <div className="absolute inset-0 hud-overlay z-20"></div>
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="GhostViper drone swarm"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              GhostViper™
              <span className="block text-2xl md:text-3xl text-blue-500 mt-2">Autonomous Swarm Munition</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Loitering munition platform designed to neutralize armored and ground-based threats with surgical
              precision.
            </p>
          </div>
        </div>
      </section>

      {/* 3D Model Section */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
              <span className="text-blue-500">Interactive</span> 3D Model
            </h2>
          </ScrollAnimation>

          <ScrollAnimation animation="fade-in">
            <div className="mb-12">
              <DynamicDroneViewer />
            </div>
          </ScrollAnimation>

          <ScrollAnimation animation="slide-up" delay={200}>
            <DroneSpecs />
          </ScrollAnimation>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section-padding bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation animation="fade-in">
              <h2 className="text-3xl font-bold text-white mb-6">Precision Strike Platform</h2>
              <p className="text-xl text-gray-300 mb-6">
                GhostViper™ is a loitering munition platform designed to neutralize armored and ground-based threats
                with surgical precision. Operating in swarms or solo, each drone is capable of autonomous navigation,
                target locking, and strike execution.
              </p>
              <p className="text-gray-400 mb-8">
                Integrated with Sentinel Liberator™, GhostViper™ forms a complete autonomous strike system that can
                identify, track, and eliminate high-value targets without putting personnel at risk.
              </p>
              <SpecGrid specs={specs} />
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={300}>
              <div className="relative h-[500px] rounded-lg overflow-hidden border border-gray-700">
                <div className="absolute inset-0 bg-navy-950/30 z-10"></div>
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="GhostViper drone"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <button className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all duration-300 transform hover:scale-110">
                    <Play className="h-8 w-8" />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950 to-transparent p-6 z-20">
                  <p className="text-gray-300 text-sm">Click to view GhostViper™ demonstration video</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Tactical Scenarios */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-4 text-center">Tactical Scenarios</h2>
            <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
              GhostViper™ is designed to excel in a variety of combat scenarios, providing commanders with flexible
              response options.
            </p>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tacticalScenarios.map((scenario, index) => (
              <ScrollAnimation key={index} animation="slide-up" delay={index * 200}>
                <div className="bg-navy-900 rounded-lg overflow-hidden border border-gray-700 h-full">
                  <div className="relative h-48">
                    <Image
                      src={scenario.image || "/placeholder.svg"}
                      alt={scenario.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2">{scenario.title}</h3>
                    <p className="text-gray-300">{scenario.description}</p>
                  </div>
                </div>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      {/* Swarm Capability */}
      <section className="section-padding bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation animation="slide-in">
              <div className="relative h-[400px] rounded-lg overflow-hidden border border-gray-700">
                <div className="absolute inset-0 bg-navy-950/30 z-10"></div>
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="GhostViper swarm simulation"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={300}>
              <div className="flex items-center mb-6">
                <Users className="h-8 w-8 text-blue-500 mr-3" />
                <h2 className="text-3xl font-bold text-white">Swarm Intelligence</h2>
              </div>
              <p className="text-xl text-gray-300 mb-6">
                GhostViper™ units operate as a coordinated swarm, sharing targeting data and adapting to battlefield
                conditions in real-time.
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Distributed decision-making prevents single points of failure</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Simultaneous multi-target engagement capabilities</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Adaptive formation changes based on threat environment</p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Graceful degradation ensures mission completion even with losses</p>
                </li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <CTAButton href="#" variant="primary" className="inline-flex items-center">
                  <Play className="mr-2 h-4 w-4" />
                  View Swarm Simulations
                </CTAButton>
                <CTAButton href="/contact" variant="outline">
                  Talk to a Mission Planner
                </CTAButton>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-navy-800 rounded-lg p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Ready to deploy GhostViper™?</h2>
              <p className="text-gray-300 mb-8">
                Contact our team to discuss how GhostViper™ can be integrated into your defense strategy.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton href="/contact" variant="primary" className="px-8 py-3">
                  Request Information
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
