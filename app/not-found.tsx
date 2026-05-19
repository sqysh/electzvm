import Link from 'next/link'
import type { Metadata } from 'next'
import { Cubes } from './components/geometric-backgrounds/Cubes'

export const metadata: Metadata = {
  title: '404 — Page Not Found | Elect ZVM',
  description: 'The page you are looking for does not exist.'
}

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen w-full bg-hero-light dark:bg-hero-dark flex flex-col items-center justify-center relative overflow-hidden px-5"
    >
      {/* Geometric background */}
      <Cubes />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-hero-light dark:from-hero-dark to-transparent"
      />

      <div className="relative z-10 flex flex-col items-center gap-8 text-center max-w-lg">
        {/* Big 404 */}
        <p
          aria-hidden="true"
          className="font-archivo text-[120px] sm:text-[180px] font-black uppercase leading-none text-white/5 select-none -mb-8 sm:-mb-16"
        >
          404
        </p>

        {/* Text */}
        <div className="flex flex-col gap-3">
          <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
            Page Not Found · Elect ZVM
          </p>
          <h1 className="font-archivo text-3xl xs:text-4xl sm:text-5xl font-black uppercase text-white leading-none">
            This page doesn&apos;t <span className="text-primary-dark">exist.</span>
          </h1>
          <p className="font-inter text-sm text-white/40 leading-relaxed mt-2 max-w-sm mx-auto">
            The page you&apos;re looking for may have been moved or never existed. Head back home to learn about
            Zosia&apos;s campaign.
          </p>
        </div>

        {/* Divider */}
        <div aria-hidden="true" className="w-12 h-px bg-cta-dark" />

        {/* CTAs */}
        <div className="flex flex-col xs:flex-row items-center gap-3 w-full xs:w-auto">
          <Link
            href="/"
            className="w-full xs:w-auto font-archivo text-[10px] tracking-widest uppercase px-6 py-3 border border-white/20 text-white hover:border-primary-dark hover:text-primary-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-11 flex items-center justify-center"
          >
            ← Back to Home
          </Link>
          <Link
            href="/contact"
            className="w-full xs:w-auto font-archivo text-[10px] tracking-widest uppercase px-6 py-3 border border-cta-dark text-cta-dark hover:bg-cta-dark/10 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-dark min-h-11 flex items-center justify-center"
          >
            Get Involved →
          </Link>
        </div>

        {/* Sqysh */}

        <a
          href="https://sqysh.io?lead_source=electzvm"
          target="_blank"
          rel="noopener noreferrer"
          className="font-archivo text-[9px] tracking-widest uppercase text-white/20 hover:text-primary-dark transition-colors"
        >
          Built by <span className="text-primary-dark/60">Sqysh</span>
        </a>
      </div>
    </main>
  )
}
