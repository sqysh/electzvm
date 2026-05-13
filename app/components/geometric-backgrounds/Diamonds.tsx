export function Diamonds() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06] text-primary-light dark:text-primary-dark"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#diamonds)" />
      </svg>
    </div>
  )
}
