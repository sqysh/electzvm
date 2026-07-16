import { ArrowLeft, SlidersHorizontal } from 'lucide-react'
import Link from 'next/link'
import { DISTRICT_BOUNDS } from '../../../lib/constants/canvas-pin.constants'
import { CanvassPin } from '@prisma/client'
import { exportPinsToCSV } from '../../../lib/utils/csv.utils'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface CanvassingMapHeaderProps {
  pins: CanvassPin[]
  totalDoors: number
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  sidebarOpen: boolean
  mapRef: React.RefObject<google.maps.Map | null>
  setStatusFilter: React.Dispatch<React.SetStateAction<'all' | 'knocked' | 'interested' | 'no_answer' | 'hostile'>>
  statusFilter: 'all' | 'knocked' | 'interested' | 'no_answer' | 'hostile'
}

export function CanvassingMapHeader({
  pins,
  totalDoors,
  setSidebarOpen,
  sidebarOpen,
  mapRef,
  setStatusFilter,
  statusFilter
}: CanvassingMapHeaderProps) {
  const [filtersOpen, setFiltersOpen] = useState(false)

  return (
    <>
      <header className="shrink-0 flex items-center justify-between px-3 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark z-10 gap-2">
        {/* Left */}
        <div className="flex items-center gap-2 min-w-0">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
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
          <span className="font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark">
            {totalDoors}d
          </span>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            aria-label="Toggle filters"
            aria-expanded={filtersOpen}
            className={`sm:hidden font-archivo text-[9px] tracking-widests uppercase p-1.5 border transition-colors focus-visible:outline-none ${
              filtersOpen || statusFilter !== 'all'
                ? 'border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark'
                : 'border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark'
            }`}
          >
            <SlidersHorizontal className="w-3 h-3" aria-hidden="true" />
          </button>
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
            className="font-archivo text-[10px] tracking-widests uppercase text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
          >
            {sidebarOpen ? 'Hide' : 'Stats'}
          </button>

          {/* Desktop filter buttons */}
          <div className="hidden sm:flex items-center gap-1">
            {(['all', 'knocked', 'interested', 'no_answer', 'hostile'] as const).map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`flex items-center gap-1.5 font-archivo text-[9px] tracking-widests uppercase px-2 py-1 shrink-0 transition-colors focus-visible:outline-none ${
                  statusFilter === status
                    ? status === 'all'
                      ? 'bg-text-light dark:bg-text-dark text-bg-light dark:text-bg-dark'
                      : status === 'knocked'
                        ? 'bg-secondary-light dark:bg-secondary-dark text-white'
                        : status === 'interested'
                          ? 'bg-primary-light dark:bg-primary-dark text-white'
                          : status === 'no_answer'
                            ? 'bg-muted-light dark:bg-muted-dark text-white'
                            : 'bg-red-600 dark:bg-red-500 text-white'
                    : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                }`}
              >
                {status !== 'all' && (
                  <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                      statusFilter === status
                        ? 'bg-white'
                        : status === 'knocked'
                          ? 'bg-secondary-light dark:bg-secondary-dark'
                          : status === 'interested'
                            ? 'bg-primary-light dark:bg-primary-dark'
                            : status === 'no_answer'
                              ? 'bg-muted-light dark:bg-muted-dark'
                              : 'bg-red-600 dark:bg-red-400'
                    }`}
                  />
                )}
                {status === 'all'
                  ? 'All'
                  : status === 'no_answer'
                    ? 'No Ans'
                    : status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>

          <button
            onClick={() => mapRef.current?.fitBounds(DISTRICT_BOUNDS)}
            className="hidden sm:block font-archivo text-[10px] tracking-widests uppercase text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
          >
            District
          </button>
          <button
            onClick={() => exportPinsToCSV(pins)}
            className="hidden sm:block font-archivo text-[10px] tracking-widests uppercase text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
          >
            Export
          </button>
        </div>
      </header>

      {/* Mobile filter drawer */}
      <AnimatePresence initial={false}>
        {filtersOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden overflow-hidden shrink-0 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark z-10"
          >
            <div className="flex flex-col">
              {/* Filter buttons */}
              <div className="flex items-center gap-1.5 px-3 py-2 overflow-x-auto border-b border-border-light dark:border-border-dark">
                {(['all', 'knocked', 'interested', 'no_answer', 'hostile'] as const).map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setStatusFilter(status)
                      setFiltersOpen(false)
                    }}
                    className={`flex items-center gap-1.5 font-archivo text-[9px] tracking-widest uppercase px-2.5 py-1.5 shrink-0 transition-colors focus-visible:outline-none min-h-9 ${
                      statusFilter === status
                        ? status === 'all'
                          ? 'bg-text-light dark:bg-text-dark text-bg-light dark:text-bg-dark'
                          : status === 'knocked'
                            ? 'bg-secondary-light dark:bg-secondary-dark text-white'
                            : status === 'interested'
                              ? 'bg-primary-light dark:bg-primary-dark text-white'
                              : status === 'no_answer'
                                ? 'bg-muted-light dark:bg-muted-dark text-white'
                                : 'bg-red-600 dark:bg-red-500 text-white'
                        : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'
                    }`}
                  >
                    {status !== 'all' && (
                      <span
                        aria-hidden="true"
                        className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                          statusFilter === status
                            ? 'bg-white'
                            : status === 'knocked'
                              ? 'bg-secondary-light dark:bg-secondary-dark'
                              : status === 'interested'
                                ? 'bg-primary-light dark:bg-primary-dark'
                                : status === 'no_answer'
                                  ? 'bg-muted-light dark:bg-muted-dark'
                                  : 'bg-red-600 dark:bg-red-400'
                        }`}
                      />
                    )}
                    {status === 'all'
                      ? 'All'
                      : status === 'no_answer'
                        ? 'No Answer'
                        : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>

              {/* District + Export */}
              <div className="flex items-center gap-2 px-3 py-2">
                <button
                  onClick={() => mapRef.current?.fitBounds(DISTRICT_BOUNDS)}
                  className="flex-1 font-archivo text-[9px] tracking-widest uppercase py-2 border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors min-h-9"
                >
                  District View
                </button>
                <button
                  onClick={() => exportPinsToCSV(pins)}
                  className="flex-1 font-archivo text-[9px] tracking-widests uppercase py-2 border border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:border-secondary-light dark:hover:border-secondary-dark hover:text-secondary-light dark:hover:text-secondary-dark transition-colors min-h-9"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
