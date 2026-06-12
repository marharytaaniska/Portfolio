import { unstable_cache } from 'next/cache'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Locale } from '@/i18n/routing'

const fetchSiteSettings = async (locale: Locale) => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug: 'site-settings', depth: 1, locale })
}

export const getSiteSettings = (locale: Locale = 'ru') =>
  unstable_cache(fetchSiteSettings, ['site-settings', locale], {
    revalidate: 300,
    tags: ['site-settings'],
  })(locale)
