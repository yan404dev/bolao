import { z } from "zod";

export const palpiteSchema = z.object({
  casa: z.string().min(1),
  visitante: z.string().min(1),
});

export const apostaFormSchema = z.object({
  nome: z.string().min(3, "Nome obrigatório"),
  telefone: z.string().min(9, "Telefone inválido"),
  palpites: z.record(z.string(), palpiteSchema),
});

export type ApostaFormData = z.infer<typeof apostaFormSchema>;

export interface Jogo {
  id: number;
  timeCasa: string;
  timeCasaImg: string;
  timeVisitante: string;
  timeVisitanteImg: string;
}

export const JOGOS: Jogo[] = [
  { id: 1, timeCasa: "Corinthians", timeCasaImg: "https://upload.wikimedia.org/wikipedia/pt/b/b4/Corinthians_simbolo.png", timeVisitante: "Palmeiras", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/pt/0/02/Escudo_Sociedade_Esportiva_Palmeiras.png" },
  { id: 2, timeCasa: "Flamengo", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Flamengo_braz_logo.svg", timeVisitante: "Vasco", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/pt/a/ac/CRVascodaGama.png" },
  { id: 3, timeCasa: "São Paulo", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Brasao_do_Sao_Paulo_Futebol_Clube.svg", timeVisitante: "Santos", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/commons/1/15/Santos_Logo.png" },
  { id: 4, timeCasa: "Grêmio", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Gremio_Logo.svg", timeVisitante: "Internacional", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Escudo_do_Internacional.svg" },
  { id: 5, timeCasa: "Atlético-MG", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/2/27/Clube_Atl%C3%A9tico_Mineiro_logo.svg", timeVisitante: "Cruzeiro", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Logo_Cruzeiro_1921.png" },
  { id: 6, timeCasa: "Fluminense", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Fluminense_FC_escudo.png", timeVisitante: "Botafogo", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Botafogo_de_Futebol_e_Regatas_logo.svg" },
  { id: 7, timeCasa: "Bahia", timeCasaImg: "https://upload.wikimedia.org/wikipedia/pt/2/2c/Esporte_Clube_Bahia_logo.png", timeVisitante: "Vitória", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/pt/8/80/Esporte_Clube_Vit%C3%B3ria_logo.png" },
  { id: 8, timeCasa: "Athletico-PR", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/b/b3/CA_Athletico_Paranaense_2019_01.png", timeVisitante: "Coritiba", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Coritiba_FBC_2024.svg" },
  { id: 9, timeCasa: "Fortaleza", timeCasaImg: "https://upload.wikimedia.org/wikipedia/commons/4/42/Fortaleza_Esporte_Clube_logo.svg", timeVisitante: "Ceará", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/commons/0/03/Ceara_Sporting_Club_logo.svg" },
  { id: 10, timeCasa: "Sport", timeCasaImg: "https://upload.wikimedia.org/wikipedia/pt/1/17/Sport_Club_do_Recife.png", timeVisitante: "Náutico", timeVisitanteImg: "https://upload.wikimedia.org/wikipedia/commons/6/69/Clube_N%C3%A1utico_Capibaribe.svg" },
];
