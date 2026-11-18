"use client";

import React from "react";
import Link from "next/link";
import {
  FileText,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
} from "lucide-react";
import { CONTACT_INFO } from "@/data/profileData";

interface FooterProps {
  onOpenResumeModal?: () => void;
}

export function Footer({ onOpenResumeModal }: FooterProps) {
  return (
    <footer id="contato" className="print:hidden border-t border-slate-800/80 bg-slate-950 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-6 backdrop-blur-md sm:p-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-3">
              <span className="font-mono text-xs uppercase tracking-wider text-emerald-400">
                Vamos Conversar
              </span>
              <h2 className="font-display text-2xl font-bold text-slate-50 sm:text-3xl">
                Pronto para contribuir em times de QA, Automação ou Desenvolvimento Full Stack.
              </h2>
              <p className="text-sm leading-relaxed text-slate-300 sm:text-base">
                Baseado em Salvador/BA, com disponibilidade imediata para atuação remota, híbrida ou presencial.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-wrap gap-3 lg:justify-end">
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 transition-colors hover:bg-emerald-400 cursor-pointer"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp: {CONTACT_INFO.phoneDisplay}
              </a>

              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-slate-500 cursor-pointer"
              >
                <Mail className="h-4 w-4 text-emerald-400" />
                Enviar E-mail
              </a>

              {onOpenResumeModal && (
                <button
                  type="button"
                  onClick={onOpenResumeModal}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-100 transition-colors hover:border-emerald-500/50 cursor-pointer"
                >
                  <FileText className="h-4 w-4 text-indigo-400" />
                  Baixar CVs em PDF
                </button>
              )}
            </div>
          </div>

          <div className="mt-8 flex flex-col justify-between gap-4 border-t border-slate-800 pt-6 text-xs text-slate-400 sm:flex-row sm:items-center">
            <p>
              © {new Date().getFullYear()} {CONTACT_INFO.name} — Construído com Next.js, TypeScript e Tailwind CSS.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={CONTACT_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white"
              >
                <Linkedin className="h-3.5 w-3.5 text-sky-400" />
                LinkedIn
              </a>
              <a
                href={CONTACT_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white"
              >
                <Github className="h-3.5 w-3.5 text-slate-200" />
                GitHub
              </a>
              <Link href="/qa-lab" className="hover:text-emerald-400">
                QA Lab
              </Link>
              <Link href="/saas-demo" className="hover:text-indigo-400">
                SaaS Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
