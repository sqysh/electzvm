'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Picture from '@/app/components/elements/Picture'
import LiquidButton from '@/app/components/elements/LiquidButton'
import type { News } from '@prisma/client'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { fadeUp } from '@/app/lib/constants/motion.constants'

export default function NewsDetailsClient({ article }: { article: News }) {
  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      <main className="relative z-10 flex-1">
        {/* ── Full bleed hero image ─────────────────────────────────────── */}
        {article.imageUrl ? (
          <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden">
            <Picture
              src={article.imageUrl}
              alt={article.title}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            {/* Dark overlay */}
            <div aria-hidden="true" className="absolute inset-0 bg-black/40" />
            {/* Bottom fade */}
            <div
              aria-hidden="true"
              className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-bg-light dark:from-bg-dark to-transparent"
            />

            {/* Back button overlaid on hero */}
            <div className="absolute top-6 left-0 right-0 max-w-4xl mx-auto px-5 sm:px-8 md:px-16 z-10">
              <Link
                href="/news"
                aria-label="Back to news"
                className="inline-flex items-center gap-2 font-archivo text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                All News
              </Link>
            </div>

            {/* Title overlaid on hero */}
            <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-5 sm:px-8 md:px-16 pb-10 z-10">
              <motion.p
                {...fadeUp(0.1)}
                className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-dark mb-3"
              >
                {new Date(article.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </motion.p>
              <motion.h1
                {...fadeUp(0.2)}
                className="font-archivo text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white leading-tight"
              >
                {article.title}
              </motion.h1>
            </div>
          </div>
        ) : (
          /* No image — standard hero strip */
          <div className="w-full bg-hero-light dark:bg-hero-dark py-16 sm:py-24 relative overflow-hidden">
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-br from-primary-light/20 dark:from-primary-dark/10 to-transparent"
            />
            <div className="relative z-10 max-w-4xl mx-auto px-5 sm:px-8 md:px-16">
              <Link
                href="/news"
                aria-label="Back to news"
                className="inline-flex items-center gap-2 font-archivo text-[10px] tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors mb-6 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                All News
              </Link>
              <motion.p
                {...fadeUp(0.1)}
                className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-3"
              >
                {new Date(article.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </motion.p>
              <motion.h1
                {...fadeUp(0.2)}
                className="font-archivo text-3xl sm:text-4xl md:text-5xl font-black uppercase text-white leading-tight"
              >
                {article.title}
              </motion.h1>
            </div>
          </div>
        )}

        {/* ── Article content ───────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-16 py-12 sm:py-16">
          {/* Back link — below hero when no image */}
          {article.imageUrl && (
            <motion.div {...fadeUp(0.1)} className="mb-8">
              <Link
                href="/news"
                className="inline-flex items-center gap-2 font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
                All News
              </Link>
            </motion.div>
          )}

          {/* Excerpt */}
          {article.excerpt && (
            <motion.p
              {...fadeUp(0.25)}
              className="font-inter text-lg sm:text-xl text-muted-light dark:text-muted-dark leading-relaxed mb-8 border-l-2 border-primary-light dark:border-primary-dark pl-5"
            >
              {article.excerpt}
            </motion.p>
          )}

          {/* Divider */}
          <motion.div {...fadeUp(0.3)} aria-hidden="true" className="h-px bg-border-light dark:bg-border-dark mb-8" />

          {/* Body */}
          {article.body && (
            <motion.div
              {...fadeUp(0.35)}
              className="font-inter text-sm sm:text-base text-text-light dark:text-text-dark leading-relaxed whitespace-pre-wrap"
            >
              {article.body}
            </motion.div>
          )}

          {/* External link */}
          {article.externalLink && (
            <motion.div {...fadeUp(0.4)} className="mt-10">
              <a
                href={article.externalLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Read full article (opens in new tab)"
                className="inline-flex items-center gap-2 font-archivo text-sm font-bold uppercase tracking-widest text-primary-light dark:text-primary-dark hover:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
              >
                Read Full Article
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </a>
            </motion.div>
          )}

          {/* Divider */}
          <motion.div
            {...fadeUp(0.45)}
            aria-hidden="true"
            className="h-px bg-border-light dark:bg-border-dark mt-12 mb-10"
          />

          {/* CTA */}
          <motion.div
            {...fadeUp(0.5)}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
          >
            <div className="flex flex-col gap-1">
              <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
                Forward. Together.
              </p>
              <p className="font-archivo text-lg font-black uppercase text-text-light dark:text-text-dark">
                Join the <span className="text-cta-light dark:text-cta-dark">Campaign</span>
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <LiquidButton href="/contact" label="Join the Team" color="primary" variant="filled" />
              <LiquidButton
                href="https://secure.actblue.com/donate/2teamzvm "
                label="Donate"
                color="cta"
                variant="filled"
                external
                ariaLabel="Donate to Zosia VanMeter's campaign (opens in new tab)"
              />
            </div>
          </motion.div>
        </div>
      </main>

      {/* ── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 border-t border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 md:px-16 h-12 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="font-archivo text-[10px] font-black uppercase tracking-widest text-text-light dark:text-text-dark hover:opacity-80 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
          >
            Elect<span className="text-primary-light dark:text-primary-dark">ZVM</span>
          </Link>
          <a
            href="https://sqysh.io"
            target="_blank"
            rel="noopener noreferrer"
            className="font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors"
          >
            Built by <span className="text-primary-light dark:text-primary-dark">Sqysh</span>
          </a>
        </div>
      </footer>
    </div>
  )
}
