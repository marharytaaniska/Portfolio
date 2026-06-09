'use client'
import React from 'react'
import { RowLabelProps, useRowLabel } from '@payloadcms/ui'

export const RowLabel: React.FC<RowLabelProps> = () => {
  const data = useRowLabel<{ label?: string }>()
  const label =
    data?.data?.label
      ? `Item ${data.rowNumber !== undefined ? data.rowNumber + 1 : ''}: ${data.data.label}`
      : 'Row'
  return <div>{label}</div>
}
