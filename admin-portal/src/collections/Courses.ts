import type { CollectionConfig } from 'payload'

export const Courses: CollectionConfig = {
  slug: 'courses',
  labels: {
    singular: 'Курс',
    plural: 'Курсы',
  },
  admin: {
    useAsTitle: 'course_name',
    defaultColumns: ['course_name', 'provider', 'year', 'order'],
    disableDuplicate: false,
  },
  fields: [
    {
      name: 'courses_label',
      type: 'text',
      label: 'Лейбл секции',
      required: true,
      defaultValue: 'Курсы',
    },
    {
      name: 'provider',
      type: 'text',
      label: 'Провайдер',
      required: true,
    },
    {
      name: 'course_name',
      type: 'text',
      label: 'Название курса',
      required: true,
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
}
