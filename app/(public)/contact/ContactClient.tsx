'use client'

import { motion } from 'framer-motion'
import { FacebookIcon } from '@/app/components/icons/FacebookIcon'
import { InstagramIcon } from '@/app/components/icons/InstagramIcon'
import { LinkedInIcon } from '@/app/components/icons/LinkedInIcon'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { Diamonds } from '@/app/components/geometric-backgrounds/Diamonds'
import { VolunteerSubmissionForm } from '@/app/components/forms/VolunteerSubmissionForm'
import Picture from '@/app/components/elements/Picture'

export default function ContactPage() {
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
            <div className="flex flex-col gap-16">
              {/* ── Form ────────────────────────────────────────────────────── */}
              <VolunteerSubmissionForm />

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
