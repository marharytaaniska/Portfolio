import type { Case, Media, Tag } from '@/payload-types'
import Link from 'next/link'
import { MetaDot } from './LiveDot'

interface CaseCardProps {
  caseItem: Case
  size?: 'small' | 'big'
}

export function CaseCard({ caseItem, size = 'small' }: CaseCardProps) {
  const cover = typeof caseItem.cover === 'object' ? (caseItem.cover as Media) : null
  const tags = (caseItem.tags as Tag[])
    .filter((t): t is Tag => typeof t === 'object')
    .map((t) => t.tag_name)
    .join(', ')

  return (
    <article className="case-card" style={{ width: '100%' }}>
      <Link href={`/cases/${caseItem.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        <div
          className="case-card-image"
          style={{ aspectRatio: size === 'big' ? '1360 / 750' : '648 / 420' }}
        >
          {cover?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cover.url} alt={cover.alt ?? caseItem.title} />
          ) : (
            <>
              <div
                className="case-card-placeholder"
                style={{
                  backgroundColor: 'var(--ink-100)',
                  backgroundImage:
                    'repeating-linear-gradient(45deg, transparent 0, transparent 11px, rgba(13,30,44,.035) 11px, rgba(13,30,44,.035) 12px)',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  left: '50%',
                  top: '50%',
                  transform: 'translate(-50%,-50%)',
                  font: '400 13px/16px ui-monospace, Menlo, monospace',
                  letterSpacing: '.04em',
                  color: 'var(--ink-400)',
                  pointerEvents: 'none',
                }}
              >
                превью кейса
              </span>
            </>
          )}
        </div>

        <div className="case-card-meta" style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <h3 style={{ margin: 0, font: '400 24px/28px var(--font-display)', color: 'var(--ink-900)' }}>
            {caseItem.title}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', columnGap: 4 }}>
            <span style={{ font: '400 16px/24px var(--font-body)', color: 'var(--ink-400)' }}>{tags}</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, font: '400 16px/24px var(--font-body)', color: 'var(--ink-400)' }}>
              <MetaDot />
              <span>{caseItem.year}</span>
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
