'use server'

import prisma from '@/prisma/client'
import { revalidateTag } from 'next/cache'
import { buildLogMessage, createLog, getRequestContext } from '../../utils/log.utils'
import { getActor } from '../user/getActor'

export async function updatePageContent(pageId: string, content: string | any[]) {
  if (!pageId) return { success: false, error: 'Page ID is required' }
  if (!content?.length) return { success: false, error: 'Content is required' }

  const [actor, context] = await Promise.all([getActor(), getRequestContext()])

  const page = await prisma.page
    .update({
      where: { id: pageId },
      data: { content }
    })
    .catch(() => null)

  if (!page) return { success: false, error: 'Failed to save page content' }

  await createLog('info', await buildLogMessage(`updated page content for "${page.slug}"`, actor, context), {
    pageId: page.id,
    slug: page.slug,
    fieldCount: Array.isArray(content) ? content.length : null,
    updatedBy: actor,
    request: context
  }).catch(() => null)

  revalidateTag('dashboard', 'default')

  return { success: true, data: page }
}
