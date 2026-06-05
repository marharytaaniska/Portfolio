// ExperienceEntry / CourseEntry / Position
// Standard 2-column layout: 885 (responsibilities) + 411 (linked cases) inside a 1360 row.
// Logo sits to the RIGHT of the heading (Figma uses a mirrored transform to achieve this);
// here we just place it explicitly.

function PositionHeader({ title, tag, year, logo }) {
  return (
    <div
      className="position-header"
      style={{
        display: "flex",
        alignItems: "center",
        // Desktop/tablet: 24 px between logo and title/meta block.
        // Mobile reduces this to 20 via CSS override.
        gap: 24,
      }}
    >
      <div
        aria-hidden="true"
        className="position-logo"
        style={{
          width: 64,
          height: 64,
          background: logo ? `url(${logo}) center / cover no-repeat` : "var(--ink-100)",
          flexShrink: 0,
        }}
      />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: 1, minWidth: 0 }}>
        <h2 style={{ margin: 0, font: "400 30px/36px var(--font-display)", color: "var(--ink-900)" }}>
          {title}
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 4, rowGap: 0 }}>
          <span style={{ font: "400 16px/24px var(--font-body)", color: "var(--ink-400)" }}>{tag}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "400 16px/24px var(--font-body)", color: "var(--ink-400)" }}>
            <MetaDot />
            <span>{year}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

function ExperienceEntry({ title, tag, year, logo, body, linkedCases = [], reviews = [] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
      <PositionHeader title={title} tag={tag} year={year} logo={logo} />
      <div className="exp-grid" style={{ display: "grid", gridTemplateColumns: "885fr 411fr", gap: 64 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h3 style={{ margin: 0, font: "400 24px/28px var(--font-display)", color: "var(--ink-900)" }}>
            Обязанности и достижения:
          </h3>
          <p style={{ margin: 0, font: "400 18px/26px var(--font-body)", color: "var(--ink-600)", whiteSpace: "pre-line", maxWidth: 750 }}>
            {body}
          </p>
          {reviews.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0 24px", marginTop: 8 }}>
              {reviews.map((r, i) => (
                <a
                  key={i}
                  href="#Отзывы"
                  className="inline-link"
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById("Отзывы");
                    if (el) {
                      const headerH =
                        parseInt(
                          getComputedStyle(document.documentElement).getPropertyValue("--header-h")
                        ) || 0;
                      const top =
                        el.getBoundingClientRect().top + window.scrollY - headerH - 16;
                      window.scrollTo({ top, behavior: "smooth" });
                    }
                  }}
                  style={{ font: "400 18px/26px var(--font-body)" }}
                >
                  {r}
                </a>
              ))}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <h3 style={{ margin: 0, font: "400 24px/28px var(--font-display)", color: "var(--ink-900)" }}>
            Связанные кейсы:
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
            {linkedCases.map((c, i) => (
              <a
                key={i}
                href={`#case-${i}`}
                className="inline-link"
                onClick={(e) => e.preventDefault()}
                style={{ font: "400 18px/26px var(--font-body)" }}
              >
                {c}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CourseEntry({ title, tag, year }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      <h3 style={{ margin: 0, font: "400 24px/28px var(--font-display)", color: "var(--ink-900)" }}>
        {title}
      </h3>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 4, rowGap: 0 }}>
        <span style={{ font: "400 16px/24px var(--font-body)", color: "var(--ink-400)" }}>{tag}</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "400 16px/24px var(--font-body)", color: "var(--ink-400)" }}>
          <MetaDot />
          <span>{year}</span>
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { ExperienceEntry, CourseEntry, PositionHeader });
