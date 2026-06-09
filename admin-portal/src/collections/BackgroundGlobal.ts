import type { GlobalConfig } from 'payload'

export const BackgroundGlobal: GlobalConfig = {
  slug: 'background',
  label: 'Background',
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
    // ── Общая часть ─────────────────────────────────────────────
    {
      name: 'section_title',
      type: 'text',
      label: 'Заголовок секции',
      required: true,
      localized: true,
    },
    {
      name: 'section_description',
      type: 'richText',
      label: 'Описание секции',
      localized: true,
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
          localized: true,
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
          localized: true,
        },
        {
          name: 'edu_specialty',
          type: 'text',
          label: 'Специальность',
          required: true,
          localized: true,
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
          localized: true,
        },
      ],
    },

    // ── Курсы ────────────────────────────────────────────────────
    {
      name: 'courses_label',
      type: 'text',
      label: 'Лейбл раздела курсов',
      defaultValue: 'Курсы',
      localized: true,
    },
    {
      name: 'courses',
      type: 'array',
      label: 'Курсы',
      admin: {
        description: 'Список курсов и сертификатов',
      },
      fields: [
        {
          name: 'provider',
          type: 'text',
          label: 'Провайдер',
          required: true,
          localized: true,
        },
        {
          name: 'course_name',
          type: 'text',
          label: 'Название курса',
          required: true,
          localized: true,
        },
        {
          name: 'year',
          type: 'number',
          label: 'Год',
          required: true,
        },
        {
          name: 'order',
          type: 'number',
          label: 'Порядок',
        },
      ],
    },
  ],
}
