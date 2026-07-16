export function CTASection() {
  return (
    <div className="relative z-10 border-t border-border-light dark:border-border-dark bg-hero-light dark:bg-hero-dark overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-br from-primary-light/20 dark:from-primary-dark/10 to-transparent"
      />
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
          {/* Donate */}
          <div className="flex flex-col gap-4">
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
              Support the Campaign
            </p>
            <h2 className="font-archivo text-2xl sm:text-3xl font-black uppercase text-white leading-none">
              Help Us <span className="text-cta-dark">Win</span>
            </h2>
            <p className="font-inter text-sm text-white/60 leading-relaxed max-w-sm">
              Every contribution helps us reach more voters across the 9th Essex District and bring real change to our
              community.
            </p>

            <a
              href="https://secure.actblue.com/donate/2teamzvm "
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Donate to Zosia VanMeter's campaign (opens in new tab)"
              className="font-archivo w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-cta-light dark:bg-cta-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-opacity duration-200 min-h-11 flex items-center justify-center sm:justify-start"
            >
              Donate via ActBlue →
            </a>
          </div>

          {/* Divider — vertical on desktop, horizontal on mobile */}
          <div aria-hidden="true" className="sm:hidden h-px bg-white/10" />
          <div aria-hidden="true" className="hidden sm:block absolute left-1/2 top-16 bottom-16 w-px bg-white/10" />

          {/* Register */}
          <div className="flex flex-col gap-4">
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
              Primary · September 1, 2026
            </p>
            <h2 className="font-archivo text-2xl sm:text-3xl font-black uppercase text-white leading-none">
              Register <span className="text-primary-dark">to Vote</span>
            </h2>
            <p className="font-inter text-sm text-white/60 leading-relaxed max-w-sm">
              Make sure you&apos;re registered before the August 12th deadline. It only takes a few minutes and your
              vote makes all the difference.
            </p>

            <a
              href="https://www.sec.state.ma.us/ovr/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Register to vote in Massachusetts (opens in new tab)"
              className="font-archivo w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-opacity duration-200 min-h-11 flex items-center justify-center sm:justify-start"
            >
              Register Now →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
