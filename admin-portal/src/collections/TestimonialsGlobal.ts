import type { GlobalConfig } from 'payload'

export const TestimonialsGlobal: GlobalConfig = {
  slug: 'testimonials-section',
  label: 'Отзывы — настройки секции',
  fields: [
    {
      name: 'section_content',
      type: 'richText',
      label: 'Контент секции',
      localized: true,
    },
  ],
}
