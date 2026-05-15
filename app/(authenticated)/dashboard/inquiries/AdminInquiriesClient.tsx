'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, X, Mail, Phone, ChevronDown, ChevronUp } from 'lucide-react'
import Link from 'next/link'
import type { VolunteerSubmission } from '@prisma/client'
import { InterestBadge } from '@/app/components/elements/InterestBadge'

// ── Inquiry row ───────────────────────────────────────────────────────────────

function InquiryRow({ inquiry }: { inquiry: VolunteerSubmission }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.2 }}
      className="border-b border-border-light dark:border-border-dark last:border-0"
    >
      {/* Row */}
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        aria-expanded={expanded}
        className="w-full flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-4 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors text-left focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary-light group"
      >
        {/* Status dot */}
        <div
          aria-hidden="true"
          className="w-2 h-2 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0 mt-0.5"
        />

        {/* Name + email */}
        <div className="flex-1 min-w-0 flex flex-col gap-0.5">
          <span className="font-archivo text-sm font-bold text-text-light dark:text-text-dark truncate">
            {inquiry.firstName} {inquiry.lastName}
          </span>
          <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark truncate">{inquiry.email}</span>
        </div>

        {/* Interest badges — hidden on mobile */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          {inquiry.mailingList && (
            <InterestBadge
              label="List"
              color="border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
            />
          )}
          {inquiry.yardSign && (
            <InterestBadge
              label="Sign"
              color="border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark"
            />
          )}
          {inquiry.doorKnocking && (
            <InterestBadge
              label="Door"
              color="border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark"
            />
          )}
        </div>

        {/* Date */}
        <span className="hidden md:block font-mono text-[10px] text-muted-light dark:text-muted-dark shrink-0">
          {new Date(inquiry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>

        {/* Expand icon */}
        <div className="shrink-0 text-muted-light dark:text-muted-dark group-hover:text-text-light dark:group-hover:text-text-dark transition-colors">
          {expanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {/* Expanded detail */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 sm:px-5 pb-5 pt-1 flex flex-col gap-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                <a
                  href={`mailto:${inquiry.email}`}
                  className="flex items-center gap-2 font-inter text-sm text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  <Mail className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark shrink-0" aria-hidden="true" />
                  {inquiry.email}
                </a>
                <a
                  href={`tel:${inquiry.phone}`}
                  className="flex items-center gap-2 font-inter text-sm text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  <Phone className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark shrink-0" aria-hidden="true" />
                  {inquiry.phone}
                </a>
              </div>

              {/* Interests */}
              <div className="flex flex-col gap-2">
                <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  How they want to help
                </span>
                <div className="flex flex-wrap gap-2">
                  {inquiry.mailingList && (
                    <InterestBadge
                      label="Join the mailing list"
                      color="border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
                    />
                  )}
                  {inquiry.yardSign && (
                    <InterestBadge
                      label="Put a sign in my yard"
                      color="border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark"
                    />
                  )}
                  {inquiry.doorKnocking && (
                    <InterestBadge
                      label="Join the door knocking crew"
                      color="border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark"
                    />
                  )}
                  {!inquiry.mailingList && !inquiry.yardSign && !inquiry.doorKnocking && (
                    <span className="font-inter text-xs text-muted-light dark:text-muted-dark">
                      No interests selected
                    </span>
                  )}
                </div>
              </div>

              {/* Submitted */}
              <div className="flex items-center gap-2">
                <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  Submitted
                </span>
                <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark">
                  {new Date(inquiry.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

// ── AdminInquiriesClient ──────────────────────────────────────────────────────

export default function AdminInquiriesClient({ inquiries }: { inquiries: VolunteerSubmission[] }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'mailingList' | 'yardSign' | 'doorKnocking'>('all')

  const filtered = inquiries.filter((inq) => {
    const matchesSearch =
      !search ||
      `${inq.firstName} ${inq.lastName} ${inq.email} ${inq.phone}`.toLowerCase().includes(search.toLowerCase())

    const matchesFilter =
      filter === 'all' ||
      (filter === 'mailingList' && inq.mailingList) ||
      (filter === 'yardSign' && inq.yardSign) ||
      (filter === 'doorKnocking' && inq.doorKnocking)

    return matchesSearch && matchesFilter
  })

  const filters: { key: typeof filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'mailingList', label: 'Mailing List' },
    { key: 'yardSign', label: 'Yard Sign' },
    { key: 'doorKnocking', label: 'Door Knocking' }
  ]

  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between px-4 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div aria-hidden="true" className="w-px h-3 bg-border-light dark:bg-border-dark" />
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            [ Inquiries ]
          </span>
          <span className="font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50">
            · {filtered.length} of {inquiries.length}
          </span>
        </div>

        {/* Stats */}
        <div className="hidden sm:flex items-center gap-4">
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
      </header>

      {/* Status legend marquee */}
      <div className="shrink-0 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden h-7 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary-light dark:bg-primary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-primary-light dark:text-primary-dark">Mailing List</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— wants campaign updates via email</span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-secondary-light dark:text-secondary-dark">Yard Sign</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— wants a sign in their yard</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cta-light dark:bg-cta-dark shrink-0" aria-hidden="true" />
                <span className="text-cta-light dark:text-cta-dark">Door Knocking</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— wants to canvass the district</span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-muted-light dark:text-muted-dark">Submitted</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— click any row to expand details</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Search + filter bar ─────────────────────────────────────────── */}
      <div className="shrink-0 flex flex-col sm:flex-row border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        {/* Search */}
        <div className="flex items-center gap-2 px-4 border-b sm:border-b-0 sm:border-r border-border-light dark:border-border-dark flex-1">
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

        {/* Filters */}
        <div className="flex items-center overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`shrink-0 h-10 px-4 font-archivo text-[10px] tracking-[0.15em] uppercase transition-colors focus-visible:outline-none border-r border-border-light dark:border-border-dark last:border-0 ${filter === f.key ? 'bg-primary-light dark:bg-primary-dark text-white' : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── List ───────────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-2">
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

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-archivo text-[9px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
          Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span> · Sqysh
        </span>
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
          {inquiries.length} total submissions
        </span>
      </footer>
    </div>
  )
}
