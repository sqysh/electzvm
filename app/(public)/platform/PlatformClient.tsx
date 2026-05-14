'use client'

import { motion } from 'framer-motion'
import LiquidButton from '@/app/components/elements/LiquidButton'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { Diamonds } from '@/app/components/geometric-backgrounds/Diamonds'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'

// ── Platform pillars ──────────────────────────────────────────────────────────

const pillars = [
  {
    number: '01',
    title: 'Public Safety',
    accent: 'text-primary-light dark:text-primary-dark',
    border: 'border-primary-light dark:border-primary-dark',
    body: 'The safety and wellbeing of 9th Essex residents is of the utmost importance. This includes seeking solutions to prevent crime, improve public health, and address environmental dangers — such as the WIN Waste landfill, flooding risks, and air and water quality.'
  },
  {
    number: '02',
    title: 'Affordability',
    accent: 'text-cta-light dark:text-cta-dark',
    border: 'border-cta-light dark:border-cta-dark',
    body: 'Affordability is an issue touching every household across the district — from housing to food and healthcare costs. Zosia will bring innovative ideas about how to combine community-driven initiatives with available government resources to create a realistic and sustainable plan.'
  },
  {
    number: '03',
    title: 'Transparency & Accountability',
    accent: 'text-secondary-light dark:text-secondary-dark',
    border: 'border-secondary-light dark:border-secondary-dark',
    body: 'Massachusetts residents should readily have access to information about decisions that will affect them and their communities. Government language should be written in plain language so everyone understands policies and legislation — improving transparency is pro-democracy and will empower constituents to hold their elected officials accountable.'
  }
]

// ── PlatformClient ────────────────────────────────────────────────────────────

export default function PlatformClient() {
  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      {/* ── Geometric background ─────────────────────────────────────────── */}
      <Diamonds />

      <Header />

      <PageHero
        eyebrow="9th Essex District · Massachusetts"
        title="The"
        titleAccent="Platform"
        description="Real solutions for real people. Affordable housing, public safety, and transparent government — built with the community, not for it."
        showZosia
        showPatriotic={false}
        image="zosia-10.webp"
        isFullHeight
      />

      <main className="relative z-10 flex-1">
        {/* ── Opening quote — full bleed ────────────────────────────────── */}
        <div className="w-full bg-hero-light dark:bg-hero-dark relative overflow-hidden py-20 sm:py-28">
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage: "url('/images/patriotic-1.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center top'
            }}
          />
          <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 md:px-16 text-center flex flex-col items-center gap-6">
            <motion.p
              {...fadeUp(0.1)}
              className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark"
            >
              Platform · 9th Essex District
            </motion.p>
            <motion.blockquote {...fadeUp(0.15)}>
              <p className="font-archivo text-2xl sm:text-3xl md:text-4xl font-black uppercase text-white leading-tight">
                &quot;I&apos;m not a politician — I&apos;m a <span className="text-cta-dark">community leader</span> who
                wants to reshape politics.&quot;
              </p>
            </motion.blockquote>
            <motion.p
              {...fadeUp(0.25)}
              className="font-inter text-sm sm:text-base text-white/60 leading-relaxed max-w-2xl"
            >
              Our community needs leaders who will create infrastructure its residents can thrive within — this includes
              affordable housing, prioritizing public safety, and having transparency and accountability in local and
              state government. With years of experience in government administration and community organizing, Zosia is
              committed to workshopping solutions, navigating the legislature, and getting tangible results that keep us
              moving forward together.
            </motion.p>
          </div>
        </div>

        {/* ── Pillars ───────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-24">
          <motion.div {...fadeUp(0.1)} className="mb-12 pb-6 border-b border-border-light dark:border-border-dark">
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark mb-2">
              The Road Ahead
            </p>
            <h2 className="font-archivo text-3xl sm:text-4xl font-black uppercase text-text-light dark:text-text-dark leading-none">
              Three <span className="text-primary-light dark:text-primary-dark">Priorities</span>
            </h2>
          </motion.div>

          <div className="flex flex-col gap-0 divide-y divide-border-light dark:divide-border-dark">
            {pillars.map((pillar, i) => (
              <motion.div
                key={pillar.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-6 md:gap-12 py-10 sm:py-14 group"
              >
                {/* Number */}
                <div className="flex md:flex-col md:items-start items-center gap-4 md:gap-2 md:pt-1">
                  <span
                    className={`font-archivo text-6xl sm:text-7xl font-black leading-none select-none ${pillar.accent}`}
                  >
                    {pillar.number}
                  </span>
                  <div aria-hidden="true" className={`hidden md:block w-8 h-0.5 border-t-2 mt-2 ${pillar.border}`} />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4">
                  <h3
                    className={`font-archivo text-2xl sm:text-3xl font-black uppercase leading-none ${pillar.accent}`}
                  >
                    {pillar.title}
                  </h3>
                  <p className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed max-w-2xl">
                    {pillar.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <div className="w-full bg-hero-light dark:bg-hero-dark border-t border-white/10">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
              Forward. Together.
            </p>
            <h2 className="font-archivo text-3xl sm:text-4xl font-black uppercase text-white leading-none">
              Ready to Make a <span className="text-cta-dark">Difference?</span>
            </h2>
          </div>
          <LiquidButton href="/contact" label="Join the Team →" color="primary" variant="filled" className="shrink-0" />
        </div>
      </div>

      <PrimaryDateMarquee />

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
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
      </footer>
    </div>
  )
}
