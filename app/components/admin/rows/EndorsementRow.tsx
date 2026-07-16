import { Endorsement } from '@/types/endorsement.types'
import Picture from '../../elements/Picture'
import { Pencil, Trash2 } from 'lucide-react'

export function EndorsementRow({
  endorsement,
  isEditing,
  onEdit,
  onDelete
}: {
  endorsement: Endorsement
  isEditing: boolean
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-3.5 border-b border-border-light dark:border-border-dark transition-colors group ${isEditing ? 'bg-primary-light/5 dark:bg-primary-dark/5 border-l-2 border-l-primary-light dark:border-l-primary-dark' : 'hover:bg-surface-light dark:hover:bg-surface-dark'}`}
    >
      {/* Avatar or dot */}
      {endorsement.imageUrl ? (
        <Picture
          priority
          src={endorsement.imageUrl}
          alt=""
          aria-hidden="true"
          className="w-8 h-8 rounded-full shrink-0 object-cover border border-border-light dark:border-border-dark"
        />
      ) : (
        <div
          className={`w-2 h-2 rounded-full shrink-0 ${endorsement.isPublished ? 'bg-secondary-light dark:bg-secondary-dark' : 'bg-muted-light dark:bg-muted-dark'}`}
          aria-hidden="true"
        />
      )}

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col gap-0.5">
        <span className="font-archivo text-xs font-bold text-text-light dark:text-text-dark truncate">
          {endorsement.name}
        </span>
        {(endorsement.title || endorsement.organization) && (
          <span className="font-inter text-[10px] text-muted-light dark:text-muted-dark truncate">
            {[endorsement.title, endorsement.organization].filter(Boolean).join(' · ')}
          </span>
        )}
      </div>

      {/* Status + actions */}
      <div className="flex items-center gap-1.5 shrink-0">
        <span
          className={`font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border ${endorsement.isPublished ? 'border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark' : 'border-muted-light dark:border-muted-dark text-muted-light dark:text-muted-dark'}`}
        >
          {endorsement.isPublished ? 'Live' : 'Draft'}
        </span>
        {isEditing && (
          <span className="font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark">
            Editing
          </span>
        )}
        <button
          onClick={onEdit}
          aria-label={`Edit ${endorsement.name}`}
          className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onDelete}
          aria-label={`Delete ${endorsement.name}`}
          className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-red-500 dark:hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
