"use client";

import { useRoundQueries } from "@/app/rodada/[id]/hooks";
import { roundStatusStyles, roundStatusLabels } from "@/shared/constants";
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

  return (
    <div className="brutalist-card p-8 border-l-2 border-l-yellow-400 bg-white">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] ${roundStatusStyles[round.status] || roundStatusStyles.CLOSED}`}>
              {roundStatusLabels[round.status] || "ENCERRADA"}
            </span>
            {round.championshipLogo && (
              <img src={round.championshipLogo} alt={round.championshipTitle} className="w-6 h-6 object-contain grayscale brightness-0" />
            )}
            <span className="text-[10px] font-black uppercase tracking-widest text-black/40 italic">
              {round.championshipTitle}
            </span>
          </div>
          <h1 className="text-4xl font-black uppercase italic tracking-tighter text-gray-900 leading-none">
            {round.title}
          </h1>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <div className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">INÍCIO</span>
              <span className="text-base font-black italic text-black">
                {dayjs(round.startDate).format("DD/MM/YYYY")}
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-yellow-400 border-2 border-black px-4 py-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-black">🏆 RESULTADO</span>
              <span className="text-base font-black italic text-black">
                {round.endDate ? dayjs(round.endDate).format("DD/MM/YYYY") : "A DEFINIR"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start md:items-end">
          <div className="flex flex-col items-end gap-1 mb-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-black/50 mb-1">
              {round.ticketPrice && round.ticketPrice > 10 ? "Prêmio Acumulado" : "Prêmio da Rodada"}
            </span>
            <p className="text-3xl font-black text-yellow-500 italic tracking-tighter">
              {formatCurrency(round.prizePool || 0)}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-end gap-2">
            {round.ticketPrice && round.ticketPrice > 10 && (
              <div className="text-[10px] font-black uppercase tracking-widest text-white bg-black px-3 py-1 border border-black italic animate-bounce">
                ★ PRÊMIO DOBRADO
              </div>
            )}
            <div className="text-[10px] font-black uppercase tracking-widest text-black bg-yellow-400 px-3 py-1 border border-black italic">
              {round.totalTickets} Palpites
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
