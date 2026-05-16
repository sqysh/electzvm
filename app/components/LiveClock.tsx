import { useClock } from '../lib/hooks/useClock'

export function LiveClock() {
  const time = useClock()
  if (!time) return null

  const timeStr = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  const dateStr = time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()

  return (
    <div className="hidden md:flex items-center gap-3">
      <span className="font-mono text-[10px] text-muted-light dark:text-muted-dark">{dateStr}</span>
      <span className="font-mono text-[11px] text-text-light dark:text-text-dark tabular-nums">{timeStr}</span>
    </div>
  )
}
