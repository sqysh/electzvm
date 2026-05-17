'use server'

import prisma from '@/prisma/client'
import { buildLogMessage, createLog, getRequestContext } from '../../utils/log.utils'
import { getActor } from '../user/getActor'
import { pusher } from '../../pusher'

export async function deleteCanvassPin(id: string) {
  const [context, actor] = await Promise.all([getRequestContext(), getActor()])

  try {
    const pin = await prisma.canvassPin.findUnique({
      where: { id },
      select: { address: true, status: true, doors: true }
    })

    if (!pin) return { success: false, error: 'Pin not found.' }

    await prisma.canvassPin.delete({ where: { id } })

    const message = await buildLogMessage(
      `deleted canvass pin at ${pin.address ?? id} (${pin.status} · ${pin.doors} doors)`,
      actor,
      context
    )
    await createLog('info', message, { deletedId: id, ...pin, ...context })

    await pusher.trigger('canvass', 'pin-deleted', { id })

    return { success: true }
  } catch (error) {
    console.error('[deleteCanvassPin]', error)
    const message = await buildLogMessage(`failed to delete canvass pin (${id})`, actor, context)
    await createLog('error', message, { id, error: error instanceof Error ? error.message : String(error), ...context })
    return { success: false, error: 'Failed to delete pin.' }
  }
}
