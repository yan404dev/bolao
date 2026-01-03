import { Apostador, RodadaInfo } from "./ranking-table.types";

export function useRankingTableModel() {
  const rodada: RodadaInfo = {
    id: 175,
    titulo: "Brasileirão Série A - Rodada 38",
    status: "aberta",
    dataEncerramento: "05/01/2026 às 18:00",
  };

  const ranking: Apostador[] = [
    { id: 1, posicao: 1, nome: "João Silva", numeroBilhete: "175-001", pontos: 24, acertosExatos: 6, acertosVencedor: 6 },
    { id: 2, posicao: 2, nome: "Maria Santos", numeroBilhete: "175-015", pontos: 22, acertosExatos: 5, acertosVencedor: 7 },
    { id: 3, posicao: 3, nome: "Pedro Oliveira", numeroBilhete: "175-023", pontos: 21, acertosExatos: 5, acertosVencedor: 6 },
    { id: 4, posicao: 4, nome: "Ana Costa", numeroBilhete: "175-034", pontos: 19, acertosExatos: 4, acertosVencedor: 7 },
    { id: 5, posicao: 5, nome: "Carlos Lima", numeroBilhete: "175-042", pontos: 18, acertosExatos: 4, acertosVencedor: 6 },
    { id: 6, posicao: 6, nome: "Fernanda Souza", numeroBilhete: "175-056", pontos: 17, acertosExatos: 4, acertosVencedor: 5 },
    { id: 7, posicao: 7, nome: "Lucas Pereira", numeroBilhete: "175-067", pontos: 16, acertosExatos: 3, acertosVencedor: 7 },
    { id: 8, posicao: 8, nome: "Juliana Alves", numeroBilhete: "175-078", pontos: 15, acertosExatos: 3, acertosVencedor: 6 },
    { id: 9, posicao: 9, nome: "Roberto Dias", numeroBilhete: "175-089", pontos: 14, acertosExatos: 3, acertosVencedor: 5 },
    { id: 10, posicao: 10, nome: "Patrícia Mendes", numeroBilhete: "175-095", pontos: 13, acertosExatos: 2, acertosVencedor: 7 },
  ];

  return { rodada, ranking };
}
