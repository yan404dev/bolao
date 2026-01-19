"use client";

import { useRoundQueries } from "@/app/rodada/[id]/hooks";
import { formatCurrency } from "@/shared/lib/utils";
import { Trophy } from "lucide-react";
import Link from "next/link";

interface RoundRankingProps {
  roundId: number;
}

export function RoundRanking({ roundId }: RoundRankingProps) {
  const { round, ranking, isLoading, isLoadingRanking } = useRoundQueries(roundId);

  const getMedal = (position: number) => {
    switch (position) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return null;
    }
  };

  if (isLoading || isLoadingRanking) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 animate-pulse">
          <div className="h-5 bg-gray-200 rounded w-20 mb-4" />
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-12 bg-gray-100 rounded mb-2" />
          ))}
        </div>
      </div>
    );
  }

  const isClosed = round?.status === "CLOSED";
  const winner = ranking?.items?.[0];
  const topRanking = ranking?.items?.slice(0, 5) || [];

  return (
    <div className="space-y-6 text-black">
      {isClosed && winner && (
        <div className="bg-yellow-400 border border-black p-6 text-center relative overflow-hidden">
          {round?.accumulated && (
            <div className="absolute top-0 right-0 bg-black text-yellow-400 text-[8px] font-black uppercase px-2 py-1 rotate-45 translate-x-4 translate-y-2 w-32 border-b border-yellow-400">
              ACUMULADA
            </div>
          )}
          <Trophy className="w-12 h-12 text-black mx-auto mb-3" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] font-black mb-2 text-black/60">VENCEDOR DA RODADA</p>
          <p className="text-3xl font-black italic uppercase tracking-tighter text-black leading-none">{winner.name}</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-[10px] font-black uppercase tracking-widest text-[#000]/80">
            <span className="bg-black text-white px-2 py-0.5 border border-black italic">#{winner.ticketCode}</span>
            <span className="w-1.5 h-1.5 bg-black rounded-full" />
            <span>{winner.points} PONTOS</span>
          </div>

          {round?.accumulated ? (
            <div className="mt-6 border-4 border-black p-4 space-y-2">
              <p className="text-xs font-black uppercase italic tracking-tighter text-black">RODADA ACUMULADA!</p>
              <p className="text-[9px] font-bold text-black/60 uppercase">O vencedor não atingiu o mínimo de 15 pontos.</p>
              <div className="bg-black text-yellow-400 py-2 text-xl font-black italic tracking-tighter uppercase">
                PRÊMIO ACUMULADO PARA A PRÓXIMA
              </div>
            </div>
          ) : (
            <div className="mt-6 bg-black text-yellow-400 py-3 text-2xl font-black italic tracking-tighter uppercase">
              {formatCurrency(round?.prizePool || 0)}
            </div>
          )}
        </div>
      )}

      <div className="brutalist-card bg-white overflow-hidden">
        <div className="p-4 bg-black flex justify-between items-center px-6">
          <h2 className="text-[10px] font-black uppercase tracking-[0.25em] text-white">Ranking da Rodada</h2>
          <Link href={`/ranking/${round?.externalRoundId || roundId}`} className="text-[10px] font-black uppercase tracking-widest text-yellow-500 hover:underline">Ver Mais</Link>
        </div>

        {topRanking.length === 0 ? (
          <div className="p-8 text-center text-gray-400 text-xs font-black uppercase tracking-widest italic">Ainda não há palpites</div>
        ) : (
          <div className="divide-y-2 divide-gray-100">
            {topRanking.map((item) => (
              <div key={item.position} className={`flex items-center gap-4 px-6 py-4 transition-colors ${item.position <= 3 ? "bg-yellow-50/50" : "hover:bg-gray-50"}`}>
                <div className="w-8 flex justify-center">
                  <span className={`text-sm font-black italic ${item.position <= 3 ? "text-yellow-600 underline decoration-2 decoration-black underline-offset-4" : "text-gray-400"}`}>
                    {item.position.toString().padStart(2, '0')}
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black uppercase italic tracking-tighter text-gray-900">{item.name}</p>
                  <p className="text-[9px] font-black text-black/40 uppercase tracking-widest mt-0.5">#{item.ticketCode}</p>
                </div>
                <div className="text-right">
                  <span className={`text-xl font-black italic tracking-tighter ${item.position === 1 ? "text-yellow-600" : "text-gray-900"}`}>
                    {item.points}
                  </span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-black/40 ml-1">PTS</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
