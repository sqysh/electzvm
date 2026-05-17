import { cookies } from 'next/headers'
import PublicIntro from '@/app/components/PublicIntro'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const seen = cookieStore.has('zvm-intro-seen')

  return (
    <>
      <PublicIntro seen={seen} />
      {children}
    </>
  )
}
