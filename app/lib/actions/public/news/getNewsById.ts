import prisma from '@/prisma/client'

export async function getNewsById(id: string) {
  try {
    if (!id) {
      return { success: false, error: 'Article ID is required.' }
    }

    const article = await prisma.news.findUnique({ where: { id } })

    if (!article) {
      return { success: false, error: 'Article not found.' }
    }

    return { success: true, data: article }
  } catch (error) {
    return { success: false, error: 'Failed to fetch article.' }
  }
}
