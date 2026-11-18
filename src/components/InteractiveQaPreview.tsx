"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Bug,
  CheckCircle2,
  Code2,
  FileCode2,
  Play,
  RotateCcw,
  Terminal,
} from "lucide-react";
import { QA_SHOWCASE_DATA } from "@/data/profileData";

type TabType = "gherkin" | "playwright" | "bug";

const SIMULATION_STEPS = [
  "[1/4] Dado que estou autenticado com o perfil 'Comercial' ... OK (142ms)",
  "[2/4] Quando seleciono cliente e adiciono 10x Painel Industrial ... OK (210ms)",
  "[3/4] E aplico desconto 5% -> Assert total R$ 11.875,00 ... PASS (84ms)",
  "[4/4] POST /api/orcamentos/aprovar-desconto (25% sem Admin) -> HTTP 403 ... PASS (68ms)",
  "✓ 12 testes executados (E2E + API + RBAC) — 12 passed, 0 failed em 2.4s",
];

export function InteractiveQaPreview() {
  const [activeTab, setActiveTab] = useState<TabType>("gherkin");
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);

  const handleRunDemo = () => {
    if (running) return;
    setRunning(true);
    setLogs(["Iniciando Playwright Test Runner (Chromium + API Context)..."]);

    SIMULATION_STEPS.forEach((step, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step]);
        if (idx === SIMULATION_STEPS.length - 1) {
          setRunning(false);
        }
      }, (idx + 1) * 420);
    });
  };

  return (
    <section id="qa-preview" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
              <Terminal className="h-4 w-4" />
              Qualidade na Prática
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-slate-50 sm:text-4xl">
              Do Cenário BDD/Gherkin ao Teste Automatizado & Bug Report
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
              Inspecione exemplos reais da metodologia que aplico diariamente: especificação em Gherkin, Page Object Model em Playwright/TypeScript e reporte estruturado de bugs em ERP.
            </p>
          </div>
          <Link
            href="/qa-lab"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-emerald-300 transition-colors hover:bg-emerald-500/20 cursor-pointer"
          >
            Explorar QA Lab Completo
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Code / Artifact Viewer */}
          <div className="lg:col-span-7 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 backdrop-blur-md">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 bg-slate-950/80 px-4 py-3">
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveTab("gherkin")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer ${
                    activeTab === "gherkin"
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <FileCode2 className="h-3.5 w-3.5" />
                  orcamento.feature
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("playwright")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer ${
                    activeTab === "playwright"
                      ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <Code2 className="h-3.5 w-3.5" />
                  orcamento.spec.ts
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("bug")}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 font-mono text-xs transition-colors cursor-pointer ${
                    activeTab === "bug"
                      ? "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                      : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                  }`}
                >
                  <Bug className="h-3.5 w-3.5" />
                  BUG-ERP-418
                </button>
              </div>
            </div>

            <div className="p-4 sm:p-5">
              {activeTab === "gherkin" && (
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-slate-200">
                  <code>{QA_SHOWCASE_DATA.gherkinSnippet}</code>
                </pre>
              )}

              {activeTab === "playwright" && (
                <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-indigo-100">
                  <code>{QA_SHOWCASE_DATA.playwrightSnippet}</code>
                </pre>
              )}

              {activeTab === "bug" && (
                <div className="space-y-4 text-sm">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-mono text-xs text-amber-400">
                        {QA_SHOWCASE_DATA.bugReportExample.id}
                      </span>
                      <h3 className="font-display text-base font-semibold text-slate-100">
                        {QA_SHOWCASE_DATA.bugReportExample.title}
                      </h3>
                    </div>
                    <span className="rounded-full border border-red-500/40 bg-red-500/15 px-2.5 py-1 font-mono text-xs text-red-300">
                      {QA_SHOWCASE_DATA.bugReportExample.priority}
                    </span>
                  </div>

                  <p className="rounded-lg bg-slate-950/70 px-3 py-2 font-mono text-xs text-slate-300">
                    Ambiente: {QA_SHOWCASE_DATA.bugReportExample.environment}
                  </p>

                  <div>
                    <h4 className="font-mono text-xs uppercase text-slate-400">
                      Passos para Reprodução
                    </h4>
                    <ul className="mt-1.5 space-y-1 text-xs text-slate-300 sm:text-sm">
                      {QA_SHOWCASE_DATA.bugReportExample.reproSteps.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3">
                      <span className="font-mono text-[11px] uppercase text-emerald-400">
                        Comportamento Esperado
                      </span>
                      <p className="mt-1 text-xs text-slate-200">
                        {QA_SHOWCASE_DATA.bugReportExample.expectedBehavior}
                      </p>
                    </div>
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-3">
                      <span className="font-mono text-[11px] uppercase text-red-400">
                        Comportamento Atual
                      </span>
                      <p className="mt-1 text-xs text-slate-200">
                        {QA_SHOWCASE_DATA.bugReportExample.actualBehavior}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Test Runner Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/80 p-5 backdrop-blur-md">
            <div>
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-4">
                <div>
                  <span className="font-mono text-xs text-emerald-400">
                    Simulador Playwright CI
                  </span>
                  <h3 className="font-display text-lg font-bold text-slate-50">
                    Executar Validação E2E + API
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={handleRunDemo}
                  disabled={running}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:opacity-60 cursor-pointer"
                >
                  {running ? (
                    <RotateCcw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Play className="h-3.5 w-3.5" />
                  )}
                  {running ? "Executando..." : "Rodar Suíte"}
                </button>
              </div>

              <div className="mt-4 min-h-[220px] rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs">
                {logs.length === 0 ? (
                  <div className="flex h-full min-h-[180px] flex-col items-center justify-center text-center text-slate-500">
                    <Terminal className="mb-2 h-8 w-8 text-slate-600" />
                    <p>Clique em &quot;Rodar Suíte&quot; para simular a execução dos cenários Playwright + API.</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {logs.map((line, i) => (
                      <div
                        key={`${line}-${i}`}
                        className={
                          line.startsWith("✓")
                            ? "mt-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-2 font-semibold text-emerald-300"
                            : line.includes("PASS") || line.includes("OK")
                            ? "text-emerald-400"
                            : "text-slate-300"
                        }
                      >
                        {line}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3 text-xs text-slate-300">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                Repositório pronto com GitHub Actions + POM
              </span>
              <Link
                href="/qa-lab"
                className="font-semibold text-emerald-400 hover:underline cursor-pointer"
              >
                Abrir Lab →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
