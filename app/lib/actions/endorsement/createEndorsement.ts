'use server'

import prisma from '@/prisma/client'
import { buildLogMessage, createLog, getRequestContext } from '../../utils/log.utils'
import { getActor } from '../user/getActor'

export async function createEndorsement(data: {
  name: string
  title?: string
  organization?: string
  imageUrl?: string
  isPublished?: boolean
}) {
  const [context, actor] = await Promise.all([getRequestContext(), getActor()])

  try {
    if (!data.name.trim()) return { success: false, error: 'Name is required.' }

    const endorsement = await prisma.endorsement.create({
      data: {
        name: data.name.trim(),
        title: data.title?.trim() || null,
        organization: data.organization?.trim() || null,
        imageUrl: data.imageUrl?.trim() || null,
        isPublished: data.isPublished ?? false
      }
    })

    const message = await buildLogMessage(`created endorsement from ${endorsement.name}`, actor, context)
    await createLog('info', message, { endorsementId: endorsement.id, ...context })

    return { success: true, data: endorsement }
  } catch (error) {
    console.error('[createEndorsement]', error)
    const message = await buildLogMessage(`failed to create endorsement`, actor, context)
    await createLog('error', message, { error: error instanceof Error ? error.message : String(error), ...context })
    return { success: false, error: 'Failed to create endorsement.' }
  }
}
