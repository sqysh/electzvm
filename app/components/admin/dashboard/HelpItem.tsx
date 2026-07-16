import { HelpSection } from '@/types/help.types'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export function HelpItem({ section }: { section: HelpSection }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border-light dark:border-border-dark last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors text-left focus-visible:outline-none"
      >
        <span className="font-archivo text-sm font-bold uppercase tracking-wide text-text-light dark:text-text-dark">
          {section.title}
        </span>
        {open ? (
          <ChevronUp className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark shrink-0" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark shrink-0" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
              {section.content}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
