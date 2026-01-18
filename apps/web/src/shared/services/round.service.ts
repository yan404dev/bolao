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

  getClosedRounds: async (limit: number = 4): Promise<RoundEntity[]> => {
    const { data } = await api.get<{ data: RoundEntity[] }>("/rounds", {
      params: { status: "CLOSED", limit },
    });
    return data.data;
  },

  getUpcomingRounds: async (limit: number = 4): Promise<RoundEntity[]> => {
    const { data } = await api.get<{ data: RoundEntity[] }>("/rounds", {
      params: { status: "OPEN", limit },
    });
    return data.data;
  },

  getRanking: async (roundId: number, filters?: RankingFilters): Promise<RankingResponse> => {
    const { data } = await api.get<{ data: RankingResponse }>(`/rounds/${roundId}/ranking`, {
      params: filters,
    });
    return data.data;
  },

  calculateScores: async (roundId: number): Promise<void> => {
    await api.post(`/admin/rounds/${roundId}/calculate`);
  },

  syncAll: async (leagueId: number, season: number): Promise<RoundEntity[]> => {
    const { data } = await api.post<{ data: RoundEntity[] }>("/admin/rounds/sync", {
      leagueId,
      season,
    });
    return data.data;
  },

  getCalendar: async (leagueId: number, season: number): Promise<string[]> => {
    const { data } = await api.get<{ data: string[] }>("/admin/rounds/calendar", {
      params: { leagueId, season },
    });
    return data.data;
  },

  getLeagues: async (country: string = "Brazil"): Promise<any[]> => {
    const { data } = await api.get<{ data: any[] }>("/admin/rounds/leagues", {
      params: { country },
    });
    return data.data;
  },

  updateStatus: async (roundId: number, status: string): Promise<RoundEntity> => {
    const { data } = await api.put<{ data: RoundEntity }>(`/admin/rounds/${roundId}/status`, null, {
      params: { status },
    });
    return data.data;
  },

  batchAction: async (ids: number[], action: string): Promise<void> => {
    await api.post("/admin/rounds/batch", { ids, action });
  },

  update: async (roundId: number, data: { endDate?: string }): Promise<RoundEntity> => {
    const { data: response } = await api.patch<{ data: RoundEntity }>(`/rounds/${roundId}`, data);
    return response.data;
  },

  deleteMatch: async (matchId: number): Promise<void> => {
    await api.delete(`/matches/${matchId}`);
  },
};
