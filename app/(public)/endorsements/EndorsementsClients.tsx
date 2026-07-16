'use client'

import { motion } from 'framer-motion'
import LiquidButton from '@/app/components/elements/LiquidButton'
import { PageField } from '@/types/page.types'
import { Endorsement } from '@/types/endorsement.types'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import Header from '@/app/components/public/layout/Header'
import PageHero from '@/app/components/public/layout/PageHero'
import { getField } from '@/app/lib/utils/page.utils'
import { PrimaryDateMarquee } from '@/app/components/public/sections/PrimaryDateMarquee'
import { EndorsementCard } from '@/app/components/public/EndorsementCard'
import { Cubes } from '@/app/components/geometric-backgrounds/Cubes'

export default function EndorsementsClient({
  endorsements,
  content
}: {
  endorsements: Endorsement[]
  content: PageField[]
}) {
  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      <Cubes />
      <Header />

      <main className="relative z-10 flex-1">
        {/* Hero */}
        <PageHero
          eyebrow={getField(content, 'endorsements_hero_eyebrow', '9th Essex District · Massachusetts')}
          title={getField(content, 'endorsements_hero_title', 'Our')}
          titleAccent={getField(content, 'endorsements_hero_title_accent', 'Endorsements')}
          description={getField(
            content,
            'endorsements_hero_description',
            'Leaders, neighbors, and organizations across the 9th Essex District standing with Zosia VanMeter.'
          )}
          showZosia={false}
          showPatriotic={true}
          image="zosia-16.png"
        />

        {/* Grid section */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-24">
          {/* Section header */}
          <motion.div {...fadeUp(0.1)} className="mb-12 pb-6 border-b border-border-light dark:border-border-dark">
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3">
              {getField(content, 'endorsements_grid_eyebrow', 'Standing With Zosia')}
            </p>
            <h2 className="font-archivo text-3xl sm:text-4xl md:text-5xl font-black uppercase text-text-light dark:text-text-dark leading-none">
              {getField(content, 'endorsements_grid_heading', 'People Who')}{' '}
              <span className="text-primary-light dark:text-primary-dark">
                {getField(content, 'endorsements_grid_heading_accent', 'Believe')}
              </span>
            </h2>
          </motion.div>

          {/* Empty state */}
          {endorsements.length === 0 ? (
            <motion.div {...fadeUp(0.2)} className="py-24 text-center">
              <p className="font-archivo text-2xl font-black uppercase text-muted-light dark:text-muted-dark">
                {getField(content, 'endorsements_empty_heading', 'Endorsements coming soon')}
              </p>
              <p className="font-inter text-sm text-muted-light/60 dark:text-muted-dark/60 mt-2">
                {getField(
                  content,
                  'endorsements_empty_body',
                  'Check back soon as community leaders join our campaign.'
                )}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {endorsements.map((endorsement, i) => (
                <EndorsementCard key={endorsement.id} endorsement={endorsement} index={i} />
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <div className="relative w-full overflow-hidden border-t border-border-light dark:border-border-dark">
          {/* Base bg */}
          <div aria-hidden="true" className="absolute inset-0 bg-bg-light dark:bg-bg-dark" />

          {/* Right side image — desktop only */}
          <div aria-hidden="true" className="absolute top-0 right-0 bottom-0 w-1/2 hidden sm:block">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/zosia-12.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom'
              }}
            />
            <div className="absolute inset-y-0 left-0 w-48 bg-linear-to-r from-bg-light dark:from-bg-dark to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-32 bg-linear-to-t from-bg-light dark:from-bg-dark to-transparent" />
            <div className="absolute inset-0 bg-primary-light/10 dark:bg-primary-dark/10 mix-blend-multiply" />

            <div className="absolute left-0 top-12 bottom-12 w-px bg-primary-light/30 dark:bg-primary-dark/30" />
            <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cta-light dark:border-cta-dark opacity-60" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary-light dark:border-primary-dark opacity-60" />
          </div>

          {/* Mobile image strip — shows at top on small screens */}
          <div aria-hidden="true" className="relative sm:hidden w-full h-48 overflow-hidden">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/zosia-12.webp')",
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
            <div className="absolute inset-0 bg-primary-light/10 dark:bg-primary-dark/10" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-linear-to-t from-bg-light dark:from-bg-dark to-transparent" />
            <div className="absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-cta-light dark:border-cta-dark opacity-60" />
            <div className="absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-primary-light dark:border-primary-dark opacity-60" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-10 sm:py-20 md:py-28">
            <motion.div {...fadeUp(0.1)} className="flex flex-col gap-6 sm:gap-8 sm:max-w-[55%]">
              <div className="flex flex-col gap-1 sm:gap-2">
                <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
                  {getField(content, 'endorsements_cta_eyebrow', 'Forward. Together.')}
                </p>
                <h2 className="font-archivo text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-black uppercase text-text-light dark:text-text-dark leading-none">
                  {getField(content, 'endorsements_cta_heading', 'Add Your')}
                </h2>
                <h2 className="font-archivo text-4xl xs:text-5xl sm:text-7xl md:text-8xl font-black uppercase text-primary-light dark:text-primary-dark leading-none">
                  {getField(content, 'endorsements_cta_heading_accent', 'Voice')}
                </h2>
              </div>

              <div aria-hidden="true" className="w-12 sm:w-16 h-0.5 bg-cta-light dark:bg-cta-dark" />

              <div className="flex flex-col gap-6">
                <p className="font-inter text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed">
                  {getField(
                    content,
                    'endorsements_cta_body',
                    'Want to publicly endorse Zosia? Reach out and let us know.'
                  )}
                </p>
                <LiquidButton
                  href="/contact"
                  label="Get in Touch →"
                  color="cta"
                  variant="filled"
                  className="w-full sm:w-auto"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <PrimaryDateMarquee />
    </div>
  )
}
