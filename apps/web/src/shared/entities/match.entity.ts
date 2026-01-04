export type MatchStatus = "SCHEDULED" | "LIVE" | "FINISHED";

export interface MatchEntity {
  id: number;
  roundId: number;
  homeTeam: string;
  homeTeamLogo: string | null;
  homeScore: number | null;
  awayTeam: string;
  awayTeamLogo: string | null;
  awayScore: number | null;
  kickoffTime: string;
  status: MatchStatus;
}
