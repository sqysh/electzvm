'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Picture from '@/app/components/elements/Picture'
import type { News } from '@prisma/client'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { fadeUp } from '@/app/lib/constants/motion.constants'

// ── News card ─────────────────────────────────────────────────────────────────

function NewsCard({ article, index }: { article: News; index: number }) {
  const isExternal = !!article.externalLink
  const href = isExternal ? article.externalLink! : `/news/${article.id}`

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.5), ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-200"
    >
      {/* Image */}
      {article.imageUrl && (
        <div className="overflow-hidden border-b border-border-light dark:border-border-dark">
          <Picture
            src={article.imageUrl}
            alt={article.title}
            width={800}
            className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 will-change-transform"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col flex-1 gap-3 p-5 sm:p-6">
        {/* Date */}
        <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
          {new Date(article.createdAt).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })}
        </p>

        {/* Title */}
        <h2 className="font-archivo text-lg sm:text-xl font-black uppercase leading-tight text-text-light dark:text-text-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors duration-200">
          {article.title}
        </h2>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed line-clamp-3">
            {article.excerpt}
          </p>
        )}

        {/* Divider */}
        <div aria-hidden="true" className="mt-auto pt-4 border-t border-border-light dark:border-border-dark" />

        {/* CTA */}
        <Link
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          aria-label={`${isExternal ? 'Read external article' : 'Read more about'}: ${article.title}${isExternal ? ' (opens in new tab)' : ''}`}
          className="font-archivo text-[10px] tracking-[0.2em] uppercase text-primary-light dark:text-primary-dark hover:text-primary-dark dark:hover:text-neon-purple transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          {isExternal ? 'Read Article →' : 'Read More →'}
        </Link>
      </div>
    </motion.article>
  )
}

// ── NewsClient ────────────────────────────────────────────────────────────────

export default function NewsClient({ news }: { news: News[] }) {
  const published = news.filter((n) => n.isPublished)

  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      {/* ── Geometric background ─────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.04] dark:opacity-[0.06] text-primary-light dark:text-primary-dark"
      >
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diamonds" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <polygon points="20,2 38,20 20,38 2,20" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diamonds)" />
        </svg>
      </div>

      <Header />

      <main className="relative z-10 flex-1">
        {/* ── Hero strip ───────────────────────────────────────────────── */}
        <PageHero
          eyebrow="9th Essex District · Massachusetts"
          title="Latest"
          titleAccent="News"
          showZosia={true}
          image="zosia-3.webp"
          description="Stay up to date with the latest campaign updates, press coverage, and community news from Zosia VanMeter."
        />

        {/* ── News grid ────────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-12 sm:py-16">
          {/* Section label */}
          <motion.div
            {...fadeUp(0.1)}
            className="flex items-center justify-between mb-8 pb-4 border-b border-border-light dark:border-border-dark"
          >
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              {published.length} {published.length === 1 ? 'Article' : 'Articles'}
            </p>
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              Campaign Updates
            </p>
          </motion.div>

          {/* Empty state */}
          {published.length === 0 && (
            <motion.div {...fadeUp(0.2)} className="py-24 text-center">
              <p className="font-archivo text-2xl font-black uppercase text-muted-light dark:text-muted-dark">
                No news yet
              </p>
              <p className="font-inter text-sm text-muted-light/60 dark:text-muted-dark/60 mt-2">
                Check back soon for campaign updates.
              </p>
            </motion.div>
          )}

          {/* Grid */}
          {published.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {published.map((article, i) => (
                <NewsCard key={article.id} article={article} index={i} />
              ))}
            </div>
          )}
        </div>
      </main>

      <PrimaryDateMarquee />

      {/* ── CTA ─────────────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-border-light dark:border-border-dark bg-hero-light dark:bg-hero-dark overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-primary-light/20 dark:from-primary-dark/10 to-transparent"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-8">
            {/* Text */}
            <div className="flex flex-col gap-4 max-w-lg">
              <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
                Get Involved
              </p>
              <h2 className="font-archivo text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white leading-none">
                Ready to Make a <span className="text-cta-dark">Difference?</span>
              </h2>
              <p className="font-inter text-sm text-white/60 leading-relaxed">
                Join thousands of neighbors across the 9th Essex District who are working together to build a stronger,
                safer, and more transparent community.
              </p>
            </div>

            {/* CTA */}
            <Link
              href="/contact"
              className="font-archivo shrink-0 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-opacity duration-200 min-h-11 flex items-center justify-center"
            >
              Join the Team →
            </Link>
          </div>
        </div>
      </div>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
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
