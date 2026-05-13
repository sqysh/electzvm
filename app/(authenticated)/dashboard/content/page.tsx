import prisma from '@/prisma/client'
import PageContentEditorClient from './PageContentEditorClient'

export default async function PageContentEditorPage({ searchParams }: { searchParams: Promise<{ slug: string }> }) {
  const { slug } = await searchParams
  const pages = await prisma.page
    .findMany({
      orderBy: { slug: 'asc' }
    })
    .catch(() => [])

  return <PageContentEditorClient pages={pages} slug={slug} />
}
