import Link from 'next/link'
import { navLinks } from '../lib/constants/navigation.contants'
import LiquidButton from './elements/LiquidButton'

export default function Header() {
  return (
    <header className="relative z-20 w-full bg-hero-light dark:bg-hero-dark border-b border-white/10">
      <nav
        aria-label="Main navigation"
        className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 h-16 sm:h-20 flex items-center justify-between gap-8"
      >
        <Link
          href="/"
          aria-label="Elect ZVM — Home"
          className="font-archivo text-xl sm:text-2xl font-black uppercase tracking-widest text-white hover:text-primary-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0"
        >
          Elect<span className="text-primary-dark">ZVM</span>
        </Link>
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
        <LiquidButton
          href="https://secure.actblue.com/donate/zvmkickoff"
          label="Donate"
          ariaLabel="Donate to Zosia VanMeter's campaign (opens in new tab)"
          external
        />
      </nav>
    </header>
  )
}
