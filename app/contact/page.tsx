"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import ScrollAnimation from "@/components/scroll-animation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, Shield } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    organization: "",
    role: "",
    email: "",
    reason: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, reason: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
    alert("Thank you for your message. Our team will contact you shortly.")
    setFormData({
      name: "",
      organization: "",
      role: "",
      email: "",
      reason: "",
      message: "",
    })
  }

  return (
    <div className="bg-navy-950">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-navy-950/80 z-10"></div>
          <div className="absolute inset-0 hud-overlay z-20"></div>
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Contact Liberty Dynamics"
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-30">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Contact Us
              <span className="block text-2xl md:text-3xl text-blue-500 mt-2">Secure Communications Channel</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Get in touch with our team to discuss how Liberty Dynamics can enhance your defense capabilities.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-navy-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <ScrollAnimation animation="fade-in" className="lg:col-span-2">
              <div className="bg-navy-800 rounded-lg p-8 border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-300">
                        Name
                      </label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="bg-navy-900 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="organization" className="text-sm font-medium text-gray-300">
                        Organization
                      </label>
                      <Input
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                        className="bg-navy-900 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="role" className="text-sm font-medium text-gray-300">
                        Role
                      </label>
                      <Input
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        required
                        className="bg-navy-900 border-gray-700 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-300">
                        Email
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="bg-navy-900 border-gray-700 text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="reason" className="text-sm font-medium text-gray-300">
                      Reason for Contact
                    </label>
                    <Select onValueChange={handleSelectChange} value={formData.reason}>
                      <SelectTrigger className="bg-navy-900 border-gray-700 text-white">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent className="bg-navy-800 border-gray-700 text-white">
                        <SelectItem value="investor">Investor</SelectItem>
                        <SelectItem value="demo">Demo Request</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="media">Media</SelectItem>
                        <SelectItem value="clearance">Clearance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-300">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="bg-navy-900 border-gray-700 text-white"
                    />
                  </div>

                  <div className="flex items-center space-x-2 mb-6">
                    <Shield className="h-5 w-5 text-blue-500" />
                    <span className="text-sm text-gray-400">Secure, encrypted communication channel</span>
                  </div>

                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2">
                    Submit
                  </Button>
                </form>
              </div>
            </ScrollAnimation>

            <ScrollAnimation animation="slide-in" delay={300}>
              <div className="bg-navy-800 rounded-lg p-8 border border-gray-700 h-full">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Information</h2>
                <div className="space-y-8">
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 text-blue-500 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Headquarters</h3>
                      <p className="text-gray-300">
                        1250 Defense Innovation Blvd
                        <br />
                        Suite 500
                        <br />
                        Arlington, VA 22209
                        <br />
                        United States
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-6 w-6 text-blue-500 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Secure Line</h3>
                      <p className="text-gray-300">+1 (703) 555-0123</p>
                      <p className="text-gray-400 text-sm mt-1">Mon-Fri, 9:00 AM - 5:00 PM EST</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-6 w-6 text-blue-500 mr-4 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-1">Email</h3>
                      <p className="text-gray-300">contact@libertydynamics.com</p>
                      <p className="text-gray-400 text-sm mt-1">For secure communications, use our PGP key</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-4">Partner Portal</h3>
                    <p className="text-gray-300 mb-4">
                      Existing partners can access secure documentation and resources through our partner portal.
                    </p>
                    <Button className="bg-navy-900 hover:bg-navy-800 text-white border border-gray-700">
                      Access Partner Portal
                    </Button>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-navy-950">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollAnimation>
            <div className="relative h-[400px] rounded-lg overflow-hidden border border-gray-700">
              <div className="absolute inset-0 bg-navy-950/30 z-10"></div>
              <Image
                src="/placeholder.svg?height=400&width=1200"
                alt="Liberty Dynamics headquarters location"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-navy-900/90 p-4 rounded-lg border border-gray-700 z-20">
                <h3 className="text-lg font-semibold text-white mb-1">Liberty Dynamics HQ</h3>
                <p className="text-gray-300 text-sm">
                  1250 Defense Innovation Blvd
                  <br />
                  Arlington, VA 22209
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </div>
  )
}
