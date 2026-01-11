export interface PredictionEntity {
  matchId: number;
  homeScore: number;
  awayScore: number;
}

export interface BetEntity {
  id: number;
  roundId: number;
  ticketCode: string | null;
  name: string;
  phone: string;
  predictions: Record<number, PredictionEntity>;
  points: number;
  createdAt: string;
}

export interface CreateBetResponse {
  bet: BetEntity;
  payment: {
    pixCopyPaste: string;
    pixQrCodeBase64: string;
    amount: number;
    expiration: string;
  };
}
