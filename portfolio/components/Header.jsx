// Header — fixed top bar. Three responsive variants mirror the Figma device frames:
//   Desktop (≥1024)         → clock | (CV, Copy email) | divider | RU/EN switch
//   Tablet  (728–1023)      → clock | (CV, Copy email) | hamburger
//   Mobile  (≤727)          → clock |                  | hamburger
// The hamburger button is the same 40×40 pill seen in DeviceTableState…/DeviceMobileState…;
// it flips between an icon-menu (two horizontal bars) and icon-close (X) when active.
// Layout is driven by CSS classes so media queries can hide/show the right elements.

function IconMenu() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 8.706h22M1 15.294h22" stroke="currentColor" strokeWidth="1.412" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 4l16 16M20 4L4 20"
        stroke="currentColor"
        strokeWidth="1.412"
        strokeLinecap="square"
      />
    </svg>
  );
}

function Header({ menuOpen = false, onMenuToggle = () => {} }) {
  const [now, setNow] = React.useState(() => new Date());
  React.useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = now.toLocaleTimeString("ru-RU", { hour12: false });

  const [lang, setLang] = React.useState("RU");
  const [copied, setCopied] = React.useState(false);

  return (
    <header
      className="site-header"
      style={{
        position: "fixed",
        inset: "0 0 auto 0",
        height: "var(--header-h)",
        background: "var(--white)",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 32px",
        zIndex: 60,
      }}
    >
      <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
        <span className="header-tz" style={{ font: "500 20px/1 var(--font-body)", color: "var(--ink-300)", flexShrink: 0 }}>
          +3GMT
        </span>
        <span
          className="header-time"
          style={{
            font: "500 20px/1 var(--font-body)",
            color: "var(--ink-900)",
            width: 82,
            flexShrink: 0,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {time}
        </span>
      </div>

      <div style={{ display: "inline-flex", alignItems: "center", gap: 24 }}>
        <div className="header-buttons" style={{ display: "inline-flex", gap: 12 }}>
          <Button size="md" accent="ghost" onClick={() => window.open("#cv", "_self")}>
            CV
          </Button>
          <Button
            size="md"
            accent="ghost"
            onClick={() => {
              navigator.clipboard?.writeText("hi@marga.design");
              setCopied(true);
              setTimeout(() => setCopied(false), 1400);
            }}
          >
            {copied ? "Скопировано" : "Copy email"}
          </Button>
        </div>
        <span
          aria-hidden="true"
          className="header-divider"
          style={{
            display: "inline-block",
            width: 1,
            height: 36,
            background: "var(--border)",
          }}
        />
        <div className="header-lang-switch">
          <LanguageSwitch value={lang} onChange={setLang} />
        </div>

        {/* Hamburger — visible only below 1024 */}
        <button
          type="button"
          className="header-menu-btn"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={onMenuToggle}
          style={{
            all: "unset",
            cursor: "pointer",
            width: 40,
            height: 40,
            borderRadius: 9999,
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--ink-900)",
            transition: "background-color .15s ease",
          }}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </div>
    </header>
  );
}

Object.assign(window, { Header, IconMenu, IconClose });
