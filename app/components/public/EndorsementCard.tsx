import { Endorsement } from '@/types/endorsement.types'
import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/constants/motion.constants'
import Picture from '../elements/Picture'

export function EndorsementCard({ endorsement, index }: { endorsement: Endorsement; index: number }) {
  return (
    <motion.div
      {...fadeUp(0.1 + (index % 6) * 0.05)}
      className="flex flex-col border border-border-light dark:border-border-dark bg-surface-light dark:bg-surface-dark hover:border-primary-light dark:hover:border-primary-dark transition-colors duration-200 overflow-hidden"
    >
      {/* Photo */}
      {endorsement.imageUrl ? (
        <div className="relative w-full aspect-square overflow-hidden">
          <Picture
            priority
            fill
            src={endorsement.imageUrl}
            alt={endorsement.name}
            className="object-cover object-top"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
        <div className="w-full aspect-square flex items-center justify-center bg-primary-light/10 dark:bg-primary-dark/10 border-b border-border-light dark:border-border-dark">
          <span className="font-archivo text-6xl font-black text-primary-light dark:text-primary-dark uppercase leading-none">
            {endorsement.name.charAt(0)}
          </span>
        </div>
      )}

      {/* Info */}
      <div className="flex flex-col gap-1 p-4">
        <span className="font-archivo text-sm font-black uppercase text-text-light dark:text-text-dark">
          {endorsement.name}
        </span>
        {endorsement.title && (
          <span className="font-inter text-xs text-muted-light dark:text-muted-dark">{endorsement.title}</span>
        )}
        {endorsement.organization && (
          <span className="font-archivo text-[10px] tracking-[0.15em] uppercase text-primary-light dark:text-primary-dark">
            {endorsement.organization}
          </span>
        )}
      </div>
    </motion.div>
  )
}
