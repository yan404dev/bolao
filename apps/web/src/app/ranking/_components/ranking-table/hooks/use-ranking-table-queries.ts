import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { rankingService } from "@/app/ranking/ranking.service";
import { roundService } from "@/shared/services";

export interface RankingTableFilterParams {
  search?: string;
  minPoints?: number;
  page?: number;
  size?: number;
}

export function useRankingTableQueries(roundId?: number, filters?: RankingTableFilterParams) {
  const activeRoundQuery = useQuery({
    queryKey: ["activeRound"],
    queryFn: () => roundService.getActiveRound(),
    enabled: !roundId,
  });

  const targetRoundId = roundId || activeRoundQuery.data?.id;

  const roundDetailsQuery = useQuery({
    queryKey: ["round", targetRoundId],
    queryFn: () => rankingService.getRoundDetails(targetRoundId!),
    enabled: !!targetRoundId,
  });

  const rankingQuery = useQuery({
    queryKey: ["ranking", targetRoundId, filters],
    queryFn: () => rankingService.getRanking(targetRoundId!, filters),
    enabled: !!targetRoundId,
    placeholderData: keepPreviousData,
  });

  return {
    activeRound: activeRoundQuery.data,
    roundDetails: roundDetailsQuery.data,
    rankingData: rankingQuery.data,
    isLoading: activeRoundQuery.isLoading || roundDetailsQuery.isLoading || rankingQuery.isLoading,
    isFetchingRanking: rankingQuery.isFetching,
    isLoadingActive: activeRoundQuery.isLoading,
    targetRoundId,
  };
}
