'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cubes } from './geometric-backgrounds/Cubes'

export default function PublicIntro({ seen }: { seen: boolean }) {
  const [show, setShow] = useState(!seen)

  useEffect(() => {
    if (seen) return
    document.cookie = 'zvm-intro-seen=true; path=/; max-age=86400'
    const timer = setTimeout(() => setShow(false), 2000)
    return () => clearTimeout(timer)
  }, [seen])

  if (seen) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          onAnimationComplete={() => {}}
          className="fixed inset-0 z-999 bg-hero-light dark:bg-hero-dark flex flex-col items-center justify-center gap-6 pointer-events-none"
        >
          <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] text-primary-dark">
            <Cubes />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="relative z-10 flex flex-col items-center gap-8"
          >
            <p className="font-archivo text-4xl sm:text-5xl font-black uppercase tracking-widest text-white">
              Elect<span className="text-primary-dark">ZVM</span>
            </p>
            <div className="w-48 h-px bg-white/10 relative overflow-hidden">
              <motion.div
                initial={{ x: '-100%' }}
                animate={{ x: '300%' }}
                transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
                className="absolute inset-y-0 w-1/3 bg-primary-dark"
              />
            </div>
            <p className="font-archivo text-[10px] tracking-[0.3em] uppercase text-white/30">Forward. Together.</p>
          </motion.div>

          {/* Auto dismiss */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0, delay: 2 }}
            onAnimationComplete={() => setShow(false)}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
