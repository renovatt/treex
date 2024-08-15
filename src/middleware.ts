import { NextResponse, NextRequest } from 'next/server'

export default function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const token = request.cookies.get('@auth_accessToken')?.value || ''

  const isPublicPath =
    path === '/' ||
    path === '/login' ||
    path === '/register' ||
    path === '/recovery'

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.nextUrl))
  }
}

export const config = {
  matcher: [
    '/',
    '/login/:path*',
    '/register/:path*',
    '/recovery/:path*',
    '/dashboard/:path*',
    '/transactions/:path*',
    '/cripto/:path*',
    '/notes/:path*',
  ],
}
