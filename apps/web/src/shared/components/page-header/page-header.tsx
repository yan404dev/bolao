"use client";

import { BackButton } from "@/shared/components/back-button/back-button";
import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  highlightedTitle?: string;
  subtitle?: string;
  badge?: ReactNode;
}

export function PageHeader({ title, highlightedTitle, subtitle, badge }: PageHeaderProps) {
  return (
    <div className="mb-8 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="flex items-start gap-4 sm:gap-6">
        <div className="shrink-0 mt-1 sm:mt-2">
          <BackButton />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-5xl md:text-6xl font-black uppercase italic tracking-tighter text-black leading-[1] flex flex-wrap items-center gap-x-2 sm:gap-x-4">
            {title} {highlightedTitle && <span className="text-yellow-400 underline decoration-black/10 decoration-4 underline-offset-8">{highlightedTitle}</span>}
          </h1>
          {subtitle && (
            <p className="text-gray-400 font-black uppercase tracking-[0.2em] text-[9px] sm:text-xs mt-2 sm:mt-4 flex items-center gap-2">
              <span className="w-8 h-[2px] bg-yellow-400 hidden sm:block" /> {subtitle}
            </p>
          )}
        </div>
      </div>

      {badge && (
        <div className="shrink-0 md:mb-1">
          {badge}
        </div>
      )}
    </div>
  );
}
