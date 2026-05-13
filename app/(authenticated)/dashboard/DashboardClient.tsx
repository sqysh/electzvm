'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { LogOut } from 'lucide-react'

// ── Types ─────────────────────────────────────────────────────────────────────

type NewsItem = { id: string; title: string; createdAt: Date; isPublished: boolean }
type InquiryItem = {
  id: string
  firstName: string
  lastName: string
  email: string
  createdAt: Date
  mailingList: boolean
  yardSign: boolean
  doorKnocking: boolean
}

interface DashboardClientProps {
  news: NewsItem[]
  inquiries: InquiryItem[]
  users: any[]
}

// ── Nav links ─────────────────────────────────────────────────────────────────

const navLinks = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Profile', href: '/dashboard/profile' },
  { label: 'News', href: '/dashboard/news' },
  { label: 'Inquiries', href: '/dashboard/inquiries' },
  { label: 'Page Content', href: '/content' }
]

// ── Marquee items ─────────────────────────────────────────────────────────────

const marqueeItems = [
  { dot: 'text-secondary-light dark:text-secondary-dark', label: 'PRIMARY', text: 'September 1, 2026' },
  {
    dot: 'text-cta-light dark:text-cta-dark',
    label: 'KICKOFF FUNDRAISER',
    text: 'June 6 · The Grove @ Saugus-Everett Elks Lodge · 12PM'
  },
  { dot: 'text-primary-light dark:text-primary-dark', label: 'VOTER REG DEADLINE', text: 'August 12, 2026' },
  { dot: 'text-secondary-light dark:text-secondary-dark', label: 'DOMAIN', text: 'electzvm.com' },
  { dot: 'text-cta-light dark:text-cta-dark', label: 'DONATE', text: 'secure.actblue.com/donate/zvmkickoff' }
]

// ── Sub-components ────────────────────────────────────────────────────────────

