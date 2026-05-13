export function PrimaryDateMarquee() {
  return (
    <div className="relative z-10 border-y border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden py-4">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(6)].map((_, i) => (
          <span key={i} className="flex items-center gap-6 pr-6 shrink-0">
            <span className="font-archivo text-5xl sm:text-7xl font-black uppercase text-text-light dark:text-text-dark tracking-tight">
              September 1, 2026
            </span>
            <span className="font-archivo text-5xl sm:text-7xl font-black uppercase text-cta-light dark:text-cta-dark tracking-tight">
              ★
            </span>
            <span className="font-archivo text-5xl sm:text-7xl font-black uppercase text-primary-light dark:text-primary-dark tracking-tight">
              Primary Election
            </span>
            <span className="font-archivo text-5xl sm:text-7xl font-black uppercase text-cta-light dark:text-cta-dark tracking-tight">
              ★
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
