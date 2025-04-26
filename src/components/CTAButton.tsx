"use client"

import React from "react"

interface CTAButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode
  href: string
  className?: string
}

export default function CTAButton({ children, href, className = "", ...props }: CTAButtonProps) {
  return (
    <a
      href={href}
      className={`ctaButton ${className}`.trim()}
      {...props}
    >
      {children}
    </a>
  )
}
