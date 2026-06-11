import type { GlobalConfig } from 'payload'

export const TestimonialsGlobal: GlobalConfig = {
  slug: 'testimonials-section',
  label: 'Reviews',
  admin: {
    group: 'Homepage content',
  },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Enabled',
      defaultValue: true,
      admin: { description: 'Show this section on the website' },
    },
    {
      name: 'section_title',
      type: 'text',
      label: 'Заголовок секции',
      defaultValue: 'Reviews',
      localized: true,
    },
    {
      name: 'read_more_label',
      type: 'text',
      label: 'Кнопка «Читать полностью»',
      defaultValue: 'Читать полностью',
      localized: true,
    },
    {
      name: 'section_content',
      type: 'richText',
      label: 'Контент секции',
      localized: true,
    },
  ],
}
