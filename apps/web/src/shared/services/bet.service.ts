import { api } from "@/shared/lib/api";
import { BetEntity, CreateBetResponse } from "@/shared/entities";
import { CreateBetPayload } from "@/shared/schemas";

export const betService = {
  create: async (payload: CreateBetPayload): Promise<CreateBetResponse> => {
    const { data } = await api.post<{ data: CreateBetResponse }>("/bets", payload);
    return data.data;
  },

  getByTicketCode: async (ticketCode: string): Promise<BetEntity | null> => {
    try {
      const { data } = await api.get<{ data: BetEntity }>(`/bets/${ticketCode}`);
      return data.data;
    } catch {
      return null;
    }
  },
};
