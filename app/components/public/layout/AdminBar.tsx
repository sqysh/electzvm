'use client'

import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { LayoutDashboard } from 'lucide-react'

export function AdminBar() {
  const { data: session } = useSession()

  if (!session?.user) return null

  const displayName = session.user.name?.split(' ')[0] ?? session.user.email

  return (
    <div className="relative z-30 w-full bg-primary-light dark:bg-primary-dark h-8 flex items-center justify-between gap-2 px-3 sm:px-8 md:px-16">
      <span className="font-archivo text-[10px] tracking-[0.2em] uppercase text-white/60 truncate min-w-0">
        <span className="hidden xs:inline">Logged in as </span>
        <span className="text-white truncate">{displayName}</span>
      </span>
      <Link
        href="/dashboard"
        aria-label="Go to admin dashboard"
        className="flex items-center gap-1.5 font-archivo text-[10px] tracking-[0.2em] uppercase text-white/70 hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white shrink-0"
      >
        <LayoutDashboard className="w-3 h-3" aria-hidden="true" />
        <span className="hidden xs:inline">Dashboard →</span>
        <span className="xs:hidden">→</span>
      </Link>
    </div>
  )
}
