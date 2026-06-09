import type { GlobalConfig } from 'payload'

export const RelevantCasesGlobal: GlobalConfig = {
  slug: 'relevant-cases-section',
  label: 'Кейсы — настройки секции',
  admin: {
    group: 'Кейсы',
  },
  fields: [
    {
      name: 'section_title',
      type: 'text',
      label: 'Заголовок секции',
      defaultValue: 'Relevant cases',
      required: true,
      localized: true,
    },
  ],
}
