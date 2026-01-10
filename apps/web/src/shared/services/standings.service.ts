import { api } from "@/shared/lib/api";
import { StandingEntity } from "@/shared/entities";

export const standingsService = {
  getAll: async (): Promise<StandingEntity[]> => {
    const { data } = await api.get<{ data: StandingEntity[] }>("/standings");
    return data.data;
  },
};
