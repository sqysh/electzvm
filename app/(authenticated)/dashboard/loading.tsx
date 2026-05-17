// app/dashboard/loading.tsx

export default function DashboardLoading() {
  return (
    <div className="h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col overflow-hidden">
      {/* Header skeleton */}
      <div className="shrink-0 flex items-center justify-between px-4 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="flex items-center gap-4">
          <div className="h-3 w-20 bg-border-light dark:bg-border-dark animate-pulse" />
          <div className="hidden sm:block h-3 w-28 bg-border-light dark:bg-border-dark animate-pulse" />
        </div>
        <div className="h-3 w-24 bg-border-light dark:bg-border-dark animate-pulse" />
      </div>

      {/* Countdown strip skeleton */}
      <div className="shrink-0 flex items-center justify-between px-4 h-7 border-b border-border-light dark:border-border-dark bg-primary-light/5 dark:bg-primary-dark/5">
        <div className="h-2 w-48 bg-primary-light/20 dark:bg-primary-dark/20 animate-pulse" />
        <div className="h-2 w-24 bg-primary-light/20 dark:bg-primary-dark/20 animate-pulse" />
      </div>

      {/* Main grid skeleton */}
      <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] overflow-hidden">
        {/* Left */}
        <div className="hidden lg:flex flex-col border-r border-border-light dark:border-border-dark gap-px p-px">
          {[...Array(7)].map((_, i) => (
            <div
              key={i}
              className="flex items-center justify-between px-4 py-3 border-b border-border-light dark:border-border-dark"
            >
              <div className="h-2 w-20 bg-border-light dark:bg-border-dark animate-pulse" />
              <div className="h-4 w-8 bg-border-light dark:bg-border-dark animate-pulse" />
            </div>
          ))}
        </div>

        {/* Center — map placeholder */}
        <div className="flex flex-col min-h-0">
          <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
            <div className="h-2 w-32 bg-border-light dark:bg-border-dark animate-pulse" />
            <div className="h-2 w-20 bg-border-light dark:bg-border-dark animate-pulse" />
          </div>
          <div className="flex-1 bg-[#0a0010] dark:bg-[#0a0010] bg-surface-light flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div
                className="w-6 h-6 border-2 border-primary-light dark:border-primary-dark border-t-transparent rounded-full animate-spin"
                aria-label="Loading map"
              />
              <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                Loading map...
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="hidden lg:flex flex-col border-l border-border-light dark:border-border-dark">
          <div className="shrink-0 px-4 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
            <div className="h-2 w-28 bg-border-light dark:bg-border-dark animate-pulse" />
          </div>
          <div className="flex-1 flex items-center justify-center">
            <div className="h-2 w-20 bg-border-light dark:bg-border-dark animate-pulse" />
          </div>
        </div>
      </div>

      {/* Footer skeleton */}
      <div className="shrink-0 flex items-center justify-between px-4 h-7 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="h-2 w-24 bg-border-light dark:bg-border-dark animate-pulse" />
        <div className="h-2 w-16 bg-border-light dark:bg-border-dark animate-pulse" />
      </div>
    </div>
  )
}
