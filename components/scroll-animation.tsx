"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"

interface ScrollAnimationProps {
  children: React.ReactNode
  animation?: "fade-in" | "slide-up" | "slide-in"
  delay?: number
  threshold?: number
  className?: string
}

const ScrollAnimation = ({
  children,
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  className = "",
}: ScrollAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      {
        threshold,
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold])

  const getAnimationClass = () => {
    switch (animation) {
      case "fade-in":
        return "opacity-0 transition-opacity duration-1000"
      case "slide-up":
        return "opacity-0 translate-y-10 transition-all duration-1000"
      case "slide-in":
        return "opacity-0 -translate-x-10 transition-all duration-1000"
      default:
        return ""
    }
  }

  const getVisibleClass = () => {
    switch (animation) {
      case "fade-in":
        return "opacity-100"
      case "slide-up":
        return "opacity-100 translate-y-0"
      case "slide-in":
        return "opacity-100 translate-x-0"
      default:
        return ""
    }
  }

  return (
    <div
      ref={ref}
      className={`${className} ${getAnimationClass()} ${isVisible ? getVisibleClass() : ""}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

export default ScrollAnimation
