'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Trash2, X, ArrowLeft, User } from 'lucide-react'
import Link from 'next/link'
import { UserRecord } from '@/types/user.types'
import { deleteUser } from '@/app/lib/actions/user/deleteUser'
import { RoleBadge } from '@/app/components/elements/RoleBadge'
import { CreateUserForm } from '@/app/components/forms/CreateUserForm'
import ConfirmDeleteModal from '@/app/components/modals/ConfirmDeleteModal'
import { useSession } from 'next-auth/react'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'

export default function AdminUsersClient({ users: initialUsers }: { users: UserRecord[] }) {
  const [users, setUsers] = useState<UserRecord[]>(initialUsers)
  const [showForm, setShowForm] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ open: boolean; user: UserRecord | null }>({
    open: false,
    user: null
  })
  const [deleting, setDeleting] = useState(false)
  const session = useSession()
  const { play } = useSoundEffect('/sound-effects/se-2.mp3', true)

  async function handleDelete() {
    if (!deleteModal.user) return
    setDeleting(true)
    const result = await deleteUser(deleteModal.user.id)
    setDeleting(false)
    if (result.success) {
      play()
      setUsers((prev) => prev.filter((u) => u.id !== deleteModal.user!.id))
      setDeleteModal({ open: false, user: null })
    }
  }

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
            [ Users ]
          </span>
          <span className="font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50">· {users.length}</span>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          aria-label={showForm ? 'Cancel' : 'Create new user'}
          className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          {showForm ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        </button>
      </header>

      {/* Status legend marquee */}
      <div className="shrink-0 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark overflow-hidden h-7 flex items-center">
        <div className="flex animate-marquee whitespace-nowrap gap-12 text-[10px] font-mono uppercase tracking-[0.15em]">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-primary-light dark:bg-primary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-primary-light dark:text-primary-dark">Admin</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— standard campaign portal access</span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-secondary-light dark:bg-secondary-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-secondary-light dark:text-secondary-dark">Google OAuth</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— Gmail accounts only</span>
              </span>
              <span className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-muted-light dark:bg-muted-dark shrink-0"
                  aria-hidden="true"
                />
                <span className="text-muted-light dark:text-muted-dark">You</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— cannot delete your own account</span>
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0" aria-hidden="true" />
                <span className="text-red-400">Delete</span>
                <span className="text-muted-light/40 dark:text-muted-dark/40">— permanently removes portal access</span>
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Body ───────────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* ── Users list ─────────────────────────────────────────────── */}
        <div
          className={`flex flex-col ${showForm ? 'hidden lg:flex lg:w-80 xl:w-96' : 'flex-1'} border-r border-border-light dark:border-border-dark overflow-hidden`}
        >
          {/* Column headers */}
          <div className="shrink-0 grid grid-cols-[1fr_80px_40px] items-center px-4 h-9 border-b border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark gap-3">
            <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              User
            </span>
            <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              Role
            </span>
            <span className="sr-only">Actions</span>
          </div>

          {/* Users */}
          <div className="flex-1 overflow-y-auto divide-y divide-border-light dark:divide-border-dark">
            {users.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-40 gap-2">
                <p className="font-archivo text-[11px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
                  No users
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="font-archivo text-[10px] tracking-widest uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  Create one →
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
                    className="grid grid-cols-[1fr_80px_40px] items-center px-4 py-3 hover:bg-surface-light dark:hover:bg-surface-dark transition-colors gap-3 group"
                  >
                    {/* User info */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 shrink-0 flex items-center justify-center border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                        <User className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark" aria-hidden="true" />
                      </div>

                      <div className="flex flex-col min-w-0">
                        <span className="font-archivo text-sm font-bold text-text-light dark:text-text-dark truncate">
                          {user.firstName ?? '—'}
                        </span>
                        <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark truncate">
                          {user.email}
                        </span>
                      </div>
                    </div>

                    {/* Role */}
                    <div>
                      <RoleBadge role={user.role} />
                    </div>

                    {/* Delete */}
                    {(user.role === 'ADMIN' || user.role === 'SUPER_USER') && user.id !== session.data?.user.id && (
                      <button
                        onClick={() => setDeleteModal({ open: true, user })}
                        aria-label={`Delete ${user.firstName ?? user.email} ${user.lastName && user?.lastName}`}
                        className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-red-500 dark:hover:text-red-400 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        {/* ── Create form panel ───────────────────────────────────────── */}
        <AnimatePresence>
          {showForm && (
            <CreateUserForm
              onClose={() => setShowForm(false)}
              onCreate={(user) => setUsers((prev) => [user, ...prev])}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="shrink-0 h-8 flex items-center justify-between px-4 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <span className="font-archivo text-[9px] uppercase tracking-widest text-muted-light dark:text-muted-dark">
          Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span> · Sqysh
        </span>
        <span className="font-mono text-[9px] text-muted-light dark:text-muted-dark">
          {users.filter((u) => u.role === 'SUPER_USER').length} super · {users.filter((u) => u.role === 'ADMIN').length}{' '}
          admin
        </span>
      </footer>

      {/* ── Confirm delete modal ────────────────────────────────────────── */}
      <ConfirmDeleteModal
        open={deleteModal.open}
        title={`Delete ${deleteModal.user?.firstName ?? deleteModal.user?.email ?? 'this user'}?`}
        description="They will lose access to the admin portal immediately."
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setDeleteModal({ open: false, user: null })}
      />
    </div>
  )
}
