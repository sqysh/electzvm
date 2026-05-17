'use server'

import prisma from '@/prisma/client'
import { buildLogMessage, createLog, getRequestContext } from '../../utils/log.utils'
import { getActor } from '../user/getActor'

export async function deleteEndorsement(id: string) {
  const [context, actor] = await Promise.all([getRequestContext(), getActor()])

  try {
    if (!id) return { success: false, error: 'Endorsement ID is required.' }

    const endorsement = await prisma.endorsement.findUnique({
      where: { id },
      select: { name: true }
    })

    if (!endorsement) return { success: false, error: 'Endorsement not found.' }

    await prisma.endorsement.delete({ where: { id } })

    const message = await buildLogMessage(`deleted endorsement from ${endorsement.name}`, actor, context)
    await createLog('info', message, { deletedId: id, ...context })

    return { success: true }
  } catch (error) {
    console.error('[deleteEndorsement]', error)
    const message = await buildLogMessage(`failed to delete endorsement (${id})`, actor, context)
    await createLog('error', message, { error: error instanceof Error ? error.message : String(error), ...context })
    return { success: false, error: 'Failed to delete endorsement.' }
  }
}
