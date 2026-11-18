"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowLeft,
  Bug,
  CheckCircle2,
  Code2,
  FileCode2,
  Play,
  RotateCcw,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { QA_SHOWCASE_DATA } from "@/data/profileData";

interface SuiteConfig {
  id: string;
  name: string;
  category: string;
  tool: string;
  duration: string;
  description: string;
  code: string;
  steps: { label: string; status: "PASS" | "METRIC"; timing: string }[];
}

const QA_SUITES: SuiteConfig[] = [
  {
    id: "e2e-saas",
    name: "E2E: Orçamento Comercial & RBAC",
    category: "Playwright + Page Object Model",
    tool: "Chromium Headless • TypeScript",
    duration: "2.4s",
    description:
      "Valida o ciclo completo de criação de orçamento, cálculo de alçada de desconto por perfil e conversão em Ordem de Produção.",
    code: QA_SHOWCASE_DATA.playwrightSnippet,
    steps: [
      { label: "beforeEach -> Autenticar sessão via storageState (Comercial)", status: "PASS", timing: "140ms" },
      { label: "Selecionar cliente e adicionar 10x Painel Industrial", status: "PASS", timing: "260ms" },
      { label: "Aplicar desconto 5% -> Assert valor líquido R$ 11.875,00", status: "PASS", timing: "95ms" },
      { label: "Converter em Ordem de Produção -> Badge 'Em Produção'", status: "PASS", timing: "180ms" },
      { label: "Validar exportação .CSV e cabeçalho BOM UTF-8", status: "PASS", timing: "210ms" },
    ],
  },
  {
    id: "bdd-erp",
    name: "BDD/Gherkin: Regras Fiscais ERP (Finanças & Serviços)",
    category: "Especificação Executável",
    tool: "Gherkin PT-BR • SQL Assertions",
    duration: "1.8s",
    description:
      "Transforma regras de negócio de módulos ERP (Finanças, Serviços e RH) em cenários padronizados rastreáveis.",
    code: QA_SHOWCASE_DATA.gherkinSnippet,
    steps: [
      { label: "Dado que há 3 ordens de serviço pendentes no módulo Serviços", status: "PASS", timing: "115ms" },
      { label: "Quando executo o fechamento em lote com alíquota ISS 2,5%", status: "PASS", timing: "340ms" },
      { label: "Então cada item deve arredondar pela ABNT NBR 5891 antes da soma", status: "PASS", timing: "190ms" },
      { label: "E o registro SQL na tabela fiscal_lotes deve coincidir com o XML", status: "PASS", timing: "145ms" },
    ],
  },
  {
    id: "api-contracts",
    name: "API Testing: Contratos REST, Status & Segurança",
    category: "Playwright APIRequestContext",
    tool: "HTTP Assertions • Schema Validation",
    duration: "0.9s",
    description:
      "Testa endpoints críticos garantindo retorno HTTP 403 em tentativas de escalonamento de privilégio e integridade JSON.",
    code: `test("POST /api/orcamentos/aprovar-desconto bloqueia alçada > 10% para Comercial", async ({ request }) => {
  const res = await request.post("/api/orcamentos/aprovar-desconto", {
    headers: { "x-user-role": "comercial" },
    data: { orcamentoId: "ORC-2026-041", descontoPercentual: 25 }
  });

  expect(res.status()).toBe(403);
  const json = await res.json();
  expect(json).toMatchObject({
    code: "FORBIDDEN_DISCOUNT_LIMIT",
    maxAllowed: 10
  });
});`,
    steps: [
      { label: "GET /api/health -> HTTP 200 OK (db: connected)", status: "PASS", timing: "42ms" },
      { label: "POST /api/orcamentos (Admin, desc 20%) -> HTTP 201 Created", status: "PASS", timing: "118ms" },
      { label: "POST /api/orcamentos (Comercial, desc 25%) -> HTTP 403 Forbidden", status: "PASS", timing: "64ms" },
      { label: "Validar JSON Schema de resposta e ausência de stack trace", status: "PASS", timing: "28ms" },
    ],
  },
  {
    id: "jmeter-load",
    name: "Carga & Performance: Lirdio Audio Streaming",
    category: "Apache JMeter & BlazeMeter",
    tool: "250 Usuários Virtuais Simultâneos",
    duration: "300s (Simulado)",
    description:
      "Plano de testes de desempenho aplicado à plataforma de streaming de audiolivros Lirdio para medir estabilidade sob carga.",
    code: `<TestPlan testname="Lirdio_Streaming_Load_Test">
  <ThreadGroup testname="Usuarios_Simultaneos_Player">
    <stringProp name="ThreadGroup.num_threads">250</stringProp>
    <stringProp name="ThreadGroup.ramp_time">30</stringProp>
    <HTTPSamplerProxy path="/api/audiobooks/stream-chunk" method="GET" />
    <ResponseAssertion test_field="Assertion.response_code">200</ResponseAssertion>
    <DurationAssertion duration="450" />
  </ThreadGroup>
</TestPlan>`,
    steps: [
      { label: "Ramp-up: 250 threads simultâneas em 30s concluído sem drops", status: "METRIC", timing: "30s" },
      { label: "Throughput médio sustentado: 184.6 requisições/seg", status: "METRIC", timing: "184.6/s" },
      { label: "Latência P95 do endpoint de streaming: 312ms (Meta < 450ms)", status: "PASS", timing: "312ms" },
      { label: "Taxa de Erro (Error Rate): 0.08% (Meta < 1.00%)", status: "PASS", timing: "0.08%" },
    ],
  },
];

