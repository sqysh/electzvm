import { motion } from 'framer-motion'

const stats = [
  { value: '10+', label: 'Years serving the North Shore' },
  { value: '9th', label: 'Essex District' },
  { value: '2026', label: 'Primary — September 1st' }
]

export function StatsBar() {
  return (
    <div className="w-full bg-surface-light dark:bg-surface-dark border-b border-border-light dark:border-border-dark">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-16">
        <div className="grid grid-cols-3 divide-x divide-border-light dark:divide-border-dark">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
              className="flex flex-col items-center justify-center py-5 sm:py-6 gap-1 px-2"
            >
              <span className="font-archivo text-xl sm:text-3xl font-black uppercase text-primary-light dark:text-primary-dark">
                {stat.value}
              </span>
              <span className="font-archivo text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-muted-light dark:text-muted-dark text-center leading-tight">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
