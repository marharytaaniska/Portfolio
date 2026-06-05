// Avatar â€” the only photographic element on the site.
// Per Figma: 180Ã—180 outer (1px rgba(255,29,29,0.30) ring) â†’ 132Ã—132 inner
// (1.5px solid #FF1D1D ring) â†’ 100Ã—100 photo, centered.
//
// The size is driven by the CSS variable --avatar-size (default 180px) so
// @media rules in index.html can shrink it per breakpoint without re-running
// React. Inner rings use percentage insets to scale proportionally.
//   24 / 180 = 13.333%  (outer â†’ middle ring)
//   16 / 132 = 12.121%  (middle ring â†’ photo)
function Avatar({ src = "assets/Avatar video.mp4", size }) {
  // If a caller passes an explicit `size`, honor it; otherwise read the
  // CSS variable so the page's @media rules control the size.
  const sizeValue = size != null ? `${size}px` : "var(--avatar-size, 180px)";
  return (
    <div
      className="avatar"
      style={{
        width: sizeValue,
        height: sizeValue,
        borderRadius: "50%",
        border: "1px solid var(--accent-30)",
        position: "relative",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: "13.333%",
          borderRadius: "50%",
          border: "1.5px solid var(--accent)",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: "12.121%",
            borderRadius: "50%",
            overflow: "hidden",
          }}
        >
          <video
            src={src}
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Avatar });

