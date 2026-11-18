"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Copy,
  ExternalLink,
  FolderGit2,
  KeyRound,
  Layers,
} from "lucide-react";
import {
  CONTACT_INFO,
  MORE_GITHUB_REPOS,
  PROJECTS,
} from "@/data/profileData";

export function ProjectsSection() {
  const [copiedCreds, setCopiedCreds] = useState<string | null>(null);

  const handleCopy = async (key: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedCreds(key);
      setTimeout(() => setCopiedCreds(null), 2000);
    } catch {
      // Clipboard fallback ignored cleanly
    }
  };

  return (
    <section id="projetos" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-indigo-400">
              <Layers className="h-4 w-4" />
              Projetos & Reconhecimentos Verificados
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-slate-50 sm:text-4xl">
              Sistemas em Produção, Automação QA, IA & Premiações
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-slate-400 sm:text-base">
              Todos os links abaixo apontam para demonstrações funcionais e repositórios reais publicados no meu GitHub.
            </p>
          </div>
          <a
            href={`${CONTACT_INFO.githubUrl}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-2.5 text-xs font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white cursor-pointer sm:text-sm"
          >
            <FolderGit2 className="h-4 w-4 text-emerald-400" />
            Ver +35 Repositórios no GitHub
            <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {PROJECTS.map((project) => {
            const borderAccent =
              project.accent === "indigo"
                ? "hover:border-indigo-500/50"
                : project.accent === "emerald"
                ? "hover:border-emerald-500/50"
                : project.accent === "amber"
                ? "hover:border-amber-500/50"
                : "hover:border-sky-500/50";

            const badgeAccent =
              project.accent === "indigo"
                ? "border-indigo-500/40 bg-indigo-500/15 text-indigo-300"
                : project.accent === "emerald"
                ? "border-emerald-500/40 bg-emerald-500/15 text-emerald-300"
                : project.accent === "amber"
                ? "border-amber-500/40 bg-amber-500/15 text-amber-300"
                : "border-sky-500/40 bg-sky-500/15 text-sky-300";

            return (
              <article
                key={project.id}
                className={`flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/75 p-6 backdrop-blur-md transition-colors duration-200 ${borderAccent}`}
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 font-mono text-xs font-medium ${badgeAccent}`}
                    >
                      {project.badge}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {project.metrics.map((m) => (
                        <span
                          key={m.label}
                          className="rounded-lg border border-slate-800 bg-slate-950/70 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                        >
                          <strong className="text-slate-100">{m.value}</strong>
                        </span>
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-4 font-display text-xl font-bold text-slate-50">
                    {project.title}
                  </h3>
                  <p className="mt-1 font-mono text-xs text-slate-400">
                    {project.subtitle}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    {project.description}
                  </p>

                  {/* Demo Credentials Helper when available */}
                  {project.demoCredentials && (
                    <div className="mt-4 rounded-xl border border-indigo-500/30 bg-indigo-500/10 p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                        <span className="inline-flex items-center gap-1.5 font-mono text-indigo-200">
                          <KeyRound className="h-3.5 w-3.5 text-indigo-300" />
                          Acesso Demo Online:
                        </span>
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy("email", project.demoCredentials!.email)
                            }
                            className="inline-flex items-center gap-1 rounded-md border border-indigo-400/30 bg-slate-950/70 px-2 py-1 font-mono text-[11px] text-slate-200 hover:border-indigo-400 cursor-pointer"
                          >
                            {copiedCreds === "email"
                              ? "Copiado!"
                              : project.demoCredentials.email}
                            <Copy className="h-3 w-3 text-indigo-300" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              handleCopy("pass", project.demoCredentials!.password)
                            }
                            className="inline-flex items-center gap-1 rounded-md border border-indigo-400/30 bg-slate-950/70 px-2 py-1 font-mono text-[11px] text-slate-200 hover:border-indigo-400 cursor-pointer"
                          >
                            {copiedCreds === "pass"
                              ? "Senha copiada!"
                              : `Senha: ${project.demoCredentials.password}`}
                            <Copy className="h-3 w-3 text-indigo-300" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  <ul className="mt-4 space-y-2 border-t border-slate-800/80 pt-4">
                    {project.technicalHighlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex items-start gap-2 text-xs leading-relaxed text-slate-300 sm:text-sm"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 space-y-4 border-t border-slate-800 pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-slate-800 bg-slate-950 px-2.5 py-1 font-mono text-[11px] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {(project.externalDemoUrl || project.demoHref || project.githubUrl) && (
                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {project.externalDemoUrl && (
                        <a
                          href={project.externalDemoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-indigo-400 cursor-pointer"
                        >
                          {project.externalDemoLabel ?? "Abrir Demo Online"}
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.demoHref && (
                        <Link
                          href={project.demoHref}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-semibold text-slate-950 transition-colors hover:bg-emerald-400 cursor-pointer"
                        >
                          {project.demoLabel ?? "Ver Demo Interativa"}
                          <ArrowUpRight className="h-4 w-4" />
                        </Link>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2 text-xs font-medium text-slate-200 transition-colors hover:border-slate-500 hover:text-white cursor-pointer"
                        >
                          <FolderGit2 className="h-4 w-4 text-slate-400" />
                          {project.githubRepoName}
                          <ExternalLink className="h-3.5 w-3.5 text-slate-400" />
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Secondary Open-Source Repos Strip */}
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {MORE_GITHUB_REPOS.map((repo) => (
            <a
              key={repo.name}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/50 p-5 transition-colors duration-200 hover:border-emerald-500/40 hover:bg-slate-900/80 cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-2 font-display text-base font-bold text-slate-100 group-hover:text-emerald-300">
                    <FolderGit2 className="h-4 w-4 text-emerald-400" />
                    {repo.title}
                  </span>
                  <ExternalLink className="h-4 w-4 text-slate-500 group-hover:text-emerald-400" />
                </div>
                <p className="mt-2 text-xs leading-relaxed text-slate-400 sm:text-sm">
                  {repo.description}
                </p>
              </div>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {repo.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-slate-800 bg-slate-950 px-2 py-0.5 font-mono text-[11px] text-slate-300"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
