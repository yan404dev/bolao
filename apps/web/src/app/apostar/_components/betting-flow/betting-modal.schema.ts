import { z } from "zod";

export const palpiteSchema = z.object({
  casa: z.string().min(1),
  visitante: z.string().min(1),
});

export const bettingFormSchema = z.object({
  nome: z.string().min(3, "Nome obrigatório"),
  telefone: z.string().min(9, "Telefone inválido"),
  palpites: z.record(z.string(), palpiteSchema),
});

export type BettingFormData = z.infer<typeof bettingFormSchema>;
