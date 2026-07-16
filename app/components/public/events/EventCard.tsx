import { fadeUp } from '@/app/lib/constants/motion.constants'
import { Event } from '@prisma/client'
import { motion } from 'framer-motion'
import { CalendarDate } from './CalendarDate'
import { Clock, ExternalLink, MapPin } from 'lucide-react'
import { formatTime } from '@/app/lib/utils/_date.utils'
import Picture from '../../elements/Picture'

export function EventCard({ event, index }: { event: Event; index: number }) {
  return (
    <motion.article
      {...fadeUp(0.1 + index * 0.06)}
      aria-label={`Event: ${event.title}`}
      className={`group flex items-start gap-4 sm:gap-5 p-4 sm:p-5 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark transition-colors duration-200 ${event.status === 'PUBLISHED' ? 'hover:border-primary-light dark:hover:border-primary-dark' : ''}`}
    >
      <CalendarDate date={event.startDate} />

      <div className="flex-1 min-w-0 flex flex-col gap-2">
        <h3 className="font-archivo text-sm sm:text-base font-black uppercase text-text-light dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors leading-tight">
          {event.title}
        </h3>

        {event.description && (
          <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed line-clamp-2">
            {event.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-1">
          {event.location && (
            <span className="flex items-center gap-1.5 font-inter text-xs text-muted-light dark:text-muted-dark">
              <MapPin className="w-3 h-3 text-primary-light dark:text-primary-dark shrink-0" aria-hidden="true" />
              {event.location}
            </span>
          )}
          <span className="flex items-center gap-1.5 font-inter text-xs text-muted-light dark:text-muted-dark">
            <Clock className="w-3 h-3 text-primary-light dark:text-primary-dark shrink-0" aria-hidden="true" />
            {formatTime(event.startDate)}
            {event.endDate ? ` – ${formatTime(event.endDate)}` : ''}
          </span>
        </div>
      </div>

      {/* Image thumbnail */}
      {event.imageUrl && (
        <div className="hidden sm:block relative w-20 h-20 shrink-0 overflow-hidden border border-border-light dark:border-border-dark">
          <Picture
            src={event.imageUrl}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}

      {/* External link */}
      {event.externalUrl && (
        <a
          href={event.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`More info about ${event.title}`}
          className="hidden sm:flex shrink-0 w-8 h-8 items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      )}
    </motion.article>
  )
}
