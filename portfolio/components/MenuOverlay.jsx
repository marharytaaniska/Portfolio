// MenuOverlay — the hamburger-driven nav drawer for tablet & mobile.
//
// Two layouts, swapped by CSS:
//   Tablet (728–1023): a 250×auto white popover, rounded 16, pinned 16px below the header
//                      and 32px from the right edge. Backdrop dims the rest of the page.
//                      Contents: language switch + 6 nav items, gap 24.
//   Mobile (≤727):    fullscreen sheet under the header. Contents:
//                      language switch (top) · nav items (middle) · CV/Copy email (bottom).
//
// Mirrors the Figma /Concept/tablet-menu and /Concept/mobile-menu frames.

function MenuOverlay({
  open,
  onClose,
  active = "Я",
  onSelect = () => {},
  lang = "RU",
  onLangChange = () => {},
}) {
  const items = ["Я", "Кейсы", "Отзывы", "Бэкграунд", "Опыт", "Контакты"];
  const [copied, setCopied] = React.useState(false);

  // Lock body scroll while open
  React.useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // Close on Escape
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSelect = (label) => {
    onSelect(label);
    onClose();
  };

  return (
    <div className="menu-overlay" role="dialog" aria-modal="true">
      {/* Backdrop — dims the page; clicking it closes the menu */}
      <div className="menu-backdrop" onClick={onClose} aria-hidden="true" />

      {/* Panel — tablet popover OR mobile fullscreen sheet, decided by CSS */}
      <div className="menu-panel">
        <div className="menu-panel-inner">
          <div className="menu-lang">
            <LanguageSwitch value={lang} onChange={onLangChange} />
          </div>

          <nav className="menu-items">
            {items.map((label) => {
              const isActive = label === active;
              return (
                <a
                  key={label}
                  href={`#${label}`}
                  onClick={(e) => { e.preventDefault(); handleSelect(label); }}
                  className={isActive ? "menu-item is-active" : "menu-item"}
                >
                  <span>{label}</span>
                  {isActive ? <LiveDot /> : null}
                </a>
              );
            })}
          </nav>

          {/* Mobile-only — CV / Copy email get moved into the menu, since the
              mobile header drops them. Hidden by CSS on tablet. */}
          <div className="menu-cta-block">
            <hr className="menu-divider" />
            <div className="menu-cta-row">
              <Button size="md" accent="secondary" style={{ flex: 1, minWidth: 0 }}>
                CV
              </Button>
              <Button
                size="md"
                accent="secondary"
                style={{ flex: 1, minWidth: 0 }}
                onClick={() => {
                  navigator.clipboard?.writeText("hi@marga.design");
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1400);
                }}
              >
                {copied ? "Скопировано" : "Copy email"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { MenuOverlay });
