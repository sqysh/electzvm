import { formatDay, formatMonth } from '@/app/lib/utils/_date.utils'

export function CalendarDate({ date, large = false }: { date: Date; large?: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark shrink-0 ${large ? 'w-20 h-20 sm:w-24 sm:h-24' : 'w-14 h-14 sm:w-16 sm:h-16'}`}
    >
      <span
        className={`font-archivo font-black leading-none text-primary-light dark:text-primary-dark ${large ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}
      >
        {formatDay(date)}
      </span>
      <span
        className={`font-archivo uppercase tracking-widest text-muted-light dark:text-muted-dark ${large ? 'text-[11px]' : 'text-[9px]'}`}
      >
        {formatMonth(date)}
      </span>
    </div>
  )
}
