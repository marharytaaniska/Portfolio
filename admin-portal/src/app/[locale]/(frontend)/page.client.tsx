'use client'

import React from 'react'
import { SiteHeader } from '@/components/SiteHeader'
import { SideNav } from '@/components/SideNav'
import { MenuOverlay } from '@/components/MenuOverlay'

export interface NavItem {
  label: string
  anchor: string
}

export interface NavData {
  cvLabel?: string
  cvUrl?: string
  copyEmailLabel?: string
  copyEmailText?: string
  copyEmailSuccess?: string
  leftMenuItems: NavItem[]
}

interface PageShellProps {
  children: React.ReactNode
  navData: NavData
}

export function PageShell({ children, navData }: PageShellProps) {
  const anchors = navData.leftMenuItems.map((i) => i.anchor)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string>(anchors[0] ?? '')
  const lockRef = React.useRef(false)
  const lockTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const updateActive = () => {
      if (lockRef.current) return
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5
      if (atBottom) {
        setActiveSection(anchors[anchors.length - 1] ?? '')
        return
      }
      const y = window.scrollY + 200
      let current = anchors[0] ?? ''
      for (const anchor of anchors) {
        const el = document.getElementById(anchor)
        if (el && el.offsetTop <= y) current = anchor
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
    return () => window.removeEventListener('scroll', updateActive)
    // anchors identity is stable per render; exhaustive-deps would cause infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [anchors.join(',')])

  React.useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const handleNavSelect = (anchor: string) => {
    setActiveSection(anchor)
    setMenuOpen(false)
    lockRef.current = true
    if (lockTimer.current) clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => {
      lockRef.current = false
    }, 1200)
    const el = document.getElementById(anchor)
    if (el) {
      const headerH =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80
      const gap = window.innerWidth <= 727 ? 24 : 48
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          const top = el.getBoundingClientRect().top + window.scrollY - headerH - gap
          window.scrollTo({ top, behavior: 'smooth' })
        }),
      )
    }
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
      <SideNav
        items={navData.leftMenuItems}
        active={activeSection}
        onSelect={handleNavSelect}
      />
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        items={navData.leftMenuItems}
        active={activeSection}
        onSelect={handleNavSelect}
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
