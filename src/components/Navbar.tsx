"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  FileText,
  FlaskConical,
  Layers,
  Menu,
  Terminal,
  X,
} from "lucide-react";

interface NavbarProps {
  onOpenResumeModal?: () => void;
  activePage?: "home" | "saas-demo" | "qa-lab";
}

export function Navbar({ onOpenResumeModal, activePage = "home" }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="print:hidden fixed top-4 left-4 right-4 z-50">
      <nav
        aria-label="Navegação principal"
        className="mx-auto max-h-[calc(100dvh-2rem)] max-w-7xl overflow-y-auto rounded-2xl border border-slate-800/90 bg-slate-900/80 px-4 py-3 shadow-xl shadow-slate-950/60 backdrop-blur-md sm:px-6"
      >
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 text-slate-50 transition-colors duration-200 hover:text-emerald-400 cursor-pointer"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
              <Terminal className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <span className="block font-display text-sm font-bold tracking-tight sm:text-base">
                Daniel Lima
              </span>
              <span className="block font-mono text-[11px] text-slate-400">
                QA • Full Stack • ERP
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden items-center gap-1 lg:flex">
            {activePage === "home" ? (
              <>
                <a
                  href="#projetos"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-slate-800/70 hover:text-white cursor-pointer"
                >
                  Projetos
                </a>
                <a
                  href="#qa-preview"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-slate-800/70 hover:text-white cursor-pointer"
                >
                  Automação QA
                </a>
                <a
                  href="#experiencia"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-slate-800/70 hover:text-white cursor-pointer"
                >
                  Experiência
                </a>
                <a
                  href="#habilidades"
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-slate-800/70 hover:text-white cursor-pointer"
                >
                  Stack & Formação
                </a>
              </>
            ) : (
              <Link
                href="/"
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-slate-800/70 hover:text-white cursor-pointer"
              >
                Voltar ao Portfólio
              </Link>
            )}

            <div className="mx-2 h-5 w-px bg-slate-800" />

            <Link
              href="/qa-lab"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activePage === "qa-lab"
                  ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                  : "text-emerald-400 hover:bg-emerald-500/10"
              }`}
            >
              <FlaskConical className="h-4 w-4" />
              QA Lab
            </Link>
            <Link
              href="/saas-demo"
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activePage === "saas-demo"
                  ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                  : "text-indigo-400 hover:bg-indigo-500/10"
              }`}
            >
              <Layers className="h-4 w-4" />
              SaaS Demo
            </Link>
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {onOpenResumeModal ? (
              <button
                type="button"
                onClick={onOpenResumeModal}
                aria-label="Currículos (PDF)"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-xs font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-colors duration-200 hover:bg-emerald-400 cursor-pointer sm:w-auto sm:px-3.5 sm:text-sm"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Currículos (PDF)</span>
              </button>
            ) : (
              <Link
                href="/#contato"
                aria-label="Currículos"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 text-xs font-semibold text-slate-950 transition-colors duration-200 hover:bg-emerald-400 cursor-pointer sm:w-auto sm:px-3.5 sm:text-sm"
              >
                <FileText className="h-4 w-4" />
                <span className="hidden sm:inline">Currículos</span>
              </Link>
            )}

            <button
              type="button"
              aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((prev) => !prev)}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 hover:text-white lg:hidden cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div id="mobile-navigation" className="mt-3 flex flex-col gap-1 border-t border-slate-800 pt-3 lg:hidden">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-200 hover:bg-slate-800/70"
            >
              Início / Portfólio
            </Link>
            {activePage === "home" && (
              <>
                <a
                  href="#projetos"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800/70"
                >
                  Projetos & Reconhecimentos
                </a>
                <a
                  href="#qa-preview"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800/70"
                >
                  Automação QA & BDD
                </a>
                <a
                  href="#experiencia"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800/70"
                >
                  Experiência Profissional
                </a>
                <a
                  href="#habilidades"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800/70"
                >
                  Stack & Formação
                </a>
              </>
            )}
            <Link
              href="/qa-lab"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-emerald-400 hover:bg-emerald-500/10"
            >
              <FlaskConical className="h-4 w-4" />
              Abrir QA Lab Interativo
            </Link>
            <Link
              href="/saas-demo"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-indigo-400 hover:bg-indigo-500/10"
            >
              <Layers className="h-4 w-4" />
              Abrir Demo SaaS Comercial
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
