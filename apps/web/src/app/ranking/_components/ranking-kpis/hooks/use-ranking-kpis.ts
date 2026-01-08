import { useRankingKpisQueries } from "@/app/ranking/_components/ranking-kpis/hooks/use-ranking-kpis-queries";

export interface KpiItem {
  label: string;
  value: string;
  icon: string;
}

export function useRankingKpis(roundId?: number) {
  const { roundDetails, rankingData, isLoading } = useRankingKpisQueries(roundId);

  const kpis: KpiItem[] = roundDetails ? [
    { label: "Tickets", value: String(roundDetails.totalTickets || 0), icon: "🎫" },
    { label: "Prize Pool", value: `R$ ${roundDetails.prizePool?.toLocaleString("en-US") || 0}`, icon: "💰" },
    { label: "Participants", value: String(rankingData?.length || 0), icon: "👥" },
    { label: "Matches", value: String(roundDetails.matches?.length || 0), icon: "⚽" },
  ] : [];

  return { kpis, isLoading };
}
