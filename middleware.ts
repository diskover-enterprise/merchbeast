import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect all /dashboard routes except /dashboard-login
  if (pathname.startsWith('/dashboard') && pathname !== '/dashboard-login') {
    const auth = request.cookies.get('mb-dashboard-auth')
    if (!auth) {
      return NextResponse.redirect(new URL('/dashboard-login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*'],
}
