'use client'

import type { Media } from '@/payload-types'

interface AvatarProps {
  media: Media
  size?: number
}

export function Avatar({ media, size }: AvatarProps) {
  const sizeValue = size != null ? `${size}px` : 'var(--avatar-size, 180px)'
  const isVideo = media.mimeType?.startsWith('video/')

  return (
    <div
      className="avatar"
      style={{
        width: sizeValue,
        height: sizeValue,
        borderRadius: '50%',
        border: '1px solid var(--accent-30)',
        position: 'relative',
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: '13.333%',
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '12.121%',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          {isVideo ? (
            <video
              src={media.url ?? undefined}
              autoPlay
              loop
              muted
              playsInline
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={media.url ?? undefined}
              alt={media.alt ?? ''}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
