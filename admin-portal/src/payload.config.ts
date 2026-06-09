import { postgresAdapter } from '@payloadcms/db-postgres'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

// Шаблонные коллекции (оставляем)
import { Media } from './collections/Media'
import { Users } from './collections/Users'

// Новые коллекции из ТЗ
import { Tags } from './collections/Tags'
import { Cases } from './collections/Cases'
import { Testimonials } from './collections/Testimonials'
import { Experience } from './collections/Experience'

// Шаблонные глобалы (оставляем)
import { Header } from './Header/config'

// Новые глобалы из ТЗ
import { HeroGlobal } from './collections/HeroGlobal'
import { RelevantCasesGlobal } from './collections/RelevantCasesGlobal'
import { TestimonialsGlobal } from './collections/TestimonialsGlobal'
import { BackgroundGlobal } from './collections/BackgroundGlobal'
import { ContactsGlobal } from './collections/ContactsGlobal'
import { ExperienceGlobal } from './collections/ExperienceGlobal'
import { CaseDetailPageGlobal } from './collections/CaseDetailPageGlobal'
import { CaseAccessGlobal } from './collections/CaseAccessGlobal'

import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  localization: {
    locales: [
      { label: 'Русский', code: 'ru' },
      { label: 'English', code: 'en' },
    ],
    defaultLocale: 'ru',
    fallback: true,
  },
  admin: {
    components: {
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  editor: defaultLexical,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  collections: [
    // Шаблонные
    Media,
    Users,
    // Из ТЗ
    Tags,
    Cases,
    Testimonials,
    Experience,
  ],
  globals: [
    // Шаблонные
    Header,
    // Из ТЗ
    HeroGlobal,
    RelevantCasesGlobal,
    TestimonialsGlobal,
    BackgroundGlobal,
    ExperienceGlobal,
    ContactsGlobal,
    CaseDetailPageGlobal,
    CaseAccessGlobal,
  ],
  cors: [getServerSideURL()].filter(Boolean),
  plugins,
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        if (req.user) return true
        const secret = process.env.CRON_SECRET
        if (!secret) return false
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${secret}`
      },
    },
    tasks: [],
  },
})
