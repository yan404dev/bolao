import { api } from "@/shared/lib/api";
import { RoundEntity, RankingItemEntity } from "@/shared/entities";

export const rankingService = {
  getRanking: async (roundId: number): Promise<RankingItemEntity[]> => {
    const { data } = await api.get<{ data: RankingItemEntity[] }>(`/rounds/${roundId}/ranking`);
    return data.data;
  },

  getRoundDetails: async (roundId: number): Promise<RoundEntity> => {
    const { data } = await api.get<{ data: RoundEntity }>(`/rounds/${roundId}`);
    return data.data;
  }
};
