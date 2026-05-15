'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Users, Mail, Newspaper, MessageSquare, FileText, LogOut, ArrowRight, ChevronRight } from 'lucide-react'
import type { News, VolunteerSubmission } from '@prisma/client'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import IntegrationsBar from '@/app/components/IntegrationsBar'
import Picture from '@/app/components/elements/Picture'

// ── Types ─────────────────────────────────────────────────────────────────────

interface DashboardProps {
  news: News[]
  inquiries: VolunteerSubmission[]
  userCount: number
  mailchimpCount: number
  media: { id: string; url: string; type: string }[]
}

// ── StatCard ──────────────────────────────────────────────────────────────────

function StatCard({
  icon: Icon,
  label,
  value,
  href,
  accent,
  delay
}: {
  icon: React.ElementType
  label: string
  value: number | string
  href: string
  accent: string
  delay: number
}) {
  return (
    <motion.div {...fadeUp(delay)} className="h-full">
      <Link
        href={href}
        className="group flex flex-col justify-between gap-6 p-5 sm:p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light h-full"
      >
        <div className="flex items-start justify-between gap-3">
          <div className={`w-8 h-8 flex items-center justify-center border ${accent}`}>
            <Icon className="w-3.5 h-3.5" aria-hidden="true" />
          </div>
          <ChevronRight
            className="w-4 h-4 text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all duration-200"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="font-archivo text-3xl sm:text-4xl font-black text-neutral-900 dark:text-neutral-100 leading-none tabular-nums">
            {value}
          </span>
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-500">
            {label}
          </span>
        </div>
      </Link>
    </motion.div>
  )
}

// ── MiniListCard ──────────────────────────────────────────────────────────────

