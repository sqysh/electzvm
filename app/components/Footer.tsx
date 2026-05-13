import Link from 'next/link'
import LiquidButton from '@/app/components/elements/LiquidButton'

export function Footer() {
  return (
    <footer className="relative w-full bg-hero-light dark:bg-hero-dark overflow-hidden">
      {/* Video background */}
      <video
        aria-hidden="true"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-5"
      >
        <source src="/videos/flag.mp4" type="video/mp4" />
      </video>

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-16 pt-20 pb-10 flex flex-col gap-10">
        {/* Top row — logo + donate */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            href="/"
            aria-label="Elect ZVM — Home"
            className="font-archivo text-3xl sm:text-4xl font-black uppercase tracking-widest text-white hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Elect<span className="text-primary-dark">ZVM</span>
          </Link>
          <LiquidButton
            href="https://secure.actblue.com/donate/zvmkickoff"
            label="Donate →"
            color="cta"
            variant="filled"
            external
            ariaLabel="Donate to Zosia VanMeter's campaign (opens in new tab)"
          />
        </div>

        {/* Divider */}
        <div aria-hidden="true" className="h-px bg-white/10" />

        {/* Bottom row — sqysh */}
        <div className="flex items-center justify-between gap-4">
          <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-white/20">
            9th Essex District · Massachusetts
          </span>
          <a
            href="https://sqysh.io"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Built by Sqysh (opens in new tab)"
            className="font-archivo text-[10px] tracking-widest uppercase text-white/30 hover:text-primary-dark transition-colors duration-200"
          >
            Built by <span className="text-primary-dark">Sqysh</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
