import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

export function middleware(request: NextRequest) {
  const response = intlMiddleware(request)

  const pathname = request.nextUrl.pathname
  const localeMatch = pathname.match(/^\/(ru|en)(\/|$)/)
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale

  const res = response ?? NextResponse.next()
  res.headers.set('x-locale', locale)
  return res
}

export const config = {
  matcher: ['/((?!_next|api|admin|favicon|.*\\..*).*)'],
}
