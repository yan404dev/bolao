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
    <div className="mb-8 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="flex items-start sm:items-center gap-3 sm:gap-4">
        <div className="mt-1 sm:mt-0">
          <BackButton />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-gray-900 leading-[1.1] sm:leading-none flex flex-wrap items-center gap-x-2 sm:gap-x-3">
            {title} {highlightedTitle && <span className="text-yellow-400">{highlightedTitle}</span>}
          </h1>
          {subtitle && (
            <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] sm:text-xs mt-1 sm:mt-2 ml-0 sm:ml-1 line-clamp-1 sm:line-clamp-none">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {badge && (
        <div className="shrink-0">
          {badge}
        </div>
      )}
    </div>
  );
}
