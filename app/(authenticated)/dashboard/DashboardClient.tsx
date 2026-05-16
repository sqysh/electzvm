'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { FileText, LogOut, Map, ExternalLink, Calendar, Globe } from 'lucide-react'
import type { News } from '@prisma/client'
import { PRIMARY_DATE } from '@/app/lib/constants/canvas-pin.constants'
import { useClock } from '@/app/lib/hooks/useClock'
import { useState } from 'react'
import { useDaysUntil } from '@/app/lib/utils/date.utils'
import TeamPanel from '@/app/components/panels/TeamPanel'
import { UserRecord } from '@/types/user.types'
import { DashboardProps } from '@/types/dashboard.types'
import SubscribersPanel from '@/app/components/panels/SubscribersPanel'
import NewsPanel from '@/app/components/panels/NewsPanel'
import InquiriesPanel from '@/app/components/panels/InquiriesPanel'
import { useRouter } from 'next/navigation'
import PageContentEditorPanel from '@/app/components/panels/PageContentEditorPanel'
import { PrimaryCountdown } from '@/app/components/PrimaryBreakdown'
import { CanvassBreakdown } from '@/app/components/CanvassBreakdown'
import { StatPill } from '@/app/components/StatPill'
import { MapPanel } from '@/app/components/MapPanel'

