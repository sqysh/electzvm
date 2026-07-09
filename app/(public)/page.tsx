import { prisma } from '@/prisma/client'
import { HomeClient } from './HomeClient'
import { getPageBySlug } from '../lib/actions/page/getPageBySlug'
import { PageField } from '@/types/page.types'

export const revalidate = 60

export default async function HomePage() {
  const [pageResult, news] = await Promise.all([
    getPageBySlug('home'),
    prisma.news.findMany({ where: { isPublished: true }, orderBy: { createdAt: 'desc' }, take: 3 })
  ])

  const content = pageResult.success ? (pageResult.data?.content as unknown as PageField[]) : []

  return <HomeClient content={content} news={news} />
}
