import { api } from "@/shared/lib/api";
import { RoundEntity } from "@/shared/entities";

export const closedRoundsService = {
  getAll: async (): Promise<RoundEntity[]> => {
    const { data } = await api.get<{ data: RoundEntity[] }>("/rounds", {
      params: { status: "CLOSED", limit: 4 },
    });
    return data.data;
  },
};
