'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Picture from '@/app/components/elements/Picture'
import type { News } from '@prisma/client'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { PageField } from '@/types/page.types'
import { getField } from '@/app/lib/utils/page.utils'
import { Cubes } from '@/app/components/geometric-backgrounds/Cubes'

function NewsCard({ article, index }: { article: News; index: number }) {
  return (
    <motion.article
      {...fadeUp(0.1 + index * 0.08)}
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
          {new Date(article.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
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
            Read Article →
          </Link>
        </div>
      </div>
    </motion.article>
  )
}

export default function NewsClient({ news, content }: { news: News[]; content: PageField[] }) {
  const published = news.filter((n) => n.isPublished)

  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      <Cubes />
      <Header />

      <main className="relative z-10 flex-1">
        <PageHero
          eyebrow={getField(content, 'news_hero_eyebrow', '9th Essex District · Massachusetts')}
          title={getField(content, 'news_hero_title', 'Latest')}
          titleAccent={getField(content, 'news_hero_title_accent', 'News')}
          showZosia={true}
          image="zosia-3.webp"
          description={getField(content, 'news_hero_description', 'Stay up to date with the latest campaign updates.')}
        />

        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-12 sm:py-16">
          <motion.div
            {...fadeUp(0.1)}
            className="flex items-center justify-between mb-8 pb-4 border-b border-border-light dark:border-border-dark"
          >
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              {published.length} {published.length === 1 ? 'Article' : 'Articles'}
            </p>
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              {getField(content, 'news_grid_label', 'Campaign Updates')}
            </p>
          </motion.div>

          {published.length === 0 ? (
            <motion.div {...fadeUp(0.2)} className="py-24 text-center">
              <p className="font-archivo text-2xl font-black uppercase text-muted-light dark:text-muted-dark">
                {getField(content, 'news_empty_heading', 'No news yet')}
              </p>
              <p className="font-inter text-sm text-muted-light/60 dark:text-muted-dark/60 mt-2">
                {getField(content, 'news_empty_body', 'Check back soon for campaign updates.')}
              </p>
            </motion.div>
          ) : (
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
