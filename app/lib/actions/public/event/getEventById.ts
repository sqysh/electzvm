import prisma from '@/prisma/client'

export async function getEventById(id: string) {
  try {
    const event = await prisma.event.findUnique({
      where: { id }
    })
    if (!event) return { success: false, error: 'Event not found.' }
    return { success: true, data: event }
  } catch (error) {
    return { success: false, error: 'Failed to fetch event.' }
  }
}
