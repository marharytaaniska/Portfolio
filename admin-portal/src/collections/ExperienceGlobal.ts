import type { GlobalConfig } from 'payload'

export const ExperienceGlobal: GlobalConfig = {
  slug: 'experience-section',
  label: 'Секция — Опыт',
  admin: {
    group: 'Опыт',
  },
  fields: [
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

    // ── Стили секции ────────────────────────────────────────────
    {
      name: 'style',
      type: 'group',
      label: 'Стили секции',
      fields: [
        // --- Цвета ---
        {
          name: 'heading_color',
          type: 'select',
          label: 'Цвет заголовков',
          defaultValue: 'var(--ink-900)',
          options: [
            { label: 'Тёмный (основной)', value: 'var(--ink-900)' },
            { label: 'Тёмно-синий', value: 'var(--ink-800)' },
            { label: 'Серый', value: 'var(--ink-600)' },
            { label: 'Акцент (красный)', value: 'var(--accent)' },
          ],
        },
        {
          name: 'body_color',
          type: 'select',
          label: 'Цвет основного текста',
          defaultValue: 'var(--ink-600)',
          options: [
            { label: 'Тёмный', value: 'var(--ink-900)' },
            { label: 'Серый (основной)', value: 'var(--ink-600)' },
            { label: 'Светло-серый', value: 'var(--ink-400)' },
          ],
        },
        {
          name: 'meta_color',
          type: 'select',
          label: 'Цвет метаданных (компания, период)',
          defaultValue: 'var(--ink-400)',
          options: [
            { label: 'Серый', value: 'var(--ink-600)' },
            { label: 'Светло-серый (основной)', value: 'var(--ink-400)' },
            { label: 'Очень светлый', value: 'var(--ink-300)' },
          ],
        },
        {
          name: 'link_color',
          type: 'select',
          label: 'Цвет ссылок и кейсов',
          defaultValue: 'var(--ink-600)',
          options: [
            { label: 'Серый (основной)', value: 'var(--ink-600)' },
            { label: 'Тёмный', value: 'var(--ink-900)' },
            { label: 'Акцент (красный)', value: 'var(--accent)' },
          ],
        },

        // --- Отступы ---
        {
          name: 'entry_gap',
          type: 'number',
          label: 'Отступ между записями (px)',
          defaultValue: 64,
          min: 16,
          max: 128,
          admin: {
            description: 'Вертикальный отступ между карточками опыта работы',
          },
        },
        {
          name: 'inner_gap',
          type: 'number',
          label: 'Отступ внутри записи (px)',
          defaultValue: 48,
          min: 16,
          max: 96,
          admin: {
            description: 'Отступ между шапкой (логотип + должность) и блоком обязанностей',
          },
        },
        {
          name: 'col_gap',
          type: 'number',
          label: 'Отступ между колонками (px)',
          defaultValue: 64,
          min: 16,
          max: 128,
          admin: {
            description: 'Горизонтальный отступ между колонкой обязанностей и колонкой кейсов',
          },
        },

        // --- Вёрстка ---
        {
          name: 'responsibilities_ratio',
          type: 'number',
          label: 'Ширина колонки обязанностей (%)',
          defaultValue: 68,
          min: 40,
          max: 85,
          admin: {
            description:
              'Ширина левой колонки (обязанности) в % от общей ширины. Правая колонка (кейсы) займёт остаток.',
          },
        },
        {
          name: 'logo_size',
          type: 'number',
          label: 'Размер логотипа компании (px)',
          defaultValue: 64,
          min: 32,
          max: 120,
          admin: {
            description: 'Ширина и высота квадратного логотипа в шапке записи',
          },
        },

        // --- Типографика ---
        {
          name: 'section_title_size',
          type: 'select',
          label: 'Размер заголовка секции',
          defaultValue: '48px',
          options: [
            { label: 'Маленький — 32px', value: '32px' },
            { label: 'Средний — 40px', value: '40px' },
            { label: 'Большой — 48px (по умолчанию)', value: '48px' },
          ],
        },
        {
          name: 'body_font_size',
          type: 'select',
          label: 'Размер основного текста',
          defaultValue: '18px',
          options: [
            { label: 'Маленький — 16px', value: '16px' },
            { label: 'Средний — 18px (по умолчанию)', value: '18px' },
            { label: 'Большой — 20px', value: '20px' },
          ],
        },

        // --- Разделитель ---
        {
          name: 'divider_style',
          type: 'select',
          label: 'Разделитель между записями',
          defaultValue: 'dashed',
          options: [
            { label: 'Пунктирный (по умолчанию)', value: 'dashed' },
            { label: 'Сплошной', value: 'solid' },
            { label: 'Без разделителя', value: 'none' },
          ],
        },
      ],
    },
  ],
}
