// Tab — pill chip used in the Cases filter row.
//   default — 1px #E1E1E1, label #A8B1B7
//   hover   — 1px #0D1E2C, label #0D1E2C
//   active  — 1px #0D1E2C, label #0D1E2C, with leading red live-dot
function Tab({ children, active = false, onClick }) {
  const [hover, setHover] = React.useState(false);
  const dark = active || hover;
  return (
    <button
      className="case-tab"
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        all: "unset",
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 48,
        padding: "0 16px",
        borderRadius: 9999,
        border: `1px solid ${dark ? "var(--ink-900)" : "var(--ink-200)"}`,
        background: "transparent",
        color: dark ? "var(--ink-900)" : "var(--ink-300)",
        font: "500 20px/28px var(--font-body)",
        cursor: "pointer",
        transition: "color .15s, border-color .15s",
        whiteSpace: "nowrap",
        boxSizing: "border-box",
      }}
    >
      {active && <LiveDot />}
      {children}
    </button>
  );
}

Object.assign(window, { Tab });
