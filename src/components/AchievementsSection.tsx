"use client";

import React from "react";
import { Award, GraduationCap, Languages } from "lucide-react";
import { CERTIFICATIONS_AND_LANGUAGES, EDUCATION } from "@/data/profileData";

export function AchievementsSection() {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Formação Acadêmica */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <GraduationCap className="h-5 w-5 text-emerald-400" />
              <h2 className="font-display text-lg font-bold text-slate-50">
                Formação Acadêmica
              </h2>
            </div>

            <div className="mt-4 space-y-4">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.institution}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <span className="inline-block rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                    {edu.status}
                  </span>
                  <h3 className="mt-2 font-display text-sm font-bold text-slate-100">
                    {edu.institution}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-slate-300">
                    {edu.course}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-slate-400">
                    {edu.period}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Reconhecimentos & Cursos */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <Award className="h-5 w-5 text-amber-400" />
              <h2 className="font-display text-lg font-bold text-slate-50">
                Prêmios & Certificações
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              {CERTIFICATIONS_AND_LANGUAGES.certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-3.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-slate-100">
                      {cert.name}
                    </h3>
                    <span className="font-mono text-xs text-amber-300">
                      {cert.year}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-slate-400">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Idiomas */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-6 backdrop-blur-md">
            <div className="flex items-center gap-2.5 border-b border-slate-800 pb-4">
              <Languages className="h-5 w-5 text-sky-400" />
              <h2 className="font-display text-lg font-bold text-slate-50">
                Idiomas & Vivência Internacional
              </h2>
            </div>

            <div className="mt-4 space-y-3">
              {CERTIFICATIONS_AND_LANGUAGES.languages.map((lang) => (
                <div
                  key={lang.name}
                  className="rounded-xl border border-slate-800 bg-slate-950/60 p-4"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-sm font-bold text-slate-100">
                      {lang.name}
                    </h3>
                    <span className="rounded-md bg-sky-500/15 px-2 py-0.5 font-mono text-[11px] text-sky-300">
                      {lang.level}
                    </span>
                  </div>
                  <p className="mt-1.5 text-xs text-slate-400">{lang.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
