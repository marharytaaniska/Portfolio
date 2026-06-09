// Minimal root layout for the / fallback redirect.
// Real frontend pages live under app/[locale]/(frontend)/ and have their own root layout.
export default function FallbackLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
