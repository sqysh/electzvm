'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Picture from '@/app/components/elements/Picture'
import LiquidButton from '@/app/components/elements/LiquidButton'
import type { News } from '@prisma/client'
import { fadeUp } from '../lib/constants/motion.constants'
import { Cubes } from './geometric-backgrounds/Cubes'

// ── Data ──────────────────────────────────────────────────────────────────────

const policies = [
  {
    number: '01',
    title: 'Affordable Housing',
    body: 'Every family in the 9th Essex District deserves a safe, stable home. Zosia supports expanding affordable housing, protecting renters, and holding developers accountable to community needs.',
    accent: 'text-primary-light dark:text-primary-dark',
    border: 'border-primary-light dark:border-primary-dark'
  },
  {
    number: '02',
    title: 'Public Safety',
    body: 'Safety means more than policing. It means well-lit streets, mental health resources, and communities where every neighbor looks out for one another.',
    accent: 'text-cta-light dark:text-cta-dark',
    border: 'border-cta-light dark:border-cta-dark'
  },
  {
    number: '03',
    title: 'Education & Youth',
    body: 'No child should worry about their next meal or fall behind because their school lacks resources. Zosia will fight for fully funded schools and expanded after-school programs.',
    accent: 'text-secondary-light dark:text-secondary-dark',
    border: 'border-secondary-light dark:border-secondary-dark'
  },
  {
    number: '04',
    title: 'Transparent Government',
    body: 'Government should speak plainly and act openly. Zosia commits to accessible town halls, clear communication, and decisions made with — not for — the community.',
    accent: 'text-primary-light dark:text-primary-dark',
    border: 'border-primary-light dark:border-primary-dark'
  }
]

const offsets = ['mt-0', 'mt-8 sm:mt-12', 'mt-16 sm:mt-24', 'mt-8 sm:mt-12']

// ── Policies ──────────────────────────────────────────────────────────────────

