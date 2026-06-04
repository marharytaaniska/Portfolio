// ReviewModal — full-text review reader.
//
// Opens when a ReviewCard's "Читать полностью" link is clicked (i.e. only when
// the quote was too long to fit the card). Shows the complete quote, the
// author and their role.
//
// On-brand to the system:
//   · square edges (radius 0 — every surface that isn't interactive is square)
//   · no shadow (the README allows exactly one shadow in the whole system, and
//     it is NOT on modals)
//   · monochrome — ink scrim, white panel, ink type
//   · a word, not an icon, for close ("Закрыть") per the icon-light rule
//
// Backdrop click and Escape both close. Body scroll is locked while open.
function ReviewModal({ review, onClose = () => {} }) {
  const open = !!review;

  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="review-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`Отзыв — ${review.author}`}
    >
      <div className="review-modal-backdrop" onClick={onClose} aria-hidden="true" />

      <div className="review-modal-panel" role="document">
        <button type="button" className="review-modal-close" onClick={onClose} aria-label="Закрыть">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>

        <p className="review-modal-quote">{review.quote}</p>

        <div className="review-modal-author">
          <h3>{review.author}</h3>
          <span>{review.role}</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { ReviewModal });
