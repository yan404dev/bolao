import { MatchEntity } from "./match.entity";

export type RoundStatus = "OPEN" | "LIVE" | "CLOSED" | "CALCULATED" | "CANCELLED";

export interface MatchGroup {
  date: string;
  formattedDate: string;
  matches: MatchEntity[];
}

export interface RoundEntity {
  id: number;
  title: string;
  externalRoundId: string;
  externalLeagueId: number;
  externalSeason: number;
  championshipTitle: string;
  championshipLogo: string | null;
  status: RoundStatus;
  startDate: string;
  endDate: string | null;
  totalTickets: number;
  prizePool: number | null;
  ticketPrice: number | null;
  matches: MatchEntity[];
  groupedMatches: MatchGroup[];
  createdAt: string;
}
