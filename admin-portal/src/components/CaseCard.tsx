import type { Case, Media, Tag } from '@/payload-types'
import Link from 'next/link'
import { MetaDot } from './LiveDot'

interface CaseCardProps {
  caseItem: Case
  size?: 'small' | 'big'
  onPasswordClick?: () => void
}

export function CaseCard({ caseItem, size = 'small', onPasswordClick }: CaseCardProps) {
  const isProtected = Boolean((caseItem as any).password_required) && Boolean(onPasswordClick)
  const showPasswordBadge = Boolean((caseItem as any).password_required)
  const cover = typeof caseItem.cover === 'object' ? (caseItem.cover as Media) : null
  const tags = (caseItem.tags as Tag[])
    .filter((t): t is Tag => typeof t === 'object')
    .map((t) => t.tag_name)
    .join(', ')

  const cardBody = (
    <>
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

        {showPasswordBadge && (
          <div className="case-card-password-badge">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17C12.5304 17 13.0391 16.7893 13.4142 16.4142C13.7893 16.0391 14 15.5304 14 15C14 14.4696 13.7893 13.9609 13.4142 13.5858C13.0391 13.2107 12.5304 13 12 13C11.4696 13 10.9609 13.2107 10.5858 13.5858C10.2107 13.9609 10 14.4696 10 15C10 15.5304 10.2107 16.0391 10.5858 16.4142C10.9609 16.7893 11.4696 17 12 17ZM18 8C18.5304 8 19.0391 8.21071 19.4142 8.58579C19.7893 8.96086 20 9.46957 20 10V20C20 20.5304 19.7893 21.0391 19.4142 21.4142C19.0391 21.7893 18.5304 22 18 22H6C5.46957 22 4.96086 21.7893 4.58579 21.4142C4.21071 21.0391 4 20.5304 4 20V10C4 9.46957 4.21071 8.96086 4.58579 8.58579C4.96086 8.21071 5.46957 8 6 8H7V6C7 4.67392 7.52678 3.40215 8.46447 2.46447C9.40215 1.52678 10.6739 1 12 1C12.6566 1 13.3068 1.12933 13.9134 1.3806C14.52 1.63188 15.0712 2.00017 15.5355 2.46447C15.9998 2.92876 16.3681 3.47995 16.6194 4.08658C16.8707 4.69321 17 5.34339 17 6V8H18ZM12 3C11.2044 3 10.4413 3.31607 9.87868 3.87868C9.31607 4.44129 9 5.20435 9 6V8H15V6C15 5.20435 14.6839 4.44129 14.1213 3.87868C13.5587 3.31607 12.7956 3 12 3Z" fill="#FFFFFF" />
            </svg>
          </div>
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
    </>
  )

  if (isProtected) {
    return (
      <article className="case-card" style={{ width: '100%' }}>
        <div
          role="button"
          tabIndex={0}
          style={{ display: 'block', textDecoration: 'none', cursor: 'pointer' }}
          onClick={onPasswordClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onPasswordClick?.()
          }}
        >
          {cardBody}
        </div>
      </article>
    )
  }

  return (
    <article className="case-card" style={{ width: '100%' }}>
      <Link href={`/cases/${caseItem.slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        {cardBody}
      </Link>
    </article>
  )
}
