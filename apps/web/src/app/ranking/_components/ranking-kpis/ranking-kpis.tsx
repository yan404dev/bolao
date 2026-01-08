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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-100 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (kpis.length === 0) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi) => (
        <KpiCard key={kpi.label} kpi={kpi} />
      ))}
    </div>
  );
}
