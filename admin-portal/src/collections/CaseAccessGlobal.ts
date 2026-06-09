import type { GlobalConfig } from 'payload'

export const CaseAccessGlobal: GlobalConfig = {
  slug: 'case-access',
  label: 'Case Access',
  admin: { group: 'Globals' },
  fields: [
    {
      name: 'modal_title',
      type: 'text',
      label: 'Modal Title',
      localized: true,
    },
    {
      name: 'password_placeholder',
      type: 'text',
      label: 'Password Input Placeholder',
      localized: true,
    },
    {
      name: 'continue_button_label',
      type: 'text',
      label: 'Continue Button Label',
      localized: true,
    },
    {
      name: 'invalid_password_error',
      type: 'text',
      label: 'Invalid Password Error Message',
      localized: true,
    },
  ],
}
