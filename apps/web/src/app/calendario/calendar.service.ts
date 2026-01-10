import { RoundEntity } from "@/shared/entities";
import { api } from "@/shared/lib/api";


export const calendarService = {
  getCalendar: async (): Promise<RoundEntity[]> => {
    const { data } = await api.get<{ data: RoundEntity[] }>("/rounds");
    return data.data;
  },
};
