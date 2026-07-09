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
}

const showLink = (path: string) => !['/dashboard', '/login', '/auth/error'].some((str) => path.includes(str))

export default function RootLayoutClient({ children }: Props) {
  const pathname = usePathname()

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SessionProvider>
          <KickoffModal />
          {showLink(pathname) && <AdminBar />}
          {children}
          {showLink(pathname) && <Footer />}
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  )
}
