'use client'

import Link from 'next/link'
import { useState } from 'react'

interface LiquidButtonProps {
  href: string
  label: string
  ariaLabel?: string
  external?: boolean
  className?: string
  variant?: 'outline' | 'filled'
  color?: 'cta' | 'primary' | 'secondary'
}

const colorMap = {
  cta: {
    border: 'border-cta-light dark:border-cta-dark',
    bg: 'bg-cta-light dark:bg-cta-dark',
    fill: 'bg-cta-light dark:bg-cta-dark',
    hoverFill: 'bg-cta-hover-light dark:bg-neon-magenta',
    outlineText: 'text-cta-light dark:text-cta-dark'
  },
  primary: {
    border: 'border-primary-light dark:border-primary-dark',
    bg: 'bg-primary-light dark:bg-primary-dark',
    fill: 'bg-primary-light dark:bg-primary-dark',
    hoverFill: 'bg-primary-dark dark:bg-neon-purple',
    outlineText: 'text-primary-light dark:text-primary-dark'
  },
  secondary: {
    border: 'border-secondary-light dark:border-secondary-dark',
    bg: 'bg-secondary-light dark:bg-secondary-dark',
    fill: 'bg-secondary-light dark:bg-secondary-dark',
    hoverFill: 'bg-secondary-dark dark:bg-neon-cyan',
    outlineText: 'text-secondary-light dark:text-secondary-dark'
  }
}

export default function LiquidButton({
  href,
  label,
  ariaLabel,
  external = false,
  className = '',
  variant = 'outline',
  color = 'cta'
}: LiquidButtonProps) {
  const [hovered, setHovered] = useState(false)
  const colors = colorMap[color]

  return (
    <Link
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      aria-label={ariaLabel}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden font-archivo px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current min-h-11 flex items-center shrink-0
        ${colors.border}
        ${variant === 'filled' ? `${colors.bg} text-white` : colors.outlineText}
        ${className}`}
    >
      {/* Liquid fill layer */}
      <span
        aria-hidden="true"
        className={`absolute inset-x-0 bottom-0 transition-all duration-500 ease-in-out
          ${variant === 'filled' ? colors.hoverFill : colors.fill}`}
        style={{ height: hovered ? '100%' : '0%' }}
      />
      {/* Label — mix-blend-difference makes text flip to white when fill covers it */}
      <span className="relative z-10 text-white">{label}</span>
    </Link>
  )
}