export default function QaLabPage() {
  const [selectedId, setSelectedId] = useState<string>(QA_SUITES[0].id);
  const [running, setRunning] = useState(false);
  const [visibleSteps, setVisibleSteps] = useState<number>(QA_SUITES[0].steps.length);

  const activeSuite = QA_SUITES.find((s) => s.id === selectedId) ?? QA_SUITES[0];

  const handleSelectSuite = (id: string) => {
    setSelectedId(id);
    const target = QA_SUITES.find((s) => s.id === id);
    setVisibleSteps(target ? target.steps.length : 0);
    setRunning(false);
  };

  const handleRunSuite = () => {
    if (running) return;
    setRunning(true);
    setVisibleSteps(0);

    activeSuite.steps.forEach((_, idx) => {
      setTimeout(() => {
        setVisibleSteps(idx + 1);
        if (idx === activeSuite.steps.length - 1) {
          setRunning(false);
        }
      }, (idx + 1) * 380);
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar activePage="qa-lab" />

      <main className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 md:flex-row md:items-end">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400 hover:underline cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar ao Portfólio Principal
            </Link>
            <h1 className="mt-2 font-display text-2xl font-bold text-slate-50 sm:text-3xl">
              QA & Automação Lab — Playwright, BDD/Gherkin, API & JMeter
            </h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-400">
              Laboratório interativo demonstrando a arquitetura de testes aplicada em projetos ERP, SaaS Web e streaming.
            </p>
          </div>

          <button
            type="button"
            onClick={handleRunSuite}
            disabled={running}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 disabled:opacity-60 cursor-pointer sm:text-sm"
          >
            {running ? (
              <RotateCcw className="h-4 w-4 animate-spin" />
            ) : (
              <Play className="h-4 w-4" />
            )}
            {running ? "Executando Suíte..." : "Executar Suíte Selecionada"}
          </button>
        </div>

        {/* Suite Selector Cards */}
        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {QA_SUITES.map((suite) => {
            const isSelected = suite.id === activeSuite.id;
            return (
              <button
                key={suite.id}
                type="button"
                onClick={() => handleSelectSuite(suite.id)}
                className={`rounded-2xl border p-4 text-left transition-colors cursor-pointer ${
                  isSelected
                    ? "border-emerald-500/60 bg-emerald-500/10"
                    : "border-slate-800 bg-slate-900/70 hover:border-slate-700"
                }`}
              >
                <span className="font-mono text-[11px] text-emerald-400">
                  {suite.category}
                </span>
                <h2 className="mt-1 font-display text-sm font-bold text-slate-100">
                  {suite.name}
                </h2>
                <p className="mt-1 font-mono text-[11px] text-slate-400">
                  {suite.tool}
                </p>
              </button>
            );
          })}
        </div>

        {/* Workspace Split */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Code / Spec */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                {activeSuite.id === "bdd-erp" ? (
                  <FileCode2 className="h-4 w-4 text-emerald-400" />
                ) : activeSuite.id === "api-contracts" ? (
                  <Server className="h-4 w-4 text-sky-400" />
                ) : activeSuite.id === "jmeter-load" ? (
                  <Activity className="h-4 w-4 text-amber-400" />
                ) : (
                  <Code2 className="h-4 w-4 text-indigo-400" />
                )}
                <h3 className="font-display text-base font-bold text-slate-100">
                  Especificação / Código-Fonte da Suíte
                </h3>
              </div>
              <span className="rounded-md bg-slate-950 px-2.5 py-1 font-mono text-xs text-slate-400">
                Tempo estimado: {activeSuite.duration}
              </span>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-slate-300 sm:text-sm">
              {activeSuite.description}
            </p>

            <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-200">
              <code>{activeSuite.code}</code>
            </pre>
          </div>

          {/* Execution Trace + Bug Evidence */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-display text-base font-bold text-slate-100">
                    Log de Execução CI/CD
                  </h3>
                </div>
                <span className="font-mono text-xs text-emerald-400">
                  {visibleSteps}/{activeSuite.steps.length} etapas
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {activeSuite.steps.slice(0, visibleSteps).map((step) => (
                  <div
                    key={step.label}
                    className="flex items-start justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/80 p-3 font-mono text-xs"
                  >
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span className="text-slate-200">{step.label}</span>
                    </div>
                    <span className="shrink-0 rounded bg-emerald-500/15 px-2 py-0.5 text-[11px] text-emerald-300">
                      {step.timing}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bug Report Card */}
            <div className="rounded-2xl border border-amber-500/30 bg-slate-900/80 p-5">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Bug className="h-4 w-4 text-amber-400" />
                <h3 className="font-display text-base font-bold text-slate-100">
                  Modelo de Bug Report Estruturado
                </h3>
              </div>
              <div className="mt-3 space-y-2 text-xs text-slate-300">
                <p className="font-mono text-amber-300">
                  {QA_SHOWCASE_DATA.bugReportExample.id} •{" "}
                  {QA_SHOWCASE_DATA.bugReportExample.priority}
                </p>
                <p className="font-semibold text-slate-100">
                  {QA_SHOWCASE_DATA.bugReportExample.title}
                </p>
                <p className="text-slate-400">
                  {QA_SHOWCASE_DATA.bugReportExample.evidence}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
