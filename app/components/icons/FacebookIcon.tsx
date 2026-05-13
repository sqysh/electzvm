export const FacebookIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <defs>
      <linearGradient id="fbGradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#60A5FA" />
        <stop offset="100%" stopColor="#38BDF8" />
      </linearGradient>
    </defs>

    {/* Outer ring */}
    <rect
      x="1"
      y="1"
      width="22"
      height="22"
      rx="6"
      stroke="url(#fbGradient)"
      strokeWidth="1.5"
      fill="rgba(255,255,255,0.02)"
    />

    {/* Subtle diamond */}
    <path d="M12 4L20 12L12 20L4 12Z" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />

    {/* Facebook mark */}
    <path
      d="M13.35 20V12.73H15.8L16.2 9.9H13.35V8.09C13.35 7.27 13.58 6.71 14.76 6.71H16.3V4.18C15.55 4.1 14.79 4.06 14.03 4.07C11.77 4.07 10.22 5.45 10.22 7.99V9.9H7.75V12.73H10.22V20H13.35Z"
      fill="url(#fbGradient)"
    />
  </svg>
)