function PoliciesSection() {
  return (
    <section
      aria-labelledby="policies-heading"
      className="relative w-full bg-bg-light dark:bg-bg-dark py-20 sm:py-28 overflow-hidden"
    >
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 sm:mb-24"
        >
          <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3">
            Platform
          </p>
          <h2
            id="policies-heading"
            className="font-archivo text-3xl sm:text-4xl md:text-5xl font-black uppercase text-text-light dark:text-text-dark leading-none"
          >
            What Zosia <span className="text-primary-light dark:text-primary-dark">Stands For</span>
          </h2>
        </motion.div>

        {/* Staggered cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 items-start">
          {policies.map((policy, i) => (
            <motion.div
              key={policy.number}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative flex flex-col gap-5 p-6 sm:p-8 border-t-2 bg-surface-light dark:bg-surface-dark hover:bg-surface-alt-light dark:hover:bg-surface-alt-dark transition-colors duration-300 ${policy.border} ${offsets[i]}`}
            >
              {/* Number */}
              <span
                className={`font-archivo text-6xl sm:text-7xl font-black leading-none select-none transition-colors duration-300 ${policy.accent}`}
              >
                {policy.number}
              </span>

              {/* Title */}
              <h3 className="font-archivo text-base sm:text-lg font-black uppercase text-text-light dark:text-text-dark leading-tight">
                {policy.title}
              </h3>

              {/* Divider */}
              <div aria-hidden="true" className={`w-8 h-px ${policy.border} border-t`} />

              {/* Body */}
              <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">{policy.body}</p>

              {/* Bottom accent line that grows on hover */}
              <div
                aria-hidden="true"
                className={`absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500 ease-in-out ${policy.accent} bg-current`}
              />
            </motion.div>
          ))}
        </div>

        {/* Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 sm:mt-20"
        >
          <Link
            href="/platform"
            className="font-archivo text-[10px] tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            Read the Full Platform →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

// ── About ─────────────────────────────────────────────────────────────────────

const stats = [
  { value: '10+', label: 'Years Serving' },
  { value: '500+', label: 'Families Served' },
  { value: '3', label: 'Nonprofits Led' },
  { value: '9th', label: 'Essex District' }
]

export function AboutSection() {
  return (
    <section aria-labelledby="about-heading" className="relative w-full overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-140">
        {/* ── Left — content ─────────────────────────────────────────── */}
        <div className="relative bg-hero-light dark:bg-hero-dark flex flex-col justify-center px-8 sm:px-12 md:px-16 py-16 sm:py-20">
          {/* Subtle patriotic bg */}
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "url('/images/patriotic-1.png')",
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />

          <div className="relative z-10 max-w-lg">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
            >
              About Zosia
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              id="about-heading"
              className="font-archivo text-3xl sm:text-4xl font-black uppercase text-white leading-none mb-6"
            >
              A Leader From <span className="text-cta-dark">This Community</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-inter text-sm text-white/60 leading-relaxed mb-10"
            >
              Zosia VanMeter is a mother, wife, immigrant, and public servant who grew up on the North Shore. For over a
              decade she has worked with nonprofits and community groups to make the 9th Essex District safer, stronger,
              and more connected.
            </motion.p>

            {/* Stat callouts */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-px bg-white/10 border border-white/10 mb-10"
            >
              {stats.map((stat, i) => (
                <div key={stat.value} className="flex flex-col gap-1 px-4 py-5 bg-hero-light dark:bg-hero-dark">
                  <span
                    className={`font-archivo text-3xl sm:text-4xl font-black leading-none ${i % 2 === 0 ? 'text-primary-dark' : 'text-cta-dark'}`}
                  >
                    {stat.value}
                  </span>
                  <span className="font-archivo text-[9px] tracking-[0.15em] uppercase text-white/40">
                    {stat.label}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <LiquidButton href="/meet-zosia" label="Meet Zosia →" color="primary" />
            </motion.div>
          </div>
        </div>

        {/* ── Right — image ───────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-100 lg:min-h-0 overflow-hidden"
        >
          <Picture
            src="/images/zosia-8.webp"
            alt="Zosia VanMeter"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
          {/* Left fade into content panel */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-linear-to-r from-hero-light dark:from-hero-dark via-transparent to-transparent lg:w-1/3"
          />
          {/* Bottom fade on mobile */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-bg-light dark:from-bg-dark to-transparent lg:hidden"
          />
        </motion.div>
      </div>
    </section>
  )
}

// ── News ──────────────────────────────────────────────────────────────────────

function NewsSection({ news }: { news: News[] }) {
  const articles = news.filter((n) => n.isPublished).slice(0, 3)

  return (
    <section aria-labelledby="news-heading" className="w-full bg-bg-light dark:bg-bg-dark py-20 sm:py-40">
      <Cubes />
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16">
        <div className="flex items-end justify-between mb-12 gap-4">
          <motion.div {...fadeUp(0.1)}>
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3">
              Latest
            </p>
            <h2
              id="news-heading"
              className="font-archivo text-3xl sm:text-4xl md:text-5xl font-black uppercase text-text-light dark:text-text-dark leading-none"
            >
              Campaign <span className="text-primary-light dark:text-primary-dark">News</span>
            </h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <Link
              href="/news"
              className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
            >
              All News →
            </Link>
          </motion.div>
        </div>

        {articles.length === 0 ? (
          /* Placeholder cards */
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                {...fadeUp(0.1 + i * 0.08)}
                className="border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark p-6 flex flex-col gap-3"
              >
                <div className="h-2 w-16 bg-border-light dark:bg-border-dark" />
                <div className="h-4 w-3/4 bg-border-light dark:bg-border-dark" />
                <div className="h-3 w-full bg-border-light dark:bg-border-dark" />
                <div className="h-3 w-2/3 bg-border-light dark:bg-border-dark" />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {articles.map((article, i) => (
              <motion.article
                key={article.id}
                {...fadeUp(0.1 + i * 0.08)}
                className="group border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-200 flex flex-col"
              >
                {article.imageUrl && (
                  <div className="overflow-hidden border-b border-border-light dark:border-border-dark">
                    <Picture
                      src={article.imageUrl}
                      alt={article.title}
                      width={600}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1 gap-3 p-6">
                  <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <h3 className="font-archivo text-base font-black uppercase text-text-light dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors leading-tight">
                    {article.title}
                  </h3>
                  {article.excerpt && (
                    <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed line-clamp-2">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="mt-auto pt-4 border-t border-border-light dark:border-border-dark">
                    <Link
                      href={`/news/${article.id}`}
                      rel={article.externalLink ? 'noopener noreferrer' : undefined}
                      className="font-archivo text-[10px] tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
                    >
                      Read More →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

// ── Register + Donate ─────────────────────────────────────────────────────────

function RegisterDonateSection() {
  return (
    <section aria-label="Register to vote and donate" className="relative w-full overflow-hidden">
      {/* Full bleed dark bg */}
      <div className="absolute inset-0 bg-hero-light dark:bg-hero-dark z-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/patriotic-1.png')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 0.08
        }}
      />

      {/* Top diagonal clip */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-10 bg-bg-light dark:bg-bg-dark z-1"
        style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-24 sm:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Register */}
          <motion.div {...fadeUp(0.1)} className="flex flex-col gap-6">
            <div>
              <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3">
                Primary · September 1, 2026
              </p>
              <h2 className="font-archivo text-3xl sm:text-4xl font-black uppercase text-white leading-none mb-4">
                Register <span className="text-secondary-light dark:text-secondary-dark">to Vote</span>
              </h2>
              <p className="font-inter text-sm text-white/60 leading-relaxed max-w-sm">
                Make sure you&apos;re registered before the August 12th deadline. It only takes a few minutes and your
                vote makes all the difference in the 9th Essex District.
              </p>
            </div>
            <div aria-hidden="true" className="w-12 h-px bg-white/20" />
            <LiquidButton
              href="https://www.sec.state.ma.us/ovr/"
              label="Register Now →"
              color="secondary"
              external
              ariaLabel="Register to vote in Massachusetts (opens in new tab)"
            />
          </motion.div>

          {/* Divider */}
          <div aria-hidden="true" className="hidden lg:block absolute left-1/2 top-24 bottom-24 w-px bg-white/10" />

          {/* Donate */}
          <motion.div {...fadeUp(0.2)} className="flex flex-col gap-6">
            <div>
              <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-cta-light dark:text-cta-dark mb-3">
                Support the Campaign
              </p>
              <h2 className="font-archivo text-3xl sm:text-4xl font-black uppercase text-white leading-none mb-4">
                Help Us <span className="text-cta-dark">Win</span>
              </h2>
              <p className="font-inter text-sm text-white/60 leading-relaxed max-w-sm">
                Every contribution — big or small — helps us reach more voters, knock more doors, and build a stronger
                campaign across the district.
              </p>
            </div>
            <div aria-hidden="true" className="w-12 h-px bg-white/20" />
            <LiquidButton
              href="https://secure.actblue.com/donate/zvmkickoff"
              label="Donate via ActBlue →"
              color="cta"
              external
              ariaLabel="Donate to Zosia VanMeter's campaign (opens in new tab)"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// ── HomePageSections ──────────────────────────────────────────────────────────

export default function HomePageSections({ news }: { news: News[] }) {
  return (
    <>
      <PoliciesSection />
      <AboutSection />
      <NewsSection news={news} />
      <RegisterDonateSection />
    </>
  )
}
