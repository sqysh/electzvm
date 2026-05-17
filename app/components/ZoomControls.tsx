export function ZoomControls({ mapRef }: { mapRef: React.RefObject<google.maps.Map | null> }) {
  return (
    <div className="absolute bottom-6 right-6 z-10 flex flex-col gap-1">
      <button
        onClick={() => mapRef.current?.setZoom((mapRef.current.getZoom() ?? 13) + 1)}
        aria-label="Zoom in"
        className="w-8 h-8 flex items-center justify-center bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-none font-archivo font-black text-base"
      >
        +
      </button>
      <button
        onClick={() => mapRef.current?.setZoom((mapRef.current.getZoom() ?? 13) - 1)}
        aria-label="Zoom out"
        className="w-8 h-8 flex items-center justify-center bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-none font-archivo font-black text-base"
      >
        −
      </button>
    </div>
  )
}
