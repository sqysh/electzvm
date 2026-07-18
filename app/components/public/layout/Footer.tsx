'use client'

import Link from 'next/link'
import LiquidButton from '@/app/components/elements/LiquidButton'
import { navLinks } from '../../../lib/constants/navigation.contants'
import { Cubes } from '../../geometric-backgrounds/Cubes'

export function Footer() {
  return (
    <footer className="relative w-full bg-hero-light dark:bg-hero-dark border-t border-white/10 overflow-hidden">
      {/* Geometric background */}
      <Cubes />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-16">
        {/* Main content */}
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-12 py-16 sm:py-20">
          {/* Left — logo + tagline + nav */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <Link
                href="/"
                aria-label="Elect ZVM — Home"
                className="font-archivo text-3xl sm:text-4xl font-black uppercase tracking-widest text-white hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white w-fit"
              >
                Elect<span className="text-primary-dark">ZVM</span>
              </Link>
              <p className="font-archivo text-[11px] tracking-[0.2em] uppercase text-white/40">
                For State Representative · 9th Essex District
              </p>
            </div>

            {/* Nav links */}
            <nav aria-label="Footer navigation">
              <ul role="list" className="flex flex-wrap gap-x-6 gap-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-archivo text-[10px] tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Right — CTA */}
          <div className="flex flex-col gap-4 sm:items-end justify-start">
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-white/40">Primary · Sept 1, 2026</p>
            <LiquidButton
              href="https://secure.actblue.com/donate/2teamzvm"
              label="Donate →"
              color="cta"
              variant="filled"
              external
              ariaLabel="Donate to Zosia VanMeter's campaign (opens in new tab)"
            />
            <a
              href="https://www.sec.state.ma.us/ovr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Register to vote in Massachusetts (opens in new tab)"
              className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-dark"
            >
              Register to Vote →
            </a>
          </div>
        </div>

        {/* Divider */}
        <div aria-hidden="true" className="h-px bg-white/10" />

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-4 py-5">
          <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-white/20">Forward. Together.</span>
          <div className="flex items-center gap-4">
            <Link
              href="/privacy"
              className="font-archivo text-[10px] tracking-widests uppercase text-white/20 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-archivo text-[10px] tracking-widests uppercase text-white/20 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Terms
            </Link>

            <a
              href="https://sqysh.io"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Built by Sqysh (opens in new tab)"
              className="font-archivo text-[10px] tracking-widests uppercase text-white/20 hover:text-primary-dark transition-colors duration-200"
            >
              Built by <span className="text-primary-dark">Sqysh</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
