import { auth } from './app/lib/auth'
import { NextResponse } from 'next/server'

type UserRole = 'ADMIN' | 'SUPER_USER'

export const proxy = auth(function middleware(req) {
  const { pathname } = req.nextUrl
  const session = req.auth
  const user = session?.user
  const role = user?.role as UserRole | undefined

  // Auth page — redirect if already signed in
  if (pathname === '/login') {
    if (user && role && (role === 'ADMIN' || role === 'SUPER_USER')) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }
    return NextResponse.next()
  }

  // Protected routes
  if (pathname.startsWith('/dashboard')) {
    if (!user || !role) {
      const loginUrl = new URL('/login', req.url)
      loginUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(loginUrl)
    }
    if (role !== 'ADMIN' && role !== 'SUPER_USER') {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/dashboard/:path*', '/login']
}
