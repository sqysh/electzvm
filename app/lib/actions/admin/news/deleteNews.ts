'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import { getActor } from '../../auth/getActor'
import prisma from '@/prisma/client'
import { createLog } from '../../_infra/createLog'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'

export async function deleteNews(id: string) {
  if (!id) return { success: false, error: 'Article ID is required.' }

  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    const existing = await prisma.news.findUnique({ where: { id } })
    if (!existing) return { success: false, error: 'Article not found.' }

    await prisma.news.delete({ where: { id } })

    await createLog('info', buildLogMessage(`deleted news article "${existing.title}"`, actor, context), {
      articleId: id,
      ...context
    }).catch(() => null)

    return { success: true }
  } catch (error) {
    await createLog('error', buildLogMessage('failed to delete news article', actor, context), {
      error: error instanceof Error ? error.message : String(error),
      ...context
    }).catch(() => null)
    return { success: false, error: 'Failed to delete article.' }
  }
}
