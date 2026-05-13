export const InstagramIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <defs>
      <linearGradient id="igGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#38BDF8" />
      </linearGradient>
    </defs>

    {/* Outer container */}
    <rect
      x="1"
      y="1"
      width="22"
      height="22"
      rx="6"
      stroke="url(#igGradient)"
      strokeWidth="1.5"
      fill="rgba(255,255,255,0.02)"
    />

    {/* Diamond pattern */}
    <path d="M12 4L20 12L12 20L4 12Z" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />

    {/* Instagram camera */}
    <rect x="6.5" y="6.5" width="11" height="11" rx="3.5" stroke="url(#igGradient)" strokeWidth="1.6" />

    <circle cx="12" cy="12" r="2.7" stroke="url(#igGradient)" strokeWidth="1.6" />

    <circle cx="16.2" cy="7.8" r="1" fill="url(#igGradient)" />
  </svg>
)
