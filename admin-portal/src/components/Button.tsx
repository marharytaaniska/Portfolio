'use client'

import React from 'react'
import { cn } from '@/utilities/ui'

type ButtonAccent = 'primary' | 'secondary' | 'ghost' | 'text'
type ButtonSize = 'lg' | 'md' | 'sm'

interface ButtonProps {
  children: React.ReactNode
  size?: ButtonSize
  accent?: ButtonAccent
  href?: string
  target?: string
  rel?: string
  onClick?: (e: React.MouseEvent) => void
  className?: string
  style?: React.CSSProperties
  disabled?: boolean
}

export function Button({
  children,
  size = 'lg',
  accent = 'primary',
  href,
  target,
  rel,
  onClick,
  className,
  style,
  disabled,
}: ButtonProps) {
  const classes = cn('btn', `btn-${size}`, `btn-${accent}`, className)

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes} style={style}>
        {children}
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={classes}
      style={style}
    >
      {children}
    </button>
  )
}
