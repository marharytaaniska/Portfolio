import type { GlobalConfig } from 'payload'

export const SiteSettingsGlobal: GlobalConfig = {
  slug: 'site-settings',
  label: 'Настройки сайта',
  fields: [
    {
      name: 'cv_url',
      type: 'text',
      label: 'Ссылка на CV / резюме',
      admin: {
        description: 'URL, который открывается при нажатии кнопок «CV» и «Download CV» по всему сайту.',
      },
    },
    {
      name: 'contact_email',
      type: 'email',
      label: 'Email для кнопки «Copy Email»',
      admin: {
        description: 'Этот адрес копируется в буфер обмена при нажатии «Copy Email» (в шапке, меню и разделе Контакты).',
      },
    },
  ],
}
