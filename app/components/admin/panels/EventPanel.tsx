import { createEvent } from '@/app/lib/actions/admin/event/createEvent'
import { deleteEvent } from '@/app/lib/actions/admin/event/deleteEvent'
import { updateEvent } from '@/app/lib/actions/admin/event/updateEvent'
import { EventFormState } from '@/types/event.types'
import { Event, EventStatus } from '@prisma/client'
import { useState } from 'react'
import DashboardPanel from './DashboardPanel'
import { Plus, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { EventForm } from '../forms/EventForm'
import { toInputDate } from '@/app/lib/utils/_date.utils'
import { EventRow } from '../rows/EventRow'
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal'

const EMPTY: EventFormState = {
  title: '',
  description: '',
  location: '',
  address: '',
  startDate: '',
  endDate: '',
  imageUrl: '',
  externalUrl: '',
  isPublished: false,
  isFeatured: false,
  status: 'DRAFT' as EventStatus
}

export default function EventPanel({
  open,
  onClose,
  events: initialEvents,
  onEventsChange
}: {
  open: boolean
  onClose: () => void
  events: Event[]
  onEventsChange: (events: Event[]) => void
}) {
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; event: Event | null }>({ open: false, event: null })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  function syncUp(updated: Event[]) {
    setEvents(updated)
    onEventsChange(updated)
  }

  const filtered = events.filter((e) => {
    if (filter === 'published') return e.isPublished
    if (filter === 'draft') return !e.isPublished
    return true
  })

  async function handleCreate(data: EventFormState) {
    setSaving(true)
    setError(null)
    const result = await createEvent(data)
    setSaving(false)
    if (result.success && result.data) {
      syncUp([result.data as Event, ...events])
      setMode('list')
    } else {
      setError(result.error ?? 'Failed to create event.')
    }
  }

  async function handleUpdate(data: EventFormState) {
    if (!editingEvent) return
    setSaving(true)
    setError(null)
    const result = await updateEvent(editingEvent.id, data)
    setSaving(false)
    if (result.success && result.data) {
      syncUp(events.map((e) => (e.id === editingEvent.id ? (result.data as Event) : e)))
      setMode('list')
      setEditingEvent(null)
    } else {
      setError(result.error ?? 'Failed to update event.')
    }
  }

  async function handleDelete() {
    if (!deleteModal.event) return
    setDeletingId(deleteModal.event.id)
    const result = await deleteEvent(deleteModal.event.id)
    setDeletingId(null)
    if (result.success) {
      const updated = events.filter((e) => e.id !== deleteModal.event!.id)
      syncUp(updated)
      if (editingEvent?.id === deleteModal.event.id) {
        setMode('list')
        setEditingEvent(null)
      }
      setDeleteModal({ open: false, event: null })
    }
  }

  function openEdit(event: Event) {
    setEditingEvent(event)
    setError(null)
    setMode('edit')
  }

  function closeForm() {
    setMode('list')
    setEditingEvent(null)
    setError(null)
  }

  const isForm = mode === 'create' || mode === 'edit'

  return (
    <>
      <ConfirmDeleteModal
        open={deleteModal.open}
        title={`Delete "${deleteModal.event?.title ?? 'this event'}"?`}
        description="This will permanently remove the event from the public site."
        loading={deletingId === deleteModal.event?.id}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, event: null })}
      />

      <DashboardPanel open={open} onClose={onClose} title="Events" subtitle={`${events.length} events`} width="lg">
        {/* Toolbar */}
        <div className="shrink-0 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <div className="flex">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`h-9 px-4 font-archivo text-[10px] tracking-[0.15em] uppercase transition-colors focus-visible:outline-none border-r border-border-light dark:border-border-dark ${filter === f ? 'bg-primary-light dark:bg-primary-dark text-white' : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
              >
                {f}
              </button>
            ))}
          </div>
          <button
            onClick={
              isForm
                ? closeForm
                : () => {
                    setError(null)
                    setMode('create')
                  }
            }
            aria-label={isForm ? 'Cancel' : 'New event'}
            className="flex items-center gap-1.5 px-4 font-archivo text-[10px] tracking-widests uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-none min-h-9"
          >
            {isForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {isForm ? 'Cancel' : 'New'}
          </button>
        </div>

        {/* Form */}
        <AnimatePresence>
          {isForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-b border-border-light dark:border-border-dark"
            >
              <div className="flex items-center justify-between px-4 py-2 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  {mode === 'create'
                    ? 'New Event'
                    : `Editing · ${editingEvent?.title?.slice(0, 30)}${(editingEvent?.title?.length ?? 0) > 30 ? '...' : ''}`}
                </span>
              </div>
              <EventForm
                key={editingEvent?.id ?? 'new'}
                initial={
                  mode === 'edit' && editingEvent
                    ? {
                        title: editingEvent.title,
                        description: editingEvent.description ?? '',
                        location: editingEvent.location ?? '',
                        address: editingEvent.address ?? '',
                        startDate: toInputDate(editingEvent.startDate),
                        endDate: toInputDate(editingEvent.endDate),
                        imageUrl: editingEvent.imageUrl ?? '',
                        externalUrl: editingEvent.externalUrl ?? '',
                        isPublished: editingEvent.isPublished,
                        isFeatured: editingEvent.isFeatured,
                        status: editingEvent.status as EventStatus
                      }
                    : EMPTY
                }
                onSubmit={mode === 'create' ? handleCreate : handleUpdate}
                onCancel={closeForm}
                saving={saving}
                error={error}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Event list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2">
              <p className="font-archivo text-[11px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
                No events
              </p>
              <button
                onClick={() => setMode('create')}
                className="font-archivo text-[10px] tracking-widests uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                Create one →
              </button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {filtered.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <EventRow
                    event={event}
                    isEditing={editingEvent?.id === event.id}
                    onEdit={() => openEdit(event)}
                    onDelete={() => setDeleteModal({ open: true, event })}
                    deleting={deletingId === event.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
            {events.filter((e) => e.isPublished).length} live
          </span>
          <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
            {events.filter((e) => !e.isPublished).length} draft
          </span>
        </div>
      </DashboardPanel>
    </>
  )
}
