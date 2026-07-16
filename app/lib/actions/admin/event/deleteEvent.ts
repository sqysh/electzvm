'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import { getActor } from '../../auth/getActor'
import prisma from '@/prisma/client'
import { buildLogMessage, getErrorMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'

export async function deleteEvent(id: string) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    const existing = await prisma.event.findUnique({ where: { id } })
    if (!existing) return { success: false, error: 'Event not found.' }

    await prisma.event.delete({ where: { id } })

    const message = buildLogMessage(`deleted event "${existing.title}"`, actor, context)
    await createLog('info', message, { eventId: id, ...context }).catch(() => null)

    return { success: true }
  } catch (error) {
    const message = buildLogMessage(`failed to delete event ${id}`, actor, context)
    await createLog('error', message, { error: getErrorMessage(error), ...context }).catch(() => null)
    return { success: false, error: 'Failed to delete event.' }
  }
}
