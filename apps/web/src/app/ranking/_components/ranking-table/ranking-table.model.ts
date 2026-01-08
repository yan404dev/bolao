import { useQuery } from "@tanstack/react-query";
import { rankingService } from "../../ranking.service";
import { bettingService } from "../../../apostar/_components/betting-flow/betting.service";
import { Apostador, RodadaInfo } from "./ranking-table.types";

export function useRankingTableModel(roundId?: number) {
  // 1. Get Active Round if roundId is not provided
  const { data: activeRound, isLoading: isLoadingActive } = useQuery({
    queryKey: ["activeRound"],
    queryFn: bettingService.getActiveRound,
    enabled: !roundId,
  });

  const targetRoundId = roundId || activeRound?.id;

  // 2. Get Round Details
  const { data: roundDetails, isLoading: isLoadingRound } = useQuery({
    queryKey: ["round", targetRoundId],
    queryFn: () => rankingService.getRoundDetails(targetRoundId!),
    enabled: !!targetRoundId,
  });

  // 3. Get Ranking
  const { data: rankingData, isLoading: isLoadingRanking } = useQuery({
    queryKey: ["ranking", targetRoundId],
    queryFn: () => rankingService.getRanking(targetRoundId!),
    enabled: !!targetRoundId,
  });

  const rodada: RodadaInfo | null = roundDetails ? {
    id: roundDetails.id,
    titulo: roundDetails.title,
    status: roundDetails.status === "OPEN" ? "aberta" : "encerrada",
    dataEncerramento: new Date(roundDetails.startDate).toLocaleString("pt-BR"),
  } : null;

  const rankingList: Apostador[] = (rankingData || []).map(item => ({
    id: item.position, // position as id is fine for mapping
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
    isLoading: isLoadingActive || isLoadingRound || isLoadingRanking,
    hasNoRound: !isLoadingActive && !targetRoundId
  };
}
