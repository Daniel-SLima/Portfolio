"use client";

import React, { useState } from "react";
import { Cpu } from "lucide-react";
import {
  PROFILE_LENSES,
  ProfileLensId,
  SKILL_CATEGORIES,
} from "@/data/profileData";

interface SkillsMatrixProps {
  activeLens: ProfileLensId;
}

export function SkillsMatrix({ activeLens }: SkillsMatrixProps) {
  const [selectedFilter, setSelectedFilter] = useState<string>("all");

  const priorityOrder = PROFILE_LENSES[activeLens].priorityCategories;
  const sortedCategories = [...SKILL_CATEGORIES].sort(
    (a, b) => priorityOrder.indexOf(a.id) - priorityOrder.indexOf(b.id)
  );

  const visibleCategories =
    selectedFilter === "all"
      ? sortedCategories
      : sortedCategories.filter((c) => c.id === selectedFilter);

  return (
    <section id="habilidades" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-sky-400">
              <Cpu className="h-4 w-4" />
              Matriz de Competências
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-slate-50 sm:text-4xl">
              Stack Técnica, Qualidade & ERP
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
              A ordem das categorias se reorganiza automaticamente conforme a visão de recrutamento selecionada no topo.
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            <button
              type="button"
              onClick={() => setSelectedFilter("all")}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                selectedFilter === "all"
                  ? "bg-emerald-500 text-slate-950 font-semibold"
                  : "border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
              }`}
            >
              Todas
            </button>
            {sortedCategories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedFilter(cat.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                  selectedFilter === cat.id
                    ? "bg-emerald-500 text-slate-950 font-semibold"
                    : "border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {cat.title.split("&")[0].trim()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {visibleCategories.map((category) => (
            <div
              key={category.id}
              className="rounded-2xl border border-slate-800 bg-slate-900/75 p-6 backdrop-blur-md"
            >
              <div className="border-b border-slate-800 pb-4">
                <h3 className="font-display text-lg font-bold text-slate-50">
                  {category.title}
                </h3>
                <p className="mt-1 text-xs text-slate-400">{category.subtitle}</p>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                {category.items.map((skill) => (
                  <div
                    key={skill.name}
                    className="rounded-xl border border-slate-800/80 bg-slate-950/60 p-3 transition-colors hover:border-slate-700"
                  >
                    <span className="block text-sm font-semibold text-slate-100">
                      {skill.name}
                    </span>
                    <span className="mt-1 block text-xs text-slate-400">
                      {skill.context}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
