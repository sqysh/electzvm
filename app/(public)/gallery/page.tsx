import { getPageBySlug } from '@/app/lib/actions/page/getPageBySlug'
import { GalleryClient } from './GalleryClient'
import { PageField } from '@/types/page.types'

export default async function GalleryPage() {
  const [result] = await Promise.all([getPageBySlug('gallery')])
  const content = result.success ? ((result.data?.content as unknown as PageField[]) ?? []) : []
  return <GalleryClient content={content} />
}
