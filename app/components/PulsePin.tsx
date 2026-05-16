import { CanvassPin } from '@/types/canvas-pin'
import { STATUS_CONFIG } from '../lib/constants/canvas-pin.constants'
import { OverlayView } from '@react-google-maps/api'
import { motion } from 'framer-motion'

export function PulsePin({ pin, onClick }: { pin: any; onClick: () => void }) {
  const color = STATUS_CONFIG[pin.status as CanvassPin['status']].color

  return (
    <OverlayView position={{ lat: pin.lat, lng: pin.lng }} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        onClick={onClick}
        className="relative cursor-pointer -translate-x-1/2 -translate-y-1/2"
        style={{ width: 24, height: 24 }}
      >
        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 2.5], opacity: [0.6, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
            repeatDelay: 0.5
          }}
          style={{ backgroundColor: color, borderRadius: '50%', position: 'absolute', inset: 0 }}
        />
        {/* Dot */}
        <div
          style={{
            backgroundColor: color,
            borderRadius: '50%',
            position: 'absolute',
            inset: 4,
            boxShadow: `0 0 8px ${color}`
          }}
        />
      </motion.div>
    </OverlayView>
  )
}
