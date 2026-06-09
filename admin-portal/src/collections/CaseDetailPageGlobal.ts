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
  ],
}
