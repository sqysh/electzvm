import { CanvassPin } from '@prisma/client'
import { GoogleMap, Polygon, useLoadScript } from '@react-google-maps/api'
import { memo, useEffect, useMemo, useState } from 'react'
import { CENTER, LIBRARIES, LIGHT_MAP_STYLES, MAP_STYLES, ZOOM } from '../lib/constants/canvas-pin.constants'
import { useUiSelector } from '../lib/redux/store'
import { PulsePin } from './PulsePin'
import { ArrowRight, Loader2 } from 'lucide-react'
import Link from 'next/link'
import useSoundEffect from '../lib/hooks/useSoundEffect'
import { DISTRICT_BOUNDARY } from '../lib/constants/district-boundary.constants'

export const MapPanel = memo(function MapPanel({
  pinCount,
  doorsKnocked,
  pins
}: {
  pins: CanvassPin[]
  pinCount: number
  doorsKnocked: number
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES
  })
  const { isDark } = useUiSelector()
  const { play: openFullMapSE } = useSoundEffect('/sound-effects/se-18.mp3', true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const mapContainerStyle = useMemo(
    () => ({ width: '100%', height: '100%', background: mounted && isDark ? '#0a0010' : '#f3f0f8' }),
    [mounted, isDark]
  )

  const mapOptions = useMemo(
    () => ({
      styles: mounted && isDark ? MAP_STYLES : LIGHT_MAP_STYLES,
      disableDefaultUI: true,
      zoomControl: false,
      gestureHandling: 'none' as const,
      scrollwheel: false
    }),
    [mounted, isDark]
  )

  const polygonOptions = useMemo(
    () => ({
      strokeColor: mounted && isDark ? '#a855f7' : '#5b2d8e',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: mounted && isDark ? '#a855f7' : '#5b2d8e',
      fillOpacity: 0.05
    }),
    [mounted, isDark]
  )

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {isLoaded ? (
        <GoogleMap mapContainerStyle={mapContainerStyle} center={CENTER} zoom={ZOOM} options={mapOptions}>
          <Polygon paths={DISTRICT_BOUNDARY} options={polygonOptions} />
          {pins.map((pin) => (
            <PulsePin key={pin.id} pin={pin} onClick={() => {}} />
          ))}
        </GoogleMap>
      ) : (
        <div className="absolute inset-0 bg-white dark:bg-[#0a0010] flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-primary-dark animate-spin" aria-hidden="true" />
        </div>
      )}

      {/* Stats overlay */}
      <div className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-3 sm:p-5 bg-linear-to-t from-black/50 to-transparent pointer-events-none">
        <div className="flex gap-4 sm:gap-8">
          <div className="flex flex-col gap-0.5">
            <span className="font-archivo text-2xl sm:text-4xl font-black leading-none tabular-nums text-white">
              {pinCount}
            </span>
            <span className="font-archivo text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/50">
              Pins
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-archivo text-2xl sm:text-4xl font-black text-primary-dark leading-none tabular-nums">
              {doorsKnocked}
            </span>
            <span className="font-archivo text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/50">
              Doors
            </span>
          </div>
        </div>
        <Link
          href="/dashboard/canvassing-map"
          onClick={() => openFullMapSE()}
          className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 border border-white/20 bg-black/40 text-white backdrop-blur-sm hover:border-primary-dark hover:bg-primary-dark/20 transition-colors font-archivo text-[9px] sm:text-[10px] tracking-widest uppercase"
        >
          <span className="hidden xs:inline">Open Full Map</span>
          <span className="xs:hidden">Map</span>
          <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
})
