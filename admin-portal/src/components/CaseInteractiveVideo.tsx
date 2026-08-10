'use client'

import React, { useRef, useState } from 'react'
import { cn } from '@/utilities/ui'

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${m}:${s.toString().padStart(2, '0')}`
}

function PlayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}

function PauseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  )
}

function VolumeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 9v6h4l5 5V4L8 9H4zM16.5 12c0-1.77-.77-3.29-2-4.24v8.48c1.23-.95 2-2.47 2-4.24z" />
    </svg>
  )
}

function MuteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4 9v6h4l5 5V4L8 9H4zM19.5 12l2.5-2.5-1-1L18.5 11 16 8.5l-1 1 2.5 2.5-2.5 2.5 1 1 2.5-2.5 2.5 2.5 1-1z" />
    </svg>
  )
}

export function CaseInteractiveVideo({ src, alt }: { src: string; alt?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [started, setStarted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused || video.ended) {
      video.play()
      setStarted(true)
    } else {
      video.pause()
    }
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
  }

  const stopPropagation = (e: React.SyntheticEvent) => e.stopPropagation()

  return (
    <div
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
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={(e) => {
          setIsPlaying(false)
          e.currentTarget.currentTime = 0
          setCurrentTime(0)
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      {!started && (
        <div className="case-video-poster">
          <span className="case-video-play-icon" aria-hidden="true">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
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
            {isPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>

          <span className="case-video-time">{formatTime(currentTime)}</span>

          <input
            type="range"
            className="case-video-progress"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
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
            {isMuted ? <MuteIcon /> : <VolumeIcon />}
          </button>
        </div>
      )}
    </div>
  )
}
