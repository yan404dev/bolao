import { RodadaEncerrada } from "./rodadas-encerradas.types";

export function useRodadasEncerradasModel() {
  const rodadas: RodadaEncerrada[] = [
    {
      id: 175,
      titulo: "Brasileirão Série A - Rodada 37",
      data: "28/12/2025",
      bilhetes: 98,
      vencedor: "João Silva",
      premio: "R$ 490,00",
    },
    {
      id: 174,
      titulo: "Brasileirão Série A - Rodada 36",
      data: "21/12/2025",
      bilhetes: 112,
      vencedor: "Maria Santos",
      premio: "R$ 560,00",
    },
    {
      id: 173,
      titulo: "Champions League - Fase de Grupos",
      data: "18/12/2025",
      bilhetes: 145,
      vencedor: "Pedro Oliveira",
      premio: "R$ 725,00",
    },
    {
      id: 172,
      titulo: "Libertadores - Oitavas",
      data: "14/12/2025",
      bilhetes: 89,
      vencedor: "Ana Costa",
      premio: "R$ 445,00",
    },
    {
      id: 171,
      titulo: "Brasileirão Série A - Rodada 35",
      data: "10/12/2025",
      bilhetes: 134,
      vencedor: "Carlos Lima",
      premio: "R$ 670,00",
    },
  ];

  return { rodadas };
}
