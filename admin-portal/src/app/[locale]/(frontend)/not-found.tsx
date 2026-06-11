import React from 'react'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Button } from '@/components/Button'

export const dynamic = 'force-dynamic'

export default async function NotFound() {
  let title = '404'
  let description = 'Страница не найдена.'
  let buttonLabel = 'На главную'
  let buttonUrl = '/ru'

  try {
    const payload = await getPayload({ config: configPromise })
    const data = await payload.findGlobal({ slug: 'not-found-page', locale: 'ru' }) as {
      title?: string | null
      description?: string | null
      button_label?: string | null
      button_url?: string | null
    }

    if (data.title) title = data.title
    if (data.description) description = data.description
    if (data.button_label) buttonLabel = data.button_label
    if (data.button_url) buttonUrl = data.button_url
  } catch {
    // use fallback values above
  }

  return (
    <main className="not-found-page">
      <section className="hero">
        <h1>{title}</h1>
        <p className="sub">{description}</p>
        <div className="ctas">
          <Button accent="primary" href={buttonUrl}>
            {buttonLabel}
          </Button>
        </div>
      </section>
    </main>
  )
}
