import { getServerSideSitemap } from 'next-sitemap'

// posts collection does not exist in this project — return empty sitemap
export async function GET() {
  return getServerSideSitemap([])
}
