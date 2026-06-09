'use client'

import React from 'react'
import { LiveDot } from './LiveDot'

interface TabProps {
  children: React.ReactNode
  active?: boolean
  onClick?: () => void
}

export function Tab({ children, active = false, onClick }: TabProps) {
  return (
    <button
      className={active ? 'case-tab is-active' : 'case-tab'}
      onClick={onClick}
    >
      {active && <LiveDot />}
      {children}
    </button>
  )
}
