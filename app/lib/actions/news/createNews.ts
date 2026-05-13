import prisma from '@/prisma/client'
import { NewsInput } from '@/types/news.types'

export async function createNews(data: NewsInput) {
  try {
    if (!data.title?.trim()) {
      return { success: false, error: 'Title is required.' }
    }

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

    return { success: true, data: article }
  } catch (error) {
    console.error('[createNews]', error)
    return { success: false, error: 'Failed to create article.' }
  }
}
