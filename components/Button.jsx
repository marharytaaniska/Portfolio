// Button — pill, three sizes × three accents × four states.
// From Figma /Components/components/SizeLarge*, SizeMedium*, SizeSmall*.
//   accent: "primary" (filled navy) | "secondary" (outline) | "text" (label only)
//   size:   "lg" (h=64, py=24/px=24, label 20/28) — used in hero/contact CTAs
//           "md" (h=48, py=12/px=24, label 20/28) — header CTAs
//           "sm" (h=24, label 16/24, underlined)  — inline links in lists
//   state:  hover/active/disabled — driven by data-state OR :hover
//
// Notes:
//  • No radius-other-than-pill, no shadow, no transform on press.
//  • Pressed primary = #1A364C (same as hover). Disabled bg = #F5F5F6.
//  • Outline buttons have 1px #E1E1E1 border; on hover the LABEL darkens, not the border.

function Button({
  children,
  size = "lg",
  accent = "primary",
  state,
  href,
  onClick,
  style,
  ...rest
}) {
  const sizes = {
    lg: { height: 64, padX: 24, padY: 18, fontSize: 20, lineHeight: 28 },
    md: { height: 48, padX: 24, padY: 10, fontSize: 20, lineHeight: 28 },
    sm: { height: 24, padX: 0,  padY: 0,  fontSize: 16, lineHeight: 24 },
  };
  const s = sizes[size];

  const base = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    height: s.height,
    padding: size === "sm" ? 0 : `${s.padY}px ${s.padX}px`,
    borderRadius: 9999,
    font: `500 ${s.fontSize}px/${s.lineHeight}px var(--font-body)`,
    cursor: state === "disabled" ? "not-allowed" : "pointer",
    transition: "background-color .15s ease, color .15s ease, border-color .15s ease",
    whiteSpace: "nowrap",
    border: "1px solid transparent",
    textDecoration: "none",
    userSelect: "none",
  };

  // Accent-specific styles (default state)
  const accentStyles = {
    primary: {
      backgroundColor: state === "disabled" ? "var(--ink-100)" : (state === "hover" || state === "active") ? "var(--ink-800)" : "var(--ink-900)",
      color: state === "disabled" ? "var(--ink-200)" : "var(--white)",
      borderColor: "transparent",
    },
    secondary: {
      backgroundColor: state === "disabled" ? "var(--ink-100)" : "transparent",
      color: state === "disabled" ? "var(--ink-200)" : "var(--ink-900)",
      borderColor: state === "disabled" ? "transparent" : "var(--ink-200)",
    },
    // Ghost — pill-shaped tap target with no border / no fill. Used for header CV / Copy email.
    // Per Figma SizeMediumStateDefaultAccent: just a label in a 9999-radius padding box.
    ghost: {
      backgroundColor: "transparent",
      color: state === "disabled" ? "var(--ink-200)" : "var(--ink-900)",
      borderColor: "transparent",
    },
    // Inline link: weight 400 (not 500), color #4F5C65 (ink-600), Inter underlined.
    // Per Figma:
    //   default (no size or size="lg") → 18 / 26  (SizeBigStateDefault)
    //   size="sm"                       → 16 / 24  (SizeSmallStateDefault)
    text: {
      backgroundColor: "transparent",
      color: "var(--ink-600)",
      borderColor: "transparent",
      textDecoration: "underline",
      textUnderlineOffset: 2,
      padding: 0,
      height: "auto",
      // Both sizes use 18/26 on desktop+tablet per spec (mobile drops to 14/22 via CSS).
      font: "400 18px/26px var(--font-body)",
    },
  };

  const computed = { ...base, ...accentStyles[accent], ...style };

  // Hover overrides via inline event handlers (since we're not using CSS-in-JS).
  const [isHover, setHover] = React.useState(false);
  const [isDown, setDown] = React.useState(false);
  if (state !== "disabled" && (isHover || isDown)) {
    if (accent === "primary") {
      computed.backgroundColor = "var(--ink-800)";
    } else if (accent === "secondary") {
      computed.borderColor = "var(--ink-900)";
    } else if (accent === "ghost") {
      // Borderless header buttons hover to ink-900 (deep navy).
      computed.color = "var(--ink-900)";
    } else if (accent === "text") {
      // Inline links — both sizes — go red on hover.
      computed.color = "var(--accent)";
    }
  }

  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={state === "disabled" ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setDown(false); }}
      onMouseDown={() => setDown(true)}
      onMouseUp={() => setDown(false)}
      style={computed}
      disabled={state === "disabled"}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// MetaDot — the 8px gray bullet used between tag/year etc.
function MetaDot({ size = 16 }) {
  return (
    <span
      aria-hidden="true"
      style={{
        display: "inline-block",
        width: size,
        height: size,
        position: "relative",
      }}
    >
      <span
        style={{
          position: "absolute",
          left: size / 2 - 3,
          top: size / 2 - 3,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "var(--ink-400)",
          opacity: 0.8,
        }}
      />
    </span>
  );
}

// LiveDot — the red 10px filled circle inside a 16px ring (the "you are here / live" indicator).
function LiveDot() {
  return (
    <span
      aria-hidden="true"
      style={{
        position: "relative",
        display: "inline-block",
        width: 16,
        height: 16,
        borderRadius: "50%",
        border: "1px solid var(--accent)",
      }}
    >
      <span
        style={{
          position: "absolute",
          inset: 2,
          borderRadius: "50%",
          background: "var(--accent)",
        }}
      />
    </span>
  );
}

Object.assign(window, { Button, MetaDot, LiveDot });
