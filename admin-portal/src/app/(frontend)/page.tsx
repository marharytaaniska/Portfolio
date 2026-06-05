import configPromise from '@payload-config'
import { getPayload } from 'payload'
 
export default async function HomePage() {
  const payload = await getPayload({ config: configPromise })
 
  // Глобалы
  const hero = await payload.findGlobal({ slug: 'hero' })
  const testimonialsSection = await payload.findGlobal({ slug: 'testimonials-section' })
  const background = await payload.findGlobal({ slug: 'background' })
  const contacts = await payload.findGlobal({ slug: 'contacts' })
 
  // Коллекции
  const { docs: tags } = await payload.find({ collection: 'tags', limit: 100 })
  const { docs: cases, totalDocs: totalCases } = await payload.find({
    collection: 'cases',
    limit: 8,
    sort: 'order',
  })
  const { docs: testimonials } = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: 'order',
  })
  const { docs: experience } = await payload.find({
    collection: 'experience',
    limit: 3,
    sort: 'order',
  })
  const { docs: courses } = await payload.find({
    collection: 'courses',
    limit: 100,
    sort: 'order',
  })
 
  return (
    <main>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="hero" style={{ padding: '80px 0' }}>
        <h1>{hero.title}</h1>
        <p>{hero.subtitle}</p>
        <a href={hero.button1_url}>{hero.button1_label}</a>
        {hero.button2_label && (
          <a href={hero.button2_url}>{hero.button2_label}</a>
        )}
      </section>
 
      {/* ── Cases ────────────────────────────────────────────── */}
      <section id="cases">
        <h2>Кейсы — {totalCases} проектов</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
          {cases.map((c) => (
            <a key={c.id} href={`/cases/${c.slug}`}>
              <div>{c.title}</div>
              <div>{c.niche} · {c.year}</div>
            </a>
          ))}
        </div>
      </section>
 
      {/* ── Testimonials ─────────────────────────────────────── */}
      <section id="testimonials">
        <h2>Отзывы</h2>
        {testimonialsSection.section_description && (
          <p>{testimonialsSection.section_description}</p>
        )}
        {testimonials.map((t) => (
          <blockquote key={t.id}>
            <p>{t.author_name} — {t.author_description}</p>
          </blockquote>
        ))}
      </section>
 
      {/* ── Background ───────────────────────────────────────── */}
      <section id="background">
        <h2>{background.section_title}</h2>
        {background.education && (
          <div>
            <h3>{background.education.edu_university}</h3>
            <p>{background.education.edu_specialty} · {background.education.edu_year}</p>
          </div>
        )}
        <h3>Курсы</h3>
        {courses.map((course) => (
          <div key={course.id}>
            {course.provider} — {course.course_name} ({course.year})
          </div>
        ))}
      </section>
 
      {/* ── Experience ───────────────────────────────────────── */}
      <section id="experience">
        <h2>Опыт работы</h2>
        {experience.map((job) => (
          <div key={job.id}>
            <h3>{job.position_title}</h3>
            <p>{job.company_name} · {job.period}</p>
          </div>
        ))}
      </section>
 
      {/* ── Contacts ─────────────────────────────────────────── */}
      <section id="contacts">
        <h2>{contacts.title}</h2>
        <a href={contacts.button1_url}>{contacts.button1_label}</a>
        {contacts.button2_label && (
          <a href={contacts.button2_url}>{contacts.button2_label}</a>
        )}
      </section>
    </main>
  )
}