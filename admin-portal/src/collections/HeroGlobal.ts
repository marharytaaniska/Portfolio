import type { GlobalConfig } from 'payload'

export const HeroGlobal: GlobalConfig = {
  slug: 'hero',
  label: 'About',
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
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Аватар (фото или видео)',
      required: true,
    },
    {
      name: 'title',
      type: 'textarea',
      label: 'Заголовок',
      required: true,
      maxLength: 80,
      localized: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Подзаголовок',
      required: true,
      maxLength: 500,
      localized: true,
    },
    {
      name: 'button1_label',
      type: 'text',
      label: 'Кнопка 1 — текст',
      required: true,
      localized: true,
    },
    {
      name: 'button1_url',
      type: 'text',
      label: 'Кнопка 1 — URL',
      required: true,
    },
    {
      name: 'button2_label',
      type: 'text',
      label: 'Кнопка 2 — текст',
      localized: true,
    },
    {
      name: 'button2_url',
      type: 'text',
      label: 'Кнопка 2 — URL',
    },
  ],
}
