import { useQuery } from "@tanstack/react-query";
import { roundService } from "@/app/rodada/[id]/round.service";

export function useRoundQueries(roundId: number) {
  const roundQuery = useQuery({
    queryKey: ["round", roundId],
    queryFn: () => roundService.getRound(roundId),
    enabled: !!roundId,
  });

  const rankingQuery = useQuery({
    queryKey: ["ranking", roundId],
    queryFn: () => roundService.getRanking(roundId),
    enabled: !!roundId,
  });

  return {
    round: roundQuery.data,
    ranking: rankingQuery.data,
    isLoading: roundQuery.isLoading,
    isLoadingRanking: rankingQuery.isLoading,
  };
}
