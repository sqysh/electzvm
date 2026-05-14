'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Loader2 } from 'lucide-react'
import { createVolunteerSubmission } from '@/app/lib/actions/volunteer-submission/createVolunteerSubmission'
import Toggle from '@/app/components/elements/Toggle'
import { FacebookIcon } from '@/app/components/icons/FacebookIcon'
import { InstagramIcon } from '@/app/components/icons/InstagramIcon'
import { LinkedInIcon } from '@/app/components/icons/LinkedInIcon'
import Picture from '@/app/components/elements/Picture'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { Diamonds } from '@/app/components/geometric-backgrounds/Diamonds'

export default function ContactPage() {
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

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  async function handleSubmit() {
    setError(null)
    setLoading(true)
    const result = await createVolunteerSubmission(form)
    setLoading(false)
    if (result.success) setSuccess(true)
    else setError(result.error ?? 'Something went wrong. Please try again.')
  }

  const inputCls =
    'w-full px-4 py-3 bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark text-sm font-inter text-text-light dark:text-text-dark placeholder:text-muted-light/50 dark:placeholder:text-muted-dark/50 outline-none focus:border-primary-light dark:focus:border-primary-dark transition-colors duration-200 min-h-[44px]'

  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      {/* ── Geometric background ──────────────────────────────────────────── */}
      <Diamonds />

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <Header />

      <main className="relative z-10 flex-1">
        {/* ── Hero strip ──────────────────────────────────────────────────── */}
        <PageHero
          eyebrow="Forward. Together"
          title="Join the"
          titleAccent="Team"
          description="Ready to make a difference in the 9th Essex District? Tell us how you'd like to help and we'll be in touch."
          image="zosia-3.webp"
        />

        {/* ── Body — form + aside ─────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
            {/* ── Form ────────────────────────────────────────────────────── */}
            <div className="flex flex-col gap-16">
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
                  <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                    We&apos;ve received your information and will be in touch soon. Together we move forward.
                  </p>
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
                      value={form.phone}
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

              {/* ── Election CTA ─────────────────────────────────────────── */}
              <motion.div
                {...fadeUp(0.6)}
                className="relative overflow-hidden border border-border-light dark:border-border-dark"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2">
                  {/* Zosia image */}
                  <div className="relative h-full flex items-end">
                    <Picture
                      src="/images/zosia-4.webp"
                      alt="Zosia VanMeter"
                      className="w-full h-full aspect-square object-cover scale-x-[-1]"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-surface-light dark:to-surface-dark hidden sm:block" />
                    <div className="absolute inset-0 bg-linear-to-t from-surface-light dark:from-surface-dark to-transparent sm:hidden" />
                  </div>

                  {/* Content */}
                  <div className="bg-surface-light dark:bg-surface-dark p-8 flex flex-col justify-center gap-5">
                    <div>
                      <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2">
                        Primary Election
                      </p>
                      <p className="font-archivo text-3xl font-black uppercase text-text-light dark:text-text-dark leading-none">
                        September 1<span className="text-cta-light dark:text-cta-dark">,</span>
                      </p>
                      <p className="font-archivo text-3xl font-black uppercase text-text-light dark:text-text-dark leading-none">
                        2026
                      </p>
                    </div>
                    <div aria-hidden="true" className="w-10 h-px bg-border-light dark:bg-border-dark" />
                    <p className="font-inter text-xs text-muted-light dark:text-muted-dark leading-relaxed">
                      Make sure you&apos;re registered to vote in Massachusetts before the August 12th deadline.
                    </p>
                    <a
                      href="https://www.sec.state.ma.us/ovr/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Register to vote in Massachusetts (opens in new tab)"
                      className="font-archivo px-6 py-3 text-xs font-bold uppercase tracking-widest text-white bg-secondary-light dark:bg-secondary-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light dark:focus-visible:outline-secondary-dark transition-opacity duration-200 min-h-11 flex items-center justify-center"
                    >
                      Register to Vote →
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ── Aside ───────────────────────────────────────────────────── */}
            <motion.aside
              {...fadeUp(0.3)}
              aria-label="Connect with Zosia"
              className="flex flex-col gap-6 lg:sticky lg:top-8"
            >
              {/* Quote */}
              <div className="border-l-2 border-primary-light dark:border-primary-dark pl-5 py-1">
                <blockquote className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed italic">
                  &quot;Community matters—it&apos;s not just where we live, but it&apos;s where we make memories and the
                  people we make them with.&quot;
                </blockquote>
                <p className="font-archivo text-[10px] tracking-[0.15em] uppercase text-primary-light dark:text-primary-dark mt-3">
                  — Zosia VanMeter
                </p>
              </div>

              <div aria-hidden="true" className="h-px bg-border-light dark:bg-border-dark" />

              {/* Social links */}
              <div className="flex flex-col gap-3">
                <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  Follow the Campaign
                </p>
                <a
                  href="https://www.facebook.com/realzvm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Zosia on Facebook (opens in new tab)"
                  className="flex items-center gap-3 text-sm font-inter text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-11"
                >
                  <FacebookIcon />
                  <span>@realzvm on Facebook</span>
                </a>
                <a
                  href="https://www.instagram.com/realzvm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Zosia on Instagram (opens in new tab)"
                  className="flex items-center gap-3 text-sm font-inter text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-11"
                >
                  <InstagramIcon />
                  <span>@realzvm on Instagram</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/realzvm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Follow Zosia on LinkedIn (opens in new tab)"
                  className="flex items-center gap-3 text-sm font-inter text-text-light dark:text-text-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-11"
                >
                  <LinkedInIcon />
                  <span>@zvm on LinkedIn</span>
                </a>
              </div>

              <div aria-hidden="true" className="h-px bg-border-light dark:bg-border-dark" />

              {/* Donate */}
              <div className="flex flex-col gap-3">
                <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                  Support the Campaign
                </p>
                <p className="font-inter text-xs text-muted-light dark:text-muted-dark leading-relaxed">
                  Every contribution helps us reach more voters across the 9th Essex District.
                </p>
                <a
                  href="https://secure.actblue.com/donate/zvmkickoff"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Donate to Zosia VanMeter's campaign (opens in new tab)"
                  className="font-archivo px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-white bg-cta-light dark:bg-cta-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cta-light dark:focus-visible:outline-cta-dark transition-opacity duration-200 min-h-11 flex items-center justify-center"
                >
                  Donate via ActBlue
                </a>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      <PrimaryDateMarquee />

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 h-12 flex items-center justify-between gap-4">
          <span className="font-archivo text-[10px] font-black uppercase tracking-widest text-text-light dark:text-text-dark">
            Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span>
          </span>
          <span className="font-inter text-[10px] text-muted-light dark:text-muted-dark text-right">
            Paid for by Zosia VanMeter for State Representative · 9th Essex District
          </span>
        </div>
      </footer>
    </div>
  )
}
