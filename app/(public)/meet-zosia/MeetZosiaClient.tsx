'use client'

import { motion } from 'framer-motion'
import Picture from '@/app/components/elements/Picture'
import PageHero from '@/app/components/PageHero'
import { Cubes } from '@/app/components/geometric-backgrounds/Cubes'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import Header from '@/app/components/Header'
import { StatsBar } from '@/app/components/StatsBar'
import LiquidButton from '@/app/components/elements/LiquidButton'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'

export function MeetZosiaClient() {
  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      {/* ── Geometric background ─────────────────────────────────────────── */}
      <Cubes />

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <Header />

      <main className="relative z-10 flex-1">
        {/* ── Hero ─────────────────────────────────────────────────────── */}
        <PageHero
          eyebrow="Leadership and communication, every step of the way"
          title="Meet"
          titleAccent="Zosia"
          description="Mother. Wife. Immigrant. Public servant. Community leader."
          image="zosia-7.webp"
          showPatriotic={false}
          isFullHeight={true}
        />

        {/* ── Stats bar ────────────────────────────────────────────────── */}
        <StatsBar />

        {/* ── Bio section ──────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
            {/* ── Body copy ──────────────────────────────────────────── */}
            <div className="flex flex-col gap-8">
              {/* Intro header */}
              <motion.div {...fadeUp(0.1)} className="pb-6 border-b border-border-light dark:border-border-dark">
                <h2 className="font-archivo text-2xl sm:text-3xl font-black uppercase text-text-light dark:text-text-dark leading-tight">
                  My <span className="text-primary-light dark:text-primary-dark">Story</span>
                </h2>
              </motion.div>

              {/* Paragraph 1 */}
              <motion.p
                {...fadeUp(0.15)}
                className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed"
              >
                My name is Zosia VanMeter. I am a mother, a wife, an immigrant, and a public servant. I grew up on the
                North Shore in a poor family. We were dependent upon the generosity of neighbors and charities at the
                start of every school year, needed oil assistance every winter, and my summers were spent at my
                mother&apos;s hair salon rather than on playdates or camping trips.
              </motion.p>

              {/* Pull quote */}
              <motion.blockquote
                {...fadeUp(0.2)}
                className="border-l-2 border-cta-light dark:border-cta-dark pl-5 py-1"
              >
                <p className="font-archivo text-lg sm:text-xl font-bold uppercase text-text-light dark:text-text-dark leading-snug">
                  &quot;I saw the struggles of a single mother, up close and personal, doing her best to hold her family
                  together with scarred hands and tired eyes.&quot;
                </p>
              </motion.blockquote>

              {/* Paragraph 2 */}
              <motion.p
                {...fadeUp(0.25)}
                className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed"
              >
                For my entire young childhood, I saw the struggles of a single mother, up close and personal, doing her
                best to hold her family together with scarred hands and tired eyes; and when my daughter reached school
                age, I knew I wanted a better childhood for her and children like her.
              </motion.p>

              {/* Divider */}
              <motion.div {...fadeUp(0.3)} aria-hidden="true" className="h-px bg-border-light dark:bg-border-dark" />

              {/* Paragraph 3 */}
              <motion.p
                {...fadeUp(0.35)}
                className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed"
              >
                And that&apos;s why community matters—it&apos;s not just where we live, but it&apos;s where we make
                memories and the people we make them with. It&apos;s where we should feel safe and supported so that no
                child worries about their next meal and no adult feels like an island.
              </motion.p>

              {/* Paragraph 4 */}
              <motion.p
                {...fadeUp(0.4)}
                className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed"
              >
                I have spent the past decade working with nonprofits and other groups in the North Shore area to make
                that vision a reality — from bringing safe, fun community events for families to enjoy; to providing
                winter jackets to those with the most need; to delivering meals to home-bound seniors; to running
                confidence-building workshops for women in recovery; and so much more, which you can read about{' '}
                <a
                  href="https://docs.google.com/document/d/1vDxIE3gUGUETjXMrragrxjNIg7vL1PPwu9MusMih-cc/edit?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Read more about Zosia's community work (opens in new tab)"
                  className="text-primary-light dark:text-primary-dark underline underline-offset-2 hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                >
                  here
                </a>
                .
              </motion.p>

              {/* Paragraph 5 */}
              <motion.p
                {...fadeUp(0.45)}
                className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed"
              >
                I want to continue that work with you and make this vision a reality in a substantial and systematic
                way, to continue to understand and deliver to the people. What does a strong community look like to you?
                What does a safe community feel like to you?
              </motion.p>

              {/* Contact line */}
              <motion.div {...fadeUp(0.5)} className="flex flex-col gap-3 pt-2">
                <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                  Drop me an email at{' '}
                  <a
                    href="mailto:hello@electzvm.com"
                    className="text-primary-light dark:text-primary-dark underline underline-offset-2 hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                  >
                    hello@electzvm.com
                  </a>{' '}
                  or chat with me the next time you see me out in the community…
                </p>
                <p className="font-archivo text-sm font-bold uppercase tracking-widest text-text-light dark:text-text-dark">
                  And next year, with your vote, we can make a difference…{' '}
                  <span className="text-cta-light dark:text-cta-dark">together.</span>
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div {...fadeUp(0.55)} className="flex flex-wrap gap-3 sm:gap-4 pt-2">
                <LiquidButton href="/contact" label="Join the Team" color="primary" variant="filled" />
                <LiquidButton
                  href="https://secure.actblue.com/donate/zvmkickoff"
                  label="Donate"
                  color="cta"
                  variant="filled"
                  external
                  ariaLabel="Donate (opens in new tab)"
                />
              </motion.div>
            </div>

            {/* ── Aside — photo + quick facts ──────────────────────────── */}
            <motion.aside
              {...fadeUp(0.2)}
              aria-label="About Zosia VanMeter"
              className="flex flex-col gap-6 lg:sticky lg:top-8"
            >
              {/* Photo */}
              <div className="overflow-hidden border border-border-light dark:border-border-dark">
                <Picture
                  src="/images/zosia-3.webp"
                  alt="Zosia VanMeter"
                  width={600}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>

              {/* Quick facts */}
              <div className="border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                <div className="px-5 py-3 border-b border-border-light dark:border-border-dark">
                  <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                    Quick Facts
                  </p>
                </div>
                <div className="divide-y divide-border-light dark:divide-border-dark">
                  {[
                    { label: 'District', value: '9th Essex' },
                    { label: 'Primary', value: 'September 1, 2026' },
                    { label: 'Reg. Deadline', value: 'August 12, 2026' },
                    { label: 'Email', value: 'hello@electzvm.com', href: 'mailto:hello@electzvm.com' },
                    { label: 'Social', value: '@realzvm', href: 'https://www.instagram.com/realzvm' }
                  ].map((fact) => (
                    <div key={fact.label} className="flex items-start justify-between gap-4 px-5 py-3">
                      <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark shrink-0">
                        {fact.label}
                      </span>
                      {fact.href ? (
                        <a
                          href={fact.href}
                          target={fact.href.startsWith('http') ? '_blank' : undefined}
                          rel={fact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="font-inter text-xs text-primary-light dark:text-primary-dark hover:opacity-80 transition-opacity text-right focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                        >
                          {fact.value}
                        </a>
                      ) : (
                        <span className="font-inter text-xs text-text-light dark:text-text-dark text-right">
                          {fact.value}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      <PrimaryDateMarquee />

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-border-light dark:border-border-dark">
        {/* Register to vote stripe */}
        <div className="w-full bg-secondary-light dark:bg-secondary-dark/20 border-b border-secondary-light/30 dark:border-secondary-dark/30 px-5 sm:px-8 md:px-16 h-10 flex items-center justify-center">
          <a
            href="https://www.sec.state.ma.us/ovr/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Register to vote in Massachusetts (opens in new tab)"
            className="font-archivo text-[10px] tracking-[0.2em] uppercase text-white dark:text-secondary-dark font-bold hover:opacity-80 transition-opacity duration-200 flex items-center gap-2"
          >
            <span>Primary · September 1, 2026</span>
            <span className="opacity-40">·</span>
            <span>Register to Vote →</span>
          </a>
        </div>

        {/* Bottom bar */}
        <div className="bg-surface-light dark:bg-surface-dark">
          <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 h-12 flex items-center justify-between gap-4">
            <span className="font-archivo text-[10px] font-black uppercase tracking-widest text-text-light dark:text-text-dark">
              Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span>
            </span>

            <a
              href="https://sqysh.io"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Built by Sqysh (opens in new tab)"
              className="font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-200"
            >
              Built by <span className="text-primary-light dark:text-primary-dark">Sqysh</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
