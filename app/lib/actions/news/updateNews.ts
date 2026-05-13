import prisma from '@/prisma/client'
import { NewsInput } from '@/types/news.types'

export async function updateNews(id: string, data: Partial<NewsInput>) {
  try {
    if (!id) {
      return { success: false, error: 'Article ID is required.' }
    }

    const article = await prisma.news.update({
      where: { id },
      data: {
        ...(data.title !== undefined && { title: data.title.trim() }),
        ...(data.excerpt !== undefined && { excerpt: data.excerpt.trim() }),
        ...(data.body !== undefined && { body: data.body.trim() }),
        ...(data.imageUrl !== undefined && { imageUrl: data.imageUrl.trim() }),
        ...(data.imageFilename !== undefined && { imageFilename: data.imageFilename.trim() }),
        ...(data.externalLink !== undefined && { externalLink: data.externalLink.trim() }),
        ...(data.isPublished !== undefined && { isPublished: data.isPublished })
      }
    })

    return { success: true, data: article }
  } catch (error) {
    console.error('[updateNews]', error)
    return { success: false, error: 'Failed to update article.' }
  }
}
