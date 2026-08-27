import type { GlobalConfig } from 'payload'

export const KufarReviewsGlobal: GlobalConfig = {
  slug: 'kufar-reviews-section',
  label: 'Kufar Reviews',
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
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      label: 'Логотип (SVG)',
      admin: { description: 'Пока плейсхолдер, позже заменить на настоящий логотип' },
    },
    {
      name: 'heading',
      type: 'text',
      label: 'Заголовок (H2)',
      defaultValue: 'Репутация, построенная годами...',
      localized: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Текст описание',
      defaultValue:
        'Если референсы коллег в 2026 году уже не вызывают доверия, то у меня есть ещё один козырь. Я хороший и честный человек и могу это доказать.',
      localized: true,
    },
    {
      name: 'rating_image',
      type: 'upload',
      relationTo: 'media',
      label: 'Виджет рейтинга (картинка)',
    },
    {
      name: 'reviews',
      type: 'array',
      label: 'Отзывы (картинки)',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
