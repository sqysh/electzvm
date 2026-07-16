'use server'

import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import prisma from '@/prisma/client'
import { createLog } from '../../_infra/createLog'
import { getActor } from '../../auth/getActor'

export async function deleteEndorsement(id: string) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    if (!id) return { success: false, error: 'Endorsement ID is required.' }

    const endorsement = await prisma.endorsement.findUnique({
      where: { id },
      select: { name: true }
    })

    if (!endorsement) return { success: false, error: 'Endorsement not found.' }

    await prisma.endorsement.delete({ where: { id } })

    const message = buildLogMessage(`deleted endorsement from ${endorsement.name}`, actor, context)
    await createLog('info', message, { deletedId: id, ...context })

    return { success: true }
  } catch (error) {
    const message = buildLogMessage(`failed to delete endorsement (${id})`, actor, context)
    await createLog('error', message, { error: error instanceof Error ? error.message : String(error), ...context })
    return { success: false, error: 'Failed to delete endorsement.' }
  }
}
