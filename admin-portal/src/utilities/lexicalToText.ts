function extractText(nodes: any[]): string {
  return nodes
    .map((node) => {
      if (node.type === 'text') return node.text ?? ''
      if (Array.isArray(node.children)) return extractText(node.children)
      return ''
    })
    .join('')
}

export function lexicalToText(data: unknown): string {
  if (!data || typeof data !== 'object') return ''
  const root = (data as any).root
  if (!root?.children) return ''
  return extractText(root.children)
}

// Preserves paragraph breaks as \n\n so callers can render with white-space: pre-line
export function lexicalToParagraphText(data: unknown): string {
  if (!data || typeof data !== 'object') return ''
  const root = (data as any).root
  if (!root?.children) return ''
  return (root.children as any[])
    .map((node) => extractText(Array.isArray(node.children) ? node.children : []))
    .filter((t) => t.length > 0)
    .join('\n\n')
}
