/**
 * Russian plural forms:
 *  one  — 1, 21, 31 …     → "проект"
 *  few  — 2–4, 22–24 …   → "проекта"
 *  many — 5–20, 25–30 …  → "проектов"
 */
export function pluralizeRu(n: number, one: string, few: string, many: string): string {
  const abs = Math.abs(n)
  const mod10 = abs % 10
  const mod100 = abs % 100

  if (mod100 >= 11 && mod100 <= 19) return `${n} ${many}`
  if (mod10 === 1) return `${n} ${one}`
  if (mod10 >= 2 && mod10 <= 4) return `${n} ${few}`
  return `${n} ${many}`
}
