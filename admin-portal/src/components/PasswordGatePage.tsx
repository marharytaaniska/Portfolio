'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { validateCasePassword } from '@/app/actions/validateCasePassword'
import type { CaseAccessLabels } from './PasswordModal'
import { ModalCloseButton, ModalCloseFab } from '@/components/ModalCloseButton'

interface PasswordGatePageProps {
  slug: string
  locale: string
  labels: CaseAccessLabels
}

function IconVisibility() {
  return (
    <svg width="20" height="20" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
      <path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z" />
    </svg>
  )
}

function IconVisibilityOff() {
  return (
    <svg width="20" height="20" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true">
      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
    </svg>
  )
}

export function PasswordGatePage({ slug, locale, labels }: PasswordGatePageProps) {
  const t = useTranslations('caseAccess')
  const router = useRouter()
  const [password, setPassword] = React.useState('')
  const [showPassword, setShowPassword] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const [pending, setPending] = React.useState(false)

  const title = labels.modalTitle || t('modalTitle')
  const placeholder = labels.passwordPlaceholder || t('passwordPlaceholder')
  const continueLabel = labels.continueButtonLabel || t('continueButtonLabel')
  const errorMsg = labels.invalidPasswordError || t('invalidPasswordError')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (pending || !password) return
    setError(null)
    setPending(true)
    try {
      const result = await validateCasePassword(slug, password)
      if (result.success) {
        router.refresh()
      } else {
        setError(errorMsg)
      }
    } catch {
      setError(errorMsg)
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="password-gate">
      <div className="password-modal-inner">
        <div className="password-modal-panel password-gate-panel" role="document">
          <ModalCloseButton onClick={() => router.push(`/${locale}`)} label="Close" />

          <h3 className="password-modal-title">{title}</h3>

          <form onSubmit={handleSubmit} className="password-modal-form">
            <div className="password-modal-field">
              <div className="password-modal-input-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`password-modal-input${error ? ' password-modal-input--error' : ''}`}
                  placeholder={placeholder}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(null)
                  }}
                  autoComplete="current-password"
                  disabled={pending}
                  autoFocus
                />
                {password && (
                  <button
                    type="button"
                    className="password-modal-eye"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <IconVisibility /> : <IconVisibilityOff />}
                  </button>
                )}
              </div>
              {error && (
                <p className="password-modal-error" role="alert">
                  {error}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg password-modal-submit"
              disabled={pending || !password}
            >
              {continueLabel}
            </button>
          </form>
        </div>

        <ModalCloseFab onClick={() => router.push(`/${locale}`)} label="Close" />
      </div>
    </div>
  )
}
