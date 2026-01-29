"use client";

import { useRoundQueries } from "@/app/rodada/[id]/hooks";
import { MatchEntity } from "@/shared/entities";
import { getMatchStatusBadgeStyle, getScoreBoxStyle, formatMatchStatusLabel } from "@/shared/utils";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

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
        <h2 className="brutalist-subtitle">PARTIDAS</h2>
        <div className="bg-white border border-black p-8 text-center text-gray-400 font-bold uppercase tracking-widest text-xs">
          SEM PARTIDAS DISPONÍVEIS
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}

interface MatchCardProps {
  match: MatchEntity;
}

function MatchCard({ match }: MatchCardProps) {
  const scoreBoxStyle = getScoreBoxStyle(match.status);
  const statusBadgeStyle = getMatchStatusBadgeStyle(match.status);

  return (
    <div className="brutalist-card p-4 sm:p-6 bg-white hover:border-yellow-400 overflow-hidden">
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <TeamDisplay
          name={match.homeTeam}
          logo={match.homeTeamLogo}
        />

        <div className="flex flex-col items-center gap-2 sm:gap-3 shrink-0 py-2">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className={`brutalist-score-box w-10 h-12 text-xl sm:w-14 sm:h-16 text-black sm:text-2xl ${scoreBoxStyle}`}>
              {match.homeScore ?? "-"}
            </span>
            <span className="text-gray-900 font-black italic text-xs sm:text-base">X</span>
            <span className={`brutalist-score-box w-10 h-12 text-xl sm:w-14 sm:h-16 text-black sm:text-2xl ${scoreBoxStyle}`}>
              {match.awayScore ?? "-"}
            </span>
          </div>
          {formatMatchStatusLabel(match) && (
            <div className={`brutalist-badge-xs sm:brutalist-badge-sm ${statusBadgeStyle}`}>
              {formatMatchStatusLabel(match)}
            </div>
          )}
        </div>

        <TeamDisplay
          name={match.awayTeam}
          logo={match.awayTeamLogo}
        />
      </div>
    </div>
  );
}

interface TeamDisplayProps {
  name: string;
  logo?: string | null;
}

function TeamDisplay({ name, logo }: TeamDisplayProps) {
  return (
    <div className="flex-1 flex flex-col items-center gap-1 sm:gap-2 min-w-0">
      <div className="brutalist-team-logo w-10 h-10 sm:w-16 sm:h-16 shrink-0">
        <img
          src={logo || "/placeholder-team.png"}
          alt={name}
          className="w-8 h-8 sm:w-12 sm:h-12 object-contain"
        />
      </div>
      <span className="text-[10px] sm:text-xs font-black uppercase italic tracking-tighter text-gray-900 text-center leading-tight h-6 sm:h-8 flex items-center px-1 truncate w-full justify-center">
        {name}
      </span>
    </div>
  );
}
