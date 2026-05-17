import { inputCls, panelInputCls } from '@/app/lib/constants/styles.constants'
import { EndorsementFormState } from '@/types/endorsement.types'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { UploadZone } from '../elements/UploadZone'

export function EndorsementForm({
  initial,
  onSubmit,
  onCancel,
  saving,
  error
}: {
  initial: EndorsementFormState
  onSubmit: (data: EndorsementFormState) => void
  onCancel: () => void
  saving: boolean
  error: string | null
}) {
  const [form, setForm] = useState<EndorsementFormState>(initial)

  function set(key: keyof EndorsementFormState, value: string | boolean) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="endorsement-name"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Name *
        </label>
        <input
          id="endorsement-name"
          type="text"
          value={form.name}
          onChange={(e) => set('name', e.target.value)}
          className={panelInputCls}
          placeholder="Full name"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="endorsement-title"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Title
        </label>
        <input
          id="endorsement-title"
          type="text"
          value={form.title}
          onChange={(e) => set('title', e.target.value)}
          className={inputCls}
          placeholder="e.g. City Councilor"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="endorsement-org"
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
        >
          Organization
        </label>
        <input
          id="endorsement-org"
          type="text"
          value={form.organization}
          onChange={(e) => set('organization', e.target.value)}
          className={inputCls}
          placeholder="e.g. Lynn Teachers Union"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <UploadZone
          value={form.imageUrl}
          onChange={(url, filename) => setForm((prev) => ({ ...prev, imageUrl: url, imageFilename: filename }))}
        />
      </div>

      {/* Published toggle */}
      <label
        htmlFor="endorsement-published"
        className="flex items-center justify-between gap-4 cursor-pointer min-h-11"
      >
        <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
          Published
        </span>
        <div className="relative shrink-0 w-11 h-6">
          <input
            id="endorsement-published"
            type="checkbox"
            role="switch"
            aria-checked={form.isPublished}
            checked={form.isPublished}
            onChange={(e) => set('isPublished', e.target.checked)}
            className="sr-only"
          />
          <div
            className={`absolute inset-0 border transition-colors duration-200 ${form.isPublished ? 'bg-primary-light dark:bg-primary-dark border-primary-light dark:border-primary-dark' : 'bg-surface-light dark:bg-surface-dark border-border-light dark:border-border-dark'}`}
          />
          <div
            className={`absolute top-1 w-4 h-4 transition-all duration-200 ${form.isPublished ? 'translate-x-6 bg-white' : 'translate-x-1 bg-muted-light dark:bg-muted-dark'}`}
          />
        </div>
      </label>

      {error && (
        <p role="alert" className="font-inter text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      )}

      <div className="flex gap-3 pt-1">
        <button
          type="button"
          onClick={() => onSubmit(form)}
          disabled={saving || !form.name.trim()}
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
