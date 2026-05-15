import { Loader2 } from 'lucide-react'
import { createVolunteerSubmission } from '@/app/lib/actions/volunteer-submission/createVolunteerSubmission'
import Toggle from '@/app/components/elements/Toggle'
import { Fragment, useState } from 'react'
import { motion } from 'framer-motion'
import { inputCls } from '@/app/lib/constants/styles.constants'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import useSoundEffect from '@/app/lib/hooks/useSoundEffect'
import { formatPhone } from '@/app/lib/utils/number.utils'

export function VolunteerSubmissionForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    mailingList: false,
    yardSign: false,
    doorKnocking: false
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { play } = useSoundEffect('/sound-effects/se-1.mp3', true)

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit() {
    setError(null)
    setLoading(true)
    const result = await createVolunteerSubmission(form)
    setLoading(false)
    if (result.success) {
      play()
      setSuccess(true)
    } else setError(result.error ?? 'Something went wrong. Please try again.')
  }

  return (
    <Fragment>
      {success ? (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border border-secondary-light dark:border-secondary-dark bg-secondary-light/5 dark:bg-secondary-dark/5 p-8 text-center"
        >
          <p className="font-archivo text-2xl font-black uppercase text-text-light dark:text-text-dark mb-3">
            Thank You!
          </p>
          <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed mb-6">
            We&apos;ve received your information and will be in touch soon. Together we move forward.
          </p>
          {(form.mailingList || form.yardSign || form.doorKnocking) && (
            <div className="flex flex-col gap-2 text-left border-t border-border-light dark:border-border-dark pt-6">
              <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-1">
                You signed up to
              </p>
              {form.mailingList && (
                <p className="font-inter text-sm text-text-light dark:text-text-dark">✓ &nbsp;Join the mailing list</p>
              )}
              {form.yardSign && (
                <p className="font-inter text-sm text-text-light dark:text-text-dark">
                  ✓ &nbsp;Put a sign in your yard
                </p>
              )}
              {form.doorKnocking && (
                <p className="font-inter text-sm text-text-light dark:text-text-dark">
                  ✓ &nbsp;Join the door knocking crew
                </p>
              )}
            </div>
          )}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-8"
        >
          <div className="mb-10 pb-6 border-b border-border-light dark:border-border-dark">
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-1">
              Step 1 of 1
            </p>
            <h2 className="font-archivo text-2xl font-black uppercase text-text-light dark:text-text-dark">
              Your Information
            </h2>
          </div>
          {/* Name row */}
          <motion.div {...fadeUp(0.1)} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="firstName"
                className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
              >
                First Name{' '}
                <span aria-hidden="true" className="text-cta-light dark:text-cta-dark">
                  *
                </span>
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                autoComplete="given-name"
                value={form.firstName}
                onChange={handleChange}
                className={inputCls}
                aria-required="true"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="lastName"
                className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
              >
                Last Name{' '}
                <span aria-hidden="true" className="text-cta-light dark:text-cta-dark">
                  *
                </span>
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                autoComplete="family-name"
                value={form.lastName}
                onChange={handleChange}
                className={inputCls}
                aria-required="true"
              />
            </div>
          </motion.div>

          {/* Email */}
          <motion.div {...fadeUp(0.2)} className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
            >
              Email{' '}
              <span aria-hidden="true" className="text-cta-light dark:text-cta-dark">
                *
              </span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              className={inputCls}
              aria-required="true"
            />
          </motion.div>

          {/* Phone */}
          <motion.div {...fadeUp(0.3)} className="flex flex-col gap-1.5">
            <label
              htmlFor="phone"
              className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark"
            >
              Phone{' '}
              <span aria-hidden="true" className="text-cta-light dark:text-cta-dark">
                *
              </span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              value={formatPhone(form.phone)}
              onChange={handleChange}
              className={inputCls}
              aria-required="true"
            />
          </motion.div>

          {/* Toggles */}
          <motion.fieldset {...fadeUp(0.4)} className="flex flex-col gap-1">
            <legend className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-3">
              How would you like to help?{' '}
              <span className="text-muted-light/40 dark:text-muted-dark/40">(Select all that apply)</span>
            </legend>
            <Toggle
              id="mailingList"
              label="Join the mailing list"
              checked={form.mailingList}
              onChange={(v) => setForm((p) => ({ ...p, mailingList: v }))}
            />
            <Toggle
              id="yardSign"
              label="Put a sign in my yard"
              checked={form.yardSign}
              onChange={(v) => setForm((p) => ({ ...p, yardSign: v }))}
            />
            <Toggle
              id="doorKnocking"
              label="Join the door knocking crew"
              checked={form.doorKnocking}
              onChange={(v) => setForm((p) => ({ ...p, doorKnocking: v }))}
            />
          </motion.fieldset>

          {/* Error */}
          {error && (
            <p role="alert" className="font-inter text-sm text-red-500 dark:text-red-400">
              {error}
            </p>
          )}

          {/* Submit */}
          <motion.div {...fadeUp(0.5)}>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !form.firstName || !form.lastName || !form.email || !form.phone}
              aria-busy={loading}
              className="font-archivo w-full sm:w-auto px-10 py-4 text-sm font-bold uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark transition-opacity duration-200 disabled:opacity-40 disabled:cursor-not-allowed min-h-11 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Submitting...</span>
                  <span className="sr-only">Please wait</span>
                </>
              ) : (
                'Join the Team'
              )}
            </button>
          </motion.div>
        </motion.div>
      )}
    </Fragment>
  )
}
