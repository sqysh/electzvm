'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useBodyScrollLock } from '@/app/lib/hooks/useBodyScrollLock'
import { useKeyDown } from '@/app/lib/hooks/useKeyDown'

interface DashboardPanelProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  width?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

const widthMap = {
  sm: 'w-full sm:w-96',
  md: 'w-full sm:w-[480px]',
  lg: 'w-full sm:w-[600px]'
}

export default function DashboardPanel({
  open,
  onClose,
  title,
  subtitle,
  width = 'md',
  children
}: DashboardPanelProps) {
  useBodyScrollLock(open)
  useKeyDown('Escape', onClose)

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
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={title}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className={`fixed top-0 right-0 bottom-0 z-50 ${widthMap[width]} bg-bg-light dark:bg-bg-dark border-l border-border-light dark:border-border-dark flex flex-col overflow-hidden`}
          >
            {/* Header */}
            <div className="shrink-0 flex items-center justify-between px-4 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
              <div className="flex items-center gap-3 min-w-0">
                <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark truncate">
                  {title}
                </span>
                {subtitle && (
                  <span className="font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50 shrink-0">
                    · {subtitle}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                aria-label="Close panel"
                className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light shrink-0"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 min-h-0 overflow-y-auto">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
