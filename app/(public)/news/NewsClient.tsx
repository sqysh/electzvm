'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Picture from '@/app/components/elements/Picture'
import type { News } from '@prisma/client'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { Diamonds } from '@/app/components/geometric-backgrounds/Diamonds'

// ── News card ─────────────────────────────────────────────────────────────────

function NewsCard({ article, index }: { article: News; index: number }) {
  const isExternal = !!article.externalLink

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
          href={`/news/${article.id}`}
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
      <Diamonds />

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
    </div>
  )
}
