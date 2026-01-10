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
          <div key={i} className="bg-white border border-black p-4 animate-pulse">
            <div className="h-8 bg-gray-100 rounded-none w-8 mx-auto mb-2" />
            <div className="h-6 bg-gray-100 rounded-none w-16 mx-auto mb-1" />
            <div className="h-3 bg-gray-50 rounded-none w-12 mx-auto" />
          </div>
        ))}
      </div>
    );
  }

  if (kpis.length === 0) return null;

  return (
    <div className="grid grid-cols-3 gap-3">
      {kpis.map((kpi) => (
        <div key={kpi.label} className="bg-white border border-black p-4 text-center">
          <span className="text-2xl mb-2 block">{kpi.icon}</span>
          <p className="text-xl font-black text-black tracking-tighter italic">{kpi.value}</p>
          <p className="text-[10px] font-black uppercase tracking-widest text-black/50 mt-1">{kpi.label}</p>
        </div>
      ))}
    </div>
  );
}
