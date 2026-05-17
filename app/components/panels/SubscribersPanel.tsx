'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Search, X, ExternalLink } from 'lucide-react'
import DashboardPanel from '../elements/DashboardPanel'
import { MailchimpMember } from '@/types/mailchimp.types'
import { SubscriberRow } from '../rows/SubscriberRow'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'

export default function SubscribersPanel({
  open,
  onClose,
  members = []
}: {
  open: boolean
  onClose: () => void
  members: MailchimpMember[]
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'subscribed' | 'unsubscribed'>('all')
  const { play } = useSoundEffect('/sound-effects/se-12.mp3', true)

  const filtered = useMemo(
    () =>
      members.filter((m) => {
        const name = `${m.merge_fields.FNAME ?? ''} ${m.merge_fields.LNAME ?? ''}`.toLowerCase()
        const matchesSearch =
          !search || name.includes(search.toLowerCase()) || m.email_address.toLowerCase().includes(search.toLowerCase())
        const matchesFilter = filter === 'all' || m.status === filter
        return matchesSearch && matchesFilter
      }),
    [members, search, filter]
  )

  const subscribedCount = members.filter((m) => m.status === 'subscribed').length

  return (
    <DashboardPanel
      open={open}
      onClose={onClose}
      title="Mailing List"
      subtitle={`${filtered.length} of ${members.length}`}
      width="md"
    >
      {/* Stats + Mailchimp link */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-archivo text-[10px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark">
          {subscribedCount} subscribed
        </span>
        <a
          href="https://us15.admin.mailchimp.com/lists/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-archivo text-[9px] tracking-widest uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light flex items-center gap-1"
        >
          Mailchimp <ExternalLink className="w-3 h-3" aria-hidden="true" />
        </a>
      </div>

      {/* Marquee */}
      <div className="shrink-0 border-b border-border-light dark:border-border-dark overflow-hidden h-7 flex items-center bg-surface-light dark:bg-surface-dark">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-secondary-light dark:text-secondary-dark">Subscribed</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— actively receiving emails</span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted-light dark:bg-muted-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-muted-light dark:text-muted-dark">Unsubscribed</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— opted out of emails</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" aria-hidden="true" />
                <span className="text-red-400">Cleaned</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— bounced or invalid address</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cta-light dark:bg-cta-dark shrink-0" aria-hidden="true" />
                <span className="text-cta-light dark:text-cta-dark">Pending</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— awaiting confirmation</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="shrink-0 flex items-center gap-2 px-4 border-b border-border-light dark:border-border-dark">
        <Search className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark shrink-0" aria-hidden="true" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          aria-label="Search members"
          className="flex-1 h-10 bg-transparent font-inter text-sm text-text-light dark:text-text-dark placeholder:text-muted-light/40 dark:placeholder:text-muted-dark/40 outline-none"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            aria-label="Clear search"
            className="text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div className="shrink-0 flex border-b border-border-light dark:border-border-dark">
        {(['all', 'subscribed', 'unsubscribed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => {
              play()
              setFilter(f)
            }}
            className={`flex-1 h-9 font-archivo text-[10px] tracking-[0.15em] uppercase transition-colors focus-visible:outline-none border-r border-border-light dark:border-border-dark last:border-0 ${filter === f ? 'bg-primary-light dark:bg-primary-dark text-white' : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Members list */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <p className="font-archivo text-[11px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
              No members found
            </p>
            {search && (
              <button
                onClick={() => setSearch('')}
                className="font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {filtered.map((member) => (
              <SubscriberRow key={member.id} member={member} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">{members.length} total</span>
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">{subscribedCount} active</span>
      </div>
    </DashboardPanel>
  )
}
