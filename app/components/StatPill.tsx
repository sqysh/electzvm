import { ChevronRight } from 'lucide-react'
import { memo } from 'react'

export const StatPill = memo(function StatPill({
  label,
  value,
  onClick,
  accent
}: {
  label: string
  value: number | string
  onClick: () => void
  accent: string
}) {
  return (
    <div
      onClick={onClick}
      className="group flex items-center justify-between gap-4 px-4 py-3 border-b border-border-light dark:border-border-dark hover:bg-surface-light dark:hover:bg-surface-dark transition-colors focus-visible:outline-none"
    >
      <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-muted-light dark:text-muted-dark">
        {label}
      </span>
      <div className="flex items-center gap-2">
        <span className={`font-archivo text-lg font-black tabular-nums ${accent}`}>{value}</span>
        <ChevronRight
          className="w-3 h-3 text-muted-light dark:text-muted-dark group-hover:translate-x-0.5 transition-transform"
          aria-hidden="true"
        />
      </div>
    </div>
  )
})
