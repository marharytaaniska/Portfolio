'use client'

import React from 'react'
import { LiveDot } from './LiveDot'

interface NavItem {
  label: string
  anchor: string
}

interface SideNavProps {
  items: NavItem[]
  active?: string | null
  onSelect?: (anchor: string) => void
}

export function SideNav({ items, active, onSelect }: SideNavProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    if (onSelect) {
      e.preventDefault()
      onSelect(anchor)
    }
  }

  return (
    <aside className="side-rail">
      <nav className="side-rail-nav">
        {items.map((item) => {
          const isActive = item.anchor === active
          return (
            <a
              key={item.anchor}
              href={`#${item.anchor}`}
              onClick={(e) => handleClick(e, item.anchor)}
              className={isActive ? 'side-rail-item is-active' : 'side-rail-item'}
            >
              {item.label}
              {isActive && <LiveDot />}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
