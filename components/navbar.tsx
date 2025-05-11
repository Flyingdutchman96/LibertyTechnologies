"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-navy-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-500">LIBERTY</span>
              <span className="text-xl font-bold text-white ml-1">DYNAMICS</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link href="/sentinel-liberator" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              Sentinel Liberator™
            </Link>
            <Link href="/ghostviper" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              GhostViper™
            </Link>
            <Link href="/system" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              Tech Architecture
            </Link>
            <Link href="/investors" className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium">
              Investors
            </Link>
            <Link href="/contact" className="btn-primary text-sm">
              Contact
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-navy-900 border-b border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Home
            </Link>
            <Link
              href="/sentinel-liberator"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Sentinel Liberator™
            </Link>
            <Link
              href="/ghostviper"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              GhostViper™
            </Link>
            <Link
              href="/system"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Tech Architecture
            </Link>
            <Link
              href="/investors"
              className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium"
              onClick={toggleMenu}
            >
              Investors
            </Link>
            <Link
              href="/contact"
              className="text-white bg-blue-600 hover:bg-blue-700 block px-3 py-2 text-base font-medium rounded mt-2"
              onClick={toggleMenu}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
