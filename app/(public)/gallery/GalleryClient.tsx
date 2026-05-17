'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Picture from '@/app/components/elements/Picture'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'
import { Lightbox } from '@/app/components/LightBox'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { fadeUp } from '@/app/lib/constants/motion.constants'
import { CTASection } from '@/app/components/CTASection'
import { Diamonds } from '@/app/components/geometric-backgrounds/Diamonds'
import { getField } from '@/app/lib/utils/page.utils'
import { PageField } from '@/types/page.types'

const images = [
  { src: '/images/gallery/g_01.jpeg', alt: 'Campaign photo 1' },
  ...Array.from({ length: 33 }, (_, i) => ({
    src: `/images/gallery/g_${String(i + 2).padStart(2, '0')}.jpg`,
    alt: `Campaign photo ${i + 2}`
  }))
]

export function GalleryClient({ content }: { content: PageField[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const openLightbox = (i: number) => setLightboxIndex(i)
  const closeLightbox = () => setLightboxIndex(null)

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length))
  }, [])

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length))
  }, [])

  return (
    <div className="min-h-screen w-full bg-bg-light dark:bg-bg-dark flex flex-col">
      <Diamonds />
      <Header />

      <main className="relative z-10 flex-1">
        {/* ── Hero strip ───────────────────────────────────────────────── */}
        <PageHero
          eyebrow={getField(content, 'gallery_hero_eyebrow', '9th Essex District · Massachusetts')}
          title={getField(content, 'gallery_hero_title', 'Photo')}
          titleAccent={getField(content, 'gallery_hero_title_accent', 'Gallery')}
          showZosia={true}
          showPatriotic={true}
          image="zosia-20.png"
          description={getField(content, 'gallery_hero_description', 'A look at Zosia VanMeter out in the community.')}
        />

        {/* ── Gallery grid ─────────────────────────────────────────────── */}
        <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-12 sm:py-16">
          {/* Section label */}
          <motion.div
            {...fadeUp(0.1)}
            className="flex items-center justify-between mb-8 pb-4 border-b border-border-light dark:border-border-dark"
          >
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              {images.length} Photos
            </p>
            <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
              Click to enlarge
            </p>
          </motion.div>

          {/* Masonry-style columns */}
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4">
            {images.map((image, i) => (
              <motion.div
                key={image.src}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.03, 0.6), ease: [0.22, 1, 0.36, 1] }}
                className="break-inside-avoid mb-3 sm:mb-4"
              >
                <button
                  onClick={() => openLightbox(i)}
                  aria-label={`View ${image.alt} in lightbox`}
                  className="w-full block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark group relative"
                >
                  {/* Image */}
                  <div className="overflow-hidden bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark relative">
                    <Picture
                      priority={i < 8}
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary-light/0 dark:bg-primary-dark/0 group-hover:bg-primary-light/10 dark:group-hover:bg-primary-dark/10 transition-colors duration-300" />

                    {/* Corner accents — appear on hover */}
                    <div
                      className="absolute top-2 left-2 w-4 h-4 border-t border-l border-primary-light dark:border-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cta-light dark:border-cta-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cta-light dark:border-cta-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                    <div
                      className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-primary-light dark:border-primary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />

                    {/* View icon — center on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-sm border border-border-light dark:border-border-dark px-3 py-1.5">
                        <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-text-light dark:text-text-dark">
                          View
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    aria-hidden="true"
                    className={`h-px w-0 group-hover:w-full transition-all duration-500 ease-in-out ${
                      i % 3 === 0
                        ? 'bg-primary-light dark:bg-primary-dark'
                        : i % 3 === 1
                          ? 'bg-cta-light dark:bg-cta-dark'
                          : 'bg-secondary-light dark:bg-secondary-dark'
                    }`}
                  />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* ── CTA section ─────────────────────────────────────────────────── */}
      <CTASection />

      {/* ── Primary date marquee ─────────────────────────────────────────── */}
      <PrimaryDateMarquee />

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex} onClose={closeLightbox} onPrev={prev} onNext={next} />
      )}
    </div>
  )
}
