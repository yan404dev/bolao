"use client";

import { useRoundQueries } from "@/app/rodada/[id]/hooks";
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
  const winner = ranking?.[0];
  const topRanking = ranking?.slice(0, 5) || [];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "BRL",
    }).format(value / 100);
  };

  return (
    <div className="space-y-4">
      {isClosed && winner && (
        <div className="bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-200 p-5 text-center">
          <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-2" />
          <p className="text-xs text-amber-600 uppercase tracking-wider font-semibold mb-1">Winner</p>
          <p className="text-xl font-bold text-gray-900">{winner.name}</p>
          <p className="text-sm text-gray-500">#{winner.ticketCode} • {winner.points} pts</p>
          <p className="text-lg font-bold text-green-600 mt-2">{formatCurrency(round?.prizePool || 0)}</p>
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Ranking</h2>
          <Link href={`/ranking/${roundId}`} className="text-xs text-green-600 font-medium hover:underline">View full</Link>
        </div>

        {topRanking.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No bets registered</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {topRanking.map((item) => (
              <div key={item.position} className={`flex items-center gap-3 px-4 py-3 ${item.position <= 3 ? "bg-amber-50/50" : ""}`}>
                <span className="w-6 text-center">
                  {getMedal(item.position) || <span className="text-gray-400 text-sm">{item.position}</span>}
                </span>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{item.name}</p>
                  <p className="text-xs text-gray-500">#{item.ticketCode}</p>
                </div>
                <span className={`font-bold ${item.position === 1 ? "text-amber-600" : "text-gray-700"}`}>
                  {item.points}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
