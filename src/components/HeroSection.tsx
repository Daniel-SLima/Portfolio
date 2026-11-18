"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Check,
  CheckCircle2,
  Copy,
  Download,
  FlaskConical,
  Github,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  MessageSquare,
} from "lucide-react";
import {
  CONTACT_INFO,
  PROFILE_LENSES,
  ProfileLensId,
} from "@/data/profileData";
import { ProfileLensSwitcher } from "./ProfileLensSwitcher";

interface HeroSectionProps {
  activeLens: ProfileLensId;
  onChangeLens: (lens: ProfileLensId) => void;
  onOpenResumeModal: () => void;
}

export function HeroSection({
  activeLens,
  onChangeLens,
  onOpenResumeModal,
}: HeroSectionProps) {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const lens = PROFILE_LENSES[activeLens];

  const badgeStyles =
    lens.accent === "indigo"
      ? "border-indigo-500/40 bg-indigo-500/10 text-indigo-300"
      : lens.accent === "sky"
      ? "border-sky-500/40 bg-sky-500/10 text-sky-300"
      : "border-emerald-500/40 bg-emerald-500/10 text-emerald-300";

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_INFO.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2200);
    } catch {
      window.location.href = `mailto:${CONTACT_INFO.email}`;
    }
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20">
      {/* Subtle Ambient Glows */}
      <div className="pointer-events-none absolute -top-24 left-1/4 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
      <div className="pointer-events-none absolute top-24 right-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Recruiter Lens Switcher */}
        <div className="mb-8">
          <ProfileLensSwitcher activeLens={activeLens} onChange={onChangeLens} />
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Main Left Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs font-medium ${badgeStyles}`}
              >
                <CheckCircle2 className="h-3.5 w-3.5" />
                {lens.badgeText}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-800 bg-slate-900/70 px-3 py-1.5 text-xs text-slate-300">
                <MapPin className="h-3.5 w-3.5 text-slate-400" />
                {CONTACT_INFO.location}
              </span>
            </div>

            <div>
              <p className="font-mono text-sm font-medium text-emerald-400">
                {CONTACT_INFO.name} • {CONTACT_INFO.age} anos
              </p>
              <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-50 sm:text-5xl sm:leading-[1.12]">
                {lens.headline}
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
                {lens.subheadline}
              </p>
            </div>

            <p className="max-w-2xl rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 text-sm leading-relaxed text-slate-300">
              {lens.summary}
            </p>

            {/* Primary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href={lens.cvUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/20 transition-colors duration-200 hover:bg-emerald-400 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                {lens.cvLabel}
              </a>

              <button
                type="button"
                onClick={onOpenResumeModal}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-sm font-medium text-slate-100 transition-colors duration-200 hover:border-slate-500 hover:bg-slate-800 cursor-pointer"
              >
                Ver Todos os 5 CVs (PT/EN)
              </button>

              <Link
                href="/saas-demo"
                className="inline-flex items-center gap-2 rounded-xl border border-indigo-500/40 bg-indigo-500/15 px-4 py-3 text-sm font-medium text-indigo-200 transition-colors duration-200 hover:bg-indigo-500/25 cursor-pointer"
              >
                <Layers className="h-4 w-4" />
                Simulador SaaS
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/qa-lab"
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-sm font-medium text-emerald-300 transition-colors duration-200 hover:bg-emerald-500/20 cursor-pointer"
              >
                <FlaskConical className="h-4 w-4" />
                QA Lab
              </Link>
            </div>

            {/* Social / Contact Quick Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-sm text-slate-400">
              <a
                href={CONTACT_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white cursor-pointer"
              >
                <Linkedin className="h-4 w-4 text-sky-400" />
                LinkedIn ({CONTACT_INFO.linkedinHandle})
              </a>
              <a
                href={CONTACT_INFO.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white cursor-pointer"
              >
                <Github className="h-4 w-4 text-slate-200" />
                GitHub ({CONTACT_INFO.githubHandle})
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                title="Clique para copiar o e-mail"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-800 bg-slate-900/70 px-2.5 py-1 text-xs text-slate-300 transition-colors hover:border-emerald-500/40 hover:text-white cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    <span className="text-emerald-300">E-mail copiado!</span>
                  </>
                ) : (
                  <>
                    <Mail className="h-3.5 w-3.5 text-emerald-400" />
                    <span>{CONTACT_INFO.email}</span>
                    <Copy className="h-3 w-3 text-slate-500" />
                  </>
                )}
              </button>
              <a
                href={CONTACT_INFO.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 transition-colors hover:text-white cursor-pointer"
              >
                <MessageSquare className="h-4 w-4 text-emerald-400" />
                {CONTACT_INFO.phoneDisplay}
              </a>
            </div>
          </div>

          {/* Right Column: Portrait + Executive Highlights */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-6 shadow-2xl backdrop-blur-md">
              {/* Profile Header with Studio Photo */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div className="flex items-center gap-3.5">
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={CONTACT_INFO.avatarUrl}
                      alt="Foto profissional de Daniel Santana Lima"
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h2 className="font-display text-lg font-bold text-slate-50">
                      {CONTACT_INFO.shortName}
                    </h2>
                    <p className="text-xs text-slate-400">
                      QA @ Nasajon • ADS @ IFBA
                    </p>
                    <span className="mt-1 inline-flex items-center gap-1.5 font-mono text-[11px] text-emerald-400">
                      <span className="h-2 w-2 rounded-full bg-emerald-400" />
                      Disponível para novas oportunidades
                    </span>
                  </div>
                </div>

                <span className="hidden shrink-0 items-center gap-1 rounded-lg border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 font-mono text-xs font-medium text-amber-300 sm:inline-flex">
                  <Award className="h-3.5 w-3.5" />
                  NASA Top 10
                </span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {lens.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-800/90 bg-slate-950/70 p-3.5 transition-colors duration-200 hover:border-slate-700"
                  >
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-slate-400">
                      {item.label}
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-slate-100">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-3.5">
                <div className="flex items-center justify-between gap-2 text-xs">
                  <span className="font-mono text-emerald-300">
                    IFBA (ADS 5º Sem.) + Técnico SENAI CIMATEC
                  </span>
                  <span className="shrink-0 rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                    Salvador/BA • Remoto
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
