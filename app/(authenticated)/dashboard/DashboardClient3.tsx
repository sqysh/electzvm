'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import {
  Newspaper,
  MessageSquare,
  FileText,
  LogOut,
  Map,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  Activity,
  Calendar,
  Globe,
  Loader2
} from 'lucide-react'
import type { CanvassPin, News, VolunteerSubmission } from '@prisma/client'
import {
  CENTER,
  LIBRARIES,
  LIGHT_MAP_STYLES,
  MAP_STYLES,
  PRIMARY_DATE,
  ZOOM
} from '@/app/lib/constants/canvas-pin.constants'
import { useUiSelector } from '@/app/lib/redux/store'
import { PulsePin } from '@/app/components/PulsePin'
import { useClock } from '@/app/lib/hooks/useClock'
import { memo } from 'react'
import { useDaysUntil } from '@/app/lib/utils/date.utils'

// ── Types ─────────────────────────────────────────────────────────────────────

interface DashboardProps {
  news: News[]
  inquiries: VolunteerSubmission[]
  media: { id: string; url: string; type: string }[]
  userCount: number
  mailchimpCount: number
  pinCount: number
  doorsKnocked: number
  pins: CanvassPin[]
}

// ── Stat pill ─────────────────────────────────────────────────────────────────

const StatPill = memo(function StatPill({
  label,
  value,
  href,
  accent
}: {
  label: string
  value: number | string
  href: string
  accent: string
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between gap-4 px-4 py-3 border-b border-border-light dark:border-border-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus-visible:outline-none"
    >
      <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className={`font-archivo text-lg font-black tabular-nums ${accent}`}>{value}</span>
        <ChevronRight
          className="w-3 h-3 text-muted-light dark:text-muted-dark group-hover:translate-x-0.5 transition-transform"
          aria-hidden="true"
        />
      </div>
    </Link>
  )
})

// ── News feed ─────────────────────────────────────────────────────────────────

