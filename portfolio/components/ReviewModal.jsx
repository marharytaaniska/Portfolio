// ReviewModal — full-text review reader.
// Desktop: × in panel top-right, text scrolls, author footer fixed.
// Mobile: text scrolls, author footer fixed, circular close FAB below panel.

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20.7754 4.99805L13.3857 12.3877L20.5547 19.5566L19.5566 20.5547L12.3877 13.3857L5.21875 20.5547L4.2207 19.5566L11.3896 12.3877L4 4.99805L4.99805 4L12.3877 11.3896L19.7773 4L20.7754 4.99805Z" fill="currentColor"/>
    </svg>
  );
}

function ReviewModal({ review, onClose }) {
  const handleClose = onClose || function() {};
  const open = !!review;

  React.useEffect(function() {
    if (!open) return;
    var prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function onKey(e) { if (e.key === "Escape") handleClose(); }
    window.addEventListener("keydown", onKey);
    return function() {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="review-modal" role="dialog" aria-modal="true">
      <div className="review-modal-backdrop" onClick={handleClose} />

      <div className="review-modal-inner">
        <div className="review-modal-panel">
          <button type="button" className="review-modal-close" onClick={handleClose} aria-label="Закрыть">
            <CloseIcon />
          </button>

          <div className="review-modal-body">
            <p className="review-modal-quote">{review.quote}</p>
          </div>

          <div className="review-modal-author">
            <h3>{review.author}</h3>
            <span>{review.role}</span>
          </div>
        </div>

        <button type="button" className="review-modal-close-fab" onClick={handleClose} aria-label="Закрыть">
          <CloseIcon />
        </button>
      </div>
    </div>
  );
}

window.ReviewModal = ReviewModal;
