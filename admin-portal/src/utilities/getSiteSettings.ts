import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Locale } from '@/i18n/routing'

export const getSiteSettings = cache(async (locale?: Locale) => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug: 'site-settings', depth: 1, locale: locale ?? 'ru' })
})
