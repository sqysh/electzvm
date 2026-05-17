'use client'

import LiquidButton from '@/app/components/elements/LiquidButton'
import Picture from '@/app/components/elements/Picture'
import { Cubes } from '@/app/components/geometric-backgrounds/Cubes'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'
import { StatsBar } from '@/app/components/StatsBar'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { getField } from '@/app/lib/utils/page.utils'
import { PageField } from '@/types/page.types'
import { motion } from 'framer-motion'

export function MeetZosiaClient({ content }: { content: PageField[] }) {
  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      <Cubes />
      <Header />

      <main className="relative z-10 flex-1">
        <PageHero
          eyebrow={getField(content, 'meet_hero_eyebrow', 'Leadership and communication, every step of the way')}
          title={getField(content, 'meet_hero_title', 'Meet')}
          titleAccent={getField(content, 'meet_hero_title_accent', 'Zosia')}
          description={getField(
            content,
            'meet_hero_description',
            'Mother. Wife. Immigrant. Public servant. Community leader.'
          )}
          image="zosia-14.png"
        />

        <StatsBar />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16 items-start">
            {/* Body copy */}
            <div className="flex flex-col gap-8">
              <motion.div {...fadeUp(0.1)} className="pb-6 border-b border-border-light dark:border-border-dark">
                <h2 className="font-archivo text-2xl sm:text-3xl font-black uppercase text-text-light dark:text-text-dark leading-tight">
                  {getField(content, 'meet_bio_heading', 'My')}{' '}
                  <span className="text-primary-light dark:text-primary-dark">
                    {getField(content, 'meet_bio_heading_accent', 'Story')}
                  </span>
                </h2>
              </motion.div>

              <motion.p
                {...fadeUp(0.15)}
                className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed"
              >
                {getField(content, 'meet_bio_paragraph_1')}
              </motion.p>

              <motion.blockquote
                {...fadeUp(0.2)}
                className="border-l-2 border-cta-light dark:border-cta-dark pl-5 py-1"
              >
                <p className="font-archivo text-lg sm:text-xl font-bold uppercase text-text-light dark:text-text-dark leading-snug">
                  {getField(content, 'meet_bio_pull_quote')}
                </p>
              </motion.blockquote>

              <motion.p
                {...fadeUp(0.25)}
                className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed"
              >
                {getField(content, 'meet_bio_paragraph_2')}
              </motion.p>

              <motion.div {...fadeUp(0.3)} aria-hidden="true" className="h-px bg-border-light dark:bg-border-dark" />

              <motion.p
                {...fadeUp(0.35)}
                className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed"
              >
                {getField(content, 'meet_bio_paragraph_3')}
              </motion.p>

              <motion.p
                {...fadeUp(0.4)}
                className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed"
              >
                {getField(content, 'meet_bio_paragraph_4')}{' '}
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

              <motion.p
                {...fadeUp(0.45)}
                className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed"
              >
                {getField(content, 'meet_bio_paragraph_5')}
              </motion.p>

              <motion.div {...fadeUp(0.5)} className="flex flex-col gap-3 pt-2">
                <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                  {getField(content, 'meet_bio_contact_line')}
                </p>
                <p className="font-archivo text-sm font-bold uppercase tracking-widest text-text-light dark:text-text-dark">
                  {getField(content, 'meet_bio_closing_line')}
                </p>
              </motion.div>

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

            {/* Aside */}
            <motion.aside
              {...fadeUp(0.2)}
              aria-label="About Zosia VanMeter"
              className="flex flex-col gap-6 lg:sticky lg:top-8"
            >
              <div className="overflow-hidden border border-border-light dark:border-border-dark">
                <Picture
                  src="/images/zosia-5.webp"
                  alt="Zosia VanMeter"
                  width={600}
                  className="w-full h-auto object-cover aspect-square"
                />
              </div>
              <div className="border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
                <div className="px-5 py-3 border-b border-border-light dark:border-border-dark">
                  <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                    Quick Facts
                  </p>
                </div>
                <div className="divide-y divide-border-light dark:divide-border-dark">
                  {[
                    { label: 'District', value: getField(content, 'meet_fact_district', '9th Essex') },
                    { label: 'Primary', value: getField(content, 'meet_fact_primary', 'September 1, 2026') },
                    { label: 'Reg. Deadline', value: getField(content, 'meet_fact_reg_deadline', 'August 12, 2026') },
                    {
                      label: 'Email',
                      value: getField(content, 'meet_fact_email', 'hello@electzvm.com'),
                      href: `mailto:${getField(content, 'meet_fact_email', 'hello@electzvm.com')}`
                    },
                    {
                      label: 'Social',
                      value: getField(content, 'meet_fact_social', '@realzvm'),
                      href: 'https://www.instagram.com/realzvm'
                    }
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
    </div>
  )
}
