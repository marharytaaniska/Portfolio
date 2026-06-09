import type { Hero, Media } from '@/payload-types'
import { Avatar } from './Avatar'
import { Button } from './Button'

interface HeroSectionProps {
  data: Hero
}

export function HeroSection({ data }: HeroSectionProps) {
  const avatar = typeof data.avatar === 'object' ? (data.avatar as Media) : null

  return (
    <section id="hero" className="hero">
      {avatar && <Avatar media={avatar} />}
      <h1>{data.title}</h1>
      <p className="sub">{data.subtitle}</p>
      <div className="ctas">
        <Button accent="primary" href={data.button1_url}>
          {data.button1_label}
        </Button>
        {data.button2_label && data.button2_url && (
          <Button accent="secondary" href={data.button2_url}>
            {data.button2_label}
          </Button>
        )}
      </div>
    </section>
  )
}
