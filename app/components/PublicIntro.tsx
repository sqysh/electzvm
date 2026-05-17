'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cubes } from './geometric-backgrounds/Cubes'

export default function PublicIntro() {
  const [show, setShow] = useState(false)
  const initialized = useRef(false)

  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const seen = sessionStorage.getItem('zvm-intro-seen')
    if (!seen) {
      sessionStorage.setItem('zvm-intro-seen', 'true')
      setTimeout(() => setShow(true), 0)
      setTimeout(() => setShow(false), 2000)
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-999 bg-hero-light dark:bg-hero-dark flex flex-col items-center justify-center gap-6 pointer-events-none"
        >
          {/* Geometric background */}
          <Cubes />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
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
        </motion.div>
      )}
    </AnimatePresence>
  )
}
