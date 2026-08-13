'use client'

import React, { useEffect, useRef, useState } from 'react'
import { cn } from '@/utilities/ui'

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function PlayIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6.91141 4.089C6.81977 4.03175 6.71539 4.00107 6.60885 4.00009C6.50232 3.99911 6.39744 4.02786 6.30487 4.08342C6.2123 4.13898 6.13533 4.21936 6.08178 4.31641C6.02823 4.41346 6.00002 4.52372 6 4.63598V19.3642C6.00002 19.4764 6.02823 19.5867 6.08178 19.6837C6.13533 19.7808 6.2123 19.8612 6.30487 19.9167C6.39744 19.9723 6.50232 20.001 6.60885 20C6.71539 19.9991 6.81977 19.9684 6.91141 19.9111L18.7044 12.547C18.7945 12.4907 18.8691 12.4107 18.9209 12.3148C18.9728 12.2189 19 12.1104 19 12.0001C19 11.8897 18.9728 11.7812 18.9209 11.6853C18.8691 11.5894 18.7945 11.5094 18.7044 11.4531L6.91141 4.089Z" fill="currentColor" />
      <path d="M6.72754 3.00495C6.90914 3.0193 7.08569 3.06494 7.25 3.13874L7.44141 3.24128L19.2344 10.6046C19.4149 10.7174 19.5691 10.8643 19.6904 11.0333L19.8008 11.21L19.8877 11.3975C19.9623 11.5898 20 11.7944 20 12.0001C20 12.2742 19.9325 12.5463 19.8008 12.7901C19.6689 13.0342 19.4752 13.244 19.2344 13.3946L7.44141 20.7598C7.19595 20.9131 6.91157 20.9973 6.61816 21.0001C6.32463 21.0028 6.03848 20.9236 5.79004 20.7745C5.54212 20.6257 5.34242 20.4142 5.20605 20.1671C5.06983 19.9202 5.00005 19.6432 5 19.3643V4.63581C5.00005 4.35691 5.06983 4.07997 5.20605 3.83307L5.32031 3.65534C5.44564 3.48462 5.60404 3.33728 5.79004 3.22565L5.9834 3.12702C6.18226 3.042 6.39815 2.99804 6.61816 3.00007L6.72754 3.00495ZM7 18.6758L17.6924 12.0001L7 5.32331V18.6758Z" fill="currentColor" />
    </svg>
  )
}

function PauseIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7.2C4 5.6912 4 4.9376 4.4688 4.4688C4.9376 4 5.6912 4 7.2 4C8.7088 4 9.4624 4 9.9312 4.4688C10.4 4.9376 10.4 5.6912 10.4 7.2V16.8C10.4 18.3088 10.4 19.0624 9.9312 19.5312C9.4624 20 8.7088 20 7.2 20C5.6912 20 4.9376 20 4.4688 19.5312C4 19.0624 4 18.3088 4 16.8V7.2ZM13.6 7.2C13.6 5.6912 13.6 4.9376 14.0688 4.4688C14.5376 4 15.2912 4 16.8 4C18.3088 4 19.0624 4 19.5312 4.4688C20 4.9376 20 5.6912 20 7.2V16.8C20 18.3088 20 19.0624 19.5312 19.5312C19.0624 20 18.3088 20 16.8 20C15.2912 20 14.5376 20 14.0688 19.5312C13.6 19.0624 13.6 18.3088 13.6 16.8V7.2Z" fill="currentColor" />
    </svg>
  )
}

function VolumeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.037 3.3972C14.2 2.6302 15.75 3.4652 15.75 4.8582V19.1442C15.75 20.5382 14.2 21.3722 13.037 20.6052L7.037 16.6502C6.99641 16.6231 6.94879 16.6085 6.9 16.6082H4C3.27065 16.6082 2.57118 16.3185 2.05546 15.8027C1.53973 15.287 1.25 14.5876 1.25 13.8582V10.1442C1.25 9.41486 1.53973 8.71539 2.05546 8.19966C2.57118 7.68394 3.27065 7.3942 4 7.3942H6.9C6.94903 7.39436 6.99702 7.38011 7.038 7.3532L13.037 3.3972Z" fill="currentColor" />
      <path d="M17.9899 15.8766C19.7202 15.4361 21 13.8675 21 12C21 10.1325 19.7202 8.56394 17.9899 8.12343C17.4547 7.98717 17 8.44771 17 9V15C17 15.5523 17.4547 16.0128 17.9899 15.8766Z" fill="currentColor" />
    </svg>
  )
}

function MuteIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M13.037 3.3972C14.2 2.6302 15.75 3.4652 15.75 4.8582V19.1442C15.75 20.5382 14.2 21.3722 13.037 20.6052L7.037 16.6502C6.99641 16.6231 6.94879 16.6085 6.9 16.6082H4C3.27065 16.6082 2.57118 16.3185 2.05546 15.8027C1.53973 15.287 1.25 14.5876 1.25 13.8582V10.1442C1.25 9.41486 1.53973 8.71539 2.05546 8.19966C2.57118 7.68394 3.27065 7.3942 4 7.3942H6.9C6.94903 7.39436 6.99702 7.38011 7.038 7.3532L13.037 3.3972Z" fill="currentColor" />
      <path d="M17.9993 9.2512C17.8006 9.2512 17.61 9.33009 17.4693 9.47054C17.3289 9.61117 17.25 9.80179 17.25 10.0005C17.25 10.1993 17.3289 10.3899 17.4693 10.5305L18.9393 12.0005L17.4693 13.4705C17.3369 13.6127 17.2647 13.8008 17.2682 13.9951C17.2716 14.1894 17.3503 14.3748 17.4877 14.5122C17.6251 14.6496 17.8105 14.7283 18.0048 14.7317C18.1991 14.7351 18.3872 14.663 18.5293 14.5305L19.9993 13.0605L21.4693 14.5305C21.6107 14.6672 21.8001 14.7429 21.9968 14.7413C22.1934 14.7397 22.3816 14.6609 22.5207 14.5219C22.6598 14.3829 22.7388 14.1948 22.7406 13.9982C22.7424 13.8015 22.6669 13.6121 22.5303 13.4705L21.0603 12.0005L22.5293 10.5305C22.6618 10.3884 22.7339 10.2003 22.7305 10.006C22.7271 9.81172 22.6484 9.62634 22.511 9.48892C22.3735 9.35151 22.1882 9.2728 21.9939 9.26937C21.7996 9.26594 21.6115 9.33806 21.4693 9.47054L19.9993 10.9405L18.5293 9.47054C18.3887 9.33009 18.1981 9.2512 17.9993 9.2512Z" fill="currentColor" />
    </svg>
  )
}

function FullscreenIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4.88 4.88V4H4V4.88H4.88ZM11.2978 12.5422C11.4638 12.7025 11.6861 12.7912 11.9168 12.7892C12.1476 12.7871 12.3683 12.6946 12.5314 12.5314C12.6946 12.3683 12.7871 12.1476 12.7892 11.9168C12.7912 11.6861 12.7025 11.4638 12.5422 11.2978L11.2978 12.5422ZM5.76 10.16V4.88H4V10.16H5.76ZM4.88 5.76H10.16V4H4.88V5.76ZM4.25784 5.50216L11.2978 12.5422L12.5422 11.2978L5.50216 4.25784L4.25784 5.50216Z" fill="currentColor" />
      <path d="M4.88 18.9604V19.8404H4V18.9604H4.88ZM11.2978 11.2982C11.4638 11.1379 11.6861 11.0492 11.9168 11.0512C12.1476 11.0532 12.3683 11.1458 12.5314 11.3089C12.6946 11.4721 12.7871 11.6928 12.7892 11.9235C12.7912 12.1543 12.7025 12.3765 12.5422 12.5425L11.2978 11.2982ZM5.76 13.6804V18.9604H4V13.6804H5.76ZM4.88 18.0804H10.16V19.8404H4.88V18.0804ZM4.25784 18.3382L11.2978 11.2982L12.5422 12.5425L5.50216 19.5825L4.25784 18.3382Z" fill="currentColor" />
      <path d="M18.9582 4.88V4H19.8382V4.88H18.9582ZM12.5404 12.5422C12.3744 12.7025 12.1521 12.7912 11.9214 12.7892C11.6906 12.7871 11.4699 12.6946 11.3068 12.5314C11.1436 12.3683 11.0511 12.1476 11.0491 11.9168C11.0471 11.6861 11.1358 11.4638 11.296 11.2978L12.5404 12.5422ZM18.0782 10.16V4.88H19.8382V10.16H18.0782ZM18.9582 5.76H13.6782V4H18.9582V5.76ZM19.5804 5.50216L12.5404 12.5422L11.296 11.2978L18.336 4.25784L19.5804 5.50216Z" fill="currentColor" />
      <path d="M18.9582 18.9604V19.8404H19.8382V18.9604H18.9582ZM12.5404 11.2982C12.3744 11.1379 12.1521 11.0492 11.9214 11.0512C11.6906 11.0532 11.4699 11.1458 11.3068 11.3089C11.1436 11.4721 11.0511 11.6928 11.0491 11.9235C11.0471 12.1543 11.1358 12.3765 11.296 12.5425L12.5404 11.2982ZM18.0782 13.6804V18.9604H19.8382V13.6804H18.0782ZM18.9582 18.0804H13.6782V19.8404H18.9582V18.0804ZM19.5804 18.3382L12.5404 11.2982L11.296 12.5425L18.336 19.5825L19.5804 18.3382Z" fill="currentColor" />
    </svg>
  )
}

function CropIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12.9272 12.9272L12.9272 12L12 12L12 12.9272L12.9272 12.9272ZM13.8543 18.4902L13.8543 12.9272L12 12.9272L12 18.4902L13.8543 18.4902ZM12.9272 13.8543L18.4902 13.8543L18.4902 12L12.9272 12L12.9272 13.8543ZM12.2717 13.5827L19.689 21L21 19.689L13.5827 12.2717L12.2717 13.5827Z" fill="currentColor" />
      <path d="M11.0728 11.0728L12 11.0728L12 12L11.0728 12L11.0728 11.0728ZM5.50984 10.1457L11.0728 10.1457L11.0728 12L5.50984 12L5.50984 10.1457ZM10.1457 11.0728L10.1457 5.50984L12 5.50984L12 11.0728L10.1457 11.0728ZM10.4173 11.7283L3 4.31101L4.31101 3L11.7283 10.4173L10.4173 11.7283Z" fill="currentColor" />
    </svg>
  )
}

export function CaseInteractiveVideo({ src, alt }: { src: string; alt?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLInputElement>(null)
  const [started, setStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [flash, setFlash] = useState<number | null>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const flashIdRef = useRef(0)
  const flashTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const baseRef = useRef({ time: 0, perf: 0 })

  const paintProgress = (time: number, dur: number) => {
    const el = progressRef.current
    if (!el) return
    el.value = String(time)
    const percent = dur ? (time / dur) * 100 : 0
    el.style.backgroundImage = `linear-gradient(to right, var(--white) ${percent}%, rgba(255, 255, 255, 0.3) ${percent}%)`
  }

  const syncBase = () => {
    const video = videoRef.current
    if (!video) return
    baseRef.current = { time: video.currentTime, perf: performance.now() }
  }

  useEffect(() => {
    return () => {
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
    }
  }, [])

  useEffect(() => {
    if (!isPlaying) return
    syncBase()
    let rafId: number
    let lastSecond = -1
    const tick = () => {
      const video = videoRef.current
      if (video) {
        const dur = video.duration || duration
        const elapsed = ((performance.now() - baseRef.current.perf) / 1000) * video.playbackRate
        const estimated = Math.min(dur || Infinity, Math.max(0, baseRef.current.time + elapsed))
        paintProgress(estimated, dur)
        const second = Math.floor(estimated)
        if (second !== lastSecond) {
          lastSecond = second
          setCurrentTime(estimated)
        }
      }
      rafId = requestAnimationFrame(tick)
    }
    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [isPlaying, duration])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === frameRef.current)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.stopPropagation()
    const frame = frameRef.current
    if (!frame) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      frame.requestFullscreen()
    }
  }

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    const willPlay = video.paused || video.ended
    if (willPlay) {
      video.play()
      setStarted(true)
    } else {
      video.pause()
    }
    setIsPlaying(willPlay)

    flashIdRef.current += 1
    setFlash(flashIdRef.current)
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current)
    flashTimeoutRef.current = setTimeout(() => setFlash(null), 600)
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const video = videoRef.current
    if (!video) return
    video.muted = !video.muted
    setIsMuted(video.muted)
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current
    if (!video) return
    const time = Number(e.target.value)
    video.currentTime = time
    setCurrentTime(time)
    paintProgress(time, video.duration || duration)
    syncBase()
  }

  const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation()

  return (
    <div
      ref={frameRef}
      className={cn('case-video-frame', isPlaying && 'is-playing')}
      onClick={togglePlay}
      role="button"
      tabIndex={0}
      aria-label={alt ?? 'video'}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          togglePlay()
        }
      }}
    >
      <video
        ref={videoRef}
        src={src}
        playsInline
        onPlay={() => {
          setIsPlaying(true)
          syncBase()
        }}
        onPause={() => {
          setIsPlaying(false)
          syncBase()
        }}
        onSeeked={() => syncBase()}
        onTimeUpdate={() => syncBase()}
        onEnded={(e) => {
          setIsPlaying(false)
          e.currentTarget.currentTime = 0
          setCurrentTime(0)
          paintProgress(0, e.currentTarget.duration || duration)
          syncBase()
        }}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      {!started && (
        <div className="case-video-poster">
          <span className="case-video-play-icon" aria-hidden="true">
            <PlayIcon size={28} />
          </span>
        </div>
      )}

      {flash && <div className="case-video-flash" key={flash} aria-hidden="true" />}

      {started && (
        <div className="case-video-hover-toggle" aria-hidden="true">
          {isPlaying ? <PauseIcon size={28} /> : <PlayIcon size={28} />}
        </div>
      )}

      {started && (
        <div className="case-video-controls" onClick={stopPropagation}>
          <button
            type="button"
            className="case-video-btn"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <PauseIcon size={20} /> : <PlayIcon size={20} />}
          </button>

          <span className="case-video-time">{formatTime(currentTime)}</span>

          <input
            ref={progressRef}
            type="range"
            className="case-video-progress"
            min={0}
            max={duration || 0}
            step="any"
            defaultValue={0}
            onChange={handleSeek}
            aria-label="Seek"
          />

          <span className="case-video-time">{formatTime(duration)}</span>

          <button
            type="button"
            className="case-video-btn"
            onClick={toggleMute}
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MuteIcon size={20} /> : <VolumeIcon size={20} />}
          </button>

          <button
            type="button"
            className="case-video-btn"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
          >
            {isFullscreen ? <CropIcon size={20} /> : <FullscreenIcon size={20} />}
          </button>
        </div>
      )}
    </div>
  )
}
