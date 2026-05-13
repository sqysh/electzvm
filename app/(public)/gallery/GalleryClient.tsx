'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Picture from '@/app/components/elements/Picture'
import { PrimaryDateMarquee } from '@/app/components/PrimaryDateMarquee'
import { Lightbox } from '@/app/components/LightBox'
import Header from '@/app/components/Header'
import PageHero from '@/app/components/PageHero'
import { fadeUp } from '@/app/lib/constants/motion.constants'

// ── Image list ────────────────────────────────────────────────────────────────

const images = [
  { src: '/images/gallery/g_01.jpeg', alt: 'Campaign photo 1' },
  ...Array.from({ length: 33 }, (_, i) => ({
    src: `/images/gallery/g_${String(i + 2).padStart(2, '0')}.jpg`,
    alt: `Campaign photo ${i + 2}`
  }))
]

// ── GalleryClient ─────────────────────────────────────────────────────────────

export function GalleryClient() {
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
          title="Photo"
          titleAccent="Gallery"
          showZosia={true}
          showPatriotic={true}
          image="zosia-3.png"
          description="A look at Zosia VanMeter out in the community — meeting neighbors, attending events, and building a movement across the 9th Essex District."
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
                  className="w-full block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light dark:focus-visible:outline-primary-dark group"
                >
                  <div className="overflow-hidden bg-surface-light dark:bg-surface-dark border border-border-light dark:border-border-dark">
                    <Picture
                      priority={i < 8}
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Primary date marquee ─────────────────────────────────────────── */}
      <PrimaryDateMarquee />

      {/* ── CTA section ─────────────────────────────────────────────────── */}
      <div className="relative z-10 border-t border-border-light dark:border-border-dark bg-hero-light dark:bg-hero-dark overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-linear-to-br from-primary-light/20 dark:from-primary-dark/10 to-transparent"
        />
        <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-16 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-12">
            {/* Donate */}
            <div className="flex flex-col gap-4">
              <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
                Support the Campaign
              </p>
              <h2 className="font-archivo text-2xl sm:text-3xl font-black uppercase text-white leading-none">
                Help Us <span className="text-cta-dark">Win</span>
              </h2>
              <p className="font-inter text-sm text-white/60 leading-relaxed max-w-sm">
                Every contribution helps us reach more voters across the 9th Essex District and bring real change to our
                community.
              </p>

              <a
                href="https://secure.actblue.com/donate/zvmkickoff"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donate to Zosia VanMeter's campaign (opens in new tab)"
                className="font-archivo w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-cta-light dark:bg-cta-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-opacity duration-200 min-h-11 flex items-center justify-center sm:justify-start"
              >
                Donate via ActBlue →
              </a>
            </div>

            {/* Divider — vertical on desktop, horizontal on mobile */}
            <div aria-hidden="true" className="sm:hidden h-px bg-white/10" />
            <div aria-hidden="true" className="hidden sm:block absolute left-1/2 top-16 bottom-16 w-px bg-white/10" />

            {/* Register */}
            <div className="flex flex-col gap-4">
              <p className="font-archivo text-[10px] tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark">
                Primary · September 1, 2026
              </p>
              <h2 className="font-archivo text-2xl sm:text-3xl font-black uppercase text-white leading-none">
                Register <span className="text-primary-dark">to Vote</span>
              </h2>
              <p className="font-inter text-sm text-white/60 leading-relaxed max-w-sm">
                Make sure you&apos;re registered before the August 12th deadline. It only takes a few minutes and your
                vote makes all the difference.
              </p>

              <a
                href="https://www.sec.state.ma.us/ovr/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Register to vote in Massachusetts (opens in new tab)"
                className="font-archivo w-full sm:w-auto px-8 py-4 text-sm font-bold uppercase tracking-widest text-white bg-primary-light dark:bg-primary-dark hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-opacity duration-200 min-h-11 flex items-center justify-center sm:justify-start"
              >
                Register Now →
              </a>
            </div>
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

      {/* ── Lightbox ─────────────────────────────────────────────────────── */}
      {lightboxIndex !== null && (
        <Lightbox images={images} index={lightboxIndex} onClose={closeLightbox} onPrev={prev} onNext={next} />
      )}
    </div>
  )
}
