import type { GlobalConfig } from 'payload'

export const BackgroundGlobal: GlobalConfig = {
  slug: 'background',
  label: 'Бэкграунд',
  fields: [
    // ── Общая часть ─────────────────────────────────────────────
    {
      name: 'section_title',
      type: 'text',
      label: 'Заголовок секции',
      required: true,
    },
    {
      name: 'section_description',
      type: 'richText',
      label: 'Описание секции',
    },

    // ── Высшее образование ──────────────────────────────────────
    {
      name: 'education',
      type: 'group',
      label: 'Высшее образование',
      fields: [
        {
          name: 'edu_label',
          type: 'text',
          label: 'Лейбл',
          required: true,
        },
        {
          name: 'edu_image',
          type: 'upload',
          relationTo: 'media',
          label: 'Изображение',
        },
        {
          name: 'edu_university',
          type: 'text',
          label: 'Университет',
          required: true,
        },
        {
          name: 'edu_specialty',
          type: 'text',
          label: 'Специальность',
          required: true,
        },
        {
          name: 'edu_year',
          type: 'number',
          label: 'Год окончания',
          required: true,
        },
        {
          name: 'edu_description',
          type: 'richText',
          label: 'Описание',
        },
      ],
    },
  ],
}
