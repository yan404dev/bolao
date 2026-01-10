"use client";

import { useRoundQueries } from "@/app/rodada/[id]/hooks";
import { MatchEntity } from "@/shared/entities";
import dayjs from "dayjs";

interface RoundMatchesProps {
  roundId: number;
}

export function RoundMatches({ roundId }: RoundMatchesProps) {
  const { round, isLoading } = useRoundQueries(roundId);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="h-5 bg-gray-200 rounded w-16 mb-4" />
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white border border-black p-4 h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  const matches = round?.matches || [];

  if (matches.length === 0) {
    return (
      <div className="space-y-3">
        <h2 className="text-sm font-black uppercase tracking-widest text-gray-400">PARTIDAS</h2>
        <div className="bg-white border border-black p-8 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
          SEM PARTIDAS DISPONÍVEIS
        </div>
      </div>
    );
  }

  const getStatusStyle = (match: MatchEntity) => {
    if (match.status === "FINISHED") return "text-gray-500";
    if (match.status === "LIVE") return "text-red-600";
    return "text-blue-600";
  };

  const getStatusLabel = (match: MatchEntity) => {
    if (match.status === "FINISHED") return `ENCERRADO • ${dayjs(match.kickoffTime).format("DD/MM HH:mm")}`;
    if (match.status === "LIVE") return "🔴 AO VIVO";
    return dayjs(match.kickoffTime).format("DD/MM HH:mm");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 bg-yellow-400" />
        <h2 className="text-lg font-black uppercase italic tracking-tighter text-gray-900">Partidas</h2>
      </div>
      <div className="grid gap-4">
        {matches.map((match) => (
          <div key={match.id} className="brutalist-card p-6 bg-white hover:border-yellow-400">
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="p-2 bg-gray-50 border border-black">
                  <img
                    src={match.homeTeamLogo || "/placeholder-team.png"}
                    alt={match.homeTeam}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 text-center leading-tight h-8 flex items-center">{match.homeTeam}</span>
              </div>

              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-3">
                  <span className={`w-12 h-14 flex items-center justify-center text-3xl font-black border border-black ${match.status === "FINISHED" ? "bg-gray-900 text-white" : "bg-yellow-400 text-black"}`}>
                    {match.homeScore ?? "-"}
                  </span>
                  <span className="text-gray-900 font-black italic">X</span>
                  <span className={`w-12 h-14 flex items-center justify-center text-3xl font-black border border-black ${match.status === "FINISHED" ? "bg-gray-900 text-white" : "bg-yellow-400 text-black"}`}>
                    {match.awayScore ?? "-"}
                  </span>
                </div>
                <div className={`px-3 py-0.5 text-[8px] font-black uppercase tracking-[0.2em] border border-black ${match.status === "LIVE" ? "bg-red-600 text-white animate-pulse" : "bg-white text-black"}`}>
                  {getStatusLabel(match)}
                </div>
              </div>

              <div className="flex-1 flex flex-col items-center gap-2">
                <div className="p-2 bg-gray-50 border border-black">
                  <img
                    src={match.awayTeamLogo || "/placeholder-team.png"}
                    alt={match.awayTeam}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-900 text-center leading-tight h-8 flex items-center">{match.awayTeam}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
