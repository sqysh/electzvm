// app/lib/actions/events/syncEventStatuses.ts
'use server'

import prisma from '@/prisma/client'
import { requireAdmin } from '../auth/requireAdmin'

export async function syncEventStatuses() {
  await requireAdmin()

  const now = new Date()

  await prisma.event.updateMany({
    where: { status: 'PUBLISHED', endDate: { lt: now } },
    data: { status: 'PAST', isFeatured: false }
  })

  await prisma.event.updateMany({
    where: { isFeatured: true },
    data: { isFeatured: false }
  })

  const next = await prisma.event.findFirst({
    where: { status: 'PUBLISHED', endDate: { gte: now } },
    orderBy: { startDate: 'asc' }
  })

  if (next) {
    await prisma.event.update({
      where: { id: next.id },
      data: { isFeatured: true }
    })
  }
}
