import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname } = request.nextUrl
  const betaAccess = request.cookies.get('beta_access')?.value

  if (betaAccess === 'true') return NextResponse.next()

  return NextResponse.redirect(new URL('/password', request.url))
}

export const config = {
  matcher: ['/((?!password|api/check-password|_next/static|_next/image|favicon.ico).*)'],
}
