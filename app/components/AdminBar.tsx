'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { LayoutDashboard } from 'lucide-react'

export function AdminBar() {
  const { data: session } = useSession()

  if (!session?.user) return null

  return (
    <div className="relative z-30 w-full bg-primary-light dark:bg-primary-dark h-8 flex items-center justify-between px-5 sm:px-8 md:px-16">
      <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-white/60">
        Logged in as <span className="text-white">{session.user.name ?? session.user.email}</span>
      </span>
      <Link
        href="/dashboard"
        aria-label="Go to admin dashboard"
        className="flex items-center gap-1.5 font-archivo text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <LayoutDashboard className="w-3 h-3" aria-hidden="true" />
        Dashboard →
      </Link>
    </div>
  )
}
