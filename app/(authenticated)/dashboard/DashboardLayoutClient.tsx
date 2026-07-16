'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import Pusher from 'pusher-js'

const PusherContext = createContext<Pusher | null>(null)

export function usePusher() {
  return useContext(PusherContext)
}

export default function DashboardLayoutClient({ children }: { children: React.ReactNode }) {
  const [pusher, setPusher] = useState<Pusher | null>(null)

  useEffect(() => {
    const instance = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!
    })
    setTimeout(() => setPusher(instance), 0)

    return () => {
      instance.disconnect()
    }
  }, [])

  return <PusherContext.Provider value={pusher}>{children}</PusherContext.Provider>
}
