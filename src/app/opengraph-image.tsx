import { ImageResponse } from "next/og";

export const alt =
  "Daniel Santana Lima — QA, Automação de Testes & Full Stack";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #020617 0%, #0F172A 60%, #1E293B 100%)",
          padding: "64px",
          color: "#F8FAFC",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
              padding: "10px 20px",
              borderRadius: "999px",
              background: "rgba(34, 197, 94, 0.14)",
              border: "1px solid rgba(34, 197, 94, 0.45)",
              color: "#86EFAC",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            QA & Automação + Desenvolvimento Full Stack
          </div>

          <div
            style={{
              display: "flex",
              padding: "10px 20px",
              borderRadius: "12px",
              background: "rgba(245, 158, 11, 0.15)",
              border: "1px solid rgba(245, 158, 11, 0.4)",
              color: "#FCD34D",
              fontSize: 20,
              fontWeight: 600,
            }}
          >
            NASA Space Apps 2026 • Top 10 Regional
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div style={{ fontSize: 68, fontWeight: 800, letterSpacing: "-1px" }}>
            Daniel Santana Lima
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#CBD5E1",
              maxWidth: "980px",
              lineHeight: 1.35,
            }}
          >
            Qualidade de Software (ERP Nasajon & TOTVS), Automação com Playwright/BDD e Aplicações SaaS Reais em Next.js, TypeScript & Supabase.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #334155",
            paddingTop: "28px",
            fontSize: 22,
            color: "#94A3B8",
          }}
        >
          <div style={{ display: "flex", gap: "18px", color: "#E2E8F0" }}>
            <span>Playwright</span>
            <span>•</span>
            <span>BDD/Gherkin</span>
            <span>•</span>
            <span>Next.js</span>
            <span>•</span>
            <span>TypeScript</span>
            <span>•</span>
            <span>Python</span>
            <span>•</span>
            <span>SQL</span>
          </div>
          <div style={{ color: "#22C55E", fontWeight: 700 }}>
            github.com/Daniel-SLima
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
