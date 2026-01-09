import { RoundEntity, RankingItemEntity, ResultEntity } from "@/shared/entities";
import { api } from "@/shared/lib/api";

export const rankingService = {
  getRanking: async (
    roundId: number,
    params?: { search?: string; minPoints?: number; page?: number; size?: number }
  ): Promise<ResultEntity<RankingItemEntity>> => {
    const { data } = await api.get<{ data: ResultEntity<RankingItemEntity> }>(`/rounds/${roundId}/ranking`, {
      params
    });
    return data.data;
  },

  getRoundDetails: async (roundId: number): Promise<RoundEntity> => {
    const { data } = await api.get<{ data: RoundEntity }>(`/rounds/${roundId}`);
    return data.data;
  }
};
