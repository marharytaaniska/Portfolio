import { useState, useCallback } from 'react'

export function useCopyToClipboard(text: string, resetDelay = 1400) {
  const [copied, setCopied] = useState(false)

  const copy = useCallback(() => {
    if (text) navigator.clipboard?.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), resetDelay)
  }, [text, resetDelay])

  return { copied, copy }
}
