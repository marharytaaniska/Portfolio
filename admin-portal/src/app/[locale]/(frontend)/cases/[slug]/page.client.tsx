'use client'

import React from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { SideNav } from '@/components/SideNav'
import { MenuOverlay } from '@/components/MenuOverlay'
import { useLocale } from 'next-intl'
import type { NavData } from '../../page.client'

interface CasePageShellProps {
  children: React.ReactNode
  navData: NavData
}

export function CasePageShell({ children, navData }: CasePageShellProps) {
  const [menuOpen, setMenuOpen] = React.useState(false)
  const locale = useLocale()

  const navigateHome = (anchor: string) => {
    window.location.href = `/${locale}/#${anchor}`
  }

  return (
    <>
      <SiteHeader
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((v) => !v)}
        cvLabel={navData.cvLabel}
        cvUrl={navData.cvUrl}
        copyEmailLabel={navData.copyEmailLabel}
        copyEmailText={navData.copyEmailText}
        copyEmailSuccess={navData.copyEmailSuccess}
      />
      <SideNav items={navData.leftMenuItems} active={null} onSelect={navigateHome} />
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navData.leftMenuItems}
        active={null}
        onSelect={navigateHome}
        cvLabel={navData.cvLabel}
        cvUrl={navData.cvUrl}
        copyEmailLabel={navData.copyEmailLabel}
        copyEmailText={navData.copyEmailText}
        copyEmailSuccess={navData.copyEmailSuccess}
      />
      <main>
        <div className="content">{children}</div>
      </main>
    </>
  )
}
