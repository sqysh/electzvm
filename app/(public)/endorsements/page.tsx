import prisma from '@/prisma/client'
import { getPageBySlug } from '@/app/lib/actions/public/page/getPageBySlug'
import { PageField } from '@/types/page.types'
import EndorsementsClient from './EndorsementsClients'

export default async function EndorsementsPage() {
  const [pageResult, endorsements] = await Promise.all([
    getPageBySlug('endorsements'),
    prisma.endorsement.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' }
    })
  ])

  const content = pageResult.success ? ((pageResult.data?.content as unknown as PageField[]) ?? []) : []

  return <EndorsementsClient endorsements={endorsements} content={content} />
}
