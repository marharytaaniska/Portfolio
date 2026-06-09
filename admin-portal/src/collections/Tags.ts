import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Тег',
    plural: 'Теги',
  },
  admin: {
    useAsTitle: 'tag_name',
    defaultColumns: ['tag_name', 'order'],
    defaultSort: 'order',
    group: 'Кейсы',
  },
  fields: [
    {
      name: 'tag_name',
      type: 'text',
      label: 'Название тега',
      required: true,
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
      admin: {
        description: 'Меньшее число — раньше в списке вкладок',
      },
    },
    {
      name: 'tag_slug',
      type: 'text',
      label: 'Slug',
      admin: {
        description: 'Заполняется автоматически из названия (RU)',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value, data, req }) => {
            // Only regenerate from default locale to keep slug stable
            if (req?.locale && req.locale !== 'ru') return value
            const name = typeof data?.tag_name === 'string' ? data.tag_name : ''
            if (name) {
              return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            }
            return value
          },
        ],
      },
    },
  ],
}
