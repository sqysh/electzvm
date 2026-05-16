'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, ArrowLeft, ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useUiSelector } from '@/app/lib/redux/store'
import { CanvassPin, PendingPin } from '@/types/canvas-pin'
import {
  CENTER,
  DISTRICT_BOUNDS,
  LIBRARIES,
  LIGHT_MAP_STYLES,
  MAP_STYLES,
  STATUS_CONFIG,
  ZOOM
} from '@/app/lib/constants/canvas-pin.constants'
import { PulsePin } from '@/app/components/PulsePin'
import { AddPinModal } from '@/app/components/modals/AddPinModal'
import { PinDetailPanel } from '@/app/components/PinDetailPanel'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'

export default function CanvassingMapClient({ initialPins }: { initialPins: CanvassPin[] }) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES
  })

  const [pins, setPins] = useState<CanvassPin[]>(initialPins)
  const [pendingPin, setPendingPin] = useState<PendingPin | null>(null)
  const [selectedPin, setSelectedPin] = useState<CanvassPin | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const mapRef = useRef<google.maps.Map | null>(null)
  const { play } = useSoundEffect('/sound-effects/se-5.mp3', true)

  const totalDoors = pins.reduce((sum, p) => sum + p.doors, 0)

  const { isDark } = useUiSelector()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isLoaded || !inputRef.current) return

    play()

    const placeAutocomplete = new google.maps.places.PlaceAutocompleteElement({
      componentRestrictions: { country: 'us' }
    })

    placeAutocomplete.style.width = '100%'
    inputRef.current.replaceWith(placeAutocomplete)

    placeAutocomplete.addEventListener('gmp-select', async (e: any) => {
      const place = e.placePrediction.toPlace()
      await place.fetchFields({ fields: ['location', 'formattedAddress'] })
      const lat = place.location?.lat()
      const lng = place.location?.lng()
      if (!lat || !lng) return
      mapRef.current?.panTo({ lat, lng })
      mapRef.current?.setZoom(17)
      setPendingPin({ lat, lng })
    })
  }, [isLoaded, play])

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return
    setSelectedPin(null)
    setPendingPin({ lat: e.latLng.lat(), lng: e.latLng.lng() })
  }, [])

  if (!isLoaded) {
    return (
      <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary-light dark:text-primary-dark animate-spin" aria-label="Loading map" />
      </div>
    )
  }

  return (
    <div className="h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col overflow-hidden">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between px-4 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>

          {/* Search — floats over map above sidebar */}
          <div className="absolute top-2 left-66 z-9999 sm:left-67">
            <div ref={inputRef} className="w-48 sm:w-56" />
          </div>

          <div aria-hidden="true" className="w-px h-3 bg-border-light dark:bg-border-dark" />
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            [ Canvassing Map ]
          </span>
          <span className="font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50">
            · {pins.length} pins
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark">
            {totalDoors} doors knocked
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
            className="font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
          >
            District View
          </button>
        </div>
      </header>

      {/* ── Map + sidebar ───────────────────────────────────────────────── */}
      <div className="flex-1 relative overflow-hidden">
        {/* Map */}
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%', background: isDark ? '#0a0010' : '#f3f0f8' }}
          center={CENTER}
          zoom={ZOOM}
          options={{
            styles: isDark ? MAP_STYLES : LIGHT_MAP_STYLES,
            disableDefaultUI: true,
            zoomControl: true,
            gestureHandling: 'greedy'
          }}
          onClick={onMapClick}
          onLoad={(map) => {
            mapRef.current = map
          }}
        >
          {pins.map((pin) => (
            <PulsePin
              key={pin.id}
              pin={pin}
              onClick={() => {
                setSelectedPin(pin)
                setPendingPin(null)
              }}
            />
          ))}
        </GoogleMap>

        {/* Click hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-text-light/50 dark:text-white/30 bg-white/60 dark:bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            Click anywhere on the map to drop a pin
          </p>
        </div>

        {/* Stats sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
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
                        <span className="font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50">
                          {doors}d
                        </span>
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
                      <ChevronRight
                        className="w-3 h-3 text-muted-light dark:text-muted-dark shrink-0"
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pin detail panel */}
        <AnimatePresence>
          {selectedPin && (
            <PinDetailPanel
              pin={selectedPin}
              onClose={() => setSelectedPin(null)}
              onDelete={(id) => {
                setPins((prev) => prev.filter((p) => p.id !== id))
                setSelectedPin(null)
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Add pin modal ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {pendingPin && (
          <AddPinModal
            pending={pendingPin}
            onClose={() => setPendingPin(null)}
            onSave={(pin) => {
              setPins((prev) => [pin, ...prev])
              setPendingPin(null)
            }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