export default function DashboardClient({
  news: initialNews,
  inquiries,
  mailchimpCount,
  pinCount,
  doorsKnocked,
  pins,
  users: initialUsers,
  members,
  pages
}: DashboardProps) {
  const { data: session } = useSession()
  const router = useRouter()
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const time = useClock()
  const daysUntil = useDaysUntil(PRIMARY_DATE)
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'
  const timeStr =
    time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) ?? ''
  const dateStr =
    time?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase() ?? ''
  const [users, setUsers] = useState<UserRecord[]>(initialUsers)
  const [news, setNews] = useState<News[]>(initialNews)
  const usersCount = users.length

  return (
    <>
      {/* // Panels */}
      <TeamPanel
        open={activePanel === 'team'}
        onClose={() => setActivePanel(null)}
        users={users}
        currentUserId={session?.user?.id}
        onUsersChange={setUsers}
      />

      <SubscribersPanel open={activePanel === 'subscribers'} onClose={() => setActivePanel(null)} members={members} />

      <NewsPanel
        open={activePanel === 'news'}
        onClose={() => setActivePanel(null)}
        news={news}
        onNewsChange={setNews}
      />

      <InquiriesPanel open={activePanel === 'inquiries'} onClose={() => setActivePanel(null)} inquiries={inquiries} />

      <PageContentEditorPanel open={activePanel === 'page'} onClose={() => setActivePanel(null)} pages={pages} />

      <div className="h-screen w-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark flex flex-col overflow-hidden">
        {/* Header */}
        <header className="shrink-0 flex items-center justify-between px-4 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="font-archivo text-sm font-black uppercase tracking-widest text-text-light dark:text-text-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            >
              Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span>
            </Link>
            <div aria-hidden="true" className="hidden sm:block w-px h-3 bg-border-light dark:bg-border-dark" />
            <span className="hidden sm:block font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              Campaign Control
            </span>
          </div>
          {time && (
            <div className="hidden md:flex items-center gap-3">
              <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark">{dateStr}</span>
              <span className="font-mono text-[11px] text-text-light dark:text-text-dark tabular-nums">{timeStr}</span>
            </div>
          )}

          <div className="flex items-center gap-3">
            <span className="hidden sm:block font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark">
              {firstName}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              aria-label="Sign out"
              className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Countdown */}
        <div className="shrink-0 flex items-center justify-between px-4 h-7 border-b border-border-light dark:border-border-dark bg-primary-light/5 dark:bg-primary-dark/5">
          <div className="flex items-center gap-3">
            <Calendar className="w-3 h-3 text-primary-light dark:text-primary-dark shrink-0" aria-hidden="true" />
            <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              Primary Election · September 1, 2026
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-archivo text-[11px] font-black text-primary-light dark:text-primary-dark tabular-nums">
              {daysUntil}
            </span>
            <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark">
              days remaining
            </span>
          </div>
        </div>

        {/* Main 3-col grid */}
        <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-[220px_1fr_220px] overflow-hidden">
          {/* Left */}
          <div className="hidden lg:flex flex-col border-r border-border-light dark:border-border-dark overflow-hidden">
            <div className="shrink-0 px-4 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
              <span className="font-archivo text-[9px] tracking-[0.25em] uppercase text-muted-light dark:text-muted-dark">
                Campaign Stats
              </span>
            </div>
            <StatPill
              label="Team"
              value={usersCount}
              onClick={() => setActivePanel('team')}
              accent="text-primary-light dark:text-primary-dark"
            />
            <StatPill
              label="Mailing List"
              value={mailchimpCount}
              onClick={() => setActivePanel('subscribers')}
              accent="text-secondary-light dark:text-secondary-dark"
            />
            <StatPill
              label="News Articles"
              value={news.length}
              onClick={() => setActivePanel('news')}
              accent="text-cta-light dark:text-cta-dark"
            />
            <StatPill
              label="Inquiries"
              value={inquiries.length}
              onClick={() => setActivePanel('inquiries')}
              accent="text-primary-light dark:text-primary-dark"
            />
            <StatPill
              label="Canvass Pins"
              value={pinCount}
              onClick={() => router.push('/dashboard/canvassing-map')}
              accent="text-secondary-light dark:text-secondary-dark"
            />
            <StatPill
              label="Pages"
              value={pages.length}
              onClick={() => setActivePanel('page')}
              accent="text-cta-light dark:text-cta-dark"
            />
            <div className="flex-1" />
            <div className="shrink-0 border-t border-border-light dark:border-border-dark">
              <div className="px-4 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                <span className="font-archivo text-[9px] tracking-[0.25em] uppercase text-muted-light dark:text-muted-dark">
                  Quick Links
                </span>
              </div>
              {[
                { label: 'Public Site', href: '/', icon: Globe },
                { label: 'Page Content', href: '/dashboard/content', icon: FileText }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-3 px-4 py-2.5 border-b border-border-light dark:border-border-dark last:border-0 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group focus-visible:outline-none"
                >
                  <link.icon className="w-3 h-3 text-muted-light dark:text-muted-dark shrink-0" aria-hidden="true" />
                  <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark group-hover:text-text-light dark:group-hover:text-text-dark transition-colors">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Center — Map */}
          <div className="flex flex-col min-h-0 overflow-hidden">
            <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
              <div className="flex items-center gap-2">
                <Map className="w-3 h-3 text-primary-light dark:text-primary-dark" aria-hidden="true" />
                <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  Canvassing Map · Live
                </span>
              </div>
              <Link
                href="/dashboard/canvassing-map"
                className="font-archivo text-[9px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light flex items-center gap-1"
              >
                Open Full Map <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex-1 min-h-0">
              <MapPanel pinCount={pinCount} doorsKnocked={doorsKnocked} pins={pins} />
            </div>

            <div className="lg:hidden shrink-0 grid grid-cols-4 border-t border-border-light dark:border-border-dark">
              {[
                { label: 'Users', href: '/dashboard/users', value: usersCount },
                { label: 'News', href: '/dashboard/news', value: news.length },
                { label: 'List', href: '/dashboard/subscribers', value: mailchimpCount },
                { label: 'Inquiries', href: '/dashboard/inquiries', value: inquiries.length }
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center justify-center py-3 border-r border-border-light dark:border-border-dark last:border-0 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus-visible:outline-none"
                >
                  <span className="font-archivo text-base font-black text-primary-light dark:text-primary-dark tabular-nums">
                    {item.value}
                  </span>
                  <span className="font-archivo text-[9px] tracking-widest uppercase text-muted-light dark:text-muted-dark">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="hidden lg:flex flex-col border-l border-border-light dark:border-border-dark overflow-hidden">
            {/* Countdown */}
            <div className="shrink-0 flex flex-col border-b border-border-light dark:border-border-dark">
              <div className="px-4 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                <span className="font-archivo text-[9px] tracking-[0.25em] uppercase text-muted-light dark:text-muted-dark">
                  Primary Countdown
                </span>
              </div>
              <PrimaryCountdown />
            </div>

            {/* Canvass breakdown */}
            <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
              <div className="px-4 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shrink-0">
                <span className="font-archivo text-[9px] tracking-[0.25em] uppercase text-muted-light dark:text-muted-dark">
                  Canvass Breakdown
                </span>
              </div>
              <CanvassBreakdown pins={pins} doorsKnocked={doorsKnocked} pinCount={pinCount} />
            </div>
          </div>
        </div>

        {/* Status bar */}
        <footer className="shrink-0 flex items-center justify-between px-4 h-7 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <div className="flex items-center gap-4">
            <span className="font-archivo text-[9px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
              Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span>
            </span>
            <div aria-hidden="true" className="w-px h-3 bg-border-light dark:bg-border-dark" />
            <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
              {news.filter((n) => n.isPublished).length} live · {inquiries.length} inquiries · {pinCount} pins
            </span>
          </div>
          <a
            href="https://sqysh.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-archivo text-[9px] tracking-widest uppercase text-muted-light/40 dark:text-muted-dark/40 hover:text-primary-light dark:hover:text-primary-dark transition-colors"
          >
            Sqysh
          </a>
        </footer>
      </div>
    </>
  )
}
