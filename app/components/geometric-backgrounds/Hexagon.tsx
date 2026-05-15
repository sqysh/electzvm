export function Hexagon() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 opacity-[0.06] dark:opacity-[0.08] text-primary-light dark:text-primary-dark"
    >
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hex-pattern" x="0" y="0" width="56" height="100" patternUnits="userSpaceOnUse">
            <polygon points="28,2 54,17 54,47 28,62 2,47 2,17" fill="none" stroke="currentColor" strokeWidth="1" />
            <polygon points="0,67 28,52 56,67 56,97 28,112 0,97" fill="none" stroke="currentColor" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hex-pattern)" />
      </svg>
    </div>
  )
}
