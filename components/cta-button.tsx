import type React from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface CTAButtonProps {
  href: string
  variant?: "primary" | "secondary" | "outline"
  children: React.ReactNode
  className?: string
  withArrow?: boolean
}

const CTAButton = ({ href, variant = "primary", children, className = "", withArrow = false }: CTAButtonProps) => {
  const baseClasses = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
  }

  return (
    <Link href={href} className={`${baseClasses[variant]} inline-flex items-center ${className}`}>
      {children}
      {withArrow && <ArrowRight className="ml-2 h-4 w-4" />}
    </Link>
  )
}

export default CTAButton
