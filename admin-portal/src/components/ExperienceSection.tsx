import type { CSSProperties } from 'react'
import type { ExperienceSection as ExperienceSectionData, Experience, Media, Case } from '@/payload-types'
import { getTranslations } from 'next-intl/server'
import RichText from '@/components/RichText'
import { MetaDot } from './LiveDot'
import type { Locale } from '@/i18n/routing'
import { ExperienceListClient } from './ExperienceListClient'
import { RelatedCasesClient } from './RelatedCasesClient'
import type { CaseAccessLabels } from './PasswordModal'

interface ExperienceSectionProps {
  section: ExperienceSectionData
  experiences: Experience[]
  locale?: Locale
  caseAccessLabels?: CaseAccessLabels
}

export async function ExperienceSection({ section, experiences, caseAccessLabels }: ExperienceSectionProps) {
  const t = await getTranslations('experience')
  const s = section.style ?? {}

  const headingColor = s.heading_color ?? 'var(--ink-900)'
  const bodyColor = s.body_color ?? 'var(--ink-600)'
  const metaColor = s.meta_color ?? 'var(--ink-400)'
  const linkColor = s.link_color ?? 'var(--ink-600)'
  const entryGap = s.entry_gap ?? 64
  const innerGap = s.inner_gap ?? 48
  const colGap = s.col_gap ?? 64
  const respRatio = s.responsibilities_ratio ?? 68
  const logoSize = s.logo_size ?? 64
  const titleSize = s.section_title_size ?? '48px'
  const bodyFontSize = s.body_font_size ?? '18px'
  const dividerStyle = s.divider_style ?? 'dashed'

  const gridTemplate = `${respRatio}fr ${100 - respRatio}fr`
  const bodyLineHeight =
    bodyFontSize === '16px' ? '24px' : bodyFontSize === '20px' ? '28px' : '26px'

  return (
    <section id="experience" className="section">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <h2 className="section-title" style={{ fontSize: titleSize }}>
          {section.section_title ?? 'Experience'}
        </h2>
        {section.section_description && (
          <div
            style={{
              maxWidth: 800,
              font: `400 ${bodyFontSize}/${bodyLineHeight} var(--font-body)`,
              color: bodyColor,
            }}
          >
            <RichText data={section.section_description} enableGutter={false} />
          </div>
        )}
      </div>

      <ExperienceListClient
        showMoreLabel={section.show_more_label ?? '+ Показать ещё'}
        collapseLabel={section.collapse_label ?? 'Свернуть'}
        entryGap={entryGap}
        dividerStyle={dividerStyle}
      >
        {experiences.map((exp, i) => {
          const logo =
            exp.company_logo && typeof exp.company_logo === 'object'
              ? (exp.company_logo as Media)
              : null
          const relatedCases = (exp.related_cases ?? []).filter(
            (c): c is Case => typeof c === 'object',
          )

          return (
            <div key={exp.id ?? i}>
              {i > 0 && dividerStyle !== 'none' && (
                <hr
                  className={dividerStyle === 'solid' ? 'divider-solid' : 'divider-dashed'}
                  style={{ marginBottom: entryGap }}
                />
              )}

              <div className="exp-entry" style={{ gap: innerGap }}>
                <div className="position-header">
                  <div
                    className="position-logo"
                    aria-hidden="true"
                    style={{
                      width: logoSize,
                      height: logoSize,
                      ...(logo?.url
                        ? {
                            backgroundImage: `url(${logo.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }
                        : {}),
                    }}
                  />
                  <div className="position-meta">
                    <h2
                      style={{
                        margin: 0,
                        font: '400 30px/36px var(--font-display)',
                        color: headingColor,
                      }}
                    >
                      {exp.position_title}
                    </h2>
                    <div className="position-tags">
                      <span
                        style={{ font: '400 16px/24px var(--font-body)', color: metaColor }}
                      >
                        {exp.company_name}
                      </span>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          font: '400 16px/24px var(--font-body)',
                          color: metaColor,
                        }}
                      >
                        <MetaDot />
                        <span>{exp.period}</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className="exp-grid"
                  style={{ gridTemplateColumns: gridTemplate, gap: colGap }}
                >
                  <div className="exp-col">
                    <h3 style={{ color: headingColor }}>
                      {exp.responsibilities_title ?? 'Responsibilities'}:
                    </h3>
                    <div
                      style={{
                        font: `400 ${bodyFontSize}/${bodyLineHeight} var(--font-body)`,
                        color: bodyColor,
                        maxWidth: 750,
                      }}
                    >
                      <RichText data={exp.responsibilities} enableGutter={false} />
                    </div>
                    {exp.links && exp.links.length > 0 && (
                      <div
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: '0 24px',
                          marginTop: 8,
                        }}
                      >
                        {exp.links.map((link, li) => {
                          const isAnchor = link.url.startsWith('#') || link.url.startsWith('/#')
                          return (
                            <a
                              key={li}
                              href={link.url}
                              {...(!isAnchor && { target: '_blank', rel: 'noopener noreferrer' })}
                              className="inline-link"
                              style={
                                {
                                  font: `400 ${bodyFontSize}/${bodyLineHeight} var(--font-body)`,
                                  '--link-color': linkColor,
                                } as CSSProperties
                              }
                            >
                              {link.label}
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {relatedCases.length > 0 && (
                    <div className="exp-col">
                      <h3 style={{ color: headingColor }}>{t('relatedCases')}:</h3>
                      <RelatedCasesClient
                        cases={relatedCases}
                        caseAccessLabels={caseAccessLabels}
                        font={`400 ${bodyFontSize}/${bodyLineHeight} var(--font-body)`}
                        linkColor={linkColor}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </ExperienceListClient>
    </section>
  )
}
