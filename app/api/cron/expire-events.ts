import { syncEventStatuses } from '@/app/lib/actions/_infra/syncEventStatus'
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  const auth = req.headers.get('authorization')
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await syncEventStatuses()

  return new Response(null, { status: 204 })
}
