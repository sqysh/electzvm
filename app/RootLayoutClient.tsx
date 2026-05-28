'use client'

import { Provider } from 'react-redux'
import { store } from './lib/redux/store'
import { usePathname } from 'next/navigation'
import { Footer } from './components/Footer'
import { ThemeProvider } from './lib/providers/theme'
import { AdminBar } from './components/AdminBar'
import { SessionProvider } from 'next-auth/react'
import KickoffModal from './components/KickoffModal'

interface Props {
  children: React.ReactNode
  session: any
}

const showLink = (path: string) => !['/dashboard', '/login', '/auth/error'].some((str) => path.includes(str))

// RootLayoutClient
export default function RootLayoutClient({ children, session }: Props) {
  const pathname = usePathname()

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SessionProvider session={session}>
          <KickoffModal />
          {showLink(pathname) && <AdminBar />}
          {children}
          {showLink(pathname) && <Footer />}
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  )
}
