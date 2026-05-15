'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, X, Trash2, Loader2, ArrowLeft, ImageIcon, Film, Plus } from 'lucide-react'
import Link from 'next/link'
import { UploadItem } from '@/types/gallery-item'
import { GalleryItem } from '@prisma/client'
import Picture from '@/app/components/elements/Picture'
import { uploadFileToFirebase } from '@/app/lib/utils/firebase.utils'
import ConfirmDeleteModal from '@/app/components/modals/ConfirmDeleteModal'
import { createGalleryItem } from '@/app/lib/actions/gallery-item/createGalleryItem'
import { deleteGalleryItem } from '@/app/lib/actions/gallery-item/deleteGalleryItem'
import { convertToWebP } from '@/app/lib/utils/image.utils'

// ── UploadQueue item ──────────────────────────────────────────────────────────

function QueueItem({ item, onRemove }: { item: UploadItem; onRemove: () => void }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-800 last:border-0">
      {/* Icon */}
      <div
        className={`w-8 h-8 shrink-0 flex items-center justify-center border ${item.type === 'video' ? 'border-cta-light dark:border-cta-dark text-cta-light dark:text-cta-dark' : 'border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark'}`}
      >
        {item.type === 'video' ? (
          <Film className="w-3.5 h-3.5" aria-hidden="true" />
        ) : (
          <ImageIcon className="w-3.5 h-3.5" aria-hidden="true" />
        )}
      </div>

      {/* Info + progress */}
      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <span className="font-archivo text-xs text-neutral-900 dark:text-neutral-100 truncate">{item.file.name}</span>
        {item.status === 'uploading' && (
          <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 relative overflow-hidden">
            <motion.div
              className="absolute left-0 top-0 h-full bg-primary-light dark:bg-primary-dark"
              initial={{ width: '0%' }}
              animate={{ width: `${item.progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
        {item.status === 'error' && (
          <span className="font-inter text-[10px] text-red-500 dark:text-red-400">{item.error}</span>
        )}
      </div>

      {/* Status */}
      <div className="shrink-0 flex items-center gap-2">
        {item.status === 'uploading' && (
          <span className="font-mono text-[10px] text-neutral-400 dark:text-neutral-600 tabular-nums">
            {Math.round(item.progress)}%
          </span>
        )}
        {item.status === 'done' && (
          <span className="font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark">
            Done
          </span>
        )}
        {item.status === 'error' && (
          <span className="font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border border-red-500/40 text-red-500 dark:text-red-400">
            Failed
          </span>
        )}
        {item.status === 'pending' && (
          <button
            onClick={onRemove}
            aria-label={`Remove ${item.file.name} from queue`}
            className="w-6 h-6 flex items-center justify-center text-neutral-400 dark:text-neutral-600 hover:text-red-500 dark:hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  )
}

// ── Media grid item ───────────────────────────────────────────────────────────

function MediaItem({ item, onDelete }: { item: GalleryItem; onDelete: () => void }) {
  return (
    <div className="group relative border border-neutral-200 dark:border-neutral-800 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
      {item.type === 'video' ? (
        <video
          src={item.url}
          className="w-full h-40 sm:h-48 object-cover"
          muted
          playsInline
          preload="metadata"
          aria-label={item.filename}
        />
      ) : (
        <Picture src={item.url} alt={item.filename} className="w-full h-40 sm:h-48 object-cover" priority={false} />
      )}

      {/* Overlay on hover */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-200 flex items-center justify-center">
        <button
          onClick={onDelete}
          aria-label={`Delete ${item.filename}`}
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-9 h-9 flex items-center justify-center bg-red-600 text-white hover:bg-red-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Type badge */}
      <div className="absolute top-2 left-2">
        <span
          className={`font-archivo text-[9px] tracking-widest uppercase px-1.5 py-0.5 border ${item.type === 'video' ? 'bg-cta-light/80 dark:bg-cta-dark/80 border-cta-light dark:border-cta-dark text-white' : 'bg-primary-light/80 dark:bg-primary-dark/80 border-primary-light dark:border-primary-dark text-white'}`}
        >
          {item.type}
        </span>
      </div>

      {/* Filename */}
      <div className="px-3 py-2 border-t border-neutral-200 dark:border-neutral-800">
        <p className="font-mono text-[10px] text-neutral-500 dark:text-neutral-500 truncate">{item.filename}</p>
      </div>
    </div>
  )
}

// ── AdminGalleryClient ────────────────────────────────────────────────────────

export default function AdminGalleryClient({ media: initialMedia }: { media: GalleryItem[] }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [media, setMedia] = useState<GalleryItem[]>(initialMedia)
  const [queue, setQueue] = useState<UploadItem[]>([])
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; item: GalleryItem | null }>({
    open: false,
    item: null
  })
  const [deleting, setDeleting] = useState(false)
  const [filter, setFilter] = useState<'all' | 'image' | 'video'>('all')

  const filteredMedia = media.filter((m) => filter === 'all' || m.type === filter)

  function getFileType(file: File): 'image' | 'video' {
    return file.type.startsWith('video/') ? 'video' : 'image'
  }

  function addFiles(files: FileList | File[]) {
    const arr = Array.from(files)
    const newItems: UploadItem[] = arr.map((file) => ({
      id: `${file.name}-${Date.now()}-${Math.random()}`,
      file,
      type: getFileType(file),
      progress: 0,
      status: 'pending'
    }))
    setQueue((prev) => [...prev, ...newItems])
  }

  function removeFromQueue(id: string) {
    setQueue((prev) => prev.filter((i) => i.id !== id))
  }

  function updateQueueItem(id: string, patch: Partial<UploadItem>) {
    setQueue((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)))
  }

  async function handleUploadAll() {
    const pending = queue.filter((i) => i.status === 'pending')
    if (pending.length === 0) return
    setUploading(true)

    for (const item of pending) {
      updateQueueItem(item.id, { status: 'uploading' })

      // inside the upload loop, before uploadFileToFirebase:
      let fileToUpload = item.file
      if (item.type === 'image') {
        try {
          fileToUpload = await convertToWebP(item.file)
        } catch {
          // fallback to original if conversion fails
        }
      }

      try {
        const url = await uploadFileToFirebase(
          fileToUpload,
          (progress) => updateQueueItem(item.id, { progress }),
          item.type
        )

        const result = await createGalleryItem({ url, filename: item.file.name, type: item.type })
        if (result.success && result.data) {
          setMedia((prev) => [result.data as GalleryItem, ...prev])
          updateQueueItem(item.id, { status: 'done', url, progress: 100 })
        } else {
          updateQueueItem(item.id, { status: 'error', error: result.error ?? 'Failed to save.' })
        }
      } catch (err) {
        updateQueueItem(item.id, { status: 'error', error: 'Upload failed.' })
      }
    }

    setUploading(false)
    // Clear done items after a short delay
    setTimeout(() => {
      setQueue((prev) => prev.filter((i) => i.status !== 'done'))
    }, 2000)
  }

  async function handleDelete() {
    if (!deleteModal.item) return
    setDeleting(true)
    const result = await deleteGalleryItem(deleteModal.item.id)
    setDeleting(false)
    if (result.success) {
      setMedia((prev) => prev.filter((m) => m.id !== deleteModal.item!.id))
      setDeleteModal({ open: false, item: null })
    }
  }

  const pendingCount = queue.filter((i) => i.status === 'pending').length

  return (
    <div className="min-h-screen w-full bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col">
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <header className="shrink-0 flex items-center justify-between px-4 sm:px-6 h-12 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            aria-label="Back to dashboard"
            className="text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <div aria-hidden="true" className="w-px h-3 bg-neutral-200 dark:bg-neutral-800" />
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-neutral-500 dark:text-neutral-500">
            [ Gallery ]
          </span>
          <span className="font-mono text-[10px] text-neutral-300 dark:text-neutral-700">· {media.length}</span>
        </div>
        <button
          onClick={() => inputRef.current?.click()}
          aria-label="Add files"
          className="flex items-center gap-1.5 font-archivo text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 border border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark hover:bg-primary-light dark:hover:bg-primary-dark hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-9"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          Add Files
        </button>
      </header>

      {/* Status legend marquee */}
      <div className="shrink-0 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden h-7 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary-light dark:bg-primary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-primary-light dark:text-primary-dark">Image</span>
                <span className="text-neutral-300 dark:text-neutral-700">
                  — converted to WebP and compressed under 1MB
                </span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-cta-light dark:bg-cta-dark shrink-0" aria-hidden="true" />
                <span className="text-cta-light dark:text-cta-dark">Video</span>
                <span className="text-neutral-300 dark:text-neutral-700">— uploaded directly to Firebase Storage</span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-secondary-light dark:text-secondary-dark">Queue</span>
                <span className="text-neutral-300 dark:text-neutral-700">— drag and drop or click to add files</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" aria-hidden="true" />
                <span className="text-red-400">Delete</span>
                <span className="text-neutral-300 dark:text-neutral-700">
                  — hover a file to reveal the delete button
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*"
        className="sr-only"
        aria-label="Upload images or videos"
        onChange={(e) => {
          if (e.target.files) addFiles(e.target.files)
        }}
      />

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ── Left — upload queue ─────────────────────────────────────── */}
        <div className="shrink-0 lg:w-72 xl:w-80 border-b lg:border-b-0 lg:border-r border-neutral-200 dark:border-neutral-800 flex flex-col bg-white dark:bg-neutral-900 overflow-hidden">
          {/* Drop zone */}
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOver(true)
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={(e) => {
              e.preventDefault()
              setDragOver(false)
              addFiles(e.dataTransfer.files)
            }}
            aria-label="Drop zone — click or drag files to upload"
            className={`shrink-0 m-4 h-28 flex flex-col items-center justify-center gap-2 border-2 border-dashed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light
              ${
                dragOver
                  ? 'border-primary-light dark:border-primary-dark bg-primary-light/5 dark:bg-primary-dark/5'
                  : 'border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
              }`}
          >
            <Upload className="w-5 h-5 text-neutral-400 dark:text-neutral-600" aria-hidden="true" />
            <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-600">
              Click or drag files
            </span>
            <span className="font-inter text-[10px] text-neutral-300 dark:text-neutral-700">Images & Videos</span>
          </button>

          {/* Queue header */}
          <div className="shrink-0 flex items-center justify-between px-4 py-2 border-t border-neutral-200 dark:border-neutral-800">
            <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-neutral-400 dark:text-neutral-600">
              Queue · {queue.length}
            </span>
            {pendingCount > 0 && (
              <button
                onClick={handleUploadAll}
                disabled={uploading}
                aria-busy={uploading}
                className="font-archivo text-[10px] tracking-[0.15em] uppercase px-3 py-1.5 text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity flex items-center gap-1.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-8"
              >
                {uploading && <Loader2 className="w-3 h-3 animate-spin" aria-hidden="true" />}
                {uploading ? 'Uploading...' : `Upload ${pendingCount}`}
              </button>
            )}
          </div>

          {/* Queue list */}
          <div className="flex-1 overflow-y-auto">
            {queue.length === 0 ? (
              <div className="flex items-center justify-center h-24">
                <p className="font-archivo text-[10px] uppercase tracking-widest text-neutral-300 dark:text-neutral-700">
                  No files queued
                </p>
              </div>
            ) : (
              <AnimatePresence initial={false}>
                {queue.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <QueueItem item={item} onRemove={() => removeFromQueue(item.id)} />
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* ── Right — media grid ──────────────────────────────────────── */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filter bar */}
          <div className="shrink-0 flex items-center border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
            {(['all', 'image', 'video'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 sm:flex-none sm:px-6 h-10 font-archivo text-[10px] tracking-[0.15em] uppercase transition-colors focus-visible:outline-none ${filter === f ? 'bg-primary-light dark:bg-primary-dark text-white' : 'text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300'}`}
              >
                {f}{' '}
                {f === 'all'
                  ? `(${media.length})`
                  : f === 'image'
                    ? `(${media.filter((m) => m.type === 'image').length})`
                    : `(${media.filter((m) => m.type === 'video').length})`}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {filteredMedia.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 gap-3">
                <p className="font-archivo text-[11px] uppercase tracking-widest text-neutral-300 dark:text-neutral-700">
                  No media yet
                </p>
                <button
                  onClick={() => inputRef.current?.click()}
                  className="font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  Upload your first file →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
                <AnimatePresence initial={false}>
                  {filteredMedia.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MediaItem item={item} onDelete={() => setDeleteModal({ open: true, item })} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="shrink-0 h-9 flex items-center justify-between px-4 sm:px-6 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900">
        <span className="font-archivo text-[9px] uppercase tracking-widest text-neutral-400 dark:text-neutral-600">
          Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span> · Sqysh
        </span>
        <span className="font-mono text-[9px] text-neutral-400 dark:text-neutral-600">
          {media.filter((m) => m.type === 'image').length} images · {media.filter((m) => m.type === 'video').length}{' '}
          videos
        </span>
      </footer>

      {/* ── Confirm delete ──────────────────────────────────────────────── */}
      <ConfirmDeleteModal
        open={deleteModal.open}
        title={`Delete ${deleteModal.item?.filename ?? 'this file'}?`}
        description="This will permanently remove the file from Firebase Storage and the gallery."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, item: null })}
      />
    </div>
  )
}
