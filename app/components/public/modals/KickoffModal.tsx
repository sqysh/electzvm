'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Heart, Users, Calendar, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'

const KICKOFF_DATE = new Date('2026-06-06T12:00:00')

export default function KickoffModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (new Date() < KICKOFF_DATE) {
        setShow(true)
      }
    }, 0)
    return () => clearTimeout(timer)
  }, [])

  function dismiss() {
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-998 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="kickoff-title"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-999 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark w-full max-w-md pointer-events-auto overflow-hidden">
              {/* Header */}
              <div className="bg-hero-light dark:bg-hero-dark px-6 pt-6 pb-5 relative">
                <button
                  onClick={dismiss}
                  aria-label="Close event notification"
                  className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-dark animate-pulse" aria-hidden="true" />
                  <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-primary-dark">
                    Upcoming Event
                  </span>
                </div>
                <h2
                  id="kickoff-title"
                  className="font-archivo text-2xl sm:text-3xl font-black uppercase text-white leading-none mb-1"
                >
                  Campaign Kick-off
                </h2>
                <p className="font-inter text-sm text-white/50">Saugus-Everett Elks Lodge #642</p>
              </div>

              {/* Details */}
              <div className="px-6 py-5 border-b border-border-light dark:border-border-dark">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark px-3 py-2.5">
                    <Calendar
                      className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-archivo text-[9px] tracking-widest uppercase text-muted-light dark:text-muted-dark">
                        Date
                      </p>
                      <p className="font-archivo text-xs font-bold text-text-light dark:text-text-dark">June 6, 2026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 bg-surface-light dark:bg-surface-dark px-3 py-2.5">
                    <Clock
                      className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-archivo text-[9px] tracking-widests uppercase text-muted-light dark:text-muted-dark">
                        Time
                      </p>
                      <p className="font-archivo text-xs font-bold text-text-light dark:text-text-dark">12:00 PM</p>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center gap-2 bg-surface-light dark:bg-surface-dark px-3 py-2.5">
                    <MapPin
                      className="w-3.5 h-3.5 text-primary-light dark:text-primary-dark shrink-0"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-archivo text-[9px] tracking-widests uppercase text-muted-light dark:text-muted-dark">
                        Location
                      </p>
                      <p className="font-archivo text-xs font-bold text-text-light dark:text-text-dark">
                        413 Main St, Saugus, MA
                      </p>
                    </div>
                  </div>
                </div>
                <p className="font-inter text-sm text-muted-light dark:text-muted-dark leading-relaxed">
                  Join us for a fun block party kick-off. Bring your families, friends, and that neighbor you&apos;ve
                  only spoken to once.
                </p>
              </div>

              {/* CTAs */}
              <div className="px-6 py-4 flex flex-col gap-3">
                <div className="flex gap-2">
                  <a
                    href="https://secure.actblue.com/donate/2teamzvm "
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary-light dark:bg-primary-dark text-white font-archivo text-[10px] tracking-widests uppercase hover:opacity-90 transition-opacity focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-11"
                    aria-label="Donate to the campaign via ActBlue (opens in new tab)"
                  >
                    <Heart className="w-3.5 h-3.5" aria-hidden="true" />
                    Donate
                  </a>
                  <Link
                    href="/contact"
                    onClick={dismiss}
                    className="flex-1 flex items-center justify-center gap-2 py-3 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark font-archivo text-[10px] tracking-widests uppercase hover:border-primary-light dark:hover:border-primary-dark hover:text-primary-light dark:hover:text-primary-dark transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light min-h-11"
                  >
                    <Users className="w-3.5 h-3.5" aria-hidden="true" />
                    Get Involved
                  </Link>
                </div>
                <button
                  onClick={dismiss}
                  className="font-inter text-xs text-muted-light dark:text-muted-dark hover:text-text-light dark:hover:text-text-dark transition-colors focus-visible:outline-none text-center"
                  aria-label="Dismiss this notification"
                >
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
