"use client";

import { useRoundKpis } from "./hooks";

interface RoundKpisProps {
  roundId: number;
}

export function RoundKpis({ roundId }: RoundKpisProps) {
  const { kpis, isLoading } = useRoundKpis(roundId);

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-8 mx-auto mb-2" />
            <div className="h-6 bg-gray-200 rounded w-16 mx-auto mb-1" />
            <div className="h-3 bg-gray-100 rounded w-12 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (kpis.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white rounded-xl border border-gray-200 p-4 text-center">
          <span className="text-2xl mb-2 block">{kpi.icon}</span>
          <p className="text-lg font-bold text-gray-900">{kpi.value}</p>
          <p className="text-xs text-gray-500">{kpi.label}</p>
        </div>
      ))}
    </div>
  );
}
