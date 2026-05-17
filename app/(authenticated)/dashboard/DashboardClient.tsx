'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { LogOut, Map, ExternalLink, Calendar, Globe, UserPlus, BarChart2, Globe2 } from 'lucide-react'
import type { Endorsement, News } from '@prisma/client'
import { PRIMARY_DATE } from '@/app/lib/constants/canvas-pin.constants'
import { useState } from 'react'
import { useDaysUntil } from '@/app/lib/utils/date.utils'
import { UserRecord } from '@/types/user.types'
import { DashboardProps } from '@/types/dashboard.types'
import { PrimaryCountdown } from '@/app/components/PrimaryBreakdown'
import { CanvassBreakdown } from '@/app/components/CanvassBreakdown'
import { StatPill } from '@/app/components/StatPill'
import { MapPanel } from '@/app/components/MapPanel'
import { DashboardPanels } from '@/app/components/DashboardPanels'
import { LiveClock } from '@/app/components/LiveClock'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'

export default function DashboardClient({
  news: initialNews,
  inquiries,
  mailchimpCount,
  pinCount,
  doorsKnocked,
  pins,
  users: initialUsers,
  members,
  pages,
  endorsements: initialEndorsements
}: DashboardProps) {
  const { data: session } = useSession()
  const [activePanel, setActivePanel] = useState<string | null>(null)
  const daysUntil = useDaysUntil(PRIMARY_DATE)
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'
  const [users, setUsers] = useState<UserRecord[]>(initialUsers)
  const [news, setNews] = useState<News[]>(initialNews)
  const [endorsements, setEndorsements] = useState<Endorsement[]>(initialEndorsements)
  const { play: openSE } = useSoundEffect('/sound-effects/se-7.mp3', true)
  const { play: closSE } = useSoundEffect('/sound-effects/se-9.mp3', true)
  const { play: openFullMapSE } = useSoundEffect('/sound-effects/se-18.mp3', true)
  const { play: logoSE } = useSoundEffect('/sound-effects/se-19.mp3', true)

  const PANELS = [
    { key: 'team', label: 'Team', value: users.length, accent: 'text-primary-light dark:text-primary-dark' },
    {
      key: 'subscribers',
      label: 'Mailing List',
      value: mailchimpCount,
      accent: 'text-secondary-light dark:text-secondary-dark'
    },
    { key: 'news', label: 'News Articles', value: news.length, accent: 'text-cta-light dark:text-cta-dark' },
    {
      key: 'inquiries',
      label: 'Inquiries',
      value: inquiries.length,
      accent: 'text-primary-light dark:text-primary-dark'
    },
    { key: 'page', label: 'Pages', value: pages.length, accent: 'text-secondary-light dark:text-secondary-dark' },
    {
      key: 'endorsement',
      label: 'Endorsements',
      value: endorsements.length,
      accent: 'text-cta-light dark:text-cta-dark'
    }
  ]

  return (
    <>
      {/* // Panels */}
      <DashboardPanels
        activePanel={activePanel}
        onClose={() => {
          closSE()
          setActivePanel(null)
        }}
        users={users}
        news={news}
        members={members}
        inquiries={inquiries}
        pages={pages}
        session={session}
        setUsers={setUsers}
        setNews={setNews}
        endorsements={endorsements}
        setEndorsements={setEndorsements}
      />

      <div className="h-screen w-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark flex flex-col overflow-hidden">
        <header className="shrink-0 flex items-center justify-between px-3 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark gap-2">
          {/* Left */}
          <div className="flex items-center gap-2 min-w-0">
            <Link
              onClick={() => logoSE()}
              href="/"
              className="font-archivo text-sm font-black uppercase tracking-widest text-text-light dark:text-text-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light shrink-0"
            >
              Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span>
            </Link>
            <div aria-hidden="true" className="hidden sm:block w-px h-3 bg-border-light dark:bg-border-dark shrink-0" />
            <span className="hidden sm:block font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark truncate">
              Campaign Control
            </span>
          </div>

          {/* Center — clock */}
          <div className="hidden md:block shrink-0">
            <LiveClock />
          </div>

          {/* Right */}
          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden xs:block font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark">
              {firstName}
            </span>
            <button
              onClick={() => signOut({ redirectTo: '/login' })}
              aria-label="Sign out"
              className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* Countdown */}
        <div className="shrink-0 flex items-center justify-between px-3 h-7 border-b border-border-light dark:border-border-dark bg-primary-light/5 dark:bg-primary-dark/5 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <Calendar className="w-3 h-3 text-primary-light dark:text-primary-dark shrink-0" aria-hidden="true" />
            <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark truncate">
              <span className="hidden xs:inline">Primary Election · </span>Sept 1, 2026
            </span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="font-archivo text-[11px] font-black text-primary-light dark:text-primary-dark tabular-nums">
              {daysUntil}
            </span>
            <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark">
              <span className="hidden xs:inline">days </span>left
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
            {PANELS.map((p) => (
              <StatPill
                key={p.key}
                label={p.label}
                value={p.value}
                onClick={() => {
                  openSE()
                  setActivePanel(p.key)
                }}
                accent={p.accent}
              />
            ))}
            <div className="flex-1" />
            <div className="shrink-0 border-t border-border-light dark:border-border-dark">
              <div className="px-4 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                <span className="font-archivo text-[9px] tracking-[0.25em] uppercase text-muted-light dark:text-muted-dark">
                  Quick Links
                </span>
              </div>
              {[
                { label: 'Public Site', href: '/', icon: Globe },
                {
                  label: 'Add to Mailchimp',
                  href: 'https://us15.admin.mailchimp.com/audience/add-contact?id=98',
                  icon: UserPlus,
                  external: true
                },
                {
                  label: 'Google Analytics',
                  href: 'https://analytics.google.com/analytics/web/?authuser=0&hl=en-US#/a395097796p538034285/reports/intelligenthome?params=_u..nav%3Dmaui',
                  icon: BarChart2,
                  external: true
                },
                { label: 'GoDaddy', href: 'https://sso.godaddy.com', icon: Globe2, external: true }
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  target={link.external ? '_blank' : undefined}
                  rel={link.external ? 'noopener noreferrer' : undefined}
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
            <div className="shrink-0 flex items-center justify-between px-3 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
              <div className="flex items-center gap-2">
                <Map className="w-3 h-3 text-primary-light dark:text-primary-dark" aria-hidden="true" />
                <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  Canvassing Map · Live
                </span>
              </div>
              <Link
                onClick={() => openFullMapSE()}
                href="/dashboard/canvassing-map"
                className="font-archivo text-[9px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light flex items-center gap-1"
              >
                Open Full Map <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex-1 min-h-0">
              <MapPanel pinCount={pinCount} doorsKnocked={doorsKnocked} pins={pins} />
            </div>

            <div className="lg:hidden shrink-0 border-t border-border-light dark:border-border-dark overflow-x-auto">
              <div className="flex min-w-max">
                {[
                  { label: 'Users', panel: 'team', value: users.length },
                  { label: 'News', panel: 'news', value: news.length },
                  { label: 'List', panel: 'subscribers', value: mailchimpCount },
                  { label: 'Inquiries', panel: 'inquiries', value: inquiries.length },
                  { label: 'Endorse', panel: 'endorsement', value: endorsements.length }
                ].map((item) => (
                  <button
                    key={item.panel}
                    onClick={() => setActivePanel(item.panel)}
                    className="flex flex-col items-center justify-center py-3 px-4 border-r border-border-light dark:border-border-dark last:border-0 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus-visible:outline-none shrink-0"
                  >
                    <span className="font-archivo text-base font-black text-primary-light dark:text-primary-dark tabular-nums">
                      {item.value}
                    </span>
                    <span className="font-archivo text-[9px] tracking-widest uppercase text-muted-light dark:text-muted-dark">
                      {item.label}
                    </span>
                  </button>
                ))}
              </div>
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
