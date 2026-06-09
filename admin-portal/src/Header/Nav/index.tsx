'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const items = data?.left_menu?.items || []

  return (
    <nav className="flex gap-3 items-center">
      {items.map((item, i) => (
        <a key={i} href={item.anchor}>
          {item.label}
        </a>
      ))}
    </nav>
  )
}