const NewsFeed = memo(function NewsFeed({ news }: { news: News[] }) {
  const published = news.filter((n) => n.isPublished).slice(0, 5)
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-light dark:border-border-dark shrink-0">
        <div className="flex items-center gap-2">
          <Newspaper className="w-3 h-3 text-cta-light dark:text-cta-dark" aria-hidden="true" />
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            News
          </span>
          <span className="font-mono text-[10px] text-muted-light/40 dark:text-muted-dark/40">· {news.length}</span>
        </div>
        <Link
          href="/dashboard/news"
          className="font-archivo text-[9px] tracking-widest uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
        >
          Manage →
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-border-light dark:divide-border-dark">
        {published.length === 0 ? (
          <div className="flex items-center justify-center h-16">
            <span className="font-archivo text-[10px] uppercase tracking-widest text-muted-light/40 dark:text-muted-dark/40">
              No articles
            </span>
          </div>
        ) : (
          published.map((a) => (
            <Link
              key={a.id}
              href={`/dashboard/news?id=${a.id}`}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group"
            >
              <div
                className={`w-1.5 h-1.5 rounded-full shrink-0 ${a.isPublished ? 'bg-secondary-light dark:bg-secondary-dark' : 'bg-muted-light dark:bg-muted-dark'}`}
                aria-hidden="true"
              />
              <span className="font-archivo text-xs font-bold text-text-light dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors truncate flex-1">
                {a.title}
              </span>
              <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark shrink-0">
                {new Date(a.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
})

// ── Inquiries feed ────────────────────────────────────────────────────────────

const InquiriesFeed = memo(function InquiriesFeed({ inquiries }: { inquiries: VolunteerSubmission[] }) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border-light dark:border-border-dark shrink-0">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-3 h-3 text-primary-light dark:text-primary-dark" aria-hidden="true" />
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            Inquiries
          </span>
          <span className="font-mono text-[10px] text-muted-light/40 dark:text-muted-dark/40">
            · {inquiries.length}
          </span>
        </div>
        <Link
          href="/dashboard/inquiries"
          className="font-archivo text-[9px] tracking-widest uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
        >
          View All →
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-border-light dark:divide-border-dark">
        {inquiries.length === 0 ? (
          <div className="flex items-center justify-center h-16">
            <span className="font-archivo text-[10px] uppercase tracking-widest text-muted-light/40 dark:text-muted-dark/40">
              No inquiries
            </span>
          </div>
        ) : (
          inquiries.slice(0, 5).map((inq) => (
            <div key={inq.id} className="flex items-center gap-3 px-4 py-2.5">
              <div
                className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                aria-hidden="true"
              />
              <span className="font-archivo text-xs font-bold text-text-light dark:text-text-dark truncate flex-1">
                {inq.firstName} {inq.lastName}
              </span>
              <div className="flex gap-1 shrink-0">
                {inq.mailingList && (
                  <span className="font-archivo text-[8px] tracking-widest uppercase px-1 py-0.5 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark">
                    L
                  </span>
                )}
                {inq.yardSign && (
                  <span className="font-archivo text-[8px] tracking-widest uppercase px-1 py-0.5 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark">
                    S
                  </span>
                )}
                {inq.doorKnocking && (
                  <span className="font-archivo text-[8px] tracking-widest uppercase px-1 py-0.5 border border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark">
                    D
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
})

// ── Map panel ─────────────────────────────────────────────────────────────────

const MapPanel = memo(function MapPanel({
  pins,
  pinCount,
  doorsKnocked
}: {
  pins: CanvassPin[]
  pinCount: number
  doorsKnocked: number
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries: LIBRARIES
  })
  const { isDark } = useUiSelector()

  return (
    <div className="relative flex flex-col h-full overflow-hidden">
      {isLoaded ? (
        <GoogleMap
          mapContainerStyle={{
            width: '100%',
            height: '100%',
            background: isDark ? '#0a0010' : '#f3f0f8'
          }}
          center={CENTER}
          zoom={ZOOM}
          options={{
            styles: isDark ? MAP_STYLES : LIGHT_MAP_STYLES,
            disableDefaultUI: true,
            zoomControl: false,
            gestureHandling: 'none', // read-only — no pan/zoom
            scrollwheel: false
          }}
        >
          {pins.map((pin) => (
            <PulsePin key={pin.id} pin={pin} onClick={() => {}} />
          ))}
        </GoogleMap>
      ) : (
        <div className="absolute inset-0 bg-white dark:bg-[#0a0010] flex items-center justify-center">
          <Loader2 className="w-5 h-5 text-primary-dark animate-spin" aria-hidden="true" />
        </div>
      )}

      {/* Stats overlay */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-5 bg-linear-to-t pointer-events-none ${isDark ? 'from-black/70' : 'from-black/40'} to-transparent`}
      >
        <div className="flex gap-8">
          <div className="flex flex-col gap-0.5">
            <span
              className={`font-archivo text-4xl font-black leading-none tabular-nums ${isDark ? 'text-white' : 'text-text-light'}`}
            >
              {pinCount}
            </span>
            <span
              className={`font-archivo text-[10px] tracking-[0.2em] uppercase ${isDark ? 'text-white/50' : 'text-muted-light'}`}
            >
              Pins Dropped
            </span>
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-archivo text-4xl font-black text-primary-dark leading-none tabular-nums">
              {doorsKnocked}
            </span>
            <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-white/50">Doors Knocked</span>
          </div>
        </div>
        <Link
          href="/dashboard/canvassing-map"
          className={`pointer-events-auto flex items-center gap-2 px-4 py-2 border backdrop-blur-sm hover:border-primary-light dark:hover:border-primary-dark transition-colors font-archivo text-[10px] tracking-widest uppercase ${isDark ? 'border-white/20 bg-black/40 text-white hover:bg-primary-dark/20' : 'border-border-light bg-white/80 text-text-light hover:bg-surface-light'}`}
        >
          Open Full Map <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
    </div>
  )
})

// ── DashboardClient ───────────────────────────────────────────────────────────

export default function DashboardClient3({
  news,
  inquiries,
  media,
  userCount,
  mailchimpCount,
  pinCount,
  doorsKnocked,
  pins
}: DashboardProps) {
  const { data: session } = useSession()
  const time = useClock()
  const daysUntil = useDaysUntil(PRIMARY_DATE)
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'
  const timeStr =
    time?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) ?? ''
  const dateStr =
    time?.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase() ?? ''

  return (
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
            value={userCount}
            href="/dashboard/users"
            accent="text-primary-light dark:text-primary-dark"
          />
          <StatPill
            label="Mailing List"
            value={mailchimpCount}
            href="/dashboard/subscribers"
            accent="text-secondary-light dark:text-secondary-dark"
          />
          <StatPill
            label="News Articles"
            value={news.length}
            href="/dashboard/news"
            accent="text-cta-light dark:text-cta-dark"
          />
          <StatPill
            label="Inquiries"
            value={inquiries.length}
            href="/dashboard/inquiries"
            accent="text-primary-light dark:text-primary-dark"
          />
          <StatPill
            label="Gallery"
            value={media.length}
            href="/dashboard/gallery"
            accent="text-secondary-light dark:text-secondary-dark"
          />
          <StatPill
            label="Canvass Pins"
            value={pinCount}
            href="/dashboard/canvass"
            accent="text-primary-light dark:text-primary-dark"
          />
          <StatPill
            label="Doors Knocked"
            value={doorsKnocked}
            href="/dashboard/canvass"
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
              { label: 'Page Content', href: '/dashboard/content', icon: FileText },
              { label: 'Gallery', href: '/dashboard/gallery', icon: Activity }
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
              { label: 'Users', href: '/dashboard/users', value: userCount },
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
          <div className="flex-1 min-h-0 border-b border-border-light dark:border-border-dark overflow-hidden">
            <NewsFeed news={news} />
          </div>
          <div className="flex-1 min-h-0 overflow-hidden">
            <InquiriesFeed inquiries={inquiries} />
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
  )
}
