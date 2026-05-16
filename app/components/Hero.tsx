'use client'

import { motion } from 'framer-motion'
import Picture from './elements/Picture'
import HeroTicker from './HeroTicker'
import Link from 'next/link'
import { navLinks } from '../lib/constants/navigation.contants'
import { fadeIn, fadeUp } from '../lib/constants/motion.constants'
import { useState } from 'react'
import { Menu } from 'lucide-react'
import NavigationDrawer from './NavigationDrawer'
import Spline from '@splinetool/react-spline'

export default function Hero({
  eyebrow,
  firstName,
  lastName
}: {
  eyebrow: string
  firstName: string
  lastName: string
}) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const onClose = () => setDrawerOpen(false)

  return (
    <>
      <NavigationDrawer onClose={onClose} open={drawerOpen} />

      <section
        aria-label="Campaign hero for Zosia VanMeter, candidate for State Representative"
        className="relative w-full overflow-hidden bg-hero-light dark:bg-hero-dark flex sm:items-center min-h-screen md:min-h-0 md:h-212.5 flex-col"
      >
        <header className="w-full relative z-10">
          <nav
            aria-label="Main navigation"
            className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 h-16 sm:h-20 flex items-center justify-between gap-8"
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Elect ZVM — Home"
              className="font-archivo text-xl sm:text-2xl font-black uppercase tracking-widest text-white hover:text-primary-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0"
            >
              Elect<span className="text-secondary-light dark:text-secondary-dark">ZVM</span>
            </Link>

            {/* Nav links — hidden on mobile */}
            <ul role="list" className="hidden md:flex items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-archivo text-sm font-semibold uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-3">
              {/* Donate CTA */}
              <Link
                href="https://secure.actblue.com/donate/zvm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donate to Zosia VanMeter's campaign (opens in new tab)"
                className="font-archivo px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-white border-2 border-cta-light dark:border-cta-dark hover:bg-cta-light dark:hover:bg-cta-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-11 flex items-center shrink-0"
              >
                Donate
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setDrawerOpen(true)}
                aria-label="Open navigation menu"
                aria-expanded={drawerOpen}
                aria-controls="navigation-drawer"
                className="md:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0"
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </nav>
        </header>
        <div aria-hidden="true" className="absolute inset-0 w-full h-full z-0 pointer-events-none">
          <Spline
            scene="https://prod.spline.design/dhxcZ0yoXwNL0li7/scene.splinecode"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* Video overlay */}
        <div aria-hidden="true" className="absolute inset-0 bg-hero-light/60 dark:bg-hero-dark/60 z-1" />

        {/* Bottom fade */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 right-0 h-48 bg-linear-to-t from-hero-light dark:from-hero-dark to-transparent z-10"
        />

        {/* Neon accent line — dark mode only */}
        <div
          aria-hidden="true"
          className="absolute left-0 top-0 bottom-0 w-1 bg-secondary-dark opacity-0 dark:opacity-100 z-20"
        />

        {/* Zosia image — slides in from right */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-0 bottom-0 w-[45vw] max-w-2xl z-2 flex items-end"
        >
          <Picture priority src="/images/zosia.png" alt="" className="w-full object-cover object-bottom max-h-none" />
        </motion.div>

        {/* Content */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 pt-10 pb-0 sm:py-20 md:py-24">
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.p
              {...fadeUp(0.1)}
              className="font-archivo text-[11px] sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark mb-4 sm:mb-6"
            >
              {/* 9th Essex District · Massachusetts */}
              {eyebrow}
            </motion.p>

            {/* H1 */}
            <h1 className="font-archivo font-black uppercase leading-none mb-2">
              <motion.span {...fadeUp(0.25)} className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">
                {firstName}
              </motion.span>
              <motion.span
                {...fadeUp(0.35)}
                className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-cta-dark"
              >
                {lastName}
              </motion.span>
            </h1>

            {/* Ticker */}
            <motion.div {...fadeUp(0.45)}>
              <HeroTicker />
            </motion.div>

            {/* Divider — draws in from left */}
            <motion.div
              aria-hidden="true"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="w-16 h-px bg-white/30 mb-6 sm:mb-8"
            />

            {/* CTAs */}
            <motion.div {...fadeUp(0.65)} className="flex flex-wrap gap-3 sm:gap-4">
              <a
                href="/volunteer"
                className="font-archivo px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white bg-primary-light opacity-80 sm:opacity-100 dark:bg-primary-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-opacity duration-200 min-h-11 flex items-center"
              >
                Join the Team
              </a>
              <a
                href="https://secure.actblue.com/donate/zvmkickoff"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donate to Zosia VanMeter's campaign (opens in new tab)"
                className="font-archivo px-6 sm:px-8 py-3 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-white opacity-80 sm:opacity-100 bg-cta-light dark:bg-cta-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-opacity duration-200 min-h-11 flex items-center"
              >
                Donate
              </a>
            </motion.div>

            {/* Social handle */}
            <motion.p
              {...fadeIn(0.85)}
              aria-label="Follow on Facebook and Instagram at realzvm"
              className="font-archivo mt-8 sm:mt-10 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/40"
            >
              f / ig · @realzvm
            </motion.p>
          </div>
        </div>
      </section>
    </>
  )
}
