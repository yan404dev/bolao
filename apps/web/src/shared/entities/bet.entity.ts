export interface PredictionEntity {
  matchId: number;
  homeScore: number;
  awayScore: number;
}

export interface BetEntity {
  id: number;
  roundId: number;
  ticketCode: string;
  name: string;
  phone: string;
  predictions: Record<number, PredictionEntity>;
  points: number;
  createdAt: string;
}
