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
  },
  fields: [
    {
      name: 'text',
      type: 'richText',
      label: 'Текст отзыва',
      required: true,
      // maxLength: 3000 — применяется на уровне валидации фронта
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
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
    },
  ],
}
