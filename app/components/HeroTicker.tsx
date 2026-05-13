'use client'

import { useEffect, useState } from 'react'

const phrases = [
  'the Community',
  'Affordable Housing',
  'Public Safety',
  'the 9th Essex District',
  'Transparent Government'
]

export default function HeroTicker() {
  const [current, setCurrent] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % phrases.length)
        setVisible(true)
      }, 400)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <p
      role="doc-subtitle"
      className="font-archivo text-lg sm:text-2xl md:text-3xl font-bold uppercase tracking-widest text-white mt-2 mb-6 sm:mb-8 flex items-baseline gap-3 flex-wrap"
    >
      <span>For</span>
      <span
        aria-live="polite"
        aria-atomic="true"
        className={`text-secondary-dark transition-opacity duration-400 ${visible ? 'opacity-100' : 'opacity-0'}`}
      >
        {phrases[current]}
      </span>
    </p>
  )
}
