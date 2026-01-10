import { useQuery } from "@tanstack/react-query";
import { rankingService } from "@/app/ranking/ranking.service";
import { roundService } from "@/shared/services";

export function useRankingKpisQueries(roundId?: number) {
  const { data: activeRound } = useQuery({
    queryKey: ["activeRound"],
    queryFn: () => roundService.getActiveRound(),
    enabled: !roundId,
  });

  const targetRoundId = roundId || activeRound?.id;

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
    roundDetails: roundDetailsQuery.data,
    rankingData: rankingQuery.data,
    isLoading: !roundDetailsQuery.data && !!targetRoundId,
    targetRoundId,
  };
}
