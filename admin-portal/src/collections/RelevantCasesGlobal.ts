import type { GlobalConfig } from 'payload'

export const RelevantCasesGlobal: GlobalConfig = {
  slug: 'relevant-cases-section',
  label: 'Cases',
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
      name: 'section_title',
      type: 'text',
      label: 'Заголовок секции',
      defaultValue: 'Relevant cases',
      required: true,
      localized: true,
    },
    {
      name: 'all_tag_label',
      type: 'text',
      label: 'Метка тега "All"',
      defaultValue: 'All',
      localized: true,
    },
    {
      name: 'show_more_label',
      type: 'text',
      label: 'Текст кнопки "Show more"',
      defaultValue: 'Show more',
      localized: true,
    },
  ],
}
