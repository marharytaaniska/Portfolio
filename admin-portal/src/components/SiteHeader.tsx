'use client'

import React from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { useCopyToClipboard } from '@/utilities/useCopyToClipboard'
import { Button } from './Button'
import { LanguageSwitch } from './LanguageSwitch'

interface SiteHeaderProps {
  menuOpen: boolean
  onMenuToggle: () => void
  cvUrl?: string
  contactEmail?: string
}

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 8.706h22M1 15.294h22" stroke="currentColor" strokeWidth="1.412" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4l16 16M20 4L4 20"
        stroke="currentColor"
        strokeWidth="1.412"
        strokeLinecap="square"
      />
    </svg>
  )
}

export function SiteHeader({
  menuOpen,
  onMenuToggle,
  cvUrl = '/cv',
  contactEmail = '',
}: SiteHeaderProps) {
  const t = useTranslations('header')
  const locale = useLocale()
  const [now, setNow] = React.useState<Date | null>(null)
  const { copied, copy } = useCopyToClipboard(contactEmail)

  React.useEffect(() => {
    setNow(new Date())
    const interval = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  const timeLocale = locale === 'ru' ? 'ru-RU' : 'en-US'
  const time = now ? now.toLocaleTimeString(timeLocale, { hour12: false }) : ''

  return (
    <header className="site-header">
      <div className="header-left">
        <span className="header-tz">{t('timezone')}</span>
        <span className="header-time">{time}</span>
      </div>

      <div className="header-right">
        <div className="header-buttons">
          <Button size="md" accent="ghost" onClick={copy}>
            {copied ? t('copied') : t('copyEmail')}
          </Button>
          <Button size="md" accent="ghost" href={cvUrl} target="_blank" rel="noopener noreferrer">
            CV
          </Button>
        </div>

        <span className="header-divider" aria-hidden="true" />

        <div className="header-lang-switch">
          <LanguageSwitch />
        </div>

        <button
          type="button"
          className="header-menu-btn"
          aria-label={menuOpen ? t('closeMenu') : t('openMenu')}
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  )
}
