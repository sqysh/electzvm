import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Meet Zosia', href: '/meet-zosia' },
  { label: 'Platform', href: '/platform' },
  { label: 'News', href: '/news' },
  { label: 'Contact', href: '/contact' }
]

export default function Header() {
  return (
    <header className="w-full bg-hero-light dark:bg-hero-dark">
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

        {/* Donate CTA */}
        <Link
          href="https://secure.actblue.com/donate/zvmkickoff"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Donate to Zosia VanMeter's campaign (opens in new tab)"
          className="font-archivo px-5 sm:px-6 py-2.5 text-xs sm:text-sm font-bold uppercase tracking-widest text-white border-2 border-cta-light dark:border-cta-dark hover:bg-cta-light dark:hover:bg-cta-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-11 flex items-center shrink-0"
        >
          Donate
        </Link>
      </nav>
    </header>
  )
}
