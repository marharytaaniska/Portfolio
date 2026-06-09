'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useCopyToClipboard } from '@/utilities/useCopyToClipboard'
import { Button } from './Button'
import { LanguageSwitch } from './LanguageSwitch'
import { LiveDot } from './LiveDot'

interface NavItem {
  label: string
  anchor: string
}

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
  items: NavItem[]
  active?: string | null
  onSelect?: (anchor: string) => void
  cvLabel?: string
  cvUrl?: string
  copyEmailLabel?: string
  copyEmailText?: string
  copyEmailSuccess?: string
}

export function MenuOverlay({
  open,
  onClose,
  items,
  active,
  onSelect,
  cvLabel,
  cvUrl,
  copyEmailLabel,
  copyEmailText = '',
  copyEmailSuccess,
}: MenuOverlayProps) {
  const t = useTranslations('header')
  const { copied, copy } = useCopyToClipboard(copyEmailText)

  React.useEffect(() => {
    if (!open) return

    const scrollY = window.scrollY
    const supportsScrollbarGutter =
      typeof CSS !== 'undefined' && CSS.supports('scrollbar-gutter', 'stable')
    if (!supportsScrollbarGutter) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.paddingRight = `${scrollbarWidth}px`
    }

    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.dataset.scrollY = String(scrollY)

    return () => {
      const saved = parseInt(document.body.dataset.scrollY || '0', 10)
      delete document.body.dataset.scrollY
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.left = ''
      document.body.style.right = ''
      document.body.style.width = ''
      document.body.style.paddingRight = ''
      // Temporarily disable smooth-scroll so the position restore is instant.
      // Without this, html { scroll-behavior: smooth } animates from 0 → saved.
      document.documentElement.style.scrollBehavior = 'auto'
      window.scrollTo(0, saved)
      requestAnimationFrame(() => {
        document.documentElement.style.scrollBehavior = ''
      })
    }
  }, [open])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  React.useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) onClose()
    }
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [onClose])

  if (!open) return null

  return (
    <div className="menu-overlay" role="dialog" aria-modal="true">
      <div className="menu-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="menu-panel">
        <div className="menu-panel-inner">
          <div className="menu-lang">
            <LanguageSwitch />
          </div>

          <nav className="menu-items">
            {items.map((item) => {
              const isActive = item.anchor === active
              return (
                <a
                  key={item.anchor}
                  href={`#${item.anchor}`}
                  onClick={(e) => {
                    e.preventDefault()
                    onSelect?.(item.anchor)
                    onClose()
                  }}
                  className={isActive ? 'menu-item is-active' : 'menu-item'}
                >
                  <span>{item.label}</span>
                  {isActive && <LiveDot />}
                </a>
              )
            })}
          </nav>

          <div className="menu-cta-block">
            <hr className="menu-divider" />
            <div className="menu-cta-row">
              <Button size="md" accent="secondary" style={{ flex: 1 }} onClick={copy}>
                {copied ? (copyEmailSuccess || t('copied')) : (copyEmailLabel || t('copyEmail'))}
              </Button>
              {cvUrl && (
                <Button
                  size="md"
                  accent="secondary"
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ flex: 1 }}
                >
                  {cvLabel || 'CV'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
