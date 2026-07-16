import type { Metadata } from 'next'
import EventsClient from './EventsClient'
import { auth } from '@/app/lib/auth'
import { getPublishedEvents } from '@/app/lib/actions/public/event/getPublishedEvents'

export const metadata: Metadata = {
  title: 'Events | Elect ZVM',
  description: 'Come meet Zosia VanMeter at upcoming campaign events across the 9th Essex District.'
}

export default async function EventsPage() {
  const [result, session] = await Promise.all([getPublishedEvents(), auth()])
  const events = result.success && result.data ? result.data : []

  return <EventsClient events={events} session={session} />
}
