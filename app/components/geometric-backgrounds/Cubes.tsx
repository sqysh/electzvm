export function Cubes() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06] text-primary-light dark:text-primary-dark"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="cubes" x="0" y="0" width="60" height="70" patternUnits="userSpaceOnUse">
            {/* Top face */}
            <polygon points="30,0 60,17.5 30,35 0,17.5" fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Left face */}
            <polygon points="0,17.5 30,35 30,70 0,52.5" fill="none" stroke="currentColor" strokeWidth="1" />
            {/* Right face */}
            <polygon points="60,17.5 30,35 30,70 60,52.5" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cubes)" />
      </svg>
    </div>
  )
}
