import { UserRecord } from '@/types/user.types'
import { useState } from 'react'
import { RoleBadge } from '../elements/RoleBadge'
import { ChevronDown, ChevronUp, Trash2, User } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

export function UserRow({
  user,
  currentUserId,
  onDelete
}: {
  user: UserRecord
  currentUserId: string | undefined
  onDelete: () => void
}) {
  const [expanded, setExpanded] = useState(false)
  const isSelf = user.id === currentUserId

  return (
    <div className="border-b border-border-light dark:border-border-dark last:border-0">
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full flex items-center gap-3 px-4 py-3.5 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors text-left focus-visible:outline-none group"
      >
        <div className="w-8 h-8 shrink-0 flex items-center justify-center border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <User className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark" aria-hidden="true" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-archivo text-sm font-bold text-text-light dark:text-text-dark truncate">
              {user.firstName ?? '—'}
            </span>
            {isSelf && (
              <span className="font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark shrink-0">
                You
              </span>
            )}
          </div>
          <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark truncate">{user.email}</span>
        </div>

        <RoleBadge role={user.role} />
        <div className="text-muted-light dark:text-muted-dark shrink-0">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Expanded */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 pt-1 bg-surface-light dark:bg-surface-dark border-t border-border-light dark:border-border-dark flex flex-col gap-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-0.5">
                  <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                    Joined
                  </span>
                  <span className="font-mono text-[11px] text-text-light dark:text-text-dark">
                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                    Role
                  </span>
                  <RoleBadge role={user.role} />
                </div>
              </div>

              {!isSelf && (
                <div className="border-t border-border-light dark:border-border-dark pt-3">
                  <button
                    onClick={onDelete}
                    className="flex items-center gap-2 font-archivo text-[10px] tracking-widest uppercase text-red-500 border border-red-500/30 px-3 py-2 hover:bg-red-500/5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 min-h-11"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Remove Member
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
