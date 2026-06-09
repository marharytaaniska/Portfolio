'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { lexicalToParagraphText } from '@/utilities/lexicalToText'

interface ReviewData {
  quote: unknown
  author: string
  role: string
}

interface ReviewCardProps extends ReviewData {
  lines?: number
  onReadMore?: (review: ReviewData) => void
}

export function ReviewCard({ quote, author, role, lines = 5, onReadMore }: ReviewCardProps) {
  const t = useTranslations('testimonials')
  const quoteRef = React.useRef<HTMLParagraphElement>(null)
  const [overflowing, setOverflowing] = React.useState(false)
  const quoteText = lexicalToParagraphText(quote)

  React.useLayoutEffect(() => {
    const el = quoteRef.current
    if (!el) return
    const measure = () => setOverflowing(el.scrollHeight - el.clientHeight > 1)
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [quote, lines])

  return (
    <div
      className="review-card"
      style={{
        background: 'var(--ink-100)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        gap: 48,
        minHeight: 296,
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, minHeight: 0 }}>
        <p
          ref={quoteRef}
          style={{
            margin: 0,
            font: '400 18px/26px var(--font-body)',
            color: 'var(--ink-600)',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: lines,
            overflow: 'hidden',
            whiteSpace: 'pre-line',
            textAlign: 'left',
          }}
        >
          {quoteText}
        </p>
        {overflowing && onReadMore && (
          <button
            type="button"
            className="review-readmore"
            onClick={() => onReadMore({ quote, author, role })}
          >
            {t('readMore')}
          </button>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h3
          style={{ margin: 0, font: '400 24px/28px var(--font-display)', color: 'var(--ink-900)' }}
        >
          {author}
        </h3>
        <span style={{ font: '400 16px/24px var(--font-body)', color: 'var(--ink-400)' }}>
          {role}
        </span>
      </div>
    </div>
  )
}
