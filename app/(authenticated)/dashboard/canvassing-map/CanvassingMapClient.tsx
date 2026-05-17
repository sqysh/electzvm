'use client'

import { useState, useRef, useEffect } from 'react'
import { GoogleMap, Polygon, useLoadScript } from '@react-google-maps/api'
import { AnimatePresence } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { useUiSelector } from '@/app/lib/redux/store'
import { CanvassPin, PendingPin } from '@/types/canvas-pin'
import { CENTER, LIBRARIES, LIGHT_MAP_STYLES, MAP_STYLES, ZOOM } from '@/app/lib/constants/canvas-pin.constants'
import { PulsePin } from '@/app/components/PulsePin'
import { AddPinModal } from '@/app/components/modals/AddPinModal'
import { PinDetailPanel } from '@/app/components/panels/PinDetailPanel'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'
import { useSearchParams } from 'next/navigation'
import Pusher from 'pusher-js'
import { DISTRICT_BOUNDARY } from '@/app/lib/constants/district-boundary.constants'
import { StatsPanel } from '@/app/components/panels/StatsPanel'
import { CanvassingMapHeader } from '@/app/components/CanvassingMapHeader'
import { ZoomControls } from '@/app/components/ZoomControls'

export default function CanvassingMapClient({ initialPins }: { initialPins: CanvassPin[] }) {
  // ── Map loading
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES
  })

  // ── Hooks
  const searchParams = useSearchParams()
  const { isDark } = useUiSelector()

  // ── Refs
  const mapRef = useRef<google.maps.Map | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // ── State
  const [pins, setPins] = useState<CanvassPin[]>(initialPins)
  const [pendingPin, setPendingPin] = useState<PendingPin | null>(null)
  const [selectedPin, setSelectedPin] = useState<CanvassPin | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [statusFilter, setStatusFilter] = useState<CanvassPin['status'] | 'all'>('all')

  // ── Sound effects
  const { play: closePinDetailsSE } = useSoundEffect('/sound-effects/se-23.mp3', true)
  const { play: pinAddedSE } = useSoundEffect('/sound-effects/se-24.mp3', true)
  const { play: mapClickedSE } = useSoundEffect('/sound-effects/se-27.mp3', true)
  const { play: closePinModalSE } = useSoundEffect('/sound-effects/se-33.mp3', true)

  // ── Derived
  const totalDoors = pins.reduce((sum, p) => sum + p.doors, 0)
  const filteredPins = statusFilter === 'all' ? pins : pins.filter((p) => p.status === statusFilter)

  // ── Pusher — real-time pin updates
  useEffect(() => {
    const pusher = (window as any).__pusher as Pusher
    if (!pusher) return

    const channel = pusher.subscribe('canvass')

    channel.bind('pin-added', (pin: CanvassPin) => {
      setPins((prev) => {
        pinAddedSE()
        if (prev.some((p) => p.id === pin.id)) return prev
        return [{ ...pin, status: pin.status as CanvassPin['status'] }, ...prev]
      })
    })

    channel.bind('pin-deleted', ({ id }: { id: string }) => {
      setPins((prev) => prev.filter((p) => p.id !== id))
    })

    return () => {
      channel.unbind_all()
      pusher.unsubscribe('canvass')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Open add pin modal from query param
  useEffect(() => {
    if (searchParams.get('addPin') === 'true') {
      setTimeout(() => {
        setPendingPin({ lat: CENTER.lat, lng: CENTER.lng, address: '' })
      }, 0)
    }
  }, [searchParams])

  // ── Address autocomplete
  useEffect(() => {
    if (!isLoaded || !inputRef.current) return

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
      setPendingPin({ lat, lng, address: place.formattedAddress ?? '' })
    })
  }, [isLoaded])

  // ── Map click — drop pin with reverse geocode
  async function onMapClick(e: google.maps.MapMouseEvent) {
    if (!e.latLng) return
    mapClickedSE()
    const lat = e.latLng.lat()
    const lng = e.latLng.lng()

    // Reverse geocode to get address
    const geocoder = new google.maps.Geocoder()
    let address = ''

    try {
      const result = await geocoder.geocode({ location: { lat, lng } })
      if (result.results[0]) {
        address = result.results[0].formatted_address
      }
    } catch {
      // silently fail — address just stays empty
    }

    setPendingPin({ lat, lng, address })
    setSelectedPin(null)
  }

  // ── Loading
  if (!isLoaded) {
    return (
      <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-primary-light dark:text-primary-dark animate-spin" aria-label="Loading map" />
      </div>
    )
  }

  return (
    <div className="h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col overflow-hidden">
      <CanvassingMapHeader
        inputRef={inputRef}
        mapRef={mapRef}
        pins={pins}
        setSidebarOpen={setSidebarOpen}
        setStatusFilter={setStatusFilter}
        sidebarOpen={sidebarOpen}
        statusFilter={statusFilter}
        totalDoors={totalDoors}
      />

      <div className="flex-1 relative overflow-hidden">
        {/* ── Map */}
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
          <Polygon
            paths={DISTRICT_BOUNDARY}
            options={{
              strokeColor: isDark ? '#a855f7' : '#5b2d8e',
              strokeOpacity: 0.8,
              strokeWeight: 2,
              fillColor: isDark ? '#a855f7' : '#5b2d8e',
              fillOpacity: 0.05,
              clickable: false
            }}
          />
          {filteredPins.map((pin) => (
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

        {/* ── Click hint */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 pointer-events-none">
          <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-text-light/50 dark:text-white/30 bg-white/60 dark:bg-black/40 px-3 py-1.5 backdrop-blur-sm">
            Click anywhere on the map to drop a pin
          </p>
        </div>

        {/* ── Zoom controls */}
        <ZoomControls mapRef={mapRef} />

        {/* ── Stats panel */}
        <AnimatePresence>
          {sidebarOpen && (
            <StatsPanel mapRef={mapRef} pins={pins} setSelectedPin={setSelectedPin} totalDoors={totalDoors} />
          )}
        </AnimatePresence>

        {/* ── Pin detail panel */}
        <AnimatePresence>
          {selectedPin && (
            <PinDetailPanel
              pin={selectedPin}
              onClose={() => {
                closePinDetailsSE()
                setSelectedPin(null)
              }}
              onDelete={(id) => {
                setPins((prev) => prev.filter((p) => p.id !== id))
                setSelectedPin(null)
              }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Add pin modal */}
      <AnimatePresence>
        {pendingPin && (
          <AddPinModal
            pending={pendingPin}
            onClose={() => {
              closePinModalSE()
              setPendingPin(null)
            }}
            onSave={() => setPendingPin(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
