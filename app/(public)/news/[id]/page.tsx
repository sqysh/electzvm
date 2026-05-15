import { notFound } from 'next/navigation'
import NewsDetailsClient from './NewsDetailsClient'
import { getNewsById } from '@/app/lib/actions/news/getNewsById'

export default async function NewsDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const result = await getNewsById(id)

  if (!result.success || !result.data) {
    notFound()
  }

  return <NewsDetailsClient article={result.data} />
}
