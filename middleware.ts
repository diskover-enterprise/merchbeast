import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const host = request.headers.get('host') || ''
  const url = request.nextUrl.clone()

  if (host.startsWith('the1982.')) {
    // Rewrite subdomain root to the storefront
    if (url.pathname === '/') {
      url.pathname = '/shop/the-1982'
      return NextResponse.rewrite(url)
    }
    // Pass through everything else (cart, api, product pages)
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
