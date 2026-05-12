import Picture from './elements/Picture'
import HeroTicker from './HeroTicker'

export default function Hero() {
  return (
    <section
      aria-label="Campaign hero for Zosia VanMeter, candidate for State Representative"
      className="relative w-full overflow-hidden bg-hero-light dark:bg-hero-dark flex sm:items-center min-h-screen md:min-h-0 md:h-212.5"
    >
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

      {/* Zosia image — right aligned, bottom anchored, decorative */}
      <div aria-hidden="true" className="absolute right-0 bottom-0 w-full md:w-[57%] z-0 h-full flex items-end">
        <Picture priority src="/images/zosia.png" alt="" className="w-full object-cover object-bottom " />
        <div className="absolute inset-0 bg-linear-to-r from-hero-light dark:from-hero-dark via-transparent dark:via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-5 sm:px-8 md:px-16 pt-10 pb-0 sm:py-20 md:py-24">
        <div className="max-w-xl">
          {/* Eyebrow */}
          <p className="font-archivo text-[11px] sm:text-sm font-semibold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-secondary-light dark:text-secondary-dark mb-4 sm:mb-6">
            9th Essex District · Massachusetts
          </p>

          {/* Single h1 with two spans for visual color split — ADA compliant */}
          <h1 className="font-archivo font-black uppercase leading-none mb-2">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white">Zosia</span>
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-primary-dark">VanMeter</span>
          </h1>

          <p
            role="doc-subtitle"
            className="font-archivo text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-white mt-2 mb-6 sm:mb-8"
          >
            For State Representative
          </p>

          {/* Divider */}
          <div aria-hidden="true" className="w-16 h-px bg-white/30 mb-6 sm:mb-8" />

          {/* Ticker */}
          <HeroTicker />

          {/* CTAs — min 44px touch target */}
          <div className="flex flex-wrap gap-3 sm:gap-4">
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
          </div>

          {/* Social handle */}
          <p
            aria-label="Follow on Facebook and Instagram at realzvm"
            className="font-archivo mt-8 sm:mt-10 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/40"
          >
            f / ig · @realzvm
          </p>
        </div>
      </div>
    </section>
  )
}
