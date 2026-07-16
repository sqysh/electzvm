import { CanvassPin } from '@/types/canvas-pin'
import { STATUS_CONFIG } from '../../../lib/constants/canvas-pin.constants'
import { OVERLAY_MOUSE_TARGET, OverlayViewF } from '@react-google-maps/api'
import { motion } from 'framer-motion'
import useSoundEffect from '../../../lib/hooks/useSoundEffect'
import { memo } from 'react'

export const PulsePin = memo(function PulsePin({ pin, onClick }: { pin: any; onClick: () => void }) {
  const color = STATUS_CONFIG[pin.status as CanvassPin['status']].color
  const { play: openPinDetailsSE } = useSoundEffect('/sound-effects/se-24.mp3', true)

  return (
    <OverlayViewF
      position={{ lat: pin.lat, lng: pin.lng }}
      mapPaneName={OVERLAY_MOUSE_TARGET}
      getPixelPositionOffset={(width, height) => ({
        x: -(width / 2),
        y: -(height / 2)
      })}
    >
      <div
        data-pin-id={pin.id}
        onClick={(e) => {
          e.stopPropagation()
          openPinDetailsSE()
          onClick()
        }}
        className="relative cursor-pointer"
        style={{ width: 24, height: 24 }}
      >
        <motion.div
          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', repeatDelay: 0.5 }}
          style={{ backgroundColor: color, borderRadius: '50%', position: 'absolute', inset: 0 }}
        />
        <div
          style={{
            backgroundColor: color,
            borderRadius: '50%',
            position: 'absolute',
            inset: 4,
            boxShadow: `0 0 8px ${color}`
          }}
        />
      </div>
    </OverlayViewF>
  )
})
