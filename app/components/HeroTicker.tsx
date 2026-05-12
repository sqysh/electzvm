'use client'

import { useEffect, useState } from 'react'

const taglines = [
  'Safe communities for every resident.',
  'Affordable housing for the 9th Essex District.',
  'Transparent government in plain language.',
  'Community-driven solutions that move us forward.',
  'Leaders who know the people they represent.'
]

export default function HeroTicker() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % taglines.length)
        setVisible(true)
      }, 400)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <blockquote aria-live="polite" aria-atomic="true" className="mb-8 sm:mb-10 max-w-sm min-h-12 flex items-center">
      <p
        className={`font-inter text-base sm:text-lg text-white/60 leading-relaxed transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {taglines[current]}
      </p>
    </blockquote>
  )
}
