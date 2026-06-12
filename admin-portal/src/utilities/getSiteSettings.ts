import { cache } from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const getSiteSettings = cache(async () => {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug: 'site-settings', depth: 1 })
})
