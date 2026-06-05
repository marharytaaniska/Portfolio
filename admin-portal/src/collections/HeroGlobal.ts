import type { GlobalConfig } from 'payload'

export const HeroGlobal: GlobalConfig = {
  slug: 'hero',
  label: 'Hero — «Я»',
  fields: [
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      label: 'Аватар (фото или видео)',
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
      maxLength: 80,
    },
    {
      name: 'subtitle',
      type: 'text',
      label: 'Подзаголовок',
      required: true,
      maxLength: 120,
    },
    {
      name: 'button1_label',
      type: 'text',
      label: 'Кнопка 1 — текст',
      required: true,
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
    },
    {
      name: 'button2_url',
      type: 'text',
      label: 'Кнопка 2 — URL',
    },
  ],
}
