import Image from "next/image"
import ScrollAnimation from "@/components/scroll-animation"
import CTAButton from "@/components/cta-button"
import { Download, FileText, Video, Calendar, Play } from "lucide-react"

export default function InvestorsPage() {
  return (
    <div className="bg-navy-950">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy-950/80 z-10"></div>
          <div className="absolute inset-0 hud-overlay z-20"></div>
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Liberty Dynamics investor presentation"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Investor Relations
              <span className="block text-2xl md:text-3xl text-blue-500 mt-2">Strategic Investment Opportunity</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Join us in revolutionizing autonomous defense systems for the modern battlefield.
            </p>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollAnimation animation="fade-in">
              <h2 className="text-3xl font-bold text-white mb-6">Company Overview</h2>
              <p className="text-xl text-gray-300 mb-6">
                Backed by military advisors, AI experts, and tactical field engineers, Liberty Dynamics is entering
                production scale. Our solution has sparked interest from NATO-aligned agencies and national defense
                contractors.
              </p>
              <p className="text-gray-400 mb-8">
                Liberty Dynamics is positioned at the intersection of advanced AI, autonomous systems, and defense
                technology. Our proprietary platforms provide unmatched capabilities for surveillance, reconnaissance,
                and precision strike operations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Experienced leadership team with defense and tech backgrounds</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Proprietary technology with strong IP protection</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Established relationships with defense procurement agencies</p>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-1 mr-3">
                    <span className="text-blue-500 text-sm">✓</span>
                  </div>
                  <p className="text-gray-300">Clear path to market with identified customers</p>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={300}>
              <div className="relative h-[500px] rounded-lg overflow-hidden border border-gray-700">
                <div className="absolute inset-0 bg-navy-950/30 z-10"></div>
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Liberty Dynamics team and technology"
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Funding Round */}
      <section className="section-padding bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
              <span className="text-blue-500">Series A</span> Funding Round
            </h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ScrollAnimation animation="slide-in">
              <div className="bg-navy-900 rounded-lg p-8 border border-gray-700 h-full">
                <h3 className="text-2xl font-bold text-white mb-6">Investment Opportunity</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Seeking</h4>
                    <p className="text-gray-300">$15M for scale-up (Series A)</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Pre-money Valuation</h4>
                    <p className="text-gray-300">$75M</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Use of Funds</h4>
                    <ul className="text-gray-300 space-y-2 ml-6 list-disc">
                      <li>Manufacturing scale-up</li>
                      <li>Compliance certifications</li>
                      <li>International operations</li>
                      <li>New drone variant development</li>
                      <li>Expanded AI capabilities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-in" delay={200}>
              <div className="bg-navy-900 rounded-lg p-8 border border-gray-700 h-full">
                <h3 className="text-2xl font-bold text-white mb-6">Traction & Milestones</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Prototype Testing</h4>
                    <p className="text-gray-300">Successfully tested in NATO exercises with positive feedback</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Partnerships</h4>
                    <p className="text-gray-300">MOUs signed with multiple defense buyers</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Intellectual Property</h4>
                    <p className="text-gray-300">Comprehensive patent portfolio covering key technologies</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-blue-400 mb-2">Regulatory</h4>
                    <p className="text-gray-300">Initial compliance certifications obtained</p>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Market Opportunity</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <ScrollAnimation animation="slide-up">
              <div className="bg-navy-800 rounded-lg p-6 border border-gray-700 h-full">
                <div className="text-4xl font-bold text-blue-500 mb-4">$25B+</div>
                <h3 className="text-xl font-semibold text-white mb-2">Unmanned Aerial Systems</h3>
                <p className="text-gray-300">
                  Global market size for military UAVs with projected 12% CAGR through 2030
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={200}>
              <div className="bg-navy-800 rounded-lg p-6 border border-gray-700 h-full">
                <div className="text-4xl font-bold text-blue-500 mb-4">$8B+</div>
                <h3 className="text-xl font-semibold text-white mb-2">Loitering Munitions</h3>
                <p className="text-gray-300">
                  Rapidly growing segment with increased adoption following recent conflicts
                </p>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-up" delay={400}>
              <div className="bg-navy-800 rounded-lg p-6 border border-gray-700 h-full">
                <div className="text-4xl font-bold text-blue-500 mb-4">$18B+</div>
                <h3 className="text-xl font-semibold text-white mb-2">Military AI Applications</h3>
                <p className="text-gray-300">
                  Emerging market with strong government investment and strategic priority
                </p>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Downloadables */}
      <section className="section-padding bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <h2 className="text-3xl font-bold text-white mb-12 text-center">Investor Materials</h2>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ScrollAnimation animation="fade-in">
              <div className="bg-navy-900 rounded-lg p-6 border border-gray-700 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Pitch Deck</h3>
                </div>
                <p className="text-gray-300 mb-6 flex-grow">
                  Comprehensive overview of Liberty Dynamics' technology, market opportunity, and growth strategy.
                </p>
                <CTAButton href="#" variant="outline" className="inline-flex items-center mt-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </CTAButton>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={200}>
              <div className="bg-navy-900 rounded-lg p-6 border border-gray-700 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Executive Summary</h3>
                </div>
                <p className="text-gray-300 mb-6 flex-grow">
                  Concise overview of the investment opportunity, market analysis, and financial projections.
                </p>
                <CTAButton href="#" variant="outline" className="inline-flex items-center mt-auto">
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </CTAButton>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="fade-in" delay={400}>
              <div className="bg-navy-900 rounded-lg p-6 border border-gray-700 flex flex-col h-full">
                <div className="flex items-center mb-4">
                  <Video className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-xl font-semibold text-white">Test Deployment</h3>
                </div>
                <p className="text-gray-300 mb-6 flex-grow">
                  Video demonstration of Liberty Dynamics' systems in action during field testing.
                </p>
                <CTAButton href="#" variant="outline" className="inline-flex items-center mt-auto">
                  <Play className="mr-2 h-4 w-4" />
                  Watch Video
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">Interested in investing?</h2>
              <p className="text-gray-300 mb-8">
                Schedule a call with our founders to discuss the investment opportunity in detail.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <CTAButton href="/contact" variant="primary" className="px-8 py-3 inline-flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Call with Founders
                </CTAButton>
                <CTAButton href="#" variant="outline" className="px-8 py-3">
                  Access Full Data Room
                </CTAButton>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
