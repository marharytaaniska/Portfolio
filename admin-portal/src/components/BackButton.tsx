'use client'

import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/Button'

export function BackButton({ label = 'Back' }: { label?: string }) {
  const router = useRouter()
  const params = useParams()
  const locale = (params?.locale as string) ?? 'ru'

  function handleClick() {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
    } else {
      router.push(`/${locale}/#cases`)
    }
  }

  return (
    <Button accent="secondary" size="lg" className="case-back-btn" onClick={handleClick}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path
          d="M10 12L6 8L10 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {label}
    </Button>
  )
}
