// Stable, locale-independent section identifiers used as both nav keys and HTML anchor IDs
export const SECTION_KEYS = [
  'hero',
  'cases',
  'reviews',
  'background',
  'experience',
  'contacts',
] as const

export type SectionKey = (typeof SECTION_KEYS)[number]

// Translation key → section key mapping (both are the same in our setup)
// Each section's <id> in the DOM equals its SectionKey so scrolling and active-tracking work
// without any separate anchor map.
