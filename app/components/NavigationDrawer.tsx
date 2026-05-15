'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { X } from 'lucide-react'
import { navLinks } from '../lib/constants/navigation.contants'
import { useBodyScrollLock } from '../lib/hooks/useBodyScrollLock'
import { useKeyDown } from '../lib/hooks/useKeyDown'

interface NavigationDrawerProps {
  open: boolean
  onClose: () => void
}

export default function NavigationDrawer({ open, onClose }: NavigationDrawerProps) {
  useBodyScrollLock(open)
  useKeyDown('Escape', onClose)

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            key="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-50 w-72 bg-hero-light dark:bg-hero-dark flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-white/10 shrink-0">
              <span className="font-archivo text-lg font-black uppercase tracking-widest text-white">
                Elect<span className="text-secondary-dark">ZVM</span>
              </span>
              <button
                onClick={onClose}
                aria-label="Close navigation menu"
                className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav links */}
            <nav aria-label="Mobile navigation" className="flex-1 flex flex-col px-6 py-8 gap-1 overflow-y-auto">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className="font-archivo text-xl font-black uppercase tracking-widest text-white/70 hover:text-white transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white flex items-center min-h-13"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Donate CTA */}
            <div className="px-6 py-6 border-t border-white/10 shrink-0">
              <Link
                href="https://secure.actblue.com/donate/zvm"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Donate to Zosia VanMeter's campaign (opens in new tab)"
                onClick={onClose}
                className="font-archivo w-full px-6 py-4 text-sm font-bold uppercase tracking-widest text-white bg-cta-light dark:bg-cta-dark hover:opacity-90 transition-opacity duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white min-h-11 flex items-center justify-center"
              >
                Donate
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
