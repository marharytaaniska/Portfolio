import React from 'react'
import { getTranslations } from 'next-intl/server'

import type { Case, Contact, Media, Tag } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'
import { Button } from '@/components/Button'
import { ContactsSection } from '@/components/ContactsSection'
import { Link } from '@/i18n/navigation'

// ─────────────────────────────────────────────────────────────────────────────
// Lightweight Lexical JSON → React renderer
// Handles: paragraph, text (bold/italic/underline), link, linebreak
// ─────────────────────────────────────────────────────────────────────────────

type LexicalChild = {
  type: string
  text?: string
  format?: number
  fields?: {
    url?: string
    newTab?: boolean
    doc?: { value: { slug?: string }; relationTo: string }
  }
  children?: LexicalChild[]
  [k: string]: unknown
}

type LexicalDoc = {
  root: { children: LexicalChild[]; [k: string]: unknown }
  [k: string]: unknown
}

const IS_BOLD = 1
const IS_ITALIC = 2
const IS_UNDERLINE = 8

function renderInline(node: LexicalChild, i: number): React.ReactNode {
  switch (node.type) {
    case 'text': {
      let content: React.ReactNode = node.text ?? ''
      if ((node.format ?? 0) & IS_BOLD) content = <strong key={`b${i}`}>{content}</strong>
      if ((node.format ?? 0) & IS_ITALIC) content = <em key={`em${i}`}>{content}</em>
      if ((node.format ?? 0) & IS_UNDERLINE) content = <u key={`u${i}`}>{content}</u>
      return content
    }
    case 'linebreak':
      return <br key={`br${i}`} />
    case 'link': {
      const f = node.fields
      const href =
        f?.url ??
        (f?.doc
          ? f.doc.relationTo === 'posts'
            ? `/posts/${f.doc.value.slug}`
            : `/${f.doc.value.slug}`
          : '#')
      return (
        <a
          key={`a${i}`}
          href={href}
          target={f?.newTab ? '_blank' : undefined}
          rel={f?.newTab ? 'noopener noreferrer' : undefined}
        >
          {node.children?.map(renderInline)}
        </a>
      )
    }
    default:
      return node.children?.map(renderInline) ?? null
  }
}

function LexicalParagraphs({
  data,
  extraClass,
}: {
  data: LexicalDoc | null | undefined
  extraClass?: string
}) {
  if (!data?.root?.children?.length) return null
  const cls = ['case-text', extraClass].filter(Boolean).join(' ')
  return (
    <>
      {data.root.children.map((node, i) => {
        const children = node.children?.map(renderInline)
        if (node.type === 'paragraph') return <p key={i} className={cls}>{children}</p>
        return <div key={i}>{children}</div>
      })}
    </>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Case building blocks
// ─────────────────────────────────────────────────────────────────────────────

function CaseHero({
  title,
  description,
}: {
  title: string
  description: LexicalDoc | null | undefined
}) {
  return (
    <header className="case-hero">
      <h1 className="case-hero-title">{title}</h1>
      {description && <LexicalParagraphs data={description} extraClass="case-hero-desc" />}
    </header>
  )
}

type SummaryItem = { label: string; value: string | string[] }

function CaseSummary({ items }: { items: SummaryItem[] }) {
  return (
    <div className="case-summary" role="list">
      {items.map((it, i) => (
        <div className="case-summary-cell" role="listitem" key={i}>
          <div className="case-summary-tag">{it.label}</div>
          <div className="case-summary-value">
            {Array.isArray(it.value)
              ? it.value.map((v, j) => <div key={j}>{v}</div>)
              : it.value}
          </div>
        </div>
      ))}
    </div>
  )
}

function CaseSingleImage({ src, alt }: { src?: string | null; alt?: string }) {
  return (
    <figure className="case-img-single">
      <div className="case-img-frame" role="img" aria-label={alt ?? 'image'}>
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt ?? ''} />
        ) : (
          <span className="case-img-placeholder">{alt ?? 'image'}</span>
        )}
      </div>
    </figure>
  )
}

