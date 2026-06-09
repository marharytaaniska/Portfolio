import type { GlobalConfig } from 'payload'

export const ExperienceGlobal: GlobalConfig = {
  slug: 'experience-section',
  label: 'Experience',
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
    // ── Контент секции ──────────────────────────────────────────
    {
      name: 'section_title',
      type: 'text',
      label: 'Заголовок секции',
      defaultValue: 'Опыт',
      required: true,
      localized: true,
    },
    {
      name: 'section_description',
      type: 'richText',
      label: 'Описание секции (необязательно)',
      localized: true,
    },
    {
      name: 'show_more_label',
      type: 'text',
      label: 'Кнопка "Показать ещё"',
      defaultValue: '+ Показать ещё 1 место работы',
      localized: true,
    },
    {
      name: 'collapse_label',
      type: 'text',
      label: 'Кнопка "Свернуть"',
      defaultValue: 'Свернуть',
      localized: true,
    },
  ],
}
