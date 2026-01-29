import { useRankingTableQueries, RankingTableFilterParams } from "@/app/ranking/_components/ranking-table/hooks/use-ranking-table-queries";
import { RoundInfo } from "@/app/ranking/_components/ranking-table/_components/ranking-table-round-header";
import { RankingItemEntity, ResultEntity } from "@/shared/entities";
import dayjs from "dayjs";

export function useRankingTable(roundId?: number, filters?: RankingTableFilterParams) {
  const {
    roundDetails,
    rankingData,
    isLoading,
    isFetchingRanking,
    isLoadingActive,
    targetRoundId
  } = useRankingTableQueries(roundId, filters);

  const round: RoundInfo | null = roundDetails ? {
    id: roundDetails.id,
    title: roundDetails.title,
    status: (roundDetails.status === "OPEN" || roundDetails.status === "LIVE") ? "open" : "closed",
    startTime: dayjs(roundDetails.startDate).format("DD/MM/YYYY [às] HH:mm"),
  } : null;

  const rankingResults: ResultEntity<RankingItemEntity> = rankingData || {
    items: [],
    totalItems: 0,
    totalPages: 0,
    currentPage: 0
  };

  return {
    round,
    ranking: rankingResults.items,
    pagination: {
      totalItems: rankingResults.totalItems,
      totalPages: rankingResults.totalPages,
      currentPage: rankingResults.currentPage
    },
    isLoading,
    isFetchingRanking,
    hasNoRound: !isLoadingActive && !targetRoundId
  };
}
