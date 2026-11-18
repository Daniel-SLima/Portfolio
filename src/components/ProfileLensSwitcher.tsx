"use client";

import React from "react";
import { Code2, Database, ShieldCheck, Sparkles } from "lucide-react";
import { PROFILE_LENSES, ProfileLensId } from "@/data/profileData";

interface ProfileLensSwitcherProps {
  activeLens: ProfileLensId;
  onChange: (lens: ProfileLensId) => void;
}

const LENS_ICONS: Record<ProfileLensId, React.ReactNode> = {
  hybrid: <Sparkles className="h-4 w-4" />,
  qa: <ShieldCheck className="h-4 w-4" />,
  fullstack: <Code2 className="h-4 w-4" />,
  data_erp: <Database className="h-4 w-4" />,
};

export function ProfileLensSwitcher({
  activeLens,
  onChange,
}: ProfileLensSwitcherProps) {
  const orderedIds: ProfileLensId[] = ["hybrid", "qa", "fullstack", "data_erp"];

  return (
    <div className="rounded-2xl border border-slate-800/90 bg-slate-900/70 p-2 backdrop-blur-md">
      <div className="mb-2 flex items-center justify-between px-2 pt-1">
        <span className="font-mono text-[11px] uppercase tracking-wider text-slate-400">
          Visão para Recrutadores — Adapte o portfólio à sua vaga:
        </span>
      </div>
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4">
        {orderedIds.map((id) => {
          const lens = PROFILE_LENSES[id];
          const isActive = activeLens === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onChange(id)}
              className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-medium transition-colors duration-200 cursor-pointer sm:text-sm ${
                isActive
                  ? id === "fullstack"
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/50 shadow-sm"
                    : id === "data_erp"
                    ? "bg-sky-500/20 text-sky-300 border border-sky-500/50 shadow-sm"
                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm"
                  : "border border-transparent text-slate-400 hover:bg-slate-800/60 hover:text-slate-100"
              }`}
            >
              {LENS_ICONS[id]}
              <span className="truncate">{lens.shortLabel}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
