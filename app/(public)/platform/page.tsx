import { getPageBySlug } from '@/app/lib/actions/public/page/getPageBySlug'
import PlatformClient from './PlatformClient'
import { PageField } from '@/types/page.types'

export default async function PlatformPage() {
  const result = await getPageBySlug('platform')
  const content = result.success ? ((result.data?.content as unknown as PageField[]) ?? []) : []
  return <PlatformClient content={content} />
}
