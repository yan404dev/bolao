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

export interface JogoResultado {
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

export interface RankingItem {
  posicao: number;
  nome: string;
  bilhete: string;
  pontos: number;
}

export interface Vencedor {
  nome: string;
  bilhete: string;
  pontos: number;
  premio: string;
}

export const MOCK_RODADA: Rodada = {
  id: 175,
  titulo: "Brasileirão Série A - Rodada 38",
  status: "encerrada",
  dataInicio: "01/01/2026",
  dataFim: "05/01/2026",
  totalBilhetes: 127,
  premiacao: "R$ 1.270,00",
};

export const MOCK_JOGOS: JogoResultado[] = [
  { id: 1, timeCasa: "Corinthians", timeCasaImg: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png", golsCasa: 2, timeVisitante: "Palmeiras", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/pt/0/02/Escudo_Sociedade_Esportiva_Palmeiras.png", golsVisitante: 1, data: "01/01 16:00", status: "finalizado" },
  { id: 2, timeCasa: "Flamengo", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_braz_logo.svg", golsCasa: 3, timeVisitante: "Vasco", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png", golsVisitante: 0, data: "01/01 18:30", status: "finalizado" },
  { id: 3, timeCasa: "São Paulo", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg", golsCasa: 1, timeVisitante: "Santos", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png", golsVisitante: 1, data: "02/01 16:00", status: "finalizado" },
  { id: 4, timeCasa: "Grêmio", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Gremio_Logo.svg", golsCasa: 0, timeVisitante: "Internacional", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Internacional.svg", golsVisitante: 2, data: "02/01 18:30", status: "finalizado" },
  { id: 5, timeCasa: "Atlético-MG", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/2/27/Clube_Atl%C3%A9tico_Mineiro_logo.svg", golsCasa: 4, timeVisitante: "Cruzeiro", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_Cruzeiro_1921.png", golsVisitante: 2, data: "03/01 16:00", status: "finalizado" },
];

export const MOCK_RANKING: RankingItem[] = [
  { posicao: 1, nome: "João Silva", bilhete: "175-001", pontos: 24 },
  { posicao: 2, nome: "Maria Santos", bilhete: "175-015", pontos: 22 },
  { posicao: 3, nome: "Pedro Oliveira", bilhete: "175-023", pontos: 21 },
  { posicao: 4, nome: "Ana Costa", bilhete: "175-034", pontos: 19 },
  { posicao: 5, nome: "Carlos Lima", bilhete: "175-042", pontos: 18 },
];

export const MOCK_VENCEDOR: Vencedor = {
  nome: "João Silva",
  bilhete: "175-001",
  pontos: 24,
  premio: "R$ 1.270,00",
};
