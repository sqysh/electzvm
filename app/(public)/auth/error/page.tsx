'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { ShieldX, AlertTriangle, HelpCircle } from 'lucide-react'
import { Cubes } from '@/app/components/geometric-backgrounds/Cubes'

// ── Error config ──────────────────────────────────────────────────────────────

const errorMap: Record<string, { title: string; description: string; icon: React.ReactNode }> = {
  AccessDenied: {
    title: 'Access Denied',
    description:
      'Your account is not authorized to access the Elect ZVM admin portal. If you believe this is a mistake, please contact the campaign team.',
    icon: <ShieldX className="w-10 h-10 text-cta-light dark:text-cta-dark" aria-hidden="true" />
  },
  Configuration: {
    title: 'Configuration Error',
    description: 'There is a problem with the server configuration. Please try again later or contact support.',
    icon: <AlertTriangle className="w-10 h-10 text-cta-light dark:text-cta-dark" aria-hidden="true" />
  },
  Verification: {
    title: 'Verification Failed',
    description: 'The sign-in link has expired or has already been used. Please request a new one.',
    icon: <AlertTriangle className="w-10 h-10 text-cta-light dark:text-cta-dark" aria-hidden="true" />
  },
  Default: {
    title: 'Authentication Error',
    description: 'Something went wrong during sign-in. Please try again.',
    icon: <HelpCircle className="w-10 h-10 text-cta-light dark:text-cta-dark" aria-hidden="true" />
  }
}

// ── Error content ─────────────────────────────────────────────────────────────

function AuthErrorContent() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error') ?? 'Default'
  const config = errorMap[error] ?? errorMap.Default

  return (
    <main
      className="relative min-h-screen w-full bg-bg-light dark:bg-bg-dark flex items-center justify-center px-5 py-12 overflow-hidden"
      aria-label="Authentication error"
    >
      {/* Geometric background */}
      <Cubes />

      {/* Radial fade */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 20%, var(--color-bg-light) 80%)' }}
      />
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none hidden dark:block"
        style={{ background: 'radial-gradient(ellipse at center, transparent 20%, var(--color-bg-dark) 80%)' }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-sm flex flex-col items-center gap-8">
        {/* Logo */}
        <Link
          href="/"
          aria-label="Elect ZVM — Home"
          className="font-archivo text-2xl sm:text-3xl font-black uppercase tracking-widest text-text-light dark:text-text-dark hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span>
        </Link>

        {/* Card */}
        <div className="w-full bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark p-8 sm:p-10 flex flex-col items-center gap-6 text-center">
          {/* Icon */}
          <div className="w-16 h-16 flex items-center justify-center border border-cta-light dark:border-cta-dark bg-cta-light/5 dark:bg-cta-dark/5">
            {config.icon}
          </div>

          {/* Error code */}
          <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            Error · {error}
          </p>

          {/* Title */}
          <h1 className="font-archivo text-xl sm:text-2xl font-black uppercase text-text-light dark:text-text-dark leading-tight">
            {config.title}
          </h1>

          {/* Divider */}
          <div aria-hidden="true" className="w-10 h-px bg-border-light dark:bg-border-dark" />

          {/* Description */}
          <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
            {config.description}
          </p>

          {/* Actions */}
          <div className="flex flex-col w-full gap-3 pt-2">
            <Link
              href="/login"
              className="font-archivo w-full px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark transition-opacity duration-200 min-h-11 flex items-center justify-center"
            >
              Try Again
            </Link>
          </div>
        </div>

        {/* Back to site */}
        <Link
          href="/"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          ← Back to ElectZVM.com
        </Link>
      </div>
    </main>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function AuthErrorPage() {
  return (
    <Suspense>
      <AuthErrorContent />
    </Suspense>
  )
}
