'use client'

import { useDocumentInfo, useLocale } from '@payloadcms/ui'
import type { FieldDescriptionClientProps } from 'payload'
import React, { useCallback, useEffect, useState } from 'react'

const OTHER_LOCALE_LABEL: Record<string, string> = {
  ru: 'English',
  en: 'Русский',
}

const OTHER_LOCALE_CODE: Record<string, string> = {
  ru: 'en',
  en: 'ru',
}

// Module-level cache: URL → promise of doc data (deduplicates parallel fetches)
const docCache = new Map<string, Promise<unknown>>()

function fetchDoc(url: string): Promise<unknown> {
  if (!docCache.has(url)) {
    docCache.set(url, fetch(url).then((r) => (r.ok ? r.json() : null)))
  }
  return docCache.get(url)!
}

function getValueAtPath(obj: unknown, path: string): unknown {
  const parts = path.split('.')
  let current: unknown = obj
  for (const part of parts) {
    if (current == null || typeof current !== 'object') return undefined
    const idx = Number(part)
    if (!isNaN(idx) && Array.isArray(current)) {
      current = (current as unknown[])[idx]
    } else {
      current = (current as Record<string, unknown>)[part]
    }
  }
  return current
}

function extractTextFromLexical(value: unknown): string {
  if (!value || typeof value !== 'object') return ''
  const root = (value as Record<string, unknown>).root
  if (!root || typeof root !== 'object') return ''
  return walkNode(root as Record<string, unknown>)
}

function walkNode(node: Record<string, unknown>): string {
  if (node.type === 'text') return typeof node.text === 'string' ? node.text : ''
  const children = node.children
  if (!Array.isArray(children)) return ''
  return children
    .map((child) => walkNode(child as Record<string, unknown>))
    .filter(Boolean)
    .join(' ')
    .trim()
}

const MAX_DISPLAY_LENGTH = 200

const LocalizedFieldDescription: React.FC<FieldDescriptionClientProps> = ({ path }) => {
  const { id, collectionSlug, globalSlug } = useDocumentInfo()
  const locale = useLocale()

  const currentLocale = locale.code
  const otherLocale = OTHER_LOCALE_CODE[currentLocale] ?? (currentLocale === 'ru' ? 'en' : 'ru')
  const otherLocaleName = OTHER_LOCALE_LABEL[currentLocale] ?? otherLocale

  const [fullValue, setFullValue] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!path) return
    if (!globalSlug && !id) return

    let url: string
    if (globalSlug) {
      url = `/api/globals/${globalSlug}?locale=${otherLocale}&depth=0`
    } else if (collectionSlug && id) {
      url = `/api/${collectionSlug}/${id}?locale=${otherLocale}&depth=0`
    } else {
      return
    }

    let cancelled = false

    fetchDoc(url).then((data) => {
      if (cancelled || !data) return
      const raw = getValueAtPath(data, path)

      let text = ''
      if (typeof raw === 'string') {
        text = raw
      } else if (raw && typeof raw === 'object') {
        text = extractTextFromLexical(raw)
      }

      setFullValue(text)
    })

    return () => {
      cancelled = true
    }
  }, [path, id, collectionSlug, globalSlug, otherLocale])

  const handleCopy = useCallback(() => {
    if (!fullValue) return
    navigator.clipboard.writeText(fullValue).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [fullValue])

  if (!fullValue.trim()) return null

  const displayValue =
    fullValue.length > MAX_DISPLAY_LENGTH
      ? fullValue.slice(0, MAX_DISPLAY_LENGTH) + '…'
      : fullValue

  return (
    <div
      style={{
        alignItems: 'baseline',
        color: 'var(--theme-elevation-400)',
        display: 'flex',
        fontSize: '0.75rem',
        gap: '6px',
        lineHeight: '1.5',
        marginTop: '3px',
        opacity: 0.8,
      }}
    >
      <span style={{ flexShrink: 0, fontWeight: 500 }}>{otherLocaleName}:</span>
      <span style={{ fontStyle: 'italic', minWidth: 0 }}>{displayValue}</span>
      <button
        onClick={handleCopy}
        title="Copy"
        type="button"
        style={{
          alignItems: 'center',
          background: 'none',
          border: 'none',
          color: copied ? 'var(--theme-success-500)' : 'var(--theme-elevation-400)',
          cursor: 'pointer',
          display: 'inline-flex',
          flexShrink: 0,
          fontSize: '1.4rem',
          lineHeight: 1,
          padding: '0 2px',
          transition: 'color 0.15s',
        }}
      >
        {copied ? '✓' : '⎘'}
      </button>
    </div>
  )
}

export default LocalizedFieldDescription
