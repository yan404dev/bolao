import { z } from "zod";

export const rodadaStatusSchema = z.enum(["aberta", "ao_vivo", "encerrada"]);
export type RodadaStatus = z.infer<typeof rodadaStatusSchema>;

export const jogoStatusSchema = z.enum(["a_jogar", "ao_vivo", "finalizado"]);
export type JogoStatus = z.infer<typeof jogoStatusSchema>;

export interface Rodada {
  id: number;
  titulo: string;
  status: RodadaStatus;
  dataInicio: string;
  dataFim: string;
  totalBilhetes: number;
  premiacao: string;
}

export interface Jogo {
  id: number;
  timeCasa: string;
  timeCasaImg: string;
  golsCasa: number | null;
  timeVisitante: string;
  timeVisitanteImg: string;
  golsVisitante: number | null;
  data: string;
  status: JogoStatus;
}

export interface Aposta {
  id: number;
  rodadaId: number;
  nome: string;
  telefone: string;
  bilhete: string;
  palpites: Record<number, { casa: number; visitante: number }>;
  pontos: number;
  createdAt: Date;
}

export interface RankingItem {
  posicao: number;
  nome: string;
  bilhete: string;
  pontos: number;
  acertosExatos: number;
  acertosVencedor: number;
}
