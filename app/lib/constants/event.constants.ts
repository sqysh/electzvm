import { EventStatus } from '@prisma/client'

export const STATUS_COLORS: Record<EventStatus, string> = {
  DRAFT: 'border-primary-light dark:border-primary-dark text-primary-light dark:text-primary-dark',
  PUBLISHED: 'border-secondary-light dark:border-secondary-dark text-secondary-light dark:text-secondary-dark',
  PAST: 'border-muted-light dark:border-muted-dark text-muted-light dark:text-muted-dark',
  CANCELLED: 'border-red-500 dark:border-red-400 text-red-500 dark:text-red-400'
}
