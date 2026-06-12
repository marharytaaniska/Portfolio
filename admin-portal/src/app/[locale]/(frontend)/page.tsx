export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Locale } from '@/i18n/routing'
import type { Media } from '@/payload-types'

import { PageShell } from './page.client'
import type { NavData } from './page.client'
import { HeroSection } from '@/components/HeroSection'
import { CasesSection } from '@/components/CasesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { BackgroundSection } from '@/components/BackgroundSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { ContactsSection } from '@/components/ContactsSection'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { getSiteSettings } from '@/utilities/getSiteSettings'

type Args = { params: Promise<{ locale: Locale }> }

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { locale } = await params
  const isRu = locale === 'ru'

  const siteSettings = await getSiteSettings(locale)
  const ogImage = typeof siteSettings.og_image === 'object' ? (siteSettings.og_image as Media) : null

  const fallbackTitle = isRu
    ? 'Маргарита Анисько — Продуктовый и UX/UI дизайнер'
    : 'Marharyta Anisko — Product & UX/UI Designer'
  const fallbackDescription = isRu
    ? '5 лет в дизайне сложных продуктов. Структурирую хаос, создаю дизайн-системы, работаю на результат.'
    : '5 years designing complex products. Structuring chaos, building design systems, focusing on results.'

  const title = (siteSettings.og_title as string | null) || fallbackTitle
  const description = (siteSettings.og_description as string | null) || fallbackDescription

  return {
    title,
    description,
    openGraph: mergeOpenGraph({
      title,
      description,
      url: `https://www.marharytaanisko.xyz/${locale}`,
      ...(ogImage?.url
        ? { images: [{ url: ogImage.url, width: 1200, height: 630, alt: ogImage.alt ?? title }] }
        : {}),
    }),
  }
}

export default async function HomePage({ params: paramsPromise }: Args) {
  const { locale } = await paramsPromise
  const payload = await getPayload({ config: configPromise })
  const loc = locale

  const [
    hero,
    testimonialsSection,
    background,
    contacts,
    experienceSection,
    relevantCasesSection,
    headerGlobal,
    caseAccess,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'hero', depth: 2, locale: loc }),
    payload.findGlobal({ slug: 'testimonials-section', locale: loc }),
    payload.findGlobal({ slug: 'background', depth: 2, locale: loc }),
    payload.findGlobal({ slug: 'contacts', locale: loc }),
    payload.findGlobal({ slug: 'experience-section', locale: loc }),
    payload.findGlobal({ slug: 'relevant-cases-section', locale: loc }),
    payload.findGlobal({ slug: 'header', locale: loc }),
    payload.findGlobal({ slug: 'case-access', locale: loc }),
  ])

  const [
    { docs: tags },
    { docs: cases, totalDocs: totalCases },
    { docs: testimonials },
    { docs: experiences },
  ] = await Promise.all([
    payload.find({ collection: 'tags', limit: 100, sort: 'order', locale: loc }),
    payload.find({
      collection: 'cases',
      limit: 100,
      sort: 'order',
      depth: 2,
      locale: loc,
      where: { enabled: { equals: true } },
    }),
    payload.find({ collection: 'testimonials', limit: 100, sort: 'order', locale: loc }),
    payload.find({ collection: 'experience', limit: 100, sort: 'order', depth: 2, locale: loc }),
  ])

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

  const ca = caseAccess as any
  const sections: React.ReactNode[] = []

  if ((hero as any).enabled !== false) {
    sections.push(<HeroSection key="hero" data={hero} />)
  }

  if ((relevantCasesSection as any).enabled !== false) {
    sections.push(
      <CasesSection
        key="cases"
        cases={cases}
        totalCases={totalCases}
        tags={tags}
        sectionTitle={(relevantCasesSection as any).section_title ?? 'Cases'}
        allTagLabel={(relevantCasesSection as any).all_tag_label ?? undefined}
        caseAccessLabels={{
          modalTitle: ca?.modal_title ?? undefined,
          passwordPlaceholder: ca?.password_placeholder ?? undefined,
          continueButtonLabel: ca?.continue_button_label ?? undefined,
          invalidPasswordError: ca?.invalid_password_error ?? undefined,
        }}
      />,
    )
  }

  if ((testimonialsSection as any).enabled !== false) {
    sections.push(
      <TestimonialsSection
        key="reviews"
        testimonials={testimonials}
        section={testimonialsSection}
      />,
    )
  }

  if ((background as any).enabled !== false) {
    sections.push(<BackgroundSection key="background" background={background} />)
  }

  if ((experienceSection as any).enabled !== false) {
    sections.push(
      <ExperienceSection
            key="experience"
            section={experienceSection}
            experiences={experiences}
            caseAccessLabels={{
              modalTitle: ca?.modal_title ?? undefined,
              passwordPlaceholder: ca?.password_placeholder ?? undefined,
              continueButtonLabel: ca?.continue_button_label ?? undefined,
              invalidPasswordError: ca?.invalid_password_error ?? undefined,
            }}
          />,
    )
  }

  if ((contacts as any).enabled !== false) {
    sections.push(
      <ContactsSection
        key="contacts"
        data={contacts}
        contactEmail={navData.copyEmailText ?? ''}
        copyEmailLabel={navData.copyEmailLabel}
        copyEmailSuccess={navData.copyEmailSuccess}
      />,
    )
  }

  return (
    <PageShell navData={navData}>
      {sections.map((section, i) => (
        <React.Fragment key={i}>
          {i > 0 && <hr className="divider-solid" />}
          {section}
        </React.Fragment>
      ))}
    </PageShell>
  )
}
