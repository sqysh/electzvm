import prisma from '@/prisma/client'
import CanvassingMapClient from './CanvassingMapClient'

export default async function CanvassingMapPage() {
  const pins = await prisma.canvassPin.findMany({
    orderBy: { createdAt: 'desc' }
  })

  return (
    <CanvassingMapClient
      initialPins={pins.map((p) => ({
        ...p,
        status: p.status as 'knocked' | 'no_answer' | 'interested' | 'hostile'
      }))}
    />
  )
}
