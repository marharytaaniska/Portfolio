import type { CollectionConfig } from 'payload'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: {
    singular: 'Отзыв',
    plural: 'Отзывы',
  },
  admin: {
    useAsTitle: 'author_name',
    defaultColumns: ['author_name', 'author_description', 'order'],
    disableDuplicate: false,
  },
  fields: [
    {
      name: 'text',
      type: 'richText',
      label: 'Текст отзыва',
      required: true,
      localized: true,
    },
    {
      name: 'author_name',
      type: 'text',
      label: 'Имя автора',
      required: true,
    },
    {
      name: 'author_description',
      type: 'text',
      label: 'Описание автора',
      required: true,
      localized: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
    },
  ],
}
