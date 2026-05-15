'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Pencil, Trash2, Loader2, X, ExternalLink, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import type { News } from '@prisma/client'
import { createNews } from '@/app/lib/actions/news/createNews'
import { updateNews } from '@/app/lib/actions/news/updateNews'
import { deleteNews } from '@/app/lib/actions/news/deleteNews'
import { NewsFormState } from '@/types/news.types'
import { NewsForm } from '@/app/components/forms/NewsForm'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'
import ConfirmDeleteModal from '@/app/components/modals/ConfirmDeleteModal'
import { useSearchParams } from 'next/navigation'

const emptyForm: NewsFormState = {
  title: '',
  excerpt: '',
  body: '',
  imageUrl: '',
  externalLink: '',
  isPublished: false
}

// ── NewsRow ───────────────────────────────────────────────────────────────────

function NewsRow({
  article,
  onEdit,
  onDelete,
  deletingId
}: {
  article: News
  onEdit: () => void
  onDelete: () => void
  deletingId: string | null
}) {
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; id: string | null }>({ open: false, id: null })

  return (
    <>
      <ConfirmDeleteModal
        open={deleteModal.open}
        title="Delete this article?"
        description={`"${article.title}" will be permanently removed.`}
        loading={deletingId === deleteModal.id}
        onConfirm={() => {
          if (deleteModal.id) onDelete()
        }}
        onCancel={() => setDeleteModal({ open: false, id: null })}
      />

      <div className="flex items-start gap-3 sm:gap-4 px-4 sm:px-5 py-4 border-b border-border-light dark:border-border-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors group">
        {/* Status dot */}
        <div className="shrink-0 mt-1.5">
          <div
            className={`w-2 h-2 rounded-full ${article.isPublished ? 'bg-secondary-light dark:bg-secondary-dark' : 'bg-border-light dark:bg-border-dark'}`}
            aria-label={article.isPublished ? 'Published' : 'Draft'}
          />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0 flex flex-col gap-1">
          <p className="font-archivo text-sm font-bold text-text-light dark:text-text-dark truncate">{article.title}</p>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark">
              {new Date(article.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
            </span>
            <span
              className={`font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border ${article.isPublished ? 'border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark' : 'border-muted-light dark:border-muted-dark text-muted-light dark:text-muted-dark'}`}
            >
              {article.isPublished ? 'Live' : 'Draft'}
            </span>
            {article.externalLink && (
              <a
                href={article.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open external link"
                className="text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
          {article.excerpt && (
            <p className="font-inter text-xs text-muted-light dark:text-muted-dark line-clamp-1 mt-0.5">
              {article.excerpt}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={onEdit}
            aria-label={`Edit ${article.title}`}
            className="w-9 h-9 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setDeleteModal({ open: true, id: article.id })}
            disabled={deletingId === article.id}
            aria-label={`Delete ${article.title}`}
            className="w-9 h-9 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-red-500 dark:hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 disabled:opacity-40"
          >
            {deletingId === article.id ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Trash2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>
    </>
  )
}

// ── AdminNewsClient ───────────────────────────────────────────────────────────

export default function AdminNewsClient({ news }: { news: News[] }) {
  const [articles, setArticles] = useState<News[]>(news)
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingArticle, setEditingArticle] = useState<News | null>(null)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'published' | 'draft'>('all')
  const { play: saveSE } = useSoundEffect('/sound-effects/se-1.mp3', true)
  const { play: deleteSE } = useSoundEffect('/sound-effects/se-2.mp3', true)
  const searchParams = useSearchParams()

  useEffect(() => {
    const id = searchParams.get('id')
    if (id) {
      const article = news.find((a) => a.id === id)
      if (article) openEdit(article)
    }
  }, [news, searchParams])

  const filtered = articles.filter((a) => {
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
      setArticles((prev) => [result.data as News, ...prev])
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
      setArticles((prev) => prev.map((a) => (a.id === editingArticle.id ? (result.data as News) : a)))
      setMode('list')
      setEditingArticle(null)
    } else {
      setError(result.error ?? 'Failed to update article.')
    }
  }

  async function handleDelete(id: string) {
    setDeletingId(id)
    const result = await deleteNews(id)
    setDeletingId(null)
    if (result.success) {
      deleteSE()
      setArticles((prev) => prev.filter((a) => a.id !== id))
    }
  }

  function openEdit(article: News) {
    setEditingArticle(article)
    setError(null)
    setMode('edit')
  }

  function openCreate() {
    setEditingArticle(null)
    setError(null)
    setMode('create')
  }

  function closeForm() {
    setMode('list')
    setEditingArticle(null)
    setError(null)
  }

  const isForm = mode === 'create' || mode === 'edit'

  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between px-4 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div className="w-px h-3 bg-border-light dark:bg-border-dark" aria-hidden="true" />
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            [ News ]
          </span>
          <span className="font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50">· {articles.length}</span>
        </div>
        <button
          onClick={isForm ? closeForm : openCreate}
          aria-label={isForm ? 'Cancel' : 'Create new article'}
          className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          {isForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </header>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ── List panel ─────────────────────────────────────────────── */}
        <div
          className={`flex flex-col ${isForm ? 'hidden lg:flex lg:w-80 xl:w-96' : 'flex-1'} border-r border-border-light dark:border-border-dark overflow-hidden`}
        >
          {/* Filter bar */}
          <div className="shrink-0 flex items-center border-b border-border-light dark:border-border-dark">
            {(['all', 'published', 'draft'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 h-9 font-archivo text-[10px] tracking-[0.15em] uppercase transition-colors focus-visible:outline-none ${filter === f ? 'bg-primary-light dark:bg-primary-dark text-white' : 'text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Articles */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 gap-2">
                <p className="font-archivo text-[11px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
                  No articles
                </p>
                <button
                  onClick={openCreate}
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
                      onEdit={() => openEdit(article)}
                      onDelete={() => handleDelete(article.id)}
                      deletingId={deletingId}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* ── Form panel ─────────────────────────────────────────────── */}
        <AnimatePresence>
          {isForm && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2 }}
              className="flex-1 overflow-y-auto"
            >
              {/* Form header */}
              <div className="sticky top-0 z-10 flex items-center justify-between px-5 h-10 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  {mode === 'create'
                    ? 'New Article'
                    : `Editing · ${editingArticle?.title?.slice(0, 30)}${(editingArticle?.title?.length ?? 0) > 30 ? '...' : ''}`}
                </span>
                <button
                  onClick={closeForm}
                  aria-label="Close form"
                  className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <NewsForm
                initial={
                  mode === 'edit' && editingArticle
                    ? {
                        title: editingArticle.title,
                        excerpt: editingArticle.excerpt,
                        body: editingArticle.body,
                        imageUrl: editingArticle.imageUrl,
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
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-archivo text-[9px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
          Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span> · Sqysh
        </span>
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
          {articles.filter((a) => a.isPublished).length} live · {articles.filter((a) => !a.isPublished).length} draft
        </span>
      </footer>
    </div>
  )
}
