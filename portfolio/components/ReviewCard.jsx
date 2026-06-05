// ReviewCard — light-gray fill, 24px padding. Quote + author name + author tag.
// 668×296 in design; here it flexes to whatever column it's in.
//
// The quote is clamped to a fixed number of lines so every card is the same
// height. The "Читать полностью" link is shown ONLY when the quote actually
// overflows the clamp — short reviews read in full with no link. Clicking it
// hands the whole review up to the host (App) via onReadMore, which opens the
// review modal.
function ReviewCard({ quote, author, role, lines = 5, onReadMore = () => {} }) {
  const quoteRef = React.useRef(null);
  const [overflowing, setOverflowing] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = quoteRef.current;
    if (!el) return;
    const measure = () => {
      // scrollHeight exceeds clientHeight when the line-clamp has hidden text.
      setOverflowing(el.scrollHeight - el.clientHeight > 1);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [quote, lines]);

  return (
    <div
      className="review-card"
      style={{
        background: "var(--ink-100)",
        padding: 24,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 48,
        minHeight: 296,
        boxSizing: "border-box",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12, minHeight: 0 }}>
        <p
          ref={quoteRef}
          style={{
            margin: 0,
            font: "400 18px/26px var(--font-body)",
            color: "var(--ink-600)",
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: lines,
            overflow: "hidden",
          }}
        >
          {quote}
        </p>
        {overflowing && (
          <button
            type="button"
            className="review-readmore"
            onClick={() => onReadMore({ quote, author, role })}
          >
            Читать полностью
          </button>
        )}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <h3
          style={{
            margin: 0,
            font: "400 24px/28px var(--font-display)",
            color: "var(--ink-900)",
          }}
        >
          {author}
        </h3>
        <span style={{ font: "400 16px/24px var(--font-body)", color: "var(--ink-400)" }}>{role}</span>
      </div>
    </div>
  );
}

Object.assign(window, { ReviewCard });
