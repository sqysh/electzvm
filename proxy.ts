import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './app/lib/auth'

// ─── Role config ──────────────────────────────────────────────────────────────

type UserRole = 'ADMIN' | 'SUPER_USER'

const DASHBOARDS: Record<UserRole, string> = {
  ADMIN: '/dashboard',
  SUPER_USER: '/super'
}

function getDashboard(role: UserRole) {
  return DASHBOARDS[role] ?? '/login'
}

// ─── Route config ─────────────────────────────────────────────────────────────

const ROUTE_ACCESS: {
  prefix: string
  allowedRoles: UserRole[]
}[] = [
  { prefix: '/super', allowedRoles: ['SUPER_USER'] },
  { prefix: '/dashboard', allowedRoles: ['ADMIN', 'SUPER_USER'] }
]

// ─── Middleware ───────────────────────────────────────────────────────────────

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const session = await auth()
  const user = session?.user
  const role = user?.role as UserRole | undefined

  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next()
  }

  // ── Auth page — redirect if already signed in ──
  if (pathname === '/login') {
    if (user && role && (role === 'ADMIN' || role === 'SUPER_USER')) {
      return NextResponse.redirect(new URL(getDashboard(role), request.url))
    }
    return NextResponse.next()
  }

  // ── Protected routes ──
  const matchedRoute = ROUTE_ACCESS.find((r) => pathname.startsWith(r.prefix))

  if (matchedRoute) {
    // Not signed in — send to login
    if (!user || !role) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }

    // Role not allowed — send to login (PATRONs can't access anything)
    if (!matchedRoute.allowedRoles.includes(role)) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/:path*', '/login']
}
