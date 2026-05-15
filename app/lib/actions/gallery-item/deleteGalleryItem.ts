'use server'

import prisma from '@/prisma/client'
import { buildLogMessage, createLog, getRequestContext } from '../../utils/log.utils'
import { getActor } from '../user/getActor'

export async function deleteGalleryItem(id: string) {
  const [context, actor] = await Promise.all([getRequestContext(), getActor()])

  try {
    if (!id) {
      return { success: false, error: 'Gallery item ID is required.' }
    }

    const item = await prisma.galleryItem.findUnique({
      where: { id },
      select: { filename: true, type: true, url: true }
    })

    if (!item) {
      return { success: false, error: 'Gallery item not found.' }
    }

    await prisma.galleryItem.delete({ where: { id } })

    const message = await buildLogMessage(`deleted ${item.type} "${item.filename}" from gallery`, actor, context)
    await createLog('info', message, {
      deletedId: id,
      filename: item.filename,
      type: item.type,
      ...context
    })

    return { success: true }
  } catch (error) {
    console.error('[deleteGalleryItem]', error)

    const message = await buildLogMessage(`failed to delete gallery item (${id})`, actor, context)
    await createLog('error', message, {
      galleryItemId: id,
      error: error instanceof Error ? error.message : String(error),
      ...context
    })

    return { success: false, error: 'Failed to delete gallery item.' }
  }
}
