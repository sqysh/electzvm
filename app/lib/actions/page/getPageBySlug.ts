'use server'

import prisma from '@/prisma/client'

export async function getPageBySlug(slug: string) {
  try {
    const page = await prisma.page.findUnique({ where: { slug } })
    if (!page) return { success: false, error: 'Page not found.' }
    return { success: true, data: page }
  } catch (error) {
    console.error('[getPageBySlug]', error)
    return { success: false, error: 'Failed to fetch page.' }
  }
}
