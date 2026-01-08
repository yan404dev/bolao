import { useRankingTableQueries } from "./use-ranking-table-queries";
import { RodadaInfo } from "../_components/ranking-table-round-header";
import { Apostador } from "../_components/ranking-table-row";

export function useRankingTable(roundId?: number) {
  const {
    roundDetails,
    rankingData,
    isLoading,
    isLoadingActive,
    targetRoundId
  } = useRankingTableQueries(roundId);

  const rodada: RodadaInfo | null = roundDetails ? {
    id: roundDetails.id,
    titulo: roundDetails.title,
    status: roundDetails.status === "OPEN" ? "aberta" : "encerrada",
    dataEncerramento: new Date(roundDetails.startDate).toLocaleString("pt-BR"),
  } : null;

  const rankingList: Apostador[] = (rankingData || []).map(item => ({
    posicao: item.position,
    nome: item.name,
    numeroBilhete: item.ticketCode,
    pontos: item.points,
    acertosExatos: item.exactScores,
    acertosVencedor: item.winnerScores,
  }));

  return {
    rodada,
    ranking: rankingList,
    isLoading,
    hasNoRound: !isLoadingActive && !targetRoundId
  };
}
