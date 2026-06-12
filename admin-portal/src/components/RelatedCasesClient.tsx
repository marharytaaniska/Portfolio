'use client'

import React from 'react'
import type { Case } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { PasswordModal } from './PasswordModal'
import type { CaseAccessLabels } from './PasswordModal'

interface RelatedCasesClientProps {
  cases: Pick<Case, 'id' | 'slug' | 'title'>[]
  caseAccessLabels?: CaseAccessLabels
  font: string
  linkColor: string
}

export function RelatedCasesClient({ cases, caseAccessLabels = {}, font, linkColor }: RelatedCasesClientProps) {
  const [modalSlug, setModalSlug] = React.useState<string | null>(null)

  const linkStyle = { font, '--link-color': linkColor } as React.CSSProperties

  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0 24px', marginTop: 8 }}>
        {cases.map((c) => {
          const isProtected = Boolean((c as any).password_required)
          if (isProtected) {
            return (
              <a
                key={c.id}
                href="#"
                onClick={(e) => { e.preventDefault(); setModalSlug(c.slug) }}
                className="inline-link"
                style={linkStyle}
              >
                {c.title}
              </a>
            )
          }
          return (
            <Link
              key={c.id}
              href={`/cases/${c.slug}`}
              className="inline-link"
              style={linkStyle}
            >
              {c.title}
            </Link>
          )
        })}
      </div>

      <PasswordModal
        caseSlug={modalSlug}
        onClose={() => setModalSlug(null)}
        labels={caseAccessLabels}
      />
    </>
  )
}
