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
  },
  fields: [
    // ── Основные поля ──────────────────────────────────────────
    {
      name: 'title',
      type: 'text',
      label: 'Название',
      required: true,
      maxLength: 60,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      admin: {
        description: 'Заполняется автоматически из названия',
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.title) {
              return data.title
                .toLowerCase()
                .replace(/\s+/g, '-')
                .replace(/[^\w-]/g, '')
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
    },
    {
      name: 'client',
      type: 'text',
      label: 'Клиент',
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Услуги',
    },
    {
      name: 'date',
      type: 'text',
      label: 'Дата (свободный формат)',
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
