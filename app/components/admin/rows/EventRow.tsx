import { STATUS_COLORS } from '@/app/lib/constants/event.constants'
import { Event, EventStatus } from '@prisma/client'
import { Calendar, ExternalLink, Loader2, MapPin, Pencil, Trash2 } from 'lucide-react'

export function EventRow({
  event,
  isEditing,
  onEdit,
  onDelete,
  deleting
}: {
  event: Event
  isEditing: boolean
  onEdit: () => void
  onDelete: () => void
  deleting: boolean
}) {
  return (
    <div
      className={`flex items-start gap-3 px-4 py-3.5 border-b border-border-light dark:border-border-dark transition-colors group ${isEditing ? 'bg-primary-light/5 dark:bg-primary-dark/5 border-l-2 border-l-primary-light dark:border-l-primary-dark' : 'hover:bg-surface-light dark:hover:bg-surface-dark'}`}
    >
      <div
        className={`w-2 h-2 rounded-full shrink-0 mt-1 ${event.isPublished ? 'bg-secondary-light dark:bg-secondary-dark' : 'bg-muted-light dark:bg-muted-dark'}`}
        aria-hidden="true"
      />

      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="font-archivo text-xs font-bold text-text-light dark:text-text-dark truncate">
          {event.title}
        </span>
        <div className="flex items-center gap-2 flex-wrap">
          {/* Date */}
          <span className="flex items-center gap-1 font-mono text-[10px] text-muted-light dark:text-muted-dark">
            <Calendar className="w-2.5 h-2.5" aria-hidden="true" />
            {new Date(event.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
          </span>
          {/* Location */}
          {event.location && (
            <span className="flex items-center gap-1 font-mono text-[10px] text-muted-light dark:text-muted-dark truncate">
              <MapPin className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
              {event.location}
            </span>
          )}
          {/* Status */}
          <span
            className={`font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border ${STATUS_COLORS[event.status as EventStatus]}`}
          >
            {event.status.toLowerCase()}
          </span>
          {/* Published */}
          <span
            className={`font-archivo text-[9px] tracking-widests uppercase px-1.5 py-0.5 border ${event.isPublished ? 'border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark' : 'border-muted-light dark:border-muted-dark text-muted-light dark:text-muted-dark'}`}
          >
            {event.isPublished ? 'Live' : 'Draft'}
          </span>
          {/* Featured */}
          {event.isFeatured && (
            <span className="font-archivo text-[9px] tracking-widests uppercase px-1.5 py-0.5 border border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark">
              Featured
            </span>
          )}
          {/* Editing */}
          {isEditing && (
            <span className="font-archivo text-[9px] tracking-widests uppercase px-1.5 py-0.5 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark">
              Editing
            </span>
          )}
          {/* External link */}
          {event.externalUrl && (
            <a
              href={event.externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open external link"
              className="text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onEdit}
          aria-label={`Edit ${event.title}`}
          className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          disabled={deleting}
          aria-label={`Delete ${event.title}`}
          className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-red-500 dark:hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:opacity-40"
        >
          {deleting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
        </button>
      </div>
    </div>
  )
}
