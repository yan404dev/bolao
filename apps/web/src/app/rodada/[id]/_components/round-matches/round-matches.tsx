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
          <div key={i} className="bg-white rounded-xl border border-gray-200 p-4 h-24 animate-pulse" />
        ))}
      </div>
    );
  }

  const matches = round?.matches || [];

  if (matches.length === 0) {
    return (
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Matches</h2>
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center text-gray-500">
          No matches available
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
    if (match.status === "FINISHED") return `Finished • ${dayjs(match.kickoffTime).format("DD/MM HH:mm")}`;
    if (match.status === "LIVE") return "🔴 Live";
    return dayjs(match.kickoffTime).format("DD/MM HH:mm");
  };

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Matches</h2>
      {matches.map((match) => (
        <div key={match.id} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex flex-col items-center gap-1">
              <img
                src={match.homeTeamLogo || "/placeholder-team.png"}
                alt={match.homeTeam}
                className="w-10 h-10 object-contain"
              />
              <span className="text-xs font-medium text-gray-700 text-center">{match.homeTeam}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className={`w-8 h-10 flex items-center justify-center text-xl font-bold rounded-lg ${match.status === "FINISHED" ? "bg-gray-100" : "bg-gray-50"}`}>
                {match.homeScore ?? "-"}
              </span>
              <span className="text-gray-300 text-xs">x</span>
              <span className={`w-8 h-10 flex items-center justify-center text-xl font-bold rounded-lg ${match.status === "FINISHED" ? "bg-gray-100" : "bg-gray-50"}`}>
                {match.awayScore ?? "-"}
              </span>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <img
                src={match.awayTeamLogo || "/placeholder-team.png"}
                alt={match.awayTeam}
                className="w-10 h-10 object-contain"
              />
              <span className="text-xs font-medium text-gray-700 text-center">{match.awayTeam}</span>
            </div>
          </div>
          <p className={`text-center text-[10px] mt-2 ${getStatusStyle(match)}`}>
            {getStatusLabel(match)}
          </p>
        </div>
      ))}
    </div>
  );
}
