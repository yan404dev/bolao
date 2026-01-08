import { useQuery } from "@tanstack/react-query";
import { rankingService } from "@/app/ranking/ranking.service";
import { bettingService } from "@/app/apostar/_components/betting-flow/betting.service";

export function useRankingTableQueries(roundId?: number) {
  const activeRoundQuery = useQuery({
    queryKey: ["activeRound"],
    queryFn: bettingService.getActiveRound,
    enabled: !roundId,
  });

  const targetRoundId = roundId || activeRoundQuery.data?.id;

  const roundDetailsQuery = useQuery({
    queryKey: ["round", targetRoundId],
    queryFn: () => rankingService.getRoundDetails(targetRoundId!),
    enabled: !!targetRoundId,
  });

  const rankingQuery = useQuery({
    queryKey: ["ranking", targetRoundId],
    queryFn: () => rankingService.getRanking(targetRoundId!),
    enabled: !!targetRoundId,
  });

  return {
    activeRound: activeRoundQuery.data,
    roundDetails: roundDetailsQuery.data,
    rankingData: rankingQuery.data,
    isLoading: activeRoundQuery.isLoading || roundDetailsQuery.isLoading || rankingQuery.isLoading,
    isLoadingActive: activeRoundQuery.isLoading,
    targetRoundId,
  };
}
