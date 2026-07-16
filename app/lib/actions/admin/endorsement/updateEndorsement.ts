'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import prisma from '@/prisma/client'
import { getActor } from '../../auth/getActor'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'

export async function updateEndorsement(
  id: string,
  data: {
    name?: string
    title?: string
    organization?: string
    imageUrl?: string
    isPublished?: boolean
  }
) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    if (!id) return { success: false, error: 'Endorsement ID is required.' }

    const endorsement = await prisma.endorsement.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name.trim() }),
        title: data.title?.trim() || null,
        organization: data.organization?.trim() || null,
        imageUrl: data.imageUrl?.trim() || null,
        ...(data.isPublished !== undefined && { isPublished: data.isPublished })
      }
    })

    const message = buildLogMessage(`updated endorsement from ${endorsement.name}`, actor, context)
    await createLog('info', message, { endorsementId: id, ...context })

    return { success: true, data: endorsement }
  } catch (error) {
    const message = buildLogMessage(`failed to update endorsement (${id})`, actor, context)
    await createLog('error', message, { error: error instanceof Error ? error.message : String(error), ...context })
    return { success: false, error: 'Failed to update endorsement.' }
  }
}
