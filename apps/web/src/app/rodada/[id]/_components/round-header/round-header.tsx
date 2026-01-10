"use client";

import { useRoundQueries } from "@/app/rodada/[id]/hooks";
import { formatCurrency } from "@/shared/lib/utils";
import dayjs from "dayjs";

interface RoundHeaderProps {
  roundId: number;
}

export function RoundHeader({ roundId }: RoundHeaderProps) {
  const { round, isLoading } = useRoundQueries(roundId);

  if (isLoading) {
    return (
      <div className="brutalist-card p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-24 mb-4" />
        <div className="h-10 bg-gray-200 rounded w-64 mb-4" />
        <div className="h-4 bg-gray-100 rounded w-48" />
      </div>
    );
  }

  if (!round) return null;

  const statusStyles: Record<string, string> = {
    OPEN: "bg-yellow-400 text-black",
    LIVE: "bg-red-600 text-white animate-pulse",
    CLOSED: "bg-gray-900 text-white",
  };

  const statusLabels: Record<string, string> = {
    OPEN: "ABERTA",
    LIVE: "AO VIVO",
    CLOSED: "ENCERRADA",
  };

  return (
    <div className="brutalist-card p-8 border-l-2 border-l-yellow-400 bg-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <span className={`inline-block px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] mb-4 ${statusStyles[round.status] || statusStyles.CLOSED}`}>
            {statusLabels[round.status] || "ENCERRADA"}
          </span>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900 leading-none">
            {round.title}
          </h1>
          <p className="text-xs font-bold uppercase tracking-widest text-black/50 mt-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400" />
            {dayjs(round.startDate).format("DD/MM/YYYY")} — {round.endDate ? dayjs(round.endDate).format("DD/MM/YYYY") : "EM ANDAMENTO"}
          </p>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <span className="text-[10px] font-black uppercase tracking-widest text-black/50 mb-1">Prêmio Acumulado</span>
          <p className="text-3xl font-black text-yellow-500 italic tracking-tighter">
            {formatCurrency(round.prizePool || 0)}
          </p>
          <div className="mt-2 text-[10px] font-black uppercase tracking-widest text-black bg-yellow-400 px-3 py-1 border border-black italic">
            {round.totalTickets} Apostas
          </div>
        </div>
      </div>
    </div>
  );
}
