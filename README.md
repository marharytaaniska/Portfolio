# Portfolio

Personal portfolio website of Marharyta Aniska. The repository contains two projects:

```
.
├── admin-portal/   # The main website: Next.js frontend + Payload CMS admin panel
└── portfolio/      # Static HTML/CSS prototype of the design (reference only)
```

## admin-portal

The production application — a bilingual (EN/RU) portfolio site with a built-in CMS.

**Stack:**

- [Next.js 16](https://nextjs.org/) (App Router, React 19)
- [Payload CMS 3](https://payloadcms.com/) with PostgreSQL (`@payloadcms/db-postgres`)
- [next-intl](https://next-intl.dev/) for localization (`messages/en.json`, `messages/ru.json`)
- Tailwind CSS 4, Radix UI, Lucide icons
- Vercel for hosting, Vercel Blob for media storage, Vercel Analytics + Google Analytics 4
- Vitest (integration) and Playwright (e2e) for tests
- Docker / docker-compose for local development

**Structure (`admin-portal/src`):**

- `app/(frontend)` — public site pages
- `app/(payload)` — Payload admin panel routes
- `collections/` — CMS content types: `Cases`, `Categories`, `Courses`, `Experience`, `Posts`, `Pages`, `Media`, `Tags`, `Testimonials`, `Users`
- `collections/*Global.ts` — site-wide globals: hero section, contacts, site settings, case access (password-protected cases), 404 page, etc.
- `blocks/`, `heros/`, `components/` — page building blocks and UI components
- `migrations/` — Payload database migrations

**Common commands** (run inside `admin-portal/`, uses pnpm):

```bash
pnpm dev        # start dev server
pnpm build      # run migrations + production build
pnpm test       # integration + e2e tests
```

Environment variables (database URL, Payload secret, blob storage token) are expected in `.env` — see `test.env` for the shape.

## portfolio

The original static markup of the design (`index.html`, `case-detail.html`, `colors_and_type.css`, fonts and components). Kept as a design reference; not deployed. Can be viewed locally with:

```bash
npm start   # serves the folder via `serve`
```
