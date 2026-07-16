'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import prisma from '@/prisma/client'
import { NewsInput } from '@/types/news.types'
import { getActor } from '../../auth/getActor'
import { createLog } from '../../_infra/createLog'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'

export async function updateNews(id: string, data: Partial<NewsInput>) {
  if (!id) return { success: false, error: 'Article ID is required.' }

  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    const article = await prisma.news.update({
      where: { id },
      data: {
        ...(data.title && { title: data.title.trim() }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt?.trim() ?? '' }),
        ...(data.body !== undefined && { body: data.body?.trim() ?? '' }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl?.trim() ?? '' }),
        ...(data.imageFilename !== undefined && { imageFilename: data.imageFilename?.trim() ?? '' }),
        ...(data.externalLink !== undefined && { externalLink: data.externalLink?.trim() ?? '' }),
        ...(data.isPublished !== undefined && { isPublished: data.isPublished })
      }
    })

    await createLog('info', buildLogMessage(`updated news article "${article.title}"`, actor, context), {
      articleId: article.id,
      ...context
    }).catch(() => null)

    return { success: true, data: article }
  } catch (error) {
    await createLog('error', buildLogMessage('failed to update news article', actor, context), {
      error: error instanceof Error ? error.message : String(error),
      ...context
    }).catch(() => null)
    return { success: false, error: 'Failed to update article.' }
  }
}
