"use client";

import React, { useEffect, useRef } from "react";
import { Download, FileCheck2, Globe, X } from "lucide-react";
import { RESUME_OPTIONS } from "@/data/profileData";

interface ResumeDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ResumeDownloadModal({
  isOpen,
  onClose,
}: ResumeDownloadModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (!isOpen) {
      if (dialog.open) dialog.close();
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();

    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
    };
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center bg-transparent p-4 text-slate-100 open:flex backdrop:bg-slate-950/80 backdrop:backdrop-blur-sm"
      aria-labelledby="resume-modal-title"
      aria-describedby="resume-modal-description"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
    >
      <div className="relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2
              id="resume-modal-title"
              className="font-display text-xl font-bold text-slate-50"
            >
              Central de Currículos (PDF)
            </h2>
            <p id="resume-modal-description" className="mt-1 text-sm text-slate-400">
              QA e Full Stack, em português e inglês. Escolha a área e o idioma da sua vaga.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar janela de currículos"
            autoFocus
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-950 text-slate-400 transition-colors hover:text-white cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3 max-h-[65vh] overflow-y-auto pr-1">
          {RESUME_OPTIONS.map((cv) => (
            <div
              key={cv.id}
              className="flex flex-col justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950/70 p-4 transition-colors duration-200 hover:border-emerald-500/40 sm:flex-row sm:items-center"
            >
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-emerald-400" />
                  <h3 className="font-display text-sm font-semibold text-slate-100 sm:text-base">
                    {cv.title}
                  </h3>
                  <span className="rounded-full border border-slate-700 bg-slate-800 px-2 py-0.5 font-mono text-[11px] text-emerald-300">
                    {cv.badge}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-800/80 px-2 py-0.5 font-mono text-[11px] text-slate-300">
                    <Globe className="h-3 w-3" />
                    {cv.language}
                  </span>
                </div>
                <p className="text-xs text-slate-400 sm:text-sm">{cv.targetRole}</p>
              </div>

              <a
                href={cv.url}
                download={cv.filename}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Baixar ${cv.title} em ${cv.language === "EN" ? "inglês" : "português"} (PDF)`}
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-semibold text-slate-950 transition-colors duration-200 hover:bg-emerald-400 cursor-pointer"
              >
                <Download className="h-4 w-4" />
                Baixar PDF
              </a>
            </div>
          ))}
        </div>
      </div>
    </dialog>
  );
}
