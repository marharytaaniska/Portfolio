import { Plugin } from 'payload'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { localizedDescriptionsPlugin } from './localizedDescriptions'

export const plugins: Plugin[] = [
  localizedDescriptionsPlugin,
  vercelBlobStorage({
    enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
    collections: {
      media: { disablePayloadAccessControl: true },
    },
    token: process.env.BLOB_READ_WRITE_TOKEN || '',
    clientUploads: true,
  }),
]