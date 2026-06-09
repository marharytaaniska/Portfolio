'use client'

import type { Contact } from '@/payload-types'
import { useTranslations } from 'next-intl'
import { useCopyToClipboard } from '@/utilities/useCopyToClipboard'
import { Button } from './Button'
import RichText from '@/components/RichText'

interface ContactsSectionProps {
  data: Contact
  contactEmail?: string
  copyEmailLabel?: string
  copyEmailSuccess?: string
}

export function ContactsSection({
  data,
  contactEmail = '',
  copyEmailLabel,
  copyEmailSuccess,
}: ContactsSectionProps) {
  const t = useTranslations('contacts')
  const { copied, copy } = useCopyToClipboard(contactEmail, 1500)

  return (
    <section id="contacts" className="section" style={{ gap: 32 }}>
      <h2 className="section-title">{data.title}</h2>
      <div className="contacts-grid">
        <div>
          {data.description_1 && (
            <div
              style={{
                maxWidth: 730,
                font: '400 18px/26px var(--font-body)',
                color: 'var(--ink-600)',
              }}
            >
              <RichText data={data.description_1} enableGutter={false} />
            </div>
          )}
          {data.description_2 && (
            <div
              className="contacts-desc-2"
              style={{
                marginTop: 24,
                maxWidth: 654,
                font: '400 16px/24px var(--font-body)',
                color: 'var(--ink-400)',
              }}
            >
              <RichText data={data.description_2} enableGutter={false} />
            </div>
          )}
          <div className="contacts-buttons">
            <Button accent="primary" href={data.button1_url} target="_blank" rel="noopener noreferrer">
              {data.button1_label}
            </Button>
            {data.button2_label && data.button2_url && (
              <Button
                accent="secondary"
                href={data.button2_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {data.button2_label}
              </Button>
            )}
          </div>
        </div>

        <div className="contacts-links">
          <Button accent="text" size="sm" onClick={copy}>
            {copied ? (copyEmailSuccess ?? t('copied')) : (copyEmailLabel ?? t('copyEmail'))}
          </Button>
          {data.social_links?.map((link, i) => (
            <Button
              key={i}
              accent="text"
              size="sm"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  )
}
