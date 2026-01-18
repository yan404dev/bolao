"use client";

import { useRankingKpis } from "@/app/ranking/_components/ranking-kpis/hooks";
import { KpiCard } from "@/app/ranking/_components/ranking-kpis/_components/kpi-card";

interface RankingKpisProps {
  roundId?: number;
}

export function RankingKpis({ roundId }: RankingKpisProps) {
  const { kpis, isLoading } = useRankingKpis(roundId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white border border-black p-3 sm:p-4 animate-pulse">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-100 border border-black" />
              <div className="flex-1 space-y-1 sm:space-y-2">
                <div className="h-2 bg-gray-100 rounded w-1/2" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kpis.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-6">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </div>
  );
}
