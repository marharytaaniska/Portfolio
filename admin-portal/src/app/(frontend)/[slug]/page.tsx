import { notFound } from 'next/navigation'

type Args = {
  params: Promise<{ slug?: string }>
}

export default async function SlugPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  if (slug) return notFound()
  return notFound()
}

export async function generateStaticParams() {
  return []
}