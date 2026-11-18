"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CheckCircle2,
  Database,
  Download,
  FileSpreadsheet,
  Factory,
  Lock,
  Plus,
  Printer,
  Search,
  Shield,
  Users,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";

type UserRole = "admin" | "comercial" | "producao";
type QuoteStatus = "Em Análise" | "Aprovado" | "Em Produção";

interface QuoteRecord {
  id: string;
  client: string;
  cnpj: string;
  product: string;
  quantity: number;
  unitPrice: number;
  discountPercent: number;
  status: QuoteStatus;
  createdAt: string;
  attachmentName: string;
}

const CLIENTS = [
  { name: "Indústria Baiana de Componentes Ltda", cnpj: "14.892.310/0001-42" },
  { name: "Grupo Atlântico Logística S.A.", cnpj: "28.441.902/0001-19" },
  { name: "Nordeste Energia & Serviços", cnpj: "09.332.118/0001-75" },
  { name: "Construtora Horizonte Sul", cnpj: "33.710.504/0001-08" },
];

const PRODUCTS = [
  { name: "Painel de Controle Industrial", unitPrice: 1250 },
  { name: "Módulo de Automação CLP", unitPrice: 2890 },
  { name: "Kit Sensoriamento Telemetria", unitPrice: 740 },
  { name: "Estrutura Modular Aço Galvanizado", unitPrice: 1920 },
];

const INITIAL_QUOTES: QuoteRecord[] = [
  {
    id: "ORC-2026-041",
    client: "Indústria Baiana de Componentes Ltda",
    cnpj: "14.892.310/0001-42",
    product: "Painel de Controle Industrial",
    quantity: 10,
    unitPrice: 1250,
    discountPercent: 5,
    status: "Em Produção",
    createdAt: "2026-11-12",
    attachmentName: "especificacao-tecnica-paineis.pdf",
  },
  {
    id: "ORC-2026-042",
    client: "Grupo Atlântico Logística S.A.",
    cnpj: "28.441.902/0001-19",
    product: "Módulo de Automação CLP",
    quantity: 4,
    unitPrice: 2890,
    discountPercent: 0,
    status: "Aprovado",
    createdAt: "2026-11-14",
    attachmentName: "planta-eletrica-v2.pdf",
  },
  {
    id: "ORC-2026-043",
    client: "Nordeste Energia & Serviços",
    cnpj: "09.332.118/0001-75",
    product: "Kit Sensoriamento Telemetria",
    quantity: 15,
    unitPrice: 740,
    discountPercent: 8,
    status: "Em Análise",
    createdAt: "2026-11-16",
    attachmentName: "memorial-descritivo.pdf",
  },
];

const ROLE_CONFIG: Record<
  UserRole,
  {
    label: string;
    maxDiscount: number;
    canCreateQuote: boolean;
    canApproveQuote: boolean;
    canMoveToProduction: boolean;
    description: string;
  }
> = {
  admin: {
    label: "Administrador",
    maxDiscount: 30,
    canCreateQuote: true,
    canApproveQuote: true,
    canMoveToProduction: true,
    description: "Acesso total: alçada até 30% de desconto, aprovação e ordens de produção.",
  },
  comercial: {
    label: "Consultor Comercial",
    maxDiscount: 10,
    canCreateQuote: true,
    canApproveQuote: false,
    canMoveToProduction: false,
    description: "Cria orçamentos com alçada de até 10% de desconto; requer Admin para aprovar.",
  },
  producao: {
    label: "Gestor de Produção",
    maxDiscount: 0,
    canCreateQuote: false,
    canApproveQuote: false,
    canMoveToProduction: true,
    description: "Converte orçamentos aprovados em Ordens de Produção e gera PDF operacional.",
  },
};

