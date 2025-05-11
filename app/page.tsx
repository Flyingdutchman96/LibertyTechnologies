import Image from "next/image"
import TypedText from "@/components/typed-text"
import CTAButton from "@/components/cta-button"
import ScrollAnimation from "@/components/scroll-animation"
import { ArrowDown, Eye, Target, Shield, Zap } from "lucide-react"

export default function Home() {
  return (
    <div className="bg-navy-950">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy-950/80 z-10"></div>
          <div className="absolute inset-0 hud-overlay z-20"></div>
          <div className="absolute inset-0 grid-pattern z-30"></div>
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Sentinel Liberator flying above clouds"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Freedom from Above. <br />
              <span className="text-blue-500">Force with Precision.</span>
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Sentinel Liberator™ and GhostViper™ form an autonomous strike system combining persistent high-altitude
              surveillance with AI-guided ground attack capabilities.
            </p>
            <div className="mb-8 text-blue-400 text-lg">
              <TypedText strings={["Autonomous", "Coordinated", "Lethal", "Unseen"]} />
            </div>
            <div className="flex flex-wrap gap-4">
              <CTAButton href="/investors" variant="primary">
                Request Investor Deck
              </CTAButton>
              <CTAButton href="/contact" variant="secondary">
                Schedule Live Demo
              </CTAButton>
              <CTAButton href="#system-overview" variant="outline" withArrow>
                Explore the System
              </CTAButton>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-40 animate-bounce">
          <a href="#system-overview" className="text-gray-400 hover:text-white">
            <ArrowDown className="h-8 w-8" />
          </a>
        </div>
      </section>

      {/* System Overview Section */}
      <section id="system-overview" className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="text-white">Coordinated </span>
              <span className="text-blue-500">Autonomy in Action</span>
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation animation="slide-in" className="order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -inset-4 bg-blue-500/5 rounded-lg z-0"></div>
                <div className="relative z-10 bg-navy-950 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-2xl font-bold text-white mb-4">Strike Flow</h3>
                  <div className="space-y-8">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <span className="text-blue-500 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Sentinel Liberator™</h4>
                        <p className="text-gray-300">High-altitude surveillance platform scanning the battlefield</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <span className="text-blue-500 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Real-time GPS coordinate tagging</h4>
                        <p className="text-gray-300">Precise location data for identified targets</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <span className="text-blue-500 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Target classification</h4>
                        <p className="text-gray-300">
                          AI-powered identification of infantry, armor, and static targets
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <span className="text-blue-500 font-bold">4</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">GhostViper™ swarm launch</h4>
                        <p className="text-gray-300">Coordinated deployment of autonomous strike drones</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                        <span className="text-blue-500 font-bold">5</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Autonomous navigation & precision strike</h4>
                        <p className="text-gray-300">Self-guided munitions execute surgical elimination of targets</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={300} className="order-1 lg:order-2">
              <div className="relative h-[400px] md:h-[500px] rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-navy-950/50 z-10"></div>
                <div className="absolute inset-0 hud-overlay z-20"></div>
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Digital terrain map with target overlays"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 z-30 flex items-center justify-center">
                  <div className="max-w-md text-center p-6">
                    <p className="text-gray-200 mb-4">
                      Sentinel Liberator™ scans the battlefield from 18km above, detecting and classifying threats. It
                      transmits encrypted coordinates to a GhostViper™ swarm that executes autonomous, surgical strikes
                      on high-value targets.
                    </p>
                    <CTAButton href="/system" variant="primary" className="mt-4">
                      View Technical Details
                    </CTAButton>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Products Overview */}
      <section className="section-padding bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
              <span className="text-white">Advanced </span>
              <span className="text-blue-500">Defense Systems</span>
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation animation="slide-up" delay={200}>
              <div className="bg-navy-900 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <div className="relative h-64">
                  <Image
                    src="/placeholder.svg?height=400&width=600"
                    alt="Sentinel Liberator"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">Sentinel Liberator™</h3>
                    <p className="text-blue-400">High-Altitude Intelligence Platform</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Eye className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-300">24+ hours flight time</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Target className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-300">Advanced EO/IR, LiDAR, SIGINT sensors</span>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Provides unmatched persistence and wide-area surveillance. Designed to operate undetected above
                    contested airspace.
                  </p>
                  <CTAButton href="/sentinel-liberator" variant="outline" withArrow>
                    View Specifications
                  </CTAButton>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={400}>
              <div className="bg-navy-900 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300">
                <div className="relative h-64">
                  <Image src="/placeholder.svg?height=400&width=600" alt="GhostViper" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 className="text-2xl font-bold text-white">GhostViper™</h3>
                    <p className="text-blue-400">Autonomous Swarm Munition</p>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Shield className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-300">Anti-armor (HEAT) / Fragmentation warhead</span>
                  </div>
                  <div className="flex items-center mb-4">
                    <Zap className="h-5 w-5 text-blue-500 mr-2" />
                    <span className="text-gray-300">Swarm capability up to 50 drones</span>
                  </div>
                  <p className="text-gray-400 mb-6">
                    Loitering munition platform designed to neutralize armored and ground-based threats with surgical
                    precision.
                  </p>
                  <CTAButton href="/ghostviper" variant="outline" withArrow>
                    View Specifications
                  </CTAButton>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <div className="mt-16 text-center">
            <ScrollAnimation>
              <CTAButton href="/system" variant="primary" className="px-8 py-3">
                Explore System Architecture
              </CTAButton>
            </ScrollAnimation>
          </div>
        </div>
      </section>
    </div>
  )
}
