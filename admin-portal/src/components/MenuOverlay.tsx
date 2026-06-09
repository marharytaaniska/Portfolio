'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { SECTION_KEYS, type SectionKey } from '@/constants/nav'
import { useCopyToClipboard } from '@/utilities/useCopyToClipboard'
import { Button } from './Button'
import { LanguageSwitch } from './LanguageSwitch'
import { LiveDot } from './LiveDot'

interface MenuOverlayProps {
  open: boolean
  onClose: () => void
  active?: SectionKey | null
  onSelect?: (key: SectionKey) => void
  cvUrl?: string
  contactEmail?: string
}

export function MenuOverlay({
  open,
  onClose,
  active = 'hero',
  onSelect,
  cvUrl = '/cv',
  contactEmail = '',
}: MenuOverlayProps) {
  const t = useTranslations('nav')
  const th = useTranslations('header')
  const { copied, copy } = useCopyToClipboard(contactEmail)

  React.useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    const prevPosition = document.body.style.position
    const prevTop = document.body.style.top
    const scrollY = window.scrollY
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    return () => {
      document.body.style.overflow = prevOverflow
      document.body.style.position = prevPosition
      document.body.style.top = prevTop
      window.scrollTo(0, scrollY)
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

  const handleSelect = (key: SectionKey) => {
    onSelect?.(key)
    onClose()
  }

  return (
    <div className="menu-overlay" role="dialog" aria-modal="true">
      <div className="menu-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="menu-panel">
        <div className="menu-panel-inner">
          <div className="menu-lang">
            <LanguageSwitch />
          </div>

          <nav className="menu-items">
            {SECTION_KEYS.map((key) => {
              const isActive = key === active
              return (
                <a
                  key={key}
                  href={`#${key}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSelect(key)
                  }}
                  className={isActive ? 'menu-item is-active' : 'menu-item'}
                >
                  <span>{t(key)}</span>
                  {isActive && <LiveDot />}
                </a>
              )
            })}
          </nav>

          <div className="menu-cta-block">
            <hr className="menu-divider" />
            <div className="menu-cta-row">
              <Button size="md" accent="secondary" style={{ flex: 1 }} onClick={copy}>
                {copied ? th('copied') : th('copyEmail')}
              </Button>
              <Button
                size="md"
                accent="secondary"
                href={cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: 1 }}
              >
                CV
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
