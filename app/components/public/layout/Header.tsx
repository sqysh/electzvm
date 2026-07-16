'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu } from 'lucide-react'
import LiquidButton from '@/app/components/elements/LiquidButton'
import NavigationDrawer from '@/app/components/public/layout/NavigationDrawer'
import { navLinks } from '../../../lib/constants/navigation.contants'

export default function Header() {
  const pathname = usePathname()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <>
      <header className="relative z-20 w-full px-5 sm:px-8 md:px-16 bg-hero-light dark:bg-hero-dark border-b border-white/10">
        <nav
          aria-label="Main navigation"
          className="max-w-6xl mx-auto h-16 sm:h-20 flex items-center justify-between gap-8"
        >
          <Link
            href="/"
            aria-label="Elect ZVM — Home"
            className="font-archivo text-xl sm:text-2xl font-black uppercase tracking-widest text-white hover:text-primary-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0"
          >
            Elect<span className="text-primary-dark">ZVM</span>
          </Link>

          <ul role="list" className="hidden 1200:flex items-center gap-6 1200:gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className={`font-archivo text-sm font-semibold uppercase tracking-widest transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white relative
                      ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}
                    `}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary-dark" aria-hidden="true" />
                    )}
                  </Link>
                </li>
              )
            })}
          </ul>

          <div className="flex items-center gap-3">
            <LiquidButton
              href="https://secure.actblue.com/donate/2teamzvm "
              label="Donate"
              ariaLabel="Donate to Zosia VanMeter's campaign (opens in new tab)"
              external
            />
            <button
              onClick={() => setDrawerOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={drawerOpen}
              aria-controls="navigation-drawer"
              className="1200:hidden w-10 h-10 flex items-center justify-center text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </nav>
      </header>

      <NavigationDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  )
}
