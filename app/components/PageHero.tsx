'use client'

import { motion } from 'framer-motion'
import Picture from '@/app/components/elements/Picture'
import HeroParticles from './HeroParticles'
import { fadeUp } from '../lib/constants/motion.constants'

interface PageHeroProps {
  eyebrow?: string
  title: string
  titleAccent?: string
  description?: string
  showZosia?: boolean
  showPatriotic?: boolean
  image?: string
  isFullHeight?: boolean
}

export default function PageHero({
  eyebrow = 'Forward. Together',
  title,
  titleAccent,
  description,
  showPatriotic = true,
  image,
  isFullHeight
}: PageHeroProps) {
  return (
    <div className="w-full bg-hero-light dark:bg-hero-dark relative overflow-hidden 1115:h-80">
      {/* Patriotic bg */}
      {showPatriotic && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/patriotic-1.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center bottom',
            backgroundRepeat: 'no-repeat'
          }}
        />
      )}

      {/* Overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-hero-light/70 dark:bg-hero-dark/70 z-1" />

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-hero-light dark:from-hero-dark to-transparent z-3"
      />

      {/* Desktop image */}
      {image &&
        (isFullHeight ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            className="hidden sm:block absolute top-0 bottom-0 right-0 w-1/2 z-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-hero-light dark:from-hero-dark via-hero-light/30 dark:via-hero-dark/30 to-transparent z-10 pointer-events-none" />
            <Picture
              src={`/images/${image}`}
              alt=""
              priority
              fill
              sizes="50vw"
              className="object-cover object-center"
            />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden="true"
            className="hidden sm:block absolute bottom-0 right-0 md:right-8 lg:right-16 w-64 md:w-80 lg:w-90 z-2"
          >
            <Picture src={`/images/${image}`} alt="" priority className="w-full h-full object-contain object-bottom" />
          </motion.div>
        ))}

      {/* Text */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 md:px-16 pt-12 sm:pt-20 pb-10 sm:pb-16 min-h-64 sm:min-h-80 flex flex-col justify-center">
        {eyebrow && (
          <motion.p
            {...fadeUp(0.1)}
            className="font-archivo text-[11px] sm:text-sm font-semibold tracking-[0.2em] uppercase text-secondary-light dark:text-secondary-dark mb-4"
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          {...fadeUp(0.2)}
          className="font-archivo text-4xl sm:text-5xl md:text-6xl font-black uppercase text-white leading-none mb-4"
        >
          {titleAccent ? (
            <>
              {title} <span className="text-cta-dark">{titleAccent}</span>
            </>
          ) : (
            title
          )}
        </motion.h1>
        {description && (
          <motion.p {...fadeUp(0.3)} className="font-inter text-sm sm:text-base text-white/60 max-w-md leading-relaxed">
            {description}
          </motion.p>
        )}
      </div>

      {/* Mobile image strip — below text */}
      {image && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
          className="sm:hidden relative w-full h-70"
        >
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-hero-light dark:from-hero-dark to-transparent z-10 pointer-events-none" />
          <Picture src={`/images/${image}`} alt="" priority sizes="100vw" className="object-cover object-bottom" />
        </motion.div>
      )}

      <HeroParticles />
    </div>
  )
}
