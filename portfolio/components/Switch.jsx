// LanguageSwitch — pill with two segments, one is the active "thumb"
// with a soft 0 2px 4px rgba(0,0,0,.05) shadow.
// Exact Figma dimensions: outer 135×48, segment 60×38.
function LanguageSwitch({ value = "RU", onChange = () => {} }) {
  const Segment = ({ label, active }) => (
    <button
      className="lang-switch-seg"
      onClick={() => onChange(label)}
      style={{
        all: "unset",
        cursor: "pointer",
        width: 60,
        height: 38,
        borderRadius: 9999,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        background: active ? "var(--white)" : "transparent",
        boxShadow: active ? "var(--shadow-segment)" : "none",
        color: active ? "var(--ink-900)" : "var(--ink-300)",
        font: "500 16px/24px var(--font-body)",
        transition: "color .15s ease",
      }}
    >
      {label}
    </button>
  );
  return (
    <div
      className="lang-switch"
      style={{
        display: "inline-flex",
        width: 135,
        height: 48,
        boxSizing: "border-box",
        background: "var(--ink-100)",
        borderRadius: 9999,
        padding: 5,
        gap: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Segment label="RU" active={value === "RU"} />
      <Segment label="EN" active={value === "EN"} />
    </div>
  );
}

Object.assign(window, { LanguageSwitch });
