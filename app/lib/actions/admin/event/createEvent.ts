'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import { EventPayload } from '@/types/event.types'
import { getActor } from '../../auth/getActor'
import prisma from '@/prisma/client'
import { EventStatus } from '@prisma/client'
import { buildLogMessage, getErrorMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'

export async function createEvent(data: EventPayload) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    if (!data.title?.trim()) return { success: false, error: 'Title is required.' }
    if (!data.startDate) return { success: false, error: 'Start date is required.' }

    const event = await prisma.event.create({
      data: {
        title: data.title.trim(),
        description: data.description?.trim() || null,
        location: data.location?.trim() || null,
        address: data.address?.trim() || null,
        startDate: new Date(data.startDate),
        endDate: data.endDate ? new Date(data.endDate) : null,
        isPublished: data.isPublished ?? false,
        isFeatured: data.isFeatured ?? false,
        status: data.status ?? ('DRAFT' as EventStatus),
        imageUrl: data.imageUrl?.trim() || null,
        externalUrl: data.externalUrl?.trim() || null
      }
    })

    const message = buildLogMessage(`created event "${event.title}"`, actor, context)
    await createLog('info', message, { eventId: event.id, ...context }).catch(() => null)

    return { success: true, data: event }
  } catch (error) {
    const message = buildLogMessage('failed to create event', actor, context)
    await createLog('error', message, {
      error: getErrorMessage(error),
      ...context
    }).catch(() => null)
    return { success: false, error: 'Failed to create event.' }
  }
}
