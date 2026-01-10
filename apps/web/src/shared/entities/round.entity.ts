import { MatchEntity } from "./match.entity";

export type RoundStatus = "OPEN" | "LIVE" | "CLOSED" | "CANCELLED";

export interface RoundEntity {
  id: number;
  title: string;
  externalRoundId: string;
  championshipTitle?: string;
  championshipLogo?: string;
  status: RoundStatus;
  startDate: string;
  endDate: string | null;
  totalTickets: number;
  prizePool: number;
  matches: MatchEntity[];
  createdAt: string;
}
