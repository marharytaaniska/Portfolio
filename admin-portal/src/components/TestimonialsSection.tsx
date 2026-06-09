'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import type { Testimonial, TestimonialsSection as TestimonialsSectionType } from '@/payload-types'
import { ReviewCard } from './ReviewCard'
import { ReviewModal } from './ReviewModal'
import RichText from '@/components/RichText'

interface ReviewData {
  quote: unknown
  author: string
  role: string
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  section: TestimonialsSectionType
}

export function TestimonialsSection({ testimonials, section }: TestimonialsSectionProps) {
  const t = useTranslations('testimonials')
  const [openReview, setOpenReview] = React.useState<ReviewData | null>(null)
  const [reviewPage, setReviewPage] = React.useState(0)
  const [isCompact, setIsCompact] = React.useState(false)

  React.useEffect(() => {
    const mql = window.matchMedia('(max-width: 727px)')
    setIsCompact(mql.matches)
    const onChange = (e: MediaQueryListEvent) => {
      setIsCompact(e.matches)
      setReviewPage(0)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const reviews: ReviewData[] = testimonials.map((testimonial) => ({
    quote: testimonial.text,
    author: testimonial.author_name,
    role: testimonial.author_description,
  }))

  if (reviews.length === 0) return null

  const perPage = isCompact ? 1 : 2
  const pageCount = Math.ceil(reviews.length / perPage)
  const pages = Array.from({ length: pageCount }, (_, p) =>
    reviews.slice(p * perPage, p * perPage + perPage),
  )
  const canPrev = reviewPage > 0
  const canNext = reviewPage < pageCount - 1

  return (
    <section id="reviews" className="section">
      <div className="reviews-heading">
        <h2 className="section-title">{t('heading')}</h2>
        <div className="reviews-arrows">
          <button
            type="button"
            className="arrow-btn"
            disabled={!canPrev}
            onClick={() => setReviewPage((p) => Math.max(0, p - 1))}
            aria-label={t('prevLabel')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M12.5 4 6.5 10l6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="arrow-btn"
            disabled={!canNext}
            onClick={() => setReviewPage((p) => Math.min(pageCount - 1, p + 1))}
            aria-label={t('nextLabel')}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="m7.5 4 6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="reviews-viewport">
        <div
          className="reviews-track"
          style={{ transform: `translateX(-${reviewPage * 100}%)` }}
        >
          {pages.map((page, p) => (
            <div key={p} className="reviews-page">
              {page.map((r, i) => (
                <ReviewCard key={i} {...r} onReadMore={setOpenReview} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {(section as any).section_content && (
        <div className="reviews-footer">
          <RichText data={(section as any).section_content} enableGutter={false} />
        </div>
      )}

      <ReviewModal review={openReview} onClose={() => setOpenReview(null)} />
    </section>
  )
}
