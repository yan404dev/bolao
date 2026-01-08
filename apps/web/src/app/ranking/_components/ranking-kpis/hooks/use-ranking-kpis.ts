import { useRankingKpisQueries } from "./use-ranking-kpis-queries";

export interface KpiItem {
  label: string;
  value: string;
  icon: string;
}

export function useRankingKpis(roundId?: number) {
  const { roundDetails, rankingData, isLoading } = useRankingKpisQueries(roundId);

  const kpis: KpiItem[] = roundDetails ? [
    { label: "Bilhetes", value: String(roundDetails.totalTickets || 0), icon: "🎫" },
    { label: "Premiação", value: `R$ ${roundDetails.prizePool?.toLocaleString("pt-BR") || 0}`, icon: "💰" },
    { label: "Participantes", value: String(rankingData?.length || 0), icon: "👥" },
    { label: "Jogos", value: String(roundDetails.matches?.length || 0), icon: "⚽" },
  ] : [];

  return { kpis, isLoading };
}
