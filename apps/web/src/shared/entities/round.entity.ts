import { MatchEntity } from "./match.entity";

export type RoundStatus = "OPEN" | "LIVE" | "CLOSED" | "CALCULATED" | "CANCELLED" | "SCHEDULED";

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
  accumulated: boolean;
  totalTickets: number;
  prizePool: number | null;
  ticketPrice: number | null;
  matches: MatchEntity[];
  createdAt: string;
}
