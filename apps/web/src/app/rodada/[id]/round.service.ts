import { api } from "@/shared/lib/api";
import { RoundEntity, RankingItemEntity, ResultEntity } from "@/shared/entities";

export const roundService = {
  getRound: async (roundId: number): Promise<RoundEntity> => {
    const { data } = await api.get<{ data: RoundEntity }>(`/rounds/${roundId}`);
    return data.data;
  },

  getRanking: async (roundId: number): Promise<ResultEntity<RankingItemEntity>> => {
    const { data } = await api.get<{ data: ResultEntity<RankingItemEntity> }>(`/rounds/${roundId}/ranking`);
    return data.data;
  },
};
