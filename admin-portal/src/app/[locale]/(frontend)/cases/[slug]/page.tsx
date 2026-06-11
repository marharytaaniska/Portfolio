export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { cookies } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Locale } from '@/i18n/routing'
import { routing } from '@/i18n/routing'

import { CasePageShell } from './page.client'
import type { NavData } from '../../page.client'
import { CaseDetailContent } from '@/components/CaseDetail'
import { PasswordGatePage } from '@/components/PasswordGatePage'
import type { Case, Contact } from '@/payload-types'

type Args = { params: Promise<{ locale: Locale; slug: string }> }

export default async function CasePage({ params: paramsPromise }: Args) {
  const { locale, slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const loc = locale

  const [{ docs }, contacts, headerGlobal, caseDetailPageGlobal, caseAccessGlobal] =
    await Promise.all([
      payload.find({
        collection: 'cases',
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
        locale: loc,
      }),
      payload.findGlobal({ slug: 'contacts', locale: loc }),
      payload.findGlobal({ slug: 'header', locale: loc }),
      payload.findGlobal({ slug: 'case-detail-page', locale: loc }),
      payload.findGlobal({ slug: 'case-access', locale: loc }),
    ])

  const caseDoc = docs[0] as Case | undefined
  if (!caseDoc || (caseDoc as any).enabled === false) return notFound()

  const h = headerGlobal as any
  const navData: NavData = {
    cvLabel: h?.header?.cv_label ?? undefined,
    cvUrl: h?.header?.cv_url ?? undefined,
    copyEmailLabel: h?.header?.copy_email_label ?? undefined,
    copyEmailText: h?.header?.copy_email_text ?? undefined,
    copyEmailSuccess: h?.header?.copy_email_success ?? undefined,
    leftMenuItems: (h?.left_menu?.items ?? []).map((item: any) => ({
      label: item.label ?? '',
      anchor: item.anchor ?? '',
    })),
  }

  // Server-side password gate for direct URL access
  if ((caseDoc as any).password_required) {
    const cookieStore = await cookies()
    const accessCookie = cookieStore.get(`case_access_${slug}`)
    if (!accessCookie || accessCookie.value !== 'granted') {
      const ca = caseAccessGlobal as any
      const gateLabels = {
        modalTitle: ca?.modal_title ?? undefined,
        passwordPlaceholder: ca?.password_placeholder ?? undefined,
        continueButtonLabel: ca?.continue_button_label ?? undefined,
        invalidPasswordError: ca?.invalid_password_error ?? undefined,
      }
      return (
        <CasePageShell navData={navData}>
          <PasswordGatePage slug={slug} locale={locale} labels={gateLabels} />
        </CasePageShell>
      )
    }
  }

  const cdp = caseDetailPageGlobal as any
  const caseLabels = {
    client: cdp?.label_client ?? undefined,
    services: cdp?.label_services ?? undefined,
    industries: cdp?.label_industries ?? undefined,
    date: cdp?.label_date ?? undefined,
    back: cdp?.back_label ?? undefined,
  }
  const relatedCasesTitle: string = cdp?.related_cases_title ?? 'Related Cases'
  const relatedCasesDescription = cdp?.related_cases_description ?? null
  const relatedCasesButtonLabel: string | undefined = cdp?.related_cases_button_label ?? undefined
  const relatedCasesButtonUrl: string | undefined = cdp?.related_cases_button_url ?? undefined
  const relatedCases = ((caseDoc as any).related_cases ?? []).filter(
    (c: unknown): c is NonNullable<typeof c> => typeof c === 'object' && c !== null,
  )

  const ca = caseAccessGlobal as any
  const caseAccessLabels = {
    modalTitle: ca?.modal_title ?? undefined,
    passwordPlaceholder: ca?.password_placeholder ?? undefined,
    continueButtonLabel: ca?.continue_button_label ?? undefined,
    invalidPasswordError: ca?.invalid_password_error ?? undefined,
  }

  return (
    <CasePageShell navData={navData}>
      <CaseDetailContent
        caseDoc={caseDoc}
        contacts={contacts as Contact}
        labels={caseLabels}
        relatedCases={relatedCases}
        relatedCasesTitle={relatedCasesTitle}
        relatedCasesDescription={relatedCasesDescription}
        relatedCasesButtonLabel={relatedCasesButtonLabel}
        relatedCasesButtonUrl={relatedCasesButtonUrl}
        caseAccessLabels={caseAccessLabels}
      />
    </CasePageShell>
  )
}

