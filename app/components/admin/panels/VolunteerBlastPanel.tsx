'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Users } from 'lucide-react'
import { EmailBlast } from '@prisma/client'
import DashboardPanel from './DashboardPanel'
import { BlastHistoryRow } from '../rows/BlastHistoryRow'
import { VolunteerBlastForm } from '../../forms/VolunteerBlastForm'

interface IVolunteerBlastPanel {
  open: boolean
  onClose: () => void
  volunteerCount: number
  blastHistory: EmailBlast[]
  onBlastChange: React.Dispatch<React.SetStateAction<EmailBlast[]>>
}

export default function VolunteerBlastPanel({
  open,
  onClose,
  volunteerCount,
  blastHistory,
  onBlastChange
}: IVolunteerBlastPanel) {
  const [tab, setTab] = useState<'compose' | 'history'>('compose')

  return (
    <DashboardPanel
      open={open}
      onClose={onClose}
      title="Volunteer Blast"
      subtitle={`${volunteerCount} recipients`}
      width="lg"
    >
      {/* Tabs */}
      <div className="shrink-0 flex border-b border-border-light dark:border-border-dark">
        {(['compose', 'history'] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 h-9 font-archivo text-[10px] tracking-[0.15em] uppercase transition-colors focus-visible:outline-none ${tab === t ? 'bg-primary-light dark:bg-primary-dark text-white' : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
          >
            {t === 'compose' ? 'Compose' : `History (${blastHistory.length})`}
          </button>
        ))}
      </div>

      {/* Marquee */}
      <div className="shrink-0 border-b border-border-light dark:border-border-dark overflow-hidden h-7 flex items-center bg-surface-light dark:bg-surface-dark">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary-light dark:bg-primary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-primary-light dark:text-primary-dark">{volunteerCount} volunteers</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">
                  — everyone who submitted the contact form
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cta-light dark:bg-cta-dark shrink-0" aria-hidden="true" />
                <span className="text-cta-light dark:text-cta-dark">Sent from</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">
                  — noreply@electzvm.com as Zosia VanMeter
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-secondary-light dark:text-secondary-dark">Batched</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">
                  — sent in groups of 50 to avoid rate limits
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Compose tab */}
      {tab === 'compose' && (
        <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4">
          {/* Recipient count */}
          <div className="flex items-center gap-3 px-3 py-2.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
            <Users className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0" aria-hidden="true" />
            <span className="font-inter text-sm text-text-light dark:text-text-dark">
              Sending to <strong>{volunteerCount}</strong> volunteer{volunteerCount !== 1 ? 's' : ''}
            </span>
          </div>

          <VolunteerBlastForm
            blastHistory={blastHistory}
            volunteerCount={volunteerCount}
            onBlastChange={onBlastChange}
          />

          {/* Blast history */}
          {blastHistory.length > 0 && (
            <div className="flex flex-col gap-2 pt-2 border-t border-border-light dark:border-border-dark">
              <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                Send History
              </span>
              <div className="flex flex-col divide-y divide-border-light dark:divide-border-dark border border-border-light dark:border-border-dark">
                {blastHistory.slice(0, 5).map((blast) => (
                  <div key={blast.id} className="flex items-center justify-between gap-3 px-3 py-2.5">
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="font-archivo text-xs font-bold text-text-light dark:text-text-dark truncate">
                        {blast.subject}
                      </span>
                      <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark">
                        {new Date(blast.sentAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    <span className="font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark shrink-0">
                      {blast.recipientCount} sent
                    </span>
                  </div>
                ))}
              </div>
              {blastHistory.length > 5 && (
                <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark text-right">
                  +{blastHistory.length - 5} more
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* History tab */}
      {tab === 'history' && (
        <div className="flex-1 overflow-y-auto">
          {blastHistory.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2">
              <p className="font-archivo text-[11px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
                No blasts sent yet
              </p>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {blastHistory.map((blast) => (
                <BlastHistoryRow key={blast.id} blast={blast} />
              ))}
            </AnimatePresence>
          )}
        </div>
      )}

      {/* Footer */}
      <div className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
          {blastHistory.length} blasts sent
        </span>
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">{volunteerCount} volunteers</span>
      </div>
    </DashboardPanel>
  )
}
