import { createAdminUser } from '@/app/lib/actions/user/createAdminUser'
import { adminInputCls } from '@/app/lib/constants/styles.constants'
import { UserRecord } from '@/types/user.types'
import { Loader2, X } from 'lucide-react'
import { useState } from 'react'
import { RoleBadge } from '../elements/RoleBadge'
import { motion } from 'framer-motion'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'

export function CreateUserForm({ onClose, onCreate }: { onClose: () => void; onCreate: (user: UserRecord) => void }) {
  const [form, setForm] = useState({ name: '', email: '' })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { play } = useSoundEffect('/sound-effects/se-1.mp3', true)

  function set(key: string, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit() {
    setError(null)
    setSaving(true)
    const [firstName, ...rest] = form.name.trim().split(' ')
    const lastName = rest.join(' ')
    const result = await createAdminUser({ firstName, lastName, email: form.email })
    setSaving(false)
    if (result.success && result.data) {
      play()
      onCreate(result.data as unknown as UserRecord)
      setForm({ name: '', email: '' })
    } else {
      setError(result.error ?? 'Failed to create user.')
    }
  }

  return (
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
          New Admin User
        </span>
        <button
          onClick={onClose}
          aria-label="Close form"
          className="w-8 h-8 flex items-center justify-center text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex flex-col gap-6 p-5 sm:p-6">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="name"
            className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
          >
            Full Name *
          </label>
          <input
            id="name"
            type="text"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            className={adminInputCls}
            placeholder="First Last"
            autoComplete="name"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="email"
            className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
          >
            Email *{' '}
            <span className="text-cta-light dark:text-cta-dark normal-case tracking-normal font-inter">
              — Gmail only
            </span>
          </label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            className={adminInputCls}
            placeholder="name@gmail.com"
            autoComplete="email"
          />
          <p className="font-inter text-[11px] text-muted-light dark:text-muted-dark">
            Must be a Gmail account — sign in is handled via Google OAuth.
          </p>
        </div>

        {/* Role — always ADMIN */}
        <div className="flex items-center justify-between px-3 py-2.5 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
          <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            Role
          </span>
          <RoleBadge role="ADMIN" />
        </div>

        {error && (
          <p role="alert" className="font-inter text-xs text-red-500 dark:text-red-400">
            {error}
          </p>
        )}

        <div className="flex gap-3 pt-2">
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving || !form.name.trim() || !form.email.trim()}
            aria-busy={saving}
            className="font-archivo px-6 py-3 text-xs font-bold uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed min-h-11 flex items-center gap-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />}
            {saving ? 'Creating...' : 'Create User'}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="font-archivo px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-light dark:text-muted-dark border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors min-h-11 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  )
}
