import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  labels: {
    singular: 'Experience item',
    plural: 'Experience items',
  },
  admin: {
    useAsTitle: 'position_title',
    defaultColumns: ['position_title', 'company_name', 'period', 'order'],
    disableDuplicate: false,
  },
  fields: [
    {
      name: 'company_logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип компании',
    },
    {
      name: 'position_title',
      type: 'text',
      label: 'Должность',
      required: true,
      localized: true,
    },
    {
      name: 'company_name',
      type: 'text',
      label: 'Название компании',
      required: true,
    },
    {
      name: 'period',
      type: 'text',
      label: 'Период (свободный формат)',
      required: true,
      localized: true,
    },
    {
      name: 'responsibilities_title',
      type: 'text',
      label: 'Заголовок блока обязанностей',
      defaultValue: 'Обязанности и достижения',
      localized: true,
    },
    {
      name: 'responsibilities',
      type: 'richText',
      label: 'Обязанности и достижения',
      required: true,
      localized: true,
    },
    {
      name: 'links',
      type: 'array',
      label: 'Ссылки (макс. 2)',
      maxRows: 2,
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Текст ссылки',
          required: true,
          localized: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
    {
      name: 'related_cases',
      type: 'relationship',
      relationTo: 'cases',
      hasMany: true,
      label: 'Связанные кейсы (макс. 3)',
      maxDepth: 1,
      admin: {
        description: 'Выберите до 3 кейсов',
      },
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      required: true,
    },
  ],
}
