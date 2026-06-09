'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import type { Case, Tag } from '@/payload-types'
import { Tab } from './Tab'
import { CaseCard } from './CaseCard'
import { Button } from './Button'
import { PasswordModal } from './PasswordModal'
import type { CaseAccessLabels } from './PasswordModal'

interface CasesSectionProps {
  cases: Case[]
  totalCases: number
  tags: Tag[]
  sectionTitle?: string
  allTagLabel?: string
  caseAccessLabels?: CaseAccessLabels
}

// Initial 8 cases: 2→1→2→1→2 (5 rows)
// Subsequent batches: 1→2→1→2→1 (5 rows, 7 cases)
const PATTERN_A = [2, 1, 2, 1, 2] as const
const PATTERN_B = [1, 2, 1, 2, 1] as const
const INITIAL_ROWS = 5
const BATCH_ROWS = 1

type LayoutRow =
  | { wide: true; items: [Case] }
  | { wide: false; items: [Case] | [Case, Case] }

function buildAllRows(cases: Case[]): LayoutRow[] {
  const rows: LayoutRow[] = []
  let i = 0
  let batch = 0

  while (i < cases.length) {
    const pattern = batch % 2 === 0 ? PATTERN_A : PATTERN_B
    for (const width of pattern) {
      if (i >= cases.length) break
      if (width === 1) {
        rows.push({ wide: true, items: [cases[i]!] })
        i++
      } else if (i + 1 < cases.length) {
        rows.push({ wide: false, items: [cases[i]!, cases[i + 1]!] })
        i += 2
      } else {
        // Incomplete pair at end of batch — render as orphan in half-width slot
        rows.push({ wide: false, items: [cases[i]!] })
        i++
      }
    }
    batch++
  }

  return rows
}

export function CasesSection({
  cases,
  totalCases,
  tags,
  sectionTitle,
  allTagLabel,
  caseAccessLabels = {},
}: CasesSectionProps) {
  const t = useTranslations('cases')
  const [activeTagSlug, setActiveTagSlug] = React.useState<string | null>(null)
  const [shownRows, setShownRows] = React.useState(INITIAL_ROWS)
  const [modalSlug, setModalSlug] = React.useState<string | null>(null)

  const filtered =
    activeTagSlug === null
      ? cases
      : cases.filter((c) =>
          (c.tags as Tag[]).some((tag) => {
            if (typeof tag !== 'object') return false
            return (tag.tag_slug || String(tag.id)) === activeTagSlug
          }),
        )

  const allRows = buildAllRows(filtered)
  const visibleRows = allRows.slice(0, shownRows)
  const hasMore = shownRows < allRows.length

  const filteredCount = activeTagSlug === null ? totalCases : filtered.length

  function handleTabChange(slug: string | null) {
    setActiveTagSlug(slug)
    setShownRows(INITIAL_ROWS)
  }

  return (
    <section id="cases" className="section">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
        <h2 className="section-title">{sectionTitle}</h2>
        <div className="cases-heading">
          <div className="cases-tabs">
            <Tab active={activeTagSlug === null} onClick={() => handleTabChange(null)}>
              {allTagLabel ?? t('all')}
            </Tab>
            {tags.map((tag, i) => {
              const slug = tag.tag_slug || String(tag.id) || String(i)
              return (
                <Tab
                  key={slug}
                  active={activeTagSlug === slug}
                  onClick={() => handleTabChange(slug)}
                >
                  {tag.tag_name}
                </Tab>
              )
            })}
          </div>
          <span className="cases-count">{t('projectCount', { count: filteredCount })}</span>
        </div>
      </div>

      <div className="cases-grid">
        {visibleRows.map((row, i) =>
          row.wide ? (
            <CaseCard
              key={i}
              caseItem={row.items[0]}
              size="big"
              onPasswordClick={
                (row.items[0] as any).password_required
                  ? () => setModalSlug(row.items[0].slug)
                  : undefined
              }
            />
          ) : (
            <div key={i} className="cases-row-two">
              {(row.items as Case[]).map((c, j) => (
                <CaseCard
                  key={j}
                  caseItem={c}
                  size="small"
                  onPasswordClick={
                    (c as any).password_required ? () => setModalSlug(c.slug) : undefined
                  }
                />
              ))}
            </div>
          ),
        )}
      </div>

      {hasMore && (
        <div className="cases-more">
          <Button accent="secondary" onClick={() => setShownRows((n) => n + BATCH_ROWS)}>
            {t('showMore')}
          </Button>
        </div>
      )}

      <PasswordModal
        caseSlug={modalSlug}
        onClose={() => setModalSlug(null)}
        labels={caseAccessLabels}
      />
    </section>
  )
}
