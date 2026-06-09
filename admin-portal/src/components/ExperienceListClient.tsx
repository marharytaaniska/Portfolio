'use client'

import { Children, type ReactNode, useState } from 'react'

interface ExperienceListClientProps {
  showMoreLabel: string
  collapseLabel: string
  entryGap: number
  dividerStyle: 'dashed' | 'solid' | 'none'
  children: ReactNode
}

const VISIBLE_LIMIT = 3

export function ExperienceListClient({
  showMoreLabel,
  collapseLabel,
  entryGap,
  dividerStyle,
  children,
}: ExperienceListClientProps) {
  const [expanded, setExpanded] = useState(false)
  const allItems = Children.toArray(children)
  const hasMore = allItems.length > VISIBLE_LIMIT
  const visibleItems = expanded ? allItems : allItems.slice(0, VISIBLE_LIMIT)

  const dividerClass = dividerStyle === 'solid' ? 'divider-solid' : 'divider-dashed'

  return (
    <div className="exp-list" style={{ gap: entryGap }}>
      {visibleItems}
      {hasMore && (
        <div>
          {dividerStyle !== 'none' && (
            <hr className={dividerClass} style={{ marginBottom: entryGap }} />
          )}
          <button
            onClick={() => setExpanded((v) => !v)}
            className="exp-expand-btn"
          >
            {expanded ? collapseLabel : showMoreLabel}
          </button>
        </div>
      )}
    </div>
  )
}
