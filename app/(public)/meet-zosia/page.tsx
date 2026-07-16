import { getPageBySlug } from '@/app/lib/actions/public/page/getPageBySlug'
import { MeetZosiaClient } from './MeetZosiaClient'
import { PageField } from '@/types/page.types'

export default async function MeetZosiaPage() {
  const result = await getPageBySlug('meet-zosia')
  const content = result.success ? ((result.data?.content as unknown as PageField[]) ?? []) : []
  return <MeetZosiaClient content={content} />
}
