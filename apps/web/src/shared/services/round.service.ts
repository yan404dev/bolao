import { api } from "@/shared/lib/api";
import { RoundEntity, RankingItemEntity } from "@/shared/entities";
import { RoundFilters, RankingFilters } from "@/shared/schemas";

export interface RankingResponse {
  items: RankingItemEntity[];
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export const roundService = {
  getAll: async (filters?: RoundFilters): Promise<RoundEntity[]> => {
    const { data } = await api.get<{ data: RoundEntity[] }>("/rounds", {
      params: filters,
    });
    return data.data;
  },

  getById: async (roundId: number): Promise<RoundEntity> => {
    const { data } = await api.get<{ data: RoundEntity }>(`/rounds/${roundId}`);
    return data.data;
  },

  getActiveRound: async (): Promise<RoundEntity | null> => {
    const rounds = await roundService.getAll({ status: "OPEN" });
    return rounds.length > 0 ? rounds[0] : null;
  },

  getRanking: async (roundId: number, filters?: RankingFilters): Promise<RankingResponse> => {
    const { data } = await api.get<{ data: RankingResponse }>(`/rounds/${roundId}/ranking`, {
      params: filters,
    });
    return data.data;
  },

  calculateScores: async (roundId: number): Promise<void> => {
    await api.post(`/rounds/${roundId}/calculate`);
  },

  syncAll: async (): Promise<RoundEntity[]> => {
    const { data } = await api.post<{ data: RoundEntity[] }>("/rounds/sync");
    return data.data;
  },

  getCalendar: async (): Promise<string[]> => {
    const { data } = await api.get<{ data: string[] }>("/rounds/calendar");
    return data.data;
  },
};
