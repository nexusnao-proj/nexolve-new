import { ImageResponse } from "next/og";

export const alt = "Nexolve Technologies — Procurement, solved.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

/** Sitewide Open Graph / Twitter card image, generated at build time. */
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f3f2f2",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
          <svg width="92" height="92" viewBox="0 0 96 96" fill="none">
            <g transform="rotate(-90 48 48)">
              <circle cx="48" cy="48" r="38" stroke="#0B2A44" strokeWidth="10" strokeDasharray="3 10.264" />
              <circle cx="48" cy="48" r="27" stroke="#1A5A8A" strokeWidth="7" strokeDasharray="2.5 8.81" />
              <circle cx="48" cy="48" r="17" stroke="#4AA3DD" strokeWidth="5" strokeDasharray="2 6.901" />
            </g>
            <circle cx="48" cy="48" r="5" fill="#7FD0FF" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", fontSize: 54, fontWeight: 800, letterSpacing: 1, color: "#201e1d" }}>
              NEXOLVE
            </div>
            <div style={{ display: "flex", fontSize: 19, fontWeight: 600, letterSpacing: 8, color: "#0b2a44" }}>
              TECHNOLOGIES
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 68,
              fontWeight: 800,
              color: "#201e1d",
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            Procurement, solved.
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#5b5856" }}>
            Supply chain and procurement transformation on SAP, Coupa and Oracle
          </div>
        </div>

        <div
          style={{
            display: "flex",
            height: 14,
            width: "100%",
            borderRadius: 7,
            background: "linear-gradient(135deg, #0b2a44 0%, #4aa3dd 50%, #0b2a44 100%)",
          }}
        />
      </div>
    ),
    size,
  );
}
