// CaseCard — image + name + tags + year. Two layouts: "small" (half-width) and "big" (full-width).
// No border, no radius, no shadow.
// The media sits inside a FIXED frame (overflow: hidden). On hover the inner image/placeholder
// smoothly zooms in (scale) while the frame stays exactly the same size — proper masking, object-fit: cover.
// Clicking the image OR the title navigates to `href` (the case-detail page).
function CaseCard({ size = "small", title = "Название кейса", tags = "Веб, Мобайл, Брендинг", year = 2026, image, onClick, href = "case-detail.html" }) {
  const [hover, setHover] = React.useState(false);

  const go = (e) => {
    if (onClick) { onClick(e); return; }
    if (href) window.location.href = href;
  };

  // Inner media layer — this is what scales. The parent frame masks it.
  const mediaStyle = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    transformOrigin: "center",
    transform: hover ? "scale(1.06)" : "scale(1)",
    transition: "transform .7s cubic-bezier(.16,.84,.34,1)",
    willChange: "transform",
  };

  return (
    <article
      onClick={go}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "100%",
        cursor: (onClick || href) ? "pointer" : "default",
      }}
    >
      {/* Fixed frame — never changes size. overflow: hidden masks the zooming media. */}
      <div
        style={{
          position: "relative",
          width: "100%",
          aspectRatio: size === "big" ? "1360 / 750" : "648 / 420",
          overflow: "hidden",
          background: "var(--ink-100)",
          filter: hover ? "brightness(.985)" : "none",
          transition: "filter .3s ease",
        }}
      >
        {image ? (
          <img
            src={image}
            alt={title}
            style={{ ...mediaStyle, objectFit: "cover", display: "block" }}
          />
        ) : (
          // Striped placeholder — zooms with the same masking so the effect is visible
          // even before a real screenshot is dropped in.
          <div
            style={{
              ...mediaStyle,
              backgroundColor: "var(--ink-100)",
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0, transparent 11px, rgba(13,30,44,.035) 11px, rgba(13,30,44,.035) 12px)",
            }}
          />
        )}

        {/* Monospace hint — sits on the frame, NOT inside the scaling layer, so it stays put. */}
        {!image && (
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              font: "400 13px/16px ui-monospace, Menlo, monospace",
              letterSpacing: ".04em",
              color: "var(--ink-400)",
              pointerEvents: "none",
            }}
          >
            превью кейса
          </span>
        )}
      </div>

      <div className="case-card-meta" style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 12 }}>
        <h3
          style={{
            margin: 0,
            font: "400 24px/28px var(--font-display)",
            color: "var(--ink-900)",
          }}
        >
          {title}
        </h3>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", columnGap: 4, rowGap: 0 }}>
          <span style={{ font: "400 16px/24px var(--font-body)", color: "var(--ink-400)" }}>{tags}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4, font: "400 16px/24px var(--font-body)", color: "var(--ink-400)" }}>
            <MetaDot />
            <span>{year}</span>
          </span>
        </div>
      </div>
    </article>
  );
}

Object.assign(window, { CaseCard });
