import { useRankingTableQueries } from "@/app/ranking/_components/ranking-table/hooks/use-ranking-table-queries";
import { RoundInfo } from "@/app/ranking/_components/ranking-table/_components/ranking-table-round-header";
import { Bettor } from "@/app/ranking/_components/ranking-table/_components/ranking-table-row";
import dayjs from "dayjs";

export function useRankingTable(roundId?: number) {
  const {
    roundDetails,
    rankingData,
    isLoading,
    isLoadingActive,
    targetRoundId
  } = useRankingTableQueries(roundId);

  const round: RoundInfo | null = roundDetails ? {
    id: roundDetails.id,
    title: roundDetails.title,
    status: roundDetails.status === "OPEN" ? "open" : "closed",
    startTime: dayjs(roundDetails.startDate).format("DD/MM/YYYY [at] HH:mm"),
  } : null;

  const rankingList: Bettor[] = (rankingData || []).map(item => ({
    position: item.position,
    name: item.name,
    ticketCode: item.ticketCode,
    points: item.points,
    exactScores: item.exactScores,
    winnerScores: item.winnerScores,
  }));

  return {
    round,
    ranking: rankingList,
    isLoading,
    hasNoRound: !isLoadingActive && !targetRoundId
  };
}
