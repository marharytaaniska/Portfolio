import type { GlobalConfig } from 'payload'

export const CaseDetailPageGlobal: GlobalConfig = {
  slug: 'case-detail-page',
  label: 'Case item details',
  admin: {
    group: 'Globals',
  },
  fields: [
    {
      name: 'label_client',
      type: 'text',
      label: 'Метка «Client»',
      required: true,
      localized: true,
    },
    {
      name: 'label_services',
      type: 'text',
      label: 'Метка «Services»',
      required: true,
      localized: true,
    },
    {
      name: 'label_industries',
      type: 'text',
      label: 'Метка «Industries»',
      required: true,
      localized: true,
    },
    {
      name: 'label_date',
      type: 'text',
      label: 'Метка «Date»',
      required: true,
      localized: true,
    },
    {
      name: 'back_label',
      type: 'text',
      label: 'Кнопка «Назад»',
      required: false,
      localized: true,
    },
    {
      name: 'related_cases_title',
      type: 'text',
      label: 'Related Cases Title',
      localized: true,
      defaultValue: 'Related Cases',
      admin: {
        description: 'Heading displayed above the Related Cases section',
      },
    },
    {
      name: 'related_cases_description',
      type: 'richText',
      label: 'Related Cases Description',
      localized: true,
      admin: {
        description: 'Optional text displayed below the Related Cases heading',
      },
    },
    {
      name: 'related_cases_button_label',
      type: 'text',
      label: 'Related Cases Button Label',
      localized: true,
      admin: {
        description: 'Label for the button next to the Related Cases heading',
      },
    },
    {
      name: 'related_cases_button_url',
      type: 'text',
      label: 'Related Cases Button URL',
      admin: {
        description: 'Anchor or path the button links to (e.g. /#cases)',
      },
    },
  ],
}
