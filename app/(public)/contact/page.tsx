import { getPageBySlug } from '@/app/lib/actions/page/getPageBySlug'
import ContactClient from './ContactClient'
import { PageField } from '@/types/page.types'

export default async function ContactPage() {
  const result = await getPageBySlug('contact')
  const content = result.success ? ((result.data?.content as unknown as PageField[]) ?? []) : []
  return <ContactClient content={content} />
}
