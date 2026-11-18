"use client";

import React from "react";
import { Briefcase, CheckCircle2, MapPin } from "lucide-react";
import { EXPERIENCES, ProfileLensId } from "@/data/profileData";

interface ExperienceTimelineProps {
  activeLens: ProfileLensId;
}

export function ExperienceTimeline({ activeLens }: ExperienceTimelineProps) {
  return (
    <section id="experiencia" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-emerald-400">
            <Briefcase className="h-4 w-4" />
            Trajetória Profissional
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-slate-50 sm:text-4xl">
            Experiência em ERP Corporativo, QA & Desenvolvimento
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
            Histórico sólido combinando qualidade de software na Nasajon, sustentação de ERP TOTVS na Gnaritas e desenvolvimento Full Stack premiado na Lirdio.
          </p>
        </div>

        <div className="space-y-6">
          {EXPERIENCES.map((exp) => {
            const isHighlightedForLens = exp.lensRelevance.includes(activeLens);

            return (
              <div
                key={exp.id}
                className={`rounded-2xl border p-6 backdrop-blur-md transition-colors duration-200 ${
                  isHighlightedForLens
                    ? "border-emerald-500/35 bg-slate-900/80"
                    : "border-slate-800 bg-slate-900/50"
                }`}
              >
                <div className="flex flex-col justify-between gap-3 border-b border-slate-800 pb-4 md:flex-row md:items-center">
                  <div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <h3 className="font-display text-xl font-bold text-slate-50">
                        {exp.company}
                      </h3>
                      <span className="rounded-full border border-slate-700 bg-slate-800 px-2.5 py-0.5 font-mono text-xs text-emerald-300">
                        {exp.type}
                      </span>
                    </div>
                    <p className="mt-1 text-base font-medium text-slate-200">
                      {exp.role}
                    </p>
                  </div>

                  <div className="text-left md:text-right">
                    <span className="inline-block rounded-lg border border-slate-800 bg-slate-950 px-3 py-1 font-mono text-xs text-slate-200">
                      {exp.period}
                    </span>
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-slate-400 md:justify-end">
                      <MapPin className="h-3.5 w-3.5" />
                      {exp.location}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-300">
                  {exp.description}
                </p>

                <ul className="mt-4 grid grid-cols-1 gap-2.5 md:grid-cols-2">
                  {exp.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2 rounded-xl border border-slate-800/70 bg-slate-950/50 p-3 text-xs leading-relaxed text-slate-300 sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-2">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
