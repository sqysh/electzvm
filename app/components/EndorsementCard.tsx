import { Endorsement } from '@/types/endorsement.types'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/constants/motion.constants'
import Picture from './elements/Picture'

export function EndorsementCard({ endorsement, index }: { endorsement: Endorsement; index: number }) {
  return (
    <motion.div
      {...fadeUp(0.1 + (index % 6) * 0.05)}
      className="flex items-center gap-4 p-5 border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-200"
    >
      {/* Avatar */}
      {endorsement.imageUrl ? (
        <Picture
          priority
          src={endorsement.imageUrl}
          alt={endorsement.name}
          className="w-12 h-12 rounded-full shrink-0 object-cover border border-border-light dark:border-border-dark"
        />
      ) : (
        <div className="w-12 h-12 rounded-full shrink-0 flex items-center justify-center bg-primary-light/10 dark:bg-primary-dark/10 border border-primary-light/20 dark:border-primary-dark/20">
          <span className="font-archivo text-lg font-black text-primary-light dark:text-primary-dark uppercase leading-none">
            {endorsement.name.charAt(0)}
          </span>
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col gap-0.5 min-w-0">
        <span className="font-archivo text-sm font-black uppercase text-text-light dark:text-text-dark truncate">
          {endorsement.name}
        </span>
        {endorsement.title && (
          <span className="font-inter text-xs text-muted-light dark:text-muted-dark truncate">{endorsement.title}</span>
        )}
        {endorsement.organization && (
          <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-primary-light dark:text-primary-dark truncate">
            {endorsement.organization}
          </span>
        )}
      </div>
    </motion.div>
  )
}
