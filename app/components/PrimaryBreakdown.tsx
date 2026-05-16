import { useEffect, useState } from 'react'
import { PRIMARY_DATE } from '../lib/constants/canvas-pin.constants'

export function PrimaryCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    function calc() {
      const diff = PRIMARY_DATE.getTime() - new Date().getTime()
      if (diff <= 0) return
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60)
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-4 py-6">
      <div className="grid grid-cols-4 gap-2 w-full">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Min', value: timeLeft.minutes },
          { label: 'Sec', value: timeLeft.seconds }
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-1 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark py-3"
          >
            <span className="font-archivo text-2xl font-black text-primary-light dark:text-primary-dark tabular-nums leading-none">
              {String(value).padStart(2, '0')}
            </span>
            <span className="font-archivo text-[9px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark">
              {label}
            </span>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
          September 1, 2026
        </span>
        <span className="font-archivo text-[9px] tracking-widest uppercase text-cta-light dark:text-cta-dark">
          Primary Election Day
        </span>
      </div>
    </div>
  )
}
