'use client'

import { useParams } from 'next/navigation'
import { Button } from '@/components/Button'

export function BackButton({ label = 'Back' }: { label?: string }) {
  const params = useParams()
  const locale = (params?.locale as string) ?? 'ru'

  return (
    <Button accent="secondary" size="lg" className="case-back-btn" href={`/${locale}/#cases`}>
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M15.6569 9.9994H4.34315M9.29289 5.04965L4.34315 9.9994L9.29289 14.9491"
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
