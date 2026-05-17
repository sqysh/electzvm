'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, ChevronRight, Loader2, Save } from 'lucide-react'
import type { Page } from '@prisma/client'
import { updatePageContent } from '@/app/lib/actions/page/updatePageContent'
import { pageContentEditorInputCls } from '@/app/lib/constants/styles.constants'
import DashboardPanel from '../elements/DashboardPanel'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'

// ── Types ─────────────────────────────────────────────────────────────────────

interface PageField {
  id: string
  type: 'text' | 'textarea' | 'array'
  label: string
  value: string | string[]
  section: string
}

// ── FieldInput ────────────────────────────────────────────────────────────────

function FieldInput({ field, onChange }: { field: PageField; onChange: (value: string | string[]) => void }) {
  if (field.type === 'array' && Array.isArray(field.value)) {
    return (
      <div className="flex flex-col gap-1.5">
        <span className="text-[9px] font-mono uppercase tracking-widest text-muted-light dark:text-muted-dark">
          {field.label}
        </span>
        <div className="flex flex-col gap-1.5">
          {(field.value as string[]).map((item, i) => (
            <input
              key={i}
              type="text"
              value={item}
              onChange={(e) => {
                const next = [...(field.value as string[])]
                next[i] = e.target.value
                onChange(next)
              }}
              className={pageContentEditorInputCls}
            />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[9px] font-mono uppercase tracking-widest text-muted-light dark:text-muted-dark">
        {field.label}
      </span>
      {field.type === 'textarea' ? (
        <textarea
          value={field.value as string}
          rows={4}
          onChange={(e) => onChange(e.target.value)}
          className={`${pageContentEditorInputCls} resize-none min-h-0`}
        />
      ) : (
        <input
          type="text"
          value={field.value as string}
          onChange={(e) => onChange(e.target.value)}
          className={pageContentEditorInputCls}
        />
      )}
    </div>
  )
}

// ── SectionBlock ──────────────────────────────────────────────────────────────

function SectionBlock({
  title,
  fields,
  onFieldChange
}: {
  title: string
  fields: PageField[]
  onFieldChange: (id: string, value: string | string[]) => void
}) {
  const [open, setOpen] = useState(true)

  return (
    <div className="border border-border-light dark:border-border-dark">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 px-3 py-2.5 bg-surface-light dark:bg-surface-dark hover:bg-surface-alt-light dark:hover:bg-surface-alt-dark transition-colors text-left focus-visible:outline-none border-b border-border-light dark:border-border-dark"
      >
        <motion.div animate={{ rotate: open ? 90 : 0 }} transition={{ duration: 0.15 }}>
          <ChevronRight className="w-3 h-3 text-muted-light dark:text-muted-dark" />
        </motion.div>
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark capitalize">
          {title.replace(/_/g, ' ')}
        </span>
        <span className="text-[9px] font-mono text-muted-light/50 dark:text-muted-dark/50">({fields.length})</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 py-4 flex flex-col gap-4">
              {fields.map((field) => (
                <FieldInput key={field.id} field={field} onChange={(value) => onFieldChange(field.id, value)} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── PageFieldEditor ───────────────────────────────────────────────────────────

function PageFieldEditor({ page, onContentChange }: { page: Page; onContentChange: (content: PageField[]) => void }) {
  const [content, setContent] = useState<PageField[]>(page.content as unknown as PageField[])

  function updateField(id: string, value: string | string[]) {
    setContent((prev) => {
      const next = prev.map((f) => (f.id === id ? { ...f, value } : f))
      onContentChange(next)
      return next
    })
  }

  const sections = Array.from(new Set(content.map((f) => f.section)))

  return (
    <div className="p-4 flex flex-col gap-3">
      {sections.map((section, i) => (
        <motion.div
          key={section}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.04 }}
        >
          <SectionBlock
            title={section}
            fields={content.filter((f) => f.section === section)}
            onFieldChange={updateField}
          />
        </motion.div>
      ))}
    </div>
  )
}

// ── PageContentEditorPanel ────────────────────────────────────────────────────

export default function PageContentEditorPanel({
  open,
  onClose,
  pages
}: {
  open: boolean
  onClose: () => void
  pages: Page[]
}) {
  const [selectedPage, setSelectedPage] = useState<Page | null>(pages[0] ?? null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const contentRef = useRef<PageField[]>([])
  const { play } = useSoundEffect('/sound-effects/se-1.mp3', true)
  const { play: selectPageSE } = useSoundEffect('/sound-effects/se-11.mp3', true)

  async function handleSave() {
    if (!selectedPage) return
    setError(null)
    setSaving(true)
    const content =
      contentRef.current.length > 0 ? contentRef.current : (selectedPage.content as unknown as PageField[])
    const result = await updatePageContent(selectedPage.id, content)
    setSaving(false)
    if (result.success) {
      play()
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } else {
      setError(result.error ?? 'Failed to save.')
    }
  }

  return (
    <DashboardPanel
      open={open}
      onClose={onClose}
      title="Page Content"
      subtitle={selectedPage?.slug ?? `${pages.length} pages`}
      width="lg"
    >
      {/* Toolbar */}
      <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        {/* Page tabs */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {pages.map((page) => (
            <button
              key={page.id}
              type="button"
              onClick={() => {
                selectPageSE()
                setSelectedPage(page)
                contentRef.current = []
                setError(null)
                setSaved(false)
              }}
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest border transition-colors focus-visible:outline-none ${
                selectedPage?.id === page.id
                  ? 'border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark bg-primary-light/5 dark:bg-primary-dark/5'
                  : 'border-border-light dark:border-border-dark text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'
              }`}
            >
              <FileText className="w-2.5 h-2.5" aria-hidden="true" />
              {page.slug}
            </button>
          ))}
        </div>

        {/* Save button */}
        {selectedPage && (
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            aria-busy={saving}
            className="shrink-0 flex items-center gap-1.5 ml-3 font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark bg-secondary-light/5 dark:bg-secondary-dark/5 hover:bg-secondary-light/10 dark:hover:bg-secondary-dark/10 transition-colors disabled:opacity-50 focus-visible:outline-none min-h-9"
          >
            {saving ? (
              <Loader2 className="w-2.5 h-2.5 animate-spin" aria-hidden="true" />
            ) : (
              <Save className="w-2.5 h-2.5" aria-hidden="true" />
            )}
            {saving ? 'Saving...' : saved ? 'Saved ✓' : 'Save'}
          </button>
        )}
      </div>

      {/* Marquee */}
      <div className="shrink-0 border-b border-border-light dark:border-border-dark overflow-hidden h-7 flex items-center bg-surface-light dark:bg-surface-dark">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary-light dark:bg-primary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-primary-light dark:text-primary-dark">Select Page</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— pick a page from the tabs above</span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-secondary-light dark:text-secondary-dark">Edit Fields</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— update text in any section below</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cta-light dark:bg-cta-dark shrink-0" aria-hidden="true" />
                <span className="text-cta-light dark:text-cta-dark">Save</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">
                  — hit Save when done to publish changes
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted-light dark:bg-muted-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-muted-light dark:text-muted-dark">Sections</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">
                  — click a section header to collapse it
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="shrink-0 border-b border-red-500/30 bg-red-500/5 px-4 py-2">
          <span className="text-[11px] font-mono text-red-500 dark:text-red-400">{error}</span>
        </div>
      )}

      {/* Field editor */}
      <div className="flex-1 overflow-y-auto bg-bg-light dark:bg-bg-dark">
        {!selectedPage ? (
          <div className="flex flex-col items-center justify-center h-32 gap-2">
            <FileText className="w-6 h-6 text-border-light dark:text-border-dark" aria-hidden="true" />
            <span className="font-mono text-[11px] uppercase tracking-widest text-muted-light/60 dark:text-muted-dark/60">
              Select a page
            </span>
          </div>
        ) : (
          <PageFieldEditor
            key={selectedPage.id}
            page={selectedPage}
            onContentChange={(content) => {
              contentRef.current = content
            }}
          />
        )}
      </div>

      {/* Footer */}
      <div className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">{pages.length} pages</span>
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
          {selectedPage ? `Editing ${selectedPage.slug}` : 'No page selected'}
        </span>
      </div>
    </DashboardPanel>
  )
}
