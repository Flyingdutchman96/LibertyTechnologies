import Link from "next/link"
import { Shield, Lock } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-navy-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold text-blue-500">LIBERTY</span>
              <span className="text-xl font-bold text-white ml-1">DYNAMICS</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Advanced autonomous defense systems combining persistent high-altitude surveillance with AI-guided ground
              attack capabilities.
            </p>
            <div className="flex items-center text-gray-500 text-sm">
              <Lock className="h-4 w-4 mr-1" />
              <span>Secure Communications Protocol</span>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Products</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sentinel-liberator" className="text-gray-400 hover:text-white">
                  Sentinel Liberator™
                </Link>
              </li>
              <li>
                <Link href="/ghostviper" className="text-gray-400 hover:text-white">
                  GhostViper™
                </Link>
              </li>
              <li>
                <Link href="/system" className="text-gray-400 hover:text-white">
                  System Architecture
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-300 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/investors" className="text-gray-400 hover:text-white">
                  Investors
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
              <li>
                <div className="flex items-center text-gray-400">
                  <Shield className="h-4 w-4 mr-1" />
                  <span>ISO 27001 Certified</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Liberty Dynamics. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link href="#" className="text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              Export Compliance
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
