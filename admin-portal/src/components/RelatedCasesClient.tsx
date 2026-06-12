'use client'

import React from 'react'
import type { CSSProperties } from 'react'
import type { Case } from '@/payload-types'
import { Link } from '@/i18n/navigation'
import { PasswordModal } from './PasswordModal'
import type { CaseAccessLabels } from './PasswordModal'

interface RelatedCasesClientProps {
  cases: Pick<Case, 'id' | 'slug' | 'title'>[]
  caseAccessLabels?: CaseAccessLabels
  style?: CSSProperties
}

export function RelatedCasesClient({ cases, caseAccessLabels = {}, style }: RelatedCasesClientProps) {
  const [modalSlug, setModalSlug] = React.useState<string | null>(null)

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'flex-start' }}>
        {cases.map((c) => {
          const isProtected = Boolean((c as any).password_required)
          if (isProtected) {
            return (
              <a
                key={c.id}
                href="#"
                onClick={(e) => { e.preventDefault(); setModalSlug(c.slug) }}
                className="inline-link"
                style={style}
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
              style={style}
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
