import { panelInputCls } from '@/app/lib/constants/styles.constants'
import { EventFormState } from '@/types/event.types'
import { EventStatus } from '@prisma/client'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { UploadZone } from '../../elements/UploadZone'

export function EventForm({
  initial,
  onSubmit,
  onCancel,
  saving,
  error
}: {
  initial: EventFormState
  onSubmit: (data: EventFormState) => void
  onCancel: () => void
  saving: boolean
  error: string | null
}) {
  const [form, setForm] = useState<EventFormState>(initial)

  function set(key: keyof EventFormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="event-title"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Title *
        </label>
        <input
          id="event-title"
          type="text"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          className={panelInputCls}
          placeholder="Event title"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="event-description"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Description
        </label>
        <textarea
          id="event-description"
          rows={3}
          value={form.description}
          onChange={(e) => set('description', e.target.value)}
          className={`${panelInputCls} resize-none min-h-0`}
          placeholder="Event description"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="event-start"
            className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
          >
            Start Date *
          </label>
          <input
            id="event-start"
            type="datetime-local"
            value={form.startDate}
            onChange={(e) => set('startDate', e.target.value)}
            className={panelInputCls}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="event-end"
            className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
          >
            End Date
          </label>
          <input
            id="event-end"
            type="datetime-local"
            value={form.endDate}
            onChange={(e) => set('endDate', e.target.value)}
            className={panelInputCls}
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="event-location"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Location
        </label>
        <input
          id="event-location"
          type="text"
          value={form.location}
          onChange={(e) => set('location', e.target.value)}
          className={panelInputCls}
          placeholder="Venue name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="event-address"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Address
        </label>
        <input
          id="event-address"
          type="text"
          value={form.address}
          onChange={(e) => set('address', e.target.value)}
          className={panelInputCls}
          placeholder="123 Main St, City, MA"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
          Image
        </label>
        <UploadZone
          value={form.imageUrl}
          onChange={(url, filename) => {
            set('imageUrl', url)
            set('imageFilename', filename)
          }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="event-url"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          External URL
        </label>
        <input
          id="event-url"
          type="text"
          value={form.externalUrl}
          onChange={(e) => set('externalUrl', e.target.value)}
          className={panelInputCls}
          placeholder="https://... (optional)"
        />
      </div>

      {/* Status */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="event-status"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Status
        </label>
        <select
          id="event-status"
          value={form.status}
          onChange={(e) => set('status', e.target.value as EventStatus)}
          className={panelInputCls}
        >
          <option value="DRAFT">Draft</option>
          <option value="PUBLISHED">Published</option>
          <option value="PAST">Past</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3">
        {([{ id: 'event-published', key: 'isPublished', label: 'Published' }] as const).map(({ id, key, label }) => (
          <label key={key} htmlFor={id} className="flex items-center justify-between gap-4 cursor-pointer min-h-11">
            <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              {label}
            </span>
            <div className="relative shrink-0 w-11 h-6">
              <input
                id={id}
                type="checkbox"
                role="switch"
                aria-checked={form[key] as boolean}
                checked={form[key] as boolean}
                onChange={(e) => set(key, e.target.checked)}
                className="sr-only"
              />
              <div
                className={`absolute inset-0 border transition-colors duration-200 ${form[key] ? 'bg-primary-light dark:bg-primary-dark border-primary-light dark:border-primary-dark' : 'bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark'}`}
              />
              <div
                className={`absolute top-1 w-4 h-4 transition-all duration-200 ${form[key] ? 'translate-x-6 bg-white' : 'translate-x-1 bg-muted-light dark:bg-muted-dark'}`}
              />
            </div>
          </label>
        ))}
      </div>

      {error && (
        <p role="alert" className="font-inter text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={() => onSubmit(form)}
          disabled={saving || !form.title.trim() || !form.startDate}
          aria-busy={saving}
          className="font-archivo flex-1 py-3 text-xs font-bold uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed min-h-11 flex items-center justify-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />}
          {saving ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="font-archivo px-4 py-3 text-xs font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
