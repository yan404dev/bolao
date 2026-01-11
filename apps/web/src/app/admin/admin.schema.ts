import { z } from "zod";

export const adminLoginSchema = z.object({
  password: z.string().min(1, "Senha é obrigatória"),
});

export const syncChampionshipSchema = z.object({
  leagueId: z.number({ message: "Liga é obrigatória" }),
  season: z.number({ message: "Ano é obrigatório" }),
});

export type AdminLoginForm = z.infer<typeof adminLoginSchema>;
export type SyncChampionshipForm = z.infer<typeof syncChampionshipSchema>;
