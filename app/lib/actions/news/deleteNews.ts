import prisma from '@/prisma/client'

export async function deleteNews(id: string) {
  try {
    if (!id) {
      return { success: false, error: 'Article ID is required.' }
    }

    await prisma.news.delete({ where: { id } })

    return { success: true }
  } catch (error) {
    console.error('[deleteNews]', error)
    return { success: false, error: 'Failed to delete article.' }
  }
}
