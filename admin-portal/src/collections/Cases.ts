import type { CollectionConfig } from 'payload'
import { transliterate } from '@/utilities/transliterate'

export const Cases: CollectionConfig = {
  slug: 'cases',
  labels: {
    singular: 'Cases item',
    plural: 'Cases items',
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'enabled', 'niche', 'year', 'order'],
    disableDuplicate: false,
  },
  fields: [
    // ── Visibility ────────────────────────────────────────────
    {
      name: 'enabled',
      type: 'checkbox',
      label: 'Published',
      defaultValue: true,
      admin: { description: 'Show this case on the website' },
    },

    // ── Name + Slug (same row) ─────────────────────────────────
    {
      type: 'row',
      fields: [
        {
          name: 'title',
          type: 'text',
          label: 'Название',
          required: true,
          maxLength: 60,
          localized: true,
          admin: { width: '50%' },
        },
        {
          name: 'slug',
          type: 'text',
          label: 'Slug',
          required: true,
          admin: {
            width: '50%',
            description: 'Заполняется автоматически из названия. Можно редактировать вручную.',
          },
          hooks: {
            beforeValidate: [
              ({ value, data, req }) => {
                if (req?.locale && req.locale !== 'ru') return value
                // Only auto-generate when the slug is empty (preserve manual edits)
                if (value) return value
                const title = typeof data?.title === 'string' ? data.title : ''
                if (title) {
                  return transliterate(title)
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, '')
                }
                return value
              },
            ],
          },
        },
      ],
    },

    // ── Cover ─────────────────────────────────────────────────
    {
      name: 'cover',
      type: 'upload',
      relationTo: 'media',
      label: 'Обложка (фото или видео)',
      required: true,
    },
    {
      name: 'cover_autoplay',
      type: 'checkbox',
      label: 'Автовоспроизведение обложки-видео',
      defaultValue: true,
      admin: {
        description:
          'Включено: видео зациклено играет само, без звука. Выключено: видео запускается по клику, со звуком и элементами управления. Не влияет на изображения.',
      },
    },
    {
      name: 'hide_cover',
      type: 'checkbox',
      label: 'Скрыть обложку на странице кейса',
      defaultValue: false,
      admin: {
        description:
          'Обложка всё равно используется как превью кейса в списках и для соцсетей, но не показывается вверху страницы кейса.',
      },
    },

    // ── Client ────────────────────────────────────────────────
    {
      name: 'client',
      type: 'text',
      label: 'Клиент',
      localized: true,
    },

    // ── Tags ──────────────────────────────────────────────────
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
      label: 'Теги',
      required: true,
    },

    // ── Niche ─────────────────────────────────────────────────
    {
      name: 'niche',
      type: 'text',
      label: 'Ниша',
      required: true,
      localized: true,
    },

    // ── Year ──────────────────────────────────────────────────
    {
      name: 'year',
      type: 'number',
      label: 'Год',
      required: true,
    },

    // ── Description (case header) ──────────────────────────────
    {
      name: 'description',
      type: 'richText',
      label: 'Описание (шапка кейса)',
      required: true,
      localized: true,
    },

    // ── Order ─────────────────────────────────────────────────
    {
      name: 'order',
      type: 'number',
      label: 'Порядок',
    },

    // ── Featured ──────────────────────────────────────────────
    {
      name: 'is_featured',
      type: 'checkbox',
      label: 'Избранный',
      defaultValue: false,
    },

    // ── Password Protection ────────────────────────────────────
    {
      name: 'password_required',
      type: 'checkbox',
      label: 'Password Required',
      defaultValue: false,
      admin: { description: 'Protect this case with a password' },
    },
    {
      name: 'password',
      type: 'text',
      label: 'Password',
      admin: {
        condition: (data) => Boolean(data?.password_required),
        description: 'Required to view this case',
      },
    },

    // ── Content blocks ─────────────────────────────────────────
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
                {
                  name: 'autoplay',
                  type: 'checkbox',
                  label: 'Автовоспроизведение (только для видео)',
                  defaultValue: true,
                  admin: {
                    description:
                      'Включено: видео зациклено играет само, без звука. Выключено: видео запускается по клику, со звуком и элементами управления. Не влияет на изображения.',
                  },
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
          ],
        },

        // Блок D: Кнопка
        {
          slug: 'button_block',
          labels: { singular: 'Блок-кнопка', plural: 'Блоки-кнопки' },
          fields: [
            {
              name: 'button_label',
              type: 'text',
              label: 'Текст кнопки',
              required: true,
              localized: true,
            },
            {
              name: 'button_url',
              type: 'text',
              label: 'URL кнопки',
              required: true,
            },
          ],
        },

        // Блок E: Разделитель
        {
          slug: 'divider_block',
          labels: { singular: 'Разделитель', plural: 'Разделители' },
          fields: [],
        },
      ],
    },

    // ── Related Cases ──────────────────────────────────────────
    {
      name: 'related_cases',
      type: 'relationship',
      label: 'Related Cases',
      relationTo: 'cases',
      hasMany: true,
      filterOptions: ({ id }) => ({ id: { not_in: [id] } }),
      admin: {
        description: 'Select up to 2 cases to show in the Related Cases section',
      },
    },
  ],
}
