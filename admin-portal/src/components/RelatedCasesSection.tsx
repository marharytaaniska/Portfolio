'use client'

import React from 'react'
import type { Case } from '@/payload-types'
import { CaseCard } from './CaseCard'
import { Button } from './Button'
import { PasswordModal } from './PasswordModal'
import type { CaseAccessLabels } from './PasswordModal'

interface RelatedCasesSectionProps {
  title: string
  cases: Case[]
  caseAccessLabels?: CaseAccessLabels
  description?: React.ReactNode
  buttonLabel?: string
  buttonUrl?: string
}

export function RelatedCasesSection({ title, cases, caseAccessLabels = {}, description, buttonLabel, buttonUrl }: RelatedCasesSectionProps) {
  const [modalSlug, setModalSlug] = React.useState<string | null>(null)

  if (cases.length === 0) return null

  return (
    <section className="related-cases">
      <div className="related-cases-header">
        <div className="related-cases-title-row">
          <h2 className="section-title">{title}</h2>
          {buttonLabel && buttonUrl && (
            <Button accent="secondary" size="lg" href={buttonUrl}>
              {buttonLabel}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
                <path d="M20.1914 11.999L12.1357 20.0547L11.1465 19.0645L17.5117 12.6992H4.79688V11.2998H17.5117L11.1465 4.93457L12.1357 3.94434L20.1914 11.999Z" fill="currentColor" />
              </svg>
            </Button>
          )}
        </div>
        {description}
      </div>
      <div className="cases-row-two">
        {cases.slice(0, 2).map((c) => (
          <CaseCard
            key={c.id}
            caseItem={c}
            size="small"
            onPasswordClick={
              (c as any).password_required ? () => setModalSlug(c.slug) : undefined
            }
          />
        ))}
      </div>
      <PasswordModal
        caseSlug={modalSlug}
        onClose={() => setModalSlug(null)}
        labels={caseAccessLabels}
      />
    </section>
  )
}
