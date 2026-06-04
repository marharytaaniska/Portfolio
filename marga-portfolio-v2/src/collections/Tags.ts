import type { CollectionConfig } from 'payload'

export const Tags: CollectionConfig = {
  slug: 'tags',
  labels: {
    singular: 'Тег',
    plural: 'Теги',
  },
  admin: {
    useAsTitle: 'tag_name',
  },
  fields: [
    {
      name: 'tag_name',
      type: 'text',
      label: 'Название тега',
      required: true,
    },
    {
      name: 'tag_slug',
      type: 'text',
      label: 'Slug',
      admin: {
        description: 'Заполняется автоматически из названия',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.tag_name) {
              return data.tag_name
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '')
            }
            return value
          },
        ],
      },
    },
  ],
}
