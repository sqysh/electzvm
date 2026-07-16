'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, X } from 'lucide-react'
import DashboardPanel from './DashboardPanel'
import ConfirmDeleteModal from '../modals/ConfirmDeleteModal'
import { UserRecord } from '@/types/user.types'
import { CreateUserForm } from '../../forms/CreateUserForm'
import useSoundEffect from '../../../lib/hooks/useSoundEffect'
import { UserRow } from '../rows/UserRow'
import { deleteUser } from '@/app/lib/actions/admin/user/deleteUser'

export default function TeamPanel({
  open,
  onClose,
  users,
  currentUserId,
  onUsersChange
}: {
  open: boolean
  onClose: () => void
  users: UserRecord[]
  currentUserId: string | undefined
  onUsersChange: (users: UserRecord[]) => void
}) {
  const [showForm, setShowForm] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; user: UserRecord | null }>({
    open: false,
    user: null
  })
  const [deleting, setDeleting] = useState(false)
  const { play: deleteSE } = useSoundEffect('/sound-effects/se-4.mp3', true)
  const { play: cancelSE } = useSoundEffect('/sound-effects/se-15.mp3', true)

  async function handleDelete() {
    if (!deleteModal.user) return
    setDeleting(true)
    const result = await deleteUser(deleteModal.user.id)
    setDeleting(false)
    if (result.success) {
      deleteSE()
      onUsersChange(users.filter((u) => u.id !== deleteModal.user?.id))
      setDeleteModal({ open: false, user: null })
    }
  }

  return (
    <>
      <DashboardPanel open={open} onClose={onClose} title="Team Members" subtitle={String(users.length)} width="md">
        {/* Add member button */}
        <div className="shrink-0 px-4 py-3 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark flex items-center justify-between">
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            {users.filter((u) => u.role === 'ADMIN').length} admin ·{' '}
            {users.filter((u) => u.role === 'SUPER_USER').length} super
          </span>
          <button
            onClick={() => setShowForm((v) => !v)}
            aria-label={showForm ? 'Cancel' : 'Add team member'}
            className="flex items-center gap-1.5 font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-11"
          >
            {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
            {showForm ? 'Cancel' : 'Add Member'}
          </button>
        </div>

        {/* Marquee */}
        <div className="shrink-0 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden h-7 flex items-center">
          <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="flex items-center gap-8 shrink-0">
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-primary-light dark:bg-primary-dark shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-primary-light dark:text-primary-dark">Gmail Only</span>
                  <span className="text-muted-light/40 dark:text-muted-dark/40">
                    — all team members must sign in with a Gmail account
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-secondary-light dark:text-secondary-dark">Add Member</span>
                  <span className="text-muted-light/40 dark:text-muted-dark/40">
                    — click Add Member to invite someone to the portal
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-cta-light dark:bg-cta-dark shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-cta-light dark:text-cta-dark">Remove</span>
                  <span className="text-muted-light/40 dark:text-muted-dark/40">
                    — click a member to expand and remove their access
                  </span>
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className="w-1.5 h-1.5 rounded-full bg-muted-light dark:bg-muted-dark shrink-0"
                    aria-hidden="true"
                  />
                  <span className="text-muted-light dark:text-muted-dark">You</span>
                  <span className="text-muted-light/40 dark:text-muted-dark/40">
                    — you cannot remove your own account
                  </span>
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Create form */}
        <AnimatePresence>
          {showForm && (
            <CreateUserForm
              onClose={() => setShowForm(false)}
              onCreate={(user) => {
                onUsersChange([user, ...users])
              }}
            />
          )}
        </AnimatePresence>

        {/* Users list */}
        <div className="divide-y divide-border-light dark:divide-border-dark">
          {users.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2">
              <p className="font-archivo text-[11px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
                No team members
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                Add one →
              </button>
            </div>
          ) : (
            <AnimatePresence initial={false}>
              {users.map((user) => (
                <motion.div
                  key={user.id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <UserRow
                    user={user}
                    currentUserId={currentUserId}
                    onDelete={() => setDeleteModal({ open: true, user })}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>
      </DashboardPanel>

      <ConfirmDeleteModal
        open={deleteModal.open}
        title={`Remove ${deleteModal.user?.firstName ?? deleteModal.user?.email ?? 'this member'}?`}
        description="They will lose access to the admin portal immediately."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => {
          cancelSE()
          setDeleteModal({ open: false, user: null })
        }}
      />
    </>
  )
}
