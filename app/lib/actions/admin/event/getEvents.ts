import prisma from '@/prisma/client'

export async function getEvents() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { startDate: 'asc' }
    })
    return { success: true, data: events }
  } catch (error) {
    return { success: false, error: 'Failed to fetch events.' }
  }
}
