import type { GlobalConfig } from 'payload'

export const ContactsGlobal: GlobalConfig = {
  slug: 'contacts',
  label: 'Контакты',
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Заголовок',
      required: true,
      maxLength: 80,
    },
    {
      name: 'description_1',
      type: 'richText',
      label: 'Описание 1',
    },
    {
      name: 'description_2',
      type: 'richText',
      label: 'Описание 2',
    },
    {
      name: 'button1_label',
      type: 'text',
      label: 'Кнопка 1 — текст',
      required: true,
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
