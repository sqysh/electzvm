'use client'

import { useEffect } from 'react'
import Pusher from 'pusher-js'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    })

    // Store on window so both pages can access the same instance
    ;(window as any).__pusher = pusher

    return () => {
      pusher.disconnect()
      delete (window as any).__pusher
    }
  }, [])

  return <>{children}</>
}
