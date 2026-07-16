'use server'

import { getRequestDetails } from '@/app/lib/utils/_log.server.utils'
import prisma from '@/prisma/client'
import { getActor } from '../../auth/getActor'
import { buildLogMessage } from '@/app/lib/utils/_log.client.utils'
import { createLog } from '../../_infra/createLog'

export async function createGalleryItem(data: { url: string; filename: string; type: 'image' | 'video' }) {
  const [context, actor] = await Promise.all([getRequestDetails(), getActor()])

  try {
    if (!data.url || !data.filename || !data.type) {
      return { success: false, error: 'URL, filename, and type are required.' }
    }

    const item = await prisma.galleryItem.create({
      data: {
        url: data.url,
        filename: data.filename,
        type: data.type
      }
    })

    const message = buildLogMessage(`uploaded ${data.type} "${data.filename}" to gallery`, actor, context)
    await createLog('info', message, {
      galleryItemId: item.id,
      filename: data.filename,
      type: data.type,
      ...context
    })

    return { success: true, data: item }
  } catch (error) {
    const message = buildLogMessage(`failed to save gallery item "${data.filename}"`, actor, context)
    await createLog('error', message, {
      filename: data.filename,
      type: data.type,
      error: error instanceof Error ? error.message : String(error),
      ...context
    })

    return { success: false, error: 'Failed to save gallery item.' }
  }
}
