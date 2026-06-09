'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { SECTION_KEYS, type SectionKey } from '@/constants/nav'
import { SiteHeader } from '@/components/SiteHeader'
import { SideNav } from '@/components/SideNav'
import { MenuOverlay } from '@/components/MenuOverlay'

interface PageShellProps {
  children: React.ReactNode
  cvUrl?: string
  contactEmail?: string
}

export function PageShell({ children, cvUrl = '/cv', contactEmail = '' }: PageShellProps) {
  const t = useTranslations('nav')
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<SectionKey>('hero')
  const lockRef = React.useRef(false)
  const lockTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(() => {
    const updateActive = () => {
      if (lockRef.current) return
      const atBottom =
        window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5
      if (atBottom) {
        setActiveSection('contacts')
        return
      }
      const y = window.scrollY + 200
      let current: SectionKey = 'hero'
      for (const key of SECTION_KEYS) {
        const el = document.getElementById(key)
        if (el && el.offsetTop <= y) current = key
      }
      setActiveSection(current)
    }
    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
    return () => window.removeEventListener('scroll', updateActive)
  }, [])

  React.useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setMenuOpen(false)
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [])

  const handleNavSelect = (key: SectionKey) => {
    setActiveSection(key)
    setMenuOpen(false)
    lockRef.current = true
    if (lockTimer.current) clearTimeout(lockTimer.current)
    lockTimer.current = setTimeout(() => {
      lockRef.current = false
    }, 1200)
    const el = document.getElementById(key)
    if (el) {
      const headerH =
        parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80
      const gap = window.innerWidth <= 727 ? 24 : 48
      // Defer scroll until after menu overlay closes and body.overflow is restored.
      // Two rAFs ensure React has re-rendered and the browser has painted.
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
        cvUrl={cvUrl}
        contactEmail={contactEmail}
      />
      <SideNav active={activeSection} onSelect={handleNavSelect} />
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        active={activeSection}
        onSelect={handleNavSelect}
        cvUrl={cvUrl}
        contactEmail={contactEmail}
      />
      <main>
        <div className="content">{children}</div>
      </main>
    </>
  )
}
