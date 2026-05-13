import { prisma } from '@/prisma/client'
import { HomeClient } from './HomeClient'

export default async function HomePage() {
  const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } })
  return <HomeClient news={news} />
}
