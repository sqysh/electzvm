'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import type { Event, UserRole } from '@prisma/client'
import Header from '@/app/components/public/layout/Header'
import { PrimaryDateMarquee } from '@/app/components/public/sections/PrimaryDateMarquee'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { FeaturedEventCard } from '@/app/components/public/events/FeaturedEventCard'
import { EventCard } from '@/app/components/public/events/EventCard'
import { syncEventStatuses } from '@/app/lib/actions/_infra/syncEventStatus'
import { useTransition } from 'react'
import { Session } from 'next-auth'

export default function EventsClient({ events, session }: { events: Event[]; session: Session | null }) {
  const now = new Date()
  const [pending, startTransition] = useTransition()
  const published = events.filter((e) => e.status === 'PUBLISHED')
  const past = events.filter((e) => e.status === 'PAST' || (e.isPublished && e.endDate && new Date(e.endDate) < now))

  const upcoming = published.filter((e) => !e.endDate || new Date(e.endDate) >= now)
  const featured = upcoming.find((e) => e.isFeatured)
  const rest = upcoming.filter((e) => !e.isFeatured)

  const hasUpcoming = upcoming.length > 0

  const userRole = session?.user.role as UserRole
  const isSuperUser = userRole === 'SUPER_USER'

  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      <Header />

      <main id="main-content" className="flex-1">
        {/* Page header */}
        <div className="w-full bg-hero-light dark:bg-hero-dark border-b border-white/10 px-5 sm:px-8 md:px-16 pt-12 pb-10 sm:pt-20 sm:pb-14">
          <div className="max-w-6xl mx-auto">
            <motion.div {...fadeUp(0.1)} className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
                  9th Essex District · Massachusetts
                </p>
                {isSuperUser && (
                  <button
                    onClick={() => startTransition(() => syncEventStatuses())}
                    disabled={pending}
                    className="font-archivo text-[10px] tracking-[0.15em] uppercase text-white/30 hover:text-white/60 disabled:opacity-30 transition-colors"
                  >
                    {pending ? 'Syncing...' : 'Sync statuses'}
                  </button>
                )}
              </div>
              <h1 className="font-archivo text-4xl xs:text-5xl sm:text-6xl font-black uppercase text-white leading-none">
                Upcoming <span className="text-primary-dark">Events</span>
              </h1>
              <p className="font-inter text-sm text-white/50 max-w-md leading-relaxed mt-1">
                Come meet Zosia and talk about what matters most to your community.
              </p>
            </motion.div>
          </div>
        </div>

        <div className="px-5 sm:px-8 md:px-16">
          <div className="max-w-6xl mx-auto py-10 sm:py-14 flex flex-col gap-12 sm:gap-16">
            {/* Upcoming */}
            {!hasUpcoming ? (
              <motion.div {...fadeUp(0.2)} className="py-24 text-center flex flex-col items-center gap-4">
                <p className="font-archivo text-2xl font-black uppercase text-muted-light dark:text-muted-dark">
                  No upcoming events
                </p>
                <p className="font-inter text-sm text-muted-light/60 dark:text-muted-dark/60">
                  Check back soon — more events are being planned.
                </p>
                <Link
                  href="/contact"
                  className="font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light mt-2"
                >
                  Get notified when events are posted →
                </Link>
              </motion.div>
            ) : (
              <div className="flex flex-col gap-8 sm:gap-10">
                {featured && <FeaturedEventCard event={featured} />}
                {rest.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {featured && (
                      <motion.div
                        {...fadeUp(0.15)}
                        className="flex items-center gap-3 pb-2 border-b border-border-light dark:border-border-dark"
                      >
                        <div aria-hidden="true" className="w-4 h-px bg-secondary-light dark:bg-secondary-dark" />
                        <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                          All Events · {rest.length} {rest.length === 1 ? 'event' : 'events'}
                        </p>
                      </motion.div>
                    )}
                    <div className="flex flex-col gap-3">
                      {rest.map((event, i) => (
                        <EventCard key={event.id} event={event} index={i} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Past events */}
            {past.length > 0 && (
              <motion.div {...fadeUp(0.2)} className="flex flex-col gap-4">
                <div className="flex items-center gap-3 pb-2 border-b border-border-light dark:border-border-dark">
                  <div aria-hidden="true" className="w-4 h-px bg-secondary-light dark:bg-secondary-dark" />
                  <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                    Past Events · {past.length} {past.length === 1 ? 'event' : 'events'}
                  </p>
                </div>
                <div className="flex flex-col gap-3 opacity-50">
                  {past.map((event, i) => (
                    <EventCard key={event.id} event={event} index={i} />
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <PrimaryDateMarquee />
    </div>
  )
}
