'use client'

import { Provider } from 'react-redux'
import { store } from './lib/redux/store'
import { usePathname } from 'next/navigation'
import { Footer } from './components/Footer'

interface Props {
  children: React.ReactNode
}

const showLink = (path: string) => !['/dashboard', '/login', '/auth/error'].some((str) => path.includes(str))

export default function RootLayoutClient({ children }: Props) {
  const pathname = usePathname()

  return (
    <Provider store={store}>
      <div className="main-content">
        {children}
        {showLink(pathname) && <Footer />}
      </div>
    </Provider>
  )
}
