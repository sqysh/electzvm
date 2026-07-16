'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import type { News } from '@prisma/client'
import { NewsFormState } from '@/types/news.types'
import { createNews } from '@/app/lib/actions/admin/news/createNews'
import { updateNews } from '@/app/lib/actions/admin/news/updateNews'
import { deleteNews } from '@/app/lib/actions/admin/news/deleteNews'
import DashboardPanel from './DashboardPanel'
import { NewsForm } from '../forms/NewsForm'
import { NewsRow } from '../rows/NewsRow'
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'

const emptyForm: NewsFormState = {
  title: '',
  excerpt: '',
  body: '',
  imageUrl: '',
  imageFilename: '',
  externalLink: '',
  isPublished: false
}

// ── NewsPanel ─────────────────────────────────────────────────────────────────

export default function NewsPanel({
  open,
  onClose,
  news: initialNews,
  onNewsChange
}: {
  open: boolean
  onClose: () => void
  news: News[]
  onNewsChange: (news: News[]) => void
}) {
  const [news, setNews] = useState<News[]>(initialNews)
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingArticle, setEditingArticle] = useState<News | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; article: News | null }>({
    open: false,
    article: null
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')

  const { play: deleteSE } = useSoundEffect('/sound-effects/se-4.mp3', true)
  const { play: saveSE } = useSoundEffect('/sound-effects/se-1.mp3', true)
  const { play: filterSE } = useSoundEffect('/sound-effects/se-12.mp3', true)

  function syncUp(updated: News[]) {
    setNews(updated)
    onNewsChange(updated)
  }

  const filtered = news.filter((a) => {
    if (filter === 'published') return a.isPublished
    if (filter === 'draft') return !a.isPublished
    return true
  })

  async function handleCreate(data: NewsFormState) {
    setSaving(true)
    setError(null)
    const result = await createNews(data)
    setSaving(false)
    if (result.success && result.data) {
      saveSE()
      const updated = [result.data as News, ...news]
      syncUp(updated)
      setMode('list')
    } else {
      setError(result.error ?? 'Failed to create article.')
    }
  }

  async function handleUpdate(data: NewsFormState) {
    if (!editingArticle) return
    setSaving(true)
    setError(null)
    const result = await updateNews(editingArticle.id, data)
    setSaving(false)
    if (result.success && result.data) {
      saveSE()
      const updated = news.map((a) => (a.id === editingArticle.id ? (result.data as News) : a))
      syncUp(updated)
      setMode('list')
      setEditingArticle(null)
    } else {
      setError(result.error ?? 'Failed to update article.')
    }
  }

  async function handleDelete() {
    if (!deleteModal.article) return
    setDeletingId(deleteModal.article.id)
    const result = await deleteNews(deleteModal.article.id)
    setDeletingId(null)
    if (result.success) {
      deleteSE()
      const updated = news.filter((a) => a.id !== deleteModal.article!.id)
      syncUp(updated)
      if (editingArticle?.id === deleteModal.article.id) {
        setMode('list')
        setEditingArticle(null)
      }
      setDeleteModal({ open: false, article: null })
    }
  }

  function openEdit(article: News) {
    setEditingArticle(article)
    setError(null)
    setMode('edit')
  }

  function closeForm() {
    setMode('list')
    setEditingArticle(null)
    setError(null)
  }

  const isForm = mode === 'create' || mode === 'edit'

  return (
    <>
      <DashboardPanel open={open} onClose={onClose} title="News" subtitle={`${news.length} articles`} width="lg">
        {/* Toolbar */}
        <div className="shrink-0 flex items-center justify-between border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          {/* Filter tabs */}
          <div className="flex">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => {
                  filterSE()
                  setFilter(f)
                }}
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
            aria-label={isForm ? 'Cancel' : 'New article'}
            className="flex items-center gap-1.5 px-4 font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-none min-h-9"
          >
            {isForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {isForm ? 'Cancel' : 'New'}
          </button>
        </div>

        {/* Marquee */}
        <div className="shrink-0 border-b border-border-light dark:border-border-dark overflow-hidden h-7 flex items-center bg-surface-light dark:bg-surface-dark">
          <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 shrink-0">
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-secondary-light dark:text-secondary-dark">Live</span>
                  <span className="text-muted-light/40 dark:text-muted-dark/40">
                    — published and visible on the public site
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-light dark:bg-muted-dark shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-muted-light dark:text-muted-dark">Draft</span>
                  <span className="text-muted-light/40 dark:text-muted-dark/40">
                    — saved but not visible to the public
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-primary-light dark:bg-primary-dark shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-primary-light dark:text-primary-dark">Editing</span>
                  <span className="text-muted-light/40 dark:text-muted-dark/40">— currently open in the editor</span>
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-cta-light dark:bg-cta-dark shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-cta-light dark:text-cta-dark">External</span>
                  <span className="text-muted-light/40 dark:text-muted-dark/40">
                    — links to an article on another site
                  </span>
                </span>
              </span>
            ))}
          </div>
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
                    ? 'New Article'
                    : `Editing · ${editingArticle?.title?.slice(0, 30)}${(editingArticle?.title?.length ?? 0) > 30 ? '...' : ''}`}
                </span>
              </div>
              <NewsForm
                key={editingArticle?.id ?? 'new'}
                initial={
                  mode === 'edit' && editingArticle
                    ? {
                        title: editingArticle.title,
                        excerpt: editingArticle.excerpt,
                        body: editingArticle.body,
                        imageUrl: editingArticle.imageUrl,
                        imageFilename: editingArticle.imageFilename ?? '',
                        externalLink: editingArticle.externalLink ?? '',
                        isPublished: editingArticle.isPublished
                      }
                    : emptyForm
                }
                onSubmit={mode === 'create' ? handleCreate : handleUpdate}
                onCancel={closeForm}
                saving={saving}
                error={error}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Article list */}
        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2">
              <p className="font-archivo text-[11px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
                No articles
              </p>
              <button
                onClick={() => setMode('create')}
                className="font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                Create one →
              </button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {filtered.map((article) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <NewsRow
                    article={article}
                    isEditing={editingArticle?.id === article.id}
                    onEdit={() => openEdit(article)}
                    onDelete={() => setDeleteModal({ open: true, article })}
                    deleting={deletingId === article.id}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
            {news.filter((a) => a.isPublished).length} live
          </span>
          <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
            {news.filter((a) => !a.isPublished).length} draft
          </span>
        </div>
      </DashboardPanel>

      <ConfirmDeleteModal
        open={deleteModal.open}
        title={`Delete "${deleteModal.article?.title ?? 'this article'}"?`}
        description="This will permanently remove the article from the public site."
        loading={deletingId === deleteModal.article?.id}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, article: null })}
      />
    </>
  )
}
