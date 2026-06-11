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

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20.7754 4.99805L13.3857 12.3877L20.5547 19.5566L19.5566 20.5547L12.3877 13.3857L5.21875 20.5547L4.2207 19.5566L11.3896 12.3877L4 4.99805L4.99805 4L12.3877 11.3896L19.7773 4L20.7754 4.99805Z"
        fill="currentColor"
      />
    </svg>
  )
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
    <div className="review-modal" role="dialog" aria-modal="true">
      <div className="review-modal-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="review-modal-inner">
        <div className="review-modal-panel" role="document">
          <button
            type="button"
            className="review-modal-close"
            onClick={onClose}
            aria-label={t('close')}
          >
            <CloseIcon />
          </button>

          <div className="review-modal-body">
            <RichText
              data={review.quote as DefaultTypedEditorState}
              enableGutter={false}
              enableProse={false}
              className="review-modal-quote"
            />
          </div>

          <div className="review-modal-author">
            <h3>{review.author}</h3>
            <span>{review.role}</span>
          </div>
        </div>

        <button
          type="button"
          className="review-modal-close-fab"
          onClick={onClose}
          aria-label={t('close')}
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  )
}
