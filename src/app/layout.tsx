import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-daniel-lima.vercel.app"),
  title: "Daniel Santana Lima | QA, Automação de Testes & Full Stack",
  description:
    "Portfólio interativo de Daniel Santana Lima — Qualidade de Software (ERP Nasajon & TOTVS), Automação com Playwright/BDD e Desenvolvimento Full Stack com Next.js, TypeScript e Supabase.",
  authors: [{ name: "Daniel Santana Lima", url: "https://github.com/Daniel-SLima" }],
  keywords: [
    "Daniel Santana Lima",
    "QA Júnior",
    "Quality Assurance",
    "Playwright",
    "BDD Gherkin",
    "Full Stack",
    "Next.js",
    "TypeScript",
    "Salvador Bahia",
  ],
  openGraph: {
    title: "Daniel Santana Lima | QA, Automação & Full Stack",
    description:
      "Qualidade de Software (ERP Nasajon & TOTVS), Automação com Playwright/BDD e Desenvolvimento Full Stack em Next.js, TypeScript e Supabase.",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Santana Lima | QA, Automação & Full Stack",
    description:
      "Portfólio interativo com Simulador SaaS RBAC, Laboratório QA Playwright/BDD e Central de Currículos.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-slate-950 text-slate-50 antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
        {children}
      </body>
    </html>
  );
}
