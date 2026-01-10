"use client";

import { useRoundQueries } from "@/app/rodada/[id]/hooks";
import { MatchEntity } from "@/shared/entities";
import { getMatchStatusBadgeStyle, getScoreBoxStyle, formatMatchStatusLabel } from "@/shared/utils";

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
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 bg-yellow-400" />
        <h2 className="brutalist-section-header text-gray-900">Partidas</h2>
      </div>
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
    <div className="brutalist-card p-6 bg-white hover:border-yellow-400">
      <div className="flex items-center justify-between gap-4">
        {/* Time da Casa */}
        <TeamDisplay
          name={match.homeTeam}
          logo={match.homeTeamLogo}
        />

        {/* Placar */}
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-3">
            <span className={`brutalist-score-box ${scoreBoxStyle}`}>
              {match.homeScore ?? "-"}
            </span>
            <span className="text-gray-900 font-black italic">X</span>
            <span className={`brutalist-score-box ${scoreBoxStyle}`}>
              {match.awayScore ?? "-"}
            </span>
          </div>
          <div className={`brutalist-badge-sm ${statusBadgeStyle}`}>
            {formatMatchStatusLabel(match)}
          </div>
        </div>

        {/* Time Visitante */}
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
    <div className="flex-1 flex flex-col items-center gap-2">
      <div className="brutalist-team-logo">
        <img
          src={logo || "/placeholder-team.png"}
          alt={name}
          className="w-12 h-12 object-contain"
        />
      </div>
      <span className="brutalist-subtitle text-gray-900 text-center leading-tight h-8 flex items-center">
        {name}
      </span>
    </div>
  );
}
