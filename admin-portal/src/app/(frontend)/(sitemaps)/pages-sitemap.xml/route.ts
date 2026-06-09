import { getServerSideSitemap } from 'next-sitemap'
import { getPayload } from 'payload'
import config from '@payload-config'
import { unstable_cache } from 'next/cache'

const getPortfolioSitemap = unstable_cache(
  async () => {
    const payload = await getPayload({ config })
    const SITE_URL =
      process.env.NEXT_PUBLIC_SERVER_URL ||
      (process.env.VERCEL_PROJECT_PRODUCTION_URL
        ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
        : 'https://example.com')

    const dateFallback = new Date().toISOString()

    // Root locale pages
    const localePages = ['ru', 'en'].map((locale) => ({
      loc: `${SITE_URL}/${locale}`,
      lastmod: dateFallback,
    }))

    // Published case pages
    const { docs: cases } = await payload.find({
      collection: 'cases',
      overrideAccess: false,
      depth: 0,
      limit: 1000,
      pagination: false,
      where: {
        and: [
          { enabled: { equals: true } },
          { password_required: { not_equals: true } },
        ],
      },
      select: { slug: true, updatedAt: true },
    })

    const casePages = ['ru', 'en'].flatMap((locale) =>
      cases.map((c) => ({
        loc: `${SITE_URL}/${locale}/cases/${c.slug}`,
        lastmod: c.updatedAt || dateFallback,
      })),
    )

    return [...localePages, ...casePages]
  },
  ['portfolio-sitemap'],
  { tags: ['portfolio-sitemap'] },
)

export async function GET() {
  const sitemap = await getPortfolioSitemap()
  return getServerSideSitemap(sitemap)
}
