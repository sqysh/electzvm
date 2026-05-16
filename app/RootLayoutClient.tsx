'use client'

import { Provider } from 'react-redux'
import { store } from './lib/redux/store'
import { usePathname } from 'next/navigation'
import { Footer } from './components/Footer'
import { ThemeProvider } from './lib/providers/theme'

interface Props {
  children: React.ReactNode
}

const showLink = (path: string) => !['/dashboard', '/login', '/auth/error'].some((str) => path.includes(str))

export default function RootLayoutClient({ children }: Props) {
  const pathname = usePathname()

  return (
    <Provider store={store}>
      <ThemeProvider>
        {children}
        {showLink(pathname) && <Footer />}
      </ThemeProvider>
    </Provider>
  )
}
