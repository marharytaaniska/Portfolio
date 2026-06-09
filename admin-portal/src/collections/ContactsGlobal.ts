import type { GlobalConfig } from 'payload'

export const ContactsGlobal: GlobalConfig = {
  slug: 'contacts',
  label: 'Contacts',
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
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
      maxLength: 80,
      localized: true,
    },
    {
      name: 'description_1',
      type: 'richText',
      label: 'Описание 1',
      localized: true,
    },
    {
      name: 'description_2',
      type: 'richText',
      label: 'Описание 2',
      localized: true,
    },
    {
      name: 'button1_label',
      type: 'text',
      label: 'Кнопка 1 — текст',
      required: true,
      localized: true,
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
      localized: true,
    },
    {
      name: 'button2_url',
      type: 'text',
      label: 'Кнопка 2 — URL',
    },
    {
      name: 'social_links',
      type: 'array',
      label: 'Социальные сети',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Текст',
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
  ],
}
