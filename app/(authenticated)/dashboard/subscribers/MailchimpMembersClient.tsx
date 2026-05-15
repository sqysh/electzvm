'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Search, X, ExternalLink } from 'lucide-react'
import Link from 'next/link'

// ── Types ─────────────────────────────────────────────────────────────────────

interface MailchimpMember {
  id: string
  email_address: string
  full_name: string
  status: string
  timestamp_opt: string
  merge_fields: {
    FNAME?: string
    LNAME?: string
    PHONE?: string
  }
}

// ── Status badge ──────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    subscribed: 'border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark',
    unsubscribed: 'border-muted-light dark:border-muted-dark text-muted-light dark:text-muted-dark',
    cleaned: 'border-red-400 text-red-400',
    pending: 'border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark'
  }
  return (
    <span
      className={`font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border shrink-0 ${styles[status] ?? styles.unsubscribed}`}
    >
      {status}
    </span>
  )
}

// ── Member row ────────────────────────────────────────────────────────────────

function MemberRow({ member }: { member: MailchimpMember }) {
  const name = member.full_name || `${member.merge_fields.FNAME ?? ''} ${member.merge_fields.LNAME ?? ''}`.trim() || '—'

  const mailchimpUrl = `https://us15.admin.mailchimp.com/lists/members/view?id=${member.id}`

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 border-b border-border-light dark:border-border-dark last:border-0 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
    >
      {/* Status dot */}
      <div
        aria-hidden="true"
        className={`w-2 h-2 rounded-full shrink-0 ${member.status === 'subscribed' ? 'bg-secondary-light dark:bg-secondary-dark' : 'bg-muted-light dark:bg-muted-dark'}`}
      />

      {/* Name + email */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="font-archivo text-sm font-bold text-text-light dark:text-text-dark truncate">{name}</span>
        <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark truncate">
          {member.email_address}
        </span>
      </div>

      {/* Phone — hidden on mobile */}
      {member.merge_fields.PHONE && (
        <span className="hidden md:block font-mono text-[10px] text-muted-light dark:text-muted-dark shrink-0">
          {member.merge_fields.PHONE}
        </span>
      )}

      {/* Date */}
      <span className="hidden sm:block font-mono text-[10px] text-muted-light dark:text-muted-dark shrink-0">
        {member.timestamp_opt
          ? new Date(member.timestamp_opt).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })
          : '—'}
      </span>

      {/* Status badge */}
      <StatusBadge status={member.status} />

      {/* External link */}
      <a
        href={mailchimpUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`View ${name} in Mailchimp (opens in new tab)`}
        onClick={(e) => e.stopPropagation()}
        className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light shrink-0"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </motion.div>
  )
}

// ── MailchimpMembersClient ────────────────────────────────────────────────────

export default function MailchimpMembersClient({ members }: { members: MailchimpMember[] }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'subscribed' | 'unsubscribed'>('all')

  const filtered = members.filter((m) => {
    const name = `${m.merge_fields.FNAME ?? ''} ${m.merge_fields.LNAME ?? ''}`.toLowerCase()
    const matchesSearch =
      !search ||
      name.includes(search.toLowerCase()) ||
      m.email_address.toLowerCase().includes(search.toLowerCase()) ||
      (m.merge_fields.PHONE ?? '').includes(search)

    const matchesFilter = filter === 'all' || m.status === filter

    return matchesSearch && matchesFilter
  })

  const subscribedCount = members.filter((m) => m.status === 'subscribed').length

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
            [ Mailing List ]
          </span>
          <span className="font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50">
            · {filtered.length} of {members.length}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3">
          <span className="font-archivo text-[9px] tracking-widest uppercase text-secondary-light dark:text-secondary-dark">
            {subscribedCount} subscribed
          </span>
          <a
            href="https://us15.admin.mailchimp.com/lists/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Mailchimp audience (opens in new tab)"
            className="font-archivo text-[9px] tracking-widest uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light flex items-center gap-1"
          >
            Mailchimp <ExternalLink className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
      </header>

      {/* Status legend marquee */}
      <div className="shrink-0 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden h-7 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
          {[...Array(2)].map((_, i) => (
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

        {/* Filters */}
        <div className="flex items-center">
          {(['all', 'subscribed', 'unsubscribed'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`shrink-0 h-10 px-4 font-archivo text-[10px] tracking-[0.15em] uppercase transition-colors focus-visible:outline-none border-r border-border-light dark:border-border-dark last:border-0 ${filter === f ? 'bg-primary-light dark:bg-primary-dark text-white' : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Column headers ──────────────────────────────────────────────── */}
      <div className="shrink-0 hidden sm:grid grid-cols-[auto_1fr_140px_120px_80px_40px] items-center px-4 sm:px-5 h-8 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark gap-4">
        <div className="w-2" />
        <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
          Member
        </span>
        <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark hidden md:block">
          Phone
        </span>
        <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
          Subscribed
        </span>
        <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
          Status
        </span>
        <span className="sr-only">Actions</span>
      </div>

      {/* ── List ───────────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 gap-2">
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
            {filtered.map((member) => <MemberRow key={member.id} member={member} />).reverse()}
          </AnimatePresence>
        )}
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-archivo text-[9px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
          Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span> · Sqysh
        </span>
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
          {members.length} total members
        </span>
      </footer>
    </div>
  )
}
