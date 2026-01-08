import { useQuery } from "@tanstack/react-query";
import { rankingService } from "../../ranking.service";
import { bettingService } from "../../../apostar/_components/betting-flow/betting.service";

export function useRankingTableQueries(roundId?: number) {
  // 1. Get Active Round if roundId is not provided
  const activeRoundQuery = useQuery({
    queryKey: ["activeRound"],
    queryFn: bettingService.getActiveRound,
    enabled: !roundId,
  });

  const targetRoundId = roundId || activeRoundQuery.data?.id;

  // 2. Get Round Details
  const roundDetailsQuery = useQuery({
    queryKey: ["round", targetRoundId],
    queryFn: () => rankingService.getRoundDetails(targetRoundId!),
    enabled: !!targetRoundId,
  });

  // 3. Get Ranking
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