const SQL_ARCHITECTURE_SNIPPET = `-- Supabase PostgreSQL Schema & Row Level Security (alinhado ao OrçaDemo)
CREATE TYPE public.funcao_usuario AS ENUM (
  'admin', 'vendedor', 'operador', 'financeiro', 'compras', 'desativado'
);

CREATE TABLE public.perfis_usuarios (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  funcao public.funcao_usuario NOT NULL DEFAULT 'vendedor',
  setor TEXT,
  alcada_desconto_max NUMERIC(5,2) NOT NULL DEFAULT 10.00
);

CREATE TABLE public.orcamentos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  codigo TEXT UNIQUE NOT NULL,
  cliente_id UUID NOT NULL REFERENCES public.clientes(id),
  vendedor_id UUID NOT NULL REFERENCES public.perfis_usuarios(user_id),
  subtotal NUMERIC(12,2) NOT NULL CHECK (subtotal >= 0),
  desconto_percentual NUMERIC(5,2) NOT NULL DEFAULT 0,
  valor_liquido NUMERIC(12,2) GENERATED ALWAYS AS (
    ROUND(subtotal * (1 - desconto_percentual / 100.0), 2)
  ) STORED,
  status TEXT NOT NULL DEFAULT 'Em Análise'
);

ALTER TABLE public.orcamentos ENABLE ROW LEVEL SECURITY;

-- Política RBAC: Vendedor cria respeitando sua alçada; Desativado bloqueado
CREATE POLICY "insercao_orcamentos_admin_vendedor"
  ON public.orcamentos FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.perfis_usuarios p
      WHERE p.user_id = auth.uid()
        AND p.funcao IN ('admin', 'vendedor')
        AND desconto_percentual <= p.alcada_desconto_max
    )
  );`;

