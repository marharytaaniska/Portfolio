'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { SECTION_KEYS, type SectionKey } from '@/constants/nav'
import { LiveDot } from './LiveDot'

interface SideNavProps {
  active?: SectionKey | null
  onSelect?: (key: SectionKey) => void
}

export function SideNav({ active = 'hero', onSelect }: SideNavProps) {
  const t = useTranslations('nav')

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, key: SectionKey) => {
    if (onSelect) {
      e.preventDefault()
      onSelect(key)
    }
  }

  return (
    <aside className="side-rail">
      <nav className="side-rail-nav">
        {SECTION_KEYS.map((key) => {
          const isActive = key === active
          return (
            <a
              key={key}
              href={`#${key}`}
              onClick={(e) => handleClick(e, key)}
              className={isActive ? 'side-rail-item is-active' : 'side-rail-item'}
            >
              {t(key)}
              {isActive && <LiveDot />}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
