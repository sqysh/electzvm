export const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-6 h-6">
    <defs>
      <linearGradient id="liGradient" x1="0" y1="0" x2="1" y2="1">
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
      stroke="url(#liGradient)"
      strokeWidth="1.5"
      fill="rgba(255,255,255,0.02)"
    />

    {/* Diamond background accent */}
    <path d="M12 4L20 12L12 20L4 12Z" stroke="rgba(255,255,255,0.05)" strokeWidth="0.8" />

    {/* LinkedIn "in" */}
    <path
      d="M7.7 9.4H10.1V17H7.7V9.4ZM8.9 6C9.67 6 10.2 6.53 10.2 7.25C10.2 7.97 9.67 8.5 8.9 8.5C8.14 8.5 7.6 7.97 7.6 7.25C7.6 6.53 8.14 6 8.9 6Z"
      fill="url(#liGradient)"
    />

    <path
      d="M11.6 9.4H13.9V10.44H13.93C14.25 9.83 15.03 9.18 16.2 9.18C18.63 9.18 19 10.74 19 12.77V17H16.6V13.26C16.6 12.37 16.58 11.23 15.37 11.23C14.14 11.23 13.95 12.18 13.95 13.19V17H11.6V9.4Z"
      fill="url(#liGradient)"
    />
  </svg>
)
