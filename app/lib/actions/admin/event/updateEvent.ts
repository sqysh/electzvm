'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import { EventPayload } from '@/types/event.types'
import { getActor } from '../../auth/getActor'
import prisma from '@/prisma/client'
import { buildLogMessage, getErrorMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'

export async function updateEvent(id: string, data: Partial<EventPayload>) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    const existing = await prisma.event.findUnique({ where: { id } })
    if (!existing) return { success: false, error: 'Event not found.' }

    const event = await prisma.event.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title.trim() }),
        ...(data.description !== undefined && { description: data.description?.trim() || null }),
        ...(data.location !== undefined && { location: data.location?.trim() || null }),
        ...(data.address !== undefined && { address: data.address?.trim() || null }),
        ...(data.startDate && { startDate: new Date(data.startDate) }),
        ...(data.endDate !== undefined && { endDate: data.endDate ? new Date(data.endDate) : null }),
        ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
        ...(data.status && { status: data.status }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl?.trim() || null }),
        ...(data.externalUrl !== undefined && { externalUrl: data.externalUrl?.trim() || null })
      }
    })

    const message = buildLogMessage(`updated event "${event.title}"`, actor, context)
    await createLog('info', message, { eventId: event.id, ...context }).catch(() => null)

    return { success: true, data: event }
  } catch (error) {
    const message = buildLogMessage(`failed to update event ${id}`, actor, context)
    await createLog('error', message, { error: getErrorMessage(error), ...context }).catch(() => null)
    return { success: false, error: 'Failed to update event.' }
  }
}
