import { redirect } from 'next/navigation'

// Legacy route: /cases/[slug] → /ru/cases/[slug]
// The middleware handles locale-prefixed routes; this covers any direct hit.
type Args = { params: Promise<{ slug: string }> }

export default async function LegacyCasePage({ params }: Args) {
  const { slug } = await params
  redirect(`/ru/cases/${slug}`)
}
