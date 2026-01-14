import { api } from "@/shared/lib/api";
import { BetEntity, CreateBetResponse } from "@/shared/entities";
import { CreateBetPayload } from "@/shared/schemas";

export const betService = {
  create: async (payload: CreateBetPayload): Promise<CreateBetResponse> => {
    const { data } = await api.post<{ data: CreateBetResponse }>("/bets", payload);
    return data.data;
  },

  getById: async (id: number): Promise<BetEntity> => {
    const { data } = await api.get<{ data: BetEntity }>(`/bets/${id}`);
    return data.data;
  },

  getByTicketCode: async (ticketCode: string): Promise<BetEntity> => {
    const { data } = await api.get<{ data: BetEntity }>(`/bets/code/${ticketCode}`);
    return data.data;
  },
};
