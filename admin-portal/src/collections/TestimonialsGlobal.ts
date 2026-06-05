import type { GlobalConfig } from 'payload'

export const TestimonialsGlobal: GlobalConfig = {
  slug: 'testimonials-section',
  label: 'Отзывы — настройки секции',
  fields: [
    {
      name: 'section_description',
      type: 'text',
      label: 'Описание секции',
    },
    {
      name: 'section_link_label',
      type: 'text',
      label: 'Текст ссылки',
    },
    {
      name: 'section_link_url',
      type: 'text',
      label: 'URL ссылки',
    },
  ],
}
