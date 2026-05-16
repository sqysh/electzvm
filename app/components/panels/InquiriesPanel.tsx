'use client'

import { useState, useMemo } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import type { VolunteerSubmission } from '@prisma/client'
import DashboardPanel from '../elements/DashboardPanel'
import { InquiryRow } from '../rows/InquiryRow'

export default function InquiriesPanel({
  open,
  onClose,
  inquiries
}: {
  open: boolean
  onClose: () => void
  inquiries: VolunteerSubmission[]
}) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'mailingList' | 'yardSign' | 'doorKnocking'>('all')

  const filtered = useMemo(
    () =>
      inquiries.filter((inq) => {
        const matchesSearch =
          !search ||
          `${inq.firstName} ${inq.lastName} ${inq.email} ${inq.phone}`.toLowerCase().includes(search.toLowerCase())
        const matchesFilter =
          filter === 'all' ||
          (filter === 'mailingList' && inq.mailingList) ||
          (filter === 'yardSign' && inq.yardSign) ||
          (filter === 'doorKnocking' && inq.doorKnocking)
        return matchesSearch && matchesFilter
      }),
    [inquiries, search, filter]
  )

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'mailingList', label: 'List' },
    { key: 'yardSign', label: 'Sign' },
    { key: 'doorKnocking', label: 'Door' }
  ]

  return (
    <DashboardPanel
      open={open}
      onClose={onClose}
      title="Inquiries"
      subtitle={`${filtered.length} of ${inquiries.length}`}
      width="md"
    >
      {/* Stats row */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2.5 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-archivo text-[9px] tracking-widest uppercase text-primary-light dark:text-primary-dark">
          {inquiries.filter((i) => i.mailingList).length} list
        </span>
        <span className="font-archivo text-[9px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark">
          {inquiries.filter((i) => i.yardSign).length} signs
        </span>
        <span className="font-archivo text-[9px] tracking-widest uppercase text-cta-light dark:text-cta-dark">
          {inquiries.filter((i) => i.doorKnocking).length} door
        </span>
      </div>

      {/* Marquee */}
      <div className="shrink-0 border-b border-border-light dark:border-border-dark overflow-hidden h-7 flex items-center bg-surface-light dark:bg-surface-dark">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary-light dark:bg-primary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-primary-light dark:text-primary-dark">L</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— mailing list</span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-secondary-light dark:text-secondary-dark">S</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— yard sign</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cta-light dark:bg-cta-dark shrink-0" aria-hidden="true" />
                <span className="text-cta-light dark:text-cta-dark">D</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— door knocking</span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted-light dark:bg-muted-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-muted-light dark:text-muted-dark">Expand</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— click a row to see full details</span>
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
          placeholder="Search by name, email or phone..."
          aria-label="Search inquiries"
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
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex-1 h-9 font-archivo text-[10px] tracking-[0.15em] uppercase transition-colors focus-visible:outline-none border-r border-border-light dark:border-border-dark last:border-0 ${filter === f.key ? 'bg-primary-light dark:bg-primary-dark text-white' : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <p className="font-archivo text-[11px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
              No inquiries found
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
            {filtered.map((inquiry) => (
              <InquiryRow key={inquiry.id} inquiry={inquiry} />
            ))}
          </AnimatePresence>
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">{inquiries.length} total</span>
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">{filtered.length} shown</span>
      </div>
    </DashboardPanel>
  )
}
