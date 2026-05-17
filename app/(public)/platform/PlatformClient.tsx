'use client'

import { motion } from 'framer-motion'
import LiquidButton from '@/app/components/elements/LiquidButton'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { Diamonds } from '@/app/components/geometric-backgrounds/Diamonds'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'
import { PageField } from '@/types/page.types'
import { getField } from '@/app/lib/utils/page.utils'

const pillarStyles = [
  {
    number: '01',
    accent: 'text-primary-light dark:text-primary-dark',
    border: 'border-primary-light dark:border-primary-dark'
  },
  { number: '02', accent: 'text-cta-light dark:text-cta-dark', border: 'border-cta-light dark:border-cta-dark' },
  {
    number: '03',
    accent: 'text-secondary-light dark:text-secondary-dark',
    border: 'border-secondary-light dark:border-secondary-dark'
  }
]

export default function PlatformClient({ content }: { content: PageField[] }) {
  const pillars = [
    {
      title: getField(content, 'platform_pillar_1_title', 'Public Safety'),
      body: getField(content, 'platform_pillar_1_body')
    },
    {
      title: getField(content, 'platform_pillar_2_title', 'Affordability'),
      body: getField(content, 'platform_pillar_2_body')
    },
    {
      title: getField(content, 'platform_pillar_3_title', 'Transparency & Accountability'),
      body: getField(content, 'platform_pillar_3_body')
    }
  ]

  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      <Diamonds />
      <Header />

      <main className="relative z-10 flex-1">
        <PageHero
          eyebrow={getField(content, 'platform_hero_eyebrow', '9th Essex District · Massachusetts')}
          title={getField(content, 'platform_hero_title', 'The')}
          titleAccent={getField(content, 'platform_hero_title_accent', 'Platform')}
          description={getField(content, 'platform_hero_description', 'Real solutions for real people.')}
          image="zosia-19.png"
        />

        <div className="w-full relative overflow-hidden py-20 sm:py-28 bg-bg-light dark:bg-bg-dark">
          {/* Left accent bar */}
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-primary-light dark:via-primary-dark to-transparent opacity-40"
          />
          {/* Right accent bar */}
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-1 bg-linear-to-b from-transparent via-cta-light dark:via-cta-dark to-transparent opacity-40"
          />

          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 md:px-16 flex flex-col items-start gap-8">
            {/* Eyebrow */}
            <motion.div {...fadeUp(0.1)} className="flex items-center gap-3">
              <div aria-hidden="true" className="w-8 h-px bg-secondary-light dark:bg-secondary-dark" />
              <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
                {getField(content, 'platform_quote_eyebrow', 'Platform · 9th Essex District')}
              </p>
            </motion.div>

            {/* Quote */}
            <motion.blockquote
              {...fadeUp(0.15)}
              className="border-l-2 border-primary-light dark:border-primary-dark pl-6 sm:pl-8"
            >
              <p className="font-archivo text-2xl sm:text-3xl md:text-4xl font-black uppercase text-text-light dark:text-text-dark leading-tight">
                {getField(content, 'platform_quote_text')}
              </p>
            </motion.blockquote>

            {/* Body */}
            <motion.p
              {...fadeUp(0.25)}
              className="font-inter text-sm sm:text-base text-muted-light dark:text-muted-dark leading-relaxed max-w-2xl pl-6 sm:pl-8 border-l border-border-light dark:border-border-dark"
            >
              {getField(content, 'platform_quote_body')}
            </motion.p>
          </div>
        </div>

        {/* Pillars */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-24">
          <motion.div {...fadeUp(0.1)} className="mb-12 pb-6 border-b border-border-light dark:border-border-dark">
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2">
              {getField(content, 'platform_pillars_eyebrow', 'The Road Ahead')}
            </p>
            <h2 className="font-archivo text-3xl sm:text-4xl font-black uppercase text-text-light dark:text-text-dark leading-none">
              {getField(content, 'platform_pillars_heading', 'Three')}{' '}
              <span className="text-primary-light dark:text-primary-dark">
                {getField(content, 'platform_pillars_heading_accent', 'Priorities')}
              </span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0 divide-y divide-border-light dark:divide-border-dark">
            {pillars.map((pillar, i) => {
              const style = pillarStyles[i]
              return (
                <motion.div
                  key={style.number}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12 py-10 sm:py-14 group"
                >
                  <div className="flex md:flex-col md:items-start items-center gap-4 md:gap-2 md:pt-1">
                    <span
                      className={`font-archivo text-6xl sm:text-7xl font-black leading-none select-none ${style.accent}`}
                    >
                      {style.number}
                    </span>
                    <div aria-hidden="true" className={`hidden md:block w-8 h-0.5 border-t-2 mt-2 ${style.border}`} />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3
                      className={`font-archivo text-2xl sm:text-3xl font-black uppercase leading-none ${style.accent}`}
                    >
                      {pillar.title}
                    </h3>
                    <p className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed max-w-2xl">
                      {pillar.body}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </main>

      {/* CTA */}
      <div className="w-full bg-hero-light dark:bg-hero-dark border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
              {getField(content, 'platform_cta_eyebrow', 'Forward. Together.')}
            </p>
            <h2 className="font-archivo text-3xl sm:text-4xl font-black uppercase text-white leading-none">
              {getField(content, 'platform_cta_heading', 'Ready to Make a')}{' '}
              <span className="text-cta-dark">{getField(content, 'platform_cta_heading_accent', 'Difference?')}</span>
            </h2>
          </div>
          <LiquidButton href="/contact" label="Join the Team →" color="primary" variant="filled" className="shrink-0" />
        </div>
      </div>

      <PrimaryDateMarquee />
    </div>
  )
}
