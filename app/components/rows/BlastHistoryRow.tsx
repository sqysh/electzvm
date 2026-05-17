import { EmailBlast } from '@prisma/client'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

export function BlastHistoryRow({ blast }: { blast: EmailBlast }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="border-b border-border-light dark:border-border-dark last:border-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full flex items-center gap-3 px-4 py-3 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors text-left focus-visible:outline-none"
      >
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <span className="font-archivo text-xs font-bold text-text-light dark:text-text-dark truncate">
            {blast.subject}
          </span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark">
              {new Date(blast.sentAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit'
              })}
            </span>
            <span className="font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark">
              {blast.recipientCount} sent
            </span>
          </div>
        </div>
        {expanded ? (
          <ChevronUp className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark shrink-0" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark shrink-0" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-2 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  Body
                </span>
                <p className="font-inter text-xs text-text-light dark:text-text-dark leading-relaxed whitespace-pre-wrap">
                  {blast.body}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-0.5">
                  <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                    Sign-off
                  </span>
                  <span className="font-inter text-xs text-text-light dark:text-text-dark">{blast.signOff}</span>
                </div>
                {blast.sentBy && (
                  <div className="flex flex-col gap-0.5">
                    <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                      Sent by
                    </span>
                    <span className="font-inter text-xs text-text-light dark:text-text-dark">{blast.sentBy}</span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
