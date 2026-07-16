'use client'

import { Provider } from 'react-redux'
import { store } from './lib/redux/store'
import { usePathname } from 'next/navigation'
import { Footer } from './components/public/layout/Footer'
import { ThemeProvider } from './lib/providers/theme.provider'
import { AdminBar } from './components/public/layout/AdminBar'
import { SessionProvider } from 'next-auth/react'

const showLink = (path: string) => !['/dashboard', '/login', '/auth/error'].some((str) => path.includes(str))

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <Provider store={store}>
      <ThemeProvider>
        <SessionProvider>
          {showLink(pathname) && <AdminBar />}
          {children}
          {showLink(pathname) && <Footer />}
        </SessionProvider>
      </ThemeProvider>
    </Provider>
  )
}
