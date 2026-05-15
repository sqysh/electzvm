import { prisma } from '@/prisma/client'
import AdminNewsClient from './AdminNewsClient'

export default async function NewsPage() {
  const news = await prisma.news.findMany({ orderBy: { createdAt: 'desc' } })
  return <AdminNewsClient news={news} />
}
