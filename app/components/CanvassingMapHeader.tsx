import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { DISTRICT_BOUNDS } from '../lib/constants/canvas-pin.constants'
import { CanvassPin } from '@prisma/client'
import { exportPinsToCSV } from '../lib/utils/csv.utils'

interface CanvassingMapHeaderProps {
  inputRef: React.RefObject<HTMLInputElement | null>
  pins: CanvassPin[]
  totalDoors: number
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  sidebarOpen: boolean
  mapRef: React.RefObject<google.maps.Map | null>
  setStatusFilter: React.Dispatch<React.SetStateAction<'all' | 'knocked' | 'interested' | 'no_answer' | 'hostile'>>
  statusFilter: 'all' | 'knocked' | 'interested' | 'no_answer' | 'hostile'
}

export function CanvassingMapHeader({
  inputRef,
  pins,
  totalDoors,
  setSidebarOpen,
  sidebarOpen,
  mapRef,
  setStatusFilter,
  statusFilter
}: CanvassingMapHeaderProps) {
  return (
    <header className="shrink-0 flex items-center justify-between px-3 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark z-10 gap-2">
      <div className="flex items-center gap-2 min-w-0">
        <Link
          href="/dashboard"
          aria-label="Back to dashboard"
          className="text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </Link>

        {/* Search — floats over map above sidebar */}
        <div className="absolute top-2 left-10 z-9999 sm:left-66">
          <div ref={inputRef} className="w-36 xs:w-44 sm:w-56" />
        </div>

        <div aria-hidden="true" className="hidden sm:block w-px h-3 bg-border-light dark:bg-border-dark shrink-0" />
        <span className="hidden sm:block font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark truncate">
          Canvassing Map
        </span>
        <span className="hidden xs:block font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50 shrink-0">
          · {pins.length}
        </span>
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 shrink-0">
        <span className="hidden xs:block font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark">
          {totalDoors}d
        </span>
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
          className="font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
        >
          {sidebarOpen ? 'Hide' : 'Stats'}
        </button>
        <button
          onClick={() => mapRef.current?.fitBounds(DISTRICT_BOUNDS)}
          aria-label="Zoom to full district view"
          className="hidden xs:block font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
        >
          District
        </button>
        <button
          onClick={() => exportPinsToCSV(pins)}
          aria-label="Export pins to CSV"
          className="font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
        >
          Export
        </button>
        <div className="flex items-center gap-1">
          {(['all', 'knocked', 'interested', 'no_answer', 'hostile'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`font-archivo text-[9px] tracking-widest uppercase px-2 py-1 border transition-colors focus-visible:outline-none ${
                statusFilter === status
                  ? status === 'all'
                    ? 'border-text-light dark:border-text-dark text-text-light dark:text-text-dark bg-text-light/10 dark:bg-text-dark/10'
                    : `border-current bg-white/10`
                  : 'border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:border-muted-light dark:hover:border-muted-dark'
              } ${
                status === 'knocked'
                  ? 'text-secondary-light dark:text-secondary-dark'
                  : status === 'interested'
                    ? 'text-primary-light dark:text-primary-dark'
                    : status === 'no_answer'
                      ? 'text-muted-light dark:text-muted-dark'
                      : status === 'hostile'
                        ? 'text-red-600 dark:text-red-400'
                        : ''
              }`}
            >
              {status === 'all'
                ? 'All'
                : status === 'no_answer'
                  ? 'No Answer'
                  : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </header>
  )
}
