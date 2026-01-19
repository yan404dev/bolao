"use client";

import { useRoundQueries } from "@/app/rodada/[id]/hooks";
import { roundStatusStyles, roundStatusLabels } from "@/shared/constants";
import { formatCurrency, extractRoundNumber } from "@/shared/lib/utils";
import { cn } from "@/shared/lib/utils";
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

  return (
    <div className="brutalist-card p-5 sm:p-8 border-l-4 border-l-yellow-400 bg-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 sm:gap-6">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex items-center gap-3">
              <span className={cn(
                "px-2 py-0.5 text-[8px] sm:text-[10px] font-black uppercase tracking-widest border border-black italic",
                round.status === 'OPEN' ? "bg-yellow-400 text-black" : "bg-black text-white"
              )}>
                # {roundStatusLabels[round.status] || "DESAFIO TÁTICO"}
              </span>
              <span className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-black/30 truncate">
                {round.championshipTitle}
              </span>
            </div>
          </div>
          <h1 className="text-xl sm:text-4xl font-black uppercase italic tracking-tighter text-gray-900 leading-none break-words">
            {round.championshipTitle} - Rodada {extractRoundNumber(round.externalRoundId)}
          </h1>
          <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white border-2 border-black px-3 py-2 sm:px-5 sm:py-3">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-gray-500">Início:</span>
              <span className="text-sm sm:text-xl font-black italic text-black">
                {dayjs(round.startDate).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-yellow-400 border-2 border-black px-3 py-2 sm:px-5 sm:py-3">
              <span className="text-[10px] sm:text-xs font-black uppercase tracking-widest text-black">Resultado:</span>
              <span className="text-sm sm:text-xl font-black italic text-black">
                {round.endDate ? dayjs(round.endDate).format("DD/MM/YYYY") : "A definir"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end mt-2 sm:mt-0">
          <div className="flex flex-col items-start md:items-end gap-1 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-black/50 mb-0.5">
              {round.ticketPrice && round.ticketPrice > 10 ? "Prêmio Acumulado" : "Prêmio da Rodada"}
            </span>
            <p className="text-2xl sm:text-3xl font-black text-yellow-500 italic tracking-tighter whitespace-nowrap leading-none">
              {formatCurrency(round.prizePool || 0)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2 mt-2">
            {round.ticketPrice && round.ticketPrice > 10 && (
              <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-white bg-black px-2 py-0.5 sm:px-3 sm:py-1 border border-black italic">
                ★ DOBRADO
              </div>
            )}
            <div className="text-[8px] sm:text-[10px] font-black uppercase tracking-widest text-black bg-yellow-400 px-2 py-0.5 sm:px-3 sm:py-1 border border-black italic">
              {round.totalTickets} Palpites
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