function MiniListCard<T extends { id: string }>({
  icon: Icon,
  label,
  count,
  href,
  items,
  renderItem,
  emptyText,
  accent,
  delay
}: {
  icon: React.ElementType
  label: string
  count: number
  href: string
  items: T[]
  renderItem: (item: T) => React.ReactNode
  emptyText: string
  accent: string
  delay: number
}) {
  return (
    <motion.div
      {...fadeUp(delay)}
      className="flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 h-full"
    >
      <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-6 h-6 flex items-center justify-center border ${accent}`}>
            <Icon className="w-3 h-3" aria-hidden="true" />
          </div>
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-500">
            {label}
          </span>
          <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-700">· {count}</span>
        </div>
        <Link
          href={href}
          aria-label={`View all ${label}`}
          className="font-archivo text-[9px] tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light flex items-center gap-1"
        >
          View All <ArrowRight className="w-3 h-3" aria-hidden="true" />
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto divide-y divide-neutral-100 dark:divide-neutral-800">
        {items.length === 0 ? (
          <div className="flex items-center justify-center h-24 px-5">
            <p className="font-archivo text-[10px] uppercase tracking-widest text-neutral-300 dark:text-neutral-700">
              {emptyText}
            </p>
          </div>
        ) : (
          items.slice(0, 5).map((item) => (
            <div key={item.id} className="px-5 py-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
              {renderItem(item)}
            </div>
          ))
        )}
      </div>
    </motion.div>
  )
}

// ── PageContentCard ───────────────────────────────────────────────────────────

function PageContentCard({ delay }: { delay: number }) {
  return (
    <motion.div {...fadeUp(delay)} className="h-full">
      <Link
        href="/dashboard/content"
        className="group flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 sm:p-6 bg-primary-light dark:bg-primary-dark/20 border border-primary-light/20 dark:border-primary-dark/30 hover:border-primary-light/60 dark:hover:border-primary-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light h-full"
      >
        <div className="flex items-center gap-4">
          <div className="w-9 h-9 flex items-center justify-center border border-white/20 shrink-0">
            <FileText className="w-4 h-4 text-white" aria-hidden="true" />
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-archivo text-base font-black uppercase text-white leading-tight">
              Page Content Editor
            </span>
            <span className="font-inter text-xs text-white/60">
              Update text across all public-facing pages without touching code.
            </span>
          </div>
        </div>
        <ArrowRight
          className="w-5 h-5 text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-200 shrink-0"
          aria-hidden="true"
        />
      </Link>
    </motion.div>
  )
}

function GalleryCard({ media, delay }: { media: { id: string; url: string; type: string }[]; delay: number }) {
  return (
    <motion.div {...fadeUp(delay)} className="h-full">
      <Link
        href="/dashboard/gallery"
        className="group flex flex-col bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light h-full overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-200 dark:border-neutral-800 shrink-0">
          <div className="flex items-center gap-2">
            <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-500">
              Gallery
            </span>
            <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-700">· {media.length}</span>
          </div>
          <ChevronRight
            className="w-4 h-4 text-neutral-300 dark:text-neutral-700 group-hover:text-neutral-500 dark:group-hover:text-neutral-400 group-hover:translate-x-0.5 transition-all duration-200"
            aria-hidden="true"
          />
        </div>

        {/* Preview grid with bottom fade */}
        <div className="relative flex-1 overflow-hidden">
          {media.length === 0 ? (
            <div className="flex items-center justify-center h-24">
              <p className="font-archivo text-[10px] uppercase tracking-widest text-neutral-300 dark:text-neutral-700">
                No media yet
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-4 gap-px p-px">
                {media.slice(0, 8).map((item, m) => (
                  <div
                    key={item.id}
                    className="aspect-square overflow-hidden w-full h-full bg-neutral-100 dark:bg-neutral-800"
                  >
                    {item.type === 'video' ? (
                      <video
                        src={item.url}
                        className="w-full h-full object-cover"
                        muted
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <Picture
                        src={item.url}
                        alt=""
                        aria-hidden="true"
                        className="w-full h-full object-cover aspect-square"
                        priority={m < 4}
                      />
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </Link>
    </motion.div>
  )
}

// ── DashboardClient ───────────────────────────────────────────────────────────

export default function DashboardClient2({ news, inquiries, userCount, mailchimpCount, media }: DashboardProps) {
  const { data: session } = useSession()

  const now = new Date()
  const hour = now.getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = session?.user?.name?.split(' ')[0] ?? 'Admin'
  const dateStr = now.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="h-screen w-full bg-neutral-50 dark:bg-neutral-950 flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between px-4 sm:px-6 h-12 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="font-archivo text-sm font-black uppercase tracking-widest text-neutral-900 dark:text-neutral-100 hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span>
          </Link>
          <div aria-hidden="true" className="hidden sm:block w-px h-3 bg-neutral-200 dark:bg-neutral-800" />
          <span className="hidden sm:block font-archivo text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-600">
            Admin Portal
          </span>
        </div>
        <div className="flex items-center gap-1">
          {session?.user?.email && (
            <span className="hidden md:block font-mono text-[10px] text-neutral-400 dark:text-neutral-600 mr-2">
              {session.user.email}
            </span>
          )}
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            aria-label="Sign out"
            className="w-8 h-8 flex items-center justify-center text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6">
        {/* Greeting */}
        <motion.div {...fadeUp(0)} className="mb-6 sm:mb-8">
          <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-600 mb-1">
            {dateStr}
          </p>
          <h1 className="font-archivo text-2xl sm:text-3xl font-black uppercase text-neutral-900 dark:text-neutral-100">
            {greeting}, <span className="text-primary-light dark:text-primary-dark">{firstName}.</span>
          </h1>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Stats row */}
          <div className="col-span-1">
            <StatCard
              icon={Users}
              label="Team Members"
              value={userCount}
              href="/dashboard/users"
              accent="border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
              delay={0.05}
            />
          </div>
          <div className="col-span-1">
            <StatCard
              icon={Mail}
              label="Mailing List"
              value={mailchimpCount}
              href="/dashboard/subscribers"
              accent="border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark"
              delay={0.1}
            />
          </div>
          <div className="col-span-1">
            <StatCard
              icon={Newspaper}
              label="News Articles"
              value={news.length}
              href="/dashboard/news"
              accent="border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark"
              delay={0.15}
            />
          </div>
          <div className="col-span-1">
            <StatCard
              icon={MessageSquare}
              label="Inquiries"
              value={inquiries.length}
              href="/dashboard/inquiries"
              accent="border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
              delay={0.2}
            />
          </div>

          {/* News mini list */}
          <div className="col-span-2 min-h-70">
            <MiniListCard
              icon={Newspaper}
              label="Latest News"
              count={news.length}
              href="/dashboard/news"
              items={news}
              emptyText="No articles yet"
              accent="border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark"
              delay={0.25}
              renderItem={(article) => (
                <Link
                  href={`/dashboard/news?id=${article.id}`}
                  className="flex items-center justify-between gap-3 group/item focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-archivo text-xs font-bold text-neutral-900 dark:text-neutral-100 group-hover/item:text-primary-light dark:group-hover/item:text-primary-dark transition-colors truncate">
                      {article.title}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-600">
                      {new Date(article.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                  <span
                    className={`shrink-0 font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border ${article.isPublished ? 'border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark' : 'border-neutral-300 dark:border-neutral-700 text-neutral-400 dark:text-neutral-600'}`}
                  >
                    {article.isPublished ? 'Live' : 'Draft'}
                  </span>
                </Link>
              )}
            />
          </div>

          {/* Inquiries mini list */}
          <div className="col-span-2 min-h-70">
            <MiniListCard
              icon={MessageSquare}
              label="Recent Inquiries"
              count={inquiries.length}
              href="/dashboard/inquiries"
              items={inquiries}
              emptyText="No inquiries yet"
              accent="border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark"
              delay={0.3}
              renderItem={(inq) => (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex flex-col gap-0.5 min-w-0">
                    <span className="font-archivo text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                      {inq.firstName} {inq.lastName}
                    </span>
                    <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-600 truncate">
                      {inq.email}
                    </span>
                  </div>
                  <div className="flex gap-1 flex-wrap justify-end shrink-0">
                    {inq.mailingList && (
                      <span className="font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark">
                        List
                      </span>
                    )}
                    {inq.yardSign && (
                      <span className="font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark">
                        Sign
                      </span>
                    )}
                    {inq.doorKnocking && (
                      <span className="font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark">
                        Door
                      </span>
                    )}
                  </div>
                </div>
              )}
            />
          </div>

          <div className="col-span-2 lg:col-span-2 min-h-60">
            <GalleryCard media={media} delay={0.35} />
          </div>

          {/* Page content editor */}
          <div className="col-span-2 lg:col-span-4">
            <PageContentCard delay={0.35} />
          </div>
        </div>
      </div>

      <IntegrationsBar />

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="shrink-0 h-9 flex items-center justify-between px-4 sm:px-6 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <span className="font-archivo text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span> · Sqysh
        </span>
        <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-600">Primary · Sept 1, 2026</span>
      </footer>
    </div>
  )
}
