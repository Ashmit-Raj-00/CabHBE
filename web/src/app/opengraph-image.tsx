import { ImageResponse } from "next/og";
import { event } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// Rendered once at build time into a static file.
export const dynamic = "force-static";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          background: "linear-gradient(135deg, #FBEFF0 0%, #FFFFFF 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "#B8162B",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <path d="M7 3c0 4 10 4 10 8s-10 4-10 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M17 3c0 4-10 4-10 8s10 4 10 8" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700, color: "#1E1E1E" }}>
            CABHBE-26
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            color: "#1E1E1E",
            lineHeight: 1.15,
            maxWidth: 950,
            marginBottom: 26,
          }}
        >
          2nd International Conference on Biotechnology in Healthcare, Bioproducts &amp;
          Environmental Research
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "#4A4A4A", marginBottom: 8 }}>
          {`${event.dates} · ${event.venue}`}
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#B8162B", fontWeight: 600 }}>
          Department of Biotechnology · DBT-BIRAC E-YUVA Center
        </div>
      </div>
    ),
    { ...size }
  );
}
