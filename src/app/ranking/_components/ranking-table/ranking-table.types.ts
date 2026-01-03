export interface Apostador {
  id: number;
  posicao: number;
  nome: string;
  numeroBilhete: string;
  pontos: number;
  acertosExatos: number;
  acertosVencedor: number;
}

export interface RodadaInfo {
  id: number;
  titulo: string;
  status: "aberta" | "encerrada";
  dataEncerramento: string;
}
