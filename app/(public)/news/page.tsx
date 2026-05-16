import { prisma } from '@/prisma/client'
import NewsClient from './NewsClient'
import { getPageBySlug } from '@/app/lib/actions/page/getPageBySlug'
import { PageField } from '@/types/page.types'

export default async function NewsPage() {
  const [result, news] = await Promise.all([
    getPageBySlug('news'),
    prisma.news.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' } })
  ])
  const content = result.success ? ((result.data?.content as unknown as PageField[]) ?? []) : []
  return <NewsClient news={news} content={content} />
}
