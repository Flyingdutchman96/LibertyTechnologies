import Image from "next/image"
import ScrollAnimation from "@/components/scroll-animation"
import SpecGrid from "@/components/spec-grid"
import CTAButton from "@/components/cta-button"
import DroneSpecs from "@/components/3d/drone-specs"
import DynamicDroneViewer from "@/components/3d/dynamic-drone-viewer"
import { Download, Calendar } from "lucide-react"

export default function SentinelLiberatorPage() {
  const specs = [
    { feature: "Max Flight Time", value: "24+ hours" },
    { feature: "Operational Altitude", value: "60,000 ft (18 km)" },
    { feature: "Sensors", value: "EO/IR, LiDAR, SIGINT, SAR" },
    { feature: "Autonomy Level", value: "Full autonomous + override" },
    { feature: "Data Link", value: "Encrypted SATCOM uplink" },
    { feature: "Wingspan", value: "25 meters" },
    { feature: "Propulsion", value: "Electric motors with solar augmentation" },
    { feature: "Payload Capacity", value: "180 kg" },
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
            alt="Sentinel Liberator in flight"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Sentinel Liberator™
              <span className="block text-2xl md:text-3xl text-blue-500 mt-2">High-Altitude Intelligence Platform</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Unmatched persistence and wide-area surveillance, designed to operate undetected above contested airspace.
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

      {/* Specifications Section */}
      <section className="section-padding bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation animation="fade-in">
              <h2 className="text-3xl font-bold text-white mb-8">Key Specifications</h2>
              <SpecGrid specs={specs} className="mb-8" />
              <div className="flex flex-wrap gap-4 mt-8">
                <CTAButton href="#" variant="primary" className="inline-flex items-center">
                  <Download className="mr-2 h-4 w-4" />
                  Download Full Datasheet
                </CTAButton>
                <CTAButton href="/contact" variant="outline" className="inline-flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Air Ops Demo
                </CTAButton>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={300}>
              <div className="relative h-[500px] rounded-lg overflow-hidden border border-gray-700">
                <div className="absolute inset-0 bg-navy-950/30 z-10"></div>
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Sentinel Liberator 3D model"
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-navy-950 to-transparent p-6 z-20">
                  <p className="text-gray-300 text-sm">Interactive 3D model available during live demonstrations</p>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              <span className="text-blue-500">Persistent</span> Surveillance
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation animation="slide-in">
              <div className="prose prose-invert max-w-none">
                <p className="text-xl text-gray-300 mb-6">
                  Sentinel Liberator™ provides unmatched persistence and wide-area surveillance. Designed to operate
                  undetected above contested airspace, it autonomously scans, classifies, and geo-tags targets—acting as
                  both scout and command node for tactical drone swarms.
                </p>
                <p className="text-gray-400 mb-6">
                  With its advanced sensor suite including electro-optical/infrared cameras, synthetic aperture radar,
                  and signals intelligence capabilities, Sentinel Liberator™ can detect and track multiple targets
                  simultaneously across vast areas.
                </p>
                <p className="text-gray-400 mb-6">
                  The platform's high operational altitude of 60,000 feet (18 km) places it well above commercial air
                  traffic and most air defense systems, allowing for covert operation in sensitive areas.
                </p>
                <p className="text-gray-400">
                  Powered by a combination of electric motors and solar panels, Sentinel Liberator™ can remain airborne
                  for more than 24 hours, providing continuous surveillance and target acquisition capabilities.
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={300}>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Sentinel Liberator sensor view"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Sentinel Liberator in flight"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Sentinel Liberator control interface"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=300&width=400"
                    alt="Sentinel Liberator technical diagram"
                    fill
                    className="object-cover"
                  />
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                Ready to see Sentinel Liberator™ in action?
              </h2>
              <p className="text-gray-300 mb-8">
                Schedule a demonstration with our team to see how Sentinel Liberator™ can enhance your surveillance and
                reconnaissance capabilities.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton href="/contact" variant="primary" className="px-8 py-3">
                  Request a Demo
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
