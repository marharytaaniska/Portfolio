import type { Metadata } from 'next'
import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { Analytics } from '@vercel/analytics/next'

import { routing } from '@/i18n/routing'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getServerSideURL } from '@/utilities/getURL'
import { getSiteSettings } from '@/utilities/getSiteSettings'
import type { Media } from '@/payload-types'

import '../../(frontend)/globals.css'
import '../../(frontend)/portfolio.css'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <html
      className={cn(GeistSans.variable, GeistMono.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        {routing.locales.map((l) => (
          <link
            key={l}
            rel="alternate"
            hrefLang={l}
            href={`${getServerSideURL()}/${l}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${getServerSideURL()}/ru`} />
      </head>
      <body>
        <InitTheme />
        <Providers>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const siteSettings = await getSiteSettings(locale as any)
  const favicon = typeof siteSettings.favicon === 'object' ? (siteSettings.favicon as Media) : null

  return {
    metadataBase: new URL(getServerSideURL()),
    openGraph: mergeOpenGraph(),
    twitter: { card: 'summary_large_image' },
    icons: {
      icon: favicon?.url
        ? [{ url: favicon.url }]
        : [{ url: '/favicon.ico', sizes: '32x32' }, { url: '/favicon.svg', type: 'image/svg+xml' }],
    },
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${getServerSideURL()}/${l}`]),
      ),
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}
