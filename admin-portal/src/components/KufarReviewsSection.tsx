import type { KufarReviewsSection as KufarReviewsSectionData, Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

interface KufarReviewsSectionProps {
  data: KufarReviewsSectionData
}

export function KufarReviewsSection({ data }: KufarReviewsSectionProps) {
  const logo = data.logo && typeof data.logo === 'object' ? (data.logo as Media) : null
  const reviews = (data.reviews ?? [])
    .map((r) => (r.image && typeof r.image === 'object' ? (r.image as Media) : null))
    .filter((m): m is Media => m !== null)

  return (
    <section id="kufar-reviews" className="section">
      <div className="kufar-panel">
        <div className="kufar-header">
          <div className="kufar-intro">
            <div className="kufar-logo">
              {logo?.url ? (
                <img src={getMediaUrl(logo.url)} alt={logo.alt ?? 'Kufar'} />
              ) : (
                <span className="kufar-logo-placeholder">LOGO</span>
              )}
            </div>

            <div className="kufar-copy">
              {data.heading && <h2 className="kufar-heading">{data.heading}</h2>}
              {data.description && <p className="kufar-description">{data.description}</p>}
            </div>
          </div>
        </div>

        {reviews.length > 0 && (
          <div className="kufar-reviews">
            {reviews.map((review, i) => (
              <img
                key={review.id ?? i}
                className="kufar-review-img"
                src={getMediaUrl(review.url)}
                alt={review.alt ?? ''}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
