'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import prisma from '@/prisma/client'
import { getActor } from '../../auth/getActor'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'

export async function deleteUser(id: string) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    if (!id) {
      return { success: false, error: 'User ID is required.' }
    }

    const user = await prisma.user.findUnique({
      where: { id },
      select: { firstName: true, lastName: true, email: true, role: true }
    })

    if (!user) {
      return { success: false, error: 'User not found.' }
    }

    await prisma.user.delete({ where: { id } })

    const message = buildLogMessage(`deleted user ${user.firstName} ${user.lastName} (${user.email})`, actor, context)
    await createLog('info', message, {
      deletedUserId: id,
      email: user.email,
      role: user.role,
      ...context
    })

    return { success: true }
  } catch (error) {
    const message = buildLogMessage(`failed to delete user (${id})`, actor, context)
    await createLog('error', message, {
      userId: id,
      error: error instanceof Error ? error.message : String(error),
      ...context
    })

    return { success: false, error: 'Failed to delete user.' }
  }
}