function CaseDoubleImage({ images }: { images: Array<{ src?: string | null; alt?: string }> }) {
  return (
    <figure className="case-img-double">
      {images.slice(0, 2).map((it, i) => (
        <div key={i} className="case-img-frame" role="img" aria-label={it.alt ?? 'image'}>
          {it.src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={it.src} alt={it.alt ?? ''} />
          ) : (
            <span className="case-img-placeholder">{it.alt ?? 'image'}</span>
          )}
        </div>
      ))}
    </figure>
  )
}

function CaseTextBlock({
  title,
  paragraphs,
}: {
  title?: string | null
  paragraphs: Array<LexicalDoc | null | undefined>
}) {
  return (
    <div className="case-text-block">
      {title && <h2 className="case-block-title">{title}</h2>}
      <div className="case-block-descriptions">
        {paragraphs.map((p, i) => (
          <LexicalParagraphs key={i} data={p} />
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main export — async server component rendering the full .case-page layout
// ─────────────────────────────────────────────────────────────────────────────

interface CaseDetailContentProps {
  caseDoc: Case
  contacts: Contact
}

export async function CaseDetailContent({ caseDoc, contacts }: CaseDetailContentProps) {
  const t = await getTranslations('case')

  const cover = typeof caseDoc.cover === 'object' ? (caseDoc.cover as Media) : null
  const tags = (caseDoc.tags as Tag[]).filter((tag): tag is Tag => typeof tag === 'object')

  const summaryItems: SummaryItem[] = [
    { label: t('client'), value: caseDoc.client ?? '—' },
    { label: t('services'), value: tags.map((tag) => tag.tag_name) },
    { label: t('industries'), value: caseDoc.niche },
    { label: t('date'), value: String(caseDoc.year) },
  ]

  const hasContentBlocks = caseDoc.content_blocks.length > 0

  return (
    <div className="case-page">
      <div className="case-content">
        <CaseHero title={caseDoc.title} description={caseDoc.description as LexicalDoc} />

        <CaseSummary items={summaryItems} />

        {cover?.url && (
          <CaseSingleImage src={getMediaUrl(cover.url)} alt={cover.alt ?? caseDoc.title} />
        )}

        {cover?.url && hasContentBlocks && <hr className="divider-dashed" />}

        {caseDoc.content_blocks.map((block, i) => {
          if (block.blockType === 'text_block') {
            const paragraphDocs = (block.paragraphs ?? []).map(
              (p) => p.content as LexicalDoc | null | undefined,
            )
            const prependDivider = !!block.has_title && i > 0
            return (
              <React.Fragment key={i}>
                {prependDivider && <hr className="divider-dashed" />}
                <CaseTextBlock
                  title={block.has_title ? block.title : undefined}
                  paragraphs={paragraphDocs}
                />
              </React.Fragment>
            )
          }

          if (block.blockType === 'media_block') {
            const imgs = (block.images ?? []).map((item) => {
              const media = typeof item.image === 'object' ? (item.image as Media) : null
              return {
                src: media?.url ? getMediaUrl(media.url) : null,
                alt: media?.alt ?? block.caption ?? '',
              }
            })
            if (imgs.length === 0) return null
            if (imgs.length === 1) {
              return <CaseSingleImage key={i} src={imgs[0].src} alt={imgs[0].alt} />
            }
            return <CaseDoubleImage key={i} images={imgs} />
          }

          if (block.blockType === 'link_block') {
            const hasLink = block.link_label && block.link_url
            const hasButton = block.button_label && block.button_url
            return (
              <React.Fragment key={i}>
                {hasLink && (
                  <div className="case-text-block">
                    <div className="case-block-descriptions">
                      <p className="case-text">
                        <a href={block.link_url}>{block.link_label}</a>
                      </p>
                    </div>
                  </div>
                )}
                {hasButton && (
                  <div className="case-cta">
                    <Button
                      accent="secondary"
                      size="lg"
                      href={block.button_url!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {block.button_label}
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        aria-hidden="true"
                        style={{ display: 'block', flexShrink: 0 }}
                      >
                        <path
                          d="M6 14L14 6M14 6H7M14 6V13"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Button>
                  </div>
                )}
              </React.Fragment>
            )
          }

          return null
        })}
      </div>

      <hr className="divider-solid" />

      <ContactsSection data={contacts} />
    </div>
  )
}
