import { api } from "@/shared/lib/api";

export const calendarService = {
  getCalendar: async (): Promise<string[]> => {
    const { data } = await api.get<{ data: string[] }>("/rounds/calendar");
    return data.data;
  },
};
