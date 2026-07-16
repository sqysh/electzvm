'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import prisma from '@/prisma/client'
import { getActor } from '../../auth/getActor'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'
import { pusher } from '@/app/lib/pusher/pusher'

export async function deleteCanvassPin(id: string) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    const pin = await prisma.canvassPin.findUnique({
      where: { id },
      select: { address: true, status: true, doors: true }
    })

    if (!pin) return { success: false, error: 'Pin not found.' }

    await prisma.canvassPin.delete({ where: { id } })

    const message = buildLogMessage(
      `deleted canvass pin at ${pin.address ?? id} (${pin.status} · ${pin.doors} doors)`,
      actor,
      context
    )
    await createLog('info', message, { deletedId: id, ...pin, ...context })

    await pusher.trigger('canvass', 'pin-deleted', { id })

    return { success: true }
  } catch (error) {
    const message = buildLogMessage(`failed to delete canvass pin (${id})`, actor, context)
    await createLog('error', message, { id, error: error instanceof Error ? error.message : String(error), ...context })
    return { success: false, error: 'Failed to delete pin.' }
  }
}
