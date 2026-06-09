import { redirect } from 'next/navigation'

// This route is superseded by /[locale]/(frontend)/page.tsx.
// The middleware redirects / → /ru before this ever renders,
// but as a belt-and-suspenders fallback we redirect here too.
export default function RootPage() {
  redirect('/ru')
}
