'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import RichText from '@/components/RichText'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import { ModalCloseButton, ModalCloseFab } from '@/components/ModalCloseButton'

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
    <div className="review-modal" role="dialog" aria-modal="true">
      <div className="review-modal-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="review-modal-inner">
        <div className="review-modal-panel" role="document">
          <ModalCloseButton onClick={onClose} label={t('close')} />

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

        <ModalCloseFab onClick={onClose} label={t('close')} />
      </div>
    </div>
  )
}
