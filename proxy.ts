import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  if (pathname.startsWith('/dashboard') && pathname !== '/dashboard/login') {
    if (!token || token.role !== 'owner') {
      return NextResponse.redirect(new URL('/dashboard/login', request.url))
    }
  }

  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    if (!token || token.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  if (pathname.startsWith('/account/orders')) {
    if (!token || token.role !== 'customer') {
      return NextResponse.redirect(new URL('/account/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/account/orders/:path*'],
}
