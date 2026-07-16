import { CanvassPin } from '@/types/canvas-pin'
import { STATUS_CONFIG } from '../../../lib/constants/canvas-pin.constants'
import { motion } from 'framer-motion'
import { Loader2, Trash2, X } from 'lucide-react'
import { useState } from 'react'
import useSoundEffect from '../../../lib/hooks/useSoundEffect'
import { deleteCanvassPin } from '@/app/lib/actions/admin/canvas-pin/deleteCanvassPin'

export function PinDetailPanel({
  pin,
  onClose,
  onDelete
}: {
  pin: CanvassPin
  onClose: () => void
  onDelete: (id: string) => void
}) {
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const { play: confirmDeleteSE } = useSoundEffect('/sound-effects/se-30.mp3', true)
  const { play: deletedSE } = useSoundEffect('/sound-effects/se-31.mp3', true)

  const config = STATUS_CONFIG[pin.status]

  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 300, opacity: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute top-0 right-0 bottom-0 w-72 bg-surface-light dark:bg-surface-dark border-l border-border-light dark:border-border-dark z-20 flex flex-col"
    >
      <div className="flex items-center justify-between px-5 h-11 border-b border-border-light dark:border-border-dark shrink-0">
        <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
          Pin Details
        </span>
        <button
          onClick={onClose}
          aria-label="Close"
          className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <div className="flex flex-col gap-5 p-5 overflow-y-auto">
        <span
          className={`font-archivo text-[10px] tracking-widest uppercase px-2 py-1 border w-fit ${config.border} ${config.text}`}
        >
          {config.label}
        </span>
        {pin.address && (
          <div className="flex flex-col gap-1">
            <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              Address
            </span>
            <span className="font-inter text-sm text-text-light dark:text-text-dark">{pin.address}</span>
          </div>
        )}
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-1">
            <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              Doors
            </span>
            <span className="font-archivo text-2xl font-black text-text-light dark:text-text-dark">{pin.doors}</span>
          </div>
          {pin.canvassedBy && (
            <div className="flex flex-col gap-1">
              <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                Canvasser
              </span>
              <span className="font-inter text-sm text-text-light dark:text-text-dark">{pin.canvassedBy}</span>
            </div>
          )}
        </div>
        {pin.notes && (
          <div className="flex flex-col gap-1">
            <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              Notes
            </span>
            <span className="font-inter text-sm text-text-light dark:text-text-dark leading-relaxed">{pin.notes}</span>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            Canvassed
          </span>
          <span className="font-mono text-[11px] text-muted-light dark:text-muted-dark">
            {new Date(pin.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
              hour: 'numeric',
              minute: '2-digit'
            })}
          </span>
        </div>

        <div className="border-t border-border-light dark:border-border-dark pt-4 mt-2 flex flex-col gap-3">
          <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-red-500/70">Danger Zone</span>
          {!confirmDelete ? (
            <button
              onClick={() => {
                confirmDeleteSE()
                setConfirmDelete(true)
              }}
              className="flex items-center gap-2 font-archivo text-[10px] tracking-widest uppercase text-red-500 border border-red-500/30 px-3 py-2 hover:bg-red-500/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
            >
              <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
              Delete Pin
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <p className="font-inter text-xs text-muted-light dark:text-muted-dark">This cannot be undone.</p>
              <div className="flex gap-2">
                <button
                  onClick={async () => {
                    setDeleting(true)
                    const result = await deleteCanvassPin(pin.id)
                    setDeleting(false)
                    deletedSE()
                    if (result.success) {
                      onClose()
                      onDelete(pin.id)
                    }
                  }}
                  disabled={deleting}
                  className="flex items-center gap-2 font-archivo text-[10px] tracking-widest uppercase text-white bg-red-600 px-3 py-2 hover:opacity-90 disabled:opacity-40 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  {deleting && <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />}
                  {deleting ? 'Deleting...' : 'Confirm'}
                </button>
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark px-3 py-2 hover:border-primary-light dark:hover:border-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
