import prisma from '@/prisma/client'

export async function getCanvassPins() {
  try {
    const pins = await prisma.canvassPin.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return { success: true, data: pins }
  } catch (error) {
    return { success: false, error: 'Failed to fetch pins.' }
  }
}
