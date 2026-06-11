import type { GlobalConfig } from 'payload'

export const NotFoundPageGlobal: GlobalConfig = {
  slug: 'not-found-page',
  label: '404 Page',
  admin: {
    group: 'Globals',
  },
  fields: [
    {
      name: 'title',
      type: 'textarea',
      label: 'Заголовок',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'text',
      label: 'Описание',
      required: true,
      localized: true,
    },
    {
      name: 'button_label',
      type: 'text',
      label: 'Кнопка — текст',
      required: true,
      localized: true,
    },
    {
      name: 'button_url',
      type: 'text',
      label: 'Кнопка — URL',
      required: true,
    },
  ],
}
