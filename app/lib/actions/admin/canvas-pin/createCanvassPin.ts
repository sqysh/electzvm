'use server'

import prisma from '@/prisma/client'
import { pusher } from '@/app/lib/pusher/pusher'
import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import { getActor } from '../../auth/getActor'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'

export async function createCanvassPin(data: {
  lat: number
  lng: number
  address?: string
  status: 'knocked' | 'no_answer' | 'interested' | 'hostile'
  doors: number
  notes?: string
  canvassedBy?: string
}) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    const pin = await prisma.canvassPin.create({
      data: {
        lat: data.lat,
        lng: data.lng,
        address: data.address?.trim() || null,
        status: data.status,
        doors: data.doors,
        notes: data.notes?.trim() || null,
        canvassedBy: data.canvassedBy?.trim() || null
      }
    })

    const message = buildLogMessage(
      `dropped canvass pin at ${data.address ?? `${data.lat.toFixed(4)}, ${data.lng.toFixed(4)}`} (${data.status} · ${data.doors} doors)`,
      actor,
      context
    )
    await createLog('info', message, {
      pinId: pin.id,
      status: data.status,
      doors: data.doors,
      lat: data.lat,
      lng: data.lng,
      ...context
    })

    await pusher.trigger('canvass', 'pin-added', {
      ...pin,
      createdAt: pin.createdAt.toISOString()
    })

    return { success: true, data: pin }
  } catch (error) {
    const message = buildLogMessage('failed to create canvass pin', actor, context)
    await createLog('error', message, {
      error: error instanceof Error ? error.message : String(error),
      ...context
    })

    return { success: false, error: 'Failed to save pin.' }
  }
}
