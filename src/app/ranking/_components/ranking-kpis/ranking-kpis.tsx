"use client";

import { useRankingKpisModel } from "./ranking-kpis.model";

export function RankingKpis() {
  const { kpis } = useRankingKpisModel();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {kpis.map((kpi) => (
        <div
          key={kpi.label}
          className="bg-white rounded-xl border border-gray-200 p-4"
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl">{kpi.icon}</span>
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">{kpi.label}</p>
              <p className="text-xl font-bold text-gray-900">{kpi.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
