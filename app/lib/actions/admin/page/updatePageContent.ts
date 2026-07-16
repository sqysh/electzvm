'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import prisma from '@/prisma/client'
import { getActor } from '../../auth/getActor'
import { createLog } from '../../_infra/createLog'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { revalidatePath } from 'next/cache'

export async function updatePageContent(pageId: string, content: string | any[]) {
  if (!pageId) return { success: false, error: 'Page ID is required' }
  if (!content?.length) return { success: false, error: 'Content is required' }

  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  const page = await prisma.page
    .update({
      where: { id: pageId },
      data: { content }
    })
    .catch(() => null)

  if (!page) return { success: false, error: 'Failed to save page content' }

  await createLog('info', buildLogMessage(`updated page content for "${page.slug}"`, actor, context), {
    pageId: page.id,
    slug: page.slug,
    fieldCount: Array.isArray(content) ? content.length : null,
    updatedBy: actor,
    request: context
  }).catch(() => null)

  revalidatePath('/')
  revalidatePath(`/${page.slug}`)

  return { success: true, data: page }
}
