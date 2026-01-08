import { api } from "@/shared/lib/api";
import { RoundEntity, BetEntity } from "@/shared/entities";
import { BettingFormData } from "./betting-modal.schema";

export interface CreateBetPayload {
  roundId: number;
  name: string;
  phone: string;
  predictions: {
    matchId: number;
    homeScore: number;
    awayScore: number;
  }[];
}

export const bettingService = {
  getActiveRound: async (): Promise<RoundEntity | null> => {
    const { data } = await api.get<{ data: RoundEntity[] }>("/rounds", {
      params: { status: "OPEN" },
    });
    const rounds = data.data;
    if (rounds.length === 0) return null;
    return rounds[0];
  },

  createBet: async (payload: CreateBetPayload): Promise<BetEntity> => {
    const { data } = await api.post<{ data: BetEntity }>("/bets", payload);
    return data.data;
  },
};
