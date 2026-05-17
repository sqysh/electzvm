'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Loader2, Trash2, X } from 'lucide-react'
import { useKeyDown } from '@/app/lib/hooks/useKeyDown'
import { useBodyScrollLock } from '@/app/lib/hooks/useBodyScrollLock'

interface ConfirmDeleteModalProps {
  open: boolean
  title: string
  description?: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export default function ConfirmDeleteModal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
  loading = false
}: ConfirmDeleteModalProps) {
  useBodyScrollLock(open)
  useKeyDown('Escape', onCancel)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => {
              if (!loading) onCancel()
            }}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-delete-title"
            aria-describedby={description ? 'confirm-delete-description' : undefined}
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center px-5 pointer-events-none"
          >
            <div className="w-full max-w-sm bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark pointer-events-auto">
              {/* Header */}
              <div className="flex items-center justify-between px-5 h-11 border-b border-border-light dark:border-border-dark">
                <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  Confirm Delete
                </span>
                <button
                  onClick={onCancel}
                  disabled={loading}
                  aria-label="Cancel"
                  className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light disabled:opacity-40"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Body */}
              <div className="px-5 py-6 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-red-500/30 bg-red-500/5 mt-0.5">
                    <Trash2 className="w-3.5 h-3.5 text-red-500 dark:text-red-400" aria-hidden="true" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <p
                      id="confirm-delete-title"
                      className="font-archivo text-sm font-bold uppercase text-text-light dark:text-text-dark leading-tight"
                    >
                      {title}
                    </p>
                    {description && (
                      <p
                        id="confirm-delete-description"
                        className="font-inter text-xs text-muted-light dark:text-muted-dark leading-relaxed"
                      >
                        {description}
                      </p>
                    )}
                  </div>
                </div>

                <p className="font-inter text-xs text-muted-light/60 dark:text-muted-dark/60">
                  This action cannot be undone.
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 px-5 pb-5">
                <button
                  onClick={onConfirm}
                  disabled={loading}
                  aria-busy={loading}
                  className="font-archivo flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest text-white bg-red-600 dark:bg-red-500 hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed min-h-11 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                      <span>Deleting...</span>
                      <span className="sr-only">Please wait</span>
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
                <button
                  onClick={onCancel}
                  disabled={loading}
                  className="font-archivo flex-1 px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  Cancel
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
