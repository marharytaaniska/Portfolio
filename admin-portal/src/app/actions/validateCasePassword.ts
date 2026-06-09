'use server'

import { cookies } from 'next/headers'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export async function validateCasePassword(
  slug: string,
  password: string,
): Promise<{ success: boolean }> {
  const payload = await getPayload({ config: configPromise })

  const { docs } = await payload.find({
    collection: 'cases',
    where: { and: [{ slug: { equals: slug } }, { enabled: { equals: true } }] },
    limit: 1,
    depth: 0,
  })

  const caseDoc = docs[0] as any
  if (!caseDoc || !caseDoc.password_required) return { success: false }
  if (caseDoc.password !== password) return { success: false }

  const cookieStore = await cookies()
  cookieStore.set(`case_access_${slug}`, 'granted', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  })

  return { success: true }
}
