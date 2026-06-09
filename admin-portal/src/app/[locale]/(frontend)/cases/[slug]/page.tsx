import { notFound } from 'next/navigation'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Locale } from '@/i18n/routing'
import { routing } from '@/i18n/routing'

import { CasePageShell } from './page.client'
import { CaseDetailContent } from '@/components/CaseDetail'
import type { Case, Contact } from '@/payload-types'

type Args = { params: Promise<{ locale: Locale; slug: string }> }

export default async function CasePage({ params: paramsPromise }: Args) {
  const { locale, slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const loc = locale

  const [{ docs }, contacts] = await Promise.all([
    payload.find({
      collection: 'cases',
      where: { slug: { equals: slug } },
      depth: 2,
      limit: 1,
      locale: loc,
    }),
    payload.findGlobal({ slug: 'contacts', locale: loc }),
  ])

  const caseDoc = docs[0] as Case | undefined
  if (!caseDoc) return notFound()

  return (
    <CasePageShell>
      <CaseDetailContent caseDoc={caseDoc} contacts={contacts as Contact} />
    </CasePageShell>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({ collection: 'cases', limit: 1000, depth: 0 })

  return routing.locales.flatMap((locale) => docs.map((c) => ({ locale, slug: c.slug })))
}
