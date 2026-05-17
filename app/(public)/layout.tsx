import PublicIntro from '@/app/components/PublicIntro'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicIntro />
      {children}
    </>
  )
}
