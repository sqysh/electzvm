'use client'

import { Provider } from 'react-redux'
import { store } from './lib/redux/store'

interface Props {
  children: React.ReactNode
}

export default function RootLayoutClient({ children }: Props) {
//   const pathname = usePathname()

//   const showFooter = useMemo(() => toggleHeaderFooter(pathname), [pathname])
//   const showHeader = useMemo(() => toggleHeaderFooter(pathname), [pathname])

  return (
    <Provider store={store}>
      <div className="main-content">
        {/* <NavigationDrawer  /> */}

        {/* {showHeader && <Header  />} */}
        {children}
        {/* {showFooter && <Footer data={footerData} />} */}
      </div>
    </Provider>
  )
}
