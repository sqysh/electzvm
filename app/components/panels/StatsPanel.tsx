import { STATUS_CONFIG } from '@/app/lib/constants/canvas-pin.constants'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'
import { CanvassPin } from '@/types/canvas-pin'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'

export function StatsPanel({
  totalDoors,
  pins,
  setSelectedPin,
  mapRef
}: {
  totalDoors: number
  pins: CanvassPin[]
  setSelectedPin: any
  mapRef: any
}) {
  const { play: openPinDetailsSE } = useSoundEffect('/sound-effects/se-22.mp3', true)

  return (
    <motion.div
      initial={{ x: -280, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -280, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 left-0 bottom-0 w-64 bg-surface-light/95 dark:bg-surface-dark/95 border-r border-border-light dark:border-border-dark z-10 flex flex-col backdrop-blur-sm"
    >
      <div className="px-5 py-4 border-b border-border-light dark:border-border-dark shrink-0">
        <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-1">
          Campaign Progress
        </p>
        <p className="font-archivo text-2xl font-black text-text-light dark:text-text-dark">
          {totalDoors} <span className="text-sm font-normal text-muted-light dark:text-muted-dark">doors</span>
        </p>
      </div>

      {/* Status breakdown */}
      <div className="flex flex-col divide-y divide-border-light dark:divide-border-dark overflow-y-auto flex-1">
        {(Object.keys(STATUS_CONFIG) as CanvassPin['status'][]).map((status) => {
          const count = pins.filter((p) => p.status === status).length
          const doors = pins.filter((p) => p.status === status).reduce((s, p) => s + p.doors, 0)
          const config = STATUS_CONFIG[status]
          return (
            <div key={status} className="flex items-center justify-between px-5 py-3">
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: config.color }}
                  aria-hidden="true"
                />
                <span className="font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark">
                  {config.label}
                </span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className={`font-archivo text-sm font-bold ${config.text}`}>{count}</span>
                <span className="font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50">{doors}d</span>
              </div>
            </div>
          )
        })}
      </div>

      {/* Recent pins */}
      <div className="border-t border-border-light dark:border-border-dark shrink-0">
        <div className="px-5 py-2 border-b border-border-light dark:border-border-dark">
          <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            Recent Activity
          </span>
        </div>
        <div className="overflow-y-auto max-h-40 divide-y divide-border-light dark:divide-border-dark">
          {pins.slice(0, 8).map((pin) => (
            <button
              key={pin.id}
              onClick={() => {
                openPinDetailsSE()
                setSelectedPin(pin)
                const map = mapRef.current
                if (!map) return
                map.setZoom(11)
                setTimeout(() => {
                  map.panTo({ lat: pin.lat, lng: pin.lng })
                  setTimeout(() => {
                    map.setZoom(17)
                  }, 600)
                }, 400)
              }}
              className="w-full flex items-center gap-2 px-5 py-2.5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-left focus-visible:outline-none"
            >
              <div
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: STATUS_CONFIG[pin.status].color }}
                aria-hidden="true"
              />
              <span className="font-inter text-xs text-text-light dark:text-text-dark truncate flex-1">
                {pin.address ?? `${pin.lat.toFixed(4)}, ${pin.lng.toFixed(4)}`}
              </span>
              <ChevronRight className="w-3 h-3 text-muted-light dark:text-muted-dark shrink-0" aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
