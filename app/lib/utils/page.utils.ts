import { PageField } from '@/types/page.types'

export function getField(content: PageField[], id: string, fallback = '') {
  return content.find((f) => f.id === id)?.value ?? fallback
}
