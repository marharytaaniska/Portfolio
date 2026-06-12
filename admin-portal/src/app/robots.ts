import type { MetadataRoute } from 'next'
import { getServerSideURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getServerSideURL()
  return {
    rules: {
      userAgent: '*',
      disallow: '/admin/',
    },
    sitemap: [
      `${baseUrl}/sitemap.xml`,
      `${baseUrl}/pages-sitemap.xml`,
      `${baseUrl}/posts-sitemap.xml`,
    ],
  }
}
