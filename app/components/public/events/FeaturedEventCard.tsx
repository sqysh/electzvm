import { fadeUp } from '@/app/lib/constants/motion.constants'
import { Event } from '@prisma/client'
import { motion } from 'framer-motion'
import { ParallaxImage } from './ParallaxImage'
import { CalendarDate } from './CalendarDate'
import { formatFullDate, formatTime } from '@/app/lib/utils/_date.utils'
import { Clock, ExternalLink, MapPin } from 'lucide-react'
import Link from 'next/link'

export function FeaturedEventCard({ event }: { event: Event }) {
  return (
    <motion.article
      {...fadeUp(0.1)}
      aria-label={`Featured event: ${event.title}`}
      className="relative w-full overflow-hidden border border-border-light dark:border-border-dark"
    >
      <div className={`grid grid-cols-1 ${event.imageUrl ? 'lg:grid-cols-2' : ''}`}>
        {/* Image side */}
        {event.imageUrl && (
          <div className="relative h-64 sm:h-80 lg:h-full min-h-75 overflow-hidden">
            <ParallaxImage src={event.imageUrl} alt={event.title} />
            {/* Overlay */}
            <div aria-hidden="true" className="absolute inset-0 bg-hero-dark/40" />
            {/* Featured badge */}
            <div className="absolute top-4 left-4">
              <span className="font-archivo text-[9px] tracking-[0.2em] uppercase px-2 py-1 bg-cta-light dark:bg-cta-dark text-white">
                Featured
              </span>
            </div>
          </div>
        )}

        {/* Content side */}
        <div className="flex flex-col gap-6 p-6 sm:p-8 bg-bg-light dark:bg-bg-dark">
          {/* Date + eyebrow */}
          <div className="flex items-start gap-4">
            <CalendarDate date={event.startDate} large />
            <div className="flex flex-col gap-1 pt-1">
              <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-cta-light dark:text-cta-dark">
                Featured Event
              </span>
              <span className="font-inter text-sm text-muted-light dark:text-muted-dark">
                {formatFullDate(event.startDate)}
              </span>
            </div>
          </div>

          {/* Divider */}
          <div aria-hidden="true" className="w-12 h-px bg-primary-light dark:bg-primary-dark" />

          {/* Title */}
          <h2 className="font-archivo text-2xl xs:text-3xl sm:text-4xl font-black uppercase text-text-light dark:text-text-dark leading-none">
            {event.title}
          </h2>

          {/* Description */}
          {event.description && (
            <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
              {event.description}
            </p>
          )}

          {/* Meta */}
          <div className="flex flex-col gap-2">
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0" aria-hidden="true" />
                <span className="font-inter text-sm text-muted-light dark:text-muted-dark">
                  {event.location}
                  {event.address ? ` · ${event.address}` : ''}
                </span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0" aria-hidden="true" />
              <span className="font-inter text-sm text-muted-light dark:text-muted-dark">
                {formatTime(event.startDate)}
                {event.endDate ? ` – ${formatTime(event.endDate)}` : ''}
              </span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col xs:flex-row gap-3 mt-auto pt-2">
            <Link
              href="/contact"
              className="flex-1 flex items-center justify-center py-3 px-6 bg-primary-light dark:bg-primary-dark text-white font-archivo text-[10px] tracking-widest uppercase hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-11"
            >
              Get Involved →
            </Link>
            {event.externalUrl && (
              <a
                href={event.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-6 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-archivo text-[10px] tracking-widests uppercase hover:border-primary-light dark:hover:border-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-11"
              >
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                More Info
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  )
}
