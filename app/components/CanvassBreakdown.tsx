import { CanvassPin } from '@prisma/client'
import { useUiSelector } from '../lib/redux/store'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Plus } from 'lucide-react'
import { useEffect, useState } from 'react'

export function CanvassBreakdown({
  pins,
  pinCount,
  doorsKnocked
}: {
  pins: CanvassPin[]
  pinCount: number
  doorsKnocked: number
}) {
  const { isDark } = useUiSelector()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])
  const statuses = [
    { key: 'knocked', label: 'Knocked', colorLight: '#0096b4', colorDark: '#00e5ff' },
    { key: 'interested', label: 'Interested', colorLight: '#5b2d8e', colorDark: '#a855f7' },
    { key: 'no_answer', label: 'No Answer', colorLight: '#6b5a8a', colorDark: '#9d7fc4' },
    { key: 'hostile', label: 'Hostile', colorLight: '#dc2626', colorDark: '#ef4444' }
  ] as const

  const counts = statuses.map((s) => ({
    ...s,
    color: mounted && isDark ? s.colorDark : s.colorLight,
    count: pins.filter((p) => p.status === s.key).length,
    doors: pins.filter((p) => p.status === s.key).reduce((sum, p) => sum + p.doors, 0)
  }))

  const total = pinCount || 1

  return (
    <div className="flex flex-col gap-5 p-4 overflow-y-auto flex-1">
      {/* Big numbers */}
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-0.5 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3">
          <span className="font-archivo text-3xl font-black text-primary-light dark:text-primary-dark tabular-nums leading-none">
            {pinCount}
          </span>
          <span className="font-archivo text-[9px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark">
            Pins
          </span>
        </div>
        <div className="flex flex-col gap-0.5 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark px-4 py-3">
          <span className="font-archivo text-3xl font-black text-cta-light dark:text-cta-dark tabular-nums leading-none">
            {doorsKnocked}
          </span>
          <span className="font-archivo text-[9px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark">
            Doors
          </span>
        </div>
      </div>

      {/* Stacked bar */}
      {pinCount > 0 && (
        <div className="flex flex-col gap-2">
          <span className="font-archivo text-[9px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
            Status Breakdown
          </span>
          <div className="flex h-3 w-full overflow-hidden gap-px">
            {counts
              .filter((s) => s.count > 0)
              .map((s) => (
                <motion.div
                  key={s.key}
                  initial={{ width: 0 }}
                  animate={{ width: `${(s.count / total) * 100}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  suppressHydrationWarning
                  style={{ backgroundColor: s.color }}
                />
              ))}
          </div>
        </div>
      )}

      {/* Status rows */}
      <div className="flex flex-col divide-y divide-border-light dark:divide-border-dark border border-border-light dark:border-border-dark">
        {counts.map((s) => (
          <div key={s.key} className="flex items-center justify-between px-3 py-2.5 gap-3">
            <div className="flex items-center gap-2">
              <div
                suppressHydrationWarning
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: s.color }}
                aria-hidden="true"
              />
              <span className="font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark">
                {s.label}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                suppressHydrationWarning
                className="font-archivo text-sm font-black tabular-nums"
                style={{ color: s.color }}
              >
                {s.count}
              </span>
              <span className="font-mono text-[10px] text-muted-light/50 dark:text-muted-dark/50">{s.doors}d</span>
            </div>
          </div>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-2">
        <Link
          href="/dashboard/canvassing-map"
          className="flex-1 flex items-center justify-between px-3 py-2.5 border border-border-light dark:border-border-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors group focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-light"
        >
          <span className="font-archivo text-[10px] tracking-widest uppercase text-muted-light dark:text-muted-dark group-hover:text-primary-light dark:group-hover:text-primary-dark transition-colors">
            Open Map
          </span>
          <ArrowRight
            className="w-3.5 h-3.5 text-muted-light dark:text-muted-dark group-hover:text-primary-light dark:group-hover:text-primary-dark group-hover:translate-x-0.5 transition-all"
            aria-hidden="true"
          />
        </Link>
        <Link
          href="/dashboard/canvassing-map?addPin=true"
          className="flex items-center gap-1.5 px-3 py-2.5 border border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark hover:bg-secondary-light/10 dark:hover:bg-secondary-dark/10 transition-colors font-archivo text-[10px] tracking-widests uppercase focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-light"
        >
          <Plus className="w-3.5 h-3.5" aria-hidden="true" />
          Pin
        </Link>
      </div>
    </div>
  )
}
