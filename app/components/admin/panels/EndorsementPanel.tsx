'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import { Endorsement, EndorsementFormState } from '@/types/endorsement.types'
import DashboardPanel from './DashboardPanel'
import { EndorsementForm } from '../../forms/EndorsementForm'
import { EndorsementRow } from '../rows/EndorsementRow'
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'
import { createEndorsement } from '@/app/lib/actions/admin/endorsement/createEndorsement'
import { updateEndorsement } from '@/app/lib/actions/admin/endorsement/updateEndorsement'
import { deleteEndorsement } from '@/app/lib/actions/admin/endorsement/deleteEndorsement'

const emptyForm: EndorsementFormState = {
  name: '',
  title: '',
  organization: '',
  imageUrl: '',
  isPublished: false
}

export default function EndorsementPanel({
  open,
  onClose,
  endorsements: initialEndorsements,
  onEndorsementsChange
}: {
  open: boolean
  onClose: () => void
  endorsements: Endorsement[]
  onEndorsementsChange?: (endorsements: Endorsement[]) => void
}) {
  const [endorsements, setEndorsements] = useState<Endorsement[]>(initialEndorsements)
  const [mode, setMode] = useState<'list' | 'create' | 'edit'>('list')
  const [editingItem, setEditingItem] = useState<Endorsement | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; item: Endorsement | null }>({
    open: false,
    item: null
  })
  const [deleting, setDeleting] = useState(false)
  const { play: deleteSE } = useSoundEffect('/sound-effects/se-4.mp3', true)
  const { play: saveSE } = useSoundEffect('/sound-effects/se-1.mp3', true)

  function syncUp(updated: Endorsement[]) {
    setEndorsements(updated)
    onEndorsementsChange?.(updated)
  }

  async function handleCreate(data: EndorsementFormState) {
    setSaving(true)
    setError(null)
    const result = await createEndorsement(data)
    setSaving(false)
    if (result.success && result.data) {
      saveSE()
      syncUp([result.data as Endorsement, ...endorsements])
      setMode('list')
    } else {
      setError(result.error ?? 'Failed to create endorsement.')
    }
  }

  async function handleUpdate(data: EndorsementFormState) {
    if (!editingItem) return
    setSaving(true)
    setError(null)
    const result = await updateEndorsement(editingItem.id, data)
    setSaving(false)
    if (result.success && result.data) {
      saveSE()
      syncUp(endorsements.map((e) => (e.id === editingItem.id ? (result.data as Endorsement) : e)))
      setMode('list')
      setEditingItem(null)
    } else {
      setError(result.error ?? 'Failed to update endorsement.')
    }
  }

  async function handleDelete() {
    if (!deleteModal.item) return
    setDeleting(true)
    const result = await deleteEndorsement(deleteModal.item.id)
    setDeleting(false)
    if (result.success) {
      deleteSE()
      syncUp(endorsements.filter((e) => e.id !== deleteModal.item!.id))
      setDeleteModal({ open: false, item: null })
      if (editingItem?.id === deleteModal.item.id) {
        setMode('list')
        setEditingItem(null)
      }
    }
  }

  function openEdit(item: Endorsement) {
    setEditingItem(item)
    setError(null)
    setMode('edit')
  }

  function closeForm() {
    setMode('list')
    setEditingItem(null)
    setError(null)
  }

  const isForm = mode === 'create' || mode === 'edit'

  return (
    <>
      <DashboardPanel
        open={open}
        onClose={onClose}
        title="Endorsements"
        subtitle={`${endorsements?.length}`}
        width="md"
      >
        {/* Toolbar */}
        <div className="shrink-0 flex items-center justify-between px-4 py-2 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
              {endorsements.filter((e) => e.isPublished).length} live ·{' '}
              {endorsements.filter((e) => !e.isPublished).length} draft
            </span>
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
            aria-label={isForm ? 'Cancel' : 'Add endorsement'}
            className="flex items-center gap-1.5 font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-none min-h-9"
          >
            {isForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {isForm ? 'Cancel' : 'Add'}
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
                    — visible on the public endorsements page
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-light dark:bg-muted-dark shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-muted-light dark:text-muted-dark">Draft</span>
                  <span className="text-muted-light/40 dark:text-muted-dark/40">— saved but not publicly visible</span>
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-primary-light dark:bg-primary-dark shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-primary-light dark:text-primary-dark">Image</span>
                  <span className="text-muted-light/40 dark:text-muted-dark/40">— optional headshot URL</span>
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
              className="overflow-hidden"
            >
              <div className="px-4 py-2 bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
                <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  {mode === 'create' ? 'New Endorsement' : `Editing · ${editingItem?.name}`}
                </span>
              </div>
              <EndorsementForm
                key={editingItem?.id ?? 'new'}
                initial={
                  mode === 'edit' && editingItem
                    ? {
                        name: editingItem.name,
                        title: editingItem.title ?? '',
                        organization: editingItem.organization ?? '',
                        imageUrl: editingItem.imageUrl ?? '',
                        isPublished: editingItem.isPublished
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

        {/* List */}
        <div className="flex-1 overflow-y-auto">
          {endorsements.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2">
              <p className="font-archivo text-[11px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
                No endorsements yet
              </p>
              <button
                onClick={() => setMode('create')}
                className="font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                Add one →
              </button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {endorsements.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <EndorsementRow
                    endorsement={item}
                    isEditing={editingItem?.id === item.id}
                    onEdit={() => openEdit(item)}
                    onDelete={() => setDeleteModal({ open: true, item })}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Footer */}
        <div className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
          <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
            {endorsements.length} total
          </span>
          <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
            {endorsements.filter((e) => e.isPublished).length} published
          </span>
        </div>
      </DashboardPanel>

      <ConfirmDeleteModal
        open={deleteModal.open}
        title={`Delete endorsement from ${deleteModal.item?.name ?? 'this person'}?`}
        description="This will permanently remove the endorsement."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, item: null })}
      />
    </>
  )
}
