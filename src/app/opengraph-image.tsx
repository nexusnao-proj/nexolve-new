import { ImageResponse } from "next/og";

export const alt = "Nexolve Technologies — Procurement and supply chain transformation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Sitewide Open Graph / Twitter card image, generated at build time. */
export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#081d2f",
        backgroundImage:
          "radial-gradient(circle at 88% 12%, rgba(74,163,221,.3), transparent 35%), linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)",
        backgroundSize: "auto, 64px 64px, 64px 64px",
        padding: 72,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="92" height="92" viewBox="0 0 96 96" fill="none">
            <g transform="rotate(-90 48 48)">
              <circle
                cx="48"
                cy="48"
                r="38"
                stroke="#FFFFFF"
                strokeWidth="10"
                strokeDasharray="3 10.264"
              />
              <circle
                cx="48"
                cy="48"
                r="27"
                stroke="#7FD0FF"
                strokeWidth="7"
                strokeDasharray="2.5 8.81"
              />
              <circle
                cx="48"
                cy="48"
                r="17"
                stroke="#4AA3DD"
                strokeWidth="5"
                strokeDasharray="2 6.901"
              />
            </g>
            <circle cx="48" cy="48" r="5" fill="#7FD0FF" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              style={{
                display: "flex",
                fontSize: 54,
                fontWeight: 800,
                letterSpacing: 1,
                color: "#ffffff",
              }}
            >
              NEXOLVE
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 19,
                fontWeight: 600,
                letterSpacing: 8,
                color: "#7fd0ff",
              }}
            >
              TECHNOLOGIES
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            color: "rgba(255,255,255,.55)",
            fontSize: 20,
            fontWeight: 700,
            letterSpacing: 3,
            textTransform: "uppercase",
          }}
        >
          nexolvetechnologies.com
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div
          style={{
            display: "flex",
            fontSize: 68,
            fontWeight: 800,
            color: "#ffffff",
            lineHeight: 1.1,
            maxWidth: 980,
          }}
        >
          Procurement, solved.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "rgba(255,255,255,.65)" }}>
          Supply chain and procurement transformation on SAP, Coupa and Oracle
        </div>
      </div>

      <div
        style={{
          display: "flex",
          height: 12,
          width: "100%",
          borderRadius: 7,
          background: "linear-gradient(90deg, #ec3013 0 18%, #4aa3dd 18% 62%, #7fd0ff 62%)",
        }}
      />
    </div>,
    size,
  );
}
