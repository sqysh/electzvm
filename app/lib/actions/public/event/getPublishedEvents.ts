import prisma from '@/prisma/client'

export async function getPublishedEvents() {
  try {
    const events = await prisma.event.findMany({
      where: { isPublished: true },
      orderBy: { startDate: 'asc' }
    })
    return { success: true, data: events }
  } catch (error) {
    return { success: false, error: 'Failed to fetch published events.' }
  }
}
