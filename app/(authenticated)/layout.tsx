// import { redirect } from 'next/navigation'
import { auth } from '../lib/auth'
import { SessionProvider } from 'next-auth/react'
import { ReactNode } from 'react'

export default async function AuthenticatedLayout({ children }: { children: ReactNode }) {
  const session = await auth()
  // if (!session) redirect('/login')

  return <SessionProvider session={session}>{children}</SessionProvider>
}
