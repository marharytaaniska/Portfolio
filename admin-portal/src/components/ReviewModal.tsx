'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface ReviewData {
  quote: unknown
  author: string
  role: string
}

interface ReviewModalProps {
  review: ReviewData | null
  onClose: () => void
}

export function ReviewModal({ review, onClose }: ReviewModalProps) {
  const t = useTranslations('testimonials')

  React.useEffect(() => {
    if (!review) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [review, onClose])

  if (!review) return null

  return (
    <div
      className="review-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${t('reviewLabel')} — ${review.author}`}
    >
      <div className="review-modal-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="review-modal-panel" role="document">
        <button
          type="button"
          className="review-modal-close"
          onClick={onClose}
          aria-label={t('close')}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <RichText
          data={review.quote as DefaultTypedEditorState}
          enableGutter={false}
          enableProse={false}
          className="review-modal-quote"
        />
        <div className="review-modal-author">
          <h3>{review.author}</h3>
          <span>{review.role}</span>
        </div>
      </div>
    </div>
  )
}
