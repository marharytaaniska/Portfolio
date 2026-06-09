'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'

export function LanguageSwitch() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  function handleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div
      className="lang-switch"
      style={{
        display: 'inline-flex',
        width: 135,
        height: 48,
        background: 'var(--ink-100)',
        borderRadius: 9999,
        padding: 5,
        gap: 5,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {(['ru', 'en'] as const).map((l) => (
        <button
          key={l}
          onClick={() => handleChange(l)}
          style={{
            all: 'unset',
            cursor: 'pointer',
            width: 60,
            height: 38,
            borderRadius: 9999,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: locale === l ? 'var(--white)' : 'transparent',
            boxShadow: locale === l ? 'var(--shadow-segment)' : 'none',
            color: locale === l ? 'var(--ink-900)' : 'var(--ink-300)',
            font: '500 16px/24px var(--font-body)',
            transition: 'color .15s ease',
          }}
        >
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  )
}
