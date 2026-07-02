// CaseBlocks — the modular content components used to assemble a case-detail page.
//
// Designed to be composed freely on a per-case basis (in future via an admin UI):
//   <CaseHero />            — page title (Inter Tight 48/56 medium) + 20/28 description
//   <CaseSummary />         — 4 meta columns (Client / Services / Industries / Date)
//                             with vertical dashed dividers; stacks vertically below 1024
//   <CaseSection>           — generic section divider (solid, dashed)
//   <CaseSingleImage />     — full-width image, 16:9 by default, gray placeholder
//   <CaseDoubleImage />     — two equal images side-by-side; stacks on tablet/mobile
//   <CaseText title? descriptions={[…]} />  — generic title + N descriptions block
//                                              (covers Description / 2..5 Description /
//                                               Title + Description / Title + 2..5 Description)
//
// Rich text:
//   Descriptions accept arbitrary JSX. Inside the body wrapper (.case-text):
//     <strong>...</strong>  →  Inter 500, color ink-900
//     <a href="...">...</a> →  underlined; hover color #FF1D1D
//   See styles in case-detail.html.

// ──────────────────────────────────────────────────────────────────
// Hero (Title + Description) — top of the case page.
// Title ≤ 1100 px, lives in the main content column (1360 px wide on desktop).
// ──────────────────────────────────────────────────────────────────
function CaseHero({ title, description }) {
  return (
    <header className="case-hero">
      <h1 className="case-hero-title">{title}</h1>
      {description ? (
        <p className="case-hero-desc case-text">{description}</p>
      ) : null}
    </header>
  );
}

// ──────────────────────────────────────────────────────────────────
// Summary — Client / Services / Industries / Date row.
// Desktop: 4 equal columns with vertical dashed dividers between.
// ≤1023: stacks to a vertical list with horizontal dashed dividers.
// ──────────────────────────────────────────────────────────────────
function CaseSummary({ items = [] }) {
  return (
    <div className="case-summary" role="list">
      {items.map((it, i) => (
        <div className="case-summary-cell" role="listitem" key={i}>
          <div className="case-summary-tag">{it.label}</div>
          <div className="case-summary-value">
            {Array.isArray(it.value)
              ? it.value.map((v, j) => <div key={j}>{v}</div>)
              : it.value}
          </div>
        </div>
      ))}
    </div>
  );
}

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg', '.mov']

function isVideo(src = "") {
  const path = src.split('?')[0].toLowerCase()
  return VIDEO_EXTENSIONS.some((ext) => path.endsWith(ext))
}

// ──────────────────────────────────────────────────────────────────
// SingleImage — full-width 16:9 swatch. Accepts `src` (URL) or falls back
// to gray placeholder. `caption` is rendered below if provided.
// ──────────────────────────────────────────────────────────────────
function CaseSingleImage({ src, alt = "", aspect = "1360 / 765", placeholder = "image" }) {
  return (
    <figure className="case-img-single">
      <div
       className="case-img-frame"
        style={{
          aspectRatio: aspect,
          background: src
            ? `url(${src}) center / cover no-repeat`
            : "var(--ink-100)",
        }}
        role="img"
        aria-label={alt || placeholder}
        >
        {src ? (
          isVideo(src) ? (+
            <video src={src} autoPlay loop muted playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={alt ?? ''} />
          )
        ) : (
          <span className="case-img-placeholder">{alt ?? 'image'}</span>
        )}
      </div>
    </figure>
  );
}


// ──────────────────────────────────────────────────────────────────
// DoubleImage — two images side-by-side on desktop (648 × 365 each, gap 64);
// stacks to a single column below 1024. Pass either `left`/`right` or `items=[…]`.
// ──────────────────────────────────────────────────────────────────
function CaseDoubleImage({ left, right, items, aspect = "648 / 365", placeholder = "image" }) {
  const pair = items || [{ src: left }, { src: right }];
  return (
    <figure className="case-img-double">
      {pair.slice(0, 2).map((it, i) => (
        <div
          key={i}
          className="case-img-frame"
          style={{
            aspectRatio: aspect,
            background: it.src
              ? `url(${it.src}) center / cover no-repeat`
              : "var(--ink-100)",
          }}
          role="img"
          aria-label={it.alt || placeholder}
        >
        {it.src  ? (
          isVideo(it.src ) ? (+
            <video src={it.src } autoPlay loop muted playsInline />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={it.src } alt={alt ?? ''} />
          )
        ) : (
          !it.src ? <span className="case-img-placeholder">{placeholder}</span> : null
        )}
        </div>
      ))}
    </figure>
  );
}

// ──────────────────────────────────────────────────────────────────
// CaseText — covers all the text-only Figma blocks in one component.
//
//   <CaseText descriptions={[ p1 ]} />                 →  Description
//   <CaseText descriptions={[ p1, p2 ]} />             →  2 Description
//   <CaseText descriptions={[ p1, p2, p3 ]} />         →  3 Description (and so on up to 5)
//   <CaseText title="…" descriptions={[ p1 ]} />       →  Title + Description
//   <CaseText title="…" descriptions={[ p1, p2 ]} />   →  Title + 2 Description (and so on)
//
// Optional `as="h2"|"h3"` controls heading level. Default h2 (30/36 regular per Figma).
// ──────────────────────────────────────────────────────────────────
function CaseText({ title, descriptions = [], as = "h2" }) {
  const HTag = as;
  return (
    <div className="case-text-block">
      {title ? <HTag className="case-block-title">{title}</HTag> : null}
      <div className="case-block-descriptions">
        {descriptions.map((d, i) => (
          <p key={i} className="case-text">{d}</p>
        ))}
      </div>
    </div>
  );
}


// ──────────────────────────────────────────────────────────────────
// CaseDivider — horizontal dashed divider used between major sections.
// Solid version separates content from contacts at the bottom.
// ──────────────────────────────────────────────────────────────────
function CaseDivider({ kind = "dashed" }) {
  return kind === "solid"
    ? <hr className="divider-solid case-divider" />
    : <hr className="divider-dashed case-divider" />;
}

// ──────────────────────────────────────────────────────────────────
// (Контакты lives in Contacts.jsx — shared with the home page so the block
// stays in sync everywhere it appears.)

Object.assign(window, {
  CaseHero,
  CaseSummary,
  CaseSingleImage,
  CaseDoubleImage,
  CaseText,
  CaseDivider,
});
