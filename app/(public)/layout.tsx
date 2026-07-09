import PublicIntro from '@/app/components/PublicIntro'

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicIntro seen={false} />
      {children}
    </>
  )
}
