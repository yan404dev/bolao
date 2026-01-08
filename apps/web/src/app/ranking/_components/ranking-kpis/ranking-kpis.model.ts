import { useQuery } from "@tanstack/react-query";
import { rankingService } from "../../ranking.service";
import { bettingService } from "../../../apostar/_components/betting-flow/betting.service";
import { KpiItem } from "./ranking-kpis.types";

export function useRankingKpisModel(roundId?: number) {
  const { data: activeRound } = useQuery({
    queryKey: ["activeRound"],
    queryFn: bettingService.getActiveRound,
    enabled: !roundId,
  });

  const targetRoundId = roundId || activeRound?.id;

  const { data: roundDetails } = useQuery({
    queryKey: ["round", targetRoundId],
    queryFn: () => rankingService.getRoundDetails(targetRoundId!),
    enabled: !!targetRoundId,
  });

  const { data: rankingData } = useQuery({
    queryKey: ["ranking", targetRoundId],
    queryFn: () => rankingService.getRanking(targetRoundId!),
    enabled: !!targetRoundId,
  });

  const kpis: KpiItem[] = roundDetails ? [
    { label: "Bilhetes", value: String(roundDetails.totalTickets || 0), icon: "🎫" },
    { label: "Premiação", value: `R$ ${roundDetails.prizePool?.toLocaleString("pt-BR") || 0}`, icon: "💰" },
    { label: "Participantes", value: String(rankingData?.length || 0), icon: "👥" },
    { label: "Jogos", value: String(roundDetails.matches?.length || 0), icon: "⚽" },
  ] : [];

  return { kpis, isLoading: !roundDetails && !!targetRoundId };
}
