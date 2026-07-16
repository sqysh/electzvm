import { EventStatus } from '@prisma/client'

export interface EventPayload {
  title: string
  description?: string
  location?: string
  address?: string
  startDate: string
  endDate?: string
  isPublished?: boolean
  isFeatured?: boolean
  status?: EventStatus
  imageUrl?: string
  externalUrl?: string
}
