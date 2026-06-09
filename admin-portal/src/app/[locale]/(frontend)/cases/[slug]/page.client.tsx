'use client'

import React from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { SideNav } from '@/components/SideNav'
import { MenuOverlay } from '@/components/MenuOverlay'
import { useLocale } from 'next-intl'
import type { SectionKey } from '@/constants/nav'

interface CasePageShellProps {
  children: React.ReactNode
}

export function CasePageShell({ children }: CasePageShellProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const locale = useLocale()

  // Navigate back to the homepage section in the correct locale
  const navigateHome = (key: SectionKey) => {
    window.location.href = `/${locale}/#${key}`
  }

  return (
    <>
      <SiteHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((v) => !v)}
      />
      <SideNav active={null} onSelect={navigateHome} />
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        active={null}
        onSelect={navigateHome}
      />
      <main>
        <div className="content">{children}</div>
      </main>
    </>
  )
}