function formatBRL(value: number) {
  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function calcNetTotal(q: Pick<QuoteRecord, "quantity" | "unitPrice" | "discountPercent">) {
  const gross = q.quantity * q.unitPrice;
  return gross * (1 - q.discountPercent / 100);
}

export default function SaasDemoPage() {
  const [role, setRole] = useState<UserRole>("admin");
  const [activeTab, setActiveTab] = useState<"operacao" | "arquitetura">("operacao");
  const [quotes, setQuotes] = useState<QuoteRecord[]>(INITIAL_QUOTES);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<"Todos" | QuoteStatus>("Todos");
  const [selectedQuoteId, setSelectedQuoteId] = useState<string>(INITIAL_QUOTES[0].id);
  const [feedback, setFeedback] = useState<{ type: "ok" | "error"; text: string } | null>(null);

  // New Quote Form State
  const [newClientIdx, setNewClientIdx] = useState(0);
  const [newProductIdx, setNewProductIdx] = useState(0);
  const [newQuantity, setNewQuantity] = useState(5);
  const [newDiscount, setNewDiscount] = useState(5);

  const permissions = ROLE_CONFIG[role];

  const filteredQuotes = useMemo(() => {
    return quotes.filter((q) => {
      const matchesStatus = statusFilter === "Todos" || q.status === statusFilter;
      const matchesSearch =
        q.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.product.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [quotes, searchTerm, statusFilter]);

  const kpis = useMemo(() => {
    const totalValue = quotes.reduce((acc, q) => acc + calcNetTotal(q), 0);
    const inProduction = quotes.filter((q) => q.status === "Em Produção").length;
    const approvedOrProd = quotes.filter(
      (q) => q.status === "Aprovado" || q.status === "Em Produção"
    ).length;
    const approvalRate = quotes.length > 0 ? Math.round((approvedOrProd / quotes.length) * 100) : 0;

    return {
      totalValue,
      inProduction,
      approvalRate,
      avgTicket: quotes.length > 0 ? totalValue / quotes.length : 0,
    };
  }, [quotes]);

  const selectedQuote = quotes.find((q) => q.id === selectedQuoteId) ?? quotes[0];

  const handleCreateQuote = (e: React.FormEvent) => {
    e.preventDefault();

    if (!permissions.canCreateQuote) {
      setFeedback({
        type: "error",
        text: `Acesso negado (RBAC): O perfil "${permissions.label}" não possui permissão para criar orçamentos.`,
      });
      return;
    }

    if (newDiscount > permissions.maxDiscount) {
      setFeedback({
        type: "error",
        text: `Alçada máxima excedida: O perfil "${permissions.label}" permite no máximo ${permissions.maxDiscount}% de desconto.`,
      });
      return;
    }

    const client = CLIENTS[newClientIdx];
    const product = PRODUCTS[newProductIdx];
    const nextNumber = 41 + quotes.length;
    const created: QuoteRecord = {
      id: `ORC-2026-0${nextNumber}`,
      client: client.name,
      cnpj: client.cnpj,
      product: product.name,
      quantity: Math.max(1, newQuantity),
      unitPrice: product.unitPrice,
      discountPercent: Math.max(0, newDiscount),
      status: "Em Análise",
      createdAt: "2026-11-17",
      attachmentName: "proposta-comercial.pdf",
    };

    setQuotes((prev) => [created, ...prev]);
    setSelectedQuoteId(created.id);
    setFeedback({
      type: "ok",
      text: `Orçamento ${created.id} criado com sucesso no valor líquido de ${formatBRL(calcNetTotal(created))}.`,
    });
  };

  const handleStatusChange = (id: string, nextStatus: QuoteStatus) => {
    if (nextStatus === "Aprovado" && !permissions.canApproveQuote) {
      setFeedback({
        type: "error",
        text: `Permissão insuficiente: Apenas "Administrador" pode aprovar orçamentos comerciais.`,
      });
      return;
    }
    if (nextStatus === "Em Produção" && !permissions.canMoveToProduction) {
      setFeedback({
        type: "error",
        text: `Permissão insuficiente: Apenas "Administrador" ou "Gestor de Produção" podem emitir Ordem de Produção.`,
      });
      return;
    }

    setQuotes((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: nextStatus } : q))
    );
    setFeedback({
      type: "ok",
      text: `Status do registro ${id} atualizado para "${nextStatus}".`,
    });
  };

  const handleExportExcel = () => {
    const headers = [
      "ID Orcamento",
      "Cliente",
      "CNPJ",
      "Produto",
      "Quantidade",
      "Preco Unitario",
      "Desconto (%)",
      "Valor Liquido",
      "Status",
      "Data",
    ];
    const rows = filteredQuotes.map((q) => [
      q.id,
      q.client,
      q.cnpj,
      q.product,
      String(q.quantity),
      q.unitPrice.toFixed(2).replace(".", ","),
      String(q.discountPercent),
      calcNetTotal(q).toFixed(2).replace(".", ","),
      q.status,
      q.createdAt,
    ]);

    const csvContent =
      "\uFEFF" +
      [headers.join(";"), ...rows.map((r) => r.join(";"))].join("\r\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "relatorio-orcamentos-daniel-saas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setFeedback({
      type: "ok",
      text: `Relatório Excel (.CSV com ${filteredQuotes.length} registros) exportado com sucesso.`,
    });
  };

  const handlePrintPdf = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar activePage="saas-demo" />

      <main className="mx-auto max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8">
        {/* Header Bar (hidden on print) */}
        <div className="print:hidden mb-8 flex flex-col justify-between gap-4 border-b border-slate-800 pb-6 lg:flex-row lg:items-center">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:underline cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar ao Portfólio Principal
            </Link>
            <h1 className="mt-2 font-display text-2xl font-bold text-slate-50 sm:text-3xl">
              Demo Interativa: SaaS de Gestão Comercial, Orçamentos & Produção
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Simulador fiel às regras de negócio do projeto real em Next.js, TypeScript e Supabase: teste o RBAC, crie orçamentos, gere PDF e exporte para Excel.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveTab("operacao")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "operacao"
                  ? "bg-indigo-500 text-white"
                  : "border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Factory className="h-4 w-4" />
              Painel Operacional
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("arquitetura")}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === "arquitetura"
                  ? "bg-emerald-500 text-slate-950"
                  : "border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Database className="h-4 w-4" />
              SQL & RLS (Supabase)
            </button>
          </div>
        </div>

        {/* RBAC Role Simulator (hidden on print) */}
        <section className="print:hidden mb-6 rounded-2xl border border-slate-800 bg-slate-900/75 p-4 backdrop-blur-md">
          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-500/30 bg-indigo-500/15 text-indigo-300">
                <Shield className="h-5 w-5" />
              </span>
              <div>
                <span className="font-mono text-xs uppercase text-indigo-300">
                  Simulador de Controle de Acesso (RBAC)
                </span>
                <p className="text-sm text-slate-200">{permissions.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(["admin", "comercial", "producao"] as UserRole[]).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => {
                    setRole(r);
                    setFeedback(null);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold transition-colors cursor-pointer ${
                    role === r
                      ? "bg-indigo-500 text-white"
                      : "border border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  {ROLE_CONFIG[r].label}
                </button>
              ))}
            </div>
          </div>

          {feedback && (
            <div
              className={`mt-4 flex items-center gap-2 rounded-xl border px-4 py-2.5 text-xs font-medium ${
                feedback.type === "error"
                  ? "border-red-500/40 bg-red-500/10 text-red-300"
                  : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
              }`}
            >
              {feedback.type === "error" ? (
                <AlertTriangle className="h-4 w-4 shrink-0" />
              ) : (
                <CheckCircle2 className="h-4 w-4 shrink-0" />
              )}
              <span>{feedback.text}</span>
            </div>
          )}
        </section>

        {activeTab === "arquitetura" ? (
          <section className="print:hidden rounded-2xl border border-slate-800 bg-slate-900/80 p-6">
            <h2 className="font-display text-xl font-bold text-slate-50">
              Modelagem SQL & Políticas de Segurança (Supabase RLS)
            </h2>
            <p className="mt-1 text-sm text-slate-400">
              Trecho representativo da arquitetura relacional que garante integridade de cálculos no banco e controle de alçada por perfil.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-5 font-mono text-xs leading-relaxed text-emerald-200">
              <code>{SQL_ARCHITECTURE_SNIPPET}</code>
            </pre>
          </section>
        ) : (
          <>
            {/* KPI Row (hidden on print) */}
            <section className="print:hidden mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4">
                <span className="font-mono text-xs text-slate-400">Carteira Total</span>
                <p className="mt-1 font-display text-2xl font-bold text-slate-50">
                  {formatBRL(kpis.totalValue)}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4">
                <span className="font-mono text-xs text-slate-400">Taxa de Aprovação</span>
                <p className="mt-1 font-display text-2xl font-bold text-emerald-400">
                  {kpis.approvalRate}%
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4">
                <span className="font-mono text-xs text-slate-400">Ordens em Produção</span>
                <p className="mt-1 font-display text-2xl font-bold text-indigo-400">
                  {kpis.inProduction}
                </p>
              </div>
              <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4">
                <span className="font-mono text-xs text-slate-400">Ticket Médio</span>
                <p className="mt-1 font-display text-2xl font-bold text-sky-400">
                  {formatBRL(kpis.avgTicket)}
                </p>
              </div>
            </section>

            {/* Main Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
              {/* Left: New Quote + Table (hidden on print) */}
              <div className="print:hidden lg:col-span-7 space-y-6">
                {/* Create Quote Form */}
                <form
                  onSubmit={handleCreateQuote}
                  className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h2 className="font-display text-base font-bold text-slate-100">
                      Novo Orçamento Comercial
                    </h2>
                    {!permissions.canCreateQuote && (
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-500/15 px-2.5 py-1 font-mono text-[11px] text-amber-300">
                        <Lock className="h-3 w-3" />
                        Bloqueado para {permissions.label}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="client-select"
                        className="block font-mono text-xs text-slate-400"
                      >
                        Cliente
                      </label>
                      <select
                        id="client-select"
                        value={newClientIdx}
                        onChange={(e) => setNewClientIdx(Number(e.target.value))}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                      >
                        {CLIENTS.map((c, idx) => (
                          <option key={c.cnpj} value={idx}>
                            {c.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="product-select"
                        className="block font-mono text-xs text-slate-400"
                      >
                        Produto / Módulo
                      </label>
                      <select
                        id="product-select"
                        value={newProductIdx}
                        onChange={(e) => setNewProductIdx(Number(e.target.value))}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                      >
                        {PRODUCTS.map((p, idx) => (
                          <option key={p.name} value={idx}>
                            {p.name} ({formatBRL(p.unitPrice)})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="qty-input"
                        className="block font-mono text-xs text-slate-400"
                      >
                        Quantidade
                      </label>
                      <input
                        id="qty-input"
                        type="number"
                        min={1}
                        max={500}
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(Number(e.target.value))}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="discount-input"
                        className="block font-mono text-xs text-slate-400"
                      >
                        Desconto % (Alçada atual: até {permissions.maxDiscount}%)
                      </label>
                      <input
                        id="discount-input"
                        type="number"
                        min={0}
                        max={50}
                        value={newDiscount}
                        onChange={(e) => setNewDiscount(Number(e.target.value))}
                        className="mt-1 w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100"
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4">
                    <div className="text-xs text-slate-300">
                      Prévia Líquida:{" "}
                      <strong className="font-mono text-sm text-emerald-400">
                        {formatBRL(
                          calcNetTotal({
                            quantity: Math.max(1, newQuantity),
                            unitPrice: PRODUCTS[newProductIdx].unitPrice,
                            discountPercent: Math.max(0, newDiscount),
                          })
                        )}
                      </strong>
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-400 cursor-pointer"
                    >
                      <Plus className="h-4 w-4" />
                      Gerar Orçamento
                    </button>
                  </div>
                </form>

                {/* Quotes List + Export Excel */}
                <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
                  <div className="flex flex-col justify-between gap-3 border-b border-slate-800 pb-4 sm:flex-row sm:items-center">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        placeholder="Buscar por ID, cliente ou produto..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 py-2 pl-9 pr-3 text-xs text-slate-100 sm:text-sm"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                      <select
                        aria-label="Filtrar por status"
                        value={statusFilter}
                        onChange={(e) =>
                          setStatusFilter(e.target.value as "Todos" | QuoteStatus)
                        }
                        className="rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs text-slate-200"
                      >
                        <option value="Todos">Todos os Status</option>
                        <option value="Em Análise">Em Análise</option>
                        <option value="Aprovado">Aprovado</option>
                        <option value="Em Produção">Em Produção</option>
                      </select>

                      <button
                        type="button"
                        onClick={handleExportExcel}
                        className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-3.5 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 cursor-pointer"
                      >
                        <FileSpreadsheet className="h-4 w-4" />
                        Exportar Excel (.CSV)
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {filteredQuotes.map((q) => {
                      const isSelected = selectedQuote?.id === q.id;
                      return (
                        <div
                          key={q.id}
                          onClick={() => setSelectedQuoteId(q.id)}
                          className={`rounded-xl border p-4 transition-colors cursor-pointer ${
                            isSelected
                              ? "border-indigo-500/60 bg-indigo-500/10"
                              : "border-slate-800 bg-slate-950/60 hover:border-slate-700"
                          }`}
                        >
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-xs font-bold text-indigo-300">
                                {q.id}
                              </span>
                              <span className="text-sm font-semibold text-slate-100">
                                {q.client}
                              </span>
                            </div>
                            <span
                              className={`rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${
                                q.status === "Em Produção"
                                  ? "bg-indigo-500/20 text-indigo-300"
                                  : q.status === "Aprovado"
                                  ? "bg-emerald-500/20 text-emerald-300"
                                  : "bg-amber-500/20 text-amber-300"
                              }`}
                            >
                              {q.status}
                            </span>
                          </div>

                          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400">
                            <span>
                              {q.quantity}x {q.product} (Desc. {q.discountPercent}%)
                            </span>
                            <span className="font-mono text-sm font-bold text-slate-100">
                              {formatBRL(calcNetTotal(q))}
                            </span>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2 border-t border-slate-800/80 pt-3">
                            {q.status === "Em Análise" && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(q.id, "Aprovado");
                                }}
                                className="rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300 hover:bg-emerald-500/20 cursor-pointer"
                              >
                                Aprovar Orçamento
                              </button>
                            )}
                            {q.status === "Aprovado" && (
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(q.id, "Em Produção");
                                }}
                                className="rounded-lg border border-indigo-500/40 bg-indigo-500/15 px-2.5 py-1 text-[11px] font-medium text-indigo-300 hover:bg-indigo-500/25 cursor-pointer"
                              >
                                Gerar Ordem de Produção
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Right: Printable Commercial Quote & Production Order Preview */}
              <div className="lg:col-span-5">
                {selectedQuote && (
                  <div className="rounded-2xl border border-slate-800 bg-white p-6 text-slate-900 shadow-2xl">
                    <div className="flex items-start justify-between border-b border-slate-200 pb-4">
                      <div>
                        <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-indigo-600">
                          Documento Comercial & Ordem de Produção
                        </span>
                        <h2 className="mt-1 font-display text-xl font-bold text-slate-900">
                          {selectedQuote.id}
                        </h2>
                        <p className="text-xs text-slate-500">
                          Emitido em {selectedQuote.createdAt} • Status: {selectedQuote.status}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={handlePrintPdf}
                        className="print:hidden inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800 cursor-pointer"
                      >
                        <Printer className="h-4 w-4" />
                        Gerar PDF
                      </button>
                    </div>

                    <div className="mt-4 space-y-4 text-xs sm:text-sm">
                      <div className="rounded-xl bg-slate-50 p-3.5 border border-slate-200">
                        <span className="block font-mono text-[11px] uppercase text-slate-500">
                          Cliente Faturado
                        </span>
                        <strong className="mt-0.5 block text-slate-900">
                          {selectedQuote.client}
                        </strong>
                        <span className="text-xs text-slate-600">
                          CNPJ: {selectedQuote.cnpj}
                        </span>
                      </div>

                      <div className="overflow-hidden rounded-xl border border-slate-200">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-100 text-slate-600">
                            <tr>
                              <th className="p-2.5">Item</th>
                              <th className="p-2.5 text-right">Qtd</th>
                              <th className="p-2.5 text-right">Unit.</th>
                              <th className="p-2.5 text-right">Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="border-t border-slate-200">
                              <td className="p-2.5 font-medium text-slate-900">
                                {selectedQuote.product}
                              </td>
                              <td className="p-2.5 text-right">{selectedQuote.quantity}</td>
                              <td className="p-2.5 text-right">
                                {formatBRL(selectedQuote.unitPrice)}
                              </td>
                              <td className="p-2.5 text-right font-semibold">
                                {formatBRL(selectedQuote.quantity * selectedQuote.unitPrice)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="space-y-1.5 rounded-xl bg-slate-50 p-4 border border-slate-200">
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>Subtotal Bruto</span>
                          <span>
                            {formatBRL(selectedQuote.quantity * selectedQuote.unitPrice)}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs text-emerald-700">
                          <span>Desconto Aplicado ({selectedQuote.discountPercent}%)</span>
                          <span>
                            -{" "}
                            {formatBRL(
                              selectedQuote.quantity *
                                selectedQuote.unitPrice *
                                (selectedQuote.discountPercent / 100)
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
                          <span>Valor Líquido Final</span>
                          <span>{formatBRL(calcNetTotal(selectedQuote))}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between rounded-xl border border-dashed border-slate-300 px-3.5 py-2.5 text-xs text-slate-600">
                        <span>Anexo vinculado: {selectedQuote.attachmentName}</span>
                        <Download className="print:hidden h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
