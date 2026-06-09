import type { Background, Media } from '@/payload-types'
import { Fragment } from 'react'
import { getTranslations } from 'next-intl/server'
import RichText from '@/components/RichText'
import { MetaDot } from './LiveDot'

type InlineCourse = {
  id?: string | null
  provider: string
  course_name: string
  year: number
  order?: number | null
}

type BackgroundWithCourses = Background & {
  courses_label?: string | null
  courses?: InlineCourse[] | null
}

interface BackgroundSectionProps {
  background: BackgroundWithCourses
}

export async function BackgroundSection({ background }: BackgroundSectionProps) {
  const t = await getTranslations('background')
  const edu = background.education
  const logoMedia =
    edu?.edu_image && typeof edu.edu_image === 'object' ? (edu.edu_image as Media) : null
  const courses = background.courses ?? []

  return (
    <section id="background" className="section">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <h2 className="section-title">{background.section_title}</h2>
        {background.section_description && (
          <div
            style={{
              maxWidth: 670,
              font: '400 18px/26px var(--font-body)',
              color: 'var(--ink-600)',
            }}
          >
            <RichText data={background.section_description} enableGutter={false} />
          </div>
        )}
      </div>

      <div className="bg-grid">
        {/* Education column */}
        <div className="bg-col bg-col-edu">
          <h2
            style={{
              margin: 0,
              font: '400 30px/36px var(--font-display)',
              color: 'var(--ink-900)',
            }}
          >
            {edu?.edu_label ?? t('educationFallback')}
          </h2>
          {edu && (
            <>
              <div className="position-header">
                <div
                  className="position-logo"
                  style={
                    logoMedia?.url
                      ? {
                          backgroundImage: `url(${logoMedia.url})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                        }
                      : undefined
                  }
                  aria-hidden="true"
                />
                <div className="position-meta">
                  <h2
                    style={{
                      margin: 0,
                      font: '400 24px/28px var(--font-display)',
                      color: 'var(--ink-900)',
                    }}
                  >
                    {edu.edu_university}
                  </h2>
                  <div className="position-tags">
                    <span>{edu.edu_specialty}</span>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                      <MetaDot />
                      <span>{edu.edu_year}</span>
                    </span>
                  </div>
                </div>
              </div>
              {edu.edu_description && (
                <div
                  style={{
                    maxWidth: 750,
                    font: '400 18px/26px var(--font-body)',
                    color: 'var(--ink-600)',
                  }}
                >
                  <RichText data={edu.edu_description} enableGutter={false} />
                </div>
              )}
            </>
          )}
        </div>

        {/* Courses column */}
        <div className="bg-col bg-col-courses">
          <h2
            style={{
              margin: 0,
              font: '400 30px/36px var(--font-display)',
              color: 'var(--ink-900)',
            }}
          >
            {background.courses_label ?? t('coursesFallback')}
          </h2>
          {courses.map((course, i) => (
            <Fragment key={course.id || i}>
              {i > 0 && <hr className="divider-dashed" />}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <h3
                  style={{
                    margin: 0,
                    font: '400 24px/28px var(--font-display)',
                    color: 'var(--ink-900)',
                  }}
                >
                  {course.course_name}
                </h3>
                <div
                  style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 4 }}
                >
                  <span
                    style={{
                      font: '400 16px/24px var(--font-body)',
                      color: 'var(--ink-400)',
                    }}
                  >
                    {course.provider}
                  </span>
                  <span
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 4,
                      font: '400 16px/24px var(--font-body)',
                      color: 'var(--ink-400)',
                    }}
                  >
                    <MetaDot />
                    <span>{course.year}</span>
                  </span>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
