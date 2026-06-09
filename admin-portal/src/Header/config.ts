import type { GlobalConfig } from 'payload'

import { revalidateHeader } from './hooks/revalidateHeader'

export const Header: GlobalConfig = {
  slug: 'header',
  label: 'Navigation',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'header',
      type: 'group',
      label: 'Header',
      fields: [
        {
          name: 'cv_label',
          type: 'text',
          label: 'CV — Button Label',
          localized: true,
        },
        {
          name: 'cv_url',
          type: 'text',
          label: 'CV — URL',
        },
        {
          name: 'copy_email_label',
          type: 'text',
          label: 'Copy email — Button Label',
          localized: true,
        },
        {
          name: 'copy_email_text',
          type: 'text',
          label: 'Copy email — Copied Text',
        },
        {
          name: 'copy_email_success',
          type: 'text',
          label: 'Copy email — Success Message',
          localized: true,
        },
      ],
    },
    {
      name: 'left_menu',
      type: 'group',
      label: 'Left Menu',
      fields: [
        {
          name: 'items',
          type: 'array',
          label: 'Items',
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              localized: true,
            },
            {
              name: 'anchor',
              type: 'text',
              label: 'Anchor Link',
              required: true,
            },
          ],
          admin: {
            initCollapsed: true,
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
