import { CanvassPin, PendingPin } from '@/types/canvas-pin'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2, MapPin, X } from 'lucide-react'
import { STATUS_CONFIG } from '@/app/lib/constants/canvas-pin.constants'
import { createCanvassPin } from '@/app/lib/actions/admin/canvas-pin/createCanvassPin'

export function AddPinModal({
  pending,
  onClose,
  onSave
}: {
  pending: PendingPin
  onClose: () => void
  onSave: (pin: CanvassPin) => void
}) {
  const [form, setForm] = useState({
    address: pending.address ?? '',
    status: 'knocked' as CanvassPin['status'],
    doors: 1,
    notes: '',
    canvassedBy: ''
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSave() {
    setSaving(true)
    setError(null)
    const result = await createCanvassPin({ ...form, lat: pending.lat, lng: pending.lng })
    setSaving(false)
    if (result.success && result.data) {
      onSave(result.data as CanvassPin)
    } else {
      setError(result.error ?? 'Failed to save pin.')
    }
  }

  const inputCls =
    'w-full px-3 py-2.5 bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark text-sm font-inter text-text-light dark:text-text-dark placeholder:text-muted-light/40 dark:placeholder:text-muted-dark/40 outline-none focus:border-primary-light dark:focus:border-primary-dark transition-colors duration-200'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center px-4 pb-4 sm:pb-0"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" aria-hidden="true" />
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 40, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        role="dialog"
        aria-modal="true"
        aria-label="Add canvass pin"
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 w-full max-w-sm bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-11 border-b border-border-light dark:border-border-dark shrink-0">
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark" aria-hidden="true" />
            <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              Drop Pin
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Form */}
        <div className="flex flex-col gap-4 p-5">
          {/* Status */}
          <div className="flex flex-col gap-1.5">
            <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              Status *
            </span>
            <div className="grid grid-cols-2 gap-2">
              {(Object.keys(STATUS_CONFIG) as CanvassPin['status'][]).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, status: s }))}
                  className={`px-3 py-2 font-archivo text-[10px] tracking-widest uppercase border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark
                    ${
                      form.status === s
                        ? `${STATUS_CONFIG[s].border} ${STATUS_CONFIG[s].text} bg-black/5 dark:bg-white/5`
                        : 'border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:border-muted-light dark:hover:border-muted-dark'
                    }`}
                >
                  {STATUS_CONFIG[s].label}
                </button>
              ))}
            </div>
          </div>

          {/* Address */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="address"
              className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
            >
              Address
            </label>
            <input
              id="address"
              type="text"
              value={form.address}
              onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
              className={inputCls}
              placeholder="123 Main St, Lynn MA"
            />
          </div>

          {/* Doors + canvassed by */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="doors"
                className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
              >
                Doors
              </label>
              <input
                id="doors"
                type="number"
                min={1}
                value={form.doors}
                onChange={(e) => setForm((p) => ({ ...p, doors: parseInt(e.target.value) || 1 }))}
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="canvassedBy"
                className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
              >
                Canvasser
              </label>
              <input
                id="canvassedBy"
                type="text"
                value={form.canvassedBy}
                onChange={(e) => setForm((p) => ({ ...p, canvassedBy: e.target.value }))}
                className={inputCls}
                placeholder="Name"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="notes"
              className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
            >
              Notes
            </label>
            <textarea
              id="notes"
              rows={2}
              value={form.notes}
              onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
              className={`${inputCls} resize-none min-h-0`}
              placeholder="Any notes..."
            />
          </div>

          {error && (
            <p role="alert" className="font-inter text-xs text-red-500 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            aria-busy={saving}
            className="font-archivo w-full py-3 text-xs font-bold uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed min-h-11 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />}
            {saving ? 'Saving...' : 'Drop Pin'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}
