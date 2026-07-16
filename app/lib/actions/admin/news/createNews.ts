'use server'

import prisma from '@/prisma/client'
import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { getActor } from '../../auth/getActor'
import { NewsInput } from '@/types/news.types'
import { createLog } from '../../_infra/createLog'

export async function createNews(data: NewsInput) {
  if (!data.title?.trim()) return { success: false, error: 'Title is required.' }

  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    const article = await prisma.news.create({
      data: {
        title: data.title.trim(),
        excerpt: data.excerpt?.trim() ?? '',
        body: data.body?.trim() ?? '',
        imageUrl: data.imageUrl?.trim() ?? '',
        imageFilename: data.imageFilename?.trim() ?? '',
        externalLink: data.externalLink?.trim() ?? '',
        isPublished: data.isPublished ?? false
      }
    })

    await createLog('info', buildLogMessage(`created news article "${article.title}"`, actor, context), {
      articleId: article.id,
      ...context
    }).catch(() => null)

    return { success: true, data: article }
  } catch (error) {
    await createLog('error', buildLogMessage('failed to create news article', actor, context), {
      error: error instanceof Error ? error.message : String(error),
      ...context
    }).catch(() => null)
    return { success: false, error: 'Failed to create article.' }
  }
}
