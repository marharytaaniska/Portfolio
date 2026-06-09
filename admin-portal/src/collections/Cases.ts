import type { CollectionConfig } from 'payload'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: {
    singular: 'Кейс',
    plural: 'Кейсы',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'niche', 'year', 'is_featured', 'order'],
    disableDuplicate: false,
  },
  fields: [
    // ── Основные поля ──────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
      maxLength: 60,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      admin: {
        description: 'Заполняется автоматически из названия (RU)',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value, data, req }) => {
            // Only regenerate from the default locale to keep slug stable across locales
            if (req?.locale && req.locale !== 'ru') return value
            const title = typeof data?.title === 'string' ? data.title : ''
            if (title) {
              return title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
            }
            return value
          },
        ],
      },
    },
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка (фото или видео)',
      required: true,
    },
    {
      name: 'niche',
      type: 'text',
      label: 'Ниша',
      required: true,
      localized: true,
    },
    {
      name: 'year',
      type: 'number',
      label: 'Год',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Теги',
      required: true,
    },
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
    },
    {
      name: 'is_featured',
      type: 'checkbox',
      label: 'Избранный',
      defaultValue: false,
    },

    // ── Шапка детальной страницы ───────────────────────────────
    {
      name: 'description',
      type: 'richText',
      label: 'Описание (шапка кейса)',
      required: true,
      localized: true,
    },
    {
      name: 'client',
      type: 'text',
      label: 'Клиент',
      localized: true,
    },

    // ── Конструктор блоков ─────────────────────────────────────
    {
      name: 'content_blocks',
      type: 'blocks',
      label: 'Блоки контента',
      required: true,
      blocks: [
        // Блок A: Текстовый
        {
          slug: 'text_block',
          labels: { singular: 'Текстовый блок', plural: 'Текстовые блоки' },
          fields: [
            {
              name: 'has_title',
              type: 'checkbox',
              label: 'Показывать заголовок',
              defaultValue: false,
            },
            {
              name: 'title',
              type: 'text',
              label: 'Заголовок',
              localized: true,
              admin: {
                condition: (_, siblingData) => siblingData?.has_title,
              },
            },
            {
              name: 'paragraphs',
              type: 'array',
              label: 'Абзацы',
              fields: [
                {
                  name: 'content',
                  type: 'richText',
                  label: 'Текст абзаца',
                  localized: true,
                },
              ],
            },
          ],
        },

        // Блок B: Медиа
        {
          slug: 'media_block',
          labels: { singular: 'Медиа-блок', plural: 'Медиа-блоки' },
          fields: [
            {
              name: 'images',
              type: 'array',
              label: 'Изображения (1 → full-width, 2+ → сетка)',
              fields: [
                {
                  name: 'image',
                  type: 'upload',
                  relationTo: 'media',
                  label: 'Изображение',
                },
              ],
            },
            {
              name: 'caption',
              type: 'text',
              label: 'Подпись',
              localized: true,
            },
          ],
        },

        // Блок C: Ссылка
        {
          slug: 'link_block',
          labels: { singular: 'Блок-ссылка', plural: 'Блоки-ссылки' },
          fields: [
            {
              name: 'link_label',
              type: 'text',
              label: 'Текст ссылки',
              required: true,
              localized: true,
            },
            {
              name: 'link_url',
              type: 'text',
              label: 'URL ссылки',
              required: true,
            },
            {
              name: 'button_label',
              type: 'text',
              label: 'Текст кнопки',
              localized: true,
            },
            {
              name: 'button_url',
              type: 'text',
              label: 'URL кнопки',
            },
          ],
        },
      ],
    },
  ],
}
