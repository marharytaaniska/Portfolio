import type { GlobalConfig } from 'payload'

export const SiteSettingsGlobal: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    group: 'Settings',
  },
  fields: [
    {
      name: 'og_image',
      type: 'upload',
      relationTo: 'media',
      label: 'OG Image',
      admin: {
        description: 'Изображение при шаринге сайта в соцсетях и мессенджерах. Рекомендуемый размер: 1200×630px.',
      },
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
      label: 'Favicon',
      admin: {
        description: 'Иконка во вкладке браузера. Загрузи .ico, .svg или .png файл.',
      },
    },
  ],
}