function SectionHeader({ label, count, href }: { label: string; count: number; href: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2 border-b border-border-light dark:border-border-dark">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
          [ {label} ]
        </span>
        <span className="text-[10px] font-mono text-muted-light/50 dark:text-muted-dark/50">· {count}</span>
      </div>
      <Link
        href={href}
        className="text-[9px] font-mono tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors"
      >
        View All →
      </Link>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────

export default function DashboardClient({ news, inquiries, users }: DashboardClientProps) {
  const pathname = usePathname()
  const { data: session } = useSession()

  const now = new Date()
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()
  const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark flex flex-col">
      {/* ── Top header ───────────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between px-4 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="flex items-center gap-4">
          <span className="font-archivo text-sm font-black uppercase tracking-widest text-text-light dark:text-text-dark">
            Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span>
          </span>
          <span className="hidden sm:block text-[10px] font-mono text-muted-light dark:text-muted-dark">
            {dateStr} · {timeStr}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {session?.user?.email && (
            <span className="hidden md:block text-[10px] font-mono text-muted-light dark:text-muted-dark">
              {session.user.email}
            </span>
          )}
          <span className="text-[9px] font-mono tracking-widest uppercase px-2 py-0.5 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark">
            ADMIN
          </span>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            aria-label="Sign out"
            className="text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>

      {/* ── Marquee ──────────────────────────────────────────────────────────── */}
      <div
        aria-label="Important campaign dates"
        className="shrink-0 border-b border-border-light dark:border-border-dark bg-bg-light dark:bg-bg-dark overflow-hidden h-7 flex items-center"
      >
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
          {[...marqueeItems, ...marqueeItems].map((item, i) => (
            <span key={i} className="flex items-center gap-2 shrink-0">
              <span className={`w-1.5 h-1.5 rounded-full inline-block ${item.dot} bg-current`} aria-hidden="true" />
              <span className="text-muted-light dark:text-muted-dark">{item.label}</span>
              <span className="text-text-light/60 dark:text-text-dark/60">{item.text}</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Horizontal nav ───────────────────────────────────────────────────── */}
      <nav
        aria-label="Admin navigation"
        className="shrink-0 flex items-center border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark h-9 overflow-x-auto"
      >
        {navLinks.map((link) => {
          const active = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`shrink-0 h-full flex items-center px-4 text-[10px] font-mono tracking-[0.15em] uppercase border-r border-border-light dark:border-border-dark transition-colors ${
                active
                  ? 'bg-primary-light dark:bg-primary-dark text-white'
                  : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark hover:bg-surface-alt-light dark:hover:bg-surface-alt-dark'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* ── Three column body ─────────────────────────────────────────────────── */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border-light dark:divide-border-dark overflow-hidden">
        {/* ── Users ────────────────────────────────────────────────────────────── */}
        <div className="flex flex-col overflow-hidden">
          <SectionHeader label="Users" count={users.length} href="/dashboard/users" />
          <div className="overflow-y-auto flex-1 divide-y divide-border-light dark:divide-border-dark">
            {users.length === 0 && (
              <p className="px-4 py-6 text-[11px] font-mono text-muted-light dark:text-muted-dark">No users.</p>
            )}
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/dashboard/users/${user.id}`}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[12px] font-medium text-text-light dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors truncate">
                    {user.name ?? '—'}
                  </span>
                  <span className="text-[10px] font-mono text-muted-light dark:text-muted-dark truncate">
                    {user.email}
                  </span>
                </div>
                <span className="shrink-0 text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark">
                  {user.role}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── News ───────────────────────────────────────────────────────────── */}
        <div className="flex flex-col overflow-hidden">
          <SectionHeader label="News" count={news.length} href="/dashboard/news" />
          <div className="overflow-y-auto flex-1 divide-y divide-border-light dark:divide-border-dark">
            {news.length === 0 && (
              <p className="px-4 py-6 text-[11px] font-mono text-muted-light dark:text-muted-dark">No news articles.</p>
            )}
            {news.map((article) => (
              <Link
                key={article.id}
                href={`/dashboard/news/${article.id}`}
                className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
              >
                <div className="flex flex-col gap-0.5 min-w-0">
                  <span className="text-[12px] font-medium text-text-light dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors truncate">
                    {article.title}
                  </span>
                  <span className="text-[10px] font-mono text-muted-light dark:text-muted-dark">
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                <span
                  className={`shrink-0 text-[9px] font-mono tracking-widest uppercase px-1.5 py-0.5 border ${
                    article.isPublished
                      ? 'border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark'
                      : 'border-muted-light dark:border-muted-dark text-muted-light dark:text-muted-dark'
                  }`}
                >
                  {article.isPublished ? 'Live' : 'Draft'}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* ── Inquiries ──────────────────────────────────────────────────────── */}
        <div className="flex flex-col overflow-hidden">
          <SectionHeader label="Inquiries" count={inquiries.length} href="/dashboard/inquiries" />
          <div className="overflow-y-auto flex-1 divide-y divide-border-light dark:divide-border-dark">
            {inquiries.length === 0 && (
              <p className="px-4 py-6 text-[11px] font-mono text-muted-light dark:text-muted-dark">No inquiries yet.</p>
            )}
            {inquiries.map((inq) => (
              <Link
                key={inq.id}
                href={`/dashboard/inquiries/${inq.id}`}
                className="flex flex-col gap-1 px-4 py-3 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[12px] font-medium text-text-light dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors truncate">
                    {inq.firstName} {inq.lastName}
                  </span>
                  <span className="text-[10px] font-mono text-muted-light dark:text-muted-dark shrink-0">
                    {new Date(inq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-muted-light dark:text-muted-dark truncate">
                  {inq.email}
                </span>
                <div className="flex gap-2 mt-0.5 flex-wrap">
                  {inq.mailingList && (
                    <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark">
                      Mailing List
                    </span>
                  )}
                  {inq.yardSign && (
                    <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark">
                      Yard Sign
                    </span>
                  )}
                  {inq.doorKnocking && (
                    <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 border border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark">
                      Door Knocking
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-light dark:text-muted-dark">
          Elect ZVM · Sqysh
        </span>
        <span className="text-[9px] font-mono text-muted-light dark:text-muted-dark">
          9th Essex District · Primary Sept 1, 2026
        </span>
      </footer>
    </div>
  )
}
