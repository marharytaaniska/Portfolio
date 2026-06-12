import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const intlMiddleware = createMiddleware(routing)

export default function middleware(request: NextRequest) {
  const response = intlMiddleware(request) ?? NextResponse.next()

  const pathname = request.nextUrl.pathname
  const localeMatch = pathname.match(/^\/(ru|en)(\/|$)/)
  const locale = localeMatch ? localeMatch[1] : routing.defaultLocale

  response.headers.set('x-locale', locale)
  return response
}

export const config = {
  // Match all paths except: api/*, _next/*, admin/*, and files with extensions
  matcher: ['/((?!api|_next|admin|favicon\\.ico|.*\\.[^/]*$).*)'],
}
