import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Locale } from '@/i18n/routing'

import { PageShell } from './page.client'
import { HeroSection } from '@/components/HeroSection'
import { CasesSection } from '@/components/CasesSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { BackgroundSection } from '@/components/BackgroundSection'
import { ExperienceSection } from '@/components/ExperienceSection'
import { ContactsSection } from '@/components/ContactsSection'

type Args = { params: Promise<{ locale: Locale }> }

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
    siteSettings,
  ] = await Promise.all([
    payload.findGlobal({ slug: 'hero', depth: 2, locale: loc }),
    payload.findGlobal({ slug: 'testimonials-section', locale: loc }),
    payload.findGlobal({ slug: 'background', depth: 2, locale: loc }),
    payload.findGlobal({ slug: 'contacts', locale: loc }),
    payload.findGlobal({ slug: 'experience-section', locale: loc }),
    payload.findGlobal({ slug: 'relevant-cases-section', locale: loc }),
    payload.findGlobal({ slug: 'site-settings' }),
  ])

  const [
    { docs: tags },
    { docs: cases, totalDocs: totalCases },
    { docs: testimonials },
    { docs: experiences },
  ] = await Promise.all([
    payload.find({ collection: 'tags', limit: 100, sort: 'order', locale: loc }),
    payload.find({ collection: 'cases', limit: 100, sort: 'order', depth: 2, locale: loc }),
    payload.find({ collection: 'testimonials', limit: 100, sort: 'order', locale: loc }),
    payload.find({ collection: 'experience', limit: 100, sort: 'order', depth: 2, locale: loc }),
  ])

  const cvUrl = siteSettings.cv_url ?? '/cv'
  const contactEmail = siteSettings.contact_email ?? ''

  return (
    <PageShell cvUrl={cvUrl} contactEmail={contactEmail}>
      <HeroSection data={hero} />

      <hr className="divider-solid" />

      <CasesSection
        cases={cases}
        totalCases={totalCases}
        tags={tags}
        sectionTitle={(relevantCasesSection as any).section_title ?? 'Cases'}
      />

      <hr className="divider-solid" />

      <TestimonialsSection testimonials={testimonials} section={testimonialsSection} />

      <hr className="divider-solid" />

      <BackgroundSection background={background} />

      <hr className="divider-solid" />

      <ExperienceSection section={experienceSection} experiences={experiences} />

      <hr className="divider-solid" />

      <ContactsSection data={contacts} contactEmail={contactEmail} />
    </PageShell>
  )
}
